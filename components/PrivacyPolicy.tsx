
import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="glass-morphism rounded-3xl p-8 md:p-12 max-w-4xl mx-auto my-12 text-slate-300 leading-relaxed">
      <h1 className="text-3xl font-extrabold text-white mb-8 border-b border-white/10 pb-4">Privacy Policy for EVEC India</h1>
      
      <p className="mb-6">At EVEC.in, accessible from https://evec.in, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by EVEC.in and how we use it.</p>

      <h2 className="text-xl font-bold text-white mt-8 mb-4">Log Files</h2>
      <p className="mb-6">EVEC.in follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.</p>

      <h2 className="text-xl font-bold text-white mt-8 mb-4">Google DoubleClick DART Cookie</h2>
      <p className="mb-6">Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet.</p>

      <h2 className="text-xl font-bold text-white mt-8 mb-4">Advertising Partners Privacy Policies</h2>
      <p className="mb-6">You may consult this list to find the Privacy Policy for each of the advertising partners of EVEC.in. Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on EVEC.in, which are sent directly to users' browser.</p>

      <h2 className="text-xl font-bold text-white mt-8 mb-4">Consent</h2>
      <p className="mb-6">By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.</p>
      
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="mt-8 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-xl font-bold transition-all"
      >
        Back to Top
      </button>
    </div>
  );
};

export default PrivacyPolicy;
