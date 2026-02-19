
import React, { useEffect, useRef } from 'react';

interface AdBannerProps {
  type: 'leaderboard' | 'rectangle' | 'sidebar';
  adSlot?: string; 
  publisherId?: string; 
}

const AdBanner: React.FC<AdBannerProps> = ({ type, adSlot, publisherId = "ca-pub-8240089325914529" }) => {
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);

  const styles = {
    leaderboard: "w-full min-h-[90px] max-h-[120px] mb-8",
    rectangle: "w-full min-h-[250px] mb-6",
    sidebar: "w-full min-h-[600px] mb-6",
  };

  useEffect(() => {
    if (adSlot && !initialized.current) {
      try {
        // @ts-ignore
        const adsbygoogle = window.adsbygoogle || [];
        adsbygoogle.push({});
        initialized.current = true;
      } catch (e) {
        console.warn("AdSense push failed. This is expected if ad blockers are active or the slot is invalid.", e);
      }
    }
  }, [adSlot]);

  return (
    <div className={`${styles[type]} glass-morphism rounded-2xl flex flex-col items-center justify-center relative overflow-hidden border border-slate-800/50 transition-all hover:bg-slate-800/20`}>
      <span className="absolute top-3 left-4 text-[9px] uppercase font-black tracking-[0.3em] text-slate-700 z-10 select-none">
        Advertisement
      </span>
      
      {adSlot ? (
        <ins 
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', height: '100%' }}
          data-ad-client={publisherId}
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <div className="flex flex-col items-center gap-4 select-none group">
          <div className="w-12 h-12 bg-slate-900/50 rounded-full flex items-center justify-center border border-slate-800 group-hover:border-slate-700 transition-all">
            <i className="fas fa-layer-group text-slate-700 text-lg"></i>
          </div>
          <div className="text-center">
            <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest">{type} unit ready</p>
            <p className="text-[9px] text-slate-700 mt-1 uppercase font-bold">Waiting for AdSense Approval</p>
          </div>
        </div>
      )}

      {/* Decorative corners */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/5 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/5 pointer-events-none"></div>
    </div>
  );
};

export default AdBanner;
