import cramps from "@/assets/symptoms/cramps.png";
import headache from "@/assets/symptoms/headache.png";
import fatigue from "@/assets/symptoms/fatigue.png";
import backache from "@/assets/symptoms/backache.png";
import abdominalPain from "@/assets/symptoms/abdominalPain.png";
import tenderBreasts from "@/assets/symptoms/tenderBreasts.png";
import acne from "@/assets/symptoms/acne.png";
import cravings from "@/assets/symptoms/cravings.png";
import insomnia from "@/assets/symptoms/insomnia.png";
import nightSweats from "@/assets/symptoms/nightSweats.png";
import hotFlashes from "@/assets/symptoms/hotFlashes.png";
import vaginalDryness from "@/assets/symptoms/vaginalDryness.png";
import vaginalItching from "@/assets/symptoms/vaginalItching.png";
import fine from "@/assets/symptoms/fine.png";

export type SymptomItem = { id: string; name: string; img: string };

export const SYMPTOM_LIST: SymptomItem[] = [
  { id: "cramps",         name: "تشنّج",            img: cramps },
  { id: "headache",       name: "صداع",             img: headache },
  { id: "fatigue",        name: "إرهاق",            img: fatigue },
  { id: "backache",       name: "ألم الظهر",        img: backache },
  { id: "abdominalPain",  name: "ألم البطن",        img: abdominalPain },
  { id: "tenderBreasts",  name: "حساسية الصدر",     img: tenderBreasts },
  { id: "acne",           name: "حبوب",             img: acne },
  { id: "cravings",       name: "رغبة طعام",        img: cravings },
  { id: "insomnia",       name: "أرق",              img: insomnia },
  { id: "nightSweats",    name: "تعرّق ليلي",       img: nightSweats },
  { id: "hotFlashes",     name: "هبّات ساخنة",      img: hotFlashes },
  { id: "vaginalDryness", name: "جفاف مهبلي",       img: vaginalDryness },
  { id: "vaginalItching", name: "حكّة مهبلية",      img: vaginalItching },
  { id: "fine",           name: "كل شيء بخير",      img: fine },
];
