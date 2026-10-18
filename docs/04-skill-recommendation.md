# Website-Building Skill Recommendation (for the frontend / designer agent)

Goal: give the frontend/website-designer agent a **skill** so it builds Eventina's site with real
design taste instead of generic AI output (purple gradient, Inter, four-card grid).

> Research date: 2026-10-17. Sources: SkillGild, Composio, UiChemy, VoltAgent/awesome-agent-skills,
> wilwaldon/Claude-Code-Frontend-Design-Toolkit. Verify each repo before install.

## Recommendation

Use **one direction skill + one audit skill + one visual-feedback tool**. Direction skills conflict
with each other, so pick exactly one.

| Role | Pick | Why |
| --- | --- | --- |
| **Direction (primary)** | **`frontend-design` — Anthropic (official)** | Free, official, stack-agnostic, 270k+ installs. Makes the agent commit to a design plan (colours, type, ASCII layout) before coding and bans the generic "AI look". The safe default. |
| **Direction (upgrade)** | **`impeccable` — pbakaus** | The most complete: brand vs product modes, 24 commands (`layout`, `typeset`, `bolder`, `quieter`, `critique`, `audit`) and a deterministic anti-pattern detector. Best if we want a distinctive whole site and can spend more tokens. |
| **Best project fit (alternative)** | **`frontcraft` — northcrafto** | Purpose-built for **small-business marketing sites**, explicitly **stack-agnostic (plain HTML/CSS works)**, sources real stock photos, and has a post-build review-subagent loop. Closest match to Eventina's shape. |
| **Audit (pair with any)** | **`web-design-guidelines` — Vercel Labs** | 100+ interface rules (a11y, focus, forms, motion, typography, performance, dark mode, touch targets). Reviews, does not design. |
| **Visual feedback (pair with any)** | **Playwright MCP / `webapp-testing`** | Lets the agent screenshot its own pages across viewports and self-correct. The highest-leverage add-on for design work. |

## Concrete pick for Eventina

- **Primary:** `impeccable` (brand mode) — a distinctive, premium event-organiser site benefits from a
  strong single accent + art-directed imagery, and its `audit`/`critique` pass fits our QA phase.
- **Baseline fallback:** `frontend-design` — if we want free/official and minimal tokens.
- **Both paired with:** `web-design-guidelines` (audit) and Playwright (visual loop).

If the human wants the smallest, safest setup: **`frontend-design` + `web-design-guidelines` + Playwright**.

## Why not a "stack" skill

Skills like `react-best-practices`, `tailwind-theme-builder`, `shadcn-ui`, `astro` target React/Tailwind
builds. Our decision is **vanilla HTML/CSS/JS, no npm** (`docs/02-tech-stack.md`), so stack-specific
skills add nothing. We want stack-agnostic design skills only.

## Install (once confirmed)

Skills live as `SKILL.md` folders under the agent's `.claude/skills/`. Install method depends on the
harness (plugin marketplace vs copy). Example forms seen in the wild:

```bash
# Anthropic plugin marketplace
/plugin install frontend-design@anthropic-agent-skills

# or copy the skill folder
git clone <repo> && cp -r <repo>/<skill> "$AGENT_DIR/.claude/skills/"
```

> Exact repo paths/commands **must be verified** before applying (third-party aggregators can lag).
> Recommended: the god installs it as a **hire-skill / plugin** or a temp installs it in its own session.

## Sources

- Anthropic skills repo: `anthropics/skills` (also `anthropics/claude-code`)
- `pbakaus/impeccable`
- `northcrafto/frontcraft`
- `vercel-labs/agent-skills` (web-design-guidelines, react-best-practices)
- `Leonxlnx/taste-skill`, `nextlevelbuilder/ui-ux-pro-max-skill` (other direction options)
