import test from "node:test";
import assert from "node:assert/strict";
import {
  deduplicatePublications,
  normalizeTitle,
  publicationKeys,
  workType,
} from "../scripts/publication-utils.mjs";

test("maps scholarly source types to website publication types", () => {
  assert.equal(workType("proceedings-article"), "conference");
  assert.equal(workType("journal-article"), "journal");
  assert.equal(workType("book-chapter"), "book-chapter");
  assert.equal(workType("edited-book"), "book");
  assert.equal(workType("posted-content"), "preprint");
  assert.equal(workType("dissertation"), "thesis");
  assert.equal(workType("unknown-type"), "other");
});

test("normalizes punctuation, accents and case in titles", () => {
  assert.equal(
    normalizeTitle("Stage Classification of Alzheimer’s Disease"),
    normalizeTitle("Stage Classification of Alzheimer's Disease"),
  );
});

test("uses both DOI and normalized title as publication identities", () => {
  assert.deepEqual(publicationKeys({ title: "Example Paper", doi: "https://doi.org/10.1/ABC" }), [
    "doi:10.1/abc",
    "title:example paper",
  ]);
});

test("does not add a DOI-bearing automatic record when the manual title matches", () => {
  const manual = [{ title: "Software Unit Test Automation with LLM-Based Generative AI", doi: "" }];
  const automatic = [{
    title: "Software Unit Test Automation with LLM-Based Generative AI",
    doi: "10.1109/example",
    source: "Crossref",
  }];
  assert.deepEqual(deduplicatePublications(automatic, manual), []);
});

test("prefers Crossref metadata for duplicate automatic records", () => {
  const openAlex = { title: "Example", doi: "10.1/example", source: "OpenAlex" };
  const crossref = { title: "Example", doi: "10.1/example", source: "Crossref" };
  assert.deepEqual(deduplicatePublications([openAlex, crossref], []), [crossref]);
});
