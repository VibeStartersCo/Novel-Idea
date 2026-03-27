import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, Activity, DollarSign, Globe, TrendingUp, AlertOctagon, CheckCircle2, Info, ShieldCheck, Siren } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, AreaChart, Area } from 'recharts';

type DefconLevel = 'GREEN' | 'YELLOW' | 'ORANGE' | 'RED';

const DEFCON_DATA = {
  GREEN: {
    color: 'text-green-500',
    bg: 'bg-green-500',
    bgSubtle: 'bg-green-500/10',
    border: 'border-green-500/50',
    icon: ShieldCheck,
    title: 'Normal Operations',
    description: 'Standard market conditions. Routine monitoring and paper trading.',
    triggers: 'None active',
    regime: 'Regime A (Ceasefire)',
    budget: '~$185-205/mo'
  },
  YELLOW: {
    color: 'text-yellow-500',
    bg: 'bg-yellow-500',
    bgSubtle: 'bg-yellow-500/10',
    border: 'border-yellow-500/50',
    icon: AlertTriangle,
    title: 'Elevated Monitoring',
    description: 'Heightened risk environment requiring increased API polling and defensive sizing.',
    triggers: 'Hormuz, Anthropic Lit, Oil $98+',
    regime: 'Regime B (Escalation)',
    budget: '~$240-360/mo'
  },
  ORANGE: {
    color: 'text-orange-500',
    bg: 'bg-orange-500',
    bgSubtle: 'bg-orange-500/10',
    border: 'border-orange-500/50',
    icon: AlertOctagon,
    title: 'Crisis Operations',
    description: 'Active crisis protocols engaged. Maximum API polling, strict defensive posture.',
    triggers: 'Active regional conflict, VIX > 35',
    regime: 'Regime B (Escalation) - Strict',
    budget: '~$450-750/mo'
  },
  RED: {
    color: 'text-red-500',
    bg: 'bg-red-500',
    bgSubtle: 'bg-red-500/10',
    border: 'border-red-500/50',
    icon: Siren,
    title: 'Maximum Readiness',
    description: 'Systemic market event. All automated trading halted. Manual override required.',
    triggers: 'Global systemic event, VIX > 50',
    regime: 'Regime C (Halt)',
    budget: 'Uncapped (Emergency)'
  }
};

const riskRegister = [
  { id: 'R01', risk: 'Anthropic-DOD litigation disrupts Claude', severity: 'HIGH', mitigation: 'Multi-provider fallback (Gemini/Perplexity). Failover tested Saturday.', owner: 'Sekou', status: 'Active' },
  { id: 'R02', risk: 'Hormuz escalation crashes markets during paper trading', severity: 'MEDIUM', mitigation: 'Paper trading only — no real capital at risk. Regime B defensive sizing.', owner: 'Safiya', status: 'Monitoring' },
  { id: 'R03', risk: 'Supabase free tier exceeded during backfill', severity: 'MEDIUM', mitigation: '400MB trigger set. Pro upgrade approved ($25/mo).', owner: 'JE-01', status: 'Mitigated' },
  { id: 'R04', risk: 'API costs spike during DEFCON ORANGE+', severity: 'MEDIUM', mitigation: '$20/day ceiling with auto-throttle. Crisis budget acknowledged ($450-750).', owner: 'JO-03', status: 'Active' },
  { id: 'R05', risk: 'Insider trading regulation changes prediction market utility', severity: 'LOW', mitigation: 'Read-don\'t-trade approach on Polymarket. Kalshi only platform we trade.', owner: 'JW-10', status: 'Monitoring' },
  { id: 'R06', risk: 'Reference repo (virattt) architecture doesn\'t fit our needs', severity: 'LOW', mitigation: 'Fork and adapt, not wholesale adopt. Custom build always available.', owner: 'Sekou', status: 'Mitigated' },
  { id: 'R07', risk: 'Marcus\'s MacBook fails', severity: 'MEDIUM', mitigation: '3-layer backup: GitHub + Supabase + cloud docs. Implemented Saturday.', owner: 'JO-01', status: 'Mitigated' },
];

const oilData = [
  { time: '08:00', price: 92.4 }, { time: '10:00', price: 93.1 }, { time: '12:00', price: 94.5 },
  { time: '14:00', price: 96.2 }, { time: '16:00', price: 97.8 }, { time: '18:00', price: 98.5 },
  { time: '20:00', price: 99.1 },
];

const apiCostData = [
  { day: 'Mon', cost: 4.2 }, { day: 'Tue', cost: 5.1 }, { day: 'Wed', cost: 8.4 },
  { day: 'Thu', cost: 12.5 }, { day: 'Fri', cost: 18.2 }, { day: 'Sat', cost: 19.8 },
  { day: 'Sun', cost: 21.5 },
];

export default function RiskDashboard() {
  const [defcon, setDefcon] = useState<DefconLevel>('YELLOW');
  const currentDefcon = DEFCON_DATA[defcon];
  const DefconIcon = currentDefcon.icon;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header & DEFCON Status */}
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-stretch">
        <div className="flex-1 bg-[#111] border border-[#333] rounded-xl p-6 relative overflow-hidden transition-colors duration-500">
          <div className={`absolute top-0 right-0 w-48 h-48 ${currentDefcon.bgSubtle} rounded-bl-full blur-3xl transition-colors duration-500`}></div>
          
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-mono text-gray-400 uppercase tracking-wider">Current Threat Level</h2>
            <div className={`flex items-center gap-2 px-3 py-1 ${currentDefcon.bgSubtle} ${currentDefcon.color} border ${currentDefcon.border} rounded-full text-xs font-bold tracking-widest animate-pulse transition-colors duration-500`}>
              <DefconIcon size={14} />
              DEFCON {defcon}
            </div>
          </div>
          
          <p className="text-3xl font-bold text-white mb-2">{currentDefcon.title}</p>
          <p className="text-sm text-gray-400 mb-6 max-w-md">{currentDefcon.description}</p>
          
          {/* Active Triggers Alert Box */}
          <div className={`mb-6 p-4 rounded-lg border ${currentDefcon.bgSubtle} ${currentDefcon.border}`}>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={16} className={currentDefcon.color} />
              <h3 className={`text-sm font-bold uppercase tracking-wider ${currentDefcon.color}`}>Active Triggers</h3>
            </div>
            {currentDefcon.triggers === 'None active' ? (
              <p className="text-sm text-gray-400 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-500" /> All systems nominal. No active threat triggers.
              </p>
            ) : (
              <ul className="space-y-2">
                {currentDefcon.triggers.split(', ').map((trigger, idx) => (
                  <li key={idx} className="text-sm text-gray-200 flex items-start gap-2 bg-[#0a0a0a]/50 p-2 rounded border border-[#222]">
                    <div className={`w-2 h-2 rounded-full mt-1 shrink-0 ${currentDefcon.bg}`}></div>
                    <span>{trigger}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* DEFCON Visualizer Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-[10px] font-mono text-gray-500 mb-2 px-1">
              <span>NORMAL</span>
              <span>ELEVATED</span>
              <span>CRISIS</span>
              <span>MAXIMUM</span>
            </div>
            <div className="flex w-full h-3 bg-[#222] rounded-full overflow-hidden">
              {(['GREEN', 'YELLOW', 'ORANGE', 'RED'] as DefconLevel[]).map((level) => {
                const levels = ['GREEN', 'YELLOW', 'ORANGE', 'RED'];
                const currentIndex = levels.indexOf(defcon);
                const thisIndex = levels.indexOf(level);
                const isActive = thisIndex === currentIndex;
                const isPast = thisIndex < currentIndex;
                
                return (
                  <div 
                    key={level}
                    onClick={() => setDefcon(level)}
                    className={`h-full flex-1 cursor-pointer transition-all duration-300 border-r border-[#111] last:border-0 ${
                      isActive ? DEFCON_DATA[level].bg : 
                      isPast ? DEFCON_DATA[level].bg + ' opacity-40' : 'hover:bg-[#333]'
                    }`}
                    title={`Switch to DEFCON ${level}`}
                  />
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-[#0a0a0a] p-3 rounded-lg border border-[#222]">
              <div className="text-xs text-gray-500 mb-1">Regime Status</div>
              <div className={`text-sm font-medium ${currentDefcon.color}`}>{currentDefcon.regime}</div>
            </div>
            <div className="bg-[#0a0a0a] p-3 rounded-lg border border-[#222]">
              <div className="text-xs text-gray-500 mb-1">Authorized Budget</div>
              <div className="text-sm text-gray-300 font-medium">{currentDefcon.budget}</div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3 grid grid-rows-2 gap-4">
          <div className="bg-[#111] border border-[#333] rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Daily API Burn</div>
              <div className="text-2xl font-mono text-white">$19.80 <span className="text-xs text-gray-500">/ $20 limit</span></div>
            </div>
            <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500">
              <DollarSign size={20} />
            </div>
          </div>
          <div className="bg-[#111] border border-[#333] rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">System Failover</div>
              <div className="text-2xl font-mono text-green-500">READY</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
              <ShieldAlert size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* KRIs (Key Risk Indicators) */}
      <h3 className="text-xl font-semibold text-white mt-8 mb-4 flex items-center gap-2">
        <Activity className="text-[#F27D26]" /> Key Risk Indicators (KRIs)
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Oil Price Chart */}
        <div className="bg-[#111] border border-[#333] rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h4 className="text-sm font-mono text-gray-400 uppercase">Brent Crude (Real-time)</h4>
              <div className="text-2xl font-bold text-white mt-1">$99.10 <span className="text-sm text-red-500 font-normal">+2.4%</span></div>
            </div>
            <Globe className="text-gray-600" />
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={oilData}>
                <defs>
                  <linearGradient id="colorOil" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="time" stroke="#555" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis domain={[90, 100]} stroke="#555" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#333', color: '#fff' }}
                  itemStyle={{ color: '#ef4444' }}
                />
                <ReferenceLine y={98} stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: 'DEFCON Trigger ($98)', fill: '#ef4444', fontSize: 10 }} />
                <Area type="monotone" dataKey="price" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorOil)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* API Cost Chart */}
        <div className="bg-[#111] border border-[#333] rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h4 className="text-sm font-mono text-gray-400 uppercase">API Cost Trajectory</h4>
              <div className="text-2xl font-bold text-white mt-1">Approaching Ceiling</div>
            </div>
            <TrendingUp className="text-gray-600" />
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={apiCostData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="day" stroke="#555" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis domain={[0, 25]} stroke="#555" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#333', color: '#fff' }}
                  itemStyle={{ color: '#F27D26' }}
                />
                <ReferenceLine y={20} stroke="#F27D26" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: 'Daily Ceiling ($20)', fill: '#F27D26', fontSize: 10 }} />
                <Line type="monotone" dataKey="cost" stroke="#F27D26" strokeWidth={2} dot={{ r: 4, fill: '#0a0a0a', stroke: '#F27D26', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Risk Register */}
      <h3 className="text-xl font-semibold text-white mt-8 mb-4 flex items-center gap-2">
        <AlertOctagon className="text-[#F27D26]" /> Active Risk Register
      </h3>
      <div className="bg-[#111] border border-[#333] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0a0a0a] border-b border-[#333]">
                <th className="p-4 text-xs font-mono text-gray-400 uppercase tracking-wider">ID</th>
                <th className="p-4 text-xs font-mono text-gray-400 uppercase tracking-wider">Risk Description</th>
                <th className="p-4 text-xs font-mono text-gray-400 uppercase tracking-wider">Severity</th>
                <th className="p-4 text-xs font-mono text-gray-400 uppercase tracking-wider">Mitigation Strategy</th>
                <th className="p-4 text-xs font-mono text-gray-400 uppercase tracking-wider">Owner</th>
                <th className="p-4 text-xs font-mono text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222]">
              {riskRegister.map((risk) => (
                <tr key={risk.id} className="hover:bg-[#1a1a1a] transition-colors">
                  <td className="p-4 text-sm font-mono text-gray-500">{risk.id}</td>
                  <td className="p-4 text-sm text-gray-200 font-medium">{risk.risk}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${
                      risk.severity === 'HIGH' ? 'bg-red-500/20 text-red-400 border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.1)]' :
                      risk.severity === 'MEDIUM' ? 'bg-amber-500/20 text-amber-400 border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.1)]' :
                      'bg-emerald-500/20 text-emerald-400 border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.1)]'
                    }`}>
                      {risk.severity}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-400 max-w-xs truncate" title={risk.mitigation}>{risk.mitigation}</td>
                  <td className="p-4 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#222] flex items-center justify-center text-xs font-bold text-gray-400">
                        {risk.owner.substring(0, 2)}
                      </div>
                      {risk.owner}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5 text-xs">
                      {risk.status === 'Active' && <Activity size={14} className="text-red-500" />}
                      {risk.status === 'Monitoring' && <Info size={14} className="text-yellow-500" />}
                      {risk.status === 'Mitigated' && <CheckCircle2 size={14} className="text-green-500" />}
                      <span className={
                        risk.status === 'Active' ? 'text-red-500' :
                        risk.status === 'Monitoring' ? 'text-yellow-500' :
                        'text-green-500'
                      }>{risk.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
