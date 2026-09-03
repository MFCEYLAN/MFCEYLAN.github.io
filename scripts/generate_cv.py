#!/usr/bin/env python3
import json
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    Image,
    KeepTogether,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "content"
OUTPUT = ROOT / "public" / "cv"
OUTPUT.mkdir(parents=True, exist_ok=True)


def load(name):
    return json.loads((CONTENT / name).read_text(encoding="utf-8"))


profile = load("profile.json")
timeline = load("timeline.json")
research = load("research.json")
projects = load("projects.json")
manual_publications = load("publications.json")
auto_publications = load("publications.auto.json")
teaching = load("teaching.json")
talks = load("talks.json")
settings = load("settings.json")

regular_font = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
bold_font = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
if Path(regular_font).exists() and Path(bold_font).exists():
    pdfmetrics.registerFont(TTFont("CVSans", regular_font))
    pdfmetrics.registerFont(TTFont("CVSansBold", bold_font))
else:
    regular_font = "Helvetica"
    bold_font = "Helvetica-Bold"

FONT = "CVSans" if Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf").exists() else "Helvetica"
BOLD = "CVSansBold" if FONT == "CVSans" else "Helvetica-Bold"
BLUE = colors.HexColor("#0957D0")
NAVY = colors.HexColor("#10243D")
TEAL = colors.HexColor("#0E8F7D")
MUTED = colors.HexColor("#5E7084")
LINE = colors.HexColor("#D9E3ED")
PALE = colors.HexColor("#F2F6FA")


LABELS = {
    "en": {
        "role": "Researcher in AI Security, Edge AI & IoT Cybersecurity",
        "profile": "PROFILE",
        "research": "RESEARCH INTERESTS",
        "experience": "EXPERIENCE & EDUCATION",
        "projects": "FUNDED & SELECTED PROJECTS",
        "publications": "SELECTED PUBLICATIONS",
        "skills": "TECHNICAL SKILLS",
        "teaching": "TEACHING & MENTORING",
        "activities": "TALKS & ACADEMIC ACTIVITIES",
        "links": "PROFILES",
        "ongoing": "Ongoing",
    },
    "tr": {
        "role": "Yapay Zekâ Güvenliği, Uç Yapay Zekâ ve IoT Siber Güvenliği Araştırmacısı",
        "profile": "PROFİL",
        "research": "ARAŞTIRMA ALANLARI",
        "experience": "DENEYİM VE EĞİTİM",
        "projects": "FONLANAN VE SEÇİLİ PROJELER",
        "publications": "SEÇİLİ YAYINLAR",
        "skills": "TEKNİK YETKİNLİKLER",
        "teaching": "EĞİTİM VE MENTORLUK",
        "activities": "SUNUMLAR VE AKADEMİK ETKİNLİKLER",
        "links": "PROFİLLER",
        "ongoing": "Devam ediyor",
    },
}


def value(data, lang):
    if isinstance(data, dict) and lang in data:
        return data[lang]
    return data


def paragraph(text, style):
    return Paragraph(escape(str(text)).replace("\n", "<br/>"), style)


def make_styles():
    base = getSampleStyleSheet()
    return {
        "name": ParagraphStyle("Name", parent=base["Title"], fontName=BOLD, fontSize=20.5, leading=24, textColor=NAVY, spaceAfter=4, alignment=TA_LEFT),
        "role": ParagraphStyle("Role", parent=base["Normal"], fontName=BOLD, fontSize=9.5, leading=13, textColor=TEAL),
        "contact": ParagraphStyle("Contact", parent=base["Normal"], fontName=FONT, fontSize=7.4, leading=10.5, textColor=MUTED, alignment=TA_RIGHT),
        "section": ParagraphStyle("Section", parent=base["Heading2"], fontName=BOLD, fontSize=8.5, leading=12, textColor=BLUE, spaceBefore=10, spaceAfter=6, tracking=1.0),
        "body": ParagraphStyle("Body", parent=base["Normal"], fontName=FONT, fontSize=8.2, leading=12.2, textColor=MUTED),
        "item_title": ParagraphStyle("ItemTitle", parent=base["Normal"], fontName=BOLD, fontSize=9.1, leading=12.3, textColor=NAVY),
        "item_meta": ParagraphStyle("ItemMeta", parent=base["Normal"], fontName=FONT, fontSize=7.6, leading=10.2, textColor=TEAL),
        "small": ParagraphStyle("Small", parent=base["Normal"], fontName=FONT, fontSize=7.2, leading=10, textColor=MUTED),
    }


def section(title, styles):
    return [paragraph(title, styles["section"]), Table([[""]], colWidths=[174 * mm], rowHeights=[0.45 * mm], style=TableStyle([("BACKGROUND", (0, 0), (-1, -1), LINE)])), Spacer(1, 2.2 * mm)]


def footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(LINE)
    canvas.line(20 * mm, 13 * mm, 190 * mm, 13 * mm)
    canvas.setFont(FONT, 6.7)
    canvas.setFillColor(MUTED)
    canvas.drawString(20 * mm, 8.5 * mm, "Mustafa Furkan Ceylan")
    canvas.drawRightString(190 * mm, 8.5 * mm, str(doc.page))
    canvas.restoreState()


def publication_key(item):
    return (item.get("doi") or item.get("title", "")).lower().strip()


def build(lang):
    labels = LABELS[lang]
    styles = make_styles()
    filename = OUTPUT / f"Mustafa_Furkan_Ceylan_CV_{lang.upper()}.pdf"
    doc = BaseDocTemplate(str(filename), pagesize=A4, leftMargin=18 * mm, rightMargin=18 * mm, topMargin=16 * mm, bottomMargin=18 * mm)
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")
    doc.addPageTemplates([PageTemplate(id="cv", frames=[frame], onPage=footer)])
    story = []

    header_left = [paragraph(profile["name"], styles["name"]), paragraph(labels["role"], styles["role"])]
    header_right = paragraph(
        f'{settings["contactEmail"]}\nmfceylan.github.io\nORCID: 0009-0005-5609-395X',
        styles["contact"],
    )
    photo_path = ROOT / "assets" / "profile-cv.jpg"
    photo = Image(str(photo_path), width=24 * mm, height=24 * mm) if photo_path.exists() else ""
    header = Table([[header_left, header_right, photo]], colWidths=[100 * mm, 46 * mm, 26 * mm], hAlign="LEFT")
    header.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0)]))
    story.extend([header, Spacer(1, 5 * mm)])

    story.extend(section(labels["profile"], styles))
    for text in profile["about"][lang]:
        story.extend([paragraph(text, styles["body"]), Spacer(1, 1.8 * mm)])

    story.extend(section(labels["research"], styles))
    interests = [value(item["name"], lang) for item in research["core"]] + [value(item["name"], lang) for item in research["interdisciplinary"]]
    story.append(paragraph(" · ".join(interests), styles["body"]))

    story.extend(section(labels["experience"], styles))
    for item in timeline:
        title = value(item["title"], lang)
        meta = f'{value(item["period"], lang)} · {value(item["organization"], lang)}'
        detail = value(item["detail"], lang)
        story.append(KeepTogether([paragraph(title, styles["item_title"]), paragraph(meta, styles["item_meta"]), paragraph(detail, styles["small"]), Spacer(1, 2.6 * mm)]))

    story.extend(section(labels["projects"], styles))
    for project in projects:
        title = value(project["title"], lang)
        meta = f'{project["funder"]} · {value(project["role"], lang)} · {value(project["period"], lang)}'
        story.append(KeepTogether([paragraph(title, styles["item_title"]), paragraph(meta, styles["item_meta"]), paragraph(value(project["description"], lang), styles["small"]), Spacer(1, 2.6 * mm)]))

    story.extend(section(labels["publications"], styles))
    merged = {}
    for item in auto_publications + manual_publications:
        merged[publication_key(item)] = item
    selected = [item for item in merged.values() if item.get("selected")]
    selected.sort(key=lambda item: (-item.get("year", 0), item.get("title", "")))
    for index, item in enumerate(selected, 1):
        title = item.get("titleTr") if lang == "tr" and item.get("titleTr") else item["title"]
        doi = f' · DOI: {item["doi"]}' if item.get("doi") else ""
        story.append(KeepTogether([paragraph(f"{index}. {title}", styles["item_title"]), paragraph(", ".join(item.get("authors", [])), styles["small"]), paragraph(f'{item.get("venue", "")} ({item.get("year", "")}){doi}', styles["item_meta"]), Spacer(1, 2.4 * mm)]))

    story.extend(section(labels["skills"], styles))
    story.append(paragraph(" · ".join(research["skills"]), styles["body"]))

    story.extend(section(labels["teaching"], styles))
    for course in teaching["university"]:
        story.append(paragraph(f'{value(course["name"], lang)} - {value(course["level"], lang)}', styles["body"]))
    story.append(Spacer(1, 1.5 * mm))
    aisc_title = "AISC - AI and Security Research Group · Founding Researcher" if lang == "en" else "AISC - Yapay Zekâ ve Güvenlik Araştırma Grubu · Kurucu Araştırmacı"
    story.append(paragraph(aisc_title, styles["item_title"]))
    story.append(paragraph(" · ".join(value(item, lang) for item in teaching["mentoring"][:5]), styles["small"]))

    story.extend(section(labels["activities"], styles))
    for talk in talks:
        story.append(paragraph(value(talk["title"], lang), styles["item_title"]))
        story.append(paragraph(f'{value(talk["kind"], lang)} · {value(talk["organization"], lang)} · {value(talk["date"], lang)}', styles["small"]))

    story.extend(section(labels["links"], styles))
    story.append(paragraph(" · ".join(f'{item["label"]}: {item["url"]}' for item in profile["links"][:5]), styles["small"]))

    doc.build(story)
    print(filename)


for language in ("en", "tr"):
    build(language)
