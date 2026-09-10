import { Copy, Eraser, RefreshCw, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export function AiOutput({
  value,
  onChange,
  onRegenerate,
  onClear,
  loading,
  emptyHint,
}: {
  value: string;
  onChange: (v: string) => void;
  onRegenerate: () => void;
  onClear: () => void;
  loading: boolean;
  emptyHint: string;
}) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Could not copy");
    }
  };

  return (
    <Card className="flex min-h-100 flex-col gap-4 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-foreground">AI result</h2>
          <p className="text-xs text-muted-foreground">Edit the text directly before using it.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={copy} disabled={!value}>
            <Copy className="size-4" /> Copy
          </Button>
          <Button variant="outline" size="sm" onClick={onRegenerate} disabled={loading}>
            {loading ? <Loader2 className="size-4 animate-spin" /> : <RefreshCw className="size-4" />}
            Regenerate
          </Button>
          <Button variant="ghost" size="sm" onClick={onClear} disabled={!value}>
            <Eraser className="size-4" /> Clear
          </Button>
        </div>
      </div>

      {loading && !value ? (
        <div className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-secondary text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" /> Generating…
        </div>
      ) : value ? (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-80 flex-1 resize-y rounded-xl font-mono text-[13px] leading-relaxed"
        />
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          {emptyHint}
        </div>
      )}

      <p className="text-[11px] leading-relaxed text-muted-foreground">
        AI-generated content may contain errors or inaccuracies. Always review and verify AI outputs
        before using them for important professional decisions.
      </p>
    </Card>
  );
}
