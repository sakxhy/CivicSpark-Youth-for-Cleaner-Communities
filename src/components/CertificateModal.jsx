import React from 'react';
import { useCivic } from '../context/CivicContext';
import { Award, CheckCircle, Download, Printer, X, ShieldCheck, Calendar, Clock, UserCheck } from 'lucide-react';

export default function CertificateModal() {
  const { activeCertificate, setActiveCertificate } = useCivic();

  if (!activeCertificate) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-nature-600" />
            <h3 className="font-bold text-slate-800 text-sm tracking-wide uppercase">
              Digital Participation Certificate
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition shadow-sm"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              Print / PDF
            </button>
            <button
              onClick={() => setActiveCertificate(null)}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Canvas View */}
        <div id="printable-certificate" className="p-8 sm:p-12 bg-white relative">
          {/* Decorative Border Frame */}
          <div className="border-4 border-double border-nature-600/60 p-6 sm:p-8 rounded-2xl relative bg-gradient-to-b from-nature-50/40 via-white to-civic-50/30">
            {/* Watermark Logo background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
              <span className="text-[180px] font-black">SPARK</span>
            </div>

            {/* Certificate Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-nature-100 text-nature-700 shadow-inner mb-2 border border-nature-200">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-serif uppercase">
                Certificate of Civic Participation
              </h1>
              <p className="text-xs sm:text-sm font-semibold tracking-wider text-nature-700 uppercase">
                CivicSpark Youth Sanitation & Environmental Initiative
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-nature-400 via-nature-600 to-civic-500 mx-auto rounded-full mt-3"></div>
            </div>

            {/* Recipient Notice */}
            <div className="mt-8 text-center space-y-3">
              <p className="text-xs uppercase tracking-widest text-slate-500 font-medium">
                This official credential is gratefully presented to
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif underline decoration-nature-300 decoration-2 underline-offset-8">
                {activeCertificate.recipientName}
              </h2>
              <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed pt-2">
                In honor of dedicated youth volunteer service, environmental leadership, and exceptional community stewardship demonstrated during:
              </p>
              <h3 className="text-lg sm:text-xl font-bold text-nature-800 bg-nature-50 border border-nature-200/80 rounded-xl py-2 px-4 inline-block">
                “{activeCertificate.eventName}”
              </h3>
            </div>

            {/* Metrics Info */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-8 text-center bg-white/80 p-4 rounded-xl border border-slate-200/60 shadow-sm max-w-lg mx-auto">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Hours Logged</p>
                <p className="text-base font-bold text-slate-800 flex items-center justify-center gap-1 mt-0.5">
                  <Clock className="w-4 h-4 text-nature-600" />
                  {activeCertificate.hoursLogged || 4} Hours
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Date Issued</p>
                <p className="text-base font-bold text-slate-800 flex items-center justify-center gap-1 mt-0.5">
                  <Calendar className="w-4 h-4 text-civic-600" />
                  {activeCertificate.issueDate}
                </p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="text-[10px] uppercase font-bold text-slate-400">Verification ID</p>
                <p className="text-xs font-mono font-bold text-slate-700 bg-slate-100 py-1 px-2 rounded mt-1">
                  {activeCertificate.id}
                </p>
              </div>
            </div>

            {/* Signatures & Seal */}
            <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-6 px-4">
              <div className="text-center sm:text-left">
                <p className="font-serif italic text-lg text-slate-800 border-b border-slate-400 pb-1">
                  Dr. Helena Vance
                </p>
                <p className="text-xs font-bold text-slate-700 uppercase mt-1">Director of Public Cleanliness</p>
                <p className="text-[10px] text-slate-500">Municipal Environmental Authority</p>
              </div>

              {/* Verified Digital Seal */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-nature-600 bg-nature-50 flex items-center justify-center p-2 text-center shadow-inner">
                  <div className="text-[9px] font-black tracking-tight text-nature-800 leading-none">
                    CIVIC SPARK<br />
                    ★ VERIFIED ★<br />
                    2026
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 font-mono">{activeCertificate.verificationHash || 'SHA-0x792B1C'}</span>
              </div>

              <div className="text-center sm:text-right">
                <p className="font-serif italic text-lg text-slate-800 border-b border-slate-400 pb-1">
                  Alex Rivera
                </p>
                <p className="text-xs font-bold text-slate-700 uppercase mt-1">Youth Organizing Council</p>
                <p className="text-[10px] text-slate-500">CivicSpark Network Chapter</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <p>Official cryptographic proof of youth community hygiene volunteering.</p>
          <button
            onClick={() => setActiveCertificate(null)}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

