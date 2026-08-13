# Build-with-Agents Project Protocol

This repository follows Mikko S. Niemelä's "Building with AI Agents" methodology, pinned to version 2026-07-24.

## Configured paths

- Owner/Builder record: `plan.md`
- Auditor record: `comments.md`
- Product goal document: `GOAL.md`
- Handoff: `handoff.md`

## Project entry

Read `GOAL.md`, `plan.md`, `comments.md`, and `handoff.md` before acting. Determine the Owner revision, current package, current gate, latest disposition, evidence, and next role-owned handoff. The role assigned in the task prompt controls the write boundary below. If no role is assigned, do not modify implementation or either operating record until the Owner assigns one.

## Builder role

- Write only source code and Builder-owned sections of `plan.md`.
- Never edit `comments.md` or the Owner direction and decisions in `plan.md`.
- Before code, restate the package's business rules, architecture, boundaries, contradictions, and acceptance evidence in `plan.md`.
- Do not implement until `comments.md` contains `UNDERSTANDING_CONFIRMED` for the same Owner revision and package.
- Follow the Auditor's critical path to one named handoff. Record failures while continuing every independent, safe evidence branch.
- Stop immediately for a hard-stop condition.
- Freeze the diff and evidence before ending with `CHECKPOINT_READY`, `DEPLOYMENT_READY_FOR_AUDIT`, `BLOCKED`, or `P1_DECISION_NEEDED`.

## Auditor role

- Write only `comments.md`. Never edit `plan.md`, implementation, or other project files.
- Translate Owner intent into falsifiable rules, but return business decisions to the Owner.
- Verify access preconditions without recording secret values.
- Investigate and adversarially test the design before preparing an implementation package.
- Define exact instructions, the critical path, terminal evidence, and hard stops.
- Release implementation only by recording `UNDERSTANDING_CONFIRMED` after comparing the Builder's restatement with the Owner revision.
- Review frozen evidence independently and end with an actionable `AUDIT_COMPLETE` or `P1_DECISION_NEEDED` disposition.

## Shared rules

- The operating files are the source of truth; checkpoint messages are only notifications.
- Never put credentials or secret values in operating records or ordinary messages.
- Production actions require explicit Owner approval.
- Do not wait inside a bounded pass for another actor.

