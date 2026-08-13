export const emptyActions = () => ({ left: false, right: false, plunge: false, nudgeLeft: false, nudgeRight: false, pause: false, restart: false });

export function gamepadActions(pad) {
  if (!pad) return emptyActions();
  return {
    left: Boolean(pad.buttons?.[4]?.pressed || pad.buttons?.[6]?.pressed || pad.axes?.[0] < -0.55),
    right: Boolean(pad.buttons?.[5]?.pressed || pad.buttons?.[7]?.pressed || pad.axes?.[0] > 0.55),
    plunge: Boolean(pad.buttons?.[0]?.pressed),
    nudgeLeft: Boolean(pad.buttons?.[14]?.pressed),
    nudgeRight: Boolean(pad.buttons?.[15]?.pressed),
    pause: Boolean(pad.buttons?.[9]?.pressed),
    restart: Boolean(pad.buttons?.[8]?.pressed),
  };
}

export function clearActions(actions) {
  for (const key of Object.keys(actions)) actions[key] = false;
  return actions;
}
