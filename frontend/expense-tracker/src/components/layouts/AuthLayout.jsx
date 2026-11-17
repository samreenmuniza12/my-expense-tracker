import React from 'react'
import { LuTrendingUpDown, LuArrowUpRight, LuArrowDownRight } from 'react-icons/lu'

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12 bg-emerald-50">
        <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <span className="w-7 h-7 rounded-md bg-slate-900 flex items-center justify-center text-white text-xs">
            <LuTrendingUpDown />
          </span>
          Expense Tracker
        </h2>
        {children}
      </div>

      <div className="hidden md:flex w-[40vw] h-screen bg-slate-900 p-10 flex-col justify-between border-l-4 border-emerald-400 overflow-y-auto">

        {/* top: headline */}
        <div>
          <p className="text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-4">
            Since 2024
          </p>
          <h3 className="text-3xl font-bold text-white leading-tight tracking-tight max-w-sm">
            Every euro,<br />accounted for.
          </h3>
          <p className="text-slate-400 text-sm mt-3 max-w-xs">
            See exactly where your money goes, every single month.
          </p>
        </div>

        {/* middle: balance + goal + chart */}
        <div className="border-t border-b border-white/10 py-6 space-y-6">

          <div>
            <p className="text-slate-400 text-xs uppercase tracking-wide">Total Balance</p>
            <p className="text-white text-5xl font-bold mt-2 tracking-tight">$430,000</p>

            <div className="flex gap-6 mt-4">
              <span className="flex items-center gap-1.5 text-sm text-emerald-400 font-medium">
                <LuArrowUpRight /> $38,000
              </span>
              <span className="flex items-center gap-1.5 text-sm text-slate-400 font-medium">
                <LuArrowDownRight /> $10,200
              </span>
            </div>
          </div>

          {/* savings goal progress bar */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400 text-[11px] uppercase tracking-widest">Savings Goal</p>
              <p className="text-white text-xs font-semibold">$430K / $500K</p>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full" style={{ width: '86%' }} />
            </div>
          </div>

          {/* flat mini bar chart */}
          <div>
            <p className="text-slate-400 text-[11px] uppercase tracking-widest mb-3">Income vs Expense</p>
            <div className="flex items-end gap-4 h-20">
              {[
                { month: 'Apr', income: 22, expense: 7 },
                { month: 'May', income: 30, expense: 13 },
                { month: 'Jun', income: 20, expense: 25 },
                { month: 'Jul', income: 38, expense: 10 },
              ].map((d) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
                  <div className="w-full flex items-end gap-1 h-16">
                    <div className="flex-1 bg-emerald-400" style={{ height: `${(d.income / 40) * 100}%` }} />
                    <div className="flex-1 bg-slate-600" style={{ height: `${(d.expense / 40) * 100}%` }} />
                  </div>
                  <span className="text-[10px] text-slate-500">{d.month}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-3">
              <span className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <span className="w-2 h-2 bg-emerald-400" /> Income
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <span className="w-2 h-2 bg-slate-600" /> Expense
              </span>
            </div>
          </div>
        </div>

        {/* bottom: trust quote */}
        <div>
          <p className="text-slate-300 text-sm italic leading-relaxed max-w-xs">
            "Finally, a tracker that shows me exactly where my money goes — no clutter, no guesswork."
          </p>
          <p className="text-slate-500 text-xs mt-2">— Early user</p>
        </div>
      </div>
    </div>
  )
};

export default AuthLayout