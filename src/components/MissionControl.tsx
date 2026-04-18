import React from 'react';
import {
  Target,
  CheckCircle2,
  Clock,
  AlertCircle,
  Users,
  GitBranch,
  FileText,
  HelpCircle,
  Lock,
} from 'lucide-react';
import { firmState, type Sprint, type Artifact } from '../data/sankore-state';

const sprintBadge = (status: Sprint['status']): string => {
  switch (status) {
    case 'closed-passed':
      return 'bg-green-500/20 text-green-400 border-green-500/40';
    case 'queued':
      return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
    case 'open':
      return 'bg-orange-500/20 text-orange-400 border-orange-500/40';
    case 'reopened':
      return 'bg-red-500/20 text-red-400 border-red-500/40';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/40';
  }
};

const sprintLabel = (status: Sprint['status']): string => {
  switch (status) {
    case 'closed-passed':
      return 'CLOSED — PASSED';
    case 'queued':
      return 'QUEUED';
    case 'open':
      return 'OPEN';
    case 'reopened':
      return 'REOPENED';
    default:
      return 'STUB';
  }
};

const artifactBadge = (status: Artifact['status']): string => {
  switch (status) {
    case 'drafted':
      return 'bg-green-500/20 text-green-400 border-green-500/40';
    case 'in-flight':
      return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/40';
  }
};

const tierLabel: Record<string, string> = {
  T1: 'Tier 1 — Pre-build (required before MVP-Build)',
  T2: 'Tier 2 — Co-build (early MVP-Build)',
  T3: 'Tier 3 — Operational / parallel',
  TK: 'Continuous tracker',
};

export default function MissionControl() {
  const {
    lastUpdated,
    phase,
    nextMilestone,
    mvpFoundation,
    phase1g,
    artifacts,
    openQuestions,
    resolvedQuestions,
    decisions,
    agentRoster,
    governanceCounts,
  } = firmState;

  const groupedArtifacts = artifacts.reduce<Record<string, Artifact[]>>((acc, a) => {
    (acc[a.tier] = acc[a.tier] || []).push(a);
    return acc;
  }, {});
  const tierOrder = ['T1', 'T2', 'T3', 'TK'];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <Target className="w-7 h-7 text-[#F27D26]" />
          <h1 className="text-3xl font-bold text-white tracking-tight">Mission Control</h1>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
          <span className="text-gray-500">
            Last updated:{' '}
            <span className="text-gray-300 font-mono">{lastUpdated}</span>
          </span>
          <span className="text-gray-500">
            Phase: <span className="text-[#F27D26] font-medium">{phase}</span>
          </span>
          <span className="text-gray-500">
            Next: <span className="text-gray-300">{nextMilestone}</span>
          </span>
        </div>
      </div>

      {/* Concept-view notice */}
      <div className="bg-amber-900/20 border border-amber-600/40 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-amber-400 font-mono uppercase tracking-wider text-xs mb-1">
              Hand-curated snapshot
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              This surface is updated manually at CEO exit-gates and session debriefs. Live
              Supabase wiring lands in Phase 2A. The <span className="text-gray-200 font-medium">Strategy Document</span>, <span className="text-gray-200 font-medium">Risk Dashboard</span>, and <span className="text-gray-200 font-medium">Agent Training Matrix</span> tabs below are{' '}
              <span className="text-amber-300 font-medium">concept artifacts from the original
              vision</span> — preserved unchanged, held for reactivation with live data once
              the full firm is operational.
            </p>
          </div>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <KpiTile
          label="Constraints locked"
          value={governanceCounts.constraintsLocked}
          icon={<Lock size={16} />}
        />
        <KpiTile
          label="Decisions locked"
          value={governanceCounts.decisionsLocked}
          icon={<CheckCircle2 size={16} />}
        />
        <KpiTile
          label="Open questions"
          value={governanceCounts.openQuestionsTotal}
          icon={<HelpCircle size={16} />}
          accent
        />
        <KpiTile
          label="Resolved"
          value={governanceCounts.resolvedQuestionsTotal}
          icon={<CheckCircle2 size={16} />}
        />
        <KpiTile
          label="Agents seeded"
          value={agentRoster.total}
          icon={<Users size={16} />}
        />
      </div>

      {/* Section 1 — MVP-Foundation */}
      <section className="bg-[#111] border border-[#333] rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-mono uppercase tracking-wider text-gray-400 text-sm flex items-center gap-2">
            <FileText size={16} className="text-[#F27D26]" /> MVP-Foundation — target {mvpFoundation.targetDate}
          </h2>
          {mvpFoundation.gateStatus === 'cleared' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border bg-green-500/20 text-green-400 border-green-500/40">
              <CheckCircle2 size={12} /> GATE CLEARED {mvpFoundation.gateClearedDate}
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mvpFoundation.checkpoints.map((cp) => (
            <div key={cp.id} className="bg-[#0a0a0a] border border-[#222] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#F27D26] tracking-widest">{cp.id}</span>
                  <span className="text-sm text-white font-semibold">{cp.title}</span>
                </div>
                {cp.status === 'approved' && (
                  <CheckCircle2 size={16} className="text-green-400" />
                )}
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-2">{cp.description}</p>
              {cp.approvedDate && (
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                  Approved {cp.approvedDate}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Section 2 — Phase 1g sprint queue */}
      <section className="bg-[#111] border border-[#333] rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-mono uppercase tracking-wider text-gray-400 text-sm flex items-center gap-2">
            <GitBranch size={16} className="text-[#F27D26]" /> Phase 1g sprint queue
          </h2>
          <span className="text-xs font-mono text-gray-500">
            window {phase1g.windowOpens} → {phase1g.windowCloses}
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0a0a0a] border-b border-[#333]">
                <th className="p-3 text-[10px] font-mono text-gray-500 uppercase tracking-wider">Sprint</th>
                <th className="p-3 text-[10px] font-mono text-gray-500 uppercase tracking-wider">Dept</th>
                <th className="p-3 text-[10px] font-mono text-gray-500 uppercase tracking-wider">Deliverable</th>
                <th className="p-3 text-[10px] font-mono text-gray-500 uppercase tracking-wider">Owner</th>
                <th className="p-3 text-[10px] font-mono text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222]">
              {phase1g.sprints.map((s) => (
                <tr key={s.id} className="hover:bg-[#1a1a1a] transition-colors">
                  <td className="p-3 text-xs font-mono text-gray-300 whitespace-nowrap">{s.id}</td>
                  <td className="p-3 text-xs text-gray-400 whitespace-nowrap">{s.dept}</td>
                  <td className="p-3 text-xs text-gray-200">
                    <div className="font-medium">{s.title}</div>
                    <div className="text-[11px] text-gray-500 mt-0.5 leading-snug">{s.summary}</div>
                  </td>
                  <td className="p-3 text-xs text-gray-400 whitespace-nowrap">{s.owner}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-bold border tracking-wider ${sprintBadge(
                        s.status,
                      )}`}
                    >
                      {sprintLabel(s.status)}
                    </span>
                    {s.closeDate && (
                      <div className="text-[10px] font-mono text-gray-500 mt-1">{s.closeDate}</div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3 — Artifacts */}
      <section className="bg-[#111] border border-[#333] rounded-xl p-5">
        <h2 className="font-mono uppercase tracking-wider text-gray-400 text-sm mb-4 flex items-center gap-2">
          <FileText size={16} className="text-[#F27D26]" /> Artifact catalog ({artifacts.length} — capped at 12 + 1 tracker)
        </h2>
        <div className="space-y-4">
          {tierOrder
            .filter((tier) => groupedArtifacts[tier])
            .map((tier) => (
              <div key={tier}>
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-2">
                  {tierLabel[tier]}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {groupedArtifacts[tier].map((a) => (
                    <div
                      key={a.id}
                      className="bg-[#0a0a0a] border border-[#222] rounded-lg p-3 flex items-start justify-between gap-3"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-mono text-white font-semibold">{a.name}</div>
                        <div className="text-xs text-gray-400 leading-snug mt-0.5">{a.purpose}</div>
                        <div className="text-[10px] font-mono text-gray-500 mt-1">audience: {a.audience}</div>
                        {a.home && (
                          <div className="text-[10px] font-mono text-green-500/70 mt-1 truncate" title={a.home}>
                            {a.home}
                          </div>
                        )}
                      </div>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border tracking-wider shrink-0 ${artifactBadge(
                          a.status,
                        )}`}
                      >
                        {a.status.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* Section 4 — Questions */}
      <section className="bg-[#111] border border-[#333] rounded-xl p-5">
        <h2 className="font-mono uppercase tracking-wider text-gray-400 text-sm mb-4 flex items-center gap-2">
          <HelpCircle size={16} className="text-[#F27D26]" /> Open questions ({openQuestions.length})
        </h2>
        <div className="space-y-2">
          {openQuestions.map((q) => (
            <div
              key={q.id}
              className="bg-[#0a0a0a] border border-[#222] rounded-lg p-3 flex items-start gap-3"
            >
              <span className="font-mono text-[10px] text-[#F27D26] uppercase tracking-widest mt-1 shrink-0">
                Q#{q.id}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm text-gray-200 leading-snug">{q.title}</div>
                <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-[11px] font-mono text-gray-500 mt-1">
                  <span>resolves in: <span className="text-gray-400">{q.resolvesIn}</span></span>
                  <span>owner: <span className="text-gray-400">{q.owner}</span></span>
                  <span>blocks: <span className="text-gray-400">{q.blocks}</span></span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <details className="mt-4 text-sm text-gray-400 cursor-pointer">
          <summary className="font-mono uppercase tracking-wider text-xs text-gray-500 hover:text-gray-300">
            Resolved ({resolvedQuestions.length}) — audit trail
          </summary>
          <div className="mt-3 space-y-1.5">
            {resolvedQuestions.map((r) => (
              <div key={r.id} className="text-xs flex gap-3 items-start">
                <span className="font-mono text-[10px] text-green-500/70 mt-0.5 shrink-0">{r.id}</span>
                <div className="min-w-0">
                  <span className="text-gray-300">{r.title}</span>
                  <span className="text-gray-500"> — {r.resolution}</span>
                  <span className="text-gray-600 font-mono ml-2">({r.date})</span>
                </div>
              </div>
            ))}
          </div>
        </details>
      </section>

      {/* Section 5 — Agent roster */}
      <section className="bg-[#111] border border-[#333] rounded-xl p-5">
        <h2 className="font-mono uppercase tracking-wider text-gray-400 text-sm mb-4 flex items-center gap-2">
          <Users size={16} className="text-[#F27D26]" /> Agent roster — {agentRoster.total} seeded, {agentRoster.personaShells} persona shells
        </h2>
        <p className="text-xs text-gray-400 mb-4 leading-relaxed">{agentRoster.note}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-2">By department</div>
            <div className="flex flex-wrap gap-2">
              {agentRoster.departments.map((d) => (
                <span
                  key={d.name}
                  className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0a0a0a] border border-[#222] text-xs"
                >
                  <span className="text-gray-300">{d.name}</span>
                  <span className="text-[#F27D26] font-mono font-semibold">{d.count}</span>
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-2">By model tier</div>
            <div className="flex flex-wrap gap-2">
              {agentRoster.tierDistribution.map((t) => (
                <span
                  key={t.tier}
                  className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0a0a0a] border border-[#222] text-xs"
                >
                  <span className="text-gray-300">{t.tier}</span>
                  <span className="text-[#F27D26] font-mono font-semibold">{t.count}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 6 — Decisions */}
      <section className="bg-[#111] border border-[#333] rounded-xl p-5">
        <h2 className="font-mono uppercase tracking-wider text-gray-400 text-sm mb-4 flex items-center gap-2">
          <Clock size={16} className="text-[#F27D26]" /> Recent locked decisions
        </h2>
        <div className="space-y-2">
          {decisions.slice(0, 8).map((d) => (
            <div
              key={d.id}
              className="bg-[#0a0a0a] border border-[#222] rounded-lg p-3 flex items-start gap-3"
            >
              <span className="font-mono text-[10px] text-[#F27D26] uppercase tracking-widest mt-1 shrink-0">
                #{d.id}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm text-white font-semibold">{d.decision}</div>
                <div className="text-xs text-gray-400 mt-0.5 leading-snug">{d.value}</div>
              </div>
              <span className="font-mono text-[10px] text-gray-500 tracking-wider mt-1 shrink-0">
                {d.date}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

interface KpiTileProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  accent?: boolean;
}

function KpiTile({ label, value, icon, accent }: KpiTileProps) {
  return (
    <div
      className={`bg-[#111] border rounded-xl p-3 ${
        accent ? 'border-[#F27D26]/40' : 'border-[#333]'
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">{label}</span>
        <span className={accent ? 'text-[#F27D26]' : 'text-gray-500'}>{icon}</span>
      </div>
      <div className={`text-2xl font-mono font-bold ${accent ? 'text-[#F27D26]' : 'text-white'}`}>
        {value}
      </div>
    </div>
  );
}
