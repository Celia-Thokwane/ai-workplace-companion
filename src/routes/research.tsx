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
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { generateResearch } from "@/lib/ai.functions";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant | Workplace AI" },
      {
        name: "description",
        content:
          "Summarise a topic, pasted article or link into key findings, insights and practical recommendations.",
      },
      { property: "og:title", content: "AI Research Assistant | Workplace AI" },
      {
        property: "og:description",
        content: "Structured summaries, findings and recommendations in seconds.",
      },
    ],
  }),
  component: ResearchPage,
});

type Mode = "Topic" | "Text" | "URL";

const PLACEHOLDER: Record<Mode, string> = {
  Topic: "Hybrid work policies for mid-sized finance teams",
  Text: "Paste the article or report text here…",
  URL: "https://example.com/article",
};

function ResearchPage() {
  const call = useServerFn(generateResearch);
  const [mode, setMode] = useState<Mode>("Topic");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!input.trim()) {
      toast.error("Add something to research first");
      return;
    }
    setLoading(true);
    try {
      const res = await call({ data: { input, mode } });
      setOutput(readAiText(res));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not generate the briefing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout title="AI Research Assistant" description="Summaries, insights and next steps">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="flex flex-col gap-4 p-5">
          <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)}>
            <TabsList className="w-full">
              <TabsTrigger value="Topic" className="flex-1">
                Topic
              </TabsTrigger>
              <TabsTrigger value="Text" className="flex-1">
                Text
              </TabsTrigger>
              <TabsTrigger value="URL" className="flex-1">
                URL
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="grid gap-2">
            <Label htmlFor="input">
              {mode === "Topic" ? "Topic" : mode === "Text" ? "Article or text" : "Article link"}
            </Label>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={PLACEHOLDER[mode]}
              className={mode === "Text" ? "min-h-72" : "min-h-32"}
            />
          </div>
          {mode === "URL" ? (
            <p className="text-xs text-muted-foreground">
              Links are not opened. For the most accurate briefing, paste the article text instead.
            </p>
          ) : null}
          <Button onClick={generate} disabled={loading}>
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
            Generate briefing
          </Button>
        </Card>

        <AiOutput
          value={output}
          onChange={setOutput}
          onRegenerate={generate}
          onClear={() => setOutput("")}
          loading={loading}
          emptyHint="Your structured briefing will appear here, ready to edit and copy."
        />
      </div>
    </AppLayout>
  );
}
