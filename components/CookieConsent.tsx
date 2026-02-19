
import React, { useState, useEffect } from 'react';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('evec-cookie-consent');
    if (!consent) {
      setTimeout(() => setIsVisible(true), 1500);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('evec-cookie-consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 z-[100] animate-bounce-in">
      <div className="glass-morphism rounded-2xl p-6 border-blue-500/30 shadow-2xl shadow-blue-900/40">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center shrink-0">
            <i className="fas fa-cookie-bite text-blue-400 text-xl"></i>
          </div>
          <div>
            <h4 className="text-white font-bold mb-1">Cookie Preferences</h4>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              We use cookies to personalize ads and analyze traffic for the best EV experience. 
              By clicking "Accept", you agree to our use of cookies.
            </p>
            <div className="flex gap-3">
              <button 
                onClick={handleAccept}
                className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-all"
              >
                Accept All
              </button>
              <button 
                onClick={() => setIsVisible(false)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-4 py-2 rounded-lg transition-all"
              >
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
