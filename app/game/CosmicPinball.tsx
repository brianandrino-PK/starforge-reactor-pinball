"use client";
/* eslint-disable react-hooks/refs, react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */

import { useCallback, useEffect, useRef, useState } from "react";
import { COLORS, FIXTURES, GEOMETRY, RAMP_PATHS, TABLE } from "./config.js";
import { advanceRules, applyNudge, createGame, drainBall, hitFixture, launch, restart, setPaused, startCharge, step, takeFeedback } from "./core.js";
import { clearActions, emptyActions, gamepadActions } from "./input.js";
import { loadPreferences, savePreferences } from "./persistence.js";
import { StarforgePhysics } from "./physics.js";
import { addBurst, advanceParticles, MAX_AUDIO_VOICES, soundProfile } from "./effects.js";

type Game = ReturnType<typeof createGame>;

type Particle = {x:number;y:number;vx:number;vy:number;life:number;color:string};

function drawTable(canvas: HTMLCanvasElement, game: Game, input: ReturnType<typeof emptyActions>, physics: ReturnType<StarforgePhysics["snapshot"]>, particles: Particle[], debug = false) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const rect = canvas.getBoundingClientRect();
  if (canvas.width !== Math.round(rect.width * dpr) || canvas.height !== Math.round(rect.height * dpr)) {
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
  }
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, canvas.width, canvas.height);
  const scale = Math.min(canvas.width / TABLE.width, canvas.height / TABLE.height);
  const ox = (canvas.width - TABLE.width * scale) / 2;
  const oy = (canvas.height - TABLE.height * scale) / 2;
  ctx.setTransform(scale, 0, 0, scale, ox, oy);
  const bg = ctx.createLinearGradient(0, 0, 0, TABLE.height);
  bg.addColorStop(0, "rgba(9,20,25,.02)"); bg.addColorStop(0.55, "rgba(4,15,20,.08)"); bg.addColorStop(1, "rgba(2,8,12,.2)");
  ctx.fillStyle = bg; ctx.fillRect(0, 0, TABLE.width, TABLE.height);
  ctx.globalAlpha=.04; ctx.fillStyle="#ff9a28"; for(let i=0;i<8;i++){ctx.beginPath();ctx.arc(350,500,74+i*38,0,Math.PI*2);ctx.strokeStyle=i%2?"#48ddeb":"#ff9a28";ctx.lineWidth=1.5;ctx.stroke();}ctx.globalAlpha=1;
  ctx.strokeStyle = "rgba(84,239,255,.55)"; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(44, 1015); ctx.lineTo(44, 132); ctx.quadraticCurveTo(44, 48, 128, 48); ctx.lineTo(572, 48); ctx.quadraticCurveTo(656, 48, 656, 132); ctx.lineTo(656, 1015); ctx.stroke();
  ctx.strokeStyle = "rgba(255,145,45,.18)"; ctx.lineWidth = 2;
  for (let i = 0; i < 8; i++) { ctx.beginPath(); ctx.arc(350, 505, 110 + i * 55, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke(); }
  ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.font = "700 15px monospace";
  for (const f of FIXTURES) {
    const active = f.kind === "target" ? game.targets[f.index] : f.kind === "reactor" ? game.jackpotLit || game.mode === "wizard" : false;
    const color = f.kind === "bumper" ? COLORS.cyan : f.kind === "reactor" ? COLORS.magenta : f.kind === "target" ? COLORS.amber : COLORS.cyan;
    ctx.shadowBlur = active ? 30 : 14; ctx.shadowColor = color; ctx.lineWidth = 3;
    if (f.kind === "bumper") {
      ctx.fillStyle = "#152c32"; ctx.strokeStyle = "#bfe8e7"; ctx.beginPath(); ctx.arc(f.x,f.y,f.r+7,0,Math.PI*2);ctx.fill();ctx.stroke();
      ctx.fillStyle = active ? color : "#4d9ca4";ctx.strokeStyle=color;ctx.beginPath();ctx.arc(f.x,f.y,f.r-8,0,Math.PI*2);ctx.fill();ctx.stroke();
      ctx.fillStyle="#e7fbf4";ctx.beginPath();ctx.arc(f.x,f.y,11,0,Math.PI*2);ctx.fill();ctx.fillStyle="#153137";ctx.font="900 9px monospace";ctx.fillText("ION",f.x,f.y);
    } else if (f.kind === "reactor") {
      ctx.fillStyle="#172a2c";ctx.strokeStyle="#e3b16a";ctx.beginPath();ctx.arc(f.x,f.y,f.r+10,0,Math.PI*2);ctx.fill();ctx.stroke();
      ctx.fillStyle=active?color:"#a95524";ctx.strokeStyle="#ffcf79";ctx.beginPath();ctx.arc(f.x,f.y,f.r-8,0,Math.PI*2);ctx.fill();ctx.stroke();
      ctx.strokeStyle="#ffe4a0";ctx.lineWidth=2;for(let i=0;i<8;i++){const a=i*Math.PI/4;ctx.beginPath();ctx.moveTo(f.x+Math.cos(a)*18,f.y+Math.sin(a)*18);ctx.lineTo(f.x+Math.cos(a)*f.r*.68,f.y+Math.sin(a)*f.r*.68);ctx.stroke();}
      ctx.fillStyle="#fff3c8";ctx.font="900 11px monospace";ctx.fillText("REACTOR",f.x,f.y);
    } else if (f.kind === "target") {
      ctx.save();ctx.translate(f.x,f.y);ctx.rotate((f.index-1.5)*.08);ctx.fillStyle=active?"#ffd67c":"#b06c2c";ctx.strokeStyle="#fff0b5";ctx.beginPath();ctx.roundRect(-24,-13,48,26,5);ctx.fill();ctx.stroke();ctx.fillStyle="#2a1a10";ctx.font="900 14px monospace";ctx.fillText(`${f.index+1}` ,0,1);ctx.restore();
    } else if (f.kind === "lane") {
      ctx.fillStyle=active?color:"#25515a";ctx.strokeStyle="#cbf5ea";ctx.beginPath();ctx.roundRect(f.x-30,f.y-10,60,20,6);ctx.fill();ctx.stroke();ctx.fillStyle="#082126";ctx.font="900 9px monospace";ctx.fillText(f.id.includes("left")?"ORBIT L":"ORBIT R",f.x,f.y);
    }
    ctx.shadowBlur = 0;
  }
  ctx.lineCap="round";ctx.lineJoin="round";
  for(const guide of GEOMETRY.guides){ctx.strokeStyle="#d7eee8";ctx.lineWidth=13;ctx.shadowBlur=12;ctx.shadowColor="#49dce8";ctx.beginPath();guide.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.stroke();ctx.strokeStyle="#263d47";ctx.lineWidth=7;ctx.stroke();ctx.strokeStyle="#f08b35";ctx.lineWidth=2;ctx.stroke();}
  ctx.strokeStyle="#d6e7dd";ctx.lineWidth=11;ctx.shadowBlur=10;ctx.shadowColor="#e4a64a";ctx.beginPath();ctx.moveTo(...GEOMETRY.launchDeflector[0]);ctx.lineTo(...GEOMETRY.launchDeflector[1]);ctx.stroke();ctx.strokeStyle="#4a5b58";ctx.lineWidth=6;ctx.stroke();ctx.shadowBlur=0;
  for(const sling of GEOMETRY.slings){ctx.fillStyle="rgba(79,37,20,.82)";ctx.strokeStyle="#ff9a28";ctx.lineWidth=9;ctx.beginPath();sling.points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fill();ctx.stroke();ctx.strokeStyle="#ffe0a0";ctx.lineWidth=2;ctx.stroke();}
  ctx.shadowBlur=0;
  for (const ramp of RAMP_PATHS) {
    ctx.strokeStyle = "rgba(0,0,0,.72)"; ctx.lineWidth = 39; ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.shadowBlur = 20; ctx.shadowColor = "#000";
    ctx.beginPath(); ramp.points.forEach(([x, y], index) => index ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.stroke();
    ctx.strokeStyle = COLORS.violet; ctx.lineWidth = 27; ctx.shadowColor = COLORS.violet; ctx.stroke();
    ctx.strokeStyle = "#f3e0ae"; ctx.lineWidth = 4; ctx.shadowBlur = 0; ctx.stroke();
    ctx.strokeStyle = "#3c5452"; ctx.lineWidth = 2; ctx.stroke();
    ctx.fillStyle = COLORS.amber; ctx.beginPath(); ctx.moveTo(ramp.points[0][0] - 15, ramp.entranceY + 8); ctx.lineTo(ramp.points[0][0] + 15, ramp.entranceY + 8); ctx.lineTo(ramp.points[0][0], ramp.entranceY - 10); ctx.fill();
    ctx.fillStyle = COLORS.ink; ctx.font = "700 12px monospace"; ctx.fillText("RAMP ↑", ramp.points[0][0], ramp.entranceY + 28);
  }
  ctx.shadowBlur=0;
  ctx.fillStyle="rgba(5,16,19,.64)";ctx.strokeStyle="#d19a55";ctx.lineWidth=3;ctx.beginPath();ctx.roundRect(588,150,54,840,12);ctx.fill();ctx.stroke();ctx.strokeStyle="#f7bb68";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(596,170);ctx.lineTo(596,970);ctx.stroke();ctx.fillStyle="#f4c46f";ctx.font="900 9px monospace";ctx.save();ctx.translate(614,555);ctx.rotate(-Math.PI/2);ctx.fillText("PLUNGER LANE",0,0);ctx.restore();
  ctx.fillStyle="#142c31";ctx.strokeStyle="#f3c36d";ctx.lineWidth=3;ctx.beginPath();ctx.roundRect(270,1002,160,31,10);ctx.fill();ctx.stroke();ctx.fillStyle="#9bdfe1";ctx.font="900 10px monospace";ctx.fillText("OUTHole / DRAIN",350,1018);
  for(const post of GEOMETRY.posts){ctx.fillStyle="#c6d6cc";ctx.strokeStyle="#f5b25c";ctx.lineWidth=3;ctx.beginPath();ctx.arc(post.x,post.y,post.r,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.fillStyle="#3b4c49";ctx.beginPath();ctx.arc(post.x,post.y,post.r*.42,0,Math.PI*2);ctx.fill();}
  ctx.save();ctx.translate(GEOMETRY.spinner.x,GEOMETRY.spinner.y);ctx.rotate(physics.spinnerAngle);ctx.fillStyle="#c8d7cf";ctx.strokeStyle="#ffba54";ctx.lineWidth=3;ctx.beginPath();ctx.roundRect(-GEOMETRY.spinner.halfWidth,-7,GEOMETRY.spinner.halfWidth*2,14,7);ctx.fill();ctx.stroke();ctx.fillStyle="#283f43";ctx.beginPath();ctx.arc(0,0,6,0,Math.PI*2);ctx.fill();ctx.restore();
  const inserts=[
    {x:285,label:"BANK",active:game.targets.every(Boolean)},
    {x:330,label:`LOCK ${game.locks}/2`,active:game.locks>0||game.multiball},
    {x:385,label:"JACKPOT",active:game.jackpotLit},
    {x:440,label:"WIZARD",active:game.mode==="wizard"||game.wizardComplete},
  ];
  for(const insert of inserts){const pulse=.72+Math.sin(game.ballTime*8)*.18;ctx.globalAlpha=insert.active?pulse:.35;ctx.fillStyle=insert.active?COLORS.amber:"#17343b";ctx.strokeStyle=insert.active?"#fff0bc":COLORS.cyan;ctx.lineWidth=2;ctx.beginPath();ctx.roundRect(insert.x-23,700,46,22,6);ctx.fill();ctx.stroke();ctx.fillStyle=insert.active?"#251200":"#a7d9dd";ctx.font="700 7px monospace";ctx.fillText(insert.label,insert.x,711);}ctx.globalAlpha=1;
  const flipper = (item: {id:string,angle:number}) => {
    const cfg=GEOMETRY.flippers.find((f)=>f.id===item.id)!; const left=cfg.side==="left";
    ctx.save(); ctx.translate(...cfg.pivot); ctx.rotate(item.angle);
    ctx.fillStyle = input[cfg.side] ? COLORS.amber : "#d77726"; ctx.shadowBlur = 18; ctx.shadowColor = COLORS.amber;ctx.strokeStyle="#fff0bf";ctx.lineWidth=2;
    ctx.beginPath(); ctx.roundRect(left ? 0 : -cfg.length, -cfg.width/2, cfg.length, cfg.width, cfg.width/2); ctx.fill();ctx.stroke(); ctx.restore();
  };
  physics.flippers.forEach(flipper);
  ctx.shadowBlur = 16; ctx.shadowColor = COLORS.ink; ctx.fillStyle = "#f7fbff";
  for (const b of physics.balls) { const g=ctx.createRadialGradient(b.x-4,b.y-5,2,b.x,b.y,TABLE.ballRadius);g.addColorStop(0,"#fff");g.addColorStop(.35,"#c4d0d2");g.addColorStop(1,"#3b4a50");ctx.fillStyle=g;ctx.beginPath();ctx.arc(b.x,b.y,TABLE.ballRadius,0,Math.PI*2);ctx.fill(); }
  for(const p of particles){ctx.globalAlpha=Math.min(1,p.life*3);ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(p.x,p.y,2.5+p.life*3,0,Math.PI*2);ctx.fill();}ctx.globalAlpha=1;
  ctx.fillStyle="#ffb23f";ctx.fillRect(600,physics.plunger.y-8,40,16);
  ctx.shadowBlur = 0;
  if (game.mode === "plunge") { ctx.fillStyle = "#17234b"; ctx.fillRect(580, 970, 76, 12); ctx.fillStyle = COLORS.amber; ctx.fillRect(580, 970, 76 * game.charge, 12); }
  if (game.mode === "paused" || game.mode === "gameover") {
    ctx.fillStyle = "rgba(2,8,23,.78)"; ctx.fillRect(70, 440, 560, 150); ctx.fillStyle = COLORS.ink; ctx.font = "800 42px sans-serif"; ctx.fillText(game.mode === "paused" ? "PAUSED" : "MISSION COMPLETE", 350, 495); ctx.font = "600 18px monospace"; ctx.fillText(game.message, 350, 545);
  }
  if(game.mode==="wizard"||game.multiball){ctx.fillStyle="rgba(2,10,12,.72)";ctx.fillRect(155,92,390,58);ctx.strokeStyle=game.mode==="wizard"?COLORS.amber:COLORS.cyan;ctx.lineWidth=2;ctx.strokeRect(155,92,390,58);ctx.fillStyle=game.mode==="wizard"?COLORS.amber:COLORS.cyan;ctx.font="900 25px sans-serif";ctx.fillText(game.mode==="wizard"?"REACTOR CRITICAL":"TRI-CORE MULTIBALL",350,120);ctx.font="700 10px monospace";ctx.fillText(game.mode==="wizard"?`${Math.ceil(game.wizardTimer)} SECONDS · HIT THE CORE`:"JACKPOT LIT · SHOOT THE CORE",350,140);}
  if(debug){ctx.strokeStyle="#6aff8f";ctx.lineWidth=2;ctx.strokeRect(GEOMETRY.wall.left,GEOMETRY.wall.top,GEOMETRY.wall.right-GEOMETRY.wall.left,GEOMETRY.wall.bottom-GEOMETRY.wall.top);ctx.fillStyle="#6aff8f";ctx.font="12px monospace";ctx.textAlign="left";ctx.fillText(`BODIES ${physics.bodyCount} · STEP ${(physics.step*1000).toFixed(2)}ms · CONTACTS ${physics.contacts.length}`,60,1060);}
}

export default function CosmicPinball() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game>(createGame());
  const physicsRef = useRef<StarforgePhysics | null>(null);
  if (!physicsRef.current) physicsRef.current = new StarforgePhysics();
  const actionsRef = useRef(emptyActions());
  const audioRef = useRef<AudioContext | null>(null);
  const musicRef = useRef<OscillatorNode | null>(null);
  const activeVoicesRef = useRef(new Set<OscillatorNode>());
  const particlesRef = useRef<Particle[]>([]);
  const gamepadPrevious = useRef(emptyActions());
  const [, renderUi] = useState(0);
  const [prefs, setPrefs] = useState({ sfxMuted: false, musicMuted: false, best: 0 });
  const [evidenceMode, setEvidenceMode] = useState(false);
  const [evidenceResult, setEvidenceResult] = useState("Ready for production-transition evidence");
  const [timeScale, setTimeScale] = useState(1);
  const game = gameRef.current;
  const physics = physicsRef.current!;
  const doLaunch = () => { const power=game.charge; if (launch(game)) physics.launch(game.balls[0].id, power); };
  const doRestart = () => { restart(game); physics.resetBalls(game.balls.map((ball) => ball.id)); };
  const doNudge = (direction: number) => { if (applyNudge(game, direction)) physics.nudge(direction); };

  const beep = useCallback((event: {type?:string;label?:string;kind?:string} = {}) => {
    if (prefs.sfxMuted) return;
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtor) return;
    const audio = audioRef.current ?? new AudioCtor(); audioRef.current = audio;
    if(activeVoicesRef.current.size>=MAX_AUDIO_VOICES)return;
    const profile=soundProfile(event);
    const oscillator = audio.createOscillator(); const gain = audio.createGain();
    oscillator.type = profile.wave as OscillatorType; oscillator.frequency.value=profile.frequency;
    gain.gain.setValueAtTime(profile.gain, audio.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + profile.duration);
    oscillator.connect(gain).connect(audio.destination);activeVoicesRef.current.add(oscillator);oscillator.onended=()=>activeVoicesRef.current.delete(oscillator);oscillator.start();oscillator.stop(audio.currentTime+profile.duration+.01);
  }, [prefs.sfxMuted]);

  useEffect(() => {
    const loaded = loadPreferences(window.localStorage); setPrefs(loaded); game.best = loaded.best;
    setEvidenceMode(location.hostname === "localhost" && new URLSearchParams(location.search).has("evidence"));
    physics.resetBalls(game.balls.map((ball) => ball.id));
  }, [game]);

  useEffect(() => { savePreferences(window.localStorage, { ...prefs, best: game.best }); }, [prefs, game.best]);

  useEffect(() => {
    if (prefs.musicMuted || game.mode === "paused") { musicRef.current?.stop(); musicRef.current = null; return; }
    const AudioCtor = window.AudioContext || window.webkitAudioContext; if (!AudioCtor) return;
    const audio = audioRef.current ?? new AudioCtor(); audioRef.current = audio;
    if (audio.state !== "running" || musicRef.current) return;
    const drone = audio.createOscillator(); const gain = audio.createGain(); drone.type = "triangle"; drone.frequency.value = 55; gain.gain.value = 0.012;
    drone.connect(gain).connect(audio.destination); drone.start(); musicRef.current = drone;
    return () => { try { drone.stop(); } catch { musicRef.current = null; } musicRef.current = null; };
  }, [prefs.musicMuted, game.mode]);

  useEffect(() => {
    let frame = 0; let last = performance.now(); let uiClock = 0;
    const tick = (now: number) => {
      const elapsed = Math.min((now - last) / 1000, 0.1) * timeScale; last = now;
      const pad = gamepadActions(navigator.getGamepads?.()[0]);
      const frameActions = { ...actionsRef.current, left: actionsRef.current.left || pad.left, right: actionsRef.current.right || pad.right };
      if (pad.plunge && !gamepadPrevious.current.plunge) startCharge(game);
      if (!pad.plunge && gamepadPrevious.current.plunge) doLaunch();
      if (pad.nudgeLeft && !gamepadPrevious.current.nudgeLeft) doNudge(-1);
      if (pad.nudgeRight && !gamepadPrevious.current.nudgeRight) doNudge(1);
      if (pad.pause && !gamepadPrevious.current.pause) setPaused(game, game.mode !== "paused");
      if (pad.restart && !gamepadPrevious.current.restart) doRestart();
      gamepadPrevious.current = pad;
      if (game.mode === "plunge") { advanceRules(game, elapsed); physics.step(elapsed, frameActions, game.charge); }
      if (game.mode === "live" || game.mode === "wizard") {
        advanceRules(game, elapsed); physics.step(elapsed, frameActions, game.charge);
        for (const event of physics.takeEvents()) {
          const ballIndex=game.balls.findIndex((ball)=>ball.id===event.ballId);
          if(event.kind==="drain"&&ballIndex>=0){physics.removeBall(event.ballId);drainBall(game,ballIndex);}
          else if(["bumper","sling","lane","target","reactor","spinner","gate","ramp"].includes(event.kind)) { hitFixture(game,event,event.ballId);const b=physics.snapshot().balls.find((item)=>item.id===event.ballId);if(b)particlesRef.current=addBurst(particlesRef.current,b.x,b.y,event.kind==="bumper"?COLORS.cyan:COLORS.amber,event.kind==="reactor"?20:8); }
        }
        for(const ball of game.balls)if(!physics.balls.has(ball.id))physics.spawnBall(ball.id,350+ball.id*18,420+ball.id*22);
        for(const [id] of physics.balls)if(!game.balls.some((ball)=>ball.id===id))physics.removeBall(id);
        const shot=physics.snapshot();for(const bodyBall of shot.balls){const ball=game.balls.find((item)=>item.id===bodyBall.id);if(ball)Object.assign(ball,bodyBall);}
      }
      for (const event of takeFeedback(game)) beep(event);
      particlesRef.current=advanceParticles(particlesRef.current,elapsed);
      if (canvasRef.current) drawTable(canvasRef.current, game, frameActions, physics.snapshot(), particlesRef.current, evidenceMode);
      uiClock += elapsed; if (uiClock > 0.1) { uiClock = 0; renderUi((v) => v + 1); }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick); return () => cancelAnimationFrame(frame);
  }, [beep, game, evidenceMode, timeScale]);

  useEffect(() => {
    const actions = actionsRef.current;
    const key = (event: KeyboardEvent, down: boolean) => {
      if (["Space", "ArrowLeft", "ArrowRight", "KeyZ", "Slash"].includes(event.code)) event.preventDefault();
      if (["KeyZ", "ArrowLeft"].includes(event.code)) actionsRef.current.left = down;
      if (["Slash", "ArrowRight"].includes(event.code)) actionsRef.current.right = down;
      if (event.code === "Space") { if (down && !event.repeat) startCharge(game); if (!down) doLaunch(); }
      if (down && !event.repeat && event.code === "KeyA") doNudge(-1);
      if (down && !event.repeat && event.code === "KeyD") doNudge(1);
      if (down && !event.repeat && event.code === "KeyP") setPaused(game, game.mode !== "paused");
      if (down && !event.repeat && event.code === "KeyR") doRestart();
    };
    const kd = (e: KeyboardEvent) => key(e, true); const ku = (e: KeyboardEvent) => key(e, false);
    const suspend = () => { clearActions(actions); gamepadPrevious.current = emptyActions(); setPaused(game, true); audioRef.current?.suspend(); };
    const visibility = () => { if (document.hidden) suspend(); };
    addEventListener("keydown", kd); addEventListener("keyup", ku); addEventListener("blur", suspend); document.addEventListener("visibilitychange", visibility);
    return () => { removeEventListener("keydown", kd); removeEventListener("keyup", ku); removeEventListener("blur", suspend); document.removeEventListener("visibilitychange", visibility); clearActions(actions); };
  }, [game]);

  const hold = (action: "left" | "right" | "plunge", down: boolean) => {
    actionsRef.current[action] = down;
    if (action === "plunge") { if (down) startCharge(game); else doLaunch(); }
  };
  const resumeAudio = () => { audioRef.current?.resume(); if (game.mode === "paused") setPaused(game, false); };
  const evidenceRamp = (side: "left" | "right") => {
    const ball = game.balls[0]; const x = side === "left" ? 145 : 555;
    Object.assign(ball, { x, y:575, vx:0, vy:-300, rampTrack:null }); step(game, TABLE.fixedStep, {});
    Object.assign(ball, { x, y:405, vx:0, vy:-300 }); step(game, TABLE.fixedStep, {});
  };
  const startEvidenceGame = () => { restart(game); physics.resetBalls(game.balls.map((ball) => ball.id)); launch(game); physics.launch(game.balls[0].id, game.charge); game.ballSave = 0; };
  const runCollisionScenario = (name: "flipper"|"sling"|"spinner"|"ramp"|"outlane") => {
    startEvidenceGame();physics.resetBalls(game.balls.map((ball)=>ball.id));const id=game.balls[0].id;
    const states={flipper:{x:285,y:800,vx:0,vy:1050},sling:{x:205,y:740,vx:0,vy:1050},spinner:{x:350,y:485,vx:0,vy:-950},ramp:{x:145,y:625,vx:0,vy:-900},outlane:{x:82,y:700,vx:0,vy:700}};
    physics.setBallState(id,states[name]);if(name==="flipper"){actionsRef.current.left=true;setTimeout(()=>{actionsRef.current.left=false;},700);}setEvidenceResult(`${name.toUpperCase()} · Planck contact running at ${timeScale.toFixed(1)}×`);
  };
  const proveRamp = () => { runCollisionScenario("ramp"); };
  const proveMultiballContact = () => {
    startEvidenceGame(); evidenceRamp("left"); evidenceRamp("right");physics.resetBalls(game.balls.map((ball)=>ball.id));game.balls.forEach((ball,index)=>physics.setBallState(ball.id,{x:245+(index-1)*26,y:220-index*22,vx:0,vy:800+index*80}));
    setEvidenceResult(`MULTIBALL · ${game.balls.length} physical balls · shared bumper contact running`);
  };
  const proveWizardTimeout = () => {
    startEvidenceGame(); const laneLeft=FIXTURES.find((fixture)=>fixture.id==="lane-left"); const laneRight=FIXTURES.find((fixture)=>fixture.id==="lane-right");
    if (!laneLeft || !laneRight) return; hitFixture(game,laneLeft); game.occupied.clear(); game.ballTime=10; hitFixture(game,laneRight); game.occupied.clear(); hitFixture(game,laneLeft);
    for (const target of FIXTURES.filter((fixture)=>fixture.kind==="target")) { game.occupied.clear(); hitFixture(game,target); }
    evidenceRamp("left"); evidenceRamp("right"); game.wizardTimer=.01; step(game,.02,{}); game.occupied.clear(); const bumper=FIXTURES.find((fixture)=>fixture.kind==="bumper"); if (bumper) hitFixture(game,bumper);
    setEvidenceResult(`Wizard timeout · ${game.wizardOutcome.toUpperCase()} · mode ${game.mode} · progress ${game.wizardProgress}/15 · no immediate re-entry`);
  };
  const wizardReadout = game.mode === "wizard" ? `${game.wizardTimer.toFixed(0)}s` : game.wizardOutcome === "failed" ? "FAILED · 0/4" : game.wizardOutcome === "complete" ? "COMPLETE" : `${game.wizardProgress.toString(2).split("1").length - 1}/4`;
  const settings = <div className="settings"><button onClick={() => setPrefs((p) => ({ ...p, sfxMuted: !p.sfxMuted }))} aria-pressed={prefs.sfxMuted}>SFX {prefs.sfxMuted ? "OFF" : "ON"}</button><button onClick={() => setPrefs((p) => ({ ...p, musicMuted: !p.musicMuted }))} aria-pressed={prefs.musicMuted}>MUSIC {prefs.musicMuted ? "OFF" : "ON"}</button><button onClick={() => setPaused(game, game.mode !== "paused")}>{game.mode === "paused" ? "RESUME" : "PAUSE"}</button><button onClick={doRestart}>RESTART</button></div>;

  return <main className="cabinet" onPointerDown={resumeAudio}>
    <header className="marquee"><p>ORIGINAL COSMIC PINBALL</p><h1>STARFORGE<span>{"//"}</span>REACTOR</h1><p className="annoying-version">New Annoying Version</p></header>
    <section className="scoreboard" aria-label="Game status">
      <div><small>SCORE</small><strong>{game.score.toLocaleString().padStart(8, "0")}</strong></div>
      <div><small>OBJECTIVE</small><strong className="objective">{game.message}</strong></div>
      <div><small>BEST</small><strong>{Math.max(game.best, prefs.best).toLocaleString()}</strong></div>
    </section>
    <div className="machine">
      <div className="playfield-wrap"><canvas ref={canvasRef} className="playfield" aria-label="Interactive Starforge Reactor pinball table" role="img" /></div>
    </div>
    <section className="desktop-console" aria-label="Compact table status">
      <div className="console-stats"><span>BALL <b>{game.ballsRemaining}</b></span><span>SAVE <b>{game.ballSave > 0 ? `${game.ballSave.toFixed(1)}s` : "OFF"}</b></span><span>BONUS <b>{game.multiplier}×</b></span><span>LOCKS <b>{game.multiball ? "MULTI" : `${game.locks}/2`}</b></span><span>COMBO <b>{game.comboTimer > 0 ? `${game.comboTimer.toFixed(1)}s` : "—"}</b></span><span>TILT <b>{game.tiltWarnings}/3</b></span><span>WIZARD <b>{wizardReadout}</b></span></div>
      <details className="desktop-guide"><summary>INPUT / SETTINGS</summary><div className="guide-body"><p><kbd>Z</kbd><kbd>←</kbd> left · <kbd>/</kbd><kbd>→</kbd> right · <kbd>SPACE</kbd> launch · <kbd>A</kbd><kbd>D</kbd> nudge · <kbd>P</kbd> pause · <kbd>R</kbd> restart</p>{settings}</div></details>
    </section>
    <section className="mobile-hud" aria-label="Mobile live status">
      <div className="mobile-stats"><span>BALL <b>{game.ballsRemaining}</b></span><span>SAVE <b>{game.ballSave > 0 ? `${game.ballSave.toFixed(1)}s` : "OFF"}</b></span><span>BONUS <b>{game.multiplier}×</b></span><span>{game.multiball ? "MULTIBALL" : "LOCKS"} <b>{game.multiball ? "LIVE" : `${game.locks}/2`}</b></span><span>COMBO <b>{game.comboTimer > 0 ? `${game.comboTimer.toFixed(1)}s` : "—"}</b></span><span>TILT <b>{game.tiltWarnings}/3</b></span><span>WIZARD <b>{wizardReadout}</b></span></div>
      {settings}
      <details><summary>INPUT GUIDE</summary><p>Touch deck · keyboard Z/← and /→ · SPACE launch · A/D nudge · P pause · R restart · gamepad bumpers/A/d-pad/Menu/View</p></details>
    </section>
    {evidenceMode && <section className="evidence-panel" aria-label="Local deterministic evidence controls"><strong>LOCAL EVIDENCE · PLANCK CONTACT LAB</strong><div><button onClick={()=>setTimeScale(.2)}>SLOW 0.2×</button><button onClick={()=>setTimeScale(1)}>NORMAL 1×</button></div><button onClick={()=>runCollisionScenario("flipper")}>FLIPPER IMPACT</button><button onClick={()=>runCollisionScenario("sling")}>SLING REBOUND</button><button onClick={()=>runCollisionScenario("spinner")}>SPINNER / GATE</button><button onClick={proveRamp}>DIRECTIONAL RAMP</button><button onClick={()=>runCollisionScenario("outlane")}>OUTLANE / DRAIN</button><button onClick={proveMultiballContact}>MULTIBALL CONTACT</button><button onClick={proveWizardTimeout}>WIZARD TIMEOUT</button><output aria-live="polite">{evidenceResult}</output></section>}
    <section className="touch-deck" aria-label="Touch pinball controls">
      <button className="flipper-button" aria-label="Left flipper" onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); hold("left", true); }} onPointerUp={() => hold("left", false)} onPointerCancel={() => hold("left", false)}>LEFT<br/><span>FLIP</span></button>
      <button className="nudge-button" aria-label="Nudge table left" onClick={() => doNudge(-1)}>NUDGE<br/>←</button>
      <button className="plunge-button" aria-label="Hold and release to launch ball" onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); hold("plunge", true); }} onPointerUp={() => hold("plunge", false)} onPointerCancel={() => hold("plunge", false)}>HOLD<br/><span>PLUNGE</span></button>
      <button className="nudge-button" aria-label="Nudge table right" onClick={() => doNudge(1)}>NUDGE<br/>→</button>
      <button className="flipper-button" aria-label="Right flipper" onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); hold("right", true); }} onPointerUp={() => hold("right", false)} onPointerCancel={() => hold("right", false)}>RIGHT<br/><span>FLIP</span></button>
    </section>
  </main>;
}

declare global { interface Window { webkitAudioContext?: typeof AudioContext } }
