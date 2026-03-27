import React from 'react';
import { BookOpen, BrainCircuit, RefreshCw, Target, MessageSquare, TrendingUp, ShieldAlert, Award, ArrowRight, Activity, CheckCircle2, PlayCircle, Clock, Check } from 'lucide-react';

const curriculum = [
  {
    phase: 'Phase 1: Core Competency',
    title: 'Market Analysis & Thesis Alignment',
    icon: <TrendingUp className="text-blue-400" />,
    topics: [
      '5-Wave Macro Thesis Interpretation',
      'Regime A vs. Regime B Identification',
      'Cross-Asset Correlation Analysis',
      'Earnings Transcript Sentiment Extraction'
    ],
    status: 'Completed'
  },
  {
    phase: 'Phase 2: Defensive Posture',
    title: 'Risk Assessment & Mitigation',
    icon: <ShieldAlert className="text-yellow-400" />,
    topics: [
      'DEFCON Level Triggers & Constraints',
      'Shadow Performance Tracking (JRP-01)',
      'Anomaly Detection (3 Std Dev Volume)',
      'Pre-Conflict Qualitative Scoring'
    ],
    status: 'Active'
  },
  {
    phase: 'Phase 3: Synthesis',
    title: 'Communication & Roundtable Debate',
    icon: <MessageSquare className="text-green-400" />,
    topics: [
      'Bull vs. Bear Dialectic Framework',
      'Quant Synthesis Formatting',
      'Confidence Scoring & Calibration',
      'Executive Summary Generation'
    ],
    status: 'Upcoming'
  }
];

const agentPerformance = [
  { id: 'JR-10', role: 'Earnings Lead', weight: 1.15, trend: 'up', accuracy: '92%' },
  { id: 'JW-01', role: 'NAV Tracker', weight: 1.05, trend: 'up', accuracy: '88%' },
  { id: 'JRP-01', role: 'Shadow Tracker', weight: 1.00, trend: 'flat', accuracy: '85%' },
  { id: 'JD-03', role: 'Conflict Intel', weight: 0.95, trend: 'down', accuracy: '78%' },
  { id: 'JE-02', role: 'DB Architect', weight: 1.10, trend: 'up', accuracy: '95%' },
];

export default function AgentTraining() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="bg-[#111] border border-[#333] rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="flex items-center gap-3 mb-2">
          <BrainCircuit className="text-blue-500" size={28} />
          <h2 className="text-2xl font-bold text-white">Agent Training & Adaptation Module</h2>
        </div>
        <p className="text-gray-400 max-w-2xl">
          Continuous learning curriculum and Darwinian weight adjustment system for the 48-agent swarm. 
          Agents learn from past interactions, rejected trades, and audit feedback.
        </p>
      </div>

      {/* Feedback Loop Visualization */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <RefreshCw className="text-[#F27D26]" /> Continuous Feedback Loop
        </h3>
        <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-[#222] -z-10 -translate-y-1/2"></div>
            
            {/* Step 1 */}
            <div className="bg-[#111] border border-[#333] rounded-lg p-4 w-full md:w-1/4 relative z-10 text-center">
              <div className="w-10 h-10 mx-auto bg-blue-500/20 text-blue-500 rounded-full flex items-center justify-center mb-3">
                <Target size={20} />
              </div>
              <h4 className="text-white font-medium mb-1">1. Action & Output</h4>
              <p className="text-xs text-gray-500">Agent generates analysis, trade proposal, or code.</p>
            </div>

            <ArrowRight className="hidden md:block text-gray-600 shrink-0" />

            {/* Step 2 */}
            <div className="bg-[#111] border border-[#333] rounded-lg p-4 w-full md:w-1/4 relative z-10 text-center">
              <div className="w-10 h-10 mx-auto bg-yellow-500/20 text-yellow-500 rounded-full flex items-center justify-center mb-3">
                <Activity size={20} />
              </div>
              <h4 className="text-white font-medium mb-1">2. Shadow Tracking</h4>
              <p className="text-xs text-gray-500">JRP-01 tracks rejected proposals vs market reality.</p>
            </div>

            <ArrowRight className="hidden md:block text-gray-600 shrink-0" />

            {/* Step 3 */}
            <div className="bg-[#111] border border-[#333] rounded-lg p-4 w-full md:w-1/4 relative z-10 text-center">
              <div className="w-10 h-10 mx-auto bg-purple-500/20 text-purple-500 rounded-full flex items-center justify-center mb-3">
                <Award size={20} />
              </div>
              <h4 className="text-white font-medium mb-1">3. Kito Audit</h4>
              <p className="text-xs text-gray-500">Monthly pulse check on data quality and logic.</p>
            </div>

            <ArrowRight className="hidden md:block text-gray-600 shrink-0" />

            {/* Step 4 */}
            <div className="bg-[#111] border border-[#F27D26] rounded-lg p-4 w-full md:w-1/4 relative z-10 text-center shadow-[0_0_15px_rgba(242,125,38,0.1)]">
              <div className="w-10 h-10 mx-auto bg-[#F27D26]/20 text-[#F27D26] rounded-full flex items-center justify-center mb-3">
                <RefreshCw size={20} />
              </div>
              <h4 className="text-white font-medium mb-1">4. Weight Adjustment</h4>
              <p className="text-xs text-gray-500">Darwinian system updates agent influence score.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Curriculum Outline */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="text-[#F27D26]" /> Training Curriculum
          </h3>
          {curriculum.map((module, idx) => (
            <div key={idx} className="bg-[#111] border border-[#333] rounded-xl p-5 flex gap-4 transition-all hover:border-[#444]">
              <div className="mt-1 bg-[#0a0a0a] p-2 rounded-lg border border-[#222] h-fit">
                {module.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <div className="text-xs font-mono text-gray-500 uppercase tracking-wider">{module.phase}</div>
                  <span className={`flex items-center gap-1 text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                    module.status === 'Completed'
                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      : module.status === 'Active' 
                      ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                      : 'bg-gray-800 text-gray-400 border-gray-700'
                  }`}>
                    {module.status === 'Completed' && <CheckCircle2 size={10} />}
                    {module.status === 'Active' && <PlayCircle size={10} />}
                    {module.status === 'Upcoming' && <Clock size={10} />}
                    {module.status}
                  </span>
                </div>
                <h4 className="text-lg font-medium text-white mb-3">{module.title}</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                  {module.topics.map((topic, tIdx) => (
                    <li key={tIdx} className="text-sm text-gray-300 flex items-start gap-2 bg-[#1a1a1a] p-2.5 rounded-md border border-[#222]">
                      <Check size={16} className="text-[#F27D26] shrink-0 mt-0.5" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Darwinian Weights Leaderboard */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="text-[#F27D26]" /> Darwinian Weights Leaderboard
          </h3>
          <div className="bg-[#111] border border-[#333] rounded-xl overflow-hidden">
            <div className="p-4 border-b border-[#222] bg-[#0a0a0a]">
              <p className="text-xs text-gray-500">
                Agent influence scores based on historical accuracy. Weights &gt; 1.0 indicate high trust.
              </p>
            </div>
            <div className="divide-y divide-[#222]">
              {[...agentPerformance].sort((a, b) => b.weight - a.weight).map((agent, index) => (
                <div key={agent.id} className="p-4 flex items-center justify-between hover:bg-[#1a1a1a] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-6 text-center font-mono text-sm text-gray-500 font-bold">
                      #{index + 1}
                    </div>
                    <div className="w-8 h-8 rounded bg-[#222] flex items-center justify-center text-xs font-bold text-gray-300 border border-[#333]">
                      {agent.id.split('-')[0]}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{agent.id}</div>
                      <div className="text-xs text-gray-500">{agent.role}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span className={`text-sm font-mono ${
                        agent.weight > 1.0 ? 'text-green-400' : 
                        agent.weight < 1.0 ? 'text-red-400' : 'text-gray-400'
                      }`}>
                        {agent.weight.toFixed(2)}x
                      </span>
                      {agent.trend === 'up' && <TrendingUp size={14} className="text-green-500" />}
                      {agent.trend === 'down' && <TrendingUp size={14} className="text-red-500 rotate-180" />}
                      {agent.trend === 'flat' && <ArrowRight size={14} className="text-gray-500" />}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Acc: {agent.accuracy}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
