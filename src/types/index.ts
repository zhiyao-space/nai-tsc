// 共享类型契约：词库分类与卡片状态

export type GroupKey = "common" | "male" | "female";

export type CategoryKey =
  | "pose"
  | "scene"
  | "mood"
  | "composition"
  | "hairColor"
  | "hairStyle"
  | "eyeColor"
  | "outfit"
  | "face"
  | "body";

export interface CategoryMeta {
  key: CategoryKey;
  group: GroupKey;
  label: string;
  hint: string;
}

/** 单个分类卡片的交互状态 */
export interface CategoryState {
  /** 手动点选的 tag（随机后仍保留） */
  manual: string[];
  /** 每次随机从池中抽取的数量，0 表示该分类不参与随机 */
  randomCount: number;
  /** 锁定后随机时保持上一次结果不变 */
  locked: boolean;
  /** 上一次随机命中的 tag */
  lastRandom: string[];
}

export type GenderMode = "male" | "female" | "both";

export type WeightMode = "none" | "emphasis";
