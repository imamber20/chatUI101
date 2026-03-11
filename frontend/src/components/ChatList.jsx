import React, { useState, useMemo } from 'react';
import { Search, PhoneIncoming, Play, Download, Filter, X, Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { contacts, callLogs as initialCallLogs, DUMMY_AUDIO_URL } from '../data/mockData';

const FILTER_OPTIONS = [
  { id: 'all', label: 'All Time' },
  { id: '1day', label: 'Past 1 Day' },
  { id: '7days', label: 'Past 7 Days' },
  { id: '1month', label: 'Past 1 Month' },
  { id: 'custom', label: 'Custom Range' },
];

function formatCallDate(isoStr) {
  const d = new Date(isoStr);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[d.getMonth()];
  const day = d.getDate();
  const hours = d.getHours();
  const mins = d.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHour = hours % 12 || 12;
  return `${month} ${day}, ${displayHour}:${mins} ${ampm}`;
}

function isWithinDays(isoStr, days) {
  const callDate = new Date(isoStr);
  const now = new Date();
  const diff = now.getTime() - callDate.getTime();
  return diff <= days * 24 * 60 * 60 * 1000;
}

function isInRange(isoStr, from, to) {
  const callDate = new Date(isoStr);
  const start = new Date(from);
  start.setHours(0, 0, 0, 0);
  const end = new Date(to);
  end.setHours(23, 59, 59, 999);
  return callDate >= start && callDate <= end;
}

export default function ChatList({ selectedChat, selectedCallLogId, onSelectChat, searchQuery, onSearchChange }) {
  const [readLogs, setReadLogs] = useState(() => {
    const read = {};
    initialCallLogs.forEach((log) => {
      if (log.isRead) read[log.id] = true;
    });
    return read;
  });
  const [activeFilter, setActiveFilter] = useState('all');
  const [showFilterPopover, setShowFilterPopover] = useState(false);
  const [customFrom, setCustomFrom] = useState(undefined);
  const [customTo, setCustomTo] = useState(undefined);
  const [showFromCal, setShowFromCal] = useState(false);
  const [showToCal, setShowToCal] = useState(false);

  const handleLogClick = (log) => {
    setReadLogs((prev) => ({ ...prev, [log.id]: true }));
    onSelectChat(log.contactId, log.id);
  };

  const filteredLogs = useMemo(() => {
    let logs = [...initialCallLogs];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      logs = logs.filter((log) => {
        const contact = contacts.find((c) => c.id === log.contactId);
        return contact?.name.toLowerCase().includes(q);
      });
    }

    // Date filter
    if (activeFilter === '1day') {
      logs = logs.filter((log) => isWithinDays(log.date, 1));
    } else if (activeFilter === '7days') {
      logs = logs.filter((log) => isWithinDays(log.date, 7));
    } else if (activeFilter === '1month') {
      logs = logs.filter((log) => isWithinDays(log.date, 30));
    } else if (activeFilter === 'custom' && customFrom && customTo) {
      logs = logs.filter((log) => isInRange(log.date, customFrom, customTo));
    }

    // Sort newest first
    logs.sort((a, b) => new Date(b.date) - new Date(a.date));
    return logs;
  }, [searchQuery, activeFilter, customFrom, customTo]);

  const handleFilterSelect = (filterId) => {
    setActiveFilter(filterId);
    if (filterId !== 'custom') {
      setCustomFrom(undefined);
      setCustomTo(undefined);
      setShowFilterPopover(false);
    }
  };

  const activeLabel = FILTER_OPTIONS.find((f) => f.id === activeFilter)?.label;

  return (
    <div className="w-[330px] min-w-[330px] h-full flex flex-col bg-white border-r border-green-100">
      {/* Search + Filter */}
      <div className="p-3 space-y-2">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 bg-green-50 border border-green-100 rounded-xl text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-300 transition-all"
          />
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2">
          <Popover open={showFilterPopover} onOpenChange={setShowFilterPopover}>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-medium text-emerald-700 hover:bg-emerald-100 transition-colors">
                <Filter size={13} />
                <span>{activeLabel}</span>
                <ChevronDown size={12} />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0 bg-white border border-green-100 shadow-lg" align="start" sideOffset={6}>
              <div className="p-1">
                {FILTER_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleFilterSelect(opt.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeFilter === opt.id
                        ? 'bg-emerald-100 text-emerald-800 font-medium'
                        : 'text-gray-600 hover:bg-green-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Custom Range Picker */}
              {activeFilter === 'custom' && (
                <div className="border-t border-green-100 p-3 space-y-2">
                  <p className="text-[10px] uppercase tracking-wide text-gray-500 font-medium">Custom Range</p>

                  {/* From Date */}
                  <Popover open={showFromCal} onOpenChange={setShowFromCal}>
                    <PopoverTrigger asChild>
                      <button className="w-full flex items-center gap-2 px-3 py-2 border border-green-200 rounded-lg text-xs text-gray-600 hover:bg-green-50 transition-colors">
                        <CalendarIcon size={13} className="text-emerald-600" />
                        <span>{customFrom ? customFrom.toLocaleDateString() : 'From date'}</span>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white shadow-lg border border-green-100" align="start" sideOffset={4}>
                      <Calendar
                        mode="single"
                        selected={customFrom}
                        onSelect={(d) => { setCustomFrom(d); setShowFromCal(false); }}
                        disabled={(date) => date > new Date()}
                      />
                    </PopoverContent>
                  </Popover>

                  {/* To Date */}
                  <Popover open={showToCal} onOpenChange={setShowToCal}>
                    <PopoverTrigger asChild>
                      <button className="w-full flex items-center gap-2 px-3 py-2 border border-green-200 rounded-lg text-xs text-gray-600 hover:bg-green-50 transition-colors">
                        <CalendarIcon size={13} className="text-emerald-600" />
                        <span>{customTo ? customTo.toLocaleDateString() : 'To date'}</span>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white shadow-lg border border-green-100" align="start" sideOffset={4}>
                      <Calendar
                        mode="single"
                        selected={customTo}
                        onSelect={(d) => { setCustomTo(d); setShowToCal(false); }}
                        disabled={(date) => date > new Date() || (customFrom && date < customFrom)}
                      />
                    </PopoverContent>
                  </Popover>

                  {customFrom && customTo && (
                    <button
                      onClick={() => setShowFilterPopover(false)}
                      className="w-full py-1.5 bg-emerald-500 text-white text-xs font-medium rounded-lg hover:bg-emerald-600 transition-colors"
                    >
                      Apply Range
                    </button>
                  )}
                </div>
              )}
            </PopoverContent>
          </Popover>

          {activeFilter !== 'all' && (
            <button
              onClick={() => { setActiveFilter('all'); setCustomFrom(undefined); setCustomTo(undefined); }}
              className="flex items-center gap-1 px-2 py-1.5 text-xs text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <X size={12} />
              Clear
            </button>
          )}

          <span className="text-[10px] text-gray-400 ml-auto">{filteredLogs.length} calls</span>
        </div>
      </div>

      {/* Call Logs List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {filteredLogs.map((log) => {
          const contact = contacts.find((c) => c.id === log.contactId);
          if (!contact) return null;
          const isRead = readLogs[log.id];
          const isSelected = selectedCallLogId === log.id;

          return (
            <button
              key={log.id}
              onClick={() => handleLogClick(log)}
              className={`w-full flex items-center gap-3 px-3 py-3 transition-all duration-150 text-left border-b border-green-50/80
                ${isSelected ? 'bg-green-100/80 border-r-2 border-r-emerald-500' : ''}
                ${!isRead && !isSelected ? 'bg-white hover:bg-green-50/60' : ''}
                ${isRead && !isSelected ? 'bg-gray-50/60 hover:bg-gray-100/60' : ''}`}
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-11 h-11 rounded-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className={`text-sm truncate ${!isRead ? 'font-bold text-gray-900' : 'font-normal text-gray-500'}`}>
                    {contact.name}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <PhoneIncoming size={12} className={`flex-shrink-0 ${!isRead ? 'text-emerald-600' : 'text-gray-400'}`} />
                  <span className={`text-[11px] truncate ${!isRead ? 'text-gray-700' : 'text-gray-400'}`}>
                    {formatCallDate(log.date)}
                  </span>
                </div>
              </div>

              {/* Duration + Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`text-sm font-mono tabular-nums ${!isRead ? 'font-bold text-gray-900' : 'text-gray-400'}`}>
                  {log.duration}
                </span>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="w-7 h-7 rounded-full border border-green-200 flex items-center justify-center text-gray-400 hover:text-emerald-600 hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
                >
                  <Play size={12} fill="currentColor" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const link = document.createElement('a');
                    link.href = DUMMY_AUDIO_URL;
                    link.download = `call-recording-${contact.name.replace(/\s+/g, '-').toLowerCase()}-${log.id}.mp3`;
                    link.target = '_blank';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="text-gray-400 hover:text-emerald-600 transition-colors"
                  title="Download recording"
                >
                  <Download size={16} />
                </button>
              </div>
            </button>
          );
        })}

        {filteredLogs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <PhoneIncoming size={32} className="mb-2 opacity-40" />
            <p className="text-sm">No call logs found</p>
            <p className="text-xs mt-0.5">Try adjusting your filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
