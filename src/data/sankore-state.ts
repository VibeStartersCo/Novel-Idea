/**
 * Sankore v2 — firm state snapshot for Mission Control.
 *
 * Source of truth: ~/Desktop/AI Coding/Business/The Sankore Group/docs/plan/*.md
 *
 * AUTO-SYNCED fields (bracketed by SYNC:BEGIN / SYNC:END markers):
 *   - lastUpdated, phase, nextMilestone
 *   - phase1g.sprints
 *   - governanceCounts
 * Updated by scripts/sync_dashboard.py (Sankore repo) via post-commit hook.
 * Do NOT hand-edit inside SYNC:BEGIN / SYNC:END blocks — changes get overwritten.
 *
 * HAND-CURATED fields (outside SYNC markers):
 *   - mvpFoundation.checkpoints, artifacts, openQuestions, resolvedQuestions,
 *     decisions, agentRoster — refreshed at CEO exit-gates / session debriefs.
 *
 * Future: wire to Supabase (agents table, activity_log) — Phase 2A work.
 */

export type CheckpointStatus = 'approved' | 'in-progress' | 'pending';
export type SprintStatus = 'closed-passed' | 'queued' | 'stub' | 'open' | 'reopened';
export type ArtifactTier = 'T1' | 'T2' | 'T3' | 'TK';
export type ArtifactStatus = 'drafted' | 'in-flight' | 'pending';
export type Severity = 'high' | 'medium' | 'low';

export interface Checkpoint {
  id: string;
  title: string;
  description: string;
  status: CheckpointStatus;
  approvedDate?: string;
}

export interface Sprint {
  id: string;
  dept: string;
  title: string;
  status: SprintStatus;
  owner: string;
  closeDate?: string;
  summary: string;
}

export interface Artifact {
  id: number;
  tier: ArtifactTier;
  name: string;
  purpose: string;
  audience: string;
  status: ArtifactStatus;
  home?: string;
}

export interface OpenQuestion {
  id: number;
  title: string;
  resolvesIn: string;
  owner: string;
  blocks: string;
}

export interface ResolvedQuestion {
  id: string;
  title: string;
  resolution: string;
  date: string;
}

export interface Decision {
  id: number;
  decision: string;
  value: string;
  date: string;
}

export interface DeptCount {
  name: string;
  count: number;
}

export interface TierCount {
  tier: string;
  count: number;
}

export interface AgentRoster {
  total: number;
  departments: DeptCount[];
  tierDistribution: TierCount[];
  personaShells: number;
  note: string;
}

export interface BlockInfo {
  openedAt: string;
  closedAt: string;
  file: string;
}

export type BlockProgress = {
  [sprintId: string]: {
    [blockKey: string]: BlockInfo;
  };
};

export interface HardCarryIn {
  id: string;
  description: string;
  deadline: string;
  daysRemaining: number;
  blockingSprint: string;
  status: string;
}

export interface PatternNomination {
  id: number;
  title: string;
  sourceSprint: string;
  status: string;
}

export interface PatternCatalog {
  total: number;
  nominations: PatternNomination[];
}

export interface ModelVersions {
  currentCeiling: string;
  landedDate: string;
  priorCeilingRefs: number;
  lagNote: string;
}

export interface FirmState {
  lastUpdated: string;
  phase: string;
  nextMilestone: string;
  mvpFoundation: {
    targetDate: string;
    gateStatus: 'cleared' | 'in-flight' | 'open';
    gateClearedDate?: string;
    checkpoints: Checkpoint[];
  };
  phase1g: {
    windowOpens: string;
    windowCloses: string;
    sprints: Sprint[];
  };
  artifacts: Artifact[];
  openQuestions: OpenQuestion[];
  resolvedQuestions: ResolvedQuestion[];
  decisions: Decision[];
  agentRoster: AgentRoster;
  governanceCounts: {
    constraintsLocked: number;
    decisionsLocked: number;
    openQuestionsTotal: number;
    resolvedQuestionsTotal: number;
  };
  blockProgress: BlockProgress;
  hardCarryIns: HardCarryIn[];
  patternCatalog: PatternCatalog;
  modelVersions: ModelVersions;
}

export const firmState: FirmState = {
  // SYNC:BEGIN lastUpdated
  lastUpdated: '2026-04-19',
  // SYNC:END
  // SYNC:BEGIN phase
  phase: 'Phase 1g — P1G-CIO-01 OPEN',
  // SYNC:END
  // SYNC:BEGIN nextMilestone
  nextMilestone: 'P1G-CIO-01 (Roundtable Charter + decision-ceremony primitive from `TradingAgents` + `ATLAS` + `virattt`)',
  // SYNC:END

  mvpFoundation: {
    targetDate: '2026-04-20',
    gateStatus: 'cleared',
    gateClearedDate: '2026-04-18',
    // SYNC:BEGIN checkpoints
    checkpoints: [
      {
        id: 'CP1',
        title: 'Configs — bilingual shell',
        description: 'TS Paperclip-shape configs (package.json, pnpm workspace, tsconfigs) + Python pyproject.toml + minimal .env. Decision #14 bilingual substrate.',
        status: 'approved',
        approvedDate: '2026-04-18',
      },
      {
        id: 'CP2',
        title: 'Doc-home registry + validator',
        description: 'doc_homes.yaml (15 homes) + scripts/doc_home_check.py runtime validator. Constraint #23 code gate. 285 governed files, 0 violations.',
        status: 'approved',
        approvedDate: '2026-04-18',
      },
      {
        id: 'CP3',
        title: 'Agent roster + persona shells',
        description: '50-row Paperclip agents seed from v1 agent_registry + 250 OpenClaw persona shells (5 files × 50 agents). Kimi authored templates; Python stamped files.',
        status: 'approved',
        approvedDate: '2026-04-18',
      },
      {
        id: 'CP4',
        title: 'SUPABASE-SPEC + first migration',
        description: 'SUPABASE-SPEC locked on §4 (v2 schema policy) / §5 (task_cost_log Option B + public exception) / §6 (v1 archive read-only). Migration 0001 live in PROD Supabase.',
        status: 'approved',
        approvedDate: '2026-04-18',
      },
    ],
    // SYNC:END
  },

  phase1g: {
    windowOpens: '2026-04-20',
    windowCloses: '2026-05-01',
    // SYNC:BEGIN sprints
    sprints: [
      {
        id: 'P1G-FORK-01',
        dept: 'Infrastructure',
        title: 'Fork infrastructure',
        status: 'closed-passed',
        owner: 'Sekou (executes) + Osei (verifies)',
        closeDate: '2026-04-17',
        summary: 'Acceptance criteria scoring:',
      },
      {
        id: 'P1G-SCAN-01',
        dept: 'Cross-dept (scan)',
        title: '8-dept structural scan',
        status: 'closed-passed',
        owner: 'Marcus (CEO, strategic) + Osei (Claude, structural coherence) — joint 1–2 session review',
        closeDate: '2026-04-18',
        summary: 'Inserted 2026-04-18 per CEO direction: before any Phase 1g dept deep-dive launches, run a cross-dept scan so each charter is written with inter-dept context, not in isolation. Pre-work already done: all 9 v1 dept-head...',
      },
      {
        id: 'P1G-ENG-01',
        dept: 'Engineering',
        title: 'Engineering dept deep-dive',
        status: 'closed-passed',
        owner: 'Osei (leads) + Sekou (engages at this sprint)',
        closeDate: '2026-04-19',
        summary: '---',
      },
      {
        id: 'P1G-AUD-01',
        dept: 'Audit',
        title: 'Audit dept deep-dive',
        status: 'closed-passed',
        owner: 'TBD',
        closeDate: '2026-04-19',
        summary: 'Audit dept deep-dive will spec the **doc-home orphan-audit cadence**:',
      },
      {
        id: 'P1G-RES-01',
        dept: 'Research',
        title: 'Research dept deep-dive',
        status: 'closed-passed',
        owner: 'TBD',
        closeDate: '2026-04-19',
        summary: 'Research Dept Charter + 18-persona pattern extraction from `virattt/ai-hedge-fund` + `TradingAgents`',
      },
      {
        id: 'P1G-TRD-01',
        dept: 'Trading Desk',
        title: 'Trading Desk dept deep-dive',
        status: 'closed-passed',
        owner: 'TBD',
        closeDate: '2026-04-19',
        summary: 'Trading Dept Charter + execution-adapter selection from `Kraken CLI` + `Open-Finance/AgenticTrading`',
      },
      {
        id: 'P1G-RSK-01',
        dept: 'Risk & Performance',
        title: 'Risk & Performance dept deep-dive',
        status: 'closed-passed',
        owner: 'TBD',
        closeDate: '2026-04-19',
        summary: 'Risk Dept Charter + position-sizing backtest scaffold using `FinGPT` + `ATLAS`',
      },
      {
        id: 'P1G-CIO-01',
        dept: 'CIO Roundtable',
        title: 'Roundtable Charter + decision-ceremony primitive from `TradingAgents` + `ATLAS` + `virattt`',
        status: 'open',
        owner: 'TBD',
        summary: 'Roundtable Charter + decision-ceremony primitive from `TradingAgents` + `ATLAS` + `virattt`',
      },
      {
        id: 'P1G-CST-01',
        dept: 'C-Suite + PAs',
        title: 'C-Suite + PA Charter + personnel-file shape from `OpenAlice` + `Paperclip` + `ClawTeams`',
        status: 'stub',
        owner: 'TBD',
        summary: 'C-Suite + PA Charter + personnel-file shape from `OpenAlice` + `Paperclip` + `ClawTeams`',
      },
      {
        id: 'P1G-COM-01',
        dept: 'Compliance & Legal',
        title: 'Compliance & Legal dept deep-dive',
        status: 'closed-passed',
        owner: 'TBD',
        closeDate: '2026-04-19',
        summary: 'Compliance Charter (Nkechi) + SEC readiness + F18 external-regulatory enforcement',
      },
      {
        id: 'P1G-OPR-01',
        dept: 'Ops + R&D',
        title: 'Paired Ops + R&D Charter + cost-governor spec from `ATLAS` + `ClawTeams`',
        status: 'stub',
        owner: 'TBD',
        summary: 'Paired Ops + R&D Charter + cost-governor spec from `ATLAS` + `ClawTeams`',
      },
      {
        id: 'P1G-SYN-01',
        dept: 'Synthesis',
        title: 'Mental Model v2 + `PATTERN-CATALOG.md` + substrate ratification',
        status: 'stub',
        owner: 'TBD',
        summary: 'Mental Model v2 + `PATTERN-CATALOG.md` + substrate ratification',
      },
      {
        id: 'P1G-TIER-BC-REVIEW-01',
        dept: 'Research',
        title: 'Tier-B/C 26-repo review (interstitial, conditional)',
        status: 'stub',
        owner: 'Tariq',
        summary: 'Runs only if Tier-A corpus surfaces an unanswered pattern. Trigger criterion = Q#8.',
      },
    ],
    // SYNC:END
  },

  // SYNC:BEGIN artifacts
  artifacts: [
    { id: 1, tier: 'T1', name: 'PRJ-CHARTER', purpose: 'Vision, scope, Monday MVP slice, success criteria, stakeholders, what "done" looks like', audience: 'CEO', status: 'pending', home: 'docs/charter/' },
    { id: 2, tier: 'T1', name: 'MONDAY-MVP-PRD', purpose: 'The Apr 20 MVP-Foundation slice — which agents, which data paths, which reports', audience: 'CEO', status: 'pending', home: 'docs/prds/' },
    { id: 3, tier: 'T1', name: 'ARCH-PRD', purpose: 'Runtime architecture: Paperclip + ClawTeams primitive-by-primitive decomposition (keep / override / ignore), trading bolt-on selection, daemon-is-code principle, directory layout, integration contracts', audience: 'Sekou, Kito', status: 'pending', home: 'docs/prds/' },
    { id: 4, tier: 'T1', name: 'SUPABASE-SPEC', purpose: 'DB inventory (read-only) + v2 target DB decision (share existing or fresh) + schema delta', audience: 'Sekou, Safiya', status: 'drafted', home: 'docs/plan/' },
    { id: 5, tier: 'T1', name: 'PROVIDER-AUTH-MATRIX', purpose: '48 agents × 5 providers × task-class authorization', audience: 'All agents', status: 'pending', home: 'docs/specs/' },
    { id: 6, tier: 'T2', name: 'AGENT-BUNDLE-SPEC', purpose: 'OpenClaw 6-file identity-bundle template for every agent', audience: 'Every agent', status: 'pending', home: 'docs/specs/' },
    { id: 7, tier: 'T2', name: 'SKILL-TEMPLATE', purpose: '`SK-[DEPT]-[NAME]` skill file format with anti-rationalization table', audience: 'Every agent', status: 'pending', home: 'docs/specs/' },
    { id: 8, tier: 'T2', name: 'OBSERVABILITY-SPEC', purpose: 'ADL / CoTT / FET / DPL / Audit Trail schemas + OTLP export', audience: 'Kito, Safiya', status: 'pending', home: 'docs/specs/' },
    { id: 9, tier: 'T2', name: 'COST-GOVERNOR-SPEC', purpose: 'Per-agent budgets, kill-switch thresholds, cost-watcher rules', audience: 'Safiya, Amara', status: 'pending', home: 'docs/specs/' },
    { id: 10, tier: 'T3', name: 'DEPLOYMENT-RUNBOOK', purpose: 'Local dev + future Mac Studio SSH daemon setup', audience: 'Sekou', status: 'pending', home: 'docs/ops/' },
    { id: 11, tier: 'T3', name: 'OT-216-DIAGNOSTIC', purpose: 'Side fix for Marcus\'s fresh-Claude-Code-session auth errors. Parallel to planning; not a v2 blocker.', audience: 'Sekou', status: 'pending', home: 'docs/ops/' },
    { id: 12, tier: 'T3', name: 'SECURITY-BASELINE', purpose: 'Secrets handling, RLS policy, audit surface, least-privilege principles for v2', audience: 'Safiya, Kito', status: 'pending', home: 'docs/specs/' },
    { id: 13, tier: 'TK', name: 'FIRM-TODO.md', purpose: 'Canonical task list. Replaces memory for task state.', audience: 'All + CEO', status: 'pending' },
  ],
  // SYNC:END

  // SYNC:BEGIN openQuestions
  openQuestions: [
    {
      id: 1,
      title: 'Gemma 3 vs Gemma 4',
      resolvesIn: '`PROVIDER-AUTH-MATRIX` (T1 artifact #5)',
      owner: 'Sekou',
      blocks: 'MVP-Build (provider config must know which tier)',
    },
    {
      id: 3,
      title: 'OT-218 Anthropic API key refresh',
      resolvesIn: '`OT-216-DIAGNOSTIC` (T3 artifact #11)',
      owner: 'Sekou',
      blocks: 'nothing — parallel side-fix, not blocking `P1G-FORK-01`',
    },
    {
      id: 5,
      title: 'May 1 cliff management',
      resolvesIn: '`PRJ-CHARTER` + dedicated changelog entry',
      owner: 'Marcus + Osei',
      blocks: 'MVP-Build start date confirmation',
    },
    {
      id: 6,
      title: 'Options / Greeks / dynamic hedging coverage gap',
      resolvesIn: 'Phase 2 external sourcing sprint (post-MVP-Build)',
      owner: 'Tariq (R&D)',
      blocks: 'Trading dept scope beyond vanilla spot/futures',
    },
    {
      id: 7,
      title: 'Knowledge consolidation scope',
      resolvesIn: 'Phase 2 pre-rebuild initiative (post-MVP-Build)',
      owner: 'Kito + Marcus',
      blocks: 'Phase 2 governance surface design',
    },
    {
      id: 8,
      title: 'Tier-B/C review trigger',
      resolvesIn: '`P1G-SYN-01` synthesis output',
      owner: 'Osei + Marcus',
      blocks: 'Tier-B/C sprint open condition',
    },
    {
      id: 9,
      title: 'Phase 2 reference-expand candidates',
      resolvesIn: '`P2-REF-EXPAND-01` sprint (to be specced when Phase 2 opens)',
      owner: 'Osei + Marcus',
      blocks: 'nothing — both are Phase 2-forward',
    },
    {
      id: 10,
      title: 'Nous Hermes Agent as employee runtime for non-trading agents',
      resolvesIn: '`P1G-ENG-01` substrate decision + `P1G-TRD-01` trading-runtime decision',
      owner: 'Sekou + Marcus',
      blocks: 'per-agent runtime selection at the adapter layer; does not block MVP-Foundation',
    },
    {
      id: 13,
      title: 'TIER-MATRIX T-row capital authorities — CEO ratification deferred',
      resolvesIn: '`P1G-CIO-01` ratification of decision-ceremony + Mansa standing authority OR ad-hoc CEO sign-off when v1 evidence completes',
      owner: 'Marcus (final) + Mansa + Kito',
      blocks: 'nothing today (decorator can ship with placeholder values + admin override); blocks **first live trade above T0** when ENG-01 wires `enforce_tier_authority()`',
    },
    {
      id: 14,
      title: 'Darwinian-weight rolling window calibration',
      resolvesIn: '`P1G-RND-01` (R&D weekly-synthesis pipeline build) — first 90 days of live weight data will reveal whether 30d is too slow. Calibrate then',
      owner: 'Tariq (R&D) + Sekou (build)',
      blocks: 'nothing — 30d is a sane default; tunable parameter post-launch',
    },
    {
      id: 15,
      title: 'Form-4 §16-status placeholder (Phase 2 trigger)',
      resolvesIn: 'Phase 2 compliance-surface review OR ad-hoc when first §16 trigger fires',
      owner: 'Nkechi + Marcus',
      blocks: 'nothing today — design is dormant; activates at trigger',
    },
    {
      id: 16,
      title: 'Opus 4.7 (1M context) re-baseline timing',
      resolvesIn: '`P1G-SYN-01` synthesis OR dedicated `P1G-MODEL-REBASELINE-01` sprint',
      owner: 'Marcus (ratify) + Mansa (canary criteria) + Sekou (provider-router migration)',
      blocks: 'F18 `model_registry` canonicalization for MVP-Build spawn. *Memory:* `project_opus_47_landed_20260419` + `feedback_model_release_tracking`',
    },
  ],
  // SYNC:END

  // SYNC:BEGIN resolvedQuestions
  resolvedQuestions: [
    {
      id: 'R1',
      title: 'v2 folder path',
      resolution: '`~/Desktop/AI Coding/Business/The Sankore Group/` confirmed canonical and in active use.',
      date: '2026-04-17',
    },
    {
      id: 'R2',
      title: 'SwarmClaw vs Paperclip vs hybrid substrate',
      resolution: 'Paperclip + ClawTeams hybrid. See Decision #1.',
      date: '2026-04-16',
    },
    {
      id: 'R3',
      title: 'GitHub account — continue `Vibe-Starters-R-D` or new',
      resolution: 'New account `VibeStartersCo`. See Decision #6.',
      date: '2026-04-17',
    },
    {
      id: 'R4',
      title: 'Planning artifact folder',
      resolution: 'Superseded by Decision #13 — canonical homes are `docs/plan/` (active) + `docs/planning-history/` (frozen) under the v2 repo. Constraint #10 amended. (Was: Constraint #10 `~/sankore-v2-planning/`.)',
      date: '2026-04-17',
    },
    {
      id: 'R5',
      title: 'Supabase creds location',
      resolution: '*Resolved:* Constraint #12 — `.env` in existing Sankore repo.',
      date: '',
    },
    {
      id: 'R6',
      title: 'Dual-track existing-firm stabilization',
      resolution: '*Resolved:* Constraint #3 — dropped. Single-track clean v2 build.',
      date: '',
    },
    {
      id: 'R7',
      title: 'MVP deadline',
      resolution: '*Resolved:* Constraint #13 + Decisions #9–10. Apr 20 = MVP-Foundation (structural); MVP-Build = post-May-1 (runtime).',
      date: '',
    },
    {
      id: 'R8',
      title: 'Planning-history migration',
      resolution: '3 frozen plan files copied from `~/.claude/plans/` → `docs/planning-history/`; README index added. (Was: Question #9 in prior session draft, now resolved and renumbered.)',
      date: '2026-04-17',
    },
    {
      id: 'R9',
      title: 'v1 `active_tasks` + `task_steps` retirement path',
      resolution: 'SUPABASE-SPEC §6 locks "archive read-only." Schemas stay intact; REVOKE INSERT/UPDATE/DELETE runs in a later migration (`0002_archive_v1_tasks.sql`), not at CP4. Paperclip `tasks` / `agent_task_sessions` handle v2 task lifecycle. No drop, no dual-write. (Was: Question #11.)',
      date: '2026-04-18',
    },
    {
      id: 'R10',
      title: 'Autonomy-to-capital tier-mapping matrix',
      resolution: '*Resolved 2026-04-18 — 11:16 PM EDT (P1G-AUD-01 Block 2 design):* TIER-MATRIX designed in `docs/plan/dept-scan/aud-01-com-01-block2-design.md §1` — T0-T4 × decision/capital/asset-class/process; DEFCON ORANGE caps T2; RED freezes T0; code shape `tier_matrix.py` lookup + `enforce_tier_authority()` dec',
      date: '',
    },
    {
      id: 'R11',
      title: 'Safiya expansion timing',
      resolution: '*Resolved 2026-04-19 — 5:39 PM EDT (P1G-RSK-01 Block 2 §5 + charter §3); amended 2026-04-19 — 5:45 PM EDT per CEO directive on full-dept onboarding (`feedback_full_dept_onboarding.md`):* **Phase 2A activation = full 6-agent roster simultaneously** (Safiya + JRP-01 + JRP-02 + Yar + JF-01 + JF-02). No',
      date: '',
    },
  ],
  // SYNC:END

  // SYNC:BEGIN decisions
  decisions: [
    {
      id: 15,
      decision: 'Supabase v2 deployment — augment not rebuild',
      value: 'v2 shares the same Supabase project as v1 (`hrlkjsbhgeezilzyfjhm.supabase.co`). v2 tables land in a `v2` schema (or `v2_` prefix — exact naming resolves in SUPABASE-SPEC). v1 `agent_registry` (50 rows, live) is the input to Paperclip `agents` via mapping, not duplication. First v2 migration fixes v1\'s broken `task_cost_log` (referenced by code, table missing in PROD).',
      date: '2026-04-18',
    },
    {
      id: 14,
      decision: 'Bilingual substrate',
      value: 'v2 runs **TypeScript + Python** by design, not by accident. TS for the control plane (Paperclip + OpenAlice primitives). Python for the execution + employee layer (ClawTeam + OpenClaw + Hermes Agent + our existing `scripts/`). No single-language rewrite. No port of current Python scripts to TS.',
      date: '2026-04-18',
    },
    {
      id: 13,
      decision: 'Planning doc canonical home',
      value: '`docs/plan/` (active sections) + `docs/planning-history/` (frozen pre-PLAN.md plans), both under the v2 repo. Supersedes Constraint #10\'s `~/sankore-v2-planning/`.',
      date: '2026-04-17',
    },
    {
      id: 8,
      decision: 'CEO dashboard repo',
      value: '`VibeStartersCo/Novel-Idea` (exists, private, separate)',
      date: '2026-04-17',
    },
    {
      id: 7,
      decision: 'Firm runtime repo',
      value: '`VibeStartersCo/The-Sankore-Group-v2` (to create at P1G-FORK-01)',
      date: '2026-04-17',
    },
    {
      id: 6,
      decision: 'GitHub account',
      value: '`VibeStartersCo` (personal, distinct from v1\'s `Vibe-Starters-R-D`)',
      date: '2026-04-17',
    },
    {
      id: 12,
      decision: 'Eval reviewer (Phase 1g)',
      value: 'Kito (technical rigor + F18) + Marcus (strategic judgment), jointly, every Phase 1g sprint',
      date: '2026-04-16',
    },
    {
      id: 11,
      decision: 'Eval-Driven Sprints doctrine',
      value: 'Every sprint ships an eval spec (expected outcome, acceptance criteria, bad-work definition, measurement, reviewer) **before** spawn; v2 encodes this as a refuse-to-spawn code gate',
      date: '2026-04-16',
    },
    {
      id: 10,
      decision: 'MVP-Build target',
      value: 'Post-2026-05-01 (Osei + Eng team) — one department wired end-to-end, deliberately thin',
      date: '2026-04-16',
    },
    {
      id: 9,
      decision: 'MVP-Foundation target',
      value: '2026-04-20 (Osei solo) — configs, governance folder, personnel files in OpenClaw shape, Supabase schema aligned',
      date: '2026-04-16',
    },
    {
      id: 5,
      decision: 'Provider stack (5 first-class)',
      value: 'Claude + Kimi (MiniMax M2.7) + Gemma (local) + Perplexity + DeepSeek (local)',
      date: '2026-04-16',
    },
    {
      id: 4,
      decision: 'Tier-B/C corpus (26 repos)',
      value: 'Review sprint `P1G-TIER-BC-REVIEW-01` runs between MVP-Foundation and MVP-Build',
      date: '2026-04-16',
    },
    {
      id: 1,
      decision: 'Framework',
      value: 'Paperclip + ClawTeams hybrid + 9-repo study corpus',
      date: '2026-04-16',
    },
    {
      id: 3,
      decision: 'Incumbent port (code)',
      value: 'Hermes Agent — v1 `src/core/provider_router.py` only',
      date: '2026-04-11',
    },
  ],
  // SYNC:END

  // SYNC:BEGIN agentRoster
  agentRoster: {
    total: 33,
    personaShells: 165,
    note: '50 Paperclip seed rows + 250 OpenClaw persona shells (5 files × 50 agents) landed at CP3. 17 agents (11 python-legacy + 6 gemini) flagged for tier-remap in PROVIDER-AUTH-MATRIX per agent-roster-mapping.md §4.',
    departments: [
      { name: 'Research', count: 15 },
      { name: 'Trading Desk', count: 11 },
      { name: 'C-Suite', count: 7 },
      { name: 'Operations', count: 5 },
      { name: 'Engineering', count: 5 },
      { name: 'R&D', count: 4 },
      { name: 'Risk & Performance', count: 2 },
      { name: 'Governance / Audit', count: 1 },
    ],
    tierDistribution: [
      { tier: 'sonnet', count: 25 },
      { tier: 'opus', count: 8 },
    ],
  },
  // SYNC:END

  // SYNC:BEGIN governanceCounts
  governanceCounts: {
    constraintsLocked: 23,
    decisionsLocked: 15,
    openQuestionsTotal: 13,
    resolvedQuestionsTotal: 11,
  },
  // SYNC:END

  // SYNC:BEGIN blockProgress
  blockProgress: {
    'P1G-AUD-01': {
      block1: { openedAt: '', closedAt: '2026-04-18 — 11:02 PM EDT', file: 'aud-01-port-synthesis.md' },
      block2: { openedAt: '', closedAt: '2026-04-18 — 11:16 PM EDT', file: 'aud-01-com-01-block2-design.md' },
      block3: { openedAt: '', closedAt: '2026-04-18 — 11:52 PM EDT', file: 'aud-01-charter.md' },
    },
    'P1G-COM-01': {
      block1: { openedAt: '', closedAt: '2026-04-18 — 11:02 PM EDT', file: 'com-01-port-synthesis.md' },
      block3: { openedAt: '', closedAt: '2026-04-18 — 11:52 PM EDT', file: 'com-01-charter.md' },
    },
    'P1G-ENG-01': {
      block0: { openedAt: '', closedAt: '2026-04-19 — 12:58 AM EDT', file: 'foundation-01-synthesis-eng-touchpoints.md' },
      block1: { openedAt: '', closedAt: '2026-04-19 — 1:22 AM EDT', file: 'eng-01-port-synthesis.md' },
      block2: { openedAt: '', closedAt: '2026-04-19 — 1:50 AM EDT', file: 'eng-01-block2-design.md' },
      block3: { openedAt: '', closedAt: '2026-04-19 — 1:54 AM EDT', file: 'eng-01-charter.md' },
    },
    'P1G-RES-01': {
      block0: { openedAt: '', closedAt: '2026-04-19 — 2:24 AM EDT', file: 'foundation-01-synthesis-res-touchpoints.md' },
      block1: { openedAt: '', closedAt: '2026-04-19 — 2:41 AM EDT', file: 'res-01-port-synthesis.md' },
      block2: { openedAt: '', closedAt: '2026-04-19 — 2:45 AM EDT', file: 'res-01-block2-design.md' },
      block3: { openedAt: '2026-04-19 — 2:50 AM EDT', closedAt: '2026-04-19 — 2:54 AM EDT', file: 'res-01-charter.md' },
    },
    'P1G-RSK-01': {
      block0: { openedAt: '2026-04-19 — 5:17 PM EDT', closedAt: '2026-04-19 — 5:23 PM EDT', file: 'foundation-01-synthesis-rsk-touchpoints.md' },
      block1: { openedAt: '2026-04-19 — 5:30 PM EDT', closedAt: '2026-04-19 — 5:33 PM EDT', file: 'rsk-01-port-synthesis.md' },
      block2: { openedAt: '2026-04-19 — 5:34 PM EDT', closedAt: '2026-04-19 — 5:36 PM EDT', file: 'rsk-01-block2-design.md' },
      block3: { openedAt: '2026-04-19 — 5:37 PM EDT', closedAt: '2026-04-19 — 5:39 PM EDT', file: 'rsk-01-charter.md' },
    },
    'P1G-SCAN-01': {
      block0: { openedAt: '', closedAt: '2026-04-18 — 10:52 PM EDT', file: 'foundation-01-synthesis.md' },
    },
    'P1G-TRD-01': {
      block0: { openedAt: '2026-04-19 — 3:14 AM EDT', closedAt: '2026-04-19 — 3:22 AM EDT', file: 'foundation-01-synthesis-trd-touchpoints.md' },
      block1: { openedAt: '2026-04-19 — 3:22 AM EDT', closedAt: '2026-04-19 — 3:25 AM EDT', file: 'trd-01-port-synthesis.md' },
      block2: { openedAt: '2026-04-19 — 3:25 AM EDT', closedAt: '2026-04-19 — 3:27 AM EDT', file: 'trd-01-block2-design.md' },
      block3: { openedAt: '2026-04-19 — 3:27 AM EDT', closedAt: '2026-04-19 — 3:35 AM EDT', file: 'trd-01-charter.md' },
    },
  },
  // SYNC:END

  // SYNC:BEGIN hardCarryIns
  hardCarryIns: [
    { id: 'CARRY-IN', description: 'SHIPS IN SPRINT — by 2026-05-03', deadline: '2026-05-03', daysRemaining: 14, blockingSprint: 'P1G-TRD-01', status: 'OPEN' },
  ],
  // SYNC:END

  // SYNC:BEGIN patternCatalog
  patternCatalog: {
    total: 18,
    nominations: [
      { id: 1, title: 'Janus-shape softmax weighting (cohort-based meta-weighting)', sourceSprint: 'P1G-AUD-01', status: 'cataloged' },
      { id: 2, title: 'SCHEMA-GATE dual-clearance pre-commit pattern', sourceSprint: 'P1G-AUD-01', status: 'cataloged' },
      { id: 3, title: 'Standard 1100 8-point audit checklist (frontmatter + Canon refs + doc_home + gate-status)', sourceSprint: 'P1G-AUD-01', status: 'cataloged' },
      { id: 4, title: 'Trust Ladder × DEFCON multiplier interaction', sourceSprint: 'P1G-AUD-01', status: 'cataloged' },
      { id: 5, title: 'OT-044 reciprocal independence-pair pattern (forward + reverse reviewer)', sourceSprint: 'P1G-AUD-01', status: 'cataloged' },
      { id: 6, title: 'Both-must-CLEAR overlap default (capital × compliance scope-conflict resolution)', sourceSprint: 'P1G-COM-01', status: 'cataloged' },
      { id: 7, title: 'Adversarial 4-condition production gate', sourceSprint: 'P1G-ENG-01', status: 'nominated' },
      { id: 8, title: 'Versioned prompt library with performance-scoring gate', sourceSprint: 'P1G-ENG-01', status: 'nominated' },
      { id: 9, title: 'Capability-gate + trust-gate dual requirement', sourceSprint: 'P1G-ENG-01', status: 'nominated' },
      { id: 10, title: 'Dual-report with theme-novelty branching', sourceSprint: 'P1G-RES-01', status: 'nominated' },
      { id: 11, title: 'Fan-out with per-consumer pre-filter', sourceSprint: 'P1G-RES-01', status: 'nominated' },
      { id: 12, title: 'Offline BM25 learnings memory with cold-start JSON persistence', sourceSprint: 'P1G-RES-01', status: 'nominated' },
      { id: 14, title: 'Dangerous-flag + error-category envelope on destructive ops', sourceSprint: 'P1G-TRD-01', status: 'nominated' },
      { id: 15, title: 'Halt-wins asymmetric authority via co-located Risk-Pool gate in execution orchestrator', sourceSprint: 'P1G-TRD-01', status: 'nominated' },
      { id: 16, title: 'Paper/live dual-mode at command-shape level (surface split)', sourceSprint: 'P1G-TRD-01', status: 'nominated' },
      { id: 17, title: 'DEFCON × F5 × halt-flag composite runtime gate with ordering semantics', sourceSprint: 'P1G-RSK-01', status: 'cataloged' },
      { id: 18, title: 'Bootstrap-significance advancement gate (lab→shadow→prod stage-gating)', sourceSprint: 'P1G-RSK-01', status: 'cataloged' },
      { id: 19, title: 'Correlation-spike conservative-prior policy (stress-correlation floor by regime)', sourceSprint: 'P1G-RSK-01', status: 'cataloged' },
    ],
  },
  // SYNC:END

  // SYNC:BEGIN modelVersions
  modelVersions: {
    currentCeiling: 'claude-opus-4-7 (1M context)',
    landedDate: '2026-04-19',
    priorCeilingRefs: 29,
    lagNote: 'Canon references claude-opus-4-6 in 29 locations across dept-scan/; ceiling is claude-opus-4-7 — 1-release lag. Re-baseline tracked in open-Q #16.',
  },
  // SYNC:END
};
