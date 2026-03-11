import React, { useState } from 'react';
import { Search, Users, Ticket, User, Phone, Mail, ChevronRight } from 'lucide-react';

const employeesData = [
  {
    id: 'emp1', name: 'Rachel Green', role: 'Customer Support Lead', department: 'Support',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    email: 'rachel.green@heykiki.com', phone: '+1 (415) 555-0201',
    activeTickets: 8, resolvedTickets: 145,
    customers: ['Sarah Mitchell', 'Elena Rodriguez', 'Priya Sharma'],
    status: 'online',
  },
  {
    id: 'emp2', name: 'Tom Bradley', role: 'Technical Support', department: 'Engineering',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    email: 'tom.bradley@heykiki.com', phone: '+1 (415) 555-0202',
    activeTickets: 12, resolvedTickets: 230,
    customers: ['James Parker', 'Alex Morgan', 'Michael Chen'],
    status: 'online',
  },
  {
    id: 'emp3', name: 'Nina Patel', role: 'Account Manager', department: 'Sales',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    email: 'nina.patel@heykiki.com', phone: '+1 (415) 555-0203',
    activeTickets: 5, resolvedTickets: 98,
    customers: ['David Thompson', 'Jenny Li'],
    status: 'away',
  },
  {
    id: 'emp4', name: 'Chris Wong', role: 'Product Specialist', department: 'Product',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    email: 'chris.wong@heykiki.com', phone: '+1 (415) 555-0204',
    activeTickets: 3, resolvedTickets: 67,
    customers: ['Sarah Mitchell', 'James Parker'],
    status: 'offline',
  },
  {
    id: 'emp5', name: 'Maria Santos', role: 'Billing Specialist', department: 'Finance',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    email: 'maria.santos@heykiki.com', phone: '+1 (415) 555-0205',
    activeTickets: 6, resolvedTickets: 112,
    customers: ['Michael Chen', 'Priya Sharma', 'Elena Rodriguez'],
    status: 'online',
  },
  {
    id: 'emp6', name: 'Jake Morrison', role: 'Senior Engineer', department: 'Engineering',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    email: 'jake.morrison@heykiki.com', phone: '+1 (415) 555-0206',
    activeTickets: 10, resolvedTickets: 189,
    customers: ['Alex Morgan', 'David Thompson', 'Jenny Li'],
    status: 'online',
  },
];

export default function EmployeesPage() {
  const [search, setSearch] = useState('');
  const [selectedEmp, setSelectedEmp] = useState(null);

  const filtered = employeesData.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.department.toLowerCase().includes(search.toLowerCase())
  );

  const statusColor = { online: 'bg-emerald-500', away: 'bg-amber-400', offline: 'bg-gray-300' };

  return (
    <div className="flex-1 flex h-full bg-white">
      {/* Employee List */}
      <div className="w-[380px] min-w-[380px] border-r border-green-100 flex flex-col">
        <div className="p-4 border-b border-green-100">
          <div className="flex items-center gap-2 mb-3">
            <Users size={20} className="text-emerald-600" />
            <h2 className="text-lg font-bold text-gray-800">Employees</h2>
            <span className="ml-auto text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">{employeesData.length}</span>
          </div>
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search employees..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-green-50 border border-green-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/40" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filtered.map((emp) => (
            <button key={emp.id} onClick={() => setSelectedEmp(emp)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-b border-green-50 ${
                selectedEmp?.id === emp.id ? 'bg-green-100/80' : 'hover:bg-green-50/60'
              }`}>
              <div className="relative">
                <img src={emp.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${statusColor[emp.status]}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{emp.name}</p>
                <p className="text-[11px] text-gray-500">{emp.role} · {emp.department}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs font-bold text-emerald-600">{emp.activeTickets}</p>
                <p className="text-[10px] text-gray-400">active</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Employee Detail */}
      <div className="flex-1 overflow-y-auto">
        {selectedEmp ? (
          <div className="p-6 max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <img src={selectedEmp.avatar} alt="" className="w-20 h-20 rounded-2xl object-cover" />
                <span className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${statusColor[selectedEmp.status]}`} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{selectedEmp.name}</h3>
                <p className="text-sm text-gray-500">{selectedEmp.role}</p>
                <span className="inline-block mt-1 px-2.5 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">{selectedEmp.department}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-100">
                <Mail size={16} className="text-emerald-600" />
                <div><p className="text-[10px] text-gray-500 uppercase">Email</p><p className="text-xs text-gray-800">{selectedEmp.email}</p></div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-100">
                <Phone size={16} className="text-emerald-600" />
                <div><p className="text-[10px] text-gray-500 uppercase">Phone</p><p className="text-xs text-gray-800">{selectedEmp.phone}</p></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 text-center">
                <Ticket size={20} className="text-emerald-600 mx-auto mb-1" />
                <p className="text-2xl font-bold text-emerald-700">{selectedEmp.activeTickets}</p>
                <p className="text-xs text-gray-500">Active Tickets</p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl border border-green-100 text-center">
                <Ticket size={20} className="text-green-600 mx-auto mb-1" />
                <p className="text-2xl font-bold text-green-700">{selectedEmp.resolvedTickets}</p>
                <p className="text-xs text-gray-500">Resolved Tickets</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <User size={16} className="text-emerald-600" /> Assigned Customers
              </h4>
              <div className="space-y-2">
                {selectedEmp.customers.map((c, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-100">
                    <span className="text-sm text-gray-700">{c}</span>
                    <ChevronRight size={14} className="text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center h-full">
            <div className="text-center">
              <Users size={48} className="text-emerald-200 mx-auto mb-3" />
              <p className="text-gray-500">Select an employee to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
