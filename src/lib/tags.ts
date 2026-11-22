import type { CategoryKey, CategoryMeta } from "@/types";

/** Danbooru 高频 SFW 提示词词库（按分类） */
export const TAG_LIBRARY: Record<CategoryKey, string[]> = {
  pose: [
    "looking away", "looking at viewer", "looking back", "looking up", "looking down",
    "leaning forward", "leaning back", "leaning against wall", "hand in pocket",
    "hands in pockets", "arms crossed", "hands on hips", "hand on hip", "hand up",
    "hand on own chest", "hand on own face", "covering mouth", "covering eyes",
    "arms up", "arms behind back", "hands together", "clenched hands", "sitting",
    "standing", "kneeling", "squatting", "lying", "walking", "running", "jumping",
    "crouching", "hugging own knees", "head tilt", "head down", "chin rest",
    "outstretched arm", "reaching", "facing away", "back turned", "shushing",
    "pointing", "salute", "waving", "peace sign", "thumbs up", "adjusting clothes",
    "adjusting glasses", "stretching", "crossed legs", "hugging", "holding umbrella",
    "playing with hair", "dodging",
  ],
  scene: [
    "empty road", "dark alley", "overcast sky", "night sky", "starry sky", "sunset",
    "sunrise", "cloudy sky", "blue sky", "rain", "heavy rain", "snowing", "fog",
    "cityscape", "street", "rooftop", "stairs", "window", "curtains", "indoors",
    "outdoors", "forest", "tree shade", "cherry blossoms", "falling leaves", "beach",
    "ocean", "shore", "river", "bridge", "train interior", "train station",
    "classroom", "school", "cafe", "library", "bedroom", "kitchen", "bed", "lamppost",
    "power lines", "traffic light", "telephone pole", "fence", "grass", "flowers",
    "ruins", "city lights", "night", "evening", "dusk", "dawn", "morning",
    "cafe interior", "shrine", "garden", "wind", "sunlight", "dappled sunlight",
    "horizon", "cloud", "smoke", "neon lights", "reflection",
  ],
  mood: [
    "melancholic atmosphere", "cold atmosphere", "warm atmosphere", "quiet mood",
    "lively mood", "serious expression", "smile", "light smile", "grin", "laughing",
    "smirk", "pout", "crying", "tears", "sweating", "blush", "surprised", "angry",
    "worried", "expressionless", "poker face", "dazed expression", "tired", "sleepy",
    "bored", "embarrassed", "shy", "confident", "proud", "loneliness", "peaceful",
    "nostalgic atmosphere", "mysterious atmosphere", "tense atmosphere",
    "dreamy atmosphere", "gloomy atmosphere", "hopeful", "determined", "wistful mood",
  ],
  composition: [
    "upper body", "close-up", "full body", "portrait", "wide shot", "cowboy shot",
    "from above", "from below", "from side", "from behind", "dutch angle",
    "extreme close-up", "selfie", "solo", "centered composition",
    "symmetrical composition", "low angle shot", "high angle shot",
    "over-the-shoulder shot", "panorama", "silhouette", "rim lighting",
    "backlighting", "foreshortening", "depth of field",
  ],
  hairColor: [],
  hairStyle: [],
  eyeColor: [],
  outfit: [],
  face: [],
  body: [],
};

// male / female 专属词库合并进共用 key，靠 CATEGORY_META.group 区分来源
const MALE_LIBRARY: Partial<Record<CategoryKey, string[]>> = {
  hairColor: [
    "black hair", "white hair", "grey hair", "silver hair", "brown hair",
    "blonde hair", "red hair", "blue hair", "green hair", "purple hair",
    "pink hair", "orange hair", "light brown hair", "platinum blonde hair",
    "auburn hair", "stubble-colored hair",
  ],
  hairStyle: [
    "short hair", "medium hair", "long hair", "ponytail", "spiky hair",
    "messy hair", "slicked back hair", "undercut", "buzz cut", "shaved head",
    "curly hair", "wavy hair", "asymmetric hair", "braid", "side braid", "topknot",
    "bob cut", "parted bangs", "swept bangs", "hair over one eye", "stubble",
    "facial hair", "beard", "goatee", "low ponytail", "middle part", "mohawk",
    "tied hair",
  ],
  eyeColor: [
    "black eyes", "brown eyes", "blue eyes", "green eyes", "red eyes",
    "purple eyes", "grey eyes", "amber eyes", "gold eyes", "heterochromia",
    "orange eyes", "white eyes", "slit pupils", "yellow eyes", "hazel eyes",
  ],
  outfit: [
    "suit", "tuxedo", "business suit", "uniform", "school uniform",
    "military uniform", "shirt", "white shirt", "black shirt", "dress shirt",
    "collared shirt", "buttoned shirt", "t-shirt", "polo shirt", "hoodie",
    "hooded jacket", "jacket", "coat", "long coat", "trench coat", "labcoat",
    "blazer", "vest", "sweater", "cardigan", "necktie", "loose necktie", "bowtie",
    "jeans", "trousers", "khaki pants", "shorts", "cargo pants", "gloves",
    "black gloves", "fingerless gloves", "scarf", "belt", "boots", "sneakers",
    "loafers", "sandals", "hat", "cap", "beanie", "headphones", "necklace",
    "glasses", "sunglasses", "mask", "wristband", "apron", "kimono", "yukata",
    "armor", "circular glasses", "earrings",
  ],
  face: [
    "sharp jawline", "angular face", "masculine face", "thick eyebrows",
    "thin eyebrows", "long eyelashes", "adams apple", "sharp eyes", "narrow eyes",
    "closed eyes", "half-closed eyes", "scar on face", "mole under eye",
    "eyepatch", "small mouth", "sharp chin", "pierced ears", "mature male",
  ],
  body: [
    "tall", "slim", "muscular", "abs", "broad shoulders", "toned", "thin",
    "athletic build", "broad chest", "strong arms", "fit", "bulky", "lanky",
    "veiny arms", "short", "slender", "well-built",
  ],
};

const FEMALE_LIBRARY: Partial<Record<CategoryKey, string[]>> = {
  hairColor: [
    "black hair", "white hair", "grey hair", "silver hair", "brown hair",
    "blonde hair", "red hair", "blue hair", "green hair", "purple hair",
    "pink hair", "orange hair", "light brown hair", "dark brown hair",
    "platinum blonde hair", "auburn hair", "two-tone hair", "multicolored hair",
    "streaked hair", "gradient hair",
  ],
  hairStyle: [
    "long hair", "very long hair", "medium hair", "short hair", "twintails",
    "ponytail", "side ponytail", "low ponytail", "high ponytail", "twin braid",
    "braided ponytail", "braid", "double braid", "hair bun", "double bun", "bangs",
    "blunt bangs", "sidelocks", "bob cut", "hime cut", "straight hair",
    "curly hair", "wavy hair", "messy hair", "ahoge", "drill hair", "twin drills",
    "ringlets", "hair over one eye", "hair between eyes", "side bangs",
    "swept bangs", "hair pulled back", "half updo", "flipped hair", "low twintails",
  ],
  eyeColor: [
    "black eyes", "brown eyes", "blue eyes", "green eyes", "red eyes",
    "purple eyes", "grey eyes", "amber eyes", "gold eyes", "pink eyes",
    "orange eyes", "yellow eyes", "heterochromia", "long eyelashes",
    "sparkle eyes", "slit pupils", "half-closed eyes", "aqua eyes", "teal eyes",
    "violet eyes",
  ],
  outfit: [
    "dress", "long dress", "sundress", "skirt", "pleated skirt", "school uniform",
    "sailor collar", "serafuku", "shirt", "blouse", "white blouse",
    "collared shirt", "t-shirt", "hoodie", "sweater", "cardigan", "vest",
    "jacket", "coat", "long coat", "cape", "poncho", "thighhighs", "pantyhose",
    "knee socks", "socks", "pencil skirt", "miniskirt", "bikini", "swimsuit",
    "one-piece swimsuit", "pajamas", "nightgown", "gloves", "elbow gloves",
    "fingerless gloves", "scarf", "necklace", "bracelet", "earrings",
    "hair ribbon", "hair bow", "hairclip", "flower hair ornament", "hat",
    "sun hat", "ribbon", "boots", "high heels", "sneakers", "mary janes",
    "glasses", "kimono", "yukata", "maid", "apron", "denim jacket", "sleeveless",
    "off shoulder",
  ],
  face: [
    "soft features", "feminine face", "long eyelashes", "thin eyebrows",
    "small mouth", "parted lips", "smile", "blush", "mole under eye",
    "mole under mouth", "freckles", "eyepatch", "closed eyes",
    "half-closed eyes", "big eyes", "narrow eyes", "sharp eyes", "tall forehead",
    "lipstick", "glossy lips", "mature female",
  ],
  body: [
    "slim", "slender", "petite", "thin waist", "curvy", "long legs", "short",
    "small breasts", "medium breasts", "large breasts", "tall", "broad hips",
    "delicate hands", "thin", "fit", "toned", "hourglass figure", "small figure",
  ],
};

/** gender 相关分类：同一 key 按性别返回不同池 */
export function getPool(key: CategoryKey, group: "common" | "male" | "female"): string[] {
  if (group === "common") return TAG_LIBRARY[key];
  return group === "male"
    ? MALE_LIBRARY[key] ?? []
    : FEMALE_LIBRARY[key] ?? [];
}

export const CATEGORY_META: CategoryMeta[] = [
  { key: "pose", group: "common", label: "姿态动作", hint: "人物的动作与姿态" },
  { key: "scene", group: "common", label: "场景环境", hint: "画面所处的环境" },
  { key: "mood", group: "common", label: "氛围情绪", hint: "整体氛围与表情情绪" },
  { key: "composition", group: "common", label: "构图", hint: "取景与镜头角度" },
  { key: "hairColor", group: "male", label: "发色", hint: "男生发色" },
  { key: "hairStyle", group: "male", label: "发型", hint: "男生发型" },
  { key: "eyeColor", group: "male", label: "瞳色", hint: "男生瞳色" },
  { key: "outfit", group: "male", label: "服饰", hint: "男生服饰" },
  { key: "face", group: "male", label: "面部特征", hint: "男生面部特征" },
  { key: "body", group: "male", label: "体型特征", hint: "男生体型" },
  { key: "hairColor", group: "female", label: "发色", hint: "女生发色" },
  { key: "hairStyle", group: "female", label: "发型", hint: "女生发型" },
  { key: "eyeColor", group: "female", label: "瞳色", hint: "女生瞳色" },
  { key: "outfit", group: "female", label: "服饰", hint: "女生服饰" },
  { key: "face", group: "female", label: "面部特征", hint: "女生面部特征" },
  { key: "body", group: "female", label: "体型特征", hint: "女生体型" },
];

/** 输出提示词时的固定顺序 */
export const CATEGORY_ORDER: CategoryKey[] = [
  "hairColor", "hairStyle", "eyeColor", "face", "body", "outfit",
  "pose", "composition", "scene", "mood",
];

/** 洗牌随机取 count 个，排除 exclude；不足时取剩余全部 */
export function pickRandom(pool: string[], count: number, exclude: Set<string>): string[] {
  const candidates = pool.filter((t) => !exclude.has(t));
  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
  }
  return candidates.slice(0, count);
}
