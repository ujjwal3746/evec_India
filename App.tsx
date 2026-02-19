import React, { useState, useEffect } from 'react';
import { searchChargingStations } from './services/geminiService';
import { ChargingStation, SearchResult } from './types';
import Header from './components/Header';
import StationCard from './components/StationCard';
import AdBanner from './components/AdBanner';
import PrivacyPolicy from './components/PrivacyPolicy';
import CookieConsent from './components/CookieConsent';

type Page = 'home' | 'privacy';

const App: React.FC = () => {
  const [view, setView] = useState<Page>('home');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult | null>(null);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const ADSENSE_CONFIG = {
    publisherId: "ca-pub-8240089325914529", 
    slots: {
      topBanner: "", 
      midContent: "", 
      sidebar: "", 
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
        (err) => console.warn("Location permission required for optimal routing.", err)
      );
    }
  }, []);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setView('home');
    try {
      const data = await searchChargingStations(query, userLocation || undefined);
      setResults(data);
      setTimeout(() => {
        document.getElementById('grid-view')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setError("Grid connection failure. Please verify network status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-slate-100 selection:bg-blue-500/30">
      <Header onNavigateHome={() => setView('home')} />
      
      <main className="flex-grow container mx-auto px-4 py-12 max-w-7xl">
        {view === 'home' ? (
          <>
            <section className="mb-20">
              <div className="relative rounded-[3rem] overflow-hidden p-1 bg-gradient-to-br from-blue-500/20 via-slate-900 to-emerald-500/10">
                <div className="bg-[#020617]/90 rounded-[2.8rem] px-8 py-20 md:py-32 text-center relative overflow-hidden mesh-gradient">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
                  
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/5 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-12 animate-fade-in shadow-2xl">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_#3b82f6]"></span>
                    Premium Infrastructure Network
                  </div>

                  <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.85]">
                    Charging <br /><span className="gradient-text">Excellence</span>
                  </h1>
                  
                  <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-16 font-medium leading-relaxed">
                    Access the exclusive evec.in grid. High-capacity DC hyperchargers engineered for the elite electric fleet.
                  </p>

                  <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative group">
                    <div className="absolute inset-0 bg-blue-600/10 blur-3xl opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                    <div className="relative flex items-center bg-slate-900/40 border border-slate-800 rounded-3xl p-2 backdrop-blur-2xl shadow-2xl focus-within:border-blue-500/40 transition-all">
                      <i className="fas fa-satellite-dish absolute left-6 text-slate-600"></i>
                      <input 
                        type="text" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Scan for Hyperchargers (e.g. Mumbai, NH44)"
                        className="w-full bg-transparent py-5 px-6 pl-14 text-white placeholder:text-slate-700 focus:outline-none text-lg font-semibold"
                      />
                      <button 
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all disabled:opacity-50 active:scale-95 shadow-xl shadow-blue-900/20"
                      >
                        {loading ? <i className="fas fa-spinner animate-spin"></i> : 'Scan Grid'}
                      </button>
                    </div>
                  </form>
                  {error && <p className="mt-4 text-red-400 font-bold text-sm animate-shake">{error}</p>}
                </div>
              </div>
            </section>

            <div className="mb-12">
              <AdBanner type="leaderboard" publisherId={ADSENSE_CONFIG.publisherId} adSlot={ADSENSE_CONFIG.slots.topBanner} />
            </div>

            <div id="grid-view" className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8 space-y-12">
                {loading && (
                  <div className="flex flex-col items-center justify-center py-40 glass-morphism rounded-[3rem] border-blue-500/10">
                    <div className="w-16 h-16 relative mb-8">
                      <div className="absolute inset-0 border-4 border-blue-500/10 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
                      <i className="fas fa-bolt absolute inset-0 flex items-center justify-center text-blue-500 animate-pulse"></i>
                    </div>
                    <p className="text-white font-black uppercase tracking-[0.5em] text-[10px] mb-2">Syncing with EVEC Nodes</p>
                    <p className="text-slate-500 text-sm">Validating high-voltage dispensers...</p>
                  </div>
                )}

                {results && !loading && (
                  <div className="space-y-12 animate-fade-in">
                    <div className="flex items-center gap-6">
                      <div className="h-12 w-1.5 bg-blue-600 rounded-full"></div>
                      <h2 className="text-4xl font-black tracking-tight">Active Nodes</h2>
                      <span className="ml-auto text-xs font-black text-slate-600 uppercase tracking-widest">{results.stations.length} Points Found</span>
                    </div>

                    <div className="bg-slate-900/40 border border-white/5 p-8 rounded-[2.5rem] backdrop-blur-md relative overflow-hidden group">
                       <div className="absolute top-0 right-0 p-4 opacity-20"><i className="fas fa-brain text-4xl text-blue-500"></i></div>
                       <p className="text-slate-300 text-xl leading-relaxed italic font-medium">
                         "{results.text}"
                       </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {results.stations.map(station => <StationCard key={station.id} station={station} />)}
                    </div>
                  </div>
                )}

                {!results && !loading && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                      { icon: 'bolt-lightning', title: 'High-Voltage Focus', desc: 'Exclusively listing Tier-1 infrastructure with 120kW+ liquid-cooled capacity.' },
                      { icon: 'shield-check', title: 'Verified Uptime', desc: 'Real-time telemetry ensures the station is functional before you arrive.' }
                    ].map((item, i) => (
                      <div key={i} className="glass-morphism rounded-[2.5rem] p-10 group hover:border-blue-500/20 transition-all">
                        <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                          <i className={`fas fa-${item.icon} text-blue-500 text-2xl`}></i>
                        </div>
                        <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                        <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                <AdBanner type="rectangle" publisherId={ADSENSE_CONFIG.publisherId} adSlot={ADSENSE_CONFIG.slots.midContent} />
              </div>

              <aside className="lg:col-span-4 space-y-12">
                <div className="glass-morphism rounded-[2.5rem] p-8 sticky top-28 border-white/5 shadow-2xl shadow-blue-900/10">
                  <div className="flex items-center justify-between mb-8">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500">Grid Status</h4>
                    <span className="flex items-center gap-2 text-emerald-500 text-[10px] font-black uppercase">
                      Operational <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                    </span>
                  </div>

                  <div className="space-y-10">
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <span className="text-[10px] text-slate-500 font-black uppercase">Network Load</span>
                        <span className="text-xl font-bold">82.4%</span>
                      </div>
                      <div className="w-full bg-slate-800/50 h-1.5 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 w-[82%] shadow-[0_0_10px_#3b82f6]"></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 p-4 rounded-3xl border border-white/5">
                        <span className="block text-[9px] text-slate-500 font-black uppercase mb-1">Active Nodes</span>
                        <span className="text-lg font-bold">12,482</span>
                      </div>
                      <div className="bg-white/5 p-4 rounded-3xl border border-white/5">
                        <span className="block text-[9px] text-slate-500 font-black uppercase mb-1">Grid Flux</span>
                        <span className="text-lg font-bold">14.8 MW</span>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/5">
                      <p className="text-slate-600 text-[10px] font-bold leading-relaxed uppercase tracking-wider">
                        The evec.in network utilizes advanced AI routing to prevent grid congestion across the subcontinent.
                      </p>
                    </div>
                  </div>

                  <div className="mt-12">
                    <AdBanner type="sidebar" publisherId={ADSENSE_CONFIG.publisherId} adSlot={ADSENSE_CONFIG.slots.sidebar} />
                  </div>
                </div>
              </aside>
            </div>
          </>
        ) : (
          <PrivacyPolicy />
        )}
      </main>

      <footer className="bg-[#010413] border-t border-white/5 pt-24 pb-12 mt-32">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="md:col-span-2">
              <div className="flex items-center gap-4 mb-8 cursor-pointer" onClick={() => setView('home')}>
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-600/30">
                  <i className="fas fa-bolt text-white text-xl"></i>
                </div>
                <span className="text-3xl font-black tracking-tighter">EVEC<span className="text-blue-500">.IN</span></span>
              </div>
              <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-sm">
                Engineering India's premier electric transition. We provide elite routing for discerning fleets and personal transport.
              </p>
            </div>
            <div>
              <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-8">Ecosystem</h5>
              <ul className="space-y-4 text-slate-500 text-sm font-bold">
                <li><button onClick={() => setView('home')} className="hover:text-blue-500 transition-colors">Grid Map</button></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Route Optimization</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Corporate Access</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-8">Trust</h5>
              <ul className="space-y-4 text-slate-500 text-sm font-bold">
                <li><button onClick={() => setView('privacy')} className="hover:text-blue-500 transition-colors">Privacy Shield</button></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Transparency Report</a></li>
                <li><a href="#" className="hover:text-blue-500 transition-colors">Safety Protocols</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-black uppercase tracking-[0.5em] text-slate-700">
            <p>&copy; 2024 EVEC.IN INFRASTRUCTURE. OPERATED INDEPENDENTLY.</p>
            <div className="flex gap-10">
              <a href="#" className="hover:text-blue-500">Network Security</a>
              <a href="#" className="hover:text-blue-500">Sustainability</a>
            </div>
          </div>
        </div>
      </footer>

      <CookieConsent />
    </div>
  );
};

export default App;