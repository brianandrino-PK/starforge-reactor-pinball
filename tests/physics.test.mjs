import assert from "node:assert/strict";
import test from "node:test";
import { GEOMETRY, TABLE } from "../app/game/config.js";
import { addBurst, advanceParticles, MAX_AUDIO_VOICES, MAX_PARTICLES, soundProfile } from "../app/game/effects.js";
import { StarforgePhysics } from "../app/game/physics.js";

const advance=(physics,seconds,actions={})=>{for(let i=0;i<Math.ceil(seconds/TABLE.fixedStep);i++)physics.step(TABLE.fixedStep,actions);};

test("Planck table is bounded, bullet-enabled, and fixed at 120 Hz",()=>{
  const physics=new StarforgePhysics();const body=physics.spawnBall(7);const shot=physics.snapshot();
  assert.equal(body.isBullet(),true);assert.equal(shot.step,1/120);assert.ok(shot.bodyCount>=22);assert.equal(shot.balls.length,1);
  for(const group of [GEOMETRY.bumpers,GEOMETRY.targets,GEOMETRY.rollovers])for(const point of group){assert.ok(point.x>0&&point.x<TABLE.width);assert.ok(point.y>0&&point.y<TABLE.height);}
});

test("physical plunger power changes apex and full charge reaches the top arch",()=>{
  const apex=(power)=>{const physics=new StarforgePhysics();physics.resetBalls([1]);physics.launch(1,power);let y=9999;for(let i=0;i<180;i++){physics.step(1/120,{});y=Math.min(y,physics.snapshot().balls[0].y);}return y;};
  const soft=apex(0),full=apex(1);assert.ok(full<150,`full apex ${full}`);assert.ok(soft-full>220,`soft ${soft}, full ${full}`);
});

test("motorized flippers rotate to separate held limits and return",()=>{
  const physics=new StarforgePhysics();const rest=physics.snapshot().flippers.map(f=>f.angle);advance(physics,.12,{left:true,right:true});const held=physics.snapshot().flippers.map(f=>f.angle);
  assert.ok(held[0]<rest[0]-.2);assert.ok(held[1]>rest[1]+.2);advance(physics,.18,{});const returned=physics.snapshot().flippers.map(f=>f.angle);assert.ok(Math.abs(returned[0]-rest[0])<.08);assert.ok(Math.abs(returned[1]-rest[1])<.08);
});

test("high-speed ball contacts thin ramp rails and bumper impulses remain finite",()=>{
  const rail=new StarforgePhysics();rail.resetBalls([1]);rail.setBallState(1,{x:145,y:620,vx:0,vy:-900});advance(rail,.55);const events=rail.takeEvents();assert.ok(events.some(e=>e.kind==="ramp-rail"));assert.ok(events.some(e=>e.kind==="ramp"));
  const bumper=new StarforgePhysics();bumper.resetBalls([1]);bumper.setBallState(1,{x:245,y:230,vx:0,vy:1000});advance(bumper,.25);const ball=bumper.snapshot().balls[0];assert.ok(bumper.takeEvents().some(e=>e.kind==="bumper"));assert.ok(Number.isFinite(ball.vx)&&Number.isFinite(ball.vy));
});

test("spinner and gate are physical normalized contact surfaces",()=>{
  const physics=new StarforgePhysics();physics.resetBalls([1]);physics.setBallState(1,{x:350,y:505,vx:0,vy:-700});advance(physics,.3);const events=physics.takeEvents();assert.ok(events.some(e=>e.kind==="spinner"||e.kind==="gate"));assert.ok(physics.snapshot().jointCount>=8);
});

test("ramp direction and timeout are ball-scoped and falsifiable",()=>{
  const physics=new StarforgePhysics();physics.resetBalls([1,2]);physics.setBallState(1,{x:145,y:570,vx:0,vy:400});advance(physics,.05);assert.ok(physics.takeEvents().some(e=>e.kind==="ramp-reject"&&e.reason==="direction"));
  physics.setBallState(2,{x:145,y:590,vx:0,vy:-250});advance(physics,.05);advance(physics,1.7);assert.ok(physics.takeEvents().some(e=>e.kind==="ramp-reject"&&e.ballId===2&&e.reason==="timeout"));
});

test("multiball contacts, bodies, particles, and audio voices are bounded",()=>{
  const physics=new StarforgePhysics();physics.resetBalls([1,2,3]);assert.equal(physics.snapshot().balls.length,3);assert.ok(physics.snapshot().bodyCount<40);
  let particles=[];for(let i=0;i<20;i++)particles=addBurst(particles,350,500,"#fff",10);assert.equal(particles.length,MAX_PARTICLES);particles=advanceParticles(particles,1);assert.equal(particles.length,0);
  assert.equal(MAX_AUDIO_VOICES,8);assert.notDeepEqual(soundProfile({label:"BUMPER"}),soundProfile({label:"SLING"}));assert.notDeepEqual(soundProfile({label:"DRAIN"}),soundProfile({label:"RAMP"}));
});
