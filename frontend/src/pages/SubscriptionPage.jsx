import React from 'react';
import { CreditCard, Check, Clock, ArrowRight, Star, Zap, Crown } from 'lucide-react';

const currentPlan = {
  name: 'Professional',
  price: '$79',
  period: '/month',
  features: ['Unlimited AI calls', 'Up to 10 employees', 'Advanced analytics', 'Ticket management', 'Custom branding', 'Priority support'],
  nextBilling: 'April 11, 2026',
  started: 'January 11, 2025',
};

const plans = [
  { name: 'Starter', price: '$29', icon: Star, features: ['500 AI calls/mo', '2 employees', 'Basic analytics'] },
  { name: 'Professional', price: '$79', icon: Zap, features: ['Unlimited calls', '10 employees', 'Advanced analytics', 'Custom branding'], current: true },
  { name: 'Enterprise', price: '$199', icon: Crown, features: ['Unlimited everything', 'Unlimited employees', 'Custom integrations', 'Dedicated support', 'SLA guarantee'] },
];

const paymentHistory = [
  { id: 1, date: 'Mar 11, 2026', amount: '$79.00', status: 'Paid', method: '•••• 4242' },
  { id: 2, date: 'Feb 11, 2026', amount: '$79.00', status: 'Paid', method: '•••• 4242' },
  { id: 3, date: 'Jan 11, 2026', amount: '$79.00', status: 'Paid', method: '•••• 4242' },
  { id: 4, date: 'Dec 11, 2025', amount: '$79.00', status: 'Paid', method: '•••• 4242' },
  { id: 5, date: 'Nov 11, 2025', amount: '$79.00', status: 'Paid', method: '•••• 4242' },
  { id: 6, date: 'Oct 11, 2025', amount: '$29.00', status: 'Paid', method: '•••• 4242' },
];

export default function SubscriptionPage() {
  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-green-50/50 to-white p-6">
      <div className="max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <CreditCard size={24} className="text-emerald-600" />
          <h2 className="text-xl font-bold text-gray-800">Subscription</h2>
        </div>

        {/* Current Plan */}
        <div className="p-5 bg-white rounded-2xl border border-green-100 shadow-sm mb-6">
          <div className="flex items-start justify-between">
            <div>
              <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">Current Plan</span>
              <h3 className="text-2xl font-bold text-gray-800 mt-2">{currentPlan.name}</h3>
              <p className="text-3xl font-bold text-emerald-600 mt-1">{currentPlan.price}<span className="text-sm font-normal text-gray-400">{currentPlan.period}</span></p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Clock size={12} />
                <span>Next billing: <strong className="text-gray-800">{currentPlan.nextBilling}</strong></span>
              </div>
              <p className="text-[10px] text-gray-400 mt-1">Member since {currentPlan.started}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {currentPlan.features.map((f, i) => (
              <span key={i} className="flex items-center gap-1 px-2.5 py-1 bg-green-50 text-xs text-emerald-700 rounded-lg border border-green-100">
                <Check size={12} /> {f}
              </span>
            ))}
          </div>
        </div>

        {/* Plans Comparison */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <div key={i} className={`p-5 rounded-2xl border-2 transition-all ${
                plan.current ? 'border-emerald-400 bg-emerald-50/50 shadow-md' : 'border-green-100 bg-white hover:border-emerald-200'
              }`}>
                <Icon size={24} className={plan.current ? 'text-emerald-600' : 'text-gray-400'} />
                <h4 className="text-base font-bold text-gray-800 mt-2">{plan.name}</h4>
                <p className="text-xl font-bold text-emerald-600 mt-1">{plan.price}<span className="text-xs font-normal text-gray-400">/mo</span></p>
                <div className="mt-3 space-y-1.5">
                  {plan.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-1.5">
                      <Check size={12} className="text-emerald-500" />
                      <span className="text-xs text-gray-600">{f}</span>
                    </div>
                  ))}
                </div>
                <button className={`w-full mt-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  plan.current ? 'bg-emerald-600 text-white' : 'bg-green-100 text-emerald-700 hover:bg-emerald-200'
                }`}>{plan.current ? 'Current Plan' : 'Upgrade'}</button>
              </div>
            );
          })}
        </div>

        {/* Payment History */}
        <div className="p-5 bg-white rounded-2xl border border-green-100 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Payment History</h3>
          <div className="overflow-hidden rounded-xl border border-green-100">
            <table className="w-full">
              <thead><tr className="bg-green-50">
                <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-wide text-gray-500 font-medium">Date</th>
                <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-wide text-gray-500 font-medium">Amount</th>
                <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-wide text-gray-500 font-medium">Status</th>
                <th className="text-left px-4 py-2.5 text-[10px] uppercase tracking-wide text-gray-500 font-medium">Method</th>
              </tr></thead>
              <tbody>
                {paymentHistory.map((p) => (
                  <tr key={p.id} className="border-t border-green-50 hover:bg-green-50/50">
                    <td className="px-4 py-3 text-sm text-gray-800">{p.date}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-800">{p.amount}</td>
                    <td className="px-4 py-3"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">{p.status}</span></td>
                    <td className="px-4 py-3 text-sm text-gray-500">{p.method}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
