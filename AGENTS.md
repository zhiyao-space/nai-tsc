# 项目说明

## Dependencies
- 除平台默认外无额外第三方依赖（lucide-react、sonner、next-themes 等均为模板预置）。

## Architecture
- 单页应用，核心页面 `src/routes/index.tsx`：持有全部分类状态（`Record<stateKey, CategoryState>`，stateKey 为 `${group}:${categoryKey}`，用于区分男/女同分类的不同词池）。
- 词库与工具函数 `src/lib/tags.ts`：`TAG_LIBRARY`（通用组）+ `MALE_LIBRARY` / `FEMALE_LIBRARY`（性别专属，合并到共用 CategoryKey），`getPool(key, group)` 按性别取池，`pickRandom` 洗牌取词。
- 分类卡片 `src/components/CategoryCard.tsx`（manual 点选 solid、lastRandom 随机命中 secondary、锁定/清空/随机数量），结果条 `src/components/PromptOutput.tsx`（无权重 / `{}` 强调 + 复制）。
- 主题：`src/styles.css` 纯黑白灰 oklch token，仅 `:root` 一套（无暗色）。

## Lessons
- male/female 共用同一 CategoryKey（如 hairColor），状态键必须拼接 group 前缀，否则两池互相覆盖。
- Swarms 单文件派发需至少两个任务参数，单任务直接用 Write 实现。
