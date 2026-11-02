import React from 'react';
import { useCivic } from '../context/CivicContext';
import { CheckCircle2, AlertCircle, Info, X, Sparkles } from 'lucide-react';

export default function NotificationToast() {
  const { notifications, dismissToast } = useCivic();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {notifications.map((item) => (
        <div
          key={item.id}
          className="pointer-events-auto flex items-start gap-3 p-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/80 transition-all duration-300 animate-slide-up hover:shadow-2xl"
        >
          <div className="flex-shrink-0 mt-0.5">
            {item.type === 'success' && (
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            )}
            {item.type === 'info' && (
              <div className="w-8 h-8 rounded-full bg-civic-100 text-civic-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
            )}
            {item.type === 'error' && (
              <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
                <AlertCircle className="w-5 h-5" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-slate-800">{item.title}</h4>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{item.message}</p>
          </div>

          <button
            onClick={() => dismissToast(item.id)}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

