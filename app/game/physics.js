import { Box, Circle, Edge, PrismaticJoint, RevoluteJoint, Vec2, World } from "planck";
import { GEOMETRY, TABLE } from "./config.js";

const S = GEOMETRY.scale;
const v = (x, y) => Vec2(x / S, y / S);
const material = {
  metal: { friction: .12, restitution: .72 }, rubber: { friction: .32, restitution: .92 },
  plastic: { friction: .18, restitution: .58 }, sensor: { isSensor: true },
};

export class StarforgePhysics {
  constructor() {
    this.world = new World(Vec2(0, 8.7));
    this.events = [];
    this.balls = new Map();
    this.contacts = new Set();
    this.accumulator = 0;
    this.bodyPeak = 0;
    this.rampState = new Map();
    this.ground = this.world.createBody();
    this.#buildTable();
    this.#listen();
  }

  #fixture(body, shape, data, options = material.metal) {
    const fixture = body.createFixture(shape, options); fixture.setUserData(data); return fixture;
  }

  #edge(a, b, data = { kind:"wall", material:"metal" }, options = material.metal) {
    this.#fixture(this.ground, Edge(v(...a), v(...b)), data, options);
  }

  #buildTable() {
    const w = GEOMETRY.wall;
    this.#edge([w.left,w.bottom],[w.left,w.top]); this.#edge([w.left,w.top],[w.right,w.top]); this.#edge([w.right,w.top],[w.right,w.bottom]);
    this.#edge([w.left,w.bottom],[GEOMETRY.drain.left,w.bottom]); this.#edge([GEOMETRY.drain.right,w.bottom],[w.right,w.bottom]);
    this.#edge([GEOMETRY.launchLane.left,GEOMETRY.launchLane.bottom],[GEOMETRY.launchLane.left,GEOMETRY.launchLane.top],{kind:"launch-guide",id:"launch-left",material:"metal"});
    const arch=[[586,130],[565,92],[520,65],[460,49],[350,42],[240,49],[150,68],[86,110],[58,170]];
    for(let i=1;i<arch.length;i++)this.#edge(arch[i-1],arch[i],{kind:"top-arch",material:"metal"});
    { const exit=this.world.createBody(v(GEOMETRY.launchExit.x,GEOMETRY.launchExit.y)); this.#fixture(exit,Box(.34,.06),{kind:"launch-exit",id:"launch-exit",material:"sensor"},material.sensor); }
    for (const [guideIndex,guide] of GEOMETRY.guides.entries()) for (let i=1;i<guide.length;i++) this.#edge(guide[i-1],guide[i],{kind:"guide",id:`guide-${guideIndex}`,material:"metal"});
    for (const sling of GEOMETRY.slings) {
      for (let i=0;i<sling.points.length;i++) this.#edge(sling.points[i],sling.points[(i+1)%sling.points.length],{kind:"sling",id:sling.id,material:"rubber"},material.rubber);
    }
    for (let i=0;i<GEOMETRY.bumpers.length;i++) { const b=GEOMETRY.bumpers[i]; const body=this.world.createBody(v(b.x,b.y)); this.#fixture(body,Circle(b.r/S),{kind:"bumper",id:`bumper-${i}`,material:"rubber"},material.rubber); }
    { const r=GEOMETRY.reactor; const body=this.world.createBody(v(r.x,r.y)); this.#fixture(body,Circle(r.r/S),{kind:"reactor",id:"reactor",material:"metal"},{friction:.1,restitution:.8}); }
    for(const post of GEOMETRY.posts){const body=this.world.createBody(v(post.x,post.y));this.#fixture(body,Circle(post.r/S),{kind:"post",id:`post-${post.x}-${post.y}`,material:"metal"},material.metal);}
    this.targets=GEOMETRY.targets.map((t,i)=>{const body=this.world.createDynamicBody({position:v(t.x,t.y),linearDamping:8});this.#fixture(body,Box(.22,.07,Vec2(0,0),-.15+(i*.1)),{kind:"target",id:`target-${i}`,index:i,material:"plastic"},{density:3,...material.plastic});const joint=this.world.createJoint(PrismaticJoint({enableLimit:true,lowerTranslation:0,upperTranslation:.1,enableMotor:true,maxMotorForce:35,motorSpeed:-1.8},this.ground,body,body.getPosition(),Vec2(0,1)));return{body,joint};});
    for (const lane of GEOMETRY.rollovers) { const body=this.world.createBody(v(lane.x,lane.y)); this.#fixture(body,Box(.25,.04),{kind:"lane",id:lane.id,material:"sensor"},material.sensor); }
    { const s=GEOMETRY.spinner; const body=this.world.createDynamicBody(v(s.x,s.y)); this.#fixture(body,Box(s.halfWidth/S,.025),{kind:"spinner",id:"spinner",material:"metal"},{density:.2,friction:.05,restitution:.2}); this.spinner=body; this.world.createJoint(RevoluteJoint({enableMotor:false},this.ground,body,body.getPosition())); }
    { const gate=this.world.createBody(v(350,470)); this.#fixture(gate,Edge(Vec2(-.28,0),Vec2(.28,0)),{kind:"gate",id:"spinner-gate",material:"metal"},material.metal); }
    for (const side of ["left","right"]) { const x=side==="left"?145:555; const entrance=this.world.createBody(v(x,575)); this.#fixture(entrance,Box(.4,.06),{kind:"ramp-enter",id:`ramp-${side}`,side,material:"sensor"},material.sensor); const exit=this.world.createBody(v(side==="left"?180:520,390)); this.#fixture(exit,Box(.45,.06),{kind:"ramp-exit",id:`ramp-${side}`,side,material:"sensor"},material.sensor);
      const path=side==="left"?[[145,590],[126,520],[132,455],[174,392]]:[[555,590],[574,520],[568,455],[526,392]];for(let i=1;i<path.length;i++){const a=path[i-1],b=path[i];const dx=b[0]-a[0],dy=b[1]-a[1],len=Math.hypot(dx,dy),nx=-dy/len*25,ny=dx/len*25;this.#edge([a[0]+nx,a[1]+ny],[b[0]+nx,b[1]+ny],{kind:"ramp-rail",side,material:"metal"});this.#edge([a[0]-nx,a[1]-ny],[b[0]-nx,b[1]-ny],{kind:"ramp-rail",side,material:"metal"});}
    }
    const drain=this.world.createBody(v(350,1055)); this.#fixture(drain,Box(.68,.12),{kind:"drain",id:"drain",material:"sensor"},material.sensor);
    this.flippers = GEOMETRY.flippers.map((f) => {
      const body=this.world.createDynamicBody({position:v(...f.pivot),angle:f.rest}); const dir=f.side==="left"?1:-1;
      this.#fixture(body,Box(f.length/(2*S),f.width/(2*S),Vec2(dir*f.length/(2*S),0),0),{kind:"flipper",id:f.id,side:f.side,material:"rubber"},{density:6,friction:.5,restitution:.25});
      const joint=this.world.createJoint(RevoluteJoint({enableLimit:true,lowerAngle:f.side==="left"?f.active-f.rest:0,upperAngle:f.side==="left"?0:f.active-f.rest,referenceAngle:f.rest,enableMotor:true,maxMotorTorque:12000,motorSpeed:0},this.ground,body,body.getPosition()));
      return {config:f,body,joint};
    });
    const plunger=this.world.createDynamicBody(v(620,955)); this.#fixture(plunger,Box(.22,.12),{kind:"plunger",id:"plunger",material:"rubber"},{density:80,friction:.5,restitution:.72});
    this.plunger=plunger; this.plungerReleaseSpeed=0;this.plungerJoint=this.world.createJoint(PrismaticJoint({enableLimit:true,lowerTranslation:0,upperTranslation:.75,enableMotor:true,maxMotorForce:9000,motorSpeed:0},this.ground,plunger,plunger.getPosition(),Vec2(0,1)));
  }

  #listen() {
    this.world.on("begin-contact", (contact) => {
      const a=contact.getFixtureA(), b=contact.getFixtureB(); const da=a.getUserData(), db=b.getUserData();
      const ballFixture=da?.kind==="ball"?a:db?.kind==="ball"?b:null; const other=ballFixture===a?b:a; if(!ballFixture)return;
      const ball=ballFixture.getUserData(), hit=other.getUserData()||{kind:"unknown"}; const key=`${ball.id}:${hit.id||hit.kind}`; this.contacts.add(key);
      const body=ballFixture.getBody(); const velocity=body.getLinearVelocity();
      if(hit.kind==="bumper"||hit.kind==="sling"){const point=other.getBody().getPosition();const delta=Vec2.sub(body.getPosition(),point);if(delta.lengthSquared()<.001)delta.set(0,-1);delta.normalize();body.applyLinearImpulse(Vec2.mul(delta,hit.kind==="bumper"?.58:.42),body.getWorldCenter(),true);}
      if(hit.kind==="launch-exit"&&velocity.y<0) body.applyLinearImpulse(Vec2(-8,.05),body.getWorldCenter(),true);
      if(hit.kind==="ramp-enter") { if(velocity.y<-.7) this.rampState.set(ball.id,{side:hit.side,time:0}); else this.events.push({kind:"ramp-reject",ballId:ball.id,reason:"direction"}); }
      else if(hit.kind==="ramp-exit") { const state=this.rampState.get(ball.id); if(state?.side===hit.side) { this.events.push({kind:"ramp",id:`ramp-${hit.side}`,ballId:ball.id,material:"metal"}); this.rampState.delete(ball.id); } }
      else this.events.push({...hit,ballId:ball.id,speed:Math.hypot(velocity.x,velocity.y)});
    });
    this.world.on("end-contact", (contact) => { const ds=[contact.getFixtureA().getUserData(),contact.getFixtureB().getUserData()]; const ball=ds.find(d=>d?.kind==="ball"), hit=ds.find(d=>d?.kind!=="ball"); if(ball&&hit)this.contacts.delete(`${ball.id}:${hit.id||hit.kind}`); });
  }

  spawnBall(id, x=620, y=930) { if(this.balls.has(id))this.removeBall(id); const body=this.world.createDynamicBody({position:v(x,y),bullet:true,linearDamping:.035,angularDamping:.02}); this.#fixture(body,Circle(TABLE.ballRadius/S),{kind:"ball",id,material:"steel"},{density:1.1,friction:.09,restitution:.48}); this.balls.set(id,body); return body; }
  removeBall(id) { const body=this.balls.get(id); if(body){this.world.destroyBody(body);this.balls.delete(id);} for(const key of [...this.contacts])if(key.startsWith(`${id}:`))this.contacts.delete(key);this.rampState.delete(id); }
  resetBalls(ids=[1]) { for(const id of [...this.balls.keys()])this.removeBall(id); ids.forEach((id,i)=>this.spawnBall(id,620-i*30,930-i*30)); }
  launch(id,power=.7) { const body=this.balls.get(id)??this.spawnBall(id); const inputPower=Math.max(0,Math.min(1,power));const p=.45+inputPower*.55; this.plunger.setActive(true); body.setTransform(v(620,930+p*68),0); body.setLinearVelocity(Vec2(0,0));this.plunger.setTransform(v(620,955+p*68),0);this.plungerReleaseSpeed=-(3.8+p*3.8);this.plunger.setLinearVelocity(Vec2(0,this.plungerReleaseSpeed));this.plungerJoint.setMotorSpeed(this.plungerReleaseSpeed);this.events.push({kind:"plunger-release",id:"plunger",ballId:id,power:inputPower,energy:p,material:"spring"}); }
  setActions(actions, charge=0) {
    for(const f of this.flippers){const active=actions[f.config.side];const angle=f.body.getAngle();const target=active?f.config.active:f.config.rest;const delta=target-angle;f.joint.setMotorSpeed(Math.max(-28,Math.min(28,delta*34)));}
    if(actions.plunge){this.plungerReleaseSpeed=0;this.plungerJoint.setMotorSpeed(Math.max(.5,charge*2.8));}else this.plungerJoint.setMotorSpeed(this.plungerReleaseSpeed||-7);
  }
  nudge(direction){for(const body of this.balls.values())body.applyLinearImpulse(Vec2(direction*.36,-.05),body.getWorldCenter(),true);}
  setBallState(id,{x,y,vx=0,vy=0}){const body=this.balls.get(id)??this.spawnBall(id,x,y);body.setTransform(v(x,y),0);body.setLinearVelocity(Vec2(vx/S,vy/S));body.setAwake(true);return body;}
  step(elapsed,actions={},charge=0){this.setActions(actions,charge);this.accumulator+=Math.min(elapsed,TABLE.fixedStep*TABLE.maxCatchUpSteps);let steps=0;while(this.accumulator>=TABLE.fixedStep&&steps<TABLE.maxCatchUpSteps){this.world.step(TABLE.fixedStep,8,3);if(this.plungerReleaseSpeed&&this.plungerJoint.getJointTranslation()<.012){this.plungerReleaseSpeed=0;this.plunger.setActive(false);}for(const [id,state]of this.rampState){state.time+=TABLE.fixedStep;if(state.time>1.6){this.rampState.delete(id);this.events.push({kind:"ramp-reject",ballId:id,reason:"timeout"});}}this.accumulator-=TABLE.fixedStep;steps++;}this.bodyPeak=Math.max(this.bodyPeak,this.world.getBodyCount());return steps;}
  takeEvents(){return this.events.splice(0);}
  snapshot(){return{balls:[...this.balls].map(([id,b])=>({id,x:b.getPosition().x*S,y:b.getPosition().y*S,vx:b.getLinearVelocity().x*S,vy:b.getLinearVelocity().y*S})),flippers:this.flippers.map(f=>({id:f.config.id,angle:f.body.getAngle()})),plunger:{x:this.plunger.getPosition().x*S,y:this.plunger.getPosition().y*S},spinnerAngle:this.spinner.getAngle(),contacts:[...this.contacts],ramps:[...this.rampState],bodyCount:this.world.getBodyCount(),jointCount:this.world.getJointCount(),bodyPeak:this.bodyPeak,step:TABLE.fixedStep};}
  destroy(){for(const body of [...this.balls.values()])this.world.destroyBody(body);this.balls.clear();}
}
