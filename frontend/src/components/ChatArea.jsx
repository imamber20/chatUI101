import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Search, Phone, Monitor, MoreVertical, Play, Pause, Heart, SkipBack, SkipForward, PhoneIncoming, Bot } from 'lucide-react';
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

// Audio Player Component
function AudioPlayer({ audioUrl }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = audioUrl;
    audio.playbackRate = playbackRate;
    setIsPlaying(false);
    setCurrentTime(0);

    const onLoaded = () => setDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);
    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('ended', onEnded);
      audio.pause();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [audioUrl, playbackRate]);

  const updateTime = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
    if (isPlaying) {
      animFrameRef.current = requestAnimationFrame(updateTime);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      animFrameRef.current = requestAnimationFrame(updateTime);
    } else if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    return () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); };
  }, [isPlaying, updateTime]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) { audio.pause(); setIsPlaying(false); }
    else { audio.play().then(() => setIsPlaying(true)).catch(() => {}); }
  };

  const skip = (sec) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(audio.duration, audio.currentTime + sec));
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
    const pct = x / rect.width;
    const audio = audioRef.current;
    if (audio && duration) {
      audio.currentTime = pct * duration;
      setCurrentTime(audio.currentTime);
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const progressBarIdx = Math.floor((progress / 100) * waveformData.length);

  return (
    <div className="border-t-2 border-emerald-400 bg-gradient-to-b from-green-50 to-emerald-50">
      <audio ref={audioRef} preload="metadata" />

      {/* Waveform */}
      <div
        className="px-6 pt-4 pb-1 cursor-pointer"
        onClick={seekToPosition}
      >
        <div className="flex items-end justify-center gap-[2px] h-12">
          {waveformData.map((h, i) => (
            <div
              key={i}
              className={`w-[3px] rounded-full transition-colors duration-75 ${
                i <= progressBarIdx ? 'bg-emerald-500' : 'bg-green-200'
              }`}
              style={{ height: `${h}px` }}
            />
          ))}
        </div>
      </div>

      {/* Time display */}
      <div className="flex justify-between px-6 pb-2">
        <span className={`text-xs font-mono tabular-nums ${isPlaying ? 'text-emerald-600' : 'text-gray-500'}`}>
          {formatTime(currentTime)}
        </span>
        <span className="text-xs font-mono tabular-nums text-gray-400">
          {formatTime(duration)}
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-5 pb-4 px-6">
        {/* Speed */}
        <button
          onClick={cycleSpeed}
          className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-emerald-700 transition-colors"
          title={`Speed: ${playbackRate}x`}
        >
          <span className="text-[11px] font-bold">{playbackRate}x</span>
        </button>

        {/* Rewind 10s */}
        <button
          onClick={() => skip(-10)}
          className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-emerald-700 transition-colors relative"
          title="Rewind 10s"
        >
          <SkipBack size={20} />
          <span className="absolute -bottom-0.5 text-[8px] font-bold text-gray-400">10</span>
        </button>

        {/* Play / Pause */}
        <button
          onClick={togglePlay}
          className="w-14 h-14 rounded-full bg-emerald-800 text-white flex items-center justify-center hover:bg-emerald-900 transition-colors shadow-lg shadow-emerald-800/30"
        >
          {isPlaying ? <Pause size={24} fill="white" /> : <Play size={24} fill="white" className="ml-1" />}
        </button>

        {/* Forward 10s */}
        <button
          onClick={() => skip(10)}
          className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-emerald-700 transition-colors relative"
          title="Forward 10s"
        >
          <SkipForward size={20} />
          <span className="absolute -bottom-0.5 text-[8px] font-bold text-gray-400">10</span>
        </button>

        {/* Favorite */}
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className={`w-9 h-9 flex items-center justify-center transition-colors ${
            isFavorited ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
          }`}
          title="Favorite"
        >
          <Heart size={20} fill={isFavorited ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Bottom accent */}
      <div className="h-1 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-400" />
    </div>
  );
}

// Main ChatArea (Transcript View)
export default function ChatArea({ selectedChat, selectedCallLogId, onToggleDetails, showDetails }) {
  const messagesEndRef = useRef(null);

  const contact = contacts.find((c) => c.id === selectedChat);
  const callLog = callLogs.find((cl) => cl.id === selectedCallLogId);
  const transcript = callTranscripts[selectedCallLogId];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedCallLogId]);

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

  const currentMessages = transcript?.messages || [];

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
          <button className="p-2 rounded-lg hover:bg-green-50 text-gray-500 transition-colors">
            <Search size={18} />
          </button>
          <button className="p-2 rounded-lg hover:bg-green-50 text-gray-500 transition-colors">
            <Phone size={18} />
          </button>
          <button
            onClick={onToggleDetails}
            className={`p-2 rounded-lg transition-colors ${showDetails ? 'bg-emerald-100 text-emerald-700' : 'hover:bg-green-50 text-gray-500'}`}
          >
            <Monitor size={18} />
          </button>
          <button className="p-2 rounded-lg hover:bg-green-50 text-gray-500 transition-colors">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

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
        {currentMessages.map((msg) => {
          const isCaller = msg.sender === 'caller';

          return (
            <div key={msg.id} className={`flex ${isCaller ? 'justify-start' : 'justify-end'} gap-2`}>
              {/* Caller avatar */}
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
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <div className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                    isCaller ? 'text-gray-400' : 'text-emerald-200'
                  }`}>
                    <span>{msg.time}</span>
                  </div>
                </div>
              </div>

              {/* Kiki avatar */}
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

      {/* Audio Player instead of message input */}
      <AudioPlayer audioUrl={DUMMY_AUDIO_URL} />
    </div>
  );
}
