export function cleanDoi(value = "") {
  return value.replace(/^https?:\/\/(dx\.)?doi\.org\//i, "").trim().toLowerCase();
}

export function normalizeTitle(value = "") {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .toLowerCase();
}

export function publicationKeys(work) {
  const keys = [];
  const doi = cleanDoi(work.doi);
  const title = normalizeTitle(work.title);
  if (doi) keys.push(`doi:${doi}`);
  if (title) keys.push(`title:${title}`);
  return keys;
}

export function workType(value = "") {
  const type = value.toLowerCase().trim();

  if (["proceedings-article", "proceedings", "conference-paper"].includes(type)) return "conference";
  if (["journal-article", "journal"].includes(type)) return "journal";
  if (["book-chapter", "book-section", "chapter"].includes(type)) return "book-chapter";
  if (["book", "monograph", "reference-book", "edited-book"].includes(type)) return "book";
  if (["posted-content", "preprint"].includes(type)) return "preprint";
  if (["dissertation", "thesis"].includes(type)) return "thesis";
  if (["presentation", "report", "dataset"].includes(type)) return type;
  return "other";
}

export function deduplicatePublications(candidates, manual) {
  const manualKeys = new Set(manual.flatMap(publicationKeys));
  const records = [];
  const keyToIndex = new Map();

  for (const item of candidates) {
    const keys = publicationKeys(item);
    if (!keys.length || keys.some((key) => manualKeys.has(key))) continue;

    const existingIndex = keys.map((key) => keyToIndex.get(key)).find((index) => index !== undefined);
    if (existingIndex === undefined) {
      const index = records.push(item) - 1;
      for (const key of keys) keyToIndex.set(key, index);
      continue;
    }

    const current = records[existingIndex];
    if (item.source === "Crossref" && current.source !== "Crossref") {
      records[existingIndex] = item;
      for (const key of publicationKeys(current)) keyToIndex.set(key, existingIndex);
      for (const key of keys) keyToIndex.set(key, existingIndex);
    }
  }

  return records;
}
