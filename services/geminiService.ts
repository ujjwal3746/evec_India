
import { SearchResult, ChargingStation } from "../types";

const STATIC_NODES: ChargingStation[] = [
  {
    id: "node-001",
    name: "Jio World Drive Hypercharger",
    location: "BKC, Mumbai",
    type: "CCS2 / Ultra-Fast DC",
    power: "240kW Hyper",
    availability: "Available",
    rating: 4.9,
    url: "https://www.google.com/maps/search/Jio+World+Drive+EV+Charging"
  },
  {
    id: "node-002",
    name: "DLF Emporio Premium Hub",
    location: "Vasant Kunj, Delhi",
    type: "CCS2 / High-Speed DC",
    power: "120kW Fast",
    availability: "Available",
    rating: 4.8,
    url: "https://www.google.com/maps/search/DLF+Emporio+EV+Charging"
  },
  {
    id: "node-003",
    name: "Phoenix Marketcity Node",
    location: "Whitefield, Bengaluru",
    type: "CCS2 / Ultra-Fast DC",
    power: "180kW Hyper",
    availability: "In Use",
    rating: 4.7,
    url: "https://www.google.com/maps/search/Phoenix+Marketcity+Bangalore+EV+Charging"
  },
  {
    id: "node-004",
    name: "Statue of Unity Corridor",
    location: "NH48, Gujarat",
    type: "CCS2 / High-Speed DC",
    power: "60kW Business",
    availability: "Available",
    rating: 4.6,
    url: "https://www.google.com/maps/search/NH48+EV+Charging+Gujarat"
  },
  {
    id: "node-005",
    name: "Grand Hyatt Kochi Node",
    location: "Bolgatty, Kochi",
    type: "CCS2 / Premium DC",
    power: "120kW Fast",
    availability: "Available",
    rating: 4.9,
    url: "https://www.google.com/maps/search/Grand+Hyatt+Kochi+EV+Charging"
  },
  {
    id: "node-006",
    name: "CyberHub Express",
    location: "Gurugram, Haryana",
    type: "CCS2 / Ultra-Fast DC",
    power: "240kW Hyper",
    availability: "In Use",
    rating: 4.8,
    url: "https://www.google.com/maps/search/CyberHub+Gurgaon+EV+Charging"
  }
];

export async function searchChargingStations(query: string): Promise<SearchResult> {
  // Simulate a brief elite-level scan for UX
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const normalizedQuery = query.toLowerCase();
  const filtered = STATIC_NODES.filter(station => 
    station.name.toLowerCase().includes(normalizedQuery) || 
    station.location.toLowerCase().includes(normalizedQuery)
  );

  const results = filtered.length > 0 ? filtered : STATIC_NODES.slice(0, 4);

  return {
    text: `Grid scan complete for "${query}". Accessing ${results.length} high-voltage nodes optimized for premium endurance. All stations verified by EVEC.IN infrastructure protocols.`,
    stations: results,
    sources: results.map(r => ({ title: r.name, url: r.url || '#' }))
  };
}

export function getFeaturedStations(): ChargingStation[] {
    return STATIC_NODES.slice(0, 3);
}
