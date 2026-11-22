import { useCallback, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Dices, Sparkles } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { CategoryCard, type StateKey } from "@/components/CategoryCard";
import { PromptOutput } from "@/components/PromptOutput";
import {
  CATEGORY_META,
  CATEGORY_ORDER,
  getPool,
  pickRandom,
} from "@/lib/tags";
import type { CategoryState, GenderMode } from "@/types";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

function initState(): Record<StateKey, CategoryState> {
  const states: Record<StateKey, CategoryState> = {};
  for (const meta of CATEGORY_META) {
    const key = `${meta.group}:${meta.key}`;
    if (states[key]) continue;
    states[key] = {
      manual: [],
      randomCount: ["pose", "scene", "mood", "outfit"].includes(meta.key) ? 1 : 0,
      locked: false,
      lastRandom: [],
    };
  }
  return states;
}

function IndexPage() {
  const [gender, setGender] = useState<GenderMode>("both");
  const [states, setStates] = useState<Record<StateKey, CategoryState>>(initState);

  const visibleMetas = useMemo(
    () =>
      CATEGORY_META.filter((m) => m.group === "common" || gender === "both" || gender === m.group),
    [gender]
  );

  const generate = useCallback(() => {
    setStates((prev) => {
      const next = { ...prev };
      for (const meta of visibleMetas) {
        const key = `${meta.group}:${meta.key}`;
        const s = next[key];
        if (s.locked) continue;
        const pool = getPool(meta.key, meta.group);
        const newRandom =
          s.randomCount > 0
            ? pickRandom(pool, s.randomCount, new Set(s.manual))
            : [];
        next[key] = { ...s, lastRandom: newRandom };
      }
      return next;
    });
  }, [visibleMetas]);

  const onToggleTag = useCallback((key: StateKey, tag: string) => {
    setStates((prev) => {
      const s = prev[key];
      if (!s) return prev;
      const manual = s.manual.includes(tag)
        ? s.manual.filter((t) => t !== tag)
        : [...s.manual, tag];
      return { ...prev, [key]: { ...s, manual, lastRandom: s.lastRandom.filter((t) => t !== tag) } };
    });
  }, []);

  const onRandomCountChange = useCallback((key: StateKey, n: number) => {
    setStates((prev) => {
      const s = prev[key];
      if (!s) return prev;
      return { ...prev, [key]: { ...s, randomCount: n } };
    });
  }, []);

  const onToggleLock = useCallback((key: StateKey) => {
    setStates((prev) => {
      const s = prev[key];
      if (!s) return prev;
      return { ...prev, [key]: { ...s, locked: !s.locked } };
    });
  }, []);

  const onClear = useCallback((key: StateKey) => {
    setStates((prev) => {
      const s = prev[key];
      if (!s) return prev;
      return { ...prev, [key]: { ...s, manual: [], lastRandom: [] } };
    });
  }, []);

  const resultTags = useMemo(() => {
    const seen = new Set<string>();
    const tags: string[] = [];
    for (const catKey of CATEGORY_ORDER) {
      for (const meta of visibleMetas) {
        if (meta.key !== catKey) continue;
        const s = states[`${meta.group}:${meta.key}`];
        if (!s) continue;
        for (const t of [...s.manual, ...s.lastRandom]) {
          if (!seen.has(t)) {
            seen.add(t);
            tags.push(t);
          }
        }
      }
    }
    return tags;
  }, [states, visibleMetas]);

  const groups: { title: string; group: "common" | "male" | "female" }[] = [
    { title: "通用 · 姿态 / 场景 / 氛围 / 构图", group: "common" },
    { title: "男生专属", group: "male" },
    { title: "女生专属", group: "female" },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Toaster position="top-center" />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pt-8">
        <header className="reveal">
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
            <Sparkles className="h-6 w-6" />
            Danbooru 提示词组机
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            随机组合 · 手动点选 · 一键复制，适用于 NovelAI 等提示词工具
          </p>
        </header>

        <div className="reveal mt-6 flex flex-wrap items-center gap-4">
          <Tabs value={gender} onValueChange={(v) => setGender(v as GenderMode)}>
            <TabsList>
              <TabsTrigger value="male">男生</TabsTrigger>
              <TabsTrigger value="female">女生</TabsTrigger>
              <TabsTrigger value="both">全部</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button type="button" onClick={generate} className="ml-auto">
            <Dices className="mr-1.5 h-4 w-4" />
            随机生成
          </Button>
        </div>

        <div className="mt-6 space-y-8 pb-10">
          {groups
            .filter((g) => visibleMetas.some((m) => m.group === g.group))
            .map((g) => (
              <section key={g.group}>
                <h2 className="mb-3 text-sm font-semibold text-muted-foreground">
                  {g.title}
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {visibleMetas
                    .filter((m) => m.group === g.group)
                    .map((meta) => {
                      const key = `${meta.group}:${meta.key}`;
                      return (
                        <CategoryCard
                          key={key}
                          meta={meta}
                          stateKey={key}
                          pool={getPool(meta.key, meta.group)}
                          state={states[key]}
                          onToggleTag={onToggleTag}
                          onRandomCountChange={onRandomCountChange}
                          onToggleLock={onToggleLock}
                          onClear={onClear}
                        />
                      );
                    })}
                </div>
              </section>
            ))}
        </div>
      </main>

      <PromptOutput tags={resultTags} />
    </div>
  );
}
