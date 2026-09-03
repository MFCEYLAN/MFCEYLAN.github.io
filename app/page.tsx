"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Script from "next/script";
import {
  ArrowUpRight,
  BrainCircuit,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Cpu,
  Download,
  ExternalLink,
  FileText,
  Globe2,
  GraduationCap,
  Languages,
  LockKeyhole,
  Mail,
  Menu,
  Microscope,
  Moon,
  Network,
  Play,
  Radar,
  School,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Sun,
  UsersRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BrandIcon } from "@/components/brand-icon";
import profile from "@/content/profile.json";
import timeline from "@/content/timeline.json";
import research from "@/content/research.json";
import projects from "@/content/projects.json";
import publicationsManual from "@/content/publications.json";
import publicationsAuto from "@/content/publications.auto.json";
import videos from "@/content/videos.json";
import services from "@/content/services.json";
import teaching from "@/content/teaching.json";
import talks from "@/content/talks.json";
import news from "@/content/news.json";
import settings from "@/content/settings.json";

type Lang = "en" | "tr";
type Localized = { en: string; tr: string };
type Publication = {
  title: string;
  titleTr?: string;
  authors: string[];
  year: number;
  venue: string;
  type: string;
  doi?: string;
  isbn?: string;
  url?: string;
  selected?: boolean;
};

const copy = {
  en: {
    nav: [
      ["Research", "research"],
      ["Journey", "journey"],
      ["Projects", "projects"],
      ["Publications", "publications"],
      ["Teaching & Media", "teaching"],
      ["Collaboration", "collaboration"],
    ],
    eyebrow: "AI  · CYBERSECURITY · RESEARCHER",
    intro:
      "I transform artificial intelligence, data analytics and software technologies into reliable and practical solutions for academic research and real-world problems.",
    explore: "Explore research",
    contact: "Start a conversation",
    cv: "Download CV",
    researchTitle: "Research focus",
    researchLead:
      "A focused programme connecting intelligent detection, efficient deployment and trustworthy human-AI decision support.",
    core: "Core research",
    interdisciplinary: "Interdisciplinary work",
    skills: "Technical toolkit",
    journeyTitle: "Experience & education",
    journeyLead:
      journeyLead:
      "A chronological overview of education, academic roles, industry experience and international research activities.",
    all: "All",
    education: "Education",
    academic: "Academic",
    industry: "Industry",
    international: "International",
    projectsTitle: "Selected projects",
    projectsLead:
      "Funded research, student research leadership and applied network-security work.",
    publicationsTitle: "Selected publications",
    publicationsLead:
      "Peer-reviewed work across AI security, edge systems, software engineering and interdisciplinary AI.",
    selected: "Selected",
    allPublications: "All publications",
    showAll: "View complete publication list",
    showSelected: "Show selected publications",
    doi: "View DOI",
    teachingTitle: "Teaching & media",
    teachingLead:
      "University teaching, research mentoring and accessible technical education.",
    universityTeaching: "University teaching",
    mentoring: "Research mentoring",
    featuredVideos: "Featured videos",
    allVideos: "View all on YouTube",
    talks: "Talks & academic activities",
    collaborationTitle: "Areas of collaboration",
    collaborationLead:
      "Open to focused research, AI development, training and interdisciplinary initiatives.",
    updatesTitle: "News & updates",
    updatesLead: "Recent research, community and international activities.",
    readLinkedin: "View on LinkedIn",
    contactTitle: "Let’s explore a useful collaboration.",
    contactLead:
      "For research collaboration, selected AI projects, technical training or invited talks, contact me by email.",
    email: "Email me",
    formSoon: "A structured inquiry form can be enabled later from the site settings.",
    footer: "Researcher in AI Security, Edge AI & IoT Cybersecurity",
    updated: "Content is maintained from structured JSON files.",
    menu: "Menu",
    about: "About",
    researchGroup: "Research group",
    event: "Event",
    internationalUpdate: "International",
  },
  tr: {
    nav: [
      ["Araştırma", "research"],
      ["Özgeçmiş", "journey"],
      ["Projeler", "projects"],
      ["Yayınlar", "publications"],
      ["Eğitim & İçerik", "teaching"],
      ["İş Birliği", "collaboration"],
    ],
    eyebrow: "YAPAY ZEKÂ · SİBER GÜVENLİK · ARAŞTIRMACI",
    intro:
      "Yapay zekâ, veri analitiği ve yazılım teknolojilerini akademik araştırmalar ve gerçek dünya problemleri için güvenilir ve uygulanabilir çözümlere dönüştürüyorum.",
    explore: "Araştırmayı incele",
    contact: "İletişime geç",
    cv: "CV'yi indir",
    researchTitle: "Araştırma odağı",
    researchLead:
      "Akıllı tespit, verimli dağıtım ve güvenilir insan-yapay zekâ karar desteğini birleştiren odaklı bir araştırma programı.",
    core: "Temel araştırma",
    interdisciplinary: "Disiplinler arası çalışmalar",
    skills: "Teknik yetkinlikler",
    journeyTitle: "Deneyim ve eğitim",
    journeyLead:
      journeyLead: 
      "Eğitim, akademik görevler, sektör deneyimi ve uluslararası araştırma çalışmalarının kronolojik özeti.",
    all: "Tümü",
    education: "Eğitim",
    academic: "Akademik",
    industry: "Sektör",
    international: "Uluslararası",
    projectsTitle: "Seçili projeler",
    projectsLead:
      "Fonlanan araştırmalar, öğrenci araştırma liderliği ve uygulamalı ağ güvenliği çalışmaları.",
    publicationsTitle: "Seçili yayınlar",
    publicationsLead:
      "Yapay zekâ güvenliği, uç sistemler, yazılım mühendisliği ve disiplinler arası yapay zekâ çalışmaları.",
    selected: "Seçili",
    allPublications: "Tüm yayınlar",
    showAll: "Tüm yayın listesini görüntüle",
    showSelected: "Seçili yayınları göster",
    doi: "DOI'yi aç",
    teachingTitle: "Eğitim ve içerikler",
    teachingLead:
      "Üniversite eğitimi, araştırma mentorluğu ve erişilebilir teknik içerikler.",
    universityTeaching: "Üniversite eğitimi",
    mentoring: "Araştırma mentorluğu",
    featuredVideos: "Öne çıkan videolar",
    allVideos: "Tümünü YouTube'da gör",
    talks: "Sunumlar ve akademik etkinlikler",
    collaborationTitle: "İş birliği alanları",
    collaborationLead:
      "Odaklı araştırmalara, yapay zekâ geliştirme çalışmalarına, eğitimlere ve disiplinler arası girişimlere açık.",
    updatesTitle: "Haberler ve gelişmeler",
    updatesLead: "Güncel araştırma, topluluk ve uluslararası faaliyetler.",
    readLinkedin: "LinkedIn'de görüntüle",
    contactTitle: "Faydalı bir iş birliğini birlikte değerlendirelim.",
    contactLead:
      "Araştırma iş birliği, seçili yapay zekâ projeleri, teknik eğitim veya davetli konuşmalar için e-posta ile ulaşabilirsiniz.",
    email: "E-posta gönder",
    formSoon: "Yapılandırılmış başvuru formu daha sonra site ayarlarından etkinleştirilebilir.",
    footer: "Yapay Zekâ Güvenliği, Uç Yapay Zekâ ve IoT Siber Güvenliği Araştırmacısı",
    updated: "İçerik, yapılandırılmış JSON dosyalarından yönetilir.",
    menu: "Menü",
    about: "Hakkımda",
    researchGroup: "Araştırma grubu",
    event: "Etkinlik",
    internationalUpdate: "Uluslararası",
  },
} as const;

const iconMap = {
  shield: ShieldCheck,
  radar: Radar,
  network: Network,
  cpu: Cpu,
  brain: BrainCircuit,
  lock: LockKeyhole,
  system: Microscope,
  medicine: Stethoscope,
};

const timelineIconMap: Record<string, typeof GraduationCap> = {
  education: GraduationCap,
  academic: School,
  industry: BriefcaseBusiness,
  international: Globe2,
};

function getText(value: Localized, lang: Lang) {
  return value[lang];
}

function publicationKey(publication: Publication) {
  return publication.doi?.toLowerCase().trim() || publication.title.toLowerCase().trim();
}

function NavLinks({ items, mobile = false }: { items: readonly (readonly [string, string])[]; mobile?: boolean }) {
  return (
    <>
      {items.map(([label, anchor]) => {
        const link = <a key={anchor} href={`#${anchor}`} className={mobile ? "mobile-nav-link" : "nav-link"}>{label}</a>;
        return mobile ? <SheetClose asChild key={anchor}>{link}</SheetClose> : link;
      })}
    </>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [dark, setDark] = useState(false);
  const [showAllPublications, setShowAllPublications] = useState(false);
  const t = copy[lang];

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("mfc-language") as Lang | null;
    const initialLanguage =
      savedLanguage === "en" || savedLanguage === "tr"
        ? savedLanguage
        : window.navigator.language.toLowerCase().startsWith("tr")
          ? "tr"
          : "en";
    const savedTheme = window.localStorage.getItem("mfc-theme");
    const initialDark =
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    window.queueMicrotask(() => {
      setLang(initialLanguage);
      setDark(initialDark);
      document.documentElement.classList.toggle("dark", initialDark);
    });
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem("mfc-language", lang);
  }, [lang]);

  const publications = useMemo(() => {
    const merged = [...(publicationsAuto as Publication[]), ...(publicationsManual as Publication[])];
    return Array.from(new Map(merged.map((item) => [publicationKey(item), item])).values()).sort(
      (a, b) => b.year - a.year || a.title.localeCompare(b.title),
    );
  }, []);

  const visiblePublications = showAllPublications
    ? publications
    : publications.filter((item) => item.selected);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("mfc-theme", next ? "dark" : "light");
  };

  const track = (eventName: string) => {
    const tracker = (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag;
    tracker?.("event", eventName);
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: settings.siteUrl,
    image: `${settings.siteUrl}/profile.webp`,
    jobTitle: "Researcher in AI Security, Edge AI and IoT Cybersecurity",
    email: `mailto:${settings.contactEmail}`,
    affiliation: { "@type": "Organization", name: "Balıkesir University" },
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Balıkesir University" },
      { "@type": "CollegeOrUniversity", name: "Uludağ University" },
    ],
    sameAs: profile.links.map((link) => link.url),
  };

  return (
    <main>
      {settings.googleAnalyticsId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${settings.googleAnalyticsId}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${settings.googleAnalyticsId}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />

      <header className="site-header">
        <a href="#top" className="brand" aria-label={`${profile.name} home`}>
          <span className="brand-mark">MFC</span>
          <span className="brand-name">{profile.name}</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation"><NavLinks items={t.nav} /></nav>
        <div className="header-actions">
          <Button variant="ghost" size="sm" className="language-button" onClick={() => setLang(lang === "en" ? "tr" : "en")} aria-label={lang === "en" ? "Türkçeye geç" : "Switch to English"}>
            <Languages /> {lang === "en" ? "TR" : "EN"}
          </Button>
          <Button variant="ghost" size="icon-sm" onClick={toggleTheme} aria-label="Toggle color theme">
            {dark ? <Sun /> : <Moon />}
          </Button>
          <Sheet>
            <SheetTrigger asChild><Button variant="outline" size="icon-sm" className="mobile-menu-button" aria-label={t.menu}><Menu /></Button></SheetTrigger>
            <SheetContent className="mobile-sheet">
              <SheetHeader><SheetTitle>{profile.name}</SheetTitle><SheetDescription>{t.footer}</SheetDescription></SheetHeader>
              <nav className="mobile-nav" aria-label="Mobile navigation"><NavLinks items={t.nav} mobile /><SheetClose asChild><a className="mobile-nav-link accent" href="#contact">{t.contact}</a></SheetClose></nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section id="top" className="hero section-shell">
        <div className="hero-copy">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1>{profile.name}</h1>
          <p className="hero-role">{getText(profile.role, lang)}</p>
          <p className="hero-intro">{t.intro}</p>
          <p className="availability">{getText(profile.availability, lang)}</p>
          <div className="hero-actions">
            <Button asChild size="lg" className="primary-action"><a href="#research">{t.explore}<ChevronRight /></a></Button>
            <Button asChild size="lg" variant="outline" className="secondary-action"><a href={`mailto:${settings.contactEmail}`} onClick={() => track("email_click")}><Mail />{t.contact}</a></Button>
            <Button asChild size="lg" variant="ghost" className="cv-action"><a href={`/cv/Mustafa_Furkan_Ceylan_CV_${lang.toUpperCase()}.pdf`} onClick={() => track("cv_download")}><Download />{t.cv}</a></Button>
          </div>
          <div className="social-row" aria-label="Academic and social profiles">
            {profile.links.map((link) => {
              return <a key={link.label} href={link.url} target="_blank" rel="noreferrer" aria-label={link.label} title={link.label} onClick={() => track(`${link.kind}_click`)}><BrandIcon brand={link.kind} /></a>;
            })}
          </div>
        </div>
        <div className="portrait-stage" aria-label={`${profile.name} portrait`}>
          <div className="portrait-grid" /><div className="portrait-ring ring-one" /><div className="portrait-ring ring-two" />
          <div className="portrait-frame"><Image src="/profile.webp" alt={`${profile.name}, AI security and edge AI researcher`} width={1437} height={1437} priority unoptimized /></div>
          <div className="portrait-note note-top"><ShieldCheck /><span>AI Security</span></div>
          <div className="portrait-note note-bottom"><Cpu /><span>Edge AI</span></div>
        </div>
      </section>

      <section className="about-strip section-shell">
        <div className="about-label"><Sparkles />{t.about}</div>
        <div className="about-copy">{profile.about[lang].map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      </section>

      <section id="research" className="content-section section-shell">
        <SectionHeading title={t.researchTitle} lead={t.researchLead} number="01" />
        <div className="research-grid">
          <div className="research-panel primary-panel">
            <p className="panel-kicker">{t.core}</p>
            <div className="focus-list">
              {research.core.map((item, index) => {
                const Icon = iconMap[item.icon as keyof typeof iconMap] ?? Microscope;
                return <article key={item.name.en} className="focus-item"><span className="focus-number">0{index + 1}</span><Icon /><h3>{getText(item.name, lang)}</h3></article>;
              })}
            </div>
          </div>
          <div className="research-side">
            <div className="research-panel medicine-panel"><p className="panel-kicker">{t.interdisciplinary}</p><Stethoscope /><h3>{getText(research.interdisciplinary[0].name, lang)}</h3><p>{lang === "en" ? "Interdisciplinary machine learning for health and medical data." : "Sağlık ve tıbbi veriler için disiplinler arası makine öğrenmesi."}</p></div>
            <div className="research-panel skills-panel"><p className="panel-kicker">{t.skills}</p><div className="skill-cloud">{research.skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div>
          </div>
        </div>
      </section>

      <section id="journey" className="content-section section-shell">
        <SectionHeading title={t.journeyTitle} lead={t.journeyLead} number="02" />
        <Tabs defaultValue="all" className="journey-tabs">
          <TabsList className="journey-tab-list">
            {(["all", "education", "academic", "industry", "international"] as const).map((filter) => <TabsTrigger key={filter} value={filter}>{t[filter]}</TabsTrigger>)}
          </TabsList>
          {(["all", "education", "academic", "industry", "international"] as const).map((filter) => (
            <TabsContent key={filter} value={filter}>
              <div className="timeline">
                {timeline.filter((item) => filter === "all" || item.type === filter).map((item) => {
                  const Icon = timelineIconMap[item.type] ?? CalendarDays;
                  return <article key={`${item.period.en}-${item.title.en}`} className={`timeline-item ${item.type}`}><div className="timeline-marker"><Icon /></div><div className="timeline-period">{getText(item.period, lang)}</div><div className="timeline-card"><p>{getText(item.organization, lang)}</p><h3>{getText(item.title, lang)}</h3><span>{getText(item.detail, lang)}</span></div></article>;
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <section id="projects" className="content-section section-shell">
        <SectionHeading title={t.projectsTitle} lead={t.projectsLead} number="03" />
        <div className="project-grid">
          {projects.map((project, index) => (
            <article key={project.title.en} className={`project-card project-${index + 1}`}>
              <div className="project-topline"><span>{project.funder}</span><span className="status-dot"><i />{getText(project.status, lang)}</span></div>
              <h3>{getText(project.title, lang)}</h3><p className="project-description">{getText(project.description, lang)}</p>
              <div className="project-meta"><span><BriefcaseBusiness />{getText(project.role, lang)}</span><span><CalendarDays />{getText(project.period, lang)}</span></div>
              <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              {"url" in project && project.url && <a className="inline-link" href={project.url} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight /></a>}
            </article>
          ))}
        </div>
      </section>

      <section id="publications" className="content-section section-shell">
        <SectionHeading title={t.publicationsTitle} lead={t.publicationsLead} number="04" />
        <div className="publication-toolbar"><span>{showAllPublications ? t.allPublications : t.selected}</span><span>{visiblePublications.length.toString().padStart(2, "0")}</span></div>
        <div className="publication-list">
          {visiblePublications.map((publication, index) => (
            <article className="publication-item" key={publicationKey(publication)}>
              <div className="publication-index">{String(index + 1).padStart(2, "0")}</div>
              <div className="publication-body"><div className="publication-meta"><span>{publication.year}</span><span>{publication.type.replace("-", " ")}</span></div><h3>{lang === "tr" && publication.titleTr ? publication.titleTr : publication.title}</h3><p className="publication-authors">{publication.authors.join(", ")}</p><p className="publication-venue">{publication.venue}</p></div>
              <div className="publication-action">{publication.doi ? <a href={`https://doi.org/${publication.doi}`} target="_blank" rel="noreferrer" aria-label={`${t.doi}: ${publication.title}`}><ExternalLink /></a> : <FileText />}</div>
            </article>
          ))}
        </div>
        <Button variant="outline" size="lg" className="section-toggle" onClick={() => setShowAllPublications(!showAllPublications)}>{showAllPublications ? t.showSelected : t.showAll}<ChevronRight /></Button>
      </section>

      <section id="teaching" className="content-section section-shell">
        <SectionHeading title={t.teachingTitle} lead={t.teachingLead} number="05" />
        <div className="teaching-grid">
          <div className="teaching-card university-card"><div className="card-icon"><School /></div><p className="panel-kicker">{t.universityTeaching}</p>{teaching.university.map((course) => <article key={course.name.en}><h3>{getText(course.name, lang)}</h3><p>{getText(course.level, lang)}</p></article>)}</div>
          <div className="teaching-card mentoring-card"><div className="card-icon"><UsersRound /></div><p className="panel-kicker">{t.mentoring}</p><h3>{lang === "en" ? "AISC - AI and Security Research Group" : "AISC - Yapay Zekâ ve Güvenlik Araştırma Grubu"}</h3><ul>{teaching.mentoring.slice(0, 5).map((item) => <li key={item.en}><CheckCircle2 />{getText(item, lang)}</li>)}</ul><a className="inline-link" href="https://www.linkedin.com/company/baun-artificial-intelligence-security-research-lab/" target="_blank" rel="noreferrer">AISC LinkedIn <ArrowUpRight /></a></div>
        </div>

        <div className="video-heading"><div><p className="panel-kicker">{t.featuredVideos}</p><h3>{lang === "en" ? "Research ideas, explained clearly." : "Araştırma fikirleri, anlaşılır biçimde."}</h3></div><a className="inline-link" href="https://www.youtube.com/@mustafafurkanceylan/featured" target="_blank" rel="noreferrer" onClick={() => track("youtube_click")}>{t.allVideos}<ArrowUpRight /></a></div>
        <div className="video-grid">
          {videos.map((video) => <a key={video.id} className="video-card" href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer" onClick={() => track("youtube_click")}><div className="video-image"><Image src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt={getText(video.title, lang)} width={480} height={360} unoptimized /><span><Play fill="currentColor" /></span></div><p>{getText(video.category, lang)}</p><h3>{getText(video.title, lang)}</h3></a>)}
        </div>

        <div className="talks-strip"><div className="talks-icon"><Microscope /></div><div><p className="panel-kicker">{t.talks}</p>{talks.map((talk) => <article key={talk.title.en}><h3>{getText(talk.title, lang)}</h3><p>{getText(talk.kind, lang)} · {getText(talk.organization, lang)} · {getText(talk.date, lang)}</p></article>)}</div></div>
      </section>

      <section id="collaboration" className="content-section section-shell collaboration-section">
        <SectionHeading title={t.collaborationTitle} lead={t.collaborationLead} number="06" />
        <div className="service-grid">{services.map((service, index) => <article key={service.title.en} className="service-card"><span>{String(index + 1).padStart(2, "0")}</span><h3>{getText(service.title, lang)}</h3><p>{getText(service.description, lang)}</p></article>)}</div>
      </section>

      <section className="content-section section-shell">
        <SectionHeading title={t.updatesTitle} lead={t.updatesLead} number="07" />
        <div className="news-grid">
          {news.slice(0, 3).map((item) => {
            const typeLabel = item.type === "research-group" ? t.researchGroup : item.type === "international" ? t.internationalUpdate : t.event;
            const dateLabel = new Intl.DateTimeFormat(lang === "tr" ? "tr-TR" : "en-GB", { month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(item.date));
            return <a key={item.url} href={item.url} target="_blank" rel="noreferrer" className="news-card"><div className="news-date"><CalendarDays /><strong>{dateLabel}</strong></div><div><p>{typeLabel}</p><h3>{getText(item.title, lang)}</h3><span className="inline-link">{t.readLinkedin}<ArrowUpRight /></span></div></a>;
          })}
        </div>
      </section>

      <section id="contact" className="contact-section section-shell">
        <div className="contact-pattern" />
        <div className="contact-content"><p className="eyebrow">RESEARCH · AI · EDUCATION</p><h2>{t.contactTitle}</h2><p>{t.contactLead}</p><div className="contact-actions"><Button asChild size="lg" className="contact-button"><a href={`mailto:${settings.contactEmail}`} onClick={() => track("email_click")}><Mail />{t.email}<ArrowUpRight /></a></Button>{settings.googleFormUrl ? <Button asChild size="lg" variant="outline"><a href={settings.googleFormUrl} target="_blank" rel="noreferrer" onClick={() => track("contact_form_open")}><FileText />Form</a></Button> : null}</div>{!settings.googleFormUrl && <small>{t.formSoon}</small>}</div>
        <div className="contact-email">{settings.contactEmail}</div>
      </section>

      <footer className="site-footer section-shell">
        <div><span className="brand-mark">MFC</span><div><strong>{profile.name}</strong><p>{t.footer}</p></div></div>
        <p>{t.updated}</p>
        <div className="footer-links">{profile.links.slice(0, 5).map((link) => <a key={link.label} href={link.url} target="_blank" rel="noreferrer">{link.label}</a>)}</div>
      </footer>
    </main>
  );
}

function SectionHeading({ title, lead, number }: { title: string; lead: string; number: string }) {
  return <div className="section-heading"><span>{number}</span><div><h2>{title}</h2><p>{lead}</p></div></div>;
}
