import React, { useState } from 'react';
import {
  X,
  Bell,
  Calendar,
  AtSign,
  BanIcon,
  FileText,
  CheckCircle2,
  Circle,
  BarChart3,
  MessageSquare,
  Phone,
  Clock,
  Image,
  File,
  TrendingUp,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { contacts, chatSummaries, todoLists, chatStats } from '../data/mockData';

export default function ChatDetails({ selectedChat, onClose }) {
  const [activeTab, setActiveTab] = useState('summary');
  const [expandedSections, setExpandedSections] = useState({
    summary: true,
    todos: true,
    stats: true,
  });

  const contact = contacts.find((c) => c.id === selectedChat);
  const summary = chatSummaries[selectedChat];
  const todos = todoLists[selectedChat] || [];
  const stats = chatStats[selectedChat];

  if (!contact) return null;

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const completedTodos = todos.filter((t) => t.done).length;
  const totalTodos = todos.length;

  const tabItems = [
    { id: 'summary', icon: Bell, label: 'Summary' },
    { id: 'todos', icon: Calendar, label: 'Todos' },
    { id: 'stats', icon: AtSign, label: 'Stats' },
    { id: 'mute', icon: BanIcon, label: 'Mute' },
  ];

  return (
    <div className="w-[320px] min-w-[320px] h-full flex flex-col bg-white border-l border-green-100">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-green-100">
        <h3 className="text-base font-semibold text-gray-800">Chat Details</h3>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-green-50 text-gray-400 transition-colors">
          <X size={18} />
        </button>
      </div>

      {/* Contact Info */}
      <div className="flex flex-col items-center py-4 px-5 border-b border-green-100">
        <div className="relative">
          <img src={contact.avatar} alt={contact.name} className="w-16 h-16 rounded-full object-cover" />
          {contact.online && (
            <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
          )}
        </div>
        <h4 className="text-sm font-semibold text-gray-800 mt-2">{contact.name}</h4>
        <p className="text-xs text-gray-400">{contact.status}</p>
      </div>

      {/* Tab Icons */}
      <div className="flex items-center justify-center gap-2 py-3 border-b border-green-100">
        {tabItems.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-2.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'text-gray-400 hover:bg-green-50 hover:text-gray-600'
              }`}
              title={tab.label}
            >
              <Icon size={18} />
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* See Summaries Section */}
        <div className="border-b border-green-50">
          <button
            onClick={() => toggleSection('summary')}
            className="w-full flex items-center justify-between px-5 py-3 hover:bg-green-50/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-emerald-600" />
              <span className="text-sm font-semibold text-gray-800">See Summaries</span>
            </div>
            {expandedSections.summary ? (
              <ChevronUp size={14} className="text-gray-400" />
            ) : (
              <ChevronDown size={14} className="text-gray-400" />
            )}
          </button>
          {expandedSections.summary && summary && (
            <div className="px-5 pb-4">
              <div className="bg-green-50 rounded-xl p-3 border border-green-100">
                <p className="text-xs text-gray-600 leading-relaxed">{summary.summary}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {summary.keyTopics.map((topic, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-medium rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* To-do List Section */}
        <div className="border-b border-green-50">
          <button
            onClick={() => toggleSection('todos')}
            className="w-full flex items-center justify-between px-5 py-3 hover:bg-green-50/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span className="text-sm font-semibold text-gray-800">To-Do List</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-medium">
                {completedTodos}/{totalTodos}
              </span>
            </div>
            {expandedSections.todos ? (
              <ChevronUp size={14} className="text-gray-400" />
            ) : (
              <ChevronDown size={14} className="text-gray-400" />
            )}
          </button>
          {expandedSections.todos && (
            <div className="px-5 pb-4 space-y-2">
              {/* Progress bar */}
              <div className="w-full bg-green-100 rounded-full h-1.5 mb-3">
                <div
                  className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0}%` }}
                />
              </div>
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className={`flex items-start gap-2.5 p-2 rounded-lg transition-colors ${
                    todo.done ? 'opacity-60' : 'hover:bg-green-50'
                  }`}
                >
                  {todo.done ? (
                    <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Circle size={16} className="text-gray-300 flex-shrink-0 mt-0.5" />
                  )}
                  <span className={`text-xs leading-relaxed ${todo.done ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                    {todo.text}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Statistics Section */}
        <div className="border-b border-green-50">
          <button
            onClick={() => toggleSection('stats')}
            className="w-full flex items-center justify-between px-5 py-3 hover:bg-green-50/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <BarChart3 size={16} className="text-emerald-600" />
              <span className="text-sm font-semibold text-gray-800">Statistics</span>
            </div>
            {expandedSections.stats ? (
              <ChevronUp size={14} className="text-gray-400" />
            ) : (
              <ChevronDown size={14} className="text-gray-400" />
            )}
          </button>
          {expandedSections.stats && stats && (
            <div className="px-5 pb-4">
              <div className="grid grid-cols-2 gap-2">
                <StatCard icon={MessageSquare} label="Total Messages" value={stats.totalMessages} color="emerald" />
                <StatCard icon={Phone} label="Total Calls" value={stats.totalCalls} color="green" />
                <StatCard icon={Clock} label="Call Duration" value={stats.totalCallDuration} color="teal" />
                <StatCard icon={Clock} label="Last Call" value={stats.lastCallDuration} color="emerald" />
                <StatCard icon={TrendingUp} label="Avg Response" value={stats.avgResponseTime} color="green" />
                <StatCard icon={File} label="Shared Files" value={stats.sharedFiles} color="teal" />
                <StatCard icon={Image} label="Shared Images" value={stats.sharedImages} color="emerald" />
                <StatCard icon={Calendar} label="Active Days" value={stats.activedays} color="green" />
              </div>
              <div className="mt-3 bg-green-50 rounded-xl p-3 border border-green-100">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wide">Your Messages</span>
                  <span className="text-xs font-semibold text-emerald-700">{stats.myMessages}</span>
                </div>
                <div className="w-full bg-green-100 rounded-full h-2 mt-1.5">
                  <div
                    className="bg-emerald-500 h-2 rounded-full"
                    style={{ width: `${(stats.myMessages / stats.totalMessages) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-[10px] text-gray-500 uppercase tracking-wide">Their Messages</span>
                  <span className="text-xs font-semibold text-emerald-700">{stats.theirMessages}</span>
                </div>
                <div className="w-full bg-green-100 rounded-full h-2 mt-1.5">
                  <div
                    className="bg-green-400 h-2 rounded-full"
                    style={{ width: `${(stats.theirMessages / stats.totalMessages) * 100}%` }}
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-2">
                  First message: {stats.firstMessage}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }) {
  const colorMap = {
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    green: 'bg-green-50 text-green-600 border-green-100',
    teal: 'bg-teal-50 text-teal-600 border-teal-100',
  };
  return (
    <div className={`rounded-xl p-2.5 border ${colorMap[color] || colorMap.emerald}`}>
      <Icon size={14} className="mb-1" />
      <p className="text-[10px] text-gray-500 leading-tight">{label}</p>
      <p className="text-sm font-bold mt-0.5">{value}</p>
    </div>
  );
}
