import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Sparkles,
  HeartPulse,
  Apple,
  Dumbbell,
  Users,
  Moon,
  ChevronLeft,
  Check,
  Star,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";

export const Route = createFileRoute("/web")({
  head: () => ({
    meta: [
      { title: "شيلا — رفيقتكِ الذكيّة للصحّة واللّياقة" },
      {
        name: "description",
        content:
          "شيلا تطبيق صحّة ولياقة ذكي للمرأة العربيّة — تتبّع الدورة، تغذية متكيّفة، تمارين، ومجتمع داعم.",
      },
      { property: "og:title", content: "شيلا — رفيقتكِ الذكيّة للصحّة واللّياقة" },
      {
        property: "og:description",
        content:
          "تتبّع الدورة، خطّط تغذية وتمارين متكيّفة مع مرحلتكِ، ومجتمع داعم — كلّ ذلك مع شيلا.",
      },
    ],
  }),
  component: WebHome,
});

function WebHome() {
  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground font-sans antialiased">
      <Nav />
      <Hero />
      <Trust />
      <Features />
      <Phases />
      <Sheila />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}

/* ───────── Nav ───────── */
function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/75 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/web" className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-2xl grid place-items-center"
            style={{
              background: "var(--gradient-primary, var(--primary))",
              boxShadow: "0 6px 16px -6px oklch(0.46 0.135 328 / 0.5)",
            }}
          >
            <Sparkles size={16} className="text-primary-foreground" strokeWidth={2.2} />
          </div>
          <span className="font-display text-xl tracking-tight">شيلا</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-[13px] text-foreground/70">
          <a href="#features" className="hover:text-foreground transition">المزايا</a>
          <a href="#phases" className="hover:text-foreground transition">الدورة</a>
          <a href="#sheila" className="hover:text-foreground transition">شيلا الذكاء</a>
          <a href="#pricing" className="hover:text-foreground transition">الأسعار</a>
          <a href="#faq" className="hover:text-foreground transition">أسئلة</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/auth/login"
            className="hidden sm:inline-flex text-[13px] text-foreground/75 hover:text-foreground px-3 py-2"
          >
            تسجيل الدخول
          </Link>
          <Link
            to="/onboarding/welcome"
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold text-primary-foreground"
            style={{ background: "var(--gradient-primary, var(--primary))" }}
          >
            ابدئي مجّاناً
            <ChevronLeft size={14} strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ───────── Hero ───────── */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute top-20 -start-20 w-[480px] h-[480px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute bottom-0 end-0 w-[420px] h-[420px] rounded-full bg-phase-luteal/20 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pt-16 md:pt-24 pb-16 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft text-primary px-3 py-1 text-[11px] font-semibold border border-primary/15">
            <Sparkles size={12} strokeWidth={2.4} />
            أوّل تطبيق صحّة ذكيّ للمرأة العربيّة
          </span>
          <h1 className="mt-5 font-display text-5xl md:text-6xl leading-[1.1] tracking-tight">
            صحّتكِ، لياقتكِ،
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--gradient-primary, var(--primary))" }}
            >
              ودورتكِ — بانسجام
            </span>
          </h1>
          <p className="mt-5 text-[15px] md:text-base text-foreground/70 leading-[1.9] max-w-xl">
            شيلا رفيقتكِ الذكيّة التي تفهم جسدكِ. خطط تغذية وتمارين تتكيّف مع مرحلتكِ من
            الدورة، وذكاء اصطناعي يجيب على كلّ سؤال — بالعربيّة، وبخصوصيّة تامّة.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              to="/onboarding/welcome"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-semibold text-primary-foreground shadow-lg"
              style={{
                background: "var(--gradient-primary, var(--primary))",
                boxShadow: "0 14px 32px -10px oklch(0.46 0.135 328 / 0.55)",
              }}
            >
              ابدئي رحلتكِ مجّاناً
              <ChevronLeft size={16} strokeWidth={2.5} />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-[14px] font-medium bg-secondary border border-border hover:bg-secondary/80 transition"
            >
              اكتشفي المزايا
            </a>
          </div>
          <div className="mt-7 flex items-center gap-5 text-[12px] text-foreground/60">
            <span className="inline-flex items-center gap-1.5"><Check size={14} className="text-primary" strokeWidth={2.5} /> بدون بطاقة ائتمان</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck size={14} className="text-primary" strokeWidth={2.2} /> خصوصيّة كاملة</span>
            <span className="hidden sm:inline-flex items-center gap-1.5"><Star size={14} className="text-primary" strokeWidth={2.2} /> تقييم 4.9</span>
          </div>
        </motion.div>

        {/* Phone mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative justify-self-center"
        >
          <PhoneMock />
        </motion.div>
      </div>
    </section>
  );
}

function PhoneMock() {
  return (
    <div className="relative">
      <div
        className="absolute -inset-10 rounded-[60px] -z-10 opacity-60 blur-3xl"
        style={{ background: "var(--gradient-primary, var(--primary))" }}
      />
      <div
        className="relative w-[300px] h-[600px] rounded-[44px] border border-border bg-card overflow-hidden"
        style={{
          boxShadow:
            "0 50px 100px -30px oklch(0.32 0.12 330 / 0.4), 0 25px 60px -25px oklch(0.32 0.12 330 / 0.25)",
        }}
      >
        {/* Notch */}
        <div className="absolute top-2 inset-x-0 flex justify-center z-20">
          <div className="w-24 h-6 rounded-full bg-foreground/90" />
        </div>
        {/* Screen content */}
        <div className="absolute inset-0 p-6 pt-12 flex flex-col gap-4 bg-gradient-to-b from-primary-soft to-background">
          <div className="flex items-center justify-between mt-2">
            <div>
              <div className="text-[10px] tracking-widest text-foreground/50">مرحباً</div>
              <div className="font-display text-[16px]">سارة</div>
            </div>
            <div
              className="w-9 h-9 rounded-full grid place-items-center text-primary-foreground"
              style={{ background: "var(--gradient-primary, var(--primary))" }}
            >
              س
            </div>
          </div>
          {/* Ring */}
          <div className="relative mx-auto w-44 h-44 my-2">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="44" fill="none" stroke="oklch(0.94 0.02 320)" strokeWidth="6" />
              <circle
                cx="50" cy="50" r="44"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="276"
                strokeDashoffset="80"
              />
            </svg>
            <div className="absolute inset-0 grid place-items-center text-center">
              <div>
                <div className="font-display text-3xl">12</div>
                <div className="text-[10px] text-foreground/60">يوم • طور الإباضة</div>
              </div>
            </div>
          </div>
          {/* Card */}
          <div className="rounded-2xl bg-card border border-border p-3 text-[11px]">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Sparkles size={12} className="text-primary" strokeWidth={2.2} />
              <span className="text-primary font-semibold">رسالة شيلا</span>
            </div>
            <p className="text-foreground/75 leading-relaxed">
              طاقتكِ في ذروتها اليوم — وقت مثالي لتمرين قوّة قصير.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { l: "ماء", v: "6/8" },
              { l: "بروتين", v: "62غ" },
              { l: "نوم", v: "7.5س" },
            ].map((s) => (
              <div key={s.l} className="rounded-xl bg-card border border-border p-2 text-center">
                <div className="text-[9px] text-foreground/55">{s.l}</div>
                <div className="font-display text-[14px] text-primary mt-0.5">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────── Trust ───────── */
function Trust() {
  const stats = [
    { v: "+50k", l: "امرأة تثق بشيلا" },
    { v: "4.9★", l: "تقييم المستخدمات" },
    { v: "12+", l: "دولة عربيّة" },
    { v: "100%", l: "محتوى عربيّ" },
  ];
  return (
    <section className="border-y border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.l} className="text-center">
            <div className="font-display text-3xl text-primary nums">{s.v}</div>
            <div className="text-[12px] text-foreground/60 mt-1">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────── Features ───────── */
function Features() {
  const items = [
    { icon: HeartPulse, title: "تتبّع الدورة", desc: "تنبّؤات ذكيّة لكلّ مرحلة مع رؤى مخصّصة لجسدكِ." },
    { icon: Apple, title: "تغذية متكيّفة", desc: "وصفات وخطط وجبات تتغيّر حسب مرحلتكِ واحتياجاتكِ." },
    { icon: Dumbbell, title: "تمارين ذكيّة", desc: "خطط لياقة تتعدّل تلقائيّاً مع طاقتكِ ومزاجكِ." },
    { icon: Moon, title: "نوم ومزاج", desc: "تتبّعي نومكِ ومزاجكِ، واكتشفي الأنماط الخفيّة." },
    { icon: Users, title: "مجتمع داعم", desc: "دائرة شيلا — نساء يفهمنكِ ويرافقنكِ في رحلتكِ." },
    { icon: Sparkles, title: "شيلا الذكيّة", desc: "مساعدة ذكاء اصطناعي تجيب بالعربيّة، في أيّ وقت." },
  ];
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <SectionHeader
        tag="المزايا"
        title="كلّ ما تحتاجينه في تطبيق واحد"
        subtitle="مصمّم خصّيصاً ليفهم جسد المرأة العربيّة، ويرافقكِ في كلّ مرحلة."
      />
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="group rounded-3xl border border-border bg-card p-6 hover:border-primary/30 transition-all hover:-translate-y-1"
            style={{ boxShadow: "0 1px 0 0 oklch(1 0 0) inset" }}
          >
            <div
              className="w-12 h-12 rounded-2xl grid place-items-center mb-4"
              style={{ background: "color-mix(in oklab, var(--primary) 12%, transparent)" }}
            >
              <Icon size={20} className="text-primary" strokeWidth={1.9} />
            </div>
            <h3 className="font-display text-lg">{title}</h3>
            <p className="mt-2 text-[13.5px] text-foreground/65 leading-[1.8]">{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ───────── Phases ───────── */
function Phases() {
  const phases = [
    { name: "الحيض", color: "var(--phase-menstrual)", soft: "var(--phase-menstrual-soft)", desc: "راحة، تغذية مدفئة، تمارين خفيفة." },
    { name: "الجريبيّة", color: "var(--phase-follicular)", soft: "var(--phase-follicular-soft)", desc: "طاقة صاعدة، وقت التحدّيات الجديدة." },
    { name: "الإباضة", color: "var(--phase-ovulation)", soft: "var(--phase-ovulation-soft)", desc: "ذروة الأداء — تمارين قوّة وتركيز." },
    { name: "الأصفريّة", color: "var(--phase-luteal)", soft: "var(--phase-luteal-soft)", desc: "تهدئة، يوغا، تغذية تدعم المزاج." },
  ];
  return (
    <section id="phases" className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary-soft/40 to-background" />
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          tag="الدورة"
          title="أربع مراحل، أربع نسخ منكِ"
          subtitle="شيلا تعدّل كلّ شيء — التمارين، الوجبات، وحتّى نبرة المحادثة — لتنسجم مع المرحلة التي تعيشينها."
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {phases.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="rounded-3xl border border-border bg-card p-6"
            >
              <div
                className="w-14 h-14 rounded-full grid place-items-center mb-4"
                style={{ background: p.soft, border: `1px solid ${p.color}` }}
              >
                <div className="w-5 h-5 rounded-full" style={{ background: p.color }} />
              </div>
              <h3 className="font-display text-lg">{p.name}</h3>
              <p className="mt-2 text-[13px] text-foreground/65 leading-[1.8]">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Sheila AI ───────── */
function Sheila() {
  return (
    <section id="sheila" className="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1">
          <div className="rounded-3xl border border-border bg-card p-6 space-y-3 max-w-md">
            {[
              { who: "أنتِ", text: "شعرت بتعب اليوم، شو تنصحيني؟", me: true },
              { who: "شيلا", text: "أنتِ في الطور الأصفري — جسدكِ يحتاج راحة. جرّبي يوغا خفيفة ١٥ دقيقة، ووجبة دافئة بالشوفان والموز 💜" },
              { who: "أنتِ", text: "تمام، ذكّريني بشرب الماء", me: true },
              { who: "شيلا", text: "بكلّ سرور — راح أنبّهكِ كلّ ساعتين." },
            ].map((m, i) => (
              <div key={i} className={`flex ${m.me ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed ${
                    m.me ? "bg-secondary text-foreground" : "text-primary-foreground"
                  }`}
                  style={!m.me ? { background: "var(--gradient-primary, var(--primary))" } : undefined}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft text-primary px-3 py-1 text-[11px] font-semibold border border-primary/15">
            <MessageCircle size={12} strokeWidth={2.4} />
            شيلا الذكيّة
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl leading-tight">
            مساعدة شخصيّة تفهمكِ بالعربيّة
          </h2>
          <p className="mt-4 text-foreground/70 leading-[2] text-[15px] max-w-xl">
            اسألي شيلا أيّ شيء عن جسدكِ، تغذيتكِ، أو لياقتكِ. تجيبكِ بمعلومات علميّة موثوقة،
            مخصّصة لمرحلتكِ، وبلهجة دافئة.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "إجابات فوريّة على أسئلة الصحّة النسائيّة",
              "اقتراحات مبنيّة على بياناتكِ ومرحلتكِ",
              "خصوصيّة كاملة — محادثاتكِ لكِ وحدكِ",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2.5 text-[14px]">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 grid place-items-center shrink-0">
                  <Check size={12} className="text-primary" strokeWidth={2.8} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ───────── Testimonials ───────── */
function Testimonials() {
  const items = [
    { name: "نور — الرياض", text: "أوّل مرّة بحسّ إنّ تطبيق فاهمني فعلاً. التمارين تتغيّر مع مزاجي!" },
    { name: "ليلى — دبي", text: "شيلا غيّرت علاقتي بجسمي. صرت أفهم دورتي بدل ما أحاربها." },
    { name: "سلمى — عمّان", text: "الواجهة بالعربي، والمحتوى علمي ومريح. ما توقّعت تطبيق عربي بهالجودة." },
  ];
  return (
    <section className="bg-secondary/40 border-y border-border/60 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader tag="آراء المستخدمات" title="نساء يثقن بشيلا" />
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {items.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-3xl bg-card border border-border p-6"
            >
              <div className="flex gap-0.5 text-primary mb-3">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <p className="text-[14px] leading-[2] text-foreground/80">{t.text}</p>
              <div className="mt-4 text-[12px] text-foreground/55">{t.name}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Pricing ───────── */
function Pricing() {
  const plans = [
    {
      name: "المجانيّة",
      price: "٠",
      tag: "ابدئي مجّاناً",
      features: ["تتبّع الدورة الأساسي", "وصفات محدودة", "تمارين أسبوعيّة", "مجتمع شيلا"],
      cta: "ابدئي الآن",
      highlight: false,
    },
    {
      name: "بريميوم",
      price: "٢٩",
      tag: "الأكثر شعبيّة",
      features: ["كلّ المزايا المجانيّة", "شيلا الذكيّة بلا حدود", "خطط تغذية متكيّفة", "تمارين مخصّصة", "تقارير شهريّة"],
      cta: "جرّبي ٧ أيّام مجّاناً",
      highlight: true,
    },
    {
      name: "بريميوم سنوي",
      price: "٢٤٠",
      tag: "وفّري ٣١٪",
      features: ["كلّ مزايا بريميوم", "استشارات اختصاصيّات", "محتوى حصري", "أولويّة الدعم"],
      cta: "اشتركي سنويّاً",
      highlight: false,
    },
  ];
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-6 py-20 md:py-28">
      <SectionHeader
        tag="الأسعار"
        title="خطط بسيطة، بلا التزامات"
        subtitle="جرّبي بريميوم ٧ أيّام مجّاناً، وألغي في أيّ وقت."
      />
      <div className="mt-12 grid md:grid-cols-3 gap-5">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`relative rounded-3xl p-7 border ${
              p.highlight
                ? "border-primary/40 bg-card"
                : "border-border bg-card"
            }`}
            style={
              p.highlight
                ? { boxShadow: "0 30px 60px -20px oklch(0.46 0.135 328 / 0.25)" }
                : undefined
            }
          >
            {p.highlight && (
              <span
                className="absolute -top-3 start-6 text-[11px] font-semibold px-3 py-1 rounded-full text-primary-foreground"
                style={{ background: "var(--gradient-primary, var(--primary))" }}
              >
                {p.tag}
              </span>
            )}
            <div className="text-[12px] text-foreground/55">{p.name}</div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="font-display text-5xl nums">{p.price}</span>
              <span className="text-foreground/55 text-[13px]">ر.س / شهر</span>
            </div>
            {!p.highlight && <div className="mt-1 text-[12px] text-primary font-medium">{p.tag}</div>}
            <ul className="mt-6 space-y-2.5">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-[13.5px]">
                  <Check size={15} className="text-primary mt-0.5 shrink-0" strokeWidth={2.5} />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              to="/onboarding/welcome"
              className={`mt-7 block text-center rounded-full py-3 text-[13.5px] font-semibold transition ${
                p.highlight
                  ? "text-primary-foreground"
                  : "bg-secondary border border-border hover:bg-secondary/80"
              }`}
              style={
                p.highlight
                  ? { background: "var(--gradient-primary, var(--primary))" }
                  : undefined
              }
            >
              {p.cta}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────── FAQ ───────── */
function FAQ() {
  const qs = [
    { q: "هل التطبيق بالعربيّة فعلاً؟", a: "نعم — كلّ المحتوى، المساعدة الذكيّة، والمجتمع بالعربيّة الفصحى المبسّطة." },
    { q: "هل بياناتي آمنة؟", a: "بياناتكِ مشفّرة وخاصّة بكِ وحدكِ. لا نشاركها مع أيّ طرف." },
    { q: "هل يناسبني لو ما عندي دورة منتظمة؟", a: "بالتأكيد — شيلا تتعلّم من جسدكِ، حتّى لو كانت دورتكِ غير منتظمة أو في مرحلة الحمل أو ما بعدها." },
    { q: "كيف ألغي الاشتراك؟", a: "من إعدادات حسابكِ، بضغطة واحدة، وفي أيّ وقت." },
  ];
  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-20 md:py-28">
      <SectionHeader tag="أسئلة شائعة" title="إجابات سريعة" />
      <div className="mt-10 space-y-3">
        {qs.map((item) => (
          <details
            key={item.q}
            className="group rounded-2xl border border-border bg-card p-5 open:bg-card"
          >
            <summary className="flex items-center justify-between cursor-pointer text-[14.5px] font-medium list-none">
              {item.q}
              <ChevronLeft
                size={16}
                className="text-foreground/40 transition-transform group-open:-rotate-90"
              />
            </summary>
            <p className="mt-3 text-[13.5px] text-foreground/65 leading-[2]">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ───────── CTA ───────── */
function CTA() {
  return (
    <section className="px-6 pb-20">
      <div
        className="mx-auto max-w-6xl rounded-[40px] p-10 md:p-16 text-center relative overflow-hidden"
        style={{
          background: "var(--gradient-primary, var(--primary))",
          boxShadow: "0 40px 80px -20px oklch(0.46 0.135 328 / 0.45)",
        }}
      >
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute -top-20 -start-20 w-80 h-80 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-20 -end-20 w-80 h-80 rounded-full bg-white/15 blur-3xl" />
        </div>
        <h2 className="relative font-display text-4xl md:text-5xl text-primary-foreground leading-tight">
          رحلتكِ نحو صحّة أفضل تبدأ اليوم
        </h2>
        <p className="relative mt-4 text-primary-foreground/85 text-[15px] leading-[2] max-w-2xl mx-auto">
          انضمّي إلى عشرات الآلاف من النساء اللواتي اخترن شيلا — رفيقتهنّ في كلّ مرحلة.
        </p>
        <Link
          to="/onboarding/welcome"
          className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-white text-primary px-7 py-4 text-[14px] font-semibold"
        >
          ابدئي مجّاناً الآن
          <ChevronLeft size={16} strokeWidth={2.5} />
        </Link>
      </div>
    </section>
  );
}

/* ───────── Footer ───────── */
function Footer() {
  return (
    <footer className="border-t border-border/60 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 py-12 grid md:grid-cols-4 gap-8 text-[13px]">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl grid place-items-center"
              style={{ background: "var(--gradient-primary, var(--primary))" }}
            >
              <Sparkles size={14} className="text-primary-foreground" strokeWidth={2.2} />
            </div>
            <span className="font-display text-lg">شيلا</span>
          </div>
          <p className="mt-3 text-foreground/60 leading-[2] max-w-sm">
            رفيقتكِ الذكيّة في رحلة الصحّة واللّياقة — مصمَّمة بحبّ للمرأة العربيّة.
          </p>
        </div>
        <FooterCol title="المنتج" items={["المزايا", "الأسعار", "شيلا الذكيّة", "المجتمع"]} />
        <FooterCol title="الشركة" items={["عنّا", "المدوّنة", "الخصوصيّة", "تواصلي معنا"]} />
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px] text-foreground/55">
          <span>© ٢٠٢٦ شيلا. جميع الحقوق محفوظة.</span>
          <span>صُنع بحبّ ❤︎ للمرأة العربيّة</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="font-semibold mb-3">{title}</div>
      <ul className="space-y-2 text-foreground/65">
        {items.map((i) => (
          <li key={i}>
            <a href="#" className="hover:text-foreground transition">{i}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────── Helpers ───────── */
function SectionHeader({ tag, title, subtitle }: { tag: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft text-primary px-3 py-1 text-[11px] font-semibold border border-primary/15">
        {tag}
      </span>
      <h2 className="mt-4 font-display text-4xl md:text-5xl leading-tight tracking-tight">{title}</h2>
      {subtitle && <p className="mt-4 text-foreground/65 text-[15px] leading-[2]">{subtitle}</p>}
    </div>
  );
}
