import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Plus, Sparkles, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AiOutput } from "@/components/AiOutput";
import { readAiText } from "@/lib/ai-result";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { generatePlan } from "@/lib/ai.functions";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner | Workplace AI" },
      {
        name: "description",
        content:
          "Turn your tasks, deadlines and available time into a prioritised, realistic daily or weekly schedule.",
      },
      { property: "og:title", content: "AI Task Planner | Workplace AI" },
      {
        property: "og:description",
        content: "Prioritised tasks and time blocks built around your day.",
      },
    ],
  }),
  component: PlannerPage,
});

type Priority = "High" | "Medium" | "Low";
type Task = { id: string; title: string; deadline: string; priority: Priority; done: boolean };

const PRIORITY_STYLE: Record<Priority, string> = {
  High: "bg-destructive/12 text-destructive",
  Medium: "bg-primary/12 text-primary",
  Low: "bg-secondary text-muted-foreground",
};

function PlannerPage() {
  const call = useServerFn(generatePlan);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");
  const [goals, setGoals] = useState("");
  const [availableTime, setAvailableTime] = useState("");
  const [range, setRange] = useState<"Daily" | "Weekly">("Daily");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const addTask = () => {
    if (!title.trim()) return;
    setTasks((t) => [
      ...t,
      { id: crypto.randomUUID(), title: title.trim(), deadline, priority, done: false },
    ]);
    setTitle("");
    setDeadline("");
    setPriority("Medium");
  };

  const generate = async () => {
    const open = tasks.filter((t) => !t.done);
    if (open.length === 0) {
      toast.error("Add at least one task first");
      return;
    }
    setLoading(true);
    try {
      const res = await call({
        data: {
          goals,
          availableTime,
          range,
          tasks: open
            .map((t) => `- ${t.title} (priority: ${t.priority}${t.deadline ? `, deadline: ${t.deadline}` : ""})`)
            .join("\n"),
        },
      });
      setOutput(readAiText(res));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not build the plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout title="AI Task Planner" description="Prioritised tasks and a realistic schedule">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="flex flex-col gap-4 p-5">
          <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
            <div className="grid gap-2">
              <Label htmlFor="task">Task</Label>
              <Input
                id="task"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                placeholder="Finalise the client proposal"
              />
            </div>
            <div className="grid gap-2 sm:w-36">
              <Label htmlFor="deadline">Deadline</Label>
              <Input
                id="deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-end gap-2">
            <div className="grid flex-1 gap-2">
              <Label>Priority</Label>
              <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" onClick={addTask}>
              <Plus className="size-4" /> Add
            </Button>
          </div>

          {tasks.length > 0 ? (
            <ul className="flex flex-col gap-2 rounded-xl bg-secondary/60 p-2">
              {tasks.map((t) => (
                <li
                  key={t.id}
                  className="flex items-center gap-3 rounded-lg bg-card px-3 py-2 shadow-xs"
                >
                  <Checkbox
                    checked={t.done}
                    onCheckedChange={(c) =>
                      setTasks((list) =>
                        list.map((x) => (x.id === t.id ? { ...x, done: c === true } : x)),
                      )
                    }
                  />
                  <span className="min-w-0 flex-1">
                    <span
                      className={cn(
                        "block truncate text-sm text-foreground",
                        t.done && "text-muted-foreground line-through",
                      )}
                    >
                      {t.title}
                    </span>
                    {t.deadline ? (
                      <span className="block text-xs text-muted-foreground">Due {t.deadline}</span>
                    ) : null}
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[11px] font-medium",
                      PRIORITY_STYLE[t.priority],
                    )}
                  >
                    {t.priority}
                  </span>
                  <button
                    aria-label="Delete task"
                    onClick={() => setTasks((list) => list.filter((x) => x.id !== t.id))}
                    className="text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}

          <div className="grid gap-2">
            <Label htmlFor="goals">Main goals (optional)</Label>
            <Textarea
              id="goals"
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              placeholder="Close two deals and clear the review backlog"
              className="min-h-20"
            />
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="time">Available time</Label>
              <Input
                id="time"
                value={availableTime}
                onChange={(e) => setAvailableTime(e.target.value)}
                placeholder="08:30–16:30, meetings 11–12"
              />
            </div>
            <div className="grid gap-2">
              <Label>Plan type</Label>
              <Select value={range} onValueChange={(v) => setRange(v as "Daily" | "Weekly")}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Daily">Daily</SelectItem>
                  <SelectItem value="Weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={generate} disabled={loading}>
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
            Generate plan
          </Button>
        </Card>

        <AiOutput
          value={output}
          onChange={setOutput}
          onRegenerate={generate}
          onClear={() => setOutput("")}
          loading={loading}
          emptyHint="Your prioritised schedule will appear here, ready to edit and copy."
        />
      </div>
    </AppLayout>
  );
}
