export const TABLE = {
  width: 700,
  height: 1080,
  ballRadius: 12,
  gravity: 510,
  maxSpeed: 1050,
  fixedStep: 1 / 120,
  maxCatchUpSteps: 8,
  wallBounce: 0.82,
  flipperImpulse: 560,
  launchMin: 610,
  launchRange: 430,
  ballSaveSeconds: 10,
  comboSeconds: 5,
  wizardSeconds: 28,
  nudgeLimit: 3,
  nudgeCooldown: 0.28,
  targetCount: 4,
  locksForMultiball: 2,
  wizardObjectives: 4,
  scoring: {
    bumper: 1000,
    sling: 500,
    lane: 2500,
    target: 1500,
    ramp: 5000,
    reactor: 7500,
    jackpot: 25000,
    skillShot: 10000,
    combo: 7500,
    wizard: 50000,
  },
};

export const FIXTURES = [
  { id: "bumper-a", kind: "bumper", x: 235, y: 330, r: 44 },
  { id: "bumper-b", kind: "bumper", x: 350, y: 260, r: 46 },
  { id: "bumper-c", kind: "bumper", x: 465, y: 350, r: 44 },
  { id: "reactor", kind: "reactor", x: 350, y: 515, r: 62 },
  { id: "lane-left", kind: "lane", x: 88, y: 180, r: 30 },
  { id: "lane-right", kind: "lane", x: 612, y: 180, r: 30 },
  { id: "target-0", kind: "target", x: 250, y: 660, r: 24, index: 0 },
  { id: "target-1", kind: "target", x: 315, y: 630, r: 24, index: 1 },
  { id: "target-2", kind: "target", x: 385, y: 630, r: 24, index: 2 },
  { id: "target-3", kind: "target", x: 450, y: 660, r: 24, index: 3 },
  { id: "sling-left", kind: "sling", x: 205, y: 825, r: 38 },
  { id: "sling-right", kind: "sling", x: 495, y: 825, r: 38 },
];

export const RAMP_PATHS = [
  { id: "ramp-left", side: "left", xMin: 104, xMax: 186, entranceY: 575, exitY: 405, points: [[145, 575], [126, 520], [132, 455], [174, 405]] },
  { id: "ramp-right", side: "right", xMin: 514, xMax: 596, entranceY: 575, exitY: 405, points: [[555, 575], [574, 520], [568, 455], [526, 405]] },
];

export const COLORS = {
  ink: "#eef6ff",
  cyan: "#54efff",
  violet: "#52dce8",
  magenta: "#ff8a24",
  amber: "#ffc35a",
  danger: "#ff5d75",
  table: "#07132f",
};

export const GEOMETRY = {
  scale: 100,
  wall: { left: 48, right: 652, top: 58, bottom: 1032 },
  launchLane: { left: 586, right: 650, top: 900, bottom: 1010 },
  launchDeflector: [[642, 182], [548, 132]],
  launchExit: { x: 620, y: 120 },
  drain: { left: 282, right: 418, y: 1030 },
  flippers: [
    { id: "flipper-left", side: "left", pivot: [242, 900], length: 128, width: 25, rest: 0.28, active: -0.48 },
    { id: "flipper-right", side: "right", pivot: [458, 900], length: 128, width: 25, rest: Math.PI - 0.28, active: Math.PI + 0.48 },
  ],
  slings: [
    { id: "sling-left", points: [[142, 790], [270, 824], [172, 864]] },
    { id: "sling-right", points: [[558, 790], [430, 824], [528, 864]] },
  ],
  guides: [
    [[48, 820], [48, 910], [190, 935]], [[652, 820], [652, 560]],
    [[75, 720], [120, 780], [140, 880]], [[570, 720], [540, 780], [530, 880]],
    [[150, 720], [210, 760], [270, 785]], [[550, 720], [490, 760], [430, 785]],
  ],
  rollovers: [{ id:"rollover-l", x:205, y:145 }, { id:"rollover-c", x:350, y:125 }, { id:"rollover-r", x:495, y:145 }],
  spinner: { id:"spinner", x:350, y:430, halfWidth:42 },
  targets: [{x:265,y:610},{x:320,y:595},{x:380,y:595},{x:435,y:610}],
  bumpers: [{x:245,y:300,r:42},{x:350,y:245,r:44},{x:455,y:300,r:42}],
  reactor: {x:350,y:510,r:58},
  posts: [{x:190,y:862,r:14},{x:510,y:862,r:14},{x:270,y:884,r:12},{x:430,y:884,r:12}],
};
