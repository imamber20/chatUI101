import React from 'react';
import { PhoneIncoming, Users, Ticket, Clock, TrendingUp, TrendingDown, BarChart3, Activity } from 'lucide-react';

const stats = [
  { label: 'Total Calls Today', value: '47', change: '+12%', up: true, icon: PhoneIncoming, color: 'emerald' },
  { label: 'Active Customers', value: '156', change: '+5%', up: true, icon: Users, color: 'green' },
  { label: 'Open Tickets', value: '23', change: '-8%', up: false, icon: Ticket, color: 'teal' },
  { label: 'Avg Call Duration', value: '18:34', change: '+2%', up: true, icon: Clock, color: 'emerald' },
];

const recentActivity = [
  { type: 'call', text: 'Sarah Mitchell called — Quarterly Report Review', time: '9 min ago' },
  { type: 'ticket', text: 'Ticket #1042 assigned to Tom Bradley', time: '15 min ago' },
  { type: 'call', text: 'James Parker called — Sprint Planning', time: '32 min ago' },
  { type: 'ticket', text: 'Ticket #1041 resolved by Rachel Green', time: '1 hr ago' },
  { type: 'call', text: 'Elena Rodriguez called — Dashboard Redesign', time: '2 hr ago' },
  { type: 'meeting', text: 'Meeting with Michael Chen scheduled for 3 PM', time: '2 hr ago' },
  { type: 'ticket', text: 'Ticket #1040 escalated to Senior Engineer', time: '3 hr ago' },
];

const topCallers = [
  { name: 'Sarah Mitchell', calls: 12, duration: '3h 24m' },
  { name: 'James Parker', calls: 8, duration: '2h 15m' },
  { name: 'David Thompson', calls: 20, duration: '6h 30m' },
  { name: 'Alex Morgan', calls: 10, duration: '4h 05m' },
  { name: 'Jenny Li', calls: 6, duration: '1h 55m' },
];

const weeklyData = [32, 45, 38, 52, 41, 47, 35];
const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function DashboardPage() {
  const maxWeekly = Math.max(...weeklyData);

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-green-50/50 to-white p-6">
      <div className="max-w-5xl">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 size={24} className="text-emerald-600" />
          <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
          <span className="text-xs text-gray-400 ml-2">Last updated: just now</span>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="p-4 bg-white rounded-2xl border border-green-100 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${s.color}-100`}>
                    <Icon size={18} className={`text-${s.color}-600`} />
                  </div>
                  <span className={`flex items-center gap-0.5 text-xs font-medium ${s.up ? 'text-emerald-600' : 'text-red-500'}`}>
                    {s.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {s.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-800">{s.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Weekly Call Volume */}
          <div className="col-span-2 p-5 bg-white rounded-2xl border border-green-100 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Activity size={16} className="text-emerald-600" /> Weekly Call Volume
            </h3>
            <div className="flex items-end gap-3 h-40">
              {weeklyData.map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[10px] font-semibold text-gray-600">{v}</span>
                  <div className="w-full bg-emerald-100 rounded-t-lg relative" style={{ height: `${(v / maxWeekly) * 120}px` }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-500 to-emerald-300 rounded-t-lg" />
                  </div>
                  <span className="text-[10px] text-gray-400">{weekDays[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Callers */}
          <div className="p-5 bg-white rounded-2xl border border-green-100 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <PhoneIncoming size={16} className="text-emerald-600" /> Top Callers
            </h3>
            <div className="space-y-2.5">
              {topCallers.map((c, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-gray-400 w-4">{i + 1}</span>
                    <span className="text-xs text-gray-700">{c.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-emerald-600">{c.calls} calls</span>
                    <span className="text-[10px] text-gray-400 ml-1">· {c.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-4 p-5 bg-white rounded-2xl border border-green-100 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Recent Activity</h3>
          <div className="space-y-2">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-green-50 last:border-0">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  a.type === 'call' ? 'bg-emerald-500' : a.type === 'ticket' ? 'bg-amber-400' : 'bg-blue-400'
                }`} />
                <span className="text-xs text-gray-700 flex-1">{a.text}</span>
                <span className="text-[10px] text-gray-400 flex-shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
