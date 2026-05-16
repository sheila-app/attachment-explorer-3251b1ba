// قاعدة بيانات أطعمة وهميّة للبحث
import type { CyclePhase } from"./mock";

export interface FoodItem {
 id: string;
 name: string;
 emoji: string;
 serving: string; // وصف حصّة
 kcal: number;
 protein: number;
 carbs: number;
 fat: number;
 phaseHints?: CyclePhase[];
 barcode?: string; // وهمي — يستخدم في شاشة الباركود
 brand?: string;
}

export const foods: FoodItem[] = [
 { id:"f1", name:"بيض مسلوق", emoji:"", serving:"١ بيضة (٥٠ غ)", kcal: 78, protein: 6, carbs: 1, fat: 5 },
 { id:"f2", name:"صدر دجاج مشوي", emoji:"", serving:"١٠٠ غ", kcal: 165, protein: 31, carbs: 0, fat: 4 },
 { id:"f3", name:"سلمون مشوي", emoji:"", serving:"١٠٠ غ", kcal: 208, protein: 22, carbs: 0, fat: 13 },
 { id:"f4", name:"كبدة دجاج", emoji:"", serving:"١٠٠ غ", kcal: 119, protein: 17, carbs: 1, fat: 5, phaseHints: ["menstrual"] },
 { id:"f5", name:"زبادي يوناني", emoji:"", serving:"١٧٠ غ", kcal: 100, protein: 17, carbs: 6, fat: 0 },
 { id:"f6", name:"حليب لوز", emoji:"", serving:"كوب", kcal: 39, protein: 1, carbs: 3, fat: 3 },
 { id:"f7", name:"تمر", emoji:"", serving:"٣ تمرات", kcal: 66, protein: 1, carbs: 18, fat: 0, phaseHints: ["menstrual"] },
 { id:"f8", name:"موز", emoji:"", serving:"حبّة متوسّطة", kcal: 105, protein: 1, carbs: 27, fat: 0 },
 { id:"f9", name:"تفاح", emoji:"", serving:"حبّة متوسّطة", kcal: 95, protein: 0, carbs: 25, fat: 0 },
 { id:"f10", name:"أفوكادو", emoji:"", serving:"نصف", kcal: 160, protein: 2, carbs: 9, fat: 15 },
 { id:"f11", name:"شوفان", emoji:"", serving:"٤٠ غ", kcal: 150, protein: 5, carbs: 27, fat: 3 },
 { id:"f12", name:"كينوا مطبوخة", emoji:"", serving:"كوب", kcal: 222, protein: 8, carbs: 39, fat: 4 },
 { id:"f13", name:"أرز بسمتي", emoji:"", serving:"كوب مطبوخ", kcal: 205, protein: 4, carbs: 45, fat: 0 },
 { id:"f14", name:"خبز شوفان", emoji:"", serving:"شريحة", kcal: 70, protein: 3, carbs: 12, fat: 1 },
 { id:"f15", name:"حمص مسلوق", emoji:"", serving:"كوب", kcal: 269, protein: 15, carbs: 45, fat: 4 },
 { id:"f16", name:"عدس", emoji:"", serving:"كوب", kcal: 230, protein: 18, carbs: 40, fat: 1, phaseHints: ["menstrual","luteal"] },
 { id:"f17", name:"سبانخ", emoji:"", serving:"١٠٠ غ", kcal: 23, protein: 3, carbs: 4, fat: 0, phaseHints: ["menstrual"] },
 { id:"f18", name:"بروكلي", emoji:"", serving:"كوب", kcal: 31, protein: 3, carbs: 6, fat: 0 },
 { id:"f19", name:"خيار", emoji:"", serving:"حبّة", kcal: 30, protein: 2, carbs: 7, fat: 0 },
 { id:"f20", name:"طماطم كرزيّة", emoji:"", serving:"كوب", kcal: 27, protein: 1, carbs: 6, fat: 0 },
 { id:"f21", name:"زيت زيتون", emoji:"", serving:"ملعقة", kcal: 119, protein: 0, carbs: 0, fat: 14 },
 { id:"f22", name:"طحينة", emoji:"", serving:"ملعقة", kcal: 89, protein: 3, carbs: 3, fat: 8 },
 { id:"f23", name:"لوز نيئ", emoji:"", serving:"٢٨ غ (٢٣ حبّة)", kcal: 164, protein: 6, carbs: 6, fat: 14 },
 { id:"f24", name:"جوز", emoji:"", serving:"٢٨ غ", kcal: 185, protein: 4, carbs: 4, fat: 18 },
 { id:"f25", name:"بذور شيا", emoji:"", serving:"ملعقة", kcal: 60, protein: 2, carbs: 5, fat: 4 },
 { id:"f26", name:"جبنة قريش", emoji:"", serving:"١٠٠ غ", kcal: 98, protein: 11, carbs: 3, fat: 4 },
 { id:"f27", name:"لبنة", emoji:"", serving:"ملعقتان", kcal: 90, protein: 5, carbs: 3, fat: 7 },
 { id:"f28", name:"زعتر بالزيت", emoji:"", serving:"ملعقة", kcal: 90, protein: 1, carbs: 4, fat: 8 },
 { id:"f29", name:"مكسّرات مشكّلة", emoji:"", serving:"٣٠ غ", kcal: 175, protein: 5, carbs: 8, fat: 14 },
 { id:"f30", name:"شوكولاتة داكنة ٧٠٪", emoji:"", serving:"٢٠ غ", kcal: 120, protein: 2, carbs: 9, fat: 9, phaseHints: ["luteal"] },
 // منتجات معبّأة لشاشة الباركود
 { id:"f40", name:"ألبان المراعي قليل الدسم", emoji:"", serving:"كوب (٢٤٠ مل)", kcal: 110, protein: 8, carbs: 12, fat: 3, brand:"المراعي", barcode:"6281007000123" },
 { id:"f41", name:"زبادي أكتيفيا", emoji:"", serving:"علبة (١١٥ غ)", kcal: 95, protein: 5, carbs: 14, fat: 2, brand:"Activia", barcode:"6281007112233" },
 { id:"f42", name:"حبوب كيلوغز", emoji:"", serving:"٣٠ غ", kcal: 110, protein: 2, carbs: 25, fat: 0, brand:"Kellogg's", barcode:"5051818000091" },
 { id:"f43", name:"فول مدمّس فيدا", emoji:"", serving:"نصف علبة", kcal: 140, protein: 9, carbs: 22, fat: 1, brand:"VEDA", barcode:"6201234567890" },
 { id:"f44", name:"تونة كاليفورنيا", emoji:"", serving:"علبة (١٥٠ غ)", kcal: 175, protein: 32, carbs: 0, fat: 5, brand:"California Garden", barcode:"6281045671234" },
];

export function searchFoods(q: string, phaseHint?: CyclePhase): FoodItem[] {
 const t = q.trim();
 if (!t) {
 // الـ Suggested for [phase] أوّلاً
 return phaseHint
? [...foods.filter((f) => f.phaseHints?.includes(phaseHint)),...foods.filter((f) =>!f.phaseHints?.includes(phaseHint))]
 : foods;
 }
 return foods.filter((f) => f.name.includes(t) || f.brand?.includes(t));
}

export function findByBarcode(code: string): FoodItem | undefined {
 return foods.find((f) => f.barcode === code);
}
