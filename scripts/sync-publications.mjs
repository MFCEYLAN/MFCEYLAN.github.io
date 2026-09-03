import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { cleanDoi, deduplicatePublications, workType } from "./publication-utils.mjs";

const projectRoot = process.cwd();
const manualPath = path.join(projectRoot, "content", "publications.json");
const autoPath = path.join(projectRoot, "content", "publications.auto.json");
const orcid = "0009-0005-5609-395X";
const mailto = "furkan.ceylan@balikesir.edu.tr";

const manual = JSON.parse(await readFile(manualPath, "utf8"));

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "User-Agent": `MFCEYLAN-academic-site/1.0 (mailto:${mailto})`,
      Accept: "application/json",
      ...(options.headers || {}),
    },
  });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);
  return response.json();
}

async function fromOpenAlex() {
  const authorResult = await fetchJson(
    `https://api.openalex.org/authors?filter=orcid:${orcid}&mailto=${encodeURIComponent(mailto)}`,
  );
  const author = authorResult.results?.[0];
  if (!author?.id) return [];

  const authorId = author.id.split("/").pop();
  const result = await fetchJson(
    `https://api.openalex.org/works?filter=authorships.author.id:${authorId}&per-page=100&sort=publication_date:desc&mailto=${encodeURIComponent(mailto)}`,
  );

  return (result.results || []).map((work) => ({
    title: work.title,
    authors: (work.authorships || []).map((entry) => entry.author?.display_name).filter(Boolean),
    year: work.publication_year,
    venue:
      work.primary_location?.source?.display_name ||
      work.locations?.find((location) => location.source?.display_name)?.source?.display_name ||
      "",
    type: workType(work.type_crossref || work.type),
    doi: cleanDoi(work.doi),
    url: work.primary_location?.landing_page_url || work.id,
    selected: false,
    source: "OpenAlex",
  }));
}

async function fromOrcidAndCrossref() {
  const summary = await fetchJson(`https://pub.orcid.org/v3.0/${orcid}/works`);
  const dois = new Set();
  for (const group of summary.group || []) {
    for (const external of group["external-ids"]?.["external-id"] || []) {
      if (external["external-id-type"]?.toLowerCase() === "doi") {
        dois.add(cleanDoi(external["external-id-value"]));
      }
    }
  }

  const results = [];
  for (const doi of dois) {
    try {
      const record = await fetchJson(`https://api.crossref.org/works/${encodeURIComponent(doi)}?mailto=${encodeURIComponent(mailto)}`);
      const item = record.message;
      results.push({
        title: item.title?.[0] || doi,
        authors: (item.author || []).map((author) => [author.given, author.family].filter(Boolean).join(" ")),
        year: item.published?.["date-parts"]?.[0]?.[0] || item.issued?.["date-parts"]?.[0]?.[0],
        venue: item["container-title"]?.[0] || item.publisher || "",
        type: workType(item.type),
        doi,
        url: item.URL || `https://doi.org/${doi}`,
        selected: false,
        source: "Crossref",
      });
    } catch (error) {
      console.warn(`Crossref enrichment skipped for ${doi}: ${error.message}`);
    }
  }
  return results;
}

let candidates = [];
try {
  candidates.push(...(await fromOpenAlex()));
} catch (error) {
  console.warn(`OpenAlex sync unavailable: ${error.message}`);
}

try {
  candidates.push(...(await fromOrcidAndCrossref()));
} catch (error) {
  console.warn(`ORCID/Crossref sync unavailable: ${error.message}`);
}

const output = deduplicatePublications(candidates, manual)
  .filter((item) => item.title && item.year)
  .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));

await writeFile(autoPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(`Publication sync complete: ${output.length} automatically managed record(s).`);
