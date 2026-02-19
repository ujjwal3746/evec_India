import React from 'react';

interface HeaderProps {
  onNavigateHome: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigateHome }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5">
      <div className="container mx-auto px-4 max-w-7xl h-24 flex items-center justify-between">
        <div className="flex items-center gap-4 cursor-pointer group" onClick={onNavigateHome}>
          <div className="w-12 h-12 bg-blue-600 rounded-[1rem] flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform">
            <i className="fas fa-bolt text-white text-2xl"></i>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter leading-none text-white">EVEC<span className="text-blue-500">.IN</span></span>
            <span className="text-[9px] text-slate-500 font-black uppercase tracking-[0.4em] leading-none mt-1.5">Elite Charging Network</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-12">
          {['Grid', 'Route', 'Fleet', 'Partner'].map(link => (
            <a key={link} href="#" className="text-[11px] font-black text-slate-400 hover:text-white transition-colors uppercase tracking-[0.25em]">{link}</a>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <button className="bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border border-white/5">
            Client Portal
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;