import calm from "@/assets/moods/calm.png";
import happy from "@/assets/moods/happy.png";
import energetic from "@/assets/moods/energetic.png";
import playful from "@/assets/moods/playful.png";
import moodSwings from "@/assets/moods/moodSwings.png";
import stressed from "@/assets/moods/stressed.png";
import sad from "@/assets/moods/sad.png";
import anxious from "@/assets/moods/anxious.png";
import annoyed from "@/assets/moods/annoyed.png";
import depressed from "@/assets/moods/depressed.png";
import overthink from "@/assets/moods/overthink.png";
import lowEnergy from "@/assets/moods/lowEnergy.png";
import guilt from "@/assets/moods/guilt.png";
import apathetic from "@/assets/moods/apathetic.png";
import confused from "@/assets/moods/confused.png";
import selfCritic from "@/assets/moods/selfCritic.png";

export type MoodItem = { id: string; name: string; img: string; tone: string };

export const MOOD_LIST: MoodItem[] = [
  { id: "calm",       name: "هادي",          img: calm,       tone: "var(--phase-luteal)" },
  { id: "happy",      name: "سعيد",          img: happy,      tone: "var(--phase-follicular)" },
  { id: "energetic",  name: "نشيط",          img: energetic,  tone: "var(--phase-ovulation)" },
  { id: "playful",    name: "مرح",           img: playful,    tone: "var(--phase-follicular)" },
  { id: "moodSwings", name: "تقلّب المزاج",  img: moodSwings, tone: "var(--phase-menstrual)" },
  { id: "stressed",   name: "متوتّر",        img: stressed,   tone: "var(--phase-menstrual)" },
  { id: "sad",        name: "حزين",          img: sad,        tone: "var(--phase-luteal)" },
  { id: "anxious",    name: "قلق",           img: anxious,    tone: "var(--phase-menstrual)" },
  { id: "annoyed",    name: "مُزعج",         img: annoyed,    tone: "var(--phase-menstrual)" },
  { id: "depressed",  name: "مكتئب",         img: depressed,  tone: "var(--phase-luteal)" },
  { id: "overthink",  name: "أفكار مُفرطة",  img: overthink,  tone: "var(--phase-luteal)" },
  { id: "lowEnergy",  name: "طاقة منخفضة",   img: lowEnergy,  tone: "var(--phase-menstrual)" },
  { id: "guilt",      name: "الشعور بالذنب", img: guilt,      tone: "var(--phase-luteal)" },
  { id: "apathetic",  name: "غير مبالي",     img: apathetic,  tone: "var(--foreground)" },
  { id: "confused",   name: "مُرتبك",        img: confused,   tone: "var(--phase-luteal)" },
  { id: "selfCritic", name: "ناقد ذاتي",     img: selfCritic, tone: "var(--phase-menstrual)" },
];
