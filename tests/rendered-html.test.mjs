import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("renders the academic portfolio and structured identity", async () => {
  const html = await readFile(new URL("../dist/client/index.html", import.meta.url), "utf8");

  assert.match(html, /Mustafa Furkan Ceylan/);
  assert.match(html, /AI Security &amp; Edge AI Researcher/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /AI Agent-Assisted Lightweight Intrusion Detection/);
  assert.match(html, /furkan\.ceylan@balikesir\.edu\.tr/);
  assert.doesNotMatch(html, /\+90\s*5\d{2}/);
});
