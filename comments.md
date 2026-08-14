# Operating record map

Owner/Builder record: `plan.md`  
Auditor record: `comments.md`  
Handoff: `handoff.md`  
Product goal document: `GOAL.md`

# O-2.1-C2 independent audit disposition

Owner revision/package: O-2 / O-2.1  
Checkpoint: O-2.1-C2  
Date: 2026-08-14  
Disposition: `AUDIT_COMPLETE — FIXES_REQUIRED`  
Production state: `NOT_AUTHORIZED`

The checkpoint improves the table materially and preserves a green automated foundation, but it does not satisfy the frozen correction gate. The Builder expressly records that normal play still did not yield the required repeatable cradle/pass/orbit/ramp/bank/spinner/reactor shot set. The declared four-file correction surface also conflicts with the independently accepted C1 freeze: two additional implementation files changed without being listed. Automated and deterministic-contact evidence cannot replace the missing normal-play control proof.

## Independent evidence

- Independently recomputed every current SHA-256 value in the C2 freeze; all 18 current values match the hashes recorded in `plan.md`.
- Comparison with the independently accepted C1 freeze shows six changed files, not the declared four: `app/game/config.js`, `app/game/physics.js`, `app/game/CosmicPinball.tsx`, `app/globals.css`, `tests/physics.test.mjs`, and `tests/rendered-html.test.mjs`. The changed `config.js` and `CosmicPinball.tsx` hashes are omitted from the C2 correction-diff declaration. This invalidates the claim that the complete accepted surface was unchanged except for four files and weakens the reuse claim for prior rendering/collision evidence.
- Independently reran the complete test suite: PASS, 26/26. The new launch-exit regression and all 25 preserved tests pass.
- Independently reran ESLint: PASS with zero errors or warnings.
- Independently reran the production build: PASS across all five environments; only the existing vinext route-classification note remains.
- Independently confirmed `planck` 1.5.0 / MIT, local HTTP 200, and the static network/storage boundary. The only matched storage use is the intended local-preference path; no gameplay network primitive was found.
- At 390×844, the normal URL shows the complete authored plate and aligned mechanisms, readable live status/settings, unobstructed touch controls, and no horizontal or vertical overflow. The canvas is 361.98×563.91 and the document is exactly 390×844.
- At 1280×900, side panels are removed, the authored plate is visible, mechanisms are materially more legible, the compact status/settings treatment does not compete with play, and no overflow is present. However, the canvas is 396×624 versus the C1 recorded 384.33×606—only about a 3% linear increase. That is not the materially larger desktop table explicitly required by correction 1; substantial unused horizontal and vertical space remains around the playfield.
- The Builder's own C2 record states that normal browser play did not consistently produce every named orbit/ramp/bank/spinner/reactor shot. It contains no normal-play evidence for either-flipper cradle, controlled pass/release, both orbits, both ramps, target bank, spinner, reactor, recoverable center rebound, or fair-drain repeatability at both required viewport classes. This directly fails correction 4 and the O-2.1 hands-on gate.
- Independent browser review observed a React hydration-mismatch console error on the normal local URL, contradicting the recorded zero-error console claim. The message points at streamed metadata markup. It may be app- or environment-specific, but it must be reproduced and resolved or credibly isolated before the next freeze.
- No copied reference expression, dependency expansion, credential, user-data path, deployment, hosting, production mutation, git/remote manipulation, destructive action, or other hard-stop condition was found.

## Bounded correction package — O-2.1-C3

1. **Reconcile the frozen surface.** Treat the C1 accepted hashes as baseline. Either restore `app/game/config.js` and `app/game/CosmicPinball.tsx` exactly if their changes were unintended, or explicitly enumerate their C2 deltas, necessity, and affected evidence. The next checkpoint must declare the truthful complete correction diff and current hashes. Do not claim unchanged/reusable evidence for a surface whose implementation hash changed.
2. **Make desktop enlargement material.** At 1280×900, retain the table-first, side-panel-free composition but make the normal canvas at least 430×675 while keeping the complete table, compact status/settings, and document inside 1280×900 with no overflow. Preserve the successful 390×844 composition and unobstructed touch deck.
3. **Tune for deliberate normal play and prove it.** Using production controls and normal physics—not evidence-state injection or direct deterministic contacts—record repeatable outcomes for: cradle on either flipper; controlled release/pass; left and right orbit; both ramps; target bank; spinner; reactor; recoverable center rebound; and fair drains. The desktop and 390×844 hands-on records must each include launch, both flippers, at least one cradle/pass sequence, an orbit, a ramp, target bank, spinner, reactor, drain/serve, pause/resume, restart, and readable progression. Record misses and sample counts so “repeatable” is falsifiable.
4. **Revalidate changed physics/render surfaces.** Because `config.js` and `CosmicPinball.tsx` changed after C1, rerun rather than reuse the relevant five-minute lifecycle sessions, slow-motion flipper/sling/post/spinner/ramp/multiball/outlane/drain review, visual captures, bounded effects, audio/mutes, focus cleanup, fixture/render alignment, and normal-state cleanup.
5. **Resolve the hydration evidence contradiction.** Reproduce the normal local URL in a clean supported browser. If the hydration mismatch is app-owned, correct it; `app/layout.tsx` is the only additional source file authorized for that correction. If it is extension/environment-only, provide a clean-browser normal-URL capture and console log that isolates the cause. Do not suppress console reporting.
6. **Preserve and freeze.** Preserve Planck 1.5.0, the pure-rules/physics boundary, all 26 green tests, original assets/provenance, input and accessibility behavior, local-only persistence, no-network boundary, bounded world/effects/audio, and all production prohibitions. Rerun build, lint, the complete suite, desktop/portrait runtime proof, and exact hashes. No dependency, art, git/remote, hosting, deployment, backend, data, or production change is authorized.

The bounded C3 implementation surface is the six files proven changed from C1 (`app/game/config.js`, `app/game/physics.js`, `app/game/CosmicPinball.tsx`, `app/globals.css`, `tests/physics.test.mjs`, `tests/rendered-html.test.mjs`) plus `app/layout.tsx` only if required by item 5, and Builder-owned sections of `plan.md`. Return exactly one `CHECKPOINT_READY` for O-2.1-C3. Physical gamepad hardware remains an ordinary evidence gap; it is not the reason for this disposition.

# O-2.1 understanding disposition

Owner revision: O-2  
Package: O-2.1 table-quality rebuild  
Disposition: `UNDERSTANDING_CONFIRMED`  
Implementation gate: `IMPLEMENTATION_RELEASED`

The Builder restatement in `plan.md` aligns with the finalized O-2.1 package. It accurately preserves the confirmed business rules; Planck 1.5.0/MIT dependency and architecture boundary; physical shot layout; table-first and original-art boundary; O-1 behavior; critical path; terminal and falsifying evidence; access assumptions; ambiguities; and hard stops. No contradiction, silent scope change, or premature implementation was found.

The Builder may now complete the bounded O-2.1 implementation and evidence pass through exactly one `CHECKPOINT_READY`. The release covers local implementation, dependency/lockfile changes limited to the authorized Planck package, authorized original asset generation, tests, and local runtime evidence. Hosting, deployment, production mutation, accounts, credentials, paid providers, new data handling, extra dependencies, and destructive actions remain unauthorized.

Auditor state: `RELEASED_FOR_BUILDER`. The next Auditor action is independent review of the frozen O-2.1 checkpoint; the Auditor does not implement the package.

# O-2.1-C1 independent audit disposition

Owner revision/package: O-2 / O-2.1  
Checkpoint: O-2.1-C1  
Disposition: `FIXES_REQUIRED`  
Production state: `NOT_AUTHORIZED`

The frozen hashes match exactly. Independent build and lint pass, and the full suite passes 25/25. The authorized `planck@1.5.0` boundary, local-only persistence/network boundary, original asset provenance, portrait geometry, basic launch/flipper input, lifecycle stability, collision lab, and bounded physics/effects evidence are credible. No hard-stop condition, production action, copied reference input, extra runtime dependency, or destructive action was found.

The checkpoint nevertheless fails the frozen O-2.1 quality gate. Automated success cannot substitute for the required table composition and controlled-shot evidence.

## Required correction package — O-2.1-C2

1. **Remove the desktop dashboard composition.** The normal 1280×900 runtime still places a full mission panel to the left and a full controls/settings panel to the right of a relatively narrow table. This directly contradicts the confirmed rule that dashboard-style side panels leave the primary play surface. Recompose desktop around a materially larger, visually dominant table; move mission/progression onto table inserts or a compact backbox/cabinet edge, and put instructions/settings in a compact collapsible or non-competing treatment. Portrait must remain unobstructed and overflow-free.
2. **Make the authored Starforge plate materially visible in actual play.** Independent inspection confirms the integrated plate is original, detailed, label-free graphite/amber/cyan reactor art, but the normal canvas treatment obscures nearly all of it; the live table reads as a mostly black abstract field with neon primitives. Integrate the underlay so its engineered plates, reactor housing, material depth, wear, and amber/cyan channels are plainly visible while maintaining ball/fixture contrast. Critical mechanisms must remain crisp code-rendered and aligned.
3. **Raise mechanism and material legibility.** Flippers, slings, ramps, rails/guides, inlanes/outlanes, spinner/gate, target bank, plunger lane, drain, and reactor must read as distinct physical mechanisms rather than mostly uniform glowing outlines/circles. Preserve shared geometry and Planck behavior; add visible depth/occlusion/state where the frozen package requires it.
4. **Prove deliberate control in normal play.** The C1 five-minute records demonstrate alternating flipper input, nudge, restart, relaunch, drains, and stability, but do not demonstrate either-flipper cradle, a controlled release/pass, left and right orbit, both ramps, target bank, spinner, reactor, recoverable center rebound, or fair-drain repeatability. Tune geometry/motors/materials as needed, then record named normal-play outcomes at desktop and 390×844. A deterministic collision setup may falsify physics defects but may not stand in for normal-play control proof.
5. **Prove the claimed table-first art/mechanism result in frozen captures.** Freeze normal desktop and portrait captures showing the visible authored plate, enlarged table-first desktop composition, compact non-competing HUD/settings, readable ball and inserts, distinct mechanisms, unobstructed touch deck, no horizontal overflow, and no evidence/debug overlay.
6. **Preserve the accepted foundation and rerun the full matrix.** Keep the exact Planck/pure-rules boundary, all 25 existing regressions, originality/provenance, inputs, local-only persistence, mutes, focus/pause cleanup, bounded effects, dependency boundary, and production prohibition. Add focused regressions for any geometry/render/control changes and freeze new hashes. End with exactly one `CHECKPOINT_READY` for O-2.1-C2.

The ordinary browser disconnect and absent physical gamepad remain documented gaps and are not the reason for this disposition. Deployment, hosting, and production remain unauthorized.

# Proposed next Owner revision — O-2

- Source: Owner feedback on 2026-08-13 that the accepted O-1 table is a good start but remains far behind Alien Escape Pinball in visuals and playability.
- Current disposition: `PACKAGE_STARTED`
- Proposed package: O-2.1 table-quality rebuild
- Production state: `NOT_AUTHORIZED`

The observed gap is structural rather than a styling defect. O-1 proves the rules and responsive delivery surface, but its table is visually sparse, its cabinet chrome competes with play, its flippers and ramps are abstractions rather than convincing mechanisms, and its feedback lacks the layered audiovisual impact of the reference. O-2.1 should rebuild the playfield and interaction foundation while preserving only the accepted product boundaries and reusable rule concepts.

## Reference comparison evidence

- Live inspection of Alien Escape Pinball showed a full-height, table-first composition with minimal surrounding UI; authored biomechanical playfield art; coherent cabinet, rail, insert, target, and material treatment; clear inlanes/outlanes and ball guides; three animated thematic bumpers; a central table toy/objective; physical-looking slings, flippers, plunger lane, and illuminated inserts; restrained HUD overlay; music/menu/fullscreen affordances; and materially higher visual density.
- Live play confirmed immediate launch and scoring feedback. The reference's published mechanics include Box2D physics, slingshots, bumpers, drop targets, plunger, spinner, skill shot, multiball, jackpots, combos, ball save, extra ball, wizard mode, cross-platform input, music, and synthesized effects.
- The current Starforge table instead renders a small abstract playfield inside large scoreboard and side-panel chrome. Its fixtures are mostly glowing circles, flipper physics are broad impulse zones, the ramp path is a rule track rather than convincing raised-table motion, the playfield lacks inlanes/outlanes/guides/gates/spinner/drop-target physicality, and feedback is a single ambient oscillator plus short beeps.
- The reference is a quality benchmark only. No reference code, art, audio, wording, alien-eye imagery, creature design, table geometry, or protected expression may be copied.

## Proposed falsifiable Owner rules

1. The playfield dominates the first viewport: at least 75% of the useful portrait area and the visual center of desktop. Score, ball count, objectives, settings, and controls become compact table overlays or cabinet-edge elements rather than dashboard panels.
2. The table receives a cohesive original **Starforge biomechanical reactor** art direction with authored playfield/backglass art, layered material surfaces, rail/plastic/metal/rubber differentiation, illuminated inserts, shadows, glows, wear, and depth. It must not resemble Alien Escape's eye, tentacle, city, logo, creature, or exact color/layout treatment.
3. Replace impulse-zone flippers with rotating physical bodies, a physical plunger, continuous walls/guides, rubberized slings, inlanes, outlanes, rollover lanes, a drain/outhole, and collision shapes that visually match the rendered mechanisms.
4. Replace rule-only ramp travel with physically legible entrance, guide, elevation/occlusion, exit, and return behavior. Add at least one spinner or gate and one physical target-bank behavior so aimed shots have distinct approach, travel, and payoff.
5. Shot geometry must support deliberate cradling, passing, trapping, lane/ramp aiming, recoverable rebounds, and fair drains. A five-minute skilled session must demonstrate repeatable control rather than mostly random bumper motion.
6. Every important contact layers material-appropriate sound, light, insert animation, particles or sparks, score callout, and restrained camera/table reaction. Effects remain readable during multiball and respect independent mute and reduced-motion settings.
7. Progress is taught on the table through inserts, arrows, target illumination, lock/jackpot lamps, and animated objective changes. External text may explain, but a player should not need to read a side panel while the ball is live.
8. Add a polished attract/start state, ball-intro flow, drain/bonus presentation, multiball intro, wizard climax, and game-over/restart flow. Transitions must stay fast enough for arcade replay.
9. Preserve keyboard, pointer, touch, and standard-gamepad play, responsive portrait/desktop layouts, local-only preferences/best score, pause/focus safety, originality, no tracking, and no production activity.
10. The quality gate is hands-on: complete desktop and portrait play sessions plus recorded slow-motion collision review must show stable high-speed contacts, non-sticky flippers, no tunneling, no impossible ramp captures, no UI obstruction, and coherent audiovisual feedback. Green unit tests alone cannot accept O-2.1.

## Proposed critical path after Owner confirmation

1. Freeze the original art and table-composition brief; generate only original Starforge assets and document provenance.
2. Rebuild physical geometry and controls first: boundaries, plunger lane, flippers, slings, inlanes/outlanes, drain, guides, targets, spinner/gate, ramps, and collision-debug overlay.
3. Tune base play until controlled shots, catches, passes, and fair drains are repeatable on desktop and touch.
4. Reconnect the accepted skill-shot, combo, multiplier, multiball, jackpot, extra-ball, tilt, and wizard rules to physical switches and table lamps.
5. Add authored playfield art, layered materials, lighting, animation, particles, callouts, music, and material-specific sound.
6. Add attract, ball-intro, bonus, multiball, wizard, and game-over presentation.
7. Run automated rules/geometry/input regressions, then full hands-on desktop and portrait evidence with slow-motion collision review and clean-state restoration.
8. Freeze one `CHECKPOINT_READY` for independent audit. Deployment remains a later Owner decision.

## Owner confirmation

- Confirmed by Owner on 2026-08-13.
- Authorized outcome: **rebuild Starforge Reactor into an original, table-first, arcade-quality biomechanical pinball machine, using Alien Escape only as the quality bar, while preserving the existing privacy, input, and production boundaries.**

## Finalized O-2.1 implementation package

### Physics foundation

- Add `planck@1.5.0` as the single new runtime dependency and record its MIT license. Planck is a JavaScript/TypeScript rewrite of Box2D intended for cross-platform HTML5 games and supplies rigid bodies, continuous collision support, contacts, sensors, and motorized revolute joints.
- Preserve the pure scoring/progression core. Replace the home-grown ball integration and impulse-zone flippers with a separate Planck world adapter running at fixed 120 Hz with bounded catch-up.
- Use one table-to-physics scale. Create the ball as a bullet dynamic body; table walls/guides as continuous chain/edge fixtures; slings and rubbers as restitutive fixtures; flippers as dynamic bodies on limited motorized revolute joints; and the plunger as a physical prismatic or constrained body applying measured launch energy.
- Contact callbacks may emit normalized switch/contact events but may not directly mutate UI. Ball identity, contact identity, and fixture user data remain explicit. The rules core consumes normalized production events.
- Provide a localhost-only collision/debug overlay showing fixtures, velocities, contacts, sensor states, frame step, and body count. It must be absent from normal output and must never fabricate acceptance state.

### Table layout and controlled shots

- Recompose the table around a full-width launch lane, top arch, two orbit returns, two inlanes, two outlanes, center drain/outhole, two physical slings, two full-size flippers, three pop bumpers, four-bank physical targets, one spinner/gate, two ramp entrances/returns, and the central Starforge reactor toy.
- Use fixed visual/physics coordinates from the same geometry definition. Visible rails, plastics, inserts, rubbers, posts, switches, and targets must align with contact fixtures.
- Tune motor torque, flipper limits, ball density, damping, friction, restitution, gravity, sling kick, guide angles, outlane widths, and post positions until these production shots are repeatable: cradle on either flipper; controlled release to the opposite inlane; left and right orbit; both ramps; target bank; spinner; reactor; and recoverable center rebound.
- No invisible teleport may substitute for base table physics. Ramp elevation may use an entrance sensor plus a visible, time-bound raised-path state only when entrance direction/speed is legal; the ball remains visibly tracked, exits at the rendered return, and cannot be captured from the side or below.

### Original art and composition

- Remove dashboard-style side panels from the primary play surface. The table fills the viewport; score, balls, current objective, multiplier, locks, combo, save, tilt, and wizard state live in a compact backbox/HUD and illuminated table inserts. Controls/settings sit on a cabinet edge or collapsible overlay.
- Use the image-generation skill for an original Starforge playfield art plate and an original social-preview card. The playfield asset must be generated for this table's frozen composition, contain no readable labels, and use an original graphite/steel, molten-amber, cyan-electric, and deep-space palette. Avoid alien eyes, tentacles, organic face layouts, purple/green reference coloring, city invasion imagery, copied logo forms, and any reference screenshot input.
- Overlay all gameplay-critical rails, targets, lamps, labels, symbols, and collision-aligned mechanisms as crisp code-rendered layers so image artifacts cannot misstate gameplay.
- Add procedural metal/rubber/plastic treatment, ball shadow/highlight, local lamp pools, insert bloom, ramp occlusion, target travel, spinner animation, slingshot deformation, reactor animation, and cabinet vignette. Maintain contrast and non-color-only state cues.
- Add a compact attract/start presentation and backglass identity using original typography. The playfield must remain immediately visible; do not hide the game behind a marketing landing page.

### Feedback and arcade presentation

- Replace the single drone/beep palette with original synthesized or generated, licensed project-local audio layers: rolling/rail noise, rubber/slings, metal/post, target, spinner, ramp, jackpot, ball save, tilt, multiball, wizard, drain, and UI. Keep SFX and music independently mutable and bounded.
- Add restrained particles, sparks, lamp pulses, score callouts, short table shake, and hit-stop/slow-motion accents only at high-value moments. Ordinary contacts remain legible and multiball cannot saturate the screen or audio graph.
- Implement fast attract/start, ball serve, skill-shot prompt, drain/bonus count, multiball start, jackpot, wizard start/success/failure, game over, and immediate restart sequences. Presentation may not freeze physics except at explicit, short, tested transition boundaries.

### Preserved boundaries

- Preserve all O-1 scoring/progression semantics unless a physical switch mapping requires an Auditor-documented translation. Preserve responsive keyboard, pointer, touch, and standard-gamepad play; pause/focus safety; local-only preferences/best score; reduced motion; originality; no analytics; and no backend.
- No copied reference code, assets, audio, names, characters, narrative, table geometry, screenshots, or prompts using the reference image.
- No deployment, hosting, production mutation, account, credential, database, paid-provider call, or personal-data transmission.

### Critical path

1. Install and prove the Planck world in isolation with fixed-step determinism, bullet ball, physical plunger, and motorized flippers.
2. Build and debug the complete physical table before art: walls, guides, inlanes/outlanes, drain, slings, bumpers, targets, spinner, ramp sensors/returns, and reactor.
3. Tune cradle, pass, orbit, ramp, bank, spinner, reactor, rebound, and drain behavior on desktop and touch. Do not proceed while base control is mostly random.
4. Reconnect all existing progression to normalized physical events and rerun preserved rule behavior.
5. Freeze the composition; generate and integrate the original playfield art plate, code-rendered mechanisms/materials, table lamps, and compact HUD.
6. Add layered audio, particles, animations, callouts, and arcade transition sequences.
7. Run automated tests, collision/debug probes, five-minute desktop and portrait play sessions, slow-motion collision review, reduced-motion/audio checks, and clean-state restoration.
8. Freeze one `CHECKPOINT_READY` for independent audit. Do not deploy or wait for a reply.

### Terminal evidence

- Clean build, lint, and preserved tests pass. New automated coverage proves revolute-joint flipper limits/motors, plunger energy bounds, fixed-step equivalence, bullet collision at supported maximum speed, fixture/render alignment, contact normalization/debounce, sensor directionality, ramp state/exit, body-count bounds, pause/focus freeze, input cleanup, and audio/particle caps.
- Collision-debug evidence records at least: fast ball vs raised/lowered flipper tip; ball vs rubber sling; ball vs thin post; ball through spinner; legal/illegal ramp entrance; simultaneous multiball contacts; outlane; and center drain. No tunneling, sticky contact, explosive energy gain, impossible capture, or body leak may survive.
- Hands-on desktop and portrait sessions each prove launch, cradle, controlled release/pass, both flippers, an orbit, a ramp, target bank, spinner, reactor, drain/serve, pause/resume, restart, and readable live progression. Record a five-minute playability assessment with ordinary failures, not just deterministic state injection.
- Visual evidence at desktop and 390×844 shows table-first composition, aligned physical/rendered mechanisms, readable inserts/HUD, unobstructed touch controls, attract/start, multiball, wizard, and game-over states with no horizontal overflow.
- Audio evidence exercises every material/event family, independent mutes, focus suspension, bounded concurrent nodes, and no stale replay. Reduced motion preserves every gameplay cue.
- Asset evidence lists generated prompts, output paths, hashes, and originality checks. Third-party dependency evidence records exact version and MIT license.
- Cleanup restores normal URL, fresh ready state, default settings, no debug/evidence overlay, documented personal-best baseline, bounded body/audio/particle counts, and a running local server only. Production remains untouched.

### Understanding gate

- Builder must restate O-2.1 in the Builder-owned section of `plan.md`: confirmed business rules, Planck architecture, composition/art boundary, physical shot layout, preserved behaviors, evidence/falsification criteria, ambiguities, and hard stops.
- Builder sends `UNDERSTANDING_REVIEW_READY` without changing implementation.
- No O-2.1 code, dependency, or asset change is authorized until the Auditor records `UNDERSTANDING_CONFIRMED` for Owner revision O-2 / package O-2.1.

# Current audit disposition — O-1.2-C2

- Owner revision: O-1
- Package: O-1.2
- Checkpoint reviewed: O-1.2-C2
- Auditor pass: frozen correction implementation and evidence audit
- Date: 2026-08-13
- Disposition: `ACCEPTED`
- Package state: `runtime_proven`
- Production state: `production_decision_pending`

The original Starforge Reactor table satisfies the confirmed O-1.2 local-development gate. The seven required corrections are present, preserved behavior remains green, and independent automated and runtime checks match the Builder's frozen evidence. No deployment or production action is authorized by this disposition.

## Independent acceptance evidence

- Independently reran the complete production build: PASS; only the known non-fatal vinext route-classification warning remains.
- Independently reran ESLint: PASS with zero errors or warnings.
- Independently reran the complete test suite: PASS, 18/18, including all seven C1 regression requirements and preserved lifecycle/progression behavior.
- Independently recomputed all seven frozen SHA-256 file hashes; every value exactly matches the O-1.2-C2 evidence recorded in `plan.md`.
- Independently inspected the corrected rules, ramp configuration, input normalization, feedback queue, responsive shell, and test seams. The localhost-only evidence controls are absent from normal/server-rendered output and do not authorize or affect production.
- At 390×844, independently confirmed the full table, compact live HUD, pause/restart, independent mute controls, input guide, and touch deck fit without overlap or horizontal overflow. The visible objective is rule-derived.
- At 1280×900, independently invoked the legal production-transition evidence controls and observed: directional ramp lock `1/2`; three-ball shared-bumper collision with `+2000` and both balls reflected; wizard timeout `FAILED`, mode `live`, progress `0/15`, with no immediate re-entry.
- Independent browser console review found no errors or warnings.
- Static inspection found no copied creative asset, gameplay network primitive, backend, analytics, personal-data handling, deployment integration, secret, or production mutation.

## Accepted ordinary evidence limitations

- Physical standard-gamepad capture was unavailable. The normalized standard mapping, restart edge behavior, disconnect cleanup, visible mapping guidance, and held-state clearing are covered by passing automated evidence.
- A human-speed three-ball playthrough, audible recording, and real focus-loss video were not saved as artifacts. The lifecycle, pause/focus timer freeze, input cleanup, independent mute behavior, storage behavior, and both viewport launch paths are covered by the combined production-rule tests and runtime observations. These limitations do not invalidate the local O-1.2 gate, but a future public release should include hands-on device and audio QA.

## Acceptance boundary and next step

- O-1.2 is accepted as `runtime_proven` for the local development boundary.
- Production remains untouched and requires a separate explicit Owner go/no-go decision.
- The Owner may now request gameplay, theme, art, or tuning changes from the `Next` queue. Any material new scope begins a new Owner revision/package and repeats the understanding gate.
- If the Owner later authorizes publishing, prepare a distinct deployment package with hosting access, rollback, real-device smoke tests, and production evidence; this acceptance does not silently authorize it.

# Prior audit disposition — O-1.2-C1

- Owner revision: O-1
- Package: O-1.2
- Checkpoint reviewed: O-1.2-C1
- Auditor pass: frozen implementation and evidence audit
- Date: 2026-08-13
- Disposition: `FIXES_REQUIRED`
- Implementation state: `CORRECTION_PASS_AUTHORIZED`
- Deployment state: `NOT_AUTHORIZED`

The first playable is coherent and the independent build, lint, and existing 12-test suite pass, but O-1.2-C1 does not yet meet the confirmed mobile-status, progression-state, collision-isolation, feedback, and ramp-path rules. The Builder must complete the bounded correction package below and return one new `CHECKPOINT_READY`; production and deployment remain untouched.

## Evidence reviewed for O-1.2-C1

- Read the frozen Builder checkpoint, changed-file inventory, SHA-256 surface, recorded ordinary failures, and runtime observations in `plan.md`.
- Independently ran the production build equivalent: PASS, with the same non-fatal vinext route-classification warning.
- Independently ran ESLint: PASS with zero errors or warnings.
- Independently ran `tests/game.test.mjs` and `tests/rendered-html.test.mjs`: PASS, 12/12.
- Independently inspected the rules core, scheduler, input normalization, persistence adapter, canvas/UI shell, responsive CSS, and tests.
- Independently inspected the local application at 390×844. The canvas and touch deck fit without horizontal overflow, but `.mission-panel` and `.controls-panel` are hidden and the visible scoreboard contains only score, a static ramp objective, and best score.
- Independently exercised a legal wizard timeout: mode returned to `live`, then the next ordinary fixture hit immediately re-entered wizard mode with a fresh 28-second timer.
- Independently exercised two multiball contacts with one bumper: the first ball established the shared fixture occupancy and the second touching ball skipped collision response, demonstrating that occupancy is not isolated per ball.
- Static inspection confirmed the event list is capped at 24 while the audio consumer detects new events only by increasing list length; sound feedback therefore stops after the cap and can remain suppressed after restart resets the event list.
- Static and rule inspection confirmed each orbit-lane entry during the first five seconds can award another skill shot, standard gamepad mappings expose no restart action, and each visual “ramp” is a circular fixture whose contact from any direction counts as a completed ramp shot.
- No copied asset, secret, external request, destructive action, deployment, production mutation, or other hard-stop condition was found.

## Required corrections

1. **Preserve essential status and controls on portrait/mobile.** Replace the blanket mobile hiding of `.mission-panel,.controls-panel` with a compact presentation that keeps ball count, save, multiplier, locks/multiball, combo timer, tilt, wizard progress/time, current rule-driven objective, pause, restart, independent mute settings, and input guidance available without obscuring the table or introducing horizontal scroll. The mobile objective must reflect `game.message` or an equivalent rule-derived objective; it cannot remain the static `LIGHT BOTH RAMPS` label after launch.
2. **Make wizard timeout terminal for that qualification.** On timeout, record an explicit exhausted/failed wizard state or clear/advance qualification so an unrelated next hit cannot immediately restart wizard mode. Re-entry must require the intended new qualification boundary. Preserve successful reactor completion as a separate terminal outcome.
3. **Isolate fixture contacts per ball.** Replace the game-wide fixture-ID occupancy set with ball-scoped contact identity (for example `ballId:fixtureId`) or an equivalent contact map. Every ball must always receive physical collision response; scoring debounce applies only to the same ball remaining in the same fixture. Clean contacts when balls drain or a game restarts.
4. **Consume feedback events by identity, not capped-array length.** Give events a monotonic sequence/cursor or drain a dedicated queue so every accepted event can trigger SFX after more than 24 events and after restart. Muting/unmuting must not replay stale events.
5. **Award at most one skill shot per launched ball.** Track per-ball opportunity/award state, close the opportunity on first success or expiry as designed, reset it only for the next legal launch, and prevent repeated early lane entries or multiball contacts from farming the award.
6. **Implement a real ramp path and directional completion rule.** Replace the circular ramp bumpers with at least one visibly readable path/gate whose entrance, travel, and completion are distinct enough for aimed play. Award ramp/lock progress only on legal directional completion, not arbitrary circle contact. Preserve centralized geometry/tuning.
7. **Complete the standard-gamepad action set.** Add and display a reasonable restart mapping, edge-trigger it like pause/plunge, and cover disconnect/held-action cleanup. Do not weaken keyboard, pointer, or touch mappings.

## Exact evidence required for the correction checkpoint

- Rerun the clean production build, lint, and complete automated suite.
- Add regression tests proving: mobile-required status is present in the rendered product; wizard timeout does not re-enter on the next hit and can requalify only through the intended boundary; two balls contacting one fixture both collide while each scores only once per contact; SFX consumption continues past 24 events and across restart without stale replay; one skill-shot award per ball with reset on the next launch; directional ramp completion rejects side/reverse contact; and gamepad restart is edge-triggered and cleared on disconnect.
- Rerun preserved lifecycle, scoring, multiball, jackpot, wizard-completion, pause, persistence, geometry, input-cleanup, and render-schedule tests together with the regressions.
- Runtime proof at 390×844 and one desktop viewport must show the complete table plus readable live status; launch, pause/resume, restart, SFX mute, and music mute; a directional ramp completion; multiball collision with one shared fixture; wizard timeout without immediate re-entry; and no horizontal overflow or touch/drain overlap.
- Record physical gamepad capture if hardware becomes available. If it remains unavailable, retain the declared ordinary evidence gap and provide the complete normalized mapping regression evidence.
- Record exact commands/results, frozen changed-file hashes, failures, final storage/test baseline, and confirmation that no deployment or production command ran.

## Builder correction handoff

Complete only the seven corrections above inside O-1.2. Preserve the accepted architecture, originality boundary, existing green behavior, and all hard stops. Update only Builder-owned sections of `plan.md` and implementation files, freeze the new evidence, and send exactly one `CHECKPOINT_READY` for the next independent audit.

# Audit header

- Owner revision: O-1
- Package: O-1.2
- Auditor pass: bounded understanding review
- Date: 2026-08-13
- Package disposition: `IMPLEMENTATION_RELEASED`
- Understanding disposition: `UNDERSTANDING_CONFIRMED`
- Implementation disposition: `RELEASED_FOR_BUILDER`

`UNDERSTANDING_CONFIRMED` applies only to Owner revision O-1 / package O-1.2 and releases the Builder to implement the frozen package below. It does not authorize deployment, production activity, or any scope outside O-1.2.

# Understanding review evidence

- The Builder recorded `UNDERSTANDING_REVIEW_READY` for the exact Owner revision and package.
- All thirteen falsifiable business rules are preserved without narrowing the confirmed gameplay, input, persistence, responsiveness, originality, or production boundaries.
- The proposed architecture preserves the required separations among pure rules, fixed-step simulation, geometry/tuning, input adapters, feedback, rendering, audio, persistence, and scheduling.
- The Builder explicitly accepted deterministic legal test seams that exercise production transitions rather than bypassing them.
- All explicit exclusions and all six resolved interpretations are present and aligned with `GOAL.md` and this package.
- The critical path retains base lifecycle before progression and names exactly one implementation handoff: `CHECKPOINT_READY` for O-1 / O-1.2.
- The automated, runtime, falsification, cleanup, and frozen-diff evidence duties are materially complete.
- Every hard stop is preserved, with ordinary failures correctly distinguished from blocking conditions.
- The Builder disclosed the shell-runtime and Git-tooling caveats and proposed only safe, non-scope-changing responses.
- Read-only inspection confirmed the disposable starter preview and placeholder-specific test remain in place; no gameplay implementation preceded this gate.
- No contradiction, missing Owner decision, or access precondition blocks implementation.

# Owner intent translated into falsifiable rules

1. A new visitor can launch a ball and operate both flippers within ten seconds using visible, concise controls.
2. The first playable is one original cosmic table. No code, assets, name, story, music, copy, or substantially identical geometry from Alien Escape Pinball or another table may enter the repository.
3. The minimum game lifecycle is ready state -> plunge -> live ball -> drain/bonus -> next ball, repeated for three balls -> game over -> instant restart without a page reload.
4. A live ball supports two independently controlled flippers, a timing-sensitive plunger, bounded nudge/tilt, bumpers, slingshots, lanes, target banks, at least one ramp path, and an unambiguous drain.
5. Each meaningful switch or collision produces coherent score, light/motion, and sound feedback. Score changes are attributable to named rules rather than opaque randomness.
6. Progression includes one skill shot, target-bank completion, visible bonus multiplier, timed alternating-shot combo, multiball, repeatable jackpot objective, ball save, earnable extra ball, and a distinct wizard-mode climax.
7. The current objective, score, ball count, ball-save state, multiplier, combo timer, multiball/locked-ball progress, tilt warning, and wizard progress are readable during play.
8. Keyboard, pointer, touch, and common standard-mapping gamepads can each complete launch and dual-flipper operation. Nudge, pause, and restart must be available wherever the input class can reasonably expose them; input mappings must be shown.
9. Desktop and portrait-mobile layouts keep the entire playable table, controls, and essential status legible without horizontal page scrolling. Touch targets must not overlap the drain or obscure the ball.
10. Losing focus suspends simulation and audio safely. Resume must not advance timers, duplicate balls, or inject a large physics step.
11. Sound effects and music have independent mute settings. Preferences and personal best are the only persisted values, stored locally; corrupt or unavailable storage falls back safely.
12. Geometry, scoring values, objective thresholds, colors, and tuning constants are centralized enough to support Owner tweaks without rewriting the simulation.
13. No backend, accounts, analytics, personal-data transmission, paid service, deployment, or production mutation is part of O-1.2.

# Architecture and implementation instructions

The Builder may adjust filenames after restating the same separations, but the implementation must preserve these boundaries:

- Keep the React page as the presentation shell and mount one client-side game surface. Use a responsive canvas for the table and DOM controls/status where that improves legibility and accessibility.
- Separate pure game rules/state transitions from rendering, browser input, audio, persistence, and the animation scheduler. Tests must be able to advance rules with explicit time and inputs without mounting a browser.
- Use a fixed simulation timestep with an accumulator and a capped number of catch-up steps. Clamp or discard excessive elapsed time after focus loss; rendering may interpolate but rules must not depend on render cadence.
- Use one coordinate system for table geometry and scale it to the viewport. Centralize table fixtures and tuning values in typed configuration rather than scattering canvas literals.
- Use deterministic seeded randomness, or no randomness, for rule-affecting behavior. Expose a development/test seam for a known seed and for legal state setup; the seam must not appear as a player-facing cheat in the production UI.
- Model lifecycle and progression as explicit state machines or discriminated states. Starting, draining, ball save, bonus tally, extra-ball award, multiball, tilt, wizard mode, pause, and game over must have exclusive, testable transitions.
- Resolve collision in bounded substeps or swept tests sufficient to prevent ordinary-speed tunneling through flippers, walls, targets, and the drain. Prevent repeated scoring while a ball remains inside one fixture unless that fixture's rule explicitly permits it.
- Normalize keyboard, pointer/touch, and standard gamepad signals into common game actions. Clear held actions on blur, visibility loss, disconnect, pointer cancellation, and component unmount.
- Generate feedback events from accepted rule transitions, then let rendering/audio consume them. Muting audio must not suppress scoring or visual feedback.
- Wrap local storage reads/writes in failure-safe adapters and version persisted data. Never persist active game state for O-1.2.
- Replace the disposable starter preview and its placeholder-specific test. Do not add a database or repurpose the unused scaffold database layer.
- Prefer original procedural visuals and synthesized audio whose provenance is self-evident. If any third-party asset or package is added, record its source and compatible license in Builder evidence.

# Contradictions and resolved interpretations

- “Copy it” is constrained by the confirmed Owner rule requiring original protected expression. O-1.2 reproduces gameplay depth and responsiveness, not the reference's identity or exact arrangement.
- “Deterministic-enough physics” does not require bit-identical floating-point output across browsers. It requires fixed-step rules, seeded/no rule randomness, stable state-transition tests, and no gameplay dependence on render frame rate.
- “Mouse support” means pointer-based plunge and left/right flipper controls; it does not require translating mouse movement into an analog cabinet simulation.
- “Common gamepad” means the browser Gamepad API standard mapping where available. Unsupported devices or browsers must degrade to visible keyboard/touch controls rather than block play.
- Portrait mobile support may scale or reflow presentation, but may not rotate or redesign the table into a materially different scoring layout.
- Music may be an original minimal loop or ambient layer; independent music mute remains required even if the first implementation is intentionally sparse.

# Access preconditions

- Local project files and configured Sites scaffold: available.
- Installed dependency tree: present.
- Local development server: verified HTTP 200 at `http://localhost:3000/` during this pass.
- Browser runtime access: available for later desktop and responsive proof.
- Hosting configuration: present, but deployment and production access are not needed or authorized.
- External APIs, databases, credentials, paid providers, accounts, and real user data: not required.
- Synthetic scores, deterministic seeds, and legal game-state fixtures are sufficient test data.
- Shell runtime caveat: `node` was not on this Auditor shell's PATH during this pass, so the Auditor did not independently execute build/test commands. The Builder must use the configured workspace runtime and include exact command output; inability to do so is an ordinary failure to record and investigate, not permission to weaken evidence.
- Local Git inspection was impeded by missing Apple command-line developer tools. Git history is not terminal evidence for this package, but the Builder must identify the frozen changed-file set by another non-destructive means if Git remains unavailable.

# Critical path to one handoff

The single named handoff is `CHECKPOINT_READY` for O-1 / O-1.2.

1. Replace the starter with the responsive game shell, fixed-step scheduler, coordinate transform, normalized action layer, and pure rule/state core.
2. Prove the base lifecycle first: ready, plunge, both flippers, collision, drain, ball reset, bonus, three balls, game over, restart.
3. Add fixtures and attributable scoring: bumpers, slingshots, lanes, target bank, ramp, central objective, audiovisual event stream.
4. Add progression in dependency order: skill shot, target completion, multiplier, combo, ball save, extra ball, lock/multiball, jackpot, wizard qualification and completion.
5. Add nudge/tilt, pause/focus safety, independent audio settings, local best, and storage failure handling.
6. Prove keyboard, pointer, touch, and standard gamepad mappings; then prove desktop and portrait-mobile playability and reduced-motion behavior.
7. Run the evidence matrix, restore storage/test settings, list the frozen diff and asset provenance, and send exactly one `CHECKPOINT_READY` handoff.

An ordinary failure in one branch must be recorded while every independent safe branch continues. Do not skip from base lifecycle directly to polish; later progression evidence is invalid if ball ownership, drain, or timer behavior is unstable.

# Terminal evidence matrix

The Builder must record exact commands, results, and artifact paths in `plan.md`. Screenshots alone do not prove state transitions; unit tests alone do not prove playability.

## Static and automated evidence

- Clean production build and lint/type checks pass using repository scripts or explicitly recorded equivalents.
- Automated rule tests cover: fixed-step equivalence under at least two render-frame schedules; score attribution; fixture debounce; three-ball lifecycle; drain bonus; ball save; extra-ball award/consumption; multiplier; combo start/expiry; lock and multiball ball count; jackpot eligibility; wizard qualification/start/end; tilt lockout; pause timer freeze; game-over restart; local-best update; corrupt/unavailable storage fallback.
- Geometry tests or deterministic simulations show the ball does not tunnel through representative flipper, wall, target, ramp entrance, or drain interactions at supported maximum speeds.
- Input cleanup tests cover blur/visibility change, pointer cancellation, gamepad disconnect, and unmount.
- No network request is made by gameplay after initial application assets load; no active game state or personal data is persisted.

## Runtime evidence

- A normal fresh run visibly proves onboarding, plunge, independent flippers, at least one aimed lane/target/ramp shot, collision feedback, drain, bonus, next ball, game over, and restart without reload.
- Deterministic legal setups prove skill shot success/failure, target-bank completion, multiplier increase, combo and timeout, ball save and expiry, earned extra ball, multiball start with multiple simultaneously live balls, jackpot success/ineligible shot, wizard qualification, distinct wizard play, and clean wizard completion or timeout.
- Nudge evidence shows movement benefit, warning accumulation, tilt lockout, and recovery only on the next permitted ball. Repeated input cannot bypass the limit.
- Focus loss evidence shows frozen ball/timers/audio and a stable resume without teleport, drain, duplicate score, or stuck input.
- Keyboard, pointer, touch, and standard gamepad each visibly prove launch and both flippers. Gamepad unavailability may be reported only with browser/device evidence; it does not waive the implementation or automated mapping test.
- Independent sound-effect and music mute controls are exercised and persist across reload. Reduced-motion preference preserves gameplay information.
- Personal best survives reload; active game does not. Storage denial/corruption does not crash or block a new run.
- Desktop and portrait-mobile captures include the whole table, essential status, touch controls, and no horizontal page scrolling. At least one complete base lifecycle is played in each viewport class.
- Accessibility proof includes visible focus, operable buttons, non-color-only critical states, and accessible labels for settings and restart.

## Terminal cleanup and freeze

- Restore a fresh non-cheat game state, default deterministic setting, and documented local-storage baseline.
- Record all changed files, generated artifacts, third-party additions and licenses, known failures, browser/viewport versions, and whether the local server remains running.
- No deployment command is run. The frozen implementation and evidence end at `CHECKPOINT_READY`.

# Hard stops

Stop immediately and report `BLOCKED` or `P1_DECISION_NEEDED` as appropriate if any of these occurs:

- Any copied or dubiously sourced protected code, asset, brand, story, music, copy, or substantially identical reference-table geometry is found.
- The package would require credentials, paid-provider activity, user data, production access, deployment, or a destructive/irreversible operation.
- A requested design choice conflicts with the confirmed Owner rules or materially changes scope, persistence, data handling, or production boundary.
- Simulation can create an unbounded loop, runaway ball count, unbounded catch-up work, uncontrolled audio, or uncontrolled storage growth.
- Evidence tooling, state injection, or assertions can falsely report a progression path without exercising the same production rule transition.
- A secret is exposed. Do not copy its value into either operating record; stop and report only the class and containment action needed.

The following are not hard stops by themselves: an individual test failure, browser automation flakiness, missing gamepad hardware, lack of Git tooling, or a visual defect. Record them and continue independent safe evidence branches.

# Builder restatement disposition

The required Builder restatement is accepted as complete for O-1 / O-1.2. Any later material deviation from the accepted rules, architecture boundaries, evidence duties, exclusions, or hard stops invalidates this release and must return to Auditor or Owner review before that deviation is implemented.

# Next role-owned handoff

Builder: implement the frozen O-1 / O-1.2 package along the critical path, record evidence and ordinary failures in `plan.md`, stop for any hard-stop condition, freeze the diff and evidence, and send exactly one `CHECKPOINT_READY` handoff for independent audit.
