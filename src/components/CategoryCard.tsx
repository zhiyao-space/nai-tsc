import { useState } from "react";
import { ChevronDown, ChevronUp, Lock, LockOpen, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { tagZh } from "@/lib/tagZh";
import type { CategoryMeta, CategoryState, GroupKey } from "@/types";

const GROUP_BADGE: Record<GroupKey, string> = {
  common: "通用",
  male: "男",
  female: "女",
};

/** 状态键：`${group}:${categoryKey}`，用于区分男/女同分类的不同池 */
export type StateKey = string;

interface CategoryCardProps {
  meta: CategoryMeta;
  stateKey: StateKey;
  pool: string[];
  state: CategoryState;
  onToggleTag: (stateKey: StateKey, tag: string) => void;
  onRandomCountChange: (stateKey: StateKey, n: number) => void;
  onToggleLock: (stateKey: StateKey) => void;
  onClear: (stateKey: StateKey) => void;
}

export function CategoryCard({
  meta,
  stateKey,
  pool,
  state,
  onToggleTag,
  onRandomCountChange,
  onToggleLock,
  onClear,
}: CategoryCardProps) {
  const [expanded, setExpanded] = useState(false);

  const selectedCount = state.manual.length + state.lastRandom.length;
  const selectedPreview = [...state.manual, ...state.lastRandom];

  return (
    <div className="rounded-lg border bg-card">
      <div className="flex items-center gap-2 p-4 pb-3">
        <h3 className="text-sm font-semibold whitespace-nowrap">{meta.label}</h3>
        <Badge variant="outline" className="shrink-0 px-1.5 text-[10px]">
          {GROUP_BADGE[meta.group]}
        </Badge>
        <span className="truncate text-xs text-muted-foreground">
          {selectedCount > 0
            ? `已选 ${selectedCount} · ${selectedPreview.map(tagZh).slice(0, 3).join("、")}${selectedPreview.length > 3 ? " 等" : ""}`
            : meta.hint}
        </span>
        <div className="ml-auto flex shrink-0 items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={cn(
              "h-7 w-7",
              state.locked && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
            )}
            onClick={() => onToggleLock(stateKey)}
            aria-label={state.locked ? "解锁" : "锁定"}
          >
            {state.locked ? <Lock className="h-3.5 w-3.5" /> : <LockOpen className="h-3.5 w-3.5" />}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => onClear(stateKey)}
            aria-label="清空"
          >
            <X className="h-3.5 w-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setExpanded((v) => !v)}
            aria-label={expanded ? "收起" : "展开"}
          >
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {expanded && (
        <div className="border-t px-4 pb-4 pt-3">
          <div className="flex items-center gap-2">
            <Select
              value={String(state.randomCount)}
              onValueChange={(v) => onRandomCountChange(stateKey, Number(v))}
            >
              <SelectTrigger className="h-7 w-[120px] text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">不随机</SelectItem>
                {[1, 2, 3, 4, 5].map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    随机 {n} 个
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="text-xs text-muted-foreground">共 {pool.length} 个词</span>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {pool.map((tag) => {
              const manual = state.manual.includes(tag);
              const random = state.lastRandom.includes(tag);
              return (
                <Button
                  key={tag}
                  type="button"
                  size="sm"
                  className={cn(
                    "h-auto flex-col rounded-lg px-3 py-1 text-xs",
                    manual && "bg-primary text-primary-foreground hover:bg-primary",
                    !manual && random &&
                      "border border-border bg-secondary text-secondary-foreground hover:bg-secondary",
                    !manual && !random && "bg-transparent text-foreground",
                  )}
                  variant={manual || random ? "default" : "outline"}
                  onClick={() => onToggleTag(stateKey, tag)}
                >
                  <span>{tag}</span>
                  <span
                    className={cn(
                      "text-[10px] leading-tight",
                      manual ? "text-primary-foreground/70" : "text-muted-foreground"
                    )}
                  >
                    {tagZh(tag)}
                  </span>
                </Button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
