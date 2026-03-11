import React from 'react';
import {
  Bot,
  Users,
  LayoutDashboard,
  Calendar,
  BarChart3,
  CreditCard,
  Settings } from
'lucide-react';

const navItems = [
{ id: 'chats', icon: Bot, label: "AI Centre", badge: 10 },
{ id: 'work', icon: Users, label: "Employees" },
{ id: 'meet', icon: LayoutDashboard, label: "Dashboard" },
{ id: 'calendar', icon: Calendar, label: 'Calendar' },
{ id: 'rating', icon: BarChart3, label: "Analysis" },
{ id: 'saved', icon: CreditCard, label: "Subscription" }];


export default function Sidebar({ activeNav, onNavChange }) {
  return (
    <div className="w-[72px] min-w-[72px] h-full flex flex-col items-center py-5 bg-gradient-to-b from-emerald-950 to-green-900">
      {/* Logo */}
      <div className="mb-6">
        <span className="!font-bold !text-base text-white">HeyKiki</span>
      </div>

      {/* Nav Items */}
      <div className="flex-1 flex flex-col items-center gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavChange(item.id)}
              className={`relative flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-all duration-200 group
                ${
              isActive ?
              'bg-emerald-600/30 text-white' :
              'text-green-300/60 hover:text-white hover:bg-emerald-800/30'}`
              }>

              <Icon size={22} strokeWidth={isActive ? 2.2 : 1.8} />
              <span className="text-[10px] mt-0.5 leading-tight">{item.label}</span>
              {item.badge &&
              <span className="absolute top-1 right-1.5 bg-emerald-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {item.badge}
                </span>
              }
            </button>);

        })}
      </div>

      {/* Settings at bottom */}
      <div className="mt-auto flex flex-col items-center gap-1">
        <button
          onClick={() => onNavChange('settings')}
          className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-all duration-200
            ${
          activeNav === 'settings' ?
          'bg-emerald-600/30 text-white' :
          'text-green-300/60 hover:text-white hover:bg-emerald-800/30'}`
          }>

          <Settings size={22} strokeWidth={1.8} />
          <span className="text-[10px] mt-0.5 leading-tight">Settings</span>
        </button>
      </div>
    </div>);

}