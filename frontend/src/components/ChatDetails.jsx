import React, { useState, useMemo } from 'react';
import {
  X, Bell, CalendarIcon, AtSign, Ticket,
  FileText, CheckCircle2, Circle, BarChart3,
  MessageSquare, Phone, Clock, Image, File, TrendingUp,
  ChevronDown, ChevronUp, Mail, MapPin, UserCheck,
  Send, Edit3, Check, Plus, CalendarPlus, Clock3,
} from 'lucide-react';
import { Calendar } from './ui/calendar';
import {
  contacts, chatSummaries, todoLists, chatStats,
  callTranscripts, callLogs, customerDetails, employees,
} from '../data/mockData';

// ─── Tab 1: Notification (Summary + Todo + Stats) ─────────────
function NotificationTab({ selectedChat, todos, setTodos }) {
  const summary = chatSummaries[selectedChat];
  const stats = chatStats[selectedChat];
  const [expandedSections, setExpandedSections] = useState({
    summary: true,
    todos: false,
    stats: false,
  });

  const toggle = (s) => setExpandedSections((p) => ({ ...p, [s]: !p[s] }));
  const completedTodos = todos.filter((t) => t.done).length;

  const toggleTodo = (id) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  return (
    <>
      {/* Summary */}
      <Section title="See Summaries" icon={FileText} open={expandedSections.summary} onToggle={() => toggle('summary')}>
        {summary && (
          <div className="px-5 pb-4">
            <div className="bg-green-50 rounded-xl p-3 border border-green-100">
              <p className="text-xs text-gray-600 leading-relaxed">{summary.summary}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {summary.keyTopics.map((t, i) => (
                  <span key={i} className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-medium rounded-full">{t}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </Section>

      {/* Todo List */}
      <Section
        title="To-Do List"
        icon={CheckCircle2}
        badge={`${completedTodos}/${todos.length}`}
        open={expandedSections.todos}
        onToggle={() => toggle('todos')}
      >
        <div className="px-5 pb-4 space-y-1">
          <div className="w-full bg-green-100 rounded-full h-1.5 mb-3">
            <div className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${todos.length > 0 ? (completedTodos / todos.length) * 100 : 0}%` }} />
          </div>
          {todos.map((todo) => (
            <button
              key={todo.id}
              onClick={() => toggleTodo(todo.id)}
              className={`w-full flex items-start gap-2.5 p-2 rounded-lg transition-colors text-left ${todo.done ? 'opacity-60' : 'hover:bg-green-50'}`}
            >
              {todo.done ? (
                <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
              ) : (
                <Circle size={16} className="text-gray-300 flex-shrink-0 mt-0.5" />
              )}
              <span className={`text-xs leading-relaxed ${todo.done ? 'line-through text-gray-400' : 'text-gray-700'}`}>{todo.text}</span>
            </button>
          ))}
        </div>
      </Section>

      {/* Statistics */}
      <Section title="Statistics" icon={BarChart3} open={expandedSections.stats} onToggle={() => toggle('stats')}>
        {stats && (
          <div className="px-5 pb-4">
            <div className="grid grid-cols-2 gap-2">
              <StatCard icon={MessageSquare} label="Total Messages" value={stats.totalMessages} color="emerald" />
              <StatCard icon={Phone} label="Total Calls" value={stats.totalCalls} color="green" />
              <StatCard icon={Clock} label="Call Duration" value={stats.totalCallDuration} color="teal" />
              <StatCard icon={Clock} label="Last Call" value={stats.lastCallDuration} color="emerald" />
              <StatCard icon={TrendingUp} label="Avg Response" value={stats.avgResponseTime} color="green" />
              <StatCard icon={File} label="Shared Files" value={stats.sharedFiles} color="teal" />
              <StatCard icon={Image} label="Shared Images" value={stats.sharedImages} color="emerald" />
              <StatCard icon={CalendarIcon} label="Active Days" value={stats.activedays} color="green" />
            </div>
            <div className="mt-3 bg-green-50 rounded-xl p-3 border border-green-100">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-500 uppercase tracking-wide">Kiki Messages</span>
                <span className="text-xs font-semibold text-emerald-700">{stats.myMessages}</span>
              </div>
              <div className="w-full bg-green-100 rounded-full h-2 mt-1.5">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${(stats.myMessages / stats.totalMessages) * 100}%` }} />
              </div>
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-[10px] text-gray-500 uppercase tracking-wide">Caller Messages</span>
                <span className="text-xs font-semibold text-emerald-700">{stats.theirMessages}</span>
              </div>
              <div className="w-full bg-green-100 rounded-full h-2 mt-1.5">
                <div className="bg-green-400 h-2 rounded-full" style={{ width: `${(stats.theirMessages / stats.totalMessages) * 100}%` }} />
              </div>
              <p className="text-[10px] text-gray-400 mt-2">First message: {stats.firstMessage}</p>
            </div>
          </div>
        )}
      </Section>
    </>
  );
}

// ─── Tab 2: Calendar (Schedule Meeting) ────────────────────────
function CalendarTab({ selectedChat, selectedCallLogId }) {
  const transcript = callTranscripts[selectedCallLogId];
  const contact = contacts.find((c) => c.id === selectedChat);
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [meetingTime, setMeetingTime] = useState('10:00');
  const [meetingDuration, setMeetingDuration] = useState('30');
  const [meetingSubject, setMeetingSubject] = useState(transcript?.subject || '');
  const [meetingNotes, setMeetingNotes] = useState('');
  const [scheduled, setScheduled] = useState(false);
  const [meetings, setMeetings] = useState([]);

  const handleSchedule = () => {
    if (!selectedDate || !meetingSubject.trim()) return;
    const newMeeting = {
      id: Date.now(),
      date: selectedDate,
      time: meetingTime,
      duration: meetingDuration,
      subject: meetingSubject,
      notes: meetingNotes,
      contact: contact?.name,
    };
    setMeetings((prev) => [...prev, newMeeting]);
    setScheduled(true);
    setTimeout(() => setScheduled(false), 3000);
    setMeetingSubject(transcript?.subject || '');
    setMeetingNotes('');
    setSelectedDate(undefined);
  };

  return (
    <div className="px-4 py-3 space-y-3">
      <div className="flex items-center gap-2 mb-1">
        <CalendarPlus size={16} className="text-emerald-600" />
        <h4 className="text-sm font-semibold text-gray-800">Schedule Appointment</h4>
      </div>

      {/* Calendar */}
      <div className="bg-green-50 rounded-xl border border-green-100 overflow-hidden">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
          className="mx-auto"
        />
      </div>

      {/* Time & Duration */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[10px] uppercase tracking-wide text-gray-500 font-medium">Time</label>
          <input type="time" value={meetingTime} onChange={(e) => setMeetingTime(e.target.value)}
            className="w-full mt-1 px-3 py-2 bg-green-50 border border-green-200 rounded-lg text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400/40" />
        </div>
        <div>
          <label className="text-[10px] uppercase tracking-wide text-gray-500 font-medium">Duration</label>
          <select value={meetingDuration} onChange={(e) => setMeetingDuration(e.target.value)}
            className="w-full mt-1 px-3 py-2 bg-green-50 border border-green-200 rounded-lg text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400/40">
            <option value="15">15 min</option>
            <option value="30">30 min</option>
            <option value="45">45 min</option>
            <option value="60">1 hour</option>
            <option value="90">1.5 hours</option>
          </select>
        </div>
      </div>

      {/* Subject (auto-filled) */}
      <div>
        <label className="text-[10px] uppercase tracking-wide text-gray-500 font-medium">Subject</label>
        <input type="text" value={meetingSubject} onChange={(e) => setMeetingSubject(e.target.value)}
          className="w-full mt-1 px-3 py-2 bg-green-50 border border-green-200 rounded-lg text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
          placeholder="Meeting subject" />
      </div>

      {/* With */}
      <div>
        <label className="text-[10px] uppercase tracking-wide text-gray-500 font-medium">With</label>
        <div className="flex items-center gap-2 mt-1 px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
          {contact && <img src={contact.avatar} alt="" className="w-5 h-5 rounded-full object-cover" />}
          <span className="text-xs text-gray-700">{contact?.name}</span>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="text-[10px] uppercase tracking-wide text-gray-500 font-medium">Notes</label>
        <textarea value={meetingNotes} onChange={(e) => setMeetingNotes(e.target.value)} rows={2}
          className="w-full mt-1 px-3 py-2 bg-green-50 border border-green-200 rounded-lg text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 resize-none"
          placeholder="Additional notes..." />
      </div>

      <button onClick={handleSchedule}
        disabled={!selectedDate || !meetingSubject.trim()}
        className="w-full py-2.5 bg-emerald-600 text-white text-xs font-semibold rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
        <CalendarPlus size={14} />
        Schedule Meeting
      </button>

      {scheduled && (
        <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg">
          <Check size={14} className="text-emerald-600" />
          <span className="text-xs text-emerald-700">Meeting scheduled successfully!</span>
        </div>
      )}

      {/* Scheduled meetings list */}
      {meetings.length > 0 && (
        <div className="space-y-2 pt-1">
          <p className="text-[10px] uppercase tracking-wide text-gray-500 font-medium">Upcoming Meetings</p>
          {meetings.map((m) => (
            <div key={m.id} className="p-2.5 bg-green-50 border border-green-100 rounded-xl">
              <p className="text-xs font-semibold text-gray-800">{m.subject}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">
                {m.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {m.time} · {m.duration} min · {m.contact}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Tab 3: Contact Info ───────────────────────────────────────
function ContactInfoTab({ selectedChat }) {
  const contact = contacts.find((c) => c.id === selectedChat);
  const details = customerDetails[selectedChat];
  if (!contact || !details) return null;

  const infoRows = [
    { icon: Mail, label: 'Email', value: details.email },
    { icon: Phone, label: 'Phone', value: details.phone },
    { icon: MapPin, label: 'Address', value: details.address },
    { icon: UserCheck, label: 'Customer Since', value: details.customerSince },
  ];

  return (
    <div className="px-5 py-4 space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <AtSign size={16} className="text-emerald-600" />
        <h4 className="text-sm font-semibold text-gray-800">Contact Information</h4>
      </div>
      <div className="space-y-3">
        {infoRows.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-start gap-3 p-3 bg-green-50 rounded-xl border border-green-100">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <Icon size={14} className="text-emerald-700" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wide text-gray-500 font-medium">{label}</p>
              <p className="text-xs text-gray-800 mt-0.5 break-words">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Tab 4: Create Ticket ──────────────────────────────────────
function CreateTicketTab({ selectedChat, selectedCallLogId }) {
  const contact = contacts.find((c) => c.id === selectedChat);
  const details = customerDetails[selectedChat];
  const transcript = callTranscripts[selectedCallLogId];
  const callLog = callLogs.find((cl) => cl.id === selectedCallLogId);

  const defaultDescription = useMemo(() => {
    if (!transcript) return '';
    const summary = chatSummaries[selectedChat];
    return summary?.summary || '';
  }, [transcript, selectedChat]);

  const [isEditing, setIsEditing] = useState(false);
  const [ticketData, setTicketData] = useState({
    subject: transcript?.subject || '',
    description: defaultDescription,
    priority: 'medium',
    assignee: '',
    customerName: contact?.name || '',
    customerEmail: details?.email || '',
    customerPhone: details?.phone || '',
    callDuration: callLog?.duration || '',
    callDate: callLog ? new Date(callLog.date).toLocaleString() : '',
  });
  const [ticketSent, setTicketSent] = useState(false);

  const update = (key, val) => setTicketData((p) => ({ ...p, [key]: val }));

  const handleTransfer = () => {
    if (!ticketData.assignee) return;
    setTicketSent(true);
    setTimeout(() => setTicketSent(false), 4000);
    setIsEditing(false);
  };

  if (ticketSent) {
    const assignee = employees.find((e) => e.id === ticketData.assignee);
    return (
      <div className="px-5 py-8 flex flex-col items-center text-center">
        <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
          <Check size={28} className="text-emerald-600" />
        </div>
        <h4 className="text-sm font-semibold text-gray-800">Ticket Transferred!</h4>
        <p className="text-xs text-gray-500 mt-1">
          Assigned to <span className="font-semibold text-emerald-700">{assignee?.name}</span>
          <br />({assignee?.role}, {assignee?.department})
        </p>
        <p className="text-[10px] text-gray-400 mt-2">Subject: {ticketData.subject}</p>
        <button onClick={() => setTicketSent(false)} className="mt-4 px-4 py-2 text-xs font-medium text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors">
          Create Another Ticket
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 py-3 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Ticket size={16} className="text-emerald-600" />
          <h4 className="text-sm font-semibold text-gray-800">Create Ticket</h4>
        </div>
        <button onClick={() => setIsEditing(!isEditing)}
          className={`p-1.5 rounded-lg transition-colors ${isEditing ? 'bg-amber-100 text-amber-700' : 'text-gray-400 hover:bg-green-50'}`}>
          <Edit3 size={14} />
        </button>
      </div>

      {/* Subject */}
      <Field label="Subject" editing={isEditing} value={ticketData.subject} onChange={(v) => update('subject', v)} />

      {/* Priority */}
      <div>
        <label className="text-[10px] uppercase tracking-wide text-gray-500 font-medium">Priority</label>
        <div className="flex gap-1.5 mt-1">
          {['low', 'medium', 'high', 'urgent'].map((p) => (
            <button key={p} onClick={() => isEditing && update('priority', p)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold capitalize transition-colors ${
                ticketData.priority === p
                  ? p === 'urgent' ? 'bg-red-100 text-red-700 border border-red-200'
                    : p === 'high' ? 'bg-orange-100 text-orange-700 border border-orange-200'
                    : p === 'medium' ? 'bg-amber-100 text-amber-700 border border-amber-200'
                    : 'bg-green-100 text-green-700 border border-green-200'
                  : 'bg-gray-50 text-gray-400 border border-gray-100'
              } ${isEditing ? 'cursor-pointer' : 'cursor-default'}`}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Customer Info */}
      <div className="bg-green-50 rounded-xl p-3 border border-green-100 space-y-1.5">
        <p className="text-[10px] uppercase tracking-wide text-gray-500 font-medium">Customer Info</p>
        <p className="text-xs text-gray-800">{ticketData.customerName}</p>
        <p className="text-[11px] text-gray-500">{ticketData.customerEmail}</p>
        <p className="text-[11px] text-gray-500">{ticketData.customerPhone}</p>
        <p className="text-[10px] text-gray-400">Call: {ticketData.callDate} · Duration: {ticketData.callDuration}</p>
      </div>

      {/* Description */}
      <div>
        <label className="text-[10px] uppercase tracking-wide text-gray-500 font-medium">Transcript / Description</label>
        {isEditing ? (
          <textarea value={ticketData.description} onChange={(e) => update('description', e.target.value)} rows={5}
            className="w-full mt-1 px-3 py-2 bg-green-50 border border-green-200 rounded-lg text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 resize-none" />
        ) : (
          <div className="mt-1 px-3 py-2 bg-green-50 border border-green-100 rounded-lg max-h-28 overflow-y-auto">
            <pre className="text-[11px] text-gray-600 whitespace-pre-wrap font-sans leading-relaxed">{ticketData.description}</pre>
          </div>
        )}
      </div>

      {/* Assign to */}
      <div>
        <label className="text-[10px] uppercase tracking-wide text-gray-500 font-medium">Assign to Employee</label>
        <select value={ticketData.assignee} onChange={(e) => update('assignee', e.target.value)}
          className="w-full mt-1 px-3 py-2 bg-green-50 border border-green-200 rounded-lg text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400/40">
          <option value="">Select employee...</option>
          {employees.map((e) => (
            <option key={e.id} value={e.id}>{e.name} — {e.role} ({e.department})</option>
          ))}
        </select>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        <button onClick={handleTransfer} disabled={!ticketData.assignee}
          className="flex-1 py-2.5 bg-emerald-600 text-white text-xs font-semibold rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
          <Send size={14} />
          Transfer Ticket
        </button>
      </div>
    </div>
  );
}

// ─── Shared Components ─────────────────────────────────────────
function Section({ title, icon: Icon, badge, open, onToggle, children }) {
  return (
    <div className="border-b border-green-50">
      <button onClick={onToggle} className="w-full flex items-center justify-between px-5 py-3 hover:bg-green-50/50 transition-colors">
        <div className="flex items-center gap-2">
          <Icon size={16} className="text-emerald-600" />
          <span className="text-sm font-semibold text-gray-800">{title}</span>
          {badge && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-medium">{badge}</span>}
        </div>
        {open ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
      </button>
      {open && children}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }) {
  const cm = { emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100', green: 'bg-green-50 text-green-600 border-green-100', teal: 'bg-teal-50 text-teal-600 border-teal-100' };
  return (
    <div className={`rounded-xl p-2.5 border ${cm[color] || cm.emerald}`}>
      <Icon size={14} className="mb-1" />
      <p className="text-[10px] text-gray-500 leading-tight">{label}</p>
      <p className="text-sm font-bold mt-0.5">{value}</p>
    </div>
  );
}

function Field({ label, editing, value, onChange }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-wide text-gray-500 font-medium">{label}</label>
      {editing ? (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
          className="w-full mt-1 px-3 py-2 bg-green-50 border border-green-200 rounded-lg text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400/40" />
      ) : (
        <div className="mt-1 px-3 py-2 bg-green-50 border border-green-100 rounded-lg">
          <p className="text-xs text-gray-800">{value}</p>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────
export default function ChatDetails({ selectedChat, selectedCallLogId, onClose }) {
  const [activeTab, setActiveTab] = useState('notification');
  const [todos, setTodos] = useState([]);

  // Sync todos when selectedChat changes
  React.useEffect(() => {
    const list = todoLists[selectedChat] || [];
    setTodos(list.map((t) => ({ ...t })));
  }, [selectedChat]);

  const contact = contacts.find((c) => c.id === selectedChat);
  if (!contact) return null;

  const tabItems = [
    { id: 'notification', icon: Bell, label: 'Summary' },
    { id: 'calendar', icon: CalendarIcon, label: 'Schedule' },
    { id: 'contact', icon: AtSign, label: 'Contact' },
    { id: 'ticket', icon: Ticket, label: 'Ticket' },
  ];

  return (
    <div className="w-[320px] min-w-[320px] h-full flex flex-col bg-white border-l border-green-100">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-green-100">
        <h3 className="text-base font-semibold text-gray-800">Call Details</h3>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-green-50 text-gray-400 transition-colors">
          <X size={18} />
        </button>
      </div>

      {/* Contact Info */}
      <div className="flex flex-col items-center py-4 px-5 border-b border-green-100">
        <div className="relative">
          <img src={contact.avatar} alt={contact.name} className="w-16 h-16 rounded-full object-cover" />
          {contact.online && <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />}
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
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`p-2.5 rounded-xl transition-all duration-200 ${isActive ? 'bg-emerald-100 text-emerald-700' : 'text-gray-400 hover:bg-green-50 hover:text-gray-600'}`}
              title={tab.label}>
              <Icon size={18} />
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'notification' && <NotificationTab selectedChat={selectedChat} todos={todos} setTodos={setTodos} />}
        {activeTab === 'calendar' && <CalendarTab selectedChat={selectedChat} selectedCallLogId={selectedCallLogId} />}
        {activeTab === 'contact' && <ContactInfoTab selectedChat={selectedChat} />}
        {activeTab === 'ticket' && <CreateTicketTab selectedChat={selectedChat} selectedCallLogId={selectedCallLogId} />}
      </div>
    </div>
  );
}
