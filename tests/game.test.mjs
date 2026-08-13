import assert from "node:assert/strict";
import test from "node:test";
import { FIXTURES, TABLE } from "../app/game/config.js";
import { applyNudge, createGame, drainBall, hitFixture, launch, restart, runFixed, setPaused, startCharge, step, takeFeedback } from "../app/game/core.js";
import { clearActions, gamepadActions } from "../app/game/input.js";
import { loadPreferences, savePreferences } from "../app/game/persistence.js";

const fixture = (kind, id = kind, index = 0) => ({ kind, id, index, x: 0, y: 0, r: 1 });
const live = () => { const g = createGame(); startCharge(g); step(g, 1); launch(g); g.ballSave = 0; return g; };
const shootRamp = (g, side = "left") => {
  const ball = g.balls[0]; const x = side === "left" ? 145 : 555;
  Object.assign(ball, { x, y: 575, vx:0, vy:-300, rampTrack:null }); step(g, TABLE.fixedStep, {});
  Object.assign(ball, { x, y:405, vx:0, vy:-300 }); step(g, TABLE.fixedStep, {});
};

test("launch, three-ball lifecycle, bonus, game over and restart", () => {
  const g = live(); assert.equal(g.mode, "live"); hitFixture(g, fixture("bumper")); const before = g.score; drainBall(g); assert.equal(g.mode, "ready"); assert.ok(g.score > before);
  launch(g); g.ballSave = 0; drainBall(g); launch(g); g.ballSave = 0; drainBall(g); assert.equal(g.mode, "gameover"); restart(g); assert.equal(g.mode, "ready"); assert.equal(g.ballsRemaining, 3);
});

test("ball save, scoring attribution and fixture debounce", () => {
  const g = live(); g.ballSave = 2; drainBall(g); assert.equal(g.mode, "ready"); assert.equal(g.ballsRemaining, 3);
  launch(g); const b = fixture("bumper"); assert.equal(hitFixture(g, b), true); const score = g.score; assert.equal(hitFixture(g, b), false); assert.equal(g.score, score); assert.equal(score, TABLE.scoring.bumper);
});

test("targets raise multiplier and earn an extra ball through production rules", () => {
  const g = live(); g.score = 99000;
  for (let i = 0; i < 4; i++) { g.occupied.clear(); hitFixture(g, fixture("target", `t${i}`, i)); }
  assert.equal(g.multiplier, 2); assert.equal(g.wizardProgress & 4, 4);
  for (let i = 0; i < 4; i++) { g.occupied.clear(); hitFixture(g, fixture("target", `u${i}`, i)); }
  assert.equal(g.multiplier, 3); assert.equal(g.extraBallEarned, true); assert.equal(g.ballsRemaining, 4);
});

test("combo starts, scores, and expires", () => {
  const g = live(); g.ballTime = 10; hitFixture(g, fixture("lane", "lane-left")); g.occupied.clear(); hitFixture(g, fixture("lane", "lane-right")); assert.equal(g.comboCount, 1); step(g, TABLE.comboSeconds + 0.1); assert.equal(g.comboTimer, 0); assert.equal(g.comboSide, null);
});

test("ramp locks start bounded three-ball multiball and light jackpot", () => {
  const g = live(); shootRamp(g, "left"); shootRamp(g, "right"); assert.equal(g.multiball, true); assert.equal(g.balls.length, 3); assert.equal(g.jackpotLit, true);
  g.occupied.clear(); const score = g.score; hitFixture(g, fixture("reactor")); assert.ok(g.score - score >= TABLE.scoring.jackpot);
});

test("wizard qualifies through skill, combo, bank and multiball, then completes", () => {
  const g = live(); hitFixture(g, fixture("lane", "lane-left")); g.occupied.clear(); g.ballTime = 10; hitFixture(g, fixture("lane", "lane-right")); g.occupied.clear(); hitFixture(g, fixture("lane", "lane-left"));
  for (let i = 0; i < 4; i++) { g.occupied.clear(); hitFixture(g, fixture("target", `t${i}`, i)); }
  shootRamp(g, "left"); shootRamp(g, "right"); assert.equal(g.mode, "wizard");
  g.occupied.clear(); hitFixture(g, fixture("reactor")); assert.equal(g.wizardComplete, true); assert.equal(g.mode, "live");
});

test("nudge warnings tilt on third accepted input and pause freezes timers", () => {
  const g = live(); applyNudge(g, -1); g.nudgeCooldown = 0; applyNudge(g, 1); g.nudgeCooldown = 0; applyNudge(g, -1); assert.equal(g.tilted, true);
  const time = g.ballTime; setPaused(g, true); step(g, 2); assert.equal(g.ballTime, time); setPaused(g, false); assert.equal(g.mode, "live");
});

test("fixed step is render-schedule equivalent and catch-up is bounded", () => {
  const a = live(); const b = structuredClone({ ...a, occupied: [] }); b.occupied = new Set();
  let aa = 0, ab = 0; for (let i = 0; i < 120; i++) aa = runFixed(a, 1/120, {}, aa); for (let i = 0; i < 60; i++) ab = runFixed(b, 1/60, {}, ab);
  assert.ok(Math.abs(a.balls[0].x - b.balls[0].x) < 0.001); assert.ok(Math.abs(a.balls[0].y - b.balls[0].y) < 0.001);
  const y = a.balls[0].y; runFixed(a, 10, {}, 0); assert.ok(Math.abs(a.balls[0].y - y) < 200);
});

test("input normalization and cleanup cover gamepad disconnect/cancellation", () => {
  const actions = gamepadActions({ buttons: [{ pressed:true },{},{},{},{ pressed:true },{ pressed:true },{},{},{ pressed:true },{ pressed:true }], axes:[0] }); assert.equal(actions.plunge, true); assert.equal(actions.left, true); assert.equal(actions.right, true); assert.equal(actions.restart, true); assert.equal(actions.pause, true);
  clearActions(actions); assert.ok(Object.values(actions).every((v) => v === false)); assert.deepEqual(gamepadActions(null), { left:false, right:false, plunge:false, nudgeLeft:false, nudgeRight:false, pause:false, restart:false });
});

test("storage persists only preferences/best and safely rejects corruption/denial", () => {
  const memory = { value:null, getItem(){ return this.value; }, setItem(_k,v){ this.value=v; } }; assert.equal(savePreferences(memory, { sfxMuted:true, musicMuted:false, best:123 }), true); assert.deepEqual(loadPreferences(memory), { sfxMuted:true, musicMuted:false, best:123 }); assert.doesNotMatch(memory.value, /score|balls|mode|email|name/i);
  memory.value = "{"; assert.equal(loadPreferences(memory).best, 0); const denied = { getItem(){ throw Error("denied"); }, setItem(){ throw Error("denied"); } }; assert.equal(loadPreferences(denied).best, 0); assert.equal(savePreferences(denied, {}), false);
});

test("supported-speed walls, target, ramp, flipper zone, and drain stay resolvable", () => {
  const g = live(); Object.assign(g.balls[0], { x:60, y:100, vx:-TABLE.maxSpeed, vy:-TABLE.maxSpeed }); step(g, 0.05); assert.ok(g.balls[0].x >= 44 + TABLE.ballRadius); assert.ok(g.balls[0].y >= 50 + TABLE.ballRadius);
  Object.assign(g.balls[0], { x:250, y:620, vx:0, vy:TABLE.maxSpeed }); step(g, TABLE.fixedStep, {}); assert.ok(g.score >= TABLE.scoring.target);
  shootRamp(g, "left"); assert.equal(g.locks, 1);
  const beforeVy = TABLE.maxSpeed; Object.assign(g.balls[0], { x:220, y:870, vx:0, vy:beforeVy }); step(g, TABLE.fixedStep, { left:true }); assert.ok(g.balls[0].vy < beforeVy);
  g.ballSave = 0; Object.assign(g.balls[0], { x:350, y:TABLE.height + 50, vx:0, vy:300 }); step(g, TABLE.fixedStep, {}); assert.equal(g.mode, "ready");
});

test("wizard timeout is terminal until a fresh legal qualification", () => {
  const g = live(); g.wizardProgress = 15; hitFixture(g, fixture("bumper", "qualifier")); assert.equal(g.mode, "wizard"); g.wizardTimer = 0.01; step(g, 0.02); assert.equal(g.mode, "live"); assert.equal(g.wizardOutcome, "failed"); assert.equal(g.wizardProgress, 0);
  g.occupied.clear(); hitFixture(g, fixture("bumper", "ordinary")); assert.equal(g.mode, "live");
  g.ballSave = 0; drainBall(g); launch(g); hitFixture(g, fixture("lane", "lane-left")); g.occupied.clear(); g.ballTime = 10; hitFixture(g, fixture("lane", "lane-right")); g.occupied.clear(); hitFixture(g, fixture("lane", "lane-left"));
  for (let i = 0; i < 4; i++) { g.occupied.clear(); hitFixture(g, fixture("target", `requalify-${i}`, i)); }
  shootRamp(g, "left"); shootRamp(g, "right"); assert.equal(g.mode, "wizard"); assert.equal(g.wizardOutcome, "active");
});

test("ball-scoped contacts let two multiballs collide and debounce independently", () => {
  const g = live(); shootRamp(g, "left"); shootRamp(g, "right"); const bumper = FIXTURES.find((item)=>item.id==="bumper-a");
  const [a,b] = g.balls; Object.assign(a,{x:bumper.x,y:bumper.y+50,vx:0,vy:-100}); Object.assign(b,{x:bumper.x,y:bumper.y-50,vx:0,vy:100});
  const before = g.score; step(g,TABLE.fixedStep,{}); assert.equal(g.score - before, TABLE.scoring.bumper * 2 * g.multiplier); assert.ok(a.vy>0); assert.ok(b.vy<0);
  assert.ok(g.occupied.has(`${a.id}:bumper-a`)); assert.ok(g.occupied.has(`${b.id}:bumper-a`));
  const debounced = g.score; step(g,TABLE.fixedStep,{}); assert.equal(g.score,debounced);
});

test("feedback queue continues beyond capped history and restart drops stale events", () => {
  const g = live(); takeFeedback(g);
  for (let i = 0; i < 30; i++) { g.occupied.clear(); hitFixture(g, fixture("bumper", `event-${i}`)); }
  const batch = takeFeedback(g); assert.equal(batch.length, 30); assert.equal(g.events.length, 24); const lastId = batch.at(-1).id;
  restart(g); assert.deepEqual(takeFeedback(g), []); launch(g); const next = takeFeedback(g); assert.equal(next.length, 1); assert.ok(next[0].id > lastId);
});

test("skill shot awards once per ball and resets on the next launch", () => {
  const g = live(); const lane = fixture("lane", "lane-left"); hitFixture(g, lane); g.occupied.clear(); hitFixture(g, fixture("lane", "lane-right")); g.occupied.clear(); hitFixture(g, lane);
  assert.equal(g.events.filter((event) => event.label === "SKILL SHOT").length, 1);
  g.ballSave = 0; drainBall(g); launch(g); hitFixture(g, lane); assert.equal(g.events.filter((event) => event.label === "SKILL SHOT").length, 2);
});

test("directional ramp rejects side/reverse contact and requires entrance-to-exit travel", () => {
  const g = live(); const ball = g.balls[0];
  Object.assign(ball,{x:145,y:405,vx:0,vy:300,rampTrack:null}); step(g,TABLE.fixedStep,{}); assert.equal(g.locks,0);
  Object.assign(ball,{x:220,y:575,vx:0,vy:-300,rampTrack:null}); step(g,TABLE.fixedStep,{}); Object.assign(ball,{x:174,y:405,vx:0,vy:-300}); step(g,TABLE.fixedStep,{}); assert.equal(g.locks,0);
  shootRamp(g,"left"); assert.equal(g.locks,1);
});

test("gamepad restart is edge-triggerable and disconnect clears held state", () => {
  const pressed = gamepadActions({buttons:[{},{},{},{},{},{},{},{},{pressed:true}],axes:[0]}); const held = gamepadActions({buttons:[{},{},{},{},{},{},{},{},{pressed:true}],axes:[0]}); const released = gamepadActions(null);
  let previous = released; let edges = 0; for (const current of [pressed,held,released,pressed]) { if (current.restart && !previous.restart) edges += 1; previous = current; }
  assert.equal(edges,2); assert.equal(released.restart,false); assert.ok(Object.values(released).every((value)=>value===false));
});
