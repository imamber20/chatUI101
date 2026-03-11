import React, { useState } from 'react';
import { Settings, User, Building2, Bot, Palette, Bell, Shield, Save, Upload, Check } from 'lucide-react';

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Amber Johnson',
    email: 'amber@heykiki.com',
    phone: '+1 (415) 555-0100',
    role: 'Admin',
  });
  const [company, setCompany] = useState({
    name: 'HeyKiki Inc.',
    website: 'https://heykiki.com',
    industry: 'SaaS / Customer Support',
    logo: '',
  });
  const [agent, setAgent] = useState({
    name: 'Kiki',
    greeting: 'Hello! I\'m Kiki, your AI assistant. How can I help you today?',
    language: 'English',
    tone: 'professional',
    autoTranscribe: true,
    autoSummary: true,
    autoTodo: true,
  });

  const sections = [
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'company', icon: Building2, label: 'Company' },
    { id: 'agent', icon: Bot, label: 'Agent Config' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
  ];

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="flex-1 flex h-full bg-white">
      {/* Settings Nav */}
      <div className="w-[240px] min-w-[240px] border-r border-green-100 p-4">
        <div className="flex items-center gap-2 mb-4">
          <Settings size={20} className="text-emerald-600" />
          <h2 className="text-lg font-bold text-gray-800">Settings</h2>
        </div>
        <div className="space-y-1">
          {sections.map((s) => {
            const Icon = s.icon;
            return (
              <button key={s.id} onClick={() => setActiveSection(s.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                  activeSection === s.id ? 'bg-emerald-100 text-emerald-700 font-semibold' : 'text-gray-600 hover:bg-green-50'
                }`}>
                <Icon size={16} /> {s.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-xl">

          {activeSection === 'profile' && (
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">Your Profile</h3>
              <p className="text-xs text-gray-500 mb-6">Manage your personal information</p>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-2xl bg-emerald-100 flex items-center justify-center">
                  <User size={32} className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{profile.name}</p>
                  <p className="text-xs text-gray-500">{profile.role}</p>
                  <button className="mt-1 text-xs text-emerald-600 hover:underline">Change avatar</button>
                </div>
              </div>
              <div className="space-y-4">
                <SettingsField label="Full Name" value={profile.name} onChange={(v) => setProfile({ ...profile, name: v })} />
                <SettingsField label="Email" value={profile.email} onChange={(v) => setProfile({ ...profile, email: v })} />
                <SettingsField label="Phone" value={profile.phone} onChange={(v) => setProfile({ ...profile, phone: v })} />
                <SettingsField label="Role" value={profile.role} onChange={(v) => setProfile({ ...profile, role: v })} />
              </div>
            </div>
          )}

          {activeSection === 'company' && (
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">Company Settings</h3>
              <p className="text-xs text-gray-500 mb-6">Personalize your dashboard branding</p>
              <div className="flex items-center gap-4 mb-6 p-4 bg-green-50 rounded-2xl border border-green-100">
                <div className="w-20 h-20 rounded-2xl bg-white border-2 border-dashed border-green-300 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-400 transition-colors">
                  <Upload size={20} className="text-emerald-400 mb-1" />
                  <span className="text-[9px] text-gray-400">Upload Logo</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{company.name}</p>
                  <p className="text-xs text-gray-500">{company.website}</p>
                  <p className="text-[10px] text-emerald-600 mt-0.5">Logo appears on client-facing screens</p>
                </div>
              </div>
              <div className="space-y-4">
                <SettingsField label="Company Name" value={company.name} onChange={(v) => setCompany({ ...company, name: v })} />
                <SettingsField label="Website" value={company.website} onChange={(v) => setCompany({ ...company, website: v })} />
                <SettingsField label="Industry" value={company.industry} onChange={(v) => setCompany({ ...company, industry: v })} />
              </div>
            </div>
          )}

          {activeSection === 'agent' && (
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">Agent Configuration</h3>
              <p className="text-xs text-gray-500 mb-6">Configure Kiki\'s behavior and responses</p>
              <div className="flex items-center gap-4 mb-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                <div className="w-16 h-16 rounded-2xl bg-emerald-200 flex items-center justify-center">
                  <Bot size={28} className="text-emerald-700" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-800">{agent.name}</p>
                  <p className="text-xs text-emerald-600">AI Voice Agent</p>
                </div>
              </div>
              <div className="space-y-4">
                <SettingsField label="Agent Name" value={agent.name} onChange={(v) => setAgent({ ...agent, name: v })} />
                <div>
                  <label className="text-[10px] uppercase tracking-wide text-gray-500 font-medium">Greeting Message</label>
                  <textarea value={agent.greeting} onChange={(e) => setAgent({ ...agent, greeting: e.target.value })} rows={3}
                    className="w-full mt-1 px-4 py-2.5 bg-green-50 border border-green-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 resize-none" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wide text-gray-500 font-medium">Tone</label>
                  <div className="flex gap-2 mt-1">
                    {['professional', 'friendly', 'casual'].map((t) => (
                      <button key={t} onClick={() => setAgent({ ...agent, tone: t })}
                        className={`px-4 py-2 rounded-xl text-xs font-medium capitalize transition-colors ${
                          agent.tone === t ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-green-50 text-gray-500 border border-green-100'
                        }`}>{t}</button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3 pt-2">
                  <ToggleSetting label="Auto Transcription" description="Automatically transcribe all calls" checked={agent.autoTranscribe} onChange={() => setAgent({ ...agent, autoTranscribe: !agent.autoTranscribe })} />
                  <ToggleSetting label="Auto Summary" description="Generate AI summaries after calls" checked={agent.autoSummary} onChange={() => setAgent({ ...agent, autoSummary: !agent.autoSummary })} />
                  <ToggleSetting label="Auto To-Do Extraction" description="Extract action items from conversations" checked={agent.autoTodo} onChange={() => setAgent({ ...agent, autoTodo: !agent.autoTodo })} />
                </div>
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-1">Notifications</h3>
              <p className="text-xs text-gray-500 mb-6">Configure how you receive alerts</p>
              <div className="space-y-3">
                <ToggleSetting label="New Call Alerts" description="Get notified when a new call comes in" checked={true} onChange={() => {}} />
                <ToggleSetting label="Ticket Updates" description="Alerts when tickets are assigned or resolved" checked={true} onChange={() => {}} />
                <ToggleSetting label="Daily Summary Email" description="Receive a daily digest at 6 PM" checked={false} onChange={() => {}} />
                <ToggleSetting label="Weekly Analytics Report" description="Weekly performance metrics sent every Monday" checked={true} onChange={() => {}} />
              </div>
            </div>
          )}

          {/* Save Button */}
          <button onClick={handleSave}
            className="mt-8 flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 transition-colors shadow-sm">
            {saved ? <><Check size={16} /> Saved!</> : <><Save size={16} /> Save Changes</>}
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingsField({ label, value, onChange }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-wide text-gray-500 font-medium">{label}</label>
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 px-4 py-2.5 bg-green-50 border border-green-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-400/40" />
    </div>
  );
}

function ToggleSetting({ label, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-100">
      <div>
        <p className="text-sm font-medium text-gray-800">{label}</p>
        <p className="text-[11px] text-gray-500">{description}</p>
      </div>
      <button onClick={onChange}
        className={`w-10 h-5.5 rounded-full p-0.5 transition-colors ${checked ? 'bg-emerald-500' : 'bg-gray-300'}`}>
        <div className={`w-4.5 h-4.5 rounded-full bg-white shadow-sm transition-transform ${checked ? 'translate-x-[18px]' : 'translate-x-0'}`}
          style={{ width: '18px', height: '18px', transform: checked ? 'translateX(18px)' : 'translateX(0)' }} />
      </button>
    </div>
  );
}
