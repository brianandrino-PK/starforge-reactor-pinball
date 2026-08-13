import { FIXTURES, RAMP_PATHS, TABLE } from "./config.js";

const makeBall = (id, x = 626, y = 925) => ({ id, x, y, vx: 0, vy: 0, active: true, skillShotOpen: false, rampTrack: null });

export function createGame() {
  return {
    mode: "ready",
    resumeMode: "ready",
    score: 0,
    best: 0,
    ballsRemaining: 3,
    balls: [makeBall(1)],
    nextBallId: 2,
    charge: 0,
    ballTime: 0,
    ballSave: 0,
    bonus: 0,
    multiplier: 1,
    targets: [false, false, false, false],
    comboSide: null,
    comboTimer: 0,
    comboCount: 0,
    locks: 0,
    multiball: false,
    extraBallLit: false,
    extraBallEarned: false,
    jackpotLit: false,
    wizardProgress: 0,
    wizardTimer: 0,
    wizardComplete: false,
    wizardOutcome: "unqualified",
    tiltWarnings: 0,
    tilted: false,
    nudgeCooldown: 0,
    occupied: new Set(),
    events: [],
    feedbackQueue: [],
    nextEventId: 1,
    message: "Hold SPACE or PLUNGE, then release",
  };
}

function emit(game, type, label, points = 0) {
  const event = { id: game.nextEventId++, type, label, points };
  game.events.push(event);
  game.feedbackQueue.push(event);
  if (game.events.length > 24) game.events.shift();
}

export function takeFeedback(game) {
  return game.feedbackQueue.splice(0);
}

function award(game, points, label) {
  const scored = points * game.multiplier;
  game.score += scored;
  game.bonus += Math.floor(points / 10);
  game.best = Math.max(game.best, game.score);
  game.message = label;
  emit(game, "score", label, scored);
}

function maybeStartWizard(game) {
  if (game.wizardProgress === 15 && game.mode !== "wizard" && !game.wizardComplete) {
    game.mode = "wizard";
    game.wizardOutcome = "active";
    game.wizardTimer = TABLE.wizardSeconds;
    game.message = "STARFORGE WIZARD MODE — HIT THE REACTOR";
    emit(game, "wizard", "WIZARD MODE");
  }
}

export function startCharge(game) {
  if (game.mode === "ready") game.mode = "plunge";
}

export function launch(game) {
  if (game.mode !== "plunge" && game.mode !== "ready") return false;
  const ball = game.balls[0] ?? makeBall(game.nextBallId++);
  game.balls = [ball];
  ball.x = 626;
  ball.y = 925;
  ball.vx = -95 - game.charge * 55;
  ball.vy = -(TABLE.launchMin + game.charge * TABLE.launchRange);
  ball.skillShotOpen = true;
  ball.rampTrack = null;
  game.mode = "live";
  game.ballTime = 0;
  game.ballSave = TABLE.ballSaveSeconds;
  game.charge = 0;
  game.message = "SKILL SHOT: light an orbit lane";
  emit(game, "launch", "BALL LAUNCHED");
  return true;
}

export function applyNudge(game, direction) {
  if (game.mode !== "live" || game.nudgeCooldown > 0 || game.tilted) return false;
  game.tiltWarnings += 1;
  game.nudgeCooldown = TABLE.nudgeCooldown;
  for (const ball of game.balls) ball.vx += direction * 115;
  if (game.tiltWarnings >= TABLE.nudgeLimit) {
    game.tilted = true;
    game.message = "TILT — flippers disabled until next ball";
    emit(game, "tilt", "TILT");
  } else {
    game.message = `DANGER ${game.tiltWarnings}/${TABLE.nudgeLimit}`;
    emit(game, "nudge", "NUDGE");
  }
  return true;
}

export function setPaused(game, paused) {
  if (paused && game.mode !== "paused") {
    game.resumeMode = game.mode;
    game.mode = "paused";
    game.message = "PAUSED — table safely suspended";
  } else if (!paused && game.mode === "paused") {
    game.mode = game.resumeMode;
    game.message = "PLAY RESUMED";
  }
}

export function hitFixture(game, fixture, ballId = game.balls[0]?.id) {
  if (game.mode !== "live" && game.mode !== "wizard") return false;
  const contactId = `${ballId}:${fixture.id}`;
  if (game.occupied.has(contactId)) return false;
  game.occupied.add(contactId);
  const s = TABLE.scoring;
  if (fixture.kind === "bumper" || fixture.kind === "sling") {
    award(game, s[fixture.kind], fixture.kind === "bumper" ? "ION BUMPER" : "GRAVITY SLING");
  } else if (fixture.kind === "lane") {
    const side = fixture.id.includes("left") ? "left" : "right";
    award(game, s.lane, `${side.toUpperCase()} ORBIT`);
    const ball = game.balls.find((candidate) => candidate.id === ballId);
    if (ball?.skillShotOpen && game.ballTime < 5) {
      award(game, s.skillShot, "SKILL SHOT");
      game.wizardProgress |= 1;
      ball.skillShotOpen = false;
    }
    if (game.comboSide && game.comboSide !== side && game.comboTimer > 0) {
      game.comboCount += 1;
      award(game, s.combo * game.comboCount, `CROSSFIRE COMBO ×${game.comboCount}`);
      game.wizardProgress |= 2;
    }
    game.comboSide = side;
    game.comboTimer = TABLE.comboSeconds;
  } else if (fixture.kind === "target") {
    if (!game.targets[fixture.index]) {
      game.targets[fixture.index] = true;
      award(game, s.target, `NOVA TARGET ${fixture.index + 1}`);
    }
    if (game.targets.every(Boolean)) {
      game.multiplier = Math.min(5, game.multiplier + 1);
      game.targets.fill(false);
      game.wizardProgress |= 4;
      game.extraBallLit = game.multiplier >= 3;
      award(game, s.target * 2, `NOVA COMPLETE — ${game.multiplier}× BONUS`);
    }
  } else if (fixture.kind === "ramp") {
    completeRamp(game, { side: fixture.side ?? (fixture.id.includes("left") ? "left" : "right") });
  } else if (fixture.kind === "spinner" || fixture.kind === "gate") {
    award(game, s.lane, fixture.kind === "gate" ? "FLUX GATE" : "FLUX SPINNER");
    game.comboTimer = TABLE.comboSeconds;
  } else if (fixture.kind === "reactor") {
    if (game.mode === "wizard") {
      game.wizardComplete = true;
      game.wizardOutcome = "complete";
      game.wizardTimer = 0;
      award(game, s.wizard, "STARFORGE STABILIZED");
      game.mode = "live";
    } else if (game.jackpotLit || game.multiball) {
      award(game, s.jackpot, "REACTOR JACKPOT");
      game.wizardProgress |= 8;
      game.jackpotLit = game.multiball;
    } else {
      award(game, s.reactor, "REACTOR CHARGE");
      game.jackpotLit = true;
    }
  }
  if (game.extraBallLit && !game.extraBallEarned && game.score >= 100000) {
    game.extraBallEarned = true;
    game.ballsRemaining += 1;
    game.message = "EXTRA BALL EARNED";
    emit(game, "award", "EXTRA BALL");
  }
  maybeStartWizard(game);
  return true;
}

function completeRamp(game, ramp) {
  award(game, TABLE.scoring.ramp, ramp.side === "left" ? "QUASAR RAMP" : "PULSAR RAMP");
  game.locks += 1;
  if (game.locks >= TABLE.locksForMultiball && !game.multiball) startMultiball(game);
  maybeStartWizard(game);
}

export function updateRampTravel(game, ball) {
  if (ball.rampTrack) {
    const ramp = RAMP_PATHS.find((candidate) => candidate.id === ball.rampTrack);
    if (!ramp || ball.vy >= 0 || ball.x < ramp.xMin || ball.x > ramp.xMax) {
      ball.rampTrack = null;
      return false;
    }
    if (ball.y <= ramp.exitY) {
      completeRamp(game, ramp);
      ball.rampTrack = null;
      ball.y = ramp.exitY - 18;
      ball.vy = -Math.max(260, Math.abs(ball.vy));
      ball.vx += ramp.side === "left" ? 150 : -150;
      return true;
    }
    return false;
  }
  const ramp = RAMP_PATHS.find((candidate) => ball.vy < 0 && ball.x >= candidate.xMin && ball.x <= candidate.xMax && ball.y <= candidate.entranceY && ball.y >= candidate.entranceY - 24);
  if (ramp) ball.rampTrack = ramp.id;
  return false;
}

function startMultiball(game) {
  game.multiball = true;
  game.jackpotLit = true;
  game.wizardProgress |= 8;
  game.balls.push(makeBall(game.nextBallId++, 350, 410), makeBall(game.nextBallId++, 420, 460));
  game.balls.at(-2).vx = -240;
  game.balls.at(-2).vy = -380;
  game.balls.at(-1).vx = 260;
  game.balls.at(-1).vy = -320;
  game.message = "COSMIC STORM MULTIBALL — REACTOR JACKPOT LIT";
  emit(game, "multiball", "MULTIBALL");
}

export function drainBall(game, index = 0) {
  if (game.mode !== "live" && game.mode !== "wizard") return;
  const [drained] = game.balls.splice(index, 1);
  if (drained) for (const contact of [...game.occupied]) if (contact.startsWith(`${drained.id}:`)) game.occupied.delete(contact);
  if (game.balls.length) return;
  if (game.ballSave > 0) {
    game.balls = [makeBall(game.nextBallId++)];
    game.mode = "ready";
    game.message = "BALL SAVED — plunge again";
    emit(game, "save", "BALL SAVED");
    return;
  }
  game.score += game.bonus * game.multiplier;
  game.best = Math.max(game.best, game.score);
  game.ballsRemaining -= 1;
  game.multiball = false;
  game.jackpotLit = false;
  game.locks = 0;
  game.comboTimer = 0;
  game.comboCount = 0;
  game.tiltWarnings = 0;
  game.tilted = false;
  game.bonus = 0;
  if (game.ballsRemaining <= 0) {
    game.mode = "gameover";
    game.message = `MISSION COMPLETE — ${game.score.toLocaleString()} POINTS`;
    emit(game, "gameover", "GAME OVER");
  } else {
    game.mode = "ready";
    game.balls = [makeBall(game.nextBallId++)];
    game.message = `BALL ${4 - Math.min(3, game.ballsRemaining)} READY — plunge`;
    emit(game, "drain", "END OF BALL BONUS");
  }
}

export function restart(game) {
  const best = game.best;
  const nextEventId = game.nextEventId;
  Object.assign(game, createGame());
  game.best = best;
  game.nextEventId = nextEventId;
}

function collideCircle(ball, fixture) {
  const dx = ball.x - fixture.x;
  const dy = ball.y - fixture.y;
  const min = TABLE.ballRadius + fixture.r;
  const d2 = dx * dx + dy * dy;
  if (d2 >= min * min || d2 === 0) return false;
  const d = Math.sqrt(d2);
  const nx = dx / d;
  const ny = dy / d;
  ball.x = fixture.x + nx * min;
  ball.y = fixture.y + ny * min;
  const along = ball.vx * nx + ball.vy * ny;
  ball.vx -= 1.85 * along * nx;
  ball.vy -= 1.85 * along * ny;
  if (fixture.kind === "bumper" || fixture.kind === "sling") {
    ball.vx += nx * 230;
    ball.vy += ny * 230;
  }
  return true;
}

export function advanceRules(game, dt) {
  if (game.mode === "paused" || game.mode === "gameover") return;
  if (game.mode === "plunge") game.charge = Math.min(1, game.charge + dt * 0.65);
  if (game.mode !== "live" && game.mode !== "wizard") return;
  game.ballTime += dt;
  game.ballSave = Math.max(0, game.ballSave - dt);
  game.comboTimer = Math.max(0, game.comboTimer - dt);
  game.nudgeCooldown = Math.max(0, game.nudgeCooldown - dt);
  if (game.ballTime >= 5) for (const ball of game.balls) ball.skillShotOpen = false;
  if (game.comboTimer === 0) game.comboSide = null;
  if (game.mode === "wizard") {
    game.wizardTimer = Math.max(0, game.wizardTimer - dt);
    if (game.wizardTimer === 0) {
      game.mode = "live";
      game.wizardOutcome = "failed";
      game.wizardProgress = 0;
      game.message = "WIZARD MODE ENDED — reactor escaped";
    }
  }
  return true;
}

export function step(game, dt, input = {}) {
  if (!advanceRules(game, dt)) return;
  for (let i = game.balls.length - 1; i >= 0; i -= 1) {
    const ball = game.balls[i];
    ball.vy += TABLE.gravity * dt;
    if (!game.tilted && ball.y > 835) {
      const leftZone = ball.x > 130 && ball.x < 345;
      const rightZone = ball.x >= 355 && ball.x < 570;
      if ((leftZone && input.left) || (rightZone && input.right)) {
        ball.vy -= TABLE.flipperImpulse * dt * 10;
        ball.vx += (leftZone ? 95 : -95) * dt * 10;
      }
    }
    const speed = Math.hypot(ball.vx, ball.vy);
    if (speed > TABLE.maxSpeed) {
      ball.vx *= TABLE.maxSpeed / speed;
      ball.vy *= TABLE.maxSpeed / speed;
    }
    ball.x += ball.vx * dt;
    ball.y += ball.vy * dt;
    updateRampTravel(game, ball);
    if (ball.x < 44 + TABLE.ballRadius) { ball.x = 44 + TABLE.ballRadius; ball.vx = Math.abs(ball.vx) * TABLE.wallBounce; }
    if (ball.x > 656 - TABLE.ballRadius) { ball.x = 656 - TABLE.ballRadius; ball.vx = -Math.abs(ball.vx) * TABLE.wallBounce; }
    if (ball.y < 50 + TABLE.ballRadius) { ball.y = 50 + TABLE.ballRadius; ball.vy = Math.abs(ball.vy) * TABLE.wallBounce; }
    const now = new Set();
    for (const fixture of FIXTURES) {
      const touching = Math.hypot(ball.x - fixture.x, ball.y - fixture.y) < TABLE.ballRadius + fixture.r;
      if (touching) {
        const contactId = `${ball.id}:${fixture.id}`;
        now.add(contactId);
        const fresh = !game.occupied.has(contactId);
        const collided = collideCircle(ball, fixture);
        if (fresh && collided) hitFixture(game, fixture, ball.id);
      }
    }
    for (const id of [...game.occupied]) if (id.startsWith(`${ball.id}:`) && !now.has(id)) game.occupied.delete(id);
    if (ball.y > TABLE.height + 40) drainBall(game, i);
  }
}

export function runFixed(game, elapsed, input, accumulator = 0) {
  accumulator += Math.min(elapsed, TABLE.fixedStep * TABLE.maxCatchUpSteps);
  let steps = 0;
  while (accumulator >= TABLE.fixedStep && steps < TABLE.maxCatchUpSteps) {
    step(game, TABLE.fixedStep, input);
    accumulator -= TABLE.fixedStep;
    steps += 1;
  }
  return accumulator;
}
