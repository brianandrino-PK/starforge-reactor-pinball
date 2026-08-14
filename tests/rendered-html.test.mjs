import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("server renders the finished cosmic pinball shell", async () => {
  const response = await render(); assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Starforge Reactor/); assert.match(html, /ORIGINAL COSMIC PINBALL/);
  assert.match(html, /Touch pinball controls/); assert.match(html, /Game status/);
  assert.match(html, /Mobile live status/); assert.match(html, /BALL/); assert.match(html, /SAVE/); assert.match(html, /BONUS/); assert.match(html, /LOCKS/); assert.match(html, /COMBO/); assert.match(html, /TILT/); assert.match(html, /WIZARD/); assert.match(html, /INPUT GUIDE/); assert.match(html, /gamepad bumpers\/A\/d-pad\/Menu\/View/);
  assert.match(html, /Compact table status/); assert.match(html, /INPUT \/ SETTINGS/); assert.doesNotMatch(html, /Mission progress|controls-panel|mission-panel/);
  assert.doesNotMatch(html, /LOCAL EVIDENCE|PROVE DIRECTIONAL RAMP/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/);
});
