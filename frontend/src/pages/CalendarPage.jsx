import React, { useState } from 'react';
import { Calendar } from '../components/ui/calendar';
import { CalendarDays, Clock, User, ChevronLeft, ChevronRight } from 'lucide-react';

const appointments = [
  { id: 1, date: new Date(2026, 2, 11, 10, 0), customer: 'Sarah Mitchell', subject: 'Quarterly Report Follow-up', duration: '30 min', color: 'emerald' },
  { id: 2, date: new Date(2026, 2, 11, 14, 0), customer: 'Michael Chen', subject: 'Budget Review Meeting', duration: '45 min', color: 'green' },
  { id: 3, date: new Date(2026, 2, 12, 9, 30), customer: 'James Parker', subject: 'Sprint Retrospective', duration: '1 hr', color: 'teal' },
  { id: 4, date: new Date(2026, 2, 12, 15, 0), customer: 'Elena Rodriguez', subject: 'Design Review Session', duration: '30 min', color: 'emerald' },
  { id: 5, date: new Date(2026, 2, 13, 11, 0), customer: 'Jenny Li', subject: 'Campaign Results Presentation', duration: '45 min', color: 'green' },
  { id: 6, date: new Date(2026, 2, 13, 16, 0), customer: 'David Thompson', subject: 'Client Onboarding Call', duration: '1 hr', color: 'teal' },
  { id: 7, date: new Date(2026, 2, 14, 10, 0), customer: 'Priya Sharma', subject: 'HR Policy Discussion', duration: '30 min', color: 'emerald' },
  { id: 8, date: new Date(2026, 2, 14, 13, 0), customer: 'Alex Morgan', subject: 'Infrastructure Review', duration: '45 min', color: 'green' },
  { id: 9, date: new Date(2026, 2, 15, 9, 0), customer: 'Sarah Mitchell', subject: 'Product Roadmap Sync', duration: '1 hr', color: 'teal' },
  { id: 10, date: new Date(2026, 2, 16, 14, 30), customer: 'Michael Chen', subject: 'Vendor Contract Review', duration: '30 min', color: 'emerald' },
];

const colorMap = {
  emerald: 'bg-emerald-100 border-emerald-300 text-emerald-800',
  green: 'bg-green-100 border-green-300 text-green-800',
  teal: 'bg-teal-100 border-teal-300 text-teal-800',
};

function formatTime(d) {
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 2, 11));

  const dayAppointments = appointments.filter((a) => {
    return a.date.toDateString() === selectedDate.toDateString();
  }).sort((a, b) => a.date - b.date);

  const appointmentDates = [...new Set(appointments.map((a) => a.date.toDateString()))];

  return (
    <div className="flex-1 flex h-full bg-white">
      {/* Calendar Side */}
      <div className="w-[360px] min-w-[360px] border-r border-green-100 flex flex-col">
        <div className="p-4 border-b border-green-100">
          <div className="flex items-center gap-2">
            <CalendarDays size={20} className="text-emerald-600" />
            <h2 className="text-lg font-bold text-gray-800">Calendar</h2>
          </div>
        </div>
        <div className="p-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(d) => d && setSelectedDate(d)}
            className="mx-auto"
            modifiers={{ hasAppointment: appointments.map((a) => a.date) }}
            modifiersClassNames={{ hasAppointment: 'font-bold text-emerald-700' }}
          />
        </div>
        <div className="px-4 pb-4">
          <p className="text-[10px] uppercase tracking-wide text-gray-500 font-medium mb-2">Upcoming This Week</p>
          <div className="space-y-2">
            {appointments.slice(0, 5).map((apt) => (
              <button key={apt.id} onClick={() => setSelectedDate(apt.date)}
                className="w-full text-left p-2.5 bg-green-50 rounded-xl border border-green-100 hover:bg-green-100/60 transition-colors">
                <p className="text-xs font-semibold text-gray-800">{apt.subject}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  {apt.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} · {formatTime(apt.date)} · {apt.customer}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Day View */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl">
          <h3 className="text-lg font-bold text-gray-800 mb-1">
            {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </h3>
          <p className="text-xs text-gray-500 mb-6">{dayAppointments.length} appointment{dayAppointments.length !== 1 ? 's' : ''} scheduled</p>

          {dayAppointments.length > 0 ? (
            <div className="space-y-3">
              {dayAppointments.map((apt) => (
                <div key={apt.id} className={`p-4 rounded-2xl border-l-4 ${colorMap[apt.color]} border`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-semibold">{apt.subject}</h4>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="flex items-center gap-1 text-xs opacity-80"><Clock size={12} /> {formatTime(apt.date)}</span>
                        <span className="flex items-center gap-1 text-xs opacity-80"><User size={12} /> {apt.customer}</span>
                      </div>
                    </div>
                    <span className="text-xs font-medium opacity-70">{apt.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <CalendarDays size={48} className="text-emerald-200 mx-auto mb-3" />
              <p className="text-gray-500">No appointments on this day</p>
              <p className="text-xs text-gray-400 mt-1">Select a date with appointments or schedule a new one</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
