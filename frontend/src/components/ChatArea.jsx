import React, { useState, useRef, useEffect } from 'react';
import { Search, Phone, Monitor, MoreVertical, Paperclip, Mic, Send, Play, Eye, Smile } from 'lucide-react';
import { contacts, messages as allMessages } from '../data/mockData';

export default function ChatArea({ selectedChat, onToggleDetails, showDetails }) {
  const [inputText, setInputText] = useState('');
  const [chatMessages, setChatMessages] = useState({});
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setChatMessages({ ...allMessages });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedChat, chatMessages]);

  const contact = contacts.find((c) => c.id === selectedChat);
  const currentMessages = chatMessages[selectedChat] || [];

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: 'me',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
    };
    setChatMessages((prev) => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMsg],
    }));
    setInputText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!contact) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-green-50 to-white">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <Search size={32} className="text-emerald-400" />
          </div>
          <p className="text-gray-500 text-lg">Select a chat to start messaging</p>
          <p className="text-gray-400 text-sm mt-1">Choose from your contacts on the left</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-gradient-to-br from-green-50/50 to-white">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-green-100 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-full object-cover" />
            {contact.online && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
            )}
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-800">{contact.name}</h2>
            <p className="text-xs text-gray-400">
              {contact.online ? 'Online' : 'Last seen recently'}
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

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {currentMessages.map((msg) => {
          const isMe = msg.sender === 'me';
          const senderContact = !isMe ? contacts.find((c) => c.id === msg.sender) : null;

          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} gap-2`}>
              {!isMe && senderContact && (
                <img src={senderContact.avatar} alt="" className="w-8 h-8 rounded-full object-cover self-end flex-shrink-0" />
              )}
              <div className={`max-w-[65%] ${isMe ? 'order-first' : ''}`}>
                {!isMe && senderContact && (
                  <p className="text-xs font-medium text-emerald-700 mb-1 ml-1">{senderContact.name}</p>
                )}
                {msg.type === 'image' ? (
                  <div className={`rounded-2xl overflow-hidden shadow-sm ${isMe ? 'rounded-br-md' : 'rounded-bl-md'}`}>
                    <img src={msg.image} alt="" className="w-full max-w-[320px] object-cover" />
                    {msg.caption && (
                      <div className={`px-3 py-2 text-xs ${isMe ? 'bg-emerald-600 text-white' : 'bg-white text-gray-700 border border-green-100'}`}>
                        {msg.caption}
                      </div>
                    )}
                    <div className={`flex items-center justify-end gap-1 px-3 py-1 text-[10px] ${isMe ? 'bg-emerald-600 text-emerald-200' : 'bg-white text-gray-400 border-x border-b border-green-100'}`}>
                      <Eye size={10} />
                      <span>3</span>
                      <span className="ml-1">{msg.time}</span>
                    </div>
                  </div>
                ) : msg.type === 'audio' ? (
                  <div className={`rounded-2xl px-4 py-3 shadow-sm ${isMe ? 'bg-emerald-600 text-white rounded-br-md' : 'bg-white border border-green-100 text-gray-700 rounded-bl-md'}`}>
                    <div className="flex items-center gap-3">
                      <button className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isMe ? 'bg-emerald-700' : 'bg-emerald-100'}`}>
                        <Play size={14} className={isMe ? 'text-white' : 'text-emerald-700'} fill="currentColor" />
                      </button>
                      <div className="flex-1">
                        <div className="flex items-center gap-1">
                          {[...Array(20)].map((_, i) => (
                            <div key={i} className={`w-1 rounded-full ${isMe ? 'bg-emerald-300' : 'bg-emerald-300'}`} style={{ height: `${Math.random() * 16 + 4}px` }} />
                          ))}
                        </div>
                        <div className={`flex items-center gap-2 mt-1 text-[10px] ${isMe ? 'text-emerald-200' : 'text-gray-400'}`}>
                          <span>{msg.duration}</span>
                          <span>{msg.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${isMe ? 'text-emerald-200' : 'text-gray-400'}`}>
                      <Eye size={10} />
                      <span>3</span>
                      <span className="ml-1">{msg.time}</span>
                    </div>
                  </div>
                ) : (
                  <div className={`rounded-2xl px-4 py-2.5 shadow-sm ${isMe ? 'bg-emerald-600 text-white rounded-br-md' : 'bg-white border border-green-100 text-gray-700 rounded-bl-md'}`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <div className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${isMe ? 'text-emerald-200' : 'text-gray-400'}`}>
                      <Eye size={10} />
                      <span>3</span>
                      <span className="ml-1">{msg.time}</span>
                    </div>
                  </div>
                )}
              </div>
              {isMe && (
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center self-end flex-shrink-0">
                  <span className="text-xs font-semibold text-emerald-700">You</span>
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-5 py-3 border-t border-green-100 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-green-50 text-gray-400 transition-colors">
            <Smile size={20} />
          </button>
          <button className="p-2 rounded-lg hover:bg-green-50 text-gray-400 transition-colors">
            <Paperclip size={20} />
          </button>
          <input
            type="text"
            placeholder="Your message"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 px-4 py-2.5 bg-green-50 border border-green-100 rounded-xl text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-300 transition-all"
          />
          {inputText.trim() ? (
            <button onClick={handleSend} className="p-2.5 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 transition-colors shadow-sm">
              <Send size={18} />
            </button>
          ) : (
            <button className="p-2 rounded-lg hover:bg-green-50 text-gray-400 transition-colors">
              <Mic size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
