import React from 'react';
import { Search, Pin, Check, CheckCheck } from 'lucide-react';

export default function ChatList({ contacts, selectedChat, onSelectChat, searchQuery, onSearchChange }) {
  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-[300px] min-w-[300px] h-full flex flex-col bg-white border-r border-green-100">
      {/* Search */}
      <div className="p-3">
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
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {filteredContacts.map((contact) => (
          <button
            key={contact.id}
            onClick={() => onSelectChat(contact.id)}
            className={`w-full flex items-center gap-3 px-3 py-3 transition-all duration-150 text-left
              ${
                selectedChat === contact.id
                  ? 'bg-green-100/80 border-r-2 border-emerald-500'
                  : 'hover:bg-green-50/60'
              }`}
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-11 h-11 rounded-full object-cover"
              />
              {contact.online && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-800 truncate">
                  {contact.name}
                </span>
                <span className="text-[11px] text-gray-400 flex-shrink-0 ml-2">
                  {contact.time}
                </span>
              </div>
              <div className="flex items-center justify-between mt-0.5">
                <span className="text-xs text-gray-500 truncate pr-2 flex items-center gap-1">
                  {contact.delivered && (
                    <CheckCheck size={13} className="text-emerald-500 flex-shrink-0" />
                  )}
                  {contact.lastMessage}
                </span>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {contact.unread > 0 && (
                    <span className="bg-emerald-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                      {contact.unread}
                    </span>
                  )}
                  {contact.pinned && (
                    <Pin size={12} className="text-emerald-600/60 rotate-45" />
                  )}
                </div>
              </div>
            </div>
          </button>
        ))}

        {filteredContacts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <Search size={32} className="mb-2 opacity-40" />
            <p className="text-sm">No chats found</p>
          </div>
        )}
      </div>
    </div>
  );
}
