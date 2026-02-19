
import React from 'react';
import { ChargingStation } from '../types';

interface StationCardProps {
  station: ChargingStation;
}

const StationCard: React.FC<StationCardProps> = ({ station }) => {
  return (
    <div className="glass-morphism rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 group cursor-pointer relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute -right-12 -top-12 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
      
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
            {station.name}
          </h3>
          <p className="text-slate-400 text-sm flex items-center gap-2 mt-1">
            <i className="fas fa-location-dot text-blue-500"></i>
            {station.location}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
          station.availability === 'Available' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
        }`}>
          {station.availability}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-800/50 p-3 rounded-xl border border-white/5">
          <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Power Output</p>
          <p className="text-sm font-semibold text-slate-200">{station.power}</p>
        </div>
        <div className="bg-slate-800/50 p-3 rounded-xl border border-white/5">
          <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Connector</p>
          <p className="text-sm font-semibold text-slate-200">{station.type}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <i key={i} className={`fas fa-star text-xs ${i < Math.floor(station.rating) ? 'text-yellow-400' : 'text-slate-600'}`}></i>
          ))}
          <span className="text-xs text-slate-400 ml-1">({station.rating})</span>
        </div>
        
        {station.url ? (
          <a 
            href={station.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-bold transition-all shadow-lg shadow-blue-900/20"
          >
            Navigate <i className="fas fa-arrow-up-right-from-square text-[10px]"></i>
          </a>
        ) : (
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-bold transition-all">
                Details
            </button>
        )}
      </div>
    </div>
  );
};

export default StationCard;
