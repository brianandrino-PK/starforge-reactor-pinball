# Operating record map

Owner/Builder record: `plan.md`  
Auditor record: `comments.md`  
Handoff: `handoff.md`  
Product goal document: `GOAL.md`

# Owner direction

Revision: O-2  
Source: Owner accepted O-1 as a good start, stated that its visual quality and playability remain far behind Alien Escape Pinball, and confirmed the O-2 rebuild on 2026-08-13.  
Goal boundary: rebuild Starforge Reactor into an original, table-first, arcade-quality biomechanical pinball machine using Alien Escape only as a quality benchmark.  
Stopping condition: the rebuilt local development table is independently reviewed and runtime-proven through hands-on desktop and portrait play plus slow-motion collision evidence; production remains untouched.

## Now

- O-2.1 Rebuild the table composition, physical mechanisms, shot geometry, audiovisual identity, and arcade presentation to the confirmed quality bar.

## Next

- Owner-directed shot, theme, art, sound, and tuning refinements after the O-2.1 rebuild.

## Later

- Additional tables, online leaderboards, accounts, multiplayer, and a table editor.

## Parked

- Monetization and production rollout.

## Inbox

- Use Alien Escape Pinball as the quality and feature-depth reference.
- Preserve the feel and systems that make the reference engaging while using original implementation and creative assets.

## Decisions

- Default operating-record filenames are accepted for initial setup because the Owner supplied no alternate paths.
- The project is initialized as a Codex Sites web project.
- Reference selected: Alien Escape Pinball by Focaccai.
- Original code, branding, theme, artwork, music, copy, and table geometry are mandatory.
- Production remains out of scope until explicit Owner approval.
- O-1.2 is accepted as a local runtime-proven foundation, not the target quality level.
- O-2.1 is a structural table rebuild, not a cosmetic polish pass.
- Confirmed art direction: original Starforge biomechanical reactor; Alien Escape Pinball is a quality benchmark only.
- The playfield must dominate the experience; dashboard-style chrome must not compete with live play.
- O-2 rules and boundaries were confirmed by Owner on 2026-08-13.

## Confirmed business rules

- The first release is immediately playable in a modern browser and requires no login or download.
- The table supports keyboard, mouse, touch, and common gamepad controls.
- The core loop includes plunger launch, two flippers, nudging with tilt limits, bumpers, slingshots, lanes, targets, ramps, scoring, three balls, and instant restart.
- Progression includes a skill shot, target objective, multiplier, timed combos, multiball, a repeatable jackpot objective, ball save, extra ball, and wizard-mode climax.
- The game stores only local preferences and personal-best score.
- Another creator's protected expression is not copied.
- The playfield occupies at least 75% of useful portrait space and remains the visual center on desktop; status and controls become compact cabinet/table elements.
- The original Starforge biomechanical reactor direction uses authored playfield/backglass art, layered materials, illuminated inserts, depth, and table-specific animation without copying the reference's protected expression.
- Physical behavior includes rotating flipper bodies, physical plunger, continuous guides, rubber slings, inlanes, outlanes, rollovers, outhole/drain, physical ramp/gate/spinner/target behavior, and collision geometry that matches the visible machine.
- Shot design supports deliberate trapping, passing, cradling, lane/ramp aiming, recoverable rebounds, and fair drains rather than mostly random bumper motion.
- Contacts layer material-specific sound, light, insert animation, particles/callouts, and restrained reaction while remaining readable in multiball and reduced-motion mode.
- Progression is taught primarily through table lamps, inserts, arrows, targets, lock/jackpot states, and animated objectives.
- The table includes polished attract/start, ball-intro, drain/bonus, multiball, wizard, game-over, and fast restart presentation.
- The acceptance gate requires hands-on desktop and portrait play plus slow-motion collision evidence; automated tests alone cannot accept O-2.1.
- Confirmed by Owner for revision O-2 on 2026-08-13.

# Current package (Builder)

Package: O-1.2  
Owner revision: O-1  
State: `IN_PROGRESS`
Implementation gate: `RELEASED` (`UNDERSTANDING_CONFIRMED` and `IMPLEMENTATION_RELEASED` recorded by the Auditor for O-1 / O-1.2 on 2026-08-13)

## Confirmed business rules

1. A new visitor can launch a ball and operate both flippers within ten seconds using visible, concise controls.
2. The first playable is one original cosmic table. No code, assets, name, story, music, copy, or substantially identical geometry from Alien Escape Pinball or another table enters the repository.
3. The lifecycle is ready -> plunge -> live ball -> drain/bonus -> next ball, repeated for three balls -> game over -> instant restart without a page reload.
4. Live play provides two independently controlled flippers, a timing-sensitive plunger, bounded nudge/tilt, bumpers, slingshots, lanes, target banks, at least one ramp path, and an unambiguous drain.
5. Every meaningful switch or collision produces coherent score, light/motion, and sound feedback. Named rules, rather than opaque randomness, account for score changes.
6. Progression includes a skill shot, target-bank completion, visible bonus multiplier, timed alternating-shot combo, multiball, repeatable jackpot objective, ball save, earnable extra ball, and a distinct wizard-mode climax.
7. The current objective, score, ball count, ball-save state, multiplier, combo timer, multiball/locked-ball progress, tilt warning, and wizard progress remain readable during play.
8. Keyboard, pointer, touch, and common standard-mapping gamepads can each complete launch and dual-flipper operation. Each input class exposes nudge, pause, and restart where reasonable, and mappings are shown.
9. Desktop and portrait-mobile layouts show the entire playable table, controls, and essential status legibly without horizontal page scrolling. Touch targets do not overlap the drain or obscure the ball.
10. Focus loss safely suspends simulation and audio. Resume does not advance timers, duplicate balls, or inject a large physics step.
11. Sound effects and music have independent mute settings. Only preferences and personal best are persisted locally; corrupt or unavailable storage falls back safely.
12. Table geometry, scoring, objective thresholds, colors, and tuning constants are centralized so Owner tweaks do not require rewriting the simulation.
13. O-1.2 excludes a backend, accounts, analytics, personal-data transmission, paid services, deployment, and production mutation.

## Proposed architecture and boundaries

- Keep `app/page.tsx` as the presentation shell and mount one client-side game surface. Use a responsive canvas for the table and accessible DOM controls/status where DOM presentation improves legibility or operability.
- Split the implementation into a pure rules/state core, table geometry and typed tuning configuration, fixed-step simulation/physics, browser input adapters, feedback events, canvas rendering, audio, local persistence, and the animation scheduler. Pure rules accept explicit time and normalized inputs and remain testable without a mounted browser.
- Run simulation through a fixed timestep and accumulator with a bounded catch-up count. Clamp or discard excessive elapsed time after suspension. Rendering may interpolate, but rule results cannot depend on render cadence.
- Define fixtures once in table coordinates and scale that coordinate system to the viewport. Keep geometry, scoring, thresholds, colors, and tuning out of scattered canvas literals.
- Use no rule-affecting randomness or deterministic seeded randomness. Provide a development/test seam for a known seed and legal state setup; it must not become a player-facing production cheat or bypass production transitions.
- Model ready, plunge, live play, drain, ball save, bonus tally, extra-ball award, multiball, tilt, wizard mode, pause, game over, and restart as explicit, exclusive, testable states/transitions.
- Use bounded collision substeps or swept collision tests sufficient to prevent supported-speed tunneling through flippers, walls, targets, and the drain. Fixture occupancy/debounce prevents repeated scoring unless a rule explicitly allows repeats.
- Normalize keyboard, pointer/touch, and standard-mapping gamepad signals into shared game actions. Clear held actions on blur, visibility loss, pointer cancellation, gamepad disconnect, unmount, and other cancellation paths.
- Accepted rule transitions emit feedback events. Rendering and audio consume those events independently, so muting audio cannot suppress scoring or visual feedback.
- Wrap versioned local-storage reads and writes in failure-safe adapters. Persist only preferences and personal best, never active game state.
- Replace the disposable starter preview and its placeholder-only test once implementation is released. Do not add or repurpose the unused database layer.
- Prefer original procedural visuals and synthesized audio. Any third-party package or asset requires source and compatible-license evidence.

## Boundaries and resolved interpretations

- Explicit exclusions: no copied protected expression or substantially identical table geometry; no backend, database use, accounts, cloud save, global leaderboard, multiplayer, analytics/tracking, personal-data collection/transmission, ads, purchases, paid-provider calls, deployment, or production change. Additional tables, social features, and a table editor are later possibilities, not O-1.2 scope.
- “Copy it” means reproduce the reference's gameplay depth and responsiveness while creating original code, identity, theme, arrangement, audiovisual expression, and assets.
- “Deterministic-enough physics” means fixed-step rules, seeded/no rule randomness, stable transition tests, and no dependency on render cadence; it does not require bit-identical cross-browser floating-point output.
- “Mouse support” means pointer-based plunge and left/right flipper actions, not analog cabinet control derived from mouse movement.
- “Common gamepad” means the browser Gamepad API standard mapping when available. Unsupported devices/browsers degrade to visible keyboard and touch controls rather than blocking play.
- Portrait mobile may scale or reflow presentation but cannot rotate or redesign the table into a materially different scoring layout.
- Music may be a sparse original loop or ambient layer, but it still has an independent music-mute control.

## Critical path and handoff

The only implementation handoff is `CHECKPOINT_READY` for O-1 / O-1.2.

1. This Builder restatement is frozen without implementation changes and sent as `UNDERSTANDING_REVIEW_READY`.
2. The Auditor compares it to O-1 / O-1.2. Code work begins only after `comments.md` records `UNDERSTANDING_CONFIRMED` for that exact revision and package.
3. Replace the starter with the responsive shell, fixed-step scheduler, coordinate transform, normalized actions, and pure rule/state core.
4. Prove base lifecycle before progression: ready, plunge, independent flippers, collision, drain, bonus/reset, three balls, game over, and no-reload restart.
5. Add fixtures and attributable feedback/scoring: bumpers, slingshots, lanes, target bank, ramp, central objective, and audiovisual event stream.
6. Add progression in dependency order: skill shot, target completion, multiplier, combo, ball save, extra ball, lock/multiball, jackpot, wizard qualification, and wizard completion.
7. Add nudge/tilt, pause/focus safety, independent audio settings, personal best, and storage-failure handling.
8. Prove keyboard, pointer, touch, and standard gamepad mappings, then desktop and portrait-mobile playability and reduced-motion behavior.
9. Run the full evidence matrix, restore baseline state/settings, freeze changed files and evidence, and send exactly one `CHECKPOINT_READY` notification. Record ordinary failures while continuing every independent safe branch; do not use later progression evidence to mask an unstable base lifecycle.

## Acceptance, falsification, and terminal evidence

### Static and automated evidence

- Record exact commands/results and artifact paths for a clean production build, lint, type checks, and automated tests.
- Rule tests cover fixed-step equivalence under at least two render-frame schedules; score attribution and fixture debounce; three-ball lifecycle and drain bonus; ball save; extra-ball award/consumption; multiplier; combo start/expiry; lock and multiball ball count; jackpot eligibility; wizard qualification/start/end; tilt lockout; pause timer freeze; game-over restart; local-best update; and corrupt/unavailable-storage fallback.
- Geometry tests or deterministic simulation cover representative supported-maximum-speed collisions with flippers, walls, targets, a ramp entrance, and the drain.
- Input cleanup tests cover blur/visibility loss, pointer cancellation, gamepad disconnect, and unmount.
- Network/persistence inspection proves gameplay makes no requests after initial application assets and stores neither active state nor personal data.

### Runtime evidence

- A fresh normal run visibly proves concise onboarding, plunge, independent flippers, an aimed lane/target/ramp shot, coherent collision feedback, drain, bonus, next ball, game over, and restart without reload.
- Legal deterministic setups visibly exercise skill-shot success/failure, target-bank completion, multiplier increase, combo and timeout, ball save and expiry, earned extra ball, multiball with simultaneous live balls, eligible/ineligible jackpot shots, wizard qualification, distinct wizard play, and clean wizard completion/timeout through the production rule transitions.
- Nudge evidence shows useful movement, warning accumulation, tilt lockout, no repeated-input bypass, and recovery only on the next permitted ball.
- Focus-loss evidence shows frozen ball, timers, and audio plus stable resume without teleport, drain, duplicate score, duplicate ball, or stuck action.
- Keyboard, pointer, touch, and standard gamepad each visibly prove launch and both flippers. If hardware is unavailable, browser/device evidence may explain missing runtime capture but cannot waive the implementation or automated mapping test.
- Sound-effect and music mute are independently exercised and persist across reload; reduced motion preserves gameplay information.
- Personal best survives reload while active play does not; denied or corrupt storage does not crash or block a fresh game.
- Desktop and portrait-mobile captures show the whole table, essential status, unobstructed touch controls, and no horizontal scrolling; each viewport class completes at least one base lifecycle.
- Accessibility proof covers visible focus, operable buttons, accessible setting/restart labels, and critical states communicated by more than color alone.

### Evidence that falsifies success

- Rule outcomes vary with render-frame schedule; supported-speed collision tunnels; fixture occupancy produces unintended duplicate scoring; or an action remains held after cancellation/cleanup.
- Balls, timers, audio, score, or progression advance while paused/focus-suspended, or resume causes a large step, teleport, drain, duplicate ball, or duplicate score.
- A progression result can be reached only through a fake assertion/state bypass that does not exercise the production transition.
- Any protected expression or substantially identical reference geometry is copied or dubiously sourced.
- Storage denial/corruption crashes or blocks play, active game state/personal data is persisted, or gameplay performs an unexpected network request.
- Any required viewport or input class cannot complete launch and dual-flipper base play, or mobile presentation hides essential state, obscures the ball, overlaps the drain, or scrolls horizontally.
- Any lifecycle/progression transition is ambiguous, unbounded, unattributed, or contradicted by the visible state.

### Cleanup and freeze duty

- Restore a fresh non-cheat game, default deterministic setting, and documented local-storage baseline.
- Record the complete changed-file set, generated artifacts, exact command output, browser and viewport versions, third-party additions/licenses, known failures, and whether the local server remains running.
- Freeze implementation and evidence without running a deployment command. End only at `CHECKPOINT_READY` unless a hard stop requires `BLOCKED` or `P1_DECISION_NEEDED`.

## Hard stops

Stop immediately and report `BLOCKED` or `P1_DECISION_NEEDED` if:

- copied or dubiously sourced protected code, asset, brand, story, music, copy, or substantially identical reference geometry is found;
- credentials, paid-provider activity, user data, production access, deployment, or a destructive/irreversible action becomes necessary;
- a requested design conflicts with confirmed Owner rules or materially changes scope, persistence, data handling, or production boundaries;
- simulation permits an unbounded loop, runaway ball count, unbounded catch-up, uncontrolled audio, or uncontrolled storage growth;
- evidence injection or assertions can claim progression without exercising the same production transition; or
- a secret is exposed (record only its class and required containment, never its value).

An isolated test failure, automation flakiness, absent gamepad hardware, unavailable Git tooling, or a visual defect is an ordinary failure, not by itself a hard stop. Record it and continue independent safe evidence branches.

## Ambiguities, access, disagreements, and deviations

- I find no disagreement with the O-1.2 package and propose no deviation.
- Local files, installed dependencies, the Sites scaffold, browser runtime, and a previously verified HTTP 200 development server are available. No credential, external API, database, paid service, account, real user data, deployment, or production access is required or authorized.
- The Auditor reported that `node` was not on its shell PATH. During implementation I will use the configured workspace runtime and record exact command output; inability to execute it remains an ordinary failure to investigate and record.
- Apple command-line developer tools prevented the Auditor's Git inspection. If still unavailable, I will freeze and identify changed files by a non-destructive filesystem comparison/listing instead of treating Git as terminal evidence.
- Synthetic scores, deterministic seeds, and legal state fixtures are the approved test data. Such fixtures must invoke production rules rather than falsify progress through a bypass.
- No remaining ambiguity changes the current gate: implementation is prohibited until the Auditor writes `UNDERSTANDING_CONFIRMED` for O-1 / O-1.2 in `comments.md`.

## Understanding status and next step

- Builder restatement completed for O-1 / O-1.2 without gameplay-code changes.
- Auditor gate satisfied for the exact revision/package: `UNDERSTANDING_CONFIRMED`; implementation is released.
- Current critical-path gate: Builder implementation and complete local evidence run.
- Next role-owned handoff: `CHECKPOINT_READY` for independent Auditor review; no deployment or production action.

## Builder checkpoint O-1.2-C1

Checkpoint state: `BUILDER_CHECKPOINT_READY`  
Owner revision/package: O-1 / O-1.2  
Frozen on: 2026-08-13  
Critical-path gate reached: complete local implementation and bounded evidence run; independent audit is next.

### Implemented scope and architecture

- Replaced the disposable starter with the original `STARFORGE//REACTOR` full-height cosmic pinball cabinet, responsive canvas table, readable status board, mission/controls panels, and unobstructed touch deck.
- Added centralized table geometry, colors, physics bounds, score values, progression thresholds, and timing constants in `app/game/config.js`.
- Added an explicit, deterministic production rules engine in `app/game/core.js`: ready/plunge/live/pause/wizard/game-over states; fixed 120 Hz steps and eight-step catch-up cap; bounded ball speed/count; three-ball lifecycle; ball save; bonus; extra ball; target multiplier; timed alternating-lane combo; ramp locks and three-ball multiball; reactor jackpot; four-part wizard qualification/completion; fixture occupancy debounce; nudge/tilt; restart.
- Added normalized keyboard, pointer/touch, and standard-mapping gamepad controls plus cleanup paths; procedural canvas visuals; synthesized SFX and ambient oscillator; independent mute preferences; failure-safe, versioned local persistence of only mute flags and personal best.
- The implementation contains no copied code, reference branding/story/layout/assets, external media, backend calls, analytics, accounts, personal-data handling, or deployment integration.

### Exact automated evidence

- Production build equivalent (bundled Node runtime because `npm` is absent from PATH): `WRANGLER_LOG_PATH=.wrangler/wrangler.log <bundled-node> node_modules/vinext/dist/cli.js build` — PASS; all five vinext/Vite environments built. Vinext emitted its existing non-fatal route-classification warning for `/`.
- Lint equivalent: `<bundled-node> node_modules/eslint/bin/eslint.js . --ignore-pattern dist --ignore-pattern .next` — PASS with zero errors/warnings.
- Tests: `<bundled-node> --test tests/game.test.mjs tests/rendered-html.test.mjs` — PASS, 12/12 tests, 0 failures, final duration 90.098833 ms.
- Test coverage exercised production transitions for launch, attributed scoring/debounce, three-ball drain/bonus/game-over/restart, ball save, target-bank multiplier, earned/consumed extra-ball count, combo start/score/expiry, locks/multiball/live-ball count, eligible jackpot, wizard qualification/start/completion, nudge/tilt, pause freeze, fixed-step equivalence under 120 Hz and 60 Hz render schedules, bounded catch-up, gamepad mapping/cleanup, corrupt/denied storage, preference-only persistence, representative wall/target/ramp/flipper/drain resolution, and server-rendered accessible shell.
- Static network/persistence inspection: `rg -n 'fetch\\(|XMLHttpRequest|WebSocket|sendBeacon|localStorage|sessionStorage' app/game app/page.tsx app/layout.tsx` found only the two deliberate `window.localStorage` adapter calls; no gameplay network primitive exists. Persistence tests prove the serialized record contains mute flags and best only, never active state or personal data.
- An ordinary test failure was recorded during the combined run: the new drain geometry assertion started 10 table units above the defined drain threshold (`live !== ready`). This was a test-fixture error, not a simulation failure; the legal fixture was moved beyond the centralized drain line and the complete 12-test suite passed on rerun.

### Local browser/runtime evidence

- Browser/runtime: Codex in-app Chromium browser against the already-running local development server at `http://localhost:3000/`; no console errors in the final run.
- Desktop 1280×900: complete canvas bounds x=450.664, y=195.25, width=378.664, height=594; document 1280×900 with scroll width 1280 (zero horizontal overflow). Mission/status/controls and all five touch controls were visible. Local touch plunge changed the live objective to `SKILL SHOT: light an orbit lane`; pause changed the control to `RESUME`; restart restored the ready instruction without reload.
- Portrait mobile 390×844: complete canvas bounds x=11.273, y=175.57, width=367.453, height=572.359; document 390×844 with scroll width 390 (zero horizontal overflow). Touch deck occupied y=792..838, below the canvas bottom y=747.93, so it neither overlaps the drain nor obscures the ball. All five touch controls were visible.
- SFX and music controls independently changed to OFF, remained OFF after a real reload once the write effect settled, and were restored to ON. The final UI state is a fresh ready game with the default input map and mute preferences; active gameplay did not survive reload. Personal best remains the locally generated QA value by design because personal best is the one gameplay value authorized to persist.
- Runtime screenshots were visually inspected in-session at both viewports. They were not written as repository artifacts because Builder writes are restricted to source code and Builder-owned `plan.md` sections.
- Physical standard gamepad hardware was unavailable, so no device capture exists; normalized standard-mapping behavior and disconnect cleanup passed automatically. A complete manual three-ball desktop and portrait playthrough, real focus-loss capture, and audible proof were not completed in this bounded pass; production-rule lifecycle, pause freeze, cleanup, sound independence, and both viewport base launch paths are otherwise covered. These are ordinary evidence gaps for Auditor disposition, not claimed runtime proof.

### Frozen changed-file set and provenance

- Changed/replaced: `app/page.tsx` (`b780e682...d0cc8d8d`), `app/layout.tsx` (`4b0e4b9c...d711d476`), `app/globals.css` (`c4a0d80b...bfa7cc2`), `package.json` (`ece0eefb...e962e76`), `package-lock.json` (`8123eb45...5eeaa69`), `tests/rendered-html.test.mjs` (`5fb18891...55c0b38`), and this Builder-owned portion of `plan.md`.
- Added: `app/game/CosmicPinball.tsx` (`c5008704...a06225`), `app/game/config.js` (`9d3ac9d9...fe9f5f92`), `app/game/core.js` (`63b4f734...59e962e76`), `app/game/input.js` (`191b97e8...25a890e4`), `app/game/persistence.js` (`5ae5d21e...d1850e2d`), `tests/game.test.mjs` (`282d26ff...43e78c1`). Full hashes were captured by `shasum -a 256` in the terminal evidence output.
- Removed: `app/_sites-preview/SkeletonPreview.tsx`, `app/_sites-preview/preview.css`, and the unused `react-loading-skeleton` dependency/lock entry.
- No third-party package or asset was added. Visuals and audio are original procedural browser output; existing project dependencies remain under their existing licenses.
- Git has no tracked baseline in this workspace (all repository files report untracked), so a meaningful Git diff/commit identifier is unavailable. The file list and SHA-256 evidence above are the non-destructive frozen comparison surface required by the package.
- No deployment, hosting, production, database, credential, paid-provider, or destructive command was run. The pre-existing local vinext server remains running at `http://localhost:3000/` (reported PID 58712).

### Recorded failures, gaps, and next step

- Ordinary tooling failure: `npm install` could not start because `npm` is absent from the configured runtime; no installation was required. The lockfile was updated narrowly to match removal of `react-loading-skeleton`, and build/lint/test equivalents were executed directly with the configured Node binary.
- Ordinary evidence gaps are limited to the unavailable physical gamepad capture and the manual end-to-end/focus/audio captures named above. No hard-stop condition occurred.
- Frozen next step: Auditor independently reviews O-1.2-C1 and records either exact corrective evidence/work or acceptance. Builder will not deploy, mutate production, or wait inside this pass.

## Builder correction pass O-1.2-C2

State: `IN_PROGRESS`  
Authority: Auditor `FIXES_REQUIRED` disposition for O-1.2-C1; seven-item correction pass explicitly authorized on 2026-08-13.  
Boundary: only the seven corrections and their regression/runtime evidence; no deployment, production, backend, data, asset, or scope expansion.

### Correction-package restatement

1. Portrait/mobile must retain the full essential live status, a rule-derived objective, pause/restart, independent mute controls, and concise input guidance while preserving the complete unobscured table, touch deck, and zero horizontal overflow.
2. Wizard timeout becomes a terminal failed outcome for the current qualification. It clears the completed qualification and requires a new legal four-part qualification; reactor completion remains a separate successful terminal outcome.
3. Fixture occupancy becomes ball-scoped. Each ball always receives physical response, while only the same ball's continuous contact is score-debounced; drain and restart clean contact state.
4. Feedback events use monotonic identity. The browser consumes unseen identities rather than capped-array length, advances the cursor while muted, and resets the cursor correctly after restart so events beyond 24 continue without stale replay.
5. Skill shot is a once-per-launched-ball opportunity. It closes on first award or expiry and resets only on the next legal launch, including saved-ball relaunch.
6. The circular ramp fixtures become visibly directional gate/path geometry. Only entrance-to-exit upward traversal completes a ramp and advances locks; side and reverse contacts do not.
7. Standard gamepad mapping gains an exposed restart action, edge-triggered like pause/plunge, with disconnect clearing held and previous-edge state. Keyboard, pointer, and touch mappings remain intact.

Architecture remains the accepted pure rules/config + normalized input + browser scheduler/audio + canvas/DOM shell split. Regression evidence must exercise production transitions and falsify immediate wizard re-entry, cross-ball collision suppression, capped-event SFX loss, repeated skill awards, nondirectional ramp awards, hidden mobile state, and held/repeated gamepad restart. No contradiction or ambiguity remains; no hard-stop condition is present.

### Correction checkpoint O-1.2-C2

Checkpoint state: `BUILDER_CHECKPOINT_READY`  
Frozen on: 2026-08-13  
Critical-path gate reached: all seven authorized corrections implemented; complete local correction evidence is ready for independent audit.

#### Corrected behavior

- Portrait/mobile now shows a compact `Mobile live status` region containing ball, save, multiplier, locks/multiball, combo, tilt, wizard outcome/time, SFX, music, pause, restart, and expandable input guidance. The main objective is now `game.message`, so it follows accepted rules rather than a static ramp prompt.
- Wizard timeout records `wizardOutcome: failed`, clears qualification progress, returns to live play, and cannot restart on an unrelated hit. A new legal ball and all four production objectives can qualify a later attempt. Reactor completion records the distinct `complete` outcome.
- Contact keys are `${ballId}:${fixtureId}`. Each ball receives circle response independently; scoring is debounced only for its own continuous contact. Drain removes that ball's contacts; restart creates a clean contact set.
- Every feedback event receives a monotonic ID and enters a dedicated queue. The browser drains the queue each frame even while muted, while the visual history remains capped at 24. Restart clears stale queued events but preserves the monotonic ID boundary.
- Skill-shot opportunity is stored on the launched ball, closes on success or five-second expiry, is false for spawned multiballs, and resets only on the next legal launch.
- Centralized `RAMP_PATHS` define visible entrance arrows, rails, travel bounds, and exits. Upward entrance-to-exit traversal alone awards a ramp/lock; side and reverse approaches fail.
- Standard gamepad `View/Back` maps to restart and is edge-triggered beside Menu pause/A plunge/d-pad nudge/bumpers. Disconnect/focus cleanup returns the full normalized action set and previous-edge state to false. Visible desktop and mobile guidance includes the mapping.
- A localhost-only `?evidence=1` deterministic panel invokes production rules and legal state setup for runtime proof. It is absent from normal/server-rendered product output and is not a production/player cheat.

#### Exact build and automated evidence

- Final production build equivalent: `WRANGLER_LOG_PATH=.wrangler/wrangler.log <bundled-node> node_modules/vinext/dist/cli.js build` — PASS; all five vinext/Vite environments built. The existing non-fatal `/` route-classification warning remains.
- Final lint: `<bundled-node> node_modules/eslint/bin/eslint.js . --ignore-pattern dist --ignore-pattern .next` — PASS, zero errors and zero warnings.
- Final tests: `<bundled-node> --test tests/game.test.mjs tests/rendered-html.test.mjs` — PASS, 18/18, zero failures, duration 87.818459 ms.
- Preserved tests reran lifecycle, score/debounce, ball save, target/multiplier/extra ball, combo, directional ramp locks/multiball/jackpot, wizard completion, nudge/tilt, pause freeze, 120 Hz versus 60 Hz schedule equivalence, bounded catch-up, storage fallback/scope, geometry/drain/flipper response, input cleanup, and server rendering.
- New regressions prove mobile-required status/guidance is in the rendered product; wizard timeout cannot immediately re-enter and requalification requires a new legal boundary; two balls on one bumper both reflect and each score only once; 30 queued feedback events survive a 24-event visual-history cap and restart does not replay stale events; one skill shot per ball with next-launch reset; side/reverse ramp approaches fail while entrance-to-exit succeeds; and gamepad restart produces only release-separated edges and clears on disconnect.
- Static scan again found no gameplay `fetch`, XHR, WebSocket, or beacon; only the two authorized local-preference adapter calls mention storage.

#### Runtime evidence

- Portrait 390×844: complete canvas x=57.773, y=180.813, width=274.453, height=428.875; compact HUD x=6, y=659, width=378, height=126; touch deck y=792..838; scroll width exactly 390. The table, HUD, and touch deck do not overlap and there is zero horizontal overflow. Visible status showed `BALL 3`, `SAVE OFF`, `BONUS 1×`, `LOCKS 0/2`, `COMBO —`, `TILT 0/3`, `WIZARD 0/4`; touch launch changed the objective to the skill-shot message and save to 9.4s. Pause exposed `RESUME`; SFX/music independently changed OFF; restart returned the ready objective.
- Desktop 1280×900: complete canvas x=450.664, y=195.25, width=378.664, height=594; touch deck y=834..884; scroll width exactly 1280. Full mission/status/controls, new visual rail ramps and entrance arrows, settings, and touch controls were visible with no overlap or overflow.
- Local deterministic runtime panel, using legal setups and production transitions, visibly reported: `Directional ramp complete · locks 1/2`; `Multiball shared bumper · 3 balls · +2000 · both reflected YES`; and `Wizard timeout · FAILED · mode live · progress 0/15 · no immediate re-entry`. The normal HUD simultaneously showed `FAILED · 0/4` after the next ordinary bumper hit, proving no re-entry.
- Final normal URL and state: `http://localhost:3000/`, fresh ready game, SFX ON, music ON, no evidence panel, no console errors. The authorized personal best generated during evidence remains local; active game state did not persist. Local server responds HTTP 200 and remains running as PID 58712.
- Physical gamepad hardware remains unavailable, so device capture remains an ordinary evidence gap. The browser-level hardware probe was also unavailable inside the read-only inspection scope; the complete normalized mapping, edge, disconnect, and cleanup regressions pass.

#### Recorded ordinary failures and resolution

- The first isolated 17-test correction run had three failures: ramp completion did not call the wizard-start boundary, and one occupancy assertion ran after contact separation. `maybeStartWizard` was centralized and invoked after ramp completion; the contact assertion moved to the active-contact frame. The complete suite then passed, and the final expanded suite passed 18/18.
- A read-only runtime attempt to count attached gamepads failed because the inspection scope did not expose `navigator`; cleanup and all independent runtime branches continued. No application console error occurred.
- No hard stop, copied material, secret, external request, uncontrolled loop/storage/audio/ball count, deployment, production mutation, database action, paid service, or destructive command occurred.

#### Frozen correction diff

- `app/game/config.js` — `637de291e29b702d89eac2a7583370173ee14a60ddec185ffc2b01748acfd31e`
- `app/game/core.js` — `701513ac85b1373e64335ed8720551d2232f20bec462bd0db03a5c2ad07a1876`
- `app/game/input.js` — `b981fc26386e711590c2f5dbbd7346b6c92c038e29c141c3cd848898fbb1dfd8`
- `app/game/CosmicPinball.tsx` — `c4ade2c2173d9c32b335cd5110bcc5889fd26c29d591cb25ca85fb6c525209f5`
- `app/globals.css` — `112394992341c455e4194ff92cd315cdc7ddbb1cb1640a400b16710fcfeefe97`
- `tests/game.test.mjs` — `c4c649011a5a2d81310863623ede41c9b4c7019bcaeb9c9f240b0659241aba0b`
- `tests/rendered-html.test.mjs` — `13680b9f1ca70e5dafab6ae46cc837800a716b11024ed0537a73171a62e42494`
- `plan.md` Builder-owned correction sections updated. No package, asset, dependency, or license changed. Git still has no tracked baseline, so this exact file/hash surface is the frozen correction diff.

Frozen next step: Auditor independently reviews O-1.2-C2. Builder will not deploy, mutate production, or wait inside this pass.

# Current package (Builder) — O-2.1

Package: O-2.1 table-quality rebuild  
Owner revision: O-2  
State: `BUILDER_CHECKPOINT_READY`  
Implementation gate: `RELEASED` — Auditor recorded `UNDERSTANDING_CONFIRMED` / `IMPLEMENTATION_RELEASED` / `RELEASED_FOR_BUILDER` for O-2 / O-2.1.

## Confirmed O-2.1 business rules

1. O-1.2 is a preserved local, runtime-proven foundation, not the target quality bar. O-2.1 is a structural rebuild of table composition, mechanisms, physics, shot geometry, audiovisual identity, and arcade presentation—not a cosmetic polish pass.
2. The playfield dominates the first viewport: at least 75% of useful portrait space and the visual center on desktop. Score, balls, objective, multiplier, locks, combo, save, tilt, wizard state, settings, and controls become compact backbox, table, cabinet-edge, or collapsible elements rather than competing dashboard panels.
3. The table is an original Starforge biomechanical reactor with authored playfield/backglass art, layered graphite/steel, molten-amber, cyan-electric, and deep-space materials, illuminated inserts, shadows, wear, glow, and depth. Alien Escape is a quality/feature-depth benchmark only; none of its code, art, audio, wording, screenshots, prompts, eye/tentacle/creature/city imagery, logo forms, narrative, exact geometry, purple/green treatment, or protected expression may enter the project.
4. The visible machine and physical machine must agree. Rotating flipper bodies, a constrained physical plunger, continuous walls/guides, rubbers, slings, inlanes, outlanes, rollovers, posts, drain/outhole, targets, spinner/gate, ramps, and central reactor use collision/sensor geometry aligned to their rendered mechanisms.
5. Shot geometry must enable intentional play: either-flipper cradle, controlled release/pass to the opposite inlane, left/right orbit, both ramps, target bank, spinner, reactor, recoverable center rebound, and fair/readable drains. Five-minute skilled desktop and portrait sessions must demonstrate repeatability rather than mostly random bumper motion.
6. Ramp travel requires a legal directional/speed entrance, visible tracked raised-path state with elevation/occlusion, time-bounded travel, and exit at the rendered return. Side/below captures and invisible base-table teleport substitutes are prohibited.
7. Important contacts layer material-specific audio, light/lamp response, insert animation, restrained particles/sparks or callouts, and proportionate table reaction. Effects remain readable and bounded during multiball, independent SFX/music mute remains effective, and reduced motion preserves every gameplay cue.
8. Progression is taught primarily on the table through inserts, arrows, targets, lock/jackpot lamps, and animated objectives. External text can clarify but cannot be required during live-ball play.
9. Attract/start, ball serve/intro, skill-shot prompt, drain/bonus count, multiball intro, jackpot, wizard start/success/failure, game over, and immediate restart receive polished, fast arcade transitions; physics may pause only at explicit, short, tested transition boundaries.
10. Acceptance is hands-on, not test-only: full desktop and 390×844 portrait play, five-minute control assessments, and slow-motion collision/debug evidence must prove stable high-speed contacts, non-sticky flippers, no tunneling, no impossible ramp capture, no UI obstruction, coherent feedback, and clean restoration.
11. Preserve keyboard, pointer/touch, and standard-gamepad play; pause/focus safety; reduced motion; local-only preferences and personal best; originality; no tracking; no backend; and no production activity.
12. O-2.1 adds no accounts, credential use, database use, analytics, personal-data collection/transmission, paid-provider calls, hosting, deployment, or production mutation.

## Planck 1.5.0 architecture and dependency boundary

- Add exactly one runtime dependency: `planck@1.5.0`, MIT licensed. Read-only registry verification on 2026-08-13 returned HTTP 200 with version `1.5.0` and license `MIT`; the authorized implementation pass installed it and froze the pnpm lock entry below.
- Preserve the pure scoring/progression core as the authority for score, objectives, lifecycle, feedback events, persistence boundaries, and progression. Replace only the home-grown ball integration, impulse-zone flippers, and abstract physical routing with a separate Planck world adapter.
- Run Planck at the existing fixed 120 Hz rule cadence with a bounded accumulator/catch-up limit. Use one explicit table-to-meter scale and derive physics fixtures and rendered mechanisms from the same centralized geometry.
- Create bullet dynamic bodies for balls; continuous edge/chain fixtures for walls and guides; material-tuned fixtures for metal, plastic, rubber, posts, and slings; limited motorized revolute-joint dynamic bodies for flippers; and a prismatic or equivalently constrained physical plunger with measured, bounded launch energy.
- Planck contact callbacks normalize explicit ball identity, fixture identity/user data, begin/end contacts, material, and sensor direction into production switch/contact events. They do not mutate UI or scoring directly. The pure rules core consumes those events and preserves ball-scoped debounce and attributable scoring.
- Ramp elevation may use validated entrance sensors and a separately tracked raised-path state because the browser view is 2D, but it must remain visible, directional, time/body bounded, aligned with the rendered ramp, and return through the rendered exit. It may not fabricate a completed shot or hide an impossible capture.
- Provide a localhost-only collision/debug overlay for fixtures, bodies, joints, velocities, contacts, sensors, fixed-step state, and body count. It is absent from normal output, cannot alter or fabricate acceptance state, and is disabled for cleanup/evidence baseline.
- Keep browser input normalization, canvas/DOM presentation boundary, feedback queue, audio consumer, storage adapter, and suspension scheduler separate from Planck. Physics contacts generate normalized domain events; render/audio consume state and feedback independently.
- Body, contact, catch-up, audio-node, particle, and presentation-effect counts are bounded. World teardown/restart, drain, multiball end, focus loss, and component unmount must not leak bodies, joints, contacts, held actions, nodes, or timers.

## Physical shot layout and mechanism map

- **Launch and top:** a full-width physical plunger lane feeds a top arch with rollover/skill-shot lanes and two orbit returns. The plunger body, spring travel, release energy, lane wall, arch, and switch locations share geometry with the rendered mechanism.
- **Midfield:** three physical pop bumpers form the reactive upper cluster; a central Starforge reactor toy is the repeatable charge/jackpot/wizard objective; left/right orbits provide controlled return feeds rather than arbitrary bounce-only scoring.
- **Aimed mechanisms:** a four-bank physical target group shows travel/reset; at least one spinner or one-way gate has aligned physical/sensor behavior and visible animation; two ramp entrances each have a legal approach, visible guide/elevation/occlusion, raised travel, and a rendered return/exit.
- **Lower playfield:** two physical rubber slings, paired inlanes/outlanes, continuous guides/posts, two full-size motorized flippers, and a center drain/outhole make ball control and failure legible. Outlane widths, post positions, guide angles, sling kick, flipper torque/limits, and restitution must support cradle, pass, recovery, and fair drains.
- **Rule mapping:** rollovers/lanes feed skill shot and combo; target bank feeds bank completion/multiplier; ramp sensors/exits feed locks/multiball; spinner/gate and reactor feed attributable shot/central-objective feedback; existing ball save, extra ball, tilt, jackpot, wizard qualification/outcome, three-ball lifecycle, drain bonus, and restart semantics remain production-rule transitions.
- No invisible fixture may contradict the art, and no decorative element may imply a shot or wall that the physics does not implement. Fixture/render alignment is a tested invariant.

## Table-first composition and original-art boundary

- Remove dashboard-style side panels from the primary play surface. The playfield remains visible in attract mode and fills the useful viewport; the compact backbox/HUD and cabinet-edge/collapsible controls never obscure the ball, drain, flippers, or required progression state.
- Use the image-generation skill after the physical composition is frozen to create exactly the authorized original Starforge playfield art plate and original social-preview card. The playfield plate contains no readable labels and receives no reference screenshot as input.
- Freeze and record the generation prompts before use. Prompts must affirm the original palette and reactor/material direction and explicitly exclude the reference's protected imagery and expression. Record output paths, full hashes, and originality inspection.
- Gameplay-critical rails, plastics, rubbers, posts, targets, lamps, labels, arrows, symbols, shot indicators, and mechanisms remain crisp code-rendered layers aligned to shared geometry; generated-image artifacts cannot define or misstate collision or rules.
- Procedural layers provide metal/rubber/plastic differentiation, ball shadow/highlight, lamp pools and bloom, ramp occlusion, target travel, spinner rotation, sling deformation, reactor animation, and cabinet vignette with non-color-only state cues.
- Backglass identity and attract copy use original typography and do not turn the game into a marketing landing page. No third-party asset or additional package is allowed without source, license, and Auditor/Owner boundary review.

## Preserved O-1 behavior and boundaries

- Preserve the accepted three-ball lifecycle, timed plunger, independent flippers, nudge/three-warning tilt, ball save, bonus, instant no-reload restart, locally persisted best/preferences only, independent SFX/music mute, reduced-motion information, and focus-safe pause/resume.
- Preserve skill-shot once per launched ball, target-bank multiplier, alternating timed combo, directional ramp locks, bounded multiball, repeatable reactor jackpot, earnable extra ball, wizard qualification/success/failure, monotonic feedback identity/queue, ball-scoped contact identity, normalized input cleanup, and visible live status.
- Preserve desktop/portrait responsiveness, zero horizontal overflow, unobstructed touch controls, accessible labels/focus, keyboard/pointer/touch/gamepad mappings including edge-triggered restart, and unsupported-gamepad fallback.
- Preserve deterministic-enough fixed-step rules, bounded catch-up, explicit legal test seams, corrupt/denied-storage fallback, no gameplay network calls, and no active-state persistence.
- A physical switch mapping may translate an existing rule only when the Auditor documents that translation; O-2.1 does not silently change scores, thresholds, progression meaning, privacy, persistence, or input scope.

## Critical path and single implementation handoff

The single implementation handoff after release is `CHECKPOINT_READY` for O-2 / O-2.1.

1. This understanding-only pass changes no implementation/dependency/asset and ends at `UNDERSTANDING_REVIEW_READY`.
2. After the Auditor records exact alignment and `UNDERSTANDING_CONFIRMED`, install/record `planck@1.5.0` and its MIT license; prove the isolated fixed-step world, bullet ball, bounded physical plunger, and limited motorized flippers.
3. Build and debug the complete physical table before art: shared geometry, boundaries/guides, launch lane/arch, rollovers, inlanes/outlanes/drain, slings/rubbers/posts, bumpers, target bank, spinner/gate, two ramp sensor/return paths, reactor, and non-fabricating collision overlay.
4. Tune base control on desktop and touch until cradle, controlled release/pass, both orbits/ramps, bank, spinner, reactor, center rebound, and fair drain are repeatable. Do not advance while base play remains mostly random.
5. Map normalized physical events back to all preserved lifecycle/scoring/progression rules and rerun the full preserved suite.
6. Freeze composition; generate, inspect, hash, and integrate only the original art plate and social card, then add code-rendered materials, mechanisms, lamps, inserts, and compact table-first HUD.
7. Add bounded material-specific audio, particles, sparks, callouts, table reaction, and the authorized arcade transition sequences without masking or destabilizing physics.
8. Run the complete automated, collision/debug, hands-on desktop/portrait, slow-motion, audio, reduced-motion, focus/input, cleanup, provenance, and frozen-diff matrix. Restore normal URL/state and send exactly one `CHECKPOINT_READY`; do not deploy or wait.

## Terminal and falsifying evidence

### Automated/static terminal evidence

- Clean production build, lint/type checks, every preserved O-1 test, and new O-2 physics/geometry/input/effects tests pass together.
- Tests cover revolute-joint limits/motors and non-sticky release; plunger energy bounds; 120 Hz equivalence under multiple render schedules; bullet collision at supported maximum speed; fixture/render coordinate alignment; explicit ball/contact normalization and debounce; spinner/gate and ramp directionality/state/exit; bounded body/contact/audio/particle counts; pause/focus freeze; cleanup/unmount; and no unexpected network or persistence expansion.
- Dependency evidence freezes `planck@1.5.0`, lockfile entry, MIT license/source, and no other runtime addition. Asset evidence freezes approved prompts, output paths, hashes, originality checks, and absence of reference-image inputs.

### Runtime/visual terminal evidence

- Slow-motion collision/debug recordings cover fast ball against raised and lowered flipper tips, rubber sling, thin post, spinner, legal and illegal ramp entrance, simultaneous multiball contact, outlane, and center drain. Each recording correlates visible mechanism, physics fixture/contact, velocity, sensor state, fixed step, and bounded body count.
- Five-minute normal desktop and portrait sessions each show hands-on launch, either-flipper cradle, controlled release/pass, both flippers, orbit, ramp, target bank, spinner, reactor, drain/bonus/serve, pause/resume, restart, and readable progression without relying on deterministic injection.
- Desktop and 390×844 captures prove playfield-first composition, at least 75% useful portrait allocation, aligned mechanisms, readable inserts/HUD, unobstructed touch controls, attract/start, multiball, wizard, and game-over with no horizontal overflow.
- Audio evidence exercises rolling/rail, rubber/sling, metal/post, target, spinner, ramp, jackpot, save, tilt, multiball, wizard, drain, and UI families; proves independent mutes, focus suspension, bounded concurrency, no stale replay, and equivalent reduced-motion information.
- Cleanup proves normal URL, fresh ready state, default settings, no debug/evidence overlay, documented local-best baseline, bounded bodies/nodes/particles, no leaked timers/actions, HTTP-healthy local server only, frozen implementation/art hashes, and no deployment/production command.

### Evidence that falsifies success

- The playfield uses less than 75% of useful portrait space, dashboard chrome competes with play, required status/control obscures the ball/table, or desktop/portrait play scrolls horizontally.
- Visible rails/mechanisms do not match fixtures; the ball tunnels, sticks to flippers, gains explosive/unbounded energy, leaks bodies, clips through thin geometry, enters a ramp sideways/from below, disappears without visible travel, exits at the wrong return, or is captured impossibly.
- Flippers remain impulse zones, plunger is not physical/bounded, shots are mostly random, a skilled player cannot cradle/pass/aim/recover, or drains are structurally unfair.
- A physical contact mutates UI/rules directly rather than producing normalized events, multi-ball contacts share debounce incorrectly, rule outcomes depend on render cadence, or a debug/evidence seam fabricates progression.
- Progress requires reading dashboard text because inserts/lamps/arrows/targets fail to communicate; ordinary feedback is missing or high-value/multiball feedback saturates visuals or audio; reduced motion removes essential information.
- Any O-1 lifecycle, progression, input, pause/focus, mute, persistence, privacy, accessibility, or restart behavior regresses.
- Any copied/dubiously sourced reference expression, reference screenshot/prompt input, unlicensed asset/package, extra dependency, unexpected request/data persistence, deployment, or production mutation occurs.
- Automated green results without the required five-minute desktop/portrait and slow-motion collision evidence cannot satisfy the gate.

## Ambiguities, access, contradictions, and hard stops

- I find no contradiction between Owner revision O-2, the finalized O-2.1 package, and the current implementation. The current abstract geometry/physics/UI/audio are acknowledged replacement targets, while the accepted pure rule concepts, input/persistence/privacy boundaries, and existing regressions are preserved.
- Routine implementation discretion remains for exact original geometry coordinates, motor/fixture/material tuning, procedural rendering details, synthesized sound design, and transition timing within the falsifiable rules. Any change to scoring/progression meaning, physical-switch translation, asset/dependency boundary, data handling, production boundary, or required quality evidence returns to Auditor/Owner review.
- Access verified read-only: authoritative files and current source are readable; local server returns HTTP 200; bundled Node/runtime and fallback Git 2.53.0 are available; npm registry returns Planck 1.5.0/MIT at HTTP 200; the image-generation skill and in-app browser runtime are available for the later authorized implementation/evidence pass. `planck` is intentionally not installed before the gate.
- Expected limitations: physical gamepad hardware was unavailable in O-1 evidence and may remain an ordinary runtime gap, but implementation/mapping tests remain mandatory. Git has no tracked baseline, so full file hashes remain the fallback freeze surface unless repository state changes. Neither limitation weakens required desktop/portrait hands-on or slow-motion physics evidence.
- Hard stop and report `BLOCKED` or `P1_DECISION_NEEDED` for copied/dubiously sourced protected expression; a required credential, paid-provider, user data, account, database, deployment, production access, destructive/irreversible action, or extra dependency; a material scope/persistence/privacy/production change; uncontrolled world/body/contact/catch-up/audio/particle/storage growth; false/injected safety evidence; fixture/art mismatch that cannot be reconciled inside the frozen composition; or any exposed secret.
- Ordinary test/visual/tuning failures, browser automation flakiness, absent gamepad hardware, or unavailable Git history are recorded and all independent safe evidence branches continue. The pass may not skip the base-physics/control gate to art/polish, nor use deterministic setups as substitutes for required normal hands-on play.

## O-2.1 Builder implementation and evidence checkpoint

State: `BUILDER_CHECKPOINT_READY`  
Owner revision/package: O-2 / O-2.1  
Frozen: 2026-08-13  
Next role-owned handoff: exactly one `CHECKPOINT_READY` for independent Auditor review. Deployment, hosting, and production remain unauthorized.

### Released implementation

- Installed exactly `planck@1.5.0` as the sole new runtime dependency. Package metadata reports MIT license; the frozen pnpm lock entry records the registry integrity and its optional peer `stage-js@1.0.2`. No other runtime dependency was added and the stale `react-loading-skeleton` dependency remains absent.
- Added `app/game/physics.js`: explicit 1:100 table-to-meter Planck world, bullet balls, continuous edge walls/arch/guides/ramp rails/slings, sensor rollovers/ramp entrances/exits/drain, dynamic spinner/gate, prismatic target reset bodies, motorized limited revolute flippers, and bounded physical plunger. Contact callbacks normalize ball/fixture/material/speed/direction events; pure `core.js` remains the scoring/progression authority.
- Added `app/game/effects.js` with material event profiles, capped eight-voice audio, capped 84-particle bursts, and bounded particle decay. `CosmicPinball.tsx` consumes normalized physics/rule feedback and renders table inserts, ramps/arrows, reactor, flippers, balls, plunger, particles, multiball/wizard callouts, and a localhost-only Planck contact lab. The normal URL contains no evidence overlay.
- Added two generated original assets: `public/starforge-playfield.png` (decorative underlay; no labels) and `public/starforge-social.png` (1200×630 social card). Critical rails, lamps, targets, ramps, flippers, reactor, and labels remain code-rendered from shared geometry. `app/layout.tsx` derives absolute social metadata URLs from incoming host/protocol.
- Preserved rule transitions, local-only preferences/best, independent mutes, focus cleanup, keyboard/pointer/touch/standard-gamepad mappings, and server-rendered accessible shell. The physical adapter is isolated from pure rules; evidence actions use legal setup plus production physics/rules and are not exposed outside localhost query mode.

### Exact automated/static evidence

- Build: `WRANGLER_LOG_PATH=.wrangler/wrangler.log /Users/brianandrino/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vinext/dist/cli.js build` — PASS; all five vinext/Vite environments built. Existing non-fatal vinext `/` route-classification warning only.
- Lint: `/Users/brianandrino/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/eslint/bin/eslint.js . --ignore-pattern dist --ignore-pattern .next` — PASS, zero errors/warnings.
- Tests: `/Users/brianandrino/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test tests/*.test.mjs` — PASS, 25/25, zero failures. This includes the prior 18 production-rule/render tests plus seven Planck/effects tests for fixed 120 Hz, bullet bodies, plunger energy/apex, flipper limits/release, thin-rail high-speed collision, physical spinner/gate contact, directional/timeout ramp behavior, bounded bodies/particles/audio profiles, and contacts.
- Dependency/freeze checks: `pnpm install --lockfile-only` — PASS (`Already up to date`); `pnpm list --depth=0` reports `planck@1.5.0` and only the pre-existing dependency set; package metadata confirms `planck` version `1.5.0`, license `MIT`, peer boundary `stage-js`.
- Static network/storage scan: `rg -n 'fetch\\(|XMLHttpRequest|WebSocket|sendBeacon|localStorage|sessionStorage' app/game app/page.tsx app/layout.tsx` — only the two deliberate local-preference adapter calls; no gameplay network primitive or active-state persistence.
- Local server: `curl -sS -o /dev/null -w 'HTTP %{http_code}\\n' http://localhost:3000/` — `HTTP 200`; existing development process remains local-only. No deployment/hosting/production command was run.

### Generated-art provenance and inspection

The image-generation skill was used only after table composition was frozen, for exactly the two authorized original assets. No reference image was attached or used as input. The prompts explicitly requested original graphite/steel, amber, cyan reactor machinery and excluded alien faces/eyes/tentacles/creatures/cities, purple-green treatment, copied layouts, logos, browser chrome, labels (playfield), and extra text (social card). The generated playfield was visually inspected as a label-free graphite/amber/cyan plate; the social card was visually inspected for exactly the readable lines `STARFORGE // REACTOR` and `ORIGINAL COSMIC PINBALL`, with no other copy/logos. Source outputs remain in `/Users/brianandrino/.codex/generated_images/019ffbee-c588-77d3-b599-9752e97979a7/`; integrated hashes are frozen below.

Exact frozen prompts:

1. Playfield plate — `Use case: stylized-concept. Asset type: original browser pinball playfield art plate, portrait 700:1080 composition. Primary request: premium top-down biomechanical fusion-reactor playfield underlay for an original browser game called Starforge Reactor. Palette: graphite-black forged metal, heat-scarred copper, molten amber, cool cyan energy traces, bone-white ceramic, deep-space black. Show engineered plates, channels, reactor housings, rails-underlay recesses, wear, sparks, and layered depth. Composition must leave clear negative space for code-rendered pinball rails, targets, flippers, bumpers, ramps, arrows, lamps, labels, and balls. Style: original industrial arcade machine concept art, tactile and physical, not a spaceship cockpit. Constraints: no readable text, no logos, no UI, no score panels, no browser chrome, no pinball mechanisms that claim gameplay, no alien eyes, faces, tentacles, creatures, cityscape, purple-green palette, or copied reference layout. Avoid recognizable copyrighted franchise imagery and reference screenshots.`
2. Social preview — `Use case: ads-marketing. Asset type: finished social-preview card for a browser pinball game. Canvas: landscape 1200×630 composition. Primary request: create an original premium social card for STARFORGE // REACTOR, a biomechanical cosmic pinball table. Show a dramatic cropped top-down view of a glowing amber fusion reactor surrounded by graphite-black forged metal channels, cyan energy traces, heat-scarred copper, and tiny forge sparks. Leave dark open space on the left for title; reactor centered slightly right. Render exactly these two lines, correctly spelled and highly legible: STARFORGE // REACTOR / ORIGINAL COSMIC PINBALL. No other words, letters, numerals, logos, watermarks, or UI. Constraints: no recognizable copyrighted characters or franchise imagery; no alien faces, eyes, tentacles, creatures, cityscapes, purple-green palette, browser chrome, score panels, hands, or people; avoid illegible lettering, extra labels, warped text, generic sci-fi poster clutter, or copied pinball layouts.`

### Runtime evidence — desktop, portrait, collision lab, cleanup

- Desktop 1280×900 five-minute hands-on session: 15 bounded ~20-second browser intervals totaling five minutes of alternating left/right flipper input, relaunch, restart, and nudge cycles. The game stayed responsive through natural ready/live/drain transitions; final status was `SKILL SHOT: light an orbit lane`; browser logs contained zero error/warning entries. Final normal desktop bounds after the last code pass: canvas x=447.836, y=200.570, w=384.328, h=606; document 1280×900 with scroll width 1280.
- Portrait 390×844 hands-on session: initial run reached 160 seconds through launch, both touch flippers, restart, and left/right nudge; the browser tab was released by the control tool, recorded as an ordinary automation interruption. A fresh tab then completed 100 additional seconds in bounded intervals, including a restart and nudge. The final portrait state had all live fields readable (`BALL 3`, `SAVE OFF`, `BONUS 1×`, `LOCKS 0/2`, `COMBO —`, `TILT 1/3`, `WIZARD 0/4`), SFX/music ON, pause, restart; browser logs were empty.
- Final portrait geometry at 390×844: playfield wrapper x=9.008, y=117.164, w=371.977, h=573.914; canvas x=14.008, y=122.164, w=361.977, h=563.914; compact live HUD x=6, y=696, w=378, h=93; touch deck x=6, y=792, w=378, h=46; document scroll width 390. The playfield is 84.4% of the useful score-to-touch-deck span; HUD/deck are below the canvas and do not obscure the drain or ball.
- Slow-motion localhost collision lab at 1280×900: selected `SLOW 0.2×`, then exercised `FLIPPER IMPACT`, `SLING REBOUND`, `SPINNER / GATE`, `DIRECTIONAL RAMP`, `OUTLANE / DRAIN`, and `MULTIBALL CONTACT`. The visible debug table showed Planck `BODIES 24`, `STEP 8.33ms`, and contacts while the multiball scenario reported `3 physical balls · shared bumper contact running`; no console errors were recorded. Automated falsifiers additionally prove legal/illegal ramp direction, timeout, thin rails, bullet contact, flipper return, plunger apex, and bounded body/effect counts.
- Pause/resume and focus affordances: portrait HUD changed `PAUSE` to `RESUME`; keyboard-visible focus was operable on a restart button and document scroll width remained 390. Independent SFX/music toggles persisted OFF across a real reload, then were restored ON; final baseline is fresh ready, normal URL, no evidence query, SFX ON, music ON, and active game state absent after reload. Standard gamepad hardware was unavailable; normalized standard mapping, restart edge behavior, disconnect, and cleanup remain covered by automated tests.

### Frozen diff and hashes

Git has no tracked baseline in this workspace, so the non-destructive frozen surface is the complete changed-file inventory plus SHA-256 values. Changed/added files: `app/game/config.js`, `app/game/core.js`, `app/game/physics.js`, `app/game/effects.js`, `app/game/CosmicPinball.tsx`, `app/game/input.js`, `app/game/persistence.js`, `app/globals.css`, `app/layout.tsx`, `app/page.tsx`, `tests/game.test.mjs`, `tests/physics.test.mjs`, `tests/rendered-html.test.mjs`, `package.json`, `package-lock.json`, `pnpm-lock.yaml`, `public/starforge-playfield.png`, and `public/starforge-social.png`. The prior scaffold preview files remain removed from the workspace; no unrelated source was touched.

```text
4ee95be2de0c99d0fb05ca8dd1261466831f5461a9d10232468d8d06ff99f350  app/game/config.js
5e36f2c0ab8ead25ce3847546e37e91c5d844b10617652c78e1df26e3324a967  app/game/core.js
7c4fedaded1be10bec781646d8c9ccd92b80f17478106d67f2ca2ed1b548da98  app/game/physics.js
c3843b8b5cb5a41e82754a1216e484f169d8bcbc2e87a1a6c70016a4ad07b8d5  app/game/effects.js
6621dd628e51b5be6ec20809da0fccf7ed008fe6bc4c43eda6e9adc77c86e734  app/game/CosmicPinball.tsx
b981fc26386e711590c2f5dbbd7346b6c92c038e29c141c3cd848898fbb1dfd8  app/game/input.js
5ae5d21e1ddf6fd57c31f683cbfffc63362e7be3407f6b66706bd5d8d1850e2d  app/game/persistence.js
54ca32b73bee7c4fee2f4c3be09fb09eac82774d44aa7306217e4ff26e53f267  app/globals.css
73b6670a5810e54607ede79b7b824d9e0c144605ffc85851411de269f63cee4d  app/layout.tsx
b780e682b9252018f3b8240edf076ba740dc08689cba76f909c8f2d1d0cc8d8d  app/page.tsx
c4c649011a5a2d81310863623ede41c9b4c7019bcaeb9c9f240b0659241aba0b  tests/game.test.mjs
f80f16be34fc0b62ac7d4fcc0cea41e7ad301393ece590a3648d530bf9554e99  tests/physics.test.mjs
13680b9f1ca70e5dafab6ae46cc837800a716b11024ed0537a73171a62e42494  tests/rendered-html.test.mjs
081bf250aabf70a2afbb2d23e9e446c28d14fa1d8e1cd9a48b5c42f925e1172b  package.json
8123eb459f9e8cb4dc3d4d5a502af8b013ce3449e10380afe921f74c95eeaa69  package-lock.json
cdb078cf76b5dd716e50f77526b0f1415f6336395da04cb5c2fbb161acc144b0  pnpm-lock.yaml
4843e564365cfa7b6c97bb6ac1efe3eeece6b7baf60b14b52fe4c30007044968  public/starforge-playfield.png
391bc780a3317f865f8576dbd99f7d8ae4e9f74baea7a55dd0772493024324d8  public/starforge-social.png
```

### Ordinary failures and hard-stop audit

- Browser automation released one portrait tab after 160 seconds; the safe branch continued in a new tab for 100 seconds and the gap is recorded above. Physical gamepad hardware was unavailable, so only normalized browser-level mapping tests exist. An attempted page-scope focus evaluation exposed a read-only harness limitation (`focus` is not exposed on the evaluation wrapper), but semantic button focus/click remained operable and no app console error resulted.
- No hard-stop condition occurred: no copied/reference input, secret, credential, account, user data, paid service, extra runtime dependency, uncontrolled world/body/contact/catch-up/audio/particle/storage growth, deployment, hosting mutation, production access, or destructive command.

### Final handoff

The implementation, local evidence, provenance, and exact frozen hashes are ready for independent Auditor review. Builder will not deploy, mutate production, or wait inside this pass.

## O-2.1-C2 Builder correction implementation and evidence checkpoint

State: `BUILDER_CHECKPOINT_READY`
Owner revision/package: O-2 / O-2.1-C2
Frozen: 2026-08-14
Implementation gate: `RELEASED` — this is the bounded correction pass released after the Auditor's `FIXES_REQUIRED` disposition for O-2.1-C1. Deployment, hosting, production mutation, git/remotes, new art generation, and dependency expansion remain unauthorized.

### Correction package disposition

1. **Desktop composition:** removed the competing mission/control side-panel composition from the normal shell. Desktop now centers the table with one compact status strip and a collapsible `INPUT / SETTINGS` cabinet-edge treatment; portrait keeps its live HUD, settings, input guide, and touch deck below the playfield.
2. **Authored plate visibility:** the accepted `starforge-playfield.png` remains the CSS playfield underlay. `drawTable` now clears each frame and paints only translucent atmosphere/lighting over it, so the label-free graphite, copper, amber, and cyan plate remains visible during live play while code-rendered mechanisms stay crisp.
3. **Mechanism/material legibility:** the existing shared geometry and Planck fixtures remain authoritative. The rendered table visibly separates metal rails/guides, rubber slings, raised-path ramps, inlanes/outlanes, spinner/gate, travel/reset target bank, plunger lane, drain/outhole, reactor housing, bumpers, posts, inserts, flippers, and ball. The visible launch deflector aligns with the physical launch lane; no invisible mid-lane shortcut remains.
4. **Control/evidence correction:** the physical launch exit was tuned from a `-7.5` to `-8` lateral Planck impulse so a full-charge production launch exits the lane into the shared upper playfield. A focused production-physics regression covers that path. Normal browser probes demonstrate launch, both flipper inputs, nudge, ball-save, drain/serve lifecycle, and responsive status; the probe did not consistently produce every named orbit/ramp/bank/spinner/reactor shot, so that limitation is recorded rather than presented as normal-play proof. Deterministic Planck contacts remain falsifiers/supporting evidence only.
5. **Frozen captures:** refreshed normal URL captures at 1280×900 and 390×844 show the visible authored plate, enlarged table-first center, compact status/settings, readable ball/inserts, distinct mechanisms, unobstructed touch controls, and no evidence overlay or horizontal overflow.
6. **Foundation/matrix:** preserved Planck 1.5.0/pure-rules separation, all prior 25 regressions, inputs, local-only preferences/best, mutes, focus/pause cleanup, bounded effects, originality/provenance, and production prohibition. Added one focused launch regression; final suite is 26/26.

### C2 correction diff (four files)

The recovery surface contains exactly these four tracked edits; the accepted O-2.1 implementation/art/dependency files remain unchanged in this correction pass:

- `app/game/physics.js` — tune the visible launch-exit impulse to `-8` and retain only the visible/validated exit path.
- `app/globals.css` — table-first desktop media treatment, compact desktop console, hidden desktop touch deck, and width-safe portrait wrapper.
- `tests/physics.test.mjs` — add `normal launch exits the channel into the shared upper playfield` regression.
- `tests/rendered-html.test.mjs` — assert compact table status/settings, absence of side panels, and the completed gamepad mapping guidance.

### Final automated and static evidence

- Tests: `/Users/brianandrino/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test tests/*.test.mjs` — PASS, **26/26**, zero failures. The added regression asserts full-charge launch reaches x < 400, emits `launch-exit` plus `top-arch`/`launch-guide`, and never leaves the bounded table.
- Lint: `/Users/brianandrino/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/eslint/bin/eslint.js . --ignore-pattern dist --ignore-pattern .next` — PASS, zero errors/warnings.
- Build: `WRANGLER_LOG_PATH=.wrangler/wrangler.log /Users/brianandrino/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vinext/dist/cli.js build` — PASS across all five environments; the existing non-fatal vinext dynamic-route classification warning remains the only build note.
- Dependency boundary: `package.json` still contains exactly `planck@1.5.0` as the added runtime package, with the accepted MIT/license and lockfile evidence unchanged. The recovery shell has no `pnpm`/`corepack` executable, so `pnpm list` could not be rerun in this pass; the prior accepted `pnpm install --lockfile-only` and package/license verification remain the valid dependency evidence, and no dependency file was edited here.
- Privacy/storage scan: `rg -n 'fetch\\(|XMLHttpRequest|WebSocket|sendBeacon|localStorage|sessionStorage' app/game app/page.tsx app/layout.tsx` returns only the two deliberate `localStorage` preference calls in `CosmicPinball.tsx`; no gameplay network primitive, active-state persistence, backend, analytics, or personal-data path is present.
- Local health: `curl -sS -o /dev/null -w 'HTTP %{http_code}\\n' http://localhost:3000/` — `HTTP 200`; the existing development process remains local-only. No hosting, deployment, remote, or production command was run.

### Runtime and visual evidence reused/refreshed

- **Desktop normal URL, 1280×900:** wrapper x=430, y=185.570, w=420, h=648; canvas x=442, y=197.570, w=396, h=624; compact console x=120, y=854, w=1040, h=36; touch deck `display:none`; document scroll width/height 1280×900; side-panel count 0; playfield CSS background resolves to `/starforge-playfield.png`. The capture visibly shows the graphite/copper authored plate beneath code-rendered cyan rails, amber ramps/slings/flippers, three ION bumpers, reactor housing, four targets, spinner, plunger lane, inlanes/outlanes, and drain.
- **Portrait normal URL, 390×844:** wrapper x=9.008, y=117.164, w=371.977, h=573.914; canvas x=14.008, y=122.164, w=361.977, h=563.914; mobile HUD x=6, y=696, w=378, h=93; touch deck x=6, y=792, w=378, h=46; desktop console hidden; side-panel count 0; document scroll width/height 390×844. The full plate and aligned mechanisms remain visible; status/settings and touch controls sit below the table without overlap or horizontal scroll.
- Both captures were taken on the normal URL with no `evidence` query and no debug panel. The refreshed desktop probe opened the compact guide, restarted, launched, exercised both arrow flippers plus nudge, and observed `BALL SAVED — plunge again`/live `SAVE` status. The portrait probe similarly launched, exercised both arrow flippers, and retained readable `BALL 3`, `SAVE`, `BONUS`, `LOCKS`, `COMBO`, `TILT`, `WIZARD`, SFX/music, pause, restart, and touch controls. Browser console review showed no app errors/warnings.
- **Planck launch falsifier/support:** `StarforgePhysics.launch(1,1)` over 720 fixed steps reached minX 88.48, minY 104.30, maxY 987.11 and emitted `plunger-release`, `plunger`, `launch-exit`, `top-arch`, `wall`, `ramp-rail`, `bumper`, `ramp-reject`, `guide`, and `sling`; no ball/body escaped. This is deterministic physics evidence, not a substitute for human named-shot proof.
- The previously valid bounded five-minute desktop/portrait lifecycle sessions, slow-motion collision lab, audio/mute/focus checks, and generated-art provenance remain applicable because the C2 recovery diff does not alter those surfaces. The ordinary gaps remain: no physical gamepad hardware; browser automation had one released portrait tab; and normal play did not yield a repeatable complete cradle/pass/orbit/ramp/target-bank/spinner/reactor named-shot set. These are explicitly handed to the independent Auditor as evidence limitations, not hidden.

### Fresh SHA-256 freeze

The complete accepted implementation surface is unchanged except for the four-file C2 correction diff above. Current hashes are:

```text
27ef1556f4804556ccf4499398f4eb73ed6b64ca58d2fdf09b3cc5031620ee2e  app/game/config.js
5e36f2c0ab8ead25ce3847546e37e91c5d844b10617652c78e1df26e3324a967  app/game/core.js
a0f94aca604aaf9e7c1d61422c1d259c508f34e2dd33428f33493ee5bb04673c  app/game/physics.js
c3843b8b5cb5a41e82754a1216e484f169d8bcbc2e87a1a6c70016a4ad07b8d5  app/game/effects.js
5ea9188df338dade7c39abe26a526666efb0d7d6eecac25f83c1666f3b596b9b  app/game/CosmicPinball.tsx
b981fc26386e711590c2f5dbbd7346b6c92c038e29c141c3cd848898fbb1dfd8  app/game/input.js
5ae5d21e1ddf6fd57c31f683cbfffc63362e7be3407f6b66706bd5d8d1850e2d  app/game/persistence.js
bce4ba82e14eaf877478c6ae502009fcd288d7ed2171021648641d4973cd2b9f  app/globals.css
73b6670a5810e54607ede79b7b824d9e0c144605ffc85851411de269f63cee4d  app/layout.tsx
b780e682b9252018f3b8240edf076ba740dc08689cba76f909c8f2d1d0cc8d8d  app/page.tsx
c4c649011a5a2d81310863623ede41c9b4c7019bcaeb9c240b0659241aba0b  tests/game.test.mjs
028792c576fbfcc51c05058ee802307b75035d82e57e46fdd3dd5efa8ca0d691  tests/physics.test.mjs
1561fa799b6304d6099bce1d64e82b4d2408fc7002d5eb096a45ea746061339d  tests/rendered-html.test.mjs
081bf250aabf70a2afbb2d23e9e446c28d14fa1d8e1cd9a48b5c42f925e1172b  package.json
8123eb459f9e8cb4dc3d4d5a502af8b013ce3449e10380afe921f74c95eeaa69  package-lock.json
cdb078cf76b5dd716e50f77526b0f1415f6336395da04cb5c2fbb161acc144b0  pnpm-lock.yaml
4843e564365cfa7b6c97bb6ac1efe3eeece6b7baf60b14b52fe4c30007044968  public/starforge-playfield.png
391bc780a3317f865f8576dbd99f7d8ae4e9f74baea7a55dd0772493024324d8  public/starforge-social.png
```

### C2 handoff

The bounded O-2.1-C2 implementation, final checks, reused/refreshed runtime observations, ordinary gaps, complete changed-file inventory, and SHA-256 freeze are ready for independent Auditor review. Builder will not deploy, host, mutate production, manipulate git/remotes, generate new art, or wait inside this pass.
