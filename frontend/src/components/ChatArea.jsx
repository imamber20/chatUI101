import React, { useState, useRef, useEffect } from 'react';
import { Search, Phone, Monitor, MoreVertical, Play, Pause, Heart, SkipBack, SkipForward, PhoneIncoming, Bot, X, ChevronUp, ChevronDown } from 'lucide-react';
import { contacts, callLogs, callTranscripts, waveformData, DUMMY_AUDIO_URL } from '../data/mockData';

function formatTime(seconds) {
  if (isNaN(seconds)) return '00:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function formatCallDateFull(isoStr) {
  const d = new Date(isoStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
}

// ─── Audio Player Component (synced waveform) ─────────────────
function AudioPlayer({ audioUrl }) {
  const audioRef = useRef(null);
  const intervalRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);

  // Setup audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => {
      setDuration(audio.duration);
    };
    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    const onEnded = () => {
      setIsPlaying(false);
      clearInterval(intervalRef.current);
    };

    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
      clearInterval(intervalRef.current);
    };
  }, []);

  // Reset when audioUrl changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = audioUrl;
    audio.load();
    setIsPlaying(false);
    setCurrentTime(0);
    clearInterval(intervalRef.current);
  }, [audioUrl]);

  // Smooth interval-based updates during playback
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
        }
      }, 100); // Update every 100ms for smooth waveform
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const skip = (sec) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(audio.duration || 0, audio.currentTime + sec));
    setCurrentTime(audio.currentTime);
  };

  const cycleSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2, 0.75];
    const idx = speeds.indexOf(playbackRate);
    const next = speeds[(idx + 1) % speeds.length];
    setPlaybackRate(next);
    if (audioRef.current) audioRef.current.playbackRate = next;
  };

  const seekToPosition = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, x / rect.width));
    const audio = audioRef.current;
    if (audio && duration > 0) {
      audio.currentTime = pct * duration;
      setCurrentTime(audio.currentTime);
    }
  };

  const progress = duration > 0 ? (currentTime / duration) : 0;
  const progressBarIdx = Math.floor(progress * waveformData.length);

  return (
    <div className="mx-4 mb-3 rounded-2xl border border-green-200 bg-gradient-to-b from-green-50 to-emerald-50 overflow-hidden shadow-sm">
      <audio ref={audioRef} preload="metadata" />

      {/* Waveform */}
      <div className="px-5 pt-3 pb-1 cursor-pointer" onClick={seekToPosition}>
        <div className="flex items-end justify-center gap-[2px] h-10">
          {waveformData.map((h, i) => (
            <div
              key={i}
              className={`w-[2.5px] rounded-full ${
                i <= progressBarIdx ? 'bg-emerald-600' : 'bg-green-200'
              }`}
              style={{ height: `${Math.round(h * 0.8)}px` }}
            />
          ))}
        </div>
      </div>

      {/* Time display */}
      <div className="flex justify-between px-5 pb-1">
        <span className={`text-[11px] font-mono tabular-nums ${isPlaying ? 'text-emerald-600' : 'text-gray-500'}`}>
          {formatTime(currentTime)}
        </span>
        <span className="text-[11px] font-mono tabular-nums text-gray-400">
          {formatTime(duration)}
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 pb-3 px-5">
        <button onClick={cycleSpeed}
          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-emerald-700 transition-colors"
          title={`Speed: ${playbackRate}x`}>
          <span className="text-[10px] font-bold">{playbackRate}x</span>
        </button>
        <button onClick={() => skip(-10)}
          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-emerald-700 transition-colors relative"
          title="Rewind 10s">
          <SkipBack size={18} />
          <span className="absolute -bottom-0.5 text-[7px] font-bold text-gray-400">10</span>
        </button>
        <button onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-emerald-800 text-white flex items-center justify-center hover:bg-emerald-900 transition-colors shadow-lg shadow-emerald-800/30">
          {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} fill="white" className="ml-0.5" />}
        </button>
        <button onClick={() => skip(10)}
          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-emerald-700 transition-colors relative"
          title="Forward 10s">
          <SkipForward size={18} />
          <span className="absolute -bottom-0.5 text-[7px] font-bold text-gray-400">10</span>
        </button>
        <button onClick={() => setIsFavorited(!isFavorited)}
          className={`w-8 h-8 flex items-center justify-center transition-colors ${isFavorited ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}
          title="Favorite">
          <Heart size={18} fill={isFavorited ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="h-0.5 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-400" />
    </div>
  );
}

// ─── Highlight helper ──────────────────────────────────────────
function HighlightText({ text, query }) {
  if (!query.trim()) return <>{text}</>;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-yellow-300/80 text-inherit rounded px-0.5">{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

// ─── Main ChatArea (Transcript View) ───────────────────────────
export default function ChatArea({ selectedChat, selectedCallLogId, onToggleDetails, showDetails }) {
  const messagesEndRef = useRef(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [matchIndex, setMatchIndex] = useState(0);
  const matchRefs = useRef([]);

  const contact = contacts.find((c) => c.id === selectedChat);
  const callLog = callLogs.find((cl) => cl.id === selectedCallLogId);
  const transcript = callTranscripts[selectedCallLogId];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedCallLogId]);

  // Reset search when switching call logs
  useEffect(() => {
    setSearchOpen(false);
    setSearchQuery('');
    setMatchIndex(0);
  }, [selectedCallLogId]);

  const currentMessages = transcript?.messages || [];

  // Find matches
  const matches = searchQuery.trim()
    ? currentMessages
        .map((msg, idx) => ({ msgIdx: idx, msg }))
        .filter(({ msg }) => msg.text.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  // Scroll to current match
  useEffect(() => {
    if (matches.length > 0 && matchRefs.current[matchIndex]) {
      matchRefs.current[matchIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [matchIndex, matches.length]);

  const nextMatch = () => {
    if (matches.length > 0) setMatchIndex((prev) => (prev + 1) % matches.length);
  };
  const prevMatch = () => {
    if (matches.length > 0) setMatchIndex((prev) => (prev - 1 + matches.length) % matches.length);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (searchOpen) { setSearchQuery(''); setMatchIndex(0); }
  };

  if (!contact || !callLog) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-green-50 to-white">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <PhoneIncoming size={32} className="text-emerald-400" />
          </div>
          <p className="text-gray-500 text-lg">Select a call log to view transcript</p>
          <p className="text-gray-400 text-sm mt-1">Choose from the call logs on the left</p>
        </div>
      </div>
    );
  }

  // Build a set of matched message indices for highlight reference assignment
  const matchedMsgIndices = new Set(matches.map((m) => m.msgIdx));
  let refCounter = 0;

  return (
    <div className="flex-1 flex flex-col h-full bg-gradient-to-br from-green-50/50 to-white">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-green-100 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-full object-cover" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-800">{contact.name}</h2>
            <p className="text-xs text-gray-400">
              Call transcript · {callLog.duration} · {formatCallDateFull(callLog.date)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={toggleSearch}
            className={`p-2 rounded-lg transition-colors ${searchOpen ? 'bg-emerald-100 text-emerald-700' : 'hover:bg-green-50 text-gray-500'}`}>
            <Search size={18} />
          </button>
          <button className="p-2 rounded-lg hover:bg-green-50 text-gray-500 transition-colors">
            <Phone size={18} />
          </button>
          <button onClick={onToggleDetails}
            className={`p-2 rounded-lg transition-colors ${showDetails ? 'bg-emerald-100 text-emerald-700' : 'hover:bg-green-50 text-gray-500'}`}>
            <Monitor size={18} />
          </button>
          <button className="p-2 rounded-lg hover:bg-green-50 text-gray-500 transition-colors">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      {/* In-chat Search Bar */}
      {searchOpen && (
        <div className="flex items-center gap-2 px-5 py-2 border-b border-green-100 bg-white">
          <Search size={15} className="text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search in conversation..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setMatchIndex(0); }}
            autoFocus
            className="flex-1 py-1.5 text-sm text-gray-700 placeholder:text-gray-400 bg-transparent focus:outline-none"
          />
          {searchQuery.trim() && (
            <span className="text-[11px] text-gray-500 flex-shrink-0 tabular-nums">
              {matches.length > 0 ? `${matchIndex + 1} of ${matches.length}` : 'No matches'}
            </span>
          )}
          <button onClick={prevMatch} disabled={matches.length === 0}
            className="p-1 rounded hover:bg-green-50 text-gray-400 disabled:opacity-30 transition-colors">
            <ChevronUp size={16} />
          </button>
          <button onClick={nextMatch} disabled={matches.length === 0}
            className="p-1 rounded hover:bg-green-50 text-gray-400 disabled:opacity-30 transition-colors">
            <ChevronDown size={16} />
          </button>
          <button onClick={toggleSearch} className="p-1 rounded hover:bg-green-50 text-gray-400 transition-colors">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Subject Banner */}
      {transcript?.subject && (
        <div className="px-5 py-2.5 bg-gradient-to-r from-emerald-50 to-green-50 border-b border-green-100/80">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-5 rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold text-emerald-800">{transcript.subject}</span>
          </div>
        </div>
      )}

      {/* Transcript Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {currentMessages.map((msg, msgIdx) => {
          const isCaller = msg.sender === 'caller';
          const isMatchedMsg = matchedMsgIndices.has(msgIdx);
          const currentRefIdx = isMatchedMsg ? refCounter++ : -1;
          const isCurrentMatch = isMatchedMsg && matches[matchIndex]?.msgIdx === msgIdx;

          return (
            <div
              key={msg.id}
              ref={isMatchedMsg ? (el) => { matchRefs.current[currentRefIdx] = el; } : null}
              className={`flex ${isCaller ? 'justify-start' : 'justify-end'} gap-2 ${
                isCurrentMatch ? 'ring-2 ring-emerald-400 ring-offset-2 rounded-2xl' : ''
              }`}
            >
              {isCaller && (
                <img src={contact.avatar} alt="" className="w-8 h-8 rounded-full object-cover self-end flex-shrink-0" />
              )}

              <div className="max-w-[65%]">
                {isCaller && (
                  <p className="text-xs font-medium text-emerald-700 mb-1 ml-1">{contact.name}</p>
                )}
                {!isCaller && (
                  <p className="text-xs font-medium text-emerald-600 mb-1 mr-1 text-right">Kiki</p>
                )}
                <div className={`rounded-2xl px-4 py-2.5 shadow-sm ${
                  isCaller
                    ? 'bg-white border border-green-100 text-gray-700 rounded-bl-md'
                    : 'bg-emerald-600 text-white rounded-br-md'
                }`}>
                  <p className="text-sm leading-relaxed">
                    {searchQuery.trim() ? (
                      <HighlightText text={msg.text} query={searchQuery} />
                    ) : (
                      msg.text
                    )}
                  </p>
                  <div className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                    isCaller ? 'text-gray-400' : 'text-emerald-200'
                  }`}>
                    <span>{msg.time}</span>
                  </div>
                </div>
              </div>

              {!isCaller && (
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center self-end flex-shrink-0">
                  <Bot size={16} className="text-emerald-700" />
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Audio Player */}
      <AudioPlayer audioUrl={DUMMY_AUDIO_URL} />
    </div>
  );
}
