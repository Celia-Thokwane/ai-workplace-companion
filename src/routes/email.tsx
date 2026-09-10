import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AiOutput } from "@/components/AiOutput";
import { readAiText } from "@/lib/ai-result";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { generateEmail } from "@/lib/ai.functions";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator | Workplace AI" },
      {
        name: "description",
        content:
          "Generate professional workplace emails with subject, greeting, body and closing in a formal, friendly or persuasive tone.",
      },
      { property: "og:title", content: "Smart Email Generator | Workplace AI" },
      {
        property: "og:description",
        content: "Turn a few notes into a polished professional email.",
      },
    ],
  }),
  component: EmailPage,
});

type Tone = "Formal" | "Friendly" | "Persuasive";

function EmailPage() {
  const call = useServerFn(generateEmail);
  const [purpose, setPurpose] = useState("");
  const [recipient, setRecipient] = useState("");
  const [keyPoints, setKeyPoints] = useState("");
  const [callToAction, setCallToAction] = useState("");
  const [tone, setTone] = useState<Tone>("Formal");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!purpose.trim()) {
      toast.error("Add the purpose of the email first");
      return;
    }
    setLoading(true);
    try {
      const res = await call({ data: { purpose, recipient, keyPoints, callToAction, tone } });
      console.log("AI RES KEYS", JSON.stringify(res).slice(0, 200));
      setOutput(readAiText(res));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not generate the email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout title="Smart Email Generator" description="Professional emails from a few notes">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="flex flex-col gap-4 p-5">
          <div className="grid gap-2">
            <Label htmlFor="purpose">Purpose</Label>
            <Input
              id="purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Request a deadline extension for the Q3 report"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="recipient">Recipient / context</Label>
            <Input
              id="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="My line manager, Thabo, who is currently travelling"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="points">Key points</Label>
            <Textarea
              id="points"
              value={keyPoints}
              onChange={(e) => setKeyPoints(e.target.value)}
              placeholder="One point per line"
              className="min-h-32"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cta">Call to action (optional)</Label>
            <Input
              id="cta"
              value={callToAction}
              onChange={(e) => setCallToAction(e.target.value)}
              placeholder="Confirm the new date by Friday"
            />
          </div>
          <div className="grid gap-2">
            <Label>Tone</Label>
            <Select value={tone} onValueChange={(v) => setTone(v as Tone)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Formal">Formal</SelectItem>
                <SelectItem value="Friendly">Friendly</SelectItem>
                <SelectItem value="Persuasive">Persuasive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={generate} disabled={loading} className="mt-1">
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
            Generate email
          </Button>
        </Card>

        <AiOutput
          value={output}
          onChange={setOutput}
          onRegenerate={generate}
          onClear={() => setOutput("")}
          loading={loading}
          emptyHint="Your generated email will appear here, ready to edit and copy."
        />
      </div>
    </AppLayout>
  );
}
