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
}

export const firmState: FirmState = {
  // SYNC:BEGIN lastUpdated
  lastUpdated: '2026-04-18',
  // SYNC:END
  // SYNC:BEGIN phase
  phase: 'Phase 1g — P1G-SCAN-01 in progress (7/9 readouts filed)',
  // SYNC:END
  // SYNC:BEGIN nextMilestone
  nextMilestone: 'P1G-SCAN-01 (8-department structural scan)',
  // SYNC:END

  mvpFoundation: {
    targetDate: '2026-04-20',
    gateStatus: 'cleared',
    gateClearedDate: '2026-04-18',
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
        title: '8-department structural scan',
        status: 'open',
        owner: 'Marcus (CEO, strategic) + Osei (Claude, structural coherence) — joint 1–2 session review',
        summary: 'Inserted 2026-04-18 per CEO direction: before any Phase 1g dept deep-dive launches, run a cross-dept scan so each charter is written with inter-dept context, not in isolation. Pre-work already done: all 9 v1 dept-head...',
      },
      {
        id: 'P1G-ENG-01',
        dept: 'Engineering',
        title: 'Engineering dept deep-dive',
        status: 'queued',
        owner: 'Osei (leads) + Sekou (engages at this sprint)',
        summary: '---',
      },
      {
        id: 'P1G-AUD-01',
        dept: 'Audit',
        title: 'hook note',
        status: 'stub',
        owner: 'TBD',
        summary: 'Audit dept deep-dive will spec the **doc-home orphan-audit cadence**:',
      },
      {
        id: 'P1G-RES-01',
        dept: 'Research',
        title: 'Research Dept Charter + 18-persona pattern extraction from `virattt/ai-hedge-fund` + `TradingAgents`',
        status: 'stub',
        owner: 'TBD',
        summary: 'Research Dept Charter + 18-persona pattern extraction from `virattt/ai-hedge-fund` + `TradingAgents`',
      },
      {
        id: 'P1G-TRD-01',
        dept: 'Trading Desk',
        title: 'Trading Dept Charter + execution-adapter selection from `Kraken CLI` + `Open-Finance/AgenticTrading`',
        status: 'stub',
        owner: 'TBD',
        summary: 'Trading Dept Charter + execution-adapter selection from `Kraken CLI` + `Open-Finance/AgenticTrading`',
      },
      {
        id: 'P1G-RSK-01',
        dept: 'Risk & Performance',
        title: 'Risk Dept Charter + position-sizing backtest scaffold using `FinGPT` + `ATLAS`',
        status: 'stub',
        owner: 'TBD',
        summary: 'Risk Dept Charter + position-sizing backtest scaffold using `FinGPT` + `ATLAS`',
      },
      {
        id: 'P1G-CIO-01',
        dept: 'CIO Roundtable',
        title: 'Roundtable Charter + decision-ceremony primitive from `TradingAgents` + `ATLAS` + `virattt`',
        status: 'stub',
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
        title: 'Compliance Charter (Nkechi) + SEC readiness + F18 external-regulatory enforcement',
        status: 'stub',
        owner: 'TBD',
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

  artifacts: [
    { id: 1, tier: 'T1', name: 'PRJ-CHARTER', purpose: 'Vision, scope, Monday MVP slice, success criteria, stakeholders', audience: 'CEO', status: 'pending' },
    { id: 2, tier: 'T1', name: 'MONDAY-MVP-PRD', purpose: 'The Apr 20 MVP-Foundation slice — agents, data paths, reports', audience: 'CEO', status: 'pending' },
    { id: 3, tier: 'T1', name: 'ARCH-PRD', purpose: 'Runtime architecture — Paperclip + ClawTeams decomposition + daemon-is-code', audience: 'Sekou, Kito', status: 'pending' },
    { id: 4, tier: 'T1', name: 'SUPABASE-SPEC', purpose: 'DB inventory + v2 schema decision + migration policy', audience: 'Sekou, Safiya', status: 'drafted', home: 'docs/plan/supabase-spec.md (CEO-locked §4/§5/§6 2026-04-18)' },
    { id: 5, tier: 'T1', name: 'PROVIDER-AUTH-MATRIX', purpose: '48 agents × 5 providers × task-class authorization', audience: 'All agents', status: 'pending' },
    { id: 6, tier: 'T2', name: 'AGENT-BUNDLE-SPEC', purpose: 'OpenClaw 6-file identity-bundle template', audience: 'Every agent', status: 'pending' },
    { id: 7, tier: 'T2', name: 'SKILL-TEMPLATE', purpose: 'SK-[DEPT]-[NAME] skill format with anti-rationalization table', audience: 'Every agent', status: 'pending' },
    { id: 8, tier: 'T2', name: 'OBSERVABILITY-SPEC', purpose: 'ADL / CoTT / FET / DPL / Audit Trail schemas + OTLP export', audience: 'Kito, Safiya', status: 'pending' },
    { id: 9, tier: 'T2', name: 'COST-GOVERNOR-SPEC', purpose: 'Per-agent budgets, kill-switch thresholds, cost-watcher rules', audience: 'Safiya, Amara', status: 'pending' },
    { id: 10, tier: 'T3', name: 'DEPLOYMENT-RUNBOOK', purpose: 'Local dev + future Mac Studio SSH daemon setup', audience: 'Sekou', status: 'pending' },
    { id: 11, tier: 'T3', name: 'OT-216-DIAGNOSTIC', purpose: "Side fix for Marcus's fresh-Claude-Code-session auth errors", audience: 'Sekou', status: 'pending' },
    { id: 12, tier: 'T3', name: 'SECURITY-BASELINE', purpose: 'Secrets handling, RLS policy, audit surface, least-privilege principles', audience: 'Safiya, Kito', status: 'pending' },
    { id: 13, tier: 'TK', name: 'FIRM-TODO.md', purpose: 'Canonical task list — replaces memory for task state', audience: 'All + CEO', status: 'pending' },
  ],

  openQuestions: [
    { id: 1, title: 'Gemma 3 vs Gemma 4 — which open-weights tier ships with v2', resolvesIn: 'PROVIDER-AUTH-MATRIX', owner: 'Sekou', blocks: 'MVP-Build provider config' },
    { id: 2, title: 'Notion in or out of the v2 stack', resolvesIn: 'PRJ-CHARTER', owner: 'Marcus + Osei', blocks: 'PRJ-CHARTER completion' },
    { id: 3, title: 'OT-218 Anthropic API key refresh (intermittent auth-fail)', resolvesIn: 'OT-216-DIAGNOSTIC', owner: 'Sekou', blocks: 'None — parallel side-fix' },
    { id: 4, title: 'Safiya-Risk expansion timing (solo → full dept)', resolvesIn: 'PRJ-CHARTER + P1G-RSK-01', owner: 'Marcus + Safiya', blocks: 'Risk charter wiring' },
    { id: 5, title: 'May 1 cliff management — Tau probation + F7 auto-SUSPEND + Phase 1g cadence land together', resolvesIn: 'PRJ-CHARTER + changelog entry', owner: 'Marcus + Osei', blocks: 'MVP-Build start date' },
    { id: 6, title: 'Options / Greeks / dynamic hedging coverage gap (no repo covers it)', resolvesIn: 'Phase 2 external sourcing sprint', owner: 'Tariq', blocks: 'Trading dept scope beyond spot/futures' },
    { id: 7, title: 'Knowledge consolidation scope (v1 Best Practices / Dept / Lessons / Policy / Handbook)', resolvesIn: 'Phase 2 pre-rebuild initiative', owner: 'Kito + Marcus', blocks: 'Phase 2 governance surface' },
    { id: 8, title: 'Tier-B/C review trigger criterion', resolvesIn: 'P1G-SYN-01', owner: 'Osei + Marcus', blocks: 'Tier-B/C sprint open condition' },
    { id: 9, title: 'Phase 2 reference-expand candidates (addyosmani/agent-skills + JuliusBrussee/caveman)', resolvesIn: 'P2-REF-EXPAND-01 (Phase 2)', owner: 'Osei + Marcus', blocks: 'None — Phase 2-forward' },
    { id: 10, title: 'Nous Hermes Agent as employee runtime for non-trading agents', resolvesIn: 'P1G-ENG-01 + P1G-TRD-01', owner: 'Sekou + Marcus', blocks: 'Per-agent runtime selection at adapter layer' },
  ],

  resolvedQuestions: [
    { id: 'R1', title: 'v2 folder path', resolution: 'Canonical at ~/Desktop/AI Coding/Business/The Sankore Group/', date: '2026-04-17' },
    { id: 'R2', title: 'SwarmClaw vs Paperclip vs hybrid substrate', resolution: 'Paperclip + ClawTeams hybrid (Decision #1)', date: '2026-04-16' },
    { id: 'R3', title: 'GitHub account scope', resolution: 'New account VibeStartersCo (Decision #6)', date: '2026-04-17' },
    { id: 'R4', title: 'Planning artifact folder home', resolution: 'docs/plan/ + docs/planning-history/ under v2 repo (Decision #13)', date: '2026-04-17' },
    { id: 'R5', title: 'Supabase credentials location', resolution: '.env in existing Sankore repo (Constraint #12)', date: '2026-04-17' },
    { id: 'R6', title: 'Dual-track existing-firm stabilization', resolution: 'Dropped — single-track clean v2 build (Constraint #3)', date: '2026-04-17' },
    { id: 'R7', title: 'MVP deadline', resolution: 'Apr 20 = Foundation (structural); MVP-Build = post-May-1 (runtime). Decisions #9/#10', date: '2026-04-17' },
    { id: 'R8', title: 'Planning-history migration', resolution: '3 frozen plan files copied → docs/planning-history/ with README index', date: '2026-04-17' },
    { id: 'R9', title: 'v1 active_tasks + task_steps retirement path', resolution: 'Archive read-only (SUPABASE-SPEC §6). REVOKE in migration 0002', date: '2026-04-18' },
  ],

  decisions: [
    { id: 15, decision: 'Supabase v2 — augment not rebuild', value: 'Share v1 Supabase project; v2 tables in v2 schema; fix v1 task_cost_log first', date: '2026-04-18' },
    { id: 14, decision: 'Bilingual substrate', value: 'TS control plane (Paperclip/OpenAlice) + Python execution/employee (ClawTeam/OpenClaw/Hermes)', date: '2026-04-18' },
    { id: 13, decision: 'Planning doc home', value: 'docs/plan/ active + docs/planning-history/ frozen', date: '2026-04-17' },
    { id: 11, decision: 'Eval-Driven Sprints doctrine', value: 'Every sprint ships 8-field eval spec before spawn; refuse-to-spawn code gate', date: '2026-04-16' },
    { id: 10, decision: 'MVP-Build target', value: 'Post-2026-05-01 (Osei + Eng team) — one dept end-to-end, deliberately thin', date: '2026-04-16' },
    { id: 9, decision: 'MVP-Foundation target', value: '2026-04-20 Osei solo — configs, governance folder, personnel files, Supabase schema aligned', date: '2026-04-16' },
    { id: 5, decision: 'Provider stack (5 first-class)', value: 'Claude + Kimi (MiniMax M2.7) + Gemma (local) + Perplexity + DeepSeek (local)', date: '2026-04-16' },
    { id: 1, decision: 'Framework', value: 'Paperclip + ClawTeams hybrid + 9-repo study corpus (amended to 11 on 2026-04-18)', date: '2026-04-16' },
  ],

  agentRoster: {
    total: 50,
    personaShells: 250,
    note: '50 Paperclip seed rows + 250 OpenClaw persona shells (5 files × 50 agents) landed at CP3. Dept counts reflect v1 seed classification as-is — P1G-SCAN-01 may recommend reclassifying CIO-roundtable satellites (Jelani/Chike/Zuberi currently under Research) into a separate CIO sub-unit, and Nkechi (CCLO) into her own Compliance & Legal dept. 17 agents (11 python-legacy + 6 gemini) flagged for tier-remap in PROVIDER-AUTH-MATRIX.',
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
      { tier: 'python (legacy)', count: 11 },
      { tier: 'opus', count: 8 },
      { tier: 'gemini (flagged)', count: 6 },
    ],
  },

  // SYNC:BEGIN governanceCounts
  governanceCounts: {
    constraintsLocked: 23,
    decisionsLocked: 15,
    openQuestionsTotal: 10,
    resolvedQuestionsTotal: 9,
  },
  // SYNC:END
};
