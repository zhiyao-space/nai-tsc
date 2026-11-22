import { useMemo, useState } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { WeightMode } from "@/types";

interface PromptOutputProps {
  tags: string[];
}

export function PromptOutput({ tags }: PromptOutputProps) {
  const [weight, setWeight] = useState<WeightMode>("none");

  const prompt = useMemo(() => {
    if (tags.length === 0) return "";
    const parts = weight === "emphasis" ? tags.map((t) => `{${t}}`) : tags;
    return parts.join(", ");
  }, [tags, weight]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      toast.success("已复制到剪贴板");
    } catch {
      toast.error("复制失败，请手动复制");
    }
  };

  return (
    <div className="sticky bottom-0 border-t bg-background/95 p-4 backdrop-blur">
      <div className="mx-auto max-w-5xl">
        <div className="max-h-32 min-h-[3rem] overflow-auto rounded-md border bg-muted p-3 font-mono text-sm leading-relaxed break-words">
          {prompt || (
            <span className="text-muted-foreground">
              点击标签或点击「随机生成」组装提示词，结果会显示在这里
            </span>
          )}
        </div>
        <div className="mt-3 flex items-center gap-3">
          <ToggleGroup
            type="single"
            value={weight}
            onValueChange={(v) => {
              if (v) setWeight(v as WeightMode);
            }}
            className="text-xs"
          >
            <ToggleGroupItem value="none" aria-label="无权重">
              无权重
            </ToggleGroupItem>
            <ToggleGroupItem value="emphasis" aria-label="强调">
              {"{ } 强调"}
            </ToggleGroupItem>
          </ToggleGroup>
          <Button
            type="button"
            className="ml-auto"
            disabled={tags.length === 0}
            onClick={handleCopy}
          >
            <Copy className="mr-1.5 h-4 w-4" />
            复制
          </Button>
        </div>
      </div>
    </div>
  );
}
