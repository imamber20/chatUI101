import React, { useState } from 'react';
import { BarChart3, TrendingUp, PhoneIncoming, Clock, Users, Ticket, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const monthlyData = [
  { month: 'Oct', calls: 320, tickets: 45, avgDuration: '15:20' },
  { month: 'Nov', calls: 380, tickets: 52, avgDuration: '16:45' },
  { month: 'Dec', calls: 290, tickets: 38, avgDuration: '14:10' },
  { month: 'Jan', calls: 420, tickets: 60, avgDuration: '18:30' },
  { month: 'Feb', calls: 465, tickets: 55, avgDuration: '17:55' },
  { month: 'Mar', calls: 510, tickets: 48, avgDuration: '19:12' },
];

const kpiCards = [
  { label: 'Customer Satisfaction', value: '94%', change: '+3%', up: true, icon: Users },
  { label: 'First Call Resolution', value: '78%', change: '+5%', up: true, icon: PhoneIncoming },
  { label: 'Avg Handle Time', value: '18:34', change: '-12%', up: false, icon: Clock },
  { label: 'Ticket Backlog', value: '23', change: '-15%', up: false, icon: Ticket },
];

const departmentStats = [
  { dept: 'Support', calls: 180, tickets: 22, resolution: '92%' },
  { dept: 'Engineering', calls: 120, tickets: 15, resolution: '85%' },
  { dept: 'Sales', calls: 95, tickets: 8, resolution: '96%' },
  { dept: 'Product', calls: 65, tickets: 5, resolution: '90%' },
  { dept: 'Finance', calls: 50, tickets: 3, resolution: '88%' },
];

const sentimentData = [
  { label: 'Positive', pct: 62, color: 'bg-emerald-500' },
  { label: 'Neutral', pct: 28, color: 'bg-amber-400' },
  { label: 'Negative', pct: 10, color: 'bg-red-400' },
];

const maxCalls = Math.max(...monthlyData.map((d) => d.calls));

export default function AnalysisPage() {
  const [period, setPeriod] = useState('6m');

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-green-50/50 to-white p-6">
      <div className="max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <BarChart3 size={24} className="text-emerald-600" />
            <h2 className="text-xl font-bold text-gray-800">Analysis</h2>
          </div>
          <div className="flex bg-green-100 rounded-lg p-0.5">
            {['1m', '3m', '6m', '1y'].map((p) => (
              <button key={p} onClick={() => setPeriod(p)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                  period === p ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}>{p}</button>
            ))}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {kpiCards.map((k, i) => {
            const Icon = k.icon;
            return (
              <div key={i} className="p-4 bg-white rounded-2xl border border-green-100 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <Icon size={18} className="text-emerald-600" />
                  </div>
                  <span className={`flex items-center gap-0.5 text-xs font-medium ${k.up ? 'text-emerald-600' : 'text-red-500'}`}>
                    {k.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}{k.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-800">{k.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{k.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          {/* Monthly Call Trend */}
          <div className="col-span-2 p-5 bg-white rounded-2xl border border-green-100 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-800 mb-4">Monthly Call Volume Trend</h3>
            <div className="flex items-end gap-4 h-44">
              {monthlyData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] font-semibold text-gray-600">{d.calls}</span>
                  <div className="w-full rounded-t-lg relative" style={{ height: `${(d.calls / maxCalls) * 130}px` }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-500 to-emerald-300 rounded-t-lg" />
                  </div>
                  <span className="text-[10px] text-gray-400">{d.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sentiment Analysis */}
          <div className="p-5 bg-white rounded-2xl border border-green-100 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-800 mb-4">Call Sentiment</h3>
            <div className="space-y-3">
              {sentimentData.map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-600">{s.label}</span>
                    <span className="text-xs font-bold text-gray-800">{s.pct}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div className={`${s.color} h-3 rounded-full transition-all`} style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-green-50 rounded-xl border border-green-100">
              <p className="text-[10px] text-gray-500">Overall sentiment score</p>
              <p className="text-xl font-bold text-emerald-700">8.4 / 10</p>
            </div>
          </div>
        </div>

        {/* Department Performance */}
        <div className="p-5 bg-white rounded-2xl border border-green-100 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Department Performance</h3>
          <div className="overflow-hidden rounded-xl border border-green-100">
            <table className="w-full">
              <thead><tr className="bg-green-50">
                <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-wide text-gray-500 font-medium">Department</th>
                <th className="text-right px-4 py-2.5 text-[10px] uppercase tracking-wide text-gray-500 font-medium">Calls</th>
                <th className="text-right px-4 py-2.5 text-[10px] uppercase tracking-wide text-gray-500 font-medium">Tickets</th>
                <th className="text-right px-4 py-2.5 text-[10px] uppercase tracking-wide text-gray-500 font-medium">Resolution Rate</th>
              </tr></thead>
              <tbody>
                {departmentStats.map((d, i) => (
                  <tr key={i} className="border-t border-green-50 hover:bg-green-50/50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">{d.dept}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-600">{d.calls}</td>
                    <td className="px-4 py-3 text-sm text-right text-gray-600">{d.tickets}</td>
                    <td className="px-4 py-3 text-sm text-right font-semibold text-emerald-600">{d.resolution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
