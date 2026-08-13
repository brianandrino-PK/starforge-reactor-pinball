export const MAX_AUDIO_VOICES = 8;
export const MAX_PARTICLES = 84;

export function soundProfile(event = {}) {
  const label = `${event.label ?? event.kind ?? event.type ?? ""}`.toLowerCase();
  if (label.includes("sling")) return { wave:"square", frequency:185, duration:.075, gain:.035 };
  if (label.includes("bumper")) return { wave:"sine", frequency:520, duration:.11, gain:.05 };
  if (label.includes("target")) return { wave:"triangle", frequency:320, duration:.08, gain:.04 };
  if (label.includes("ramp") || label.includes("spinner")) return { wave:"triangle", frequency:720, duration:.14, gain:.035 };
  if (label.includes("drain") || label.includes("tilt")) return { wave:"sawtooth", frequency:95, duration:.24, gain:.045 };
  if (label.includes("wizard") || label.includes("jackpot")) return { wave:"sine", frequency:880, duration:.3, gain:.055 };
  if (label.includes("launch") || label.includes("plunger")) return { wave:"triangle", frequency:245, duration:.16, gain:.045 };
  return { wave:"sine", frequency:410, duration:.1, gain:.035 };
}

export function addBurst(particles, x, y, color, count = 10) {
  const next = particles.slice(-MAX_PARTICLES);
  for (let i=0;i<count && next.length<MAX_PARTICLES;i++) {
    const angle=(Math.PI*2*i)/count;
    next.push({x,y,vx:Math.cos(angle)*(55+(i%4)*18),vy:Math.sin(angle)*(55+(i%3)*22),life:.42,color});
  }
  return next;
}

export function advanceParticles(particles, dt) {
  return particles.map((p)=>({...p,x:p.x+p.vx*dt,y:p.y+p.vy*dt,vy:p.vy+120*dt,life:p.life-dt})).filter((p)=>p.life>0).slice(-MAX_PARTICLES);
}
