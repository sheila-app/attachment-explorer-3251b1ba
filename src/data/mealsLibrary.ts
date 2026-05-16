// مكتبة وصفات شيلا — عيّنة موسّعة موزّعة على المراحل والوسوم.
import type { CyclePhase } from"./mock";

export type DietTag ="halal" |"vegan" |"vegetarian" |"pescatarian" |"gluten-free" |"dairy-free" |"high-protein";
export type GoalTag ="hormone" |"fat-loss" |"energy" |"iron" |"fertility" |"bone";

export interface Recipe {
 id: string;
 name: string;
 arName: string;
 emoji: string;
 type:"فطور" |"غداء" |"عشاء" |"وجبة خفيفة";
 phase: CyclePhase;
 goals: GoalTag[];
 diet: DietTag[];
 kcal: number;
 protein: number;
 carbs: number;
 fat: number;
 prep: number;
 cookTime: number;
 servings: number;
 costAed: string;
 why: string; //"لماذا تنفع لكِ"
 ingredients: string[];
 steps: string[];
 micro?: { iron?: number; b12?: number; folate?: number; magnesium?: number; omega3?: number };
 ai?: boolean; // علم AI Recommended
 source?:"sheila" |"user";
}

export const recipes: Recipe[] = [
 {
 id:"r1",
 arName:"شكشوكة الحديد بكبدة الدجاج والسبانخ",
 name:"Iron Shakshuka",
 emoji:"",
 type:"فطور",
 phase:"menstrual",
 goals: ["iron","hormone","energy"],
 diet: ["halal","gluten-free","dairy-free","high-protein"],
 kcal: 385, protein: 28, carbs: 12, fat: 24,
 prep: 10, cookTime: 20, servings: 2, costAed:"١٨–٢٢",
 why:"تخسرين الحديد مع كلّ يوم من الدورة. كبدة الدجاج تعطيكِ حديد الهيم بأعلى امتصاص + B12 الذي يدعم الطاقة.",
 ingredients: ["كبدة دجاج ١٠٠غ","بيض ٤","سبانخ ٨٠غ","طماطم معلّبة ٤٠٠غ","بصل","ثوم","زيت زيتون","كمّون","كزبرة"],
 steps: ["جهّزي الكبدة","اقلي البصل والثوم","أضيفي البهارات والطماطم","أضيفي الكبدة والسبانخ","اكسري البيض في الصلصة"],
 micro: { iron: 9.2, b12: 11, folate: 280, magnesium: 52 },
 ai: true,
 source:"sheila",
 },
 {
 id:"r2",
 arName:"شوفان التمر واللوز",
 name:"Date Almond Oats",
 emoji:"",
 type:"فطور",
 phase:"menstrual",
 goals: ["energy","hormone"],
 diet: ["vegetarian","halal"],
 kcal: 320, protein: 12, carbs: 48, fat: 9,
 prep: 10, cookTime: 0, servings: 1, costAed:"٨–١٠",
 why:"ألياف الشوفان تستقرّ سكر الدم، التمر يجبر طاقة منخفضة، اللوز مغنيسيوم لتشنّجات أخفّ.",
 ingredients: ["شوفان ٤٠غ","حليب لوز كوب","تمر ٣ حبّات","لوز مفروم","قرفة","بذور شيا"],
 steps: ["انقعي الشوفان بالحليب ليلة كاملة","أضيفي التمر واللوز صباحاً","رشّي قرفة وشيا"],
 source:"sheila",
 },
 {
 id:"r3",
 arName:"بولُّ كينوا بالدجاج المشوي",
 name:"Quinoa Power Bowl",
 emoji:"",
 type:"غداء",
 phase:"follicular",
 goals: ["energy","fat-loss"],
 diet: ["halal","gluten-free","high-protein","dairy-free"],
 kcal: 480, protein: 38, carbs: 42, fat: 14,
 prep: 20, cookTime: 15, servings: 1, costAed:"٢٢–٢٦",
 why:"طاقة الجريبيّة في تصاعد. بروتين عالٍ + كاربز معقّدة لدفع تمارين القوّة.",
 ingredients: ["كينوا ٨٠غ","صدر دجاج ١٢٠غ","خيار","طماطم كرزيّة","أفوكادو","ليمون","زيت زيتون","زعتر"],
 steps: ["اطبخي الكينوا","اشوي الدجاج بالزعتر","اخلطي الخضار","ركّبي الطبق ورشّي الزيت والليمون"],
 ai: true,
 source:"sheila",
 },
 {
 id:"r4",
 arName:"سلطة العدس الأخضر بالكزبرة",
 name:"Green Lentil Salad",
 emoji:"",
 type:"غداء",
 phase:"menstrual",
 goals: ["iron","hormone"],
 diet: ["vegan","vegetarian","halal","gluten-free","dairy-free"],
 kcal: 360, protein: 18, carbs: 50, fat: 8,
 prep: 10, cookTime: 25, servings: 2, costAed:"١٠–١٢",
 why:"حديد نباتي + فيتامين C من الليمون والطماطم يضاعف الامتصاص.",
 ingredients: ["عدس أخضر كوب","بصل","كزبرة طازجة","ليمون","طماطم","زيت زيتون"],
 steps: ["اطبخي العدس","قطّعي الخضار","اخلطي مع الزيت والليمون"],
 source:"sheila",
 },
 {
 id:"r5",
 arName:"سلمون متبّل بالأعشاب وخضار محمّرة",
 name:"Herb Salmon",
 emoji:"",
 type:"عشاء",
 phase:"ovulation",
 goals: ["hormone","fertility","energy"],
 diet: ["pescatarian","halal","gluten-free","dairy-free","high-protein"],
 kcal: 520, protein: 42, carbs: 22, fat: 28,
 prep: 15, cookTime: 20, servings: 1, costAed:"٣٠–٣٥",
 why:"أوميغا-٣ يدعم خصوبة الإباضة، بروتين عالٍ بعد تمرين عالي الكثافة.",
 ingredients: ["سلمون ١٥٠غ","بروكلي","كوسا","ثوم","زيت زيتون","ليمون","روزماري"],
 steps: ["تبّلي السلمون","حمّري الخضار","اشوي السلمون ١٢ دقيقة"],
 micro: { omega3: 2.3 },
 ai: true,
 source:"sheila",
 },
 {
 id:"r6",
 arName:"شوربة عدس دافئة",
 name:"Lentil Soup",
 emoji:"",
 type:"عشاء",
 phase:"luteal",
 goals: ["hormone","iron"],
 diet: ["vegan","vegetarian","halal","gluten-free","dairy-free"],
 kcal: 280, protein: 18, carbs: 38, fat: 6,
 prep: 10, cookTime: 30, servings: 4, costAed:"٦–٨",
 why:"كاربز معقّدة ومغنيسيوم يلطّفان مزاج الأصفريّة ويدعمان النوم.",
 ingredients: ["عدس أحمر","جزر","بصل","كمّون","ليمون"],
 steps: ["اقلي البصل","أضيفي العدس والماء","اطهي ٢٥ دقيقة","اخفقي وأضيفي الليمون"],
 source:"sheila",
 },
 {
 id:"r7",
 arName:"زبادي يوناني بالعسل والمكسّرات",
 name:"Greek Yogurt Bowl",
 emoji:"",
 type:"وجبة خفيفة",
 phase:"follicular",
 goals: ["energy","bone"],
 diet: ["vegetarian","halal","high-protein","gluten-free"],
 kcal: 220, protein: 17, carbs: 22, fat: 6,
 prep: 5, cookTime: 0, servings: 1, costAed:"٧–٩",
 why:"بروتين سريع + كالسيوم بعد تمرين الصباح.",
 ingredients: ["زبادي يوناني ١٧٠غ","عسل ملعقة","لوز","توت"],
 steps: ["اخلطي كل المكوّنات في وعاء"],
 source:"sheila",
 },
 {
 id:"r8",
 arName:"حمّص بطحينة منزلي",
 name:"Homemade Hummus",
 emoji:"",
 type:"وجبة خفيفة",
 phase:"luteal",
 goals: ["hormone","fat-loss"],
 diet: ["vegan","vegetarian","halal","gluten-free","dairy-free"],
 kcal: 180, protein: 7, carbs: 18, fat: 9,
 prep: 10, cookTime: 0, servings: 4, costAed:"٤–٥",
 why:"ألياف وبروتين نباتي يستقرّان شهيّة الأصفريّة.",
 ingredients: ["حمّص مسلوق","طحينة","ليمون","ثوم"],
 steps: ["اخلطي في الخلّاط حتى يصير ناعماً"],
 source:"sheila",
 },
 {
 id:"r9",
 arName:"وعاء الأكاي والشيا",
 name:"Acai Chia Bowl",
 emoji:"",
 type:"فطور",
 phase:"ovulation",
 goals: ["hormone","fertility","energy"],
 diet: ["vegan","vegetarian","halal","gluten-free","dairy-free"],
 kcal: 340, protein: 8, carbs: 56, fat: 11,
 prep: 8, cookTime: 0, servings: 1, costAed:"١٤–١٨",
 why:"مضادّات أكسدة قويّة لذروة الإباضة + شيا لأوميغا-٣ نباتي.",
 ingredients: ["مسحوق أكاي","موز مجمّد","بذور شيا","توت","حليب لوز"],
 steps: ["اخفقي الأكاي مع الموز","ضعي فوقه الشيا والتوت"],
 source:"sheila",
 },
 {
 id:"r10",
 arName:"مناقيش زعتر بزيت الزيتون",
 name:"Zaatar Manakeesh",
 emoji:"",
 type:"فطور",
 phase:"follicular",
 goals: ["energy"],
 diet: ["vegan","vegetarian","halal","dairy-free"],
 kcal: 310, protein: 8, carbs: 42, fat: 12,
 prep: 15, cookTime: 12, servings: 2, costAed:"٦–٨",
 why:"كاربز معقّدة لطاقة طويلة + زيت زيتون مضادّ التهاب.",
 ingredients: ["عجين","زعتر","زيت زيتون","سمسم"],
 steps: ["افردي العجينة","ادهني بمزيج الزعتر والزيت","اخبزي على ٢٢٠°"],
 source:"sheila",
 },
 {
 id:"r11",
 arName:"صدر ديك رومي بالبطاطا الحلوة",
 name:"Turkey Sweet Potato",
 emoji:"",
 type:"غداء",
 phase:"luteal",
 goals: ["energy","fat-loss"],
 diet: ["halal","gluten-free","dairy-free","high-protein"],
 kcal: 460, protein: 36, carbs: 48, fat: 12,
 prep: 15, cookTime: 25, servings: 1, costAed:"٢٠–٢٤",
 why:"تربتوفان من الديك الرومي يدعم السيروتونين + بطاطا حلوة لاستقرار السكر.",
 ingredients: ["صدر ديك رومي","بطاطا حلوة","بروكلي","زيت زيتون"],
 steps: ["اشوي الديك","اخبزي البطاطا","اطبخي البروكلي بالبخار"],
 source:"sheila",
 },
 {
 id:"r12",
 arName:"كبسة دجاج صحّيّة",
 name:"Healthy Kabsa",
 emoji:"",
 type:"عشاء",
 phase:"follicular",
 goals: ["energy","iron"],
 diet: ["halal","dairy-free","high-protein"],
 kcal: 540, protein: 38, carbs: 62, fat: 14,
 prep: 15, cookTime: 40, servings: 4, costAed:"١٤–١٨",
 why:"نسخة محسّنة بالبهارات الحارقة وبروتين عالٍ — تشبع وتوازن.",
 ingredients: ["دجاج","أرز بسمتي","بهارات كبسة","طماطم","بصل"],
 steps: ["اقلي البصل","أضيفي الدجاج والبهارات","أضيفي الأرز والمرق"],
 source:"sheila",
 },
 {
 id:"r13",
 arName:"تبّولة بالكينوا",
 name:"Quinoa Tabbouleh",
 emoji:"",
 type:"وجبة خفيفة",
 phase:"ovulation",
 goals: ["fat-loss","hormone"],
 diet: ["vegan","vegetarian","halal","gluten-free","dairy-free"],
 kcal: 210, protein: 6, carbs: 32, fat: 7,
 prep: 15, cookTime: 0, servings: 2, costAed:"٨–١٠",
 why:"بقدونس وحامض الليمون لتنظيف وإنعاش، مع بروتين كينوا الكامل.",
 ingredients: ["كينوا مطبوخة","بقدونس","نعناع","طماطم","ليمون","زيت زيتون"],
 steps: ["اخلطي كل شيء في وعاء كبير"],
 source:"sheila",
 },
 {
 id:"r14",
 arName:"بيض مسلوق بالأفوكادو",
 name:"Egg & Avocado",
 emoji:"",
 type:"فطور",
 phase:"follicular",
 goals: ["energy","fat-loss"],
 diet: ["vegetarian","halal","gluten-free","high-protein"],
 kcal: 280, protein: 14, carbs: 12, fat: 20,
 prep: 8, cookTime: 0, servings: 1, costAed:"٧–٩",
 why:"دهون صحّيّة + بروتين سريع يقتل الجوع لساعات.",
 ingredients: ["بيض ٢","أفوكادو نصف","خبز شوفان","ملح","فلفل"],
 steps: ["اسلقي البيض","اهرسي الأفوكادو على الخبز","ضعي البيض فوقه"],
 source:"sheila",
 },
 {
 id:"r15",
 arName:"موز بزبدة لوز",
 name:"Banana Almond Butter",
 emoji:"",
 type:"وجبة خفيفة",
 phase:"menstrual",
 goals: ["energy","iron"],
 diet: ["vegan","vegetarian","halal","gluten-free","dairy-free"],
 kcal: 230, protein: 6, carbs: 30, fat: 11,
 prep: 3, cookTime: 0, servings: 1, costAed:"٤–٦",
 why:"بوتاسيوم الموز ومغنيسيوم اللوز يخفّفان الانتفاخ والتشنّج.",
 ingredients: ["موز","زبدة لوز ملعقتان"],
 steps: ["اغمسي الموز في الزبدة"],
 source:"sheila",
 },
 // وصفات المستخدمة (My Recipes)
 {
 id:"u1",
 arName:"سموثي البروتين الأخضر — وصفتي",
 name:"My Green Protein Smoothie",
 emoji:"",
 type:"فطور",
 phase:"follicular",
 goals: ["energy"],
 diet: ["vegetarian","halal","gluten-free","high-protein"],
 kcal: 295, protein: 24, carbs: 28, fat: 9,
 prep: 5, cookTime: 0, servings: 1, costAed:"١٢–١٤",
 why:"خاصّ بكِ — تركيبتكِ المحفوظة.",
 ingredients: ["سبانخ كوب","موز","بروتين فانيلا","حليب لوز","بذور شيا"],
 steps: ["اخفقي كل المكوّنات حتى تصير ناعمة"],
 source:"user",
 },
 {
 id:"u2",
 arName:"سلطة الدجاج والكينوا — وصفتي",
 name:"My Chicken Quinoa",
 emoji:"",
 type:"غداء",
 phase:"follicular",
 goals: ["fat-loss","energy"],
 diet: ["halal","gluten-free","dairy-free","high-protein"],
 kcal: 420, protein: 36, carbs: 36, fat: 12,
 prep: 15, cookTime: 15, servings: 1, costAed:"١٨–٢٠",
 why:"خاصّ بكِ — تركيبتكِ المحفوظة.",
 ingredients: ["دجاج ١٠٠غ","كينوا","خس","خيار","ليمون"],
 steps: ["اشوي الدجاج","اخلطي مع الباقي"],
 source:"user",
 },
];

export const SHEILA_RECIPES = recipes.filter((r) => r.source ==="sheila");
export const MY_RECIPES = recipes.filter((r) => r.source ==="user");

export function aiRankForMeal(opts: {
 type: Recipe["type"];
 phase: CyclePhase;
 remainingProtein: number;
 alreadyLoggedIds: string[];
 diet?: DietTag[];
}): Recipe[] {
 const { type, phase, remainingProtein, alreadyLoggedIds, diet } = opts;
 const ranked = SHEILA_RECIPES
.filter((r) => r.type === type)
.map((r) => {
 let score = 0;
 if (r.phase === phase) score += 100;
 if (r.protein >= remainingProtein * 0.25) score += 30;
 if (alreadyLoggedIds.includes(r.id)) score -= 50; // عقوبة التنوّع
 if (diet?.length) {
 const matches = diet.filter((d) => r.diet.includes(d)).length;
 score += matches * 5;
 }
 return { r, score };
 })
.sort((a, b) => b.score - a.score)
.slice(0, 3)
.map((x) => x.r);
 return ranked;
}
