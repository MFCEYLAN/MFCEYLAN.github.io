# Mustafa Furkan Ceylan - Academic Website

Bilingual academic portfolio for research, publications, funded projects, teaching, media and professional collaboration in AI security, edge AI and IoT cybersecurity.

## Content management

All editable content is stored in the `content` directory as JSON. See `SITE_YONETIM_REHBERI.md` for the Turkish management guide.

## Local development

```bash
npm ci
npm run dev
```

## Build

```bash
python -m pip install -r requirements-cv.txt
python scripts/generate_cv.py
npm run build
```

## Automation

The GitHub Pages workflow builds and deploys the site on every change. A weekly scheduled run checks ORCID, OpenAlex and Crossref for new publications, rebuilds both CV PDFs and republishes the site.
