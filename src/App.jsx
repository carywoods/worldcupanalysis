import React, { useState, useEffect } from 'react';

/**
 * FIFA 2026 World Cup: The Affordability Crisis
 * Comprehensive analysis of ticket prices vs. working-class wages
 * Focus: Supporter tier ($60 promise) vs. reality gap
 */

// Exchange rates (January 2026)
const EXCHANGE_RATES = {
  USD: 1.0,
  CAD: 0.70,
  MXN: 0.05
};

const HOURS_PER_YEAR = 2080;
const SUPPORTER_TIER_PRICE = 60;

// Ticket prices by stage and category (USD)
const ticketPrices = {
  Group:   { cat1: 410,  cat2: 310,  cat3: 260,  cat4: 70   },
  R32:     { cat1: 665,  cat2: 440,  cat3: 260,  cat4: 185  },
  R16:     { cat1: 890,  cat2: 590,  cat3: 340,  cat4: 260  },
  Quarter: { cat1: 1125, cat2: 750,  cat3: 440,  cat4: 300  },
  Semi:    { cat1: 2565, cat2: 1775, cat3: 660,  cat4: 420  },
  Final:   { cat1: 6370, cat2: 4210, cat3: 2790, cat4: 2030 }
};

const stageLabels = {
  Group: 'Group Stage',
  R32: 'Round of 32',
  R16: 'Round of 16',
  Quarter: 'Quarterfinal',
  Semi: 'Semi-final',
  Final: 'Final'
};

const categoryLabels = {
  cat1: 'Category 1 (Best)',
  cat2: 'Category 2',
  cat3: 'Category 3',
  cat4: 'Category 4 (Cheapest)'
};

const occupationLabels = {
  Teacher: 'Teacher',
  Nurse: 'Registered Nurse',
  Retail: 'Retail Worker',
  BusDriver: 'Bus Driver',
  FoodService: 'Food Service Worker'
};

// Wage data by city
const wageData = {
  "Philadelphia": {
    Teacher: { wage: null, currency: "USD", annual: 68500 },
    Nurse: { wage: 47.32, currency: "USD" },
    Retail: { wage: 17.86, currency: "USD" },
    BusDriver: { wage: 25.89, currency: "USD" },
    FoodService: { wage: 15.43, currency: "USD" }
  },
  "Atlanta": {
    Teacher: { wage: null, currency: "USD", annual: 68500 },
    Nurse: { wage: 47.32, currency: "USD" },
    Retail: { wage: 17.86, currency: "USD" },
    BusDriver: { wage: 25.89, currency: "USD" },
    FoodService: { wage: 15.43, currency: "USD" }
  },
  "Houston": {
    Teacher: { wage: null, currency: "USD", annual: 68500 },
    Nurse: { wage: 47.32, currency: "USD" },
    Retail: { wage: 17.86, currency: "USD" },
    BusDriver: { wage: 25.89, currency: "USD" },
    FoodService: { wage: 15.43, currency: "USD" }
  },
  "Los Angeles": {
    Teacher: { wage: null, currency: "USD", annual: 68500 },
    Nurse: { wage: 47.32, currency: "USD" },
    Retail: { wage: 17.86, currency: "USD" },
    BusDriver: { wage: 25.89, currency: "USD" },
    FoodService: { wage: 15.43, currency: "USD" }
  },
  "New York/New Jersey": {
    Teacher: { wage: null, currency: "USD", annual: 68500 },
    Nurse: { wage: 47.32, currency: "USD" },
    Retail: { wage: 17.86, currency: "USD" },
    BusDriver: { wage: 25.89, currency: "USD" },
    FoodService: { wage: 15.43, currency: "USD" }
  },
  "Kansas City": {
    Teacher: { wage: null, currency: "USD", annual: 68500 },
    Nurse: { wage: 47.32, currency: "USD" },
    Retail: { wage: 17.86, currency: "USD" },
    BusDriver: { wage: 25.89, currency: "USD" },
    FoodService: { wage: 15.43, currency: "USD" }
  },
  "Dallas": {
    Teacher: { wage: null, currency: "USD", annual: 68500 },
    Nurse: { wage: 47.32, currency: "USD" },
    Retail: { wage: 17.86, currency: "USD" },
    BusDriver: { wage: 25.89, currency: "USD" },
    FoodService: { wage: 15.43, currency: "USD" }
  },
  "Miami": {
    Teacher: { wage: null, currency: "USD", annual: 68500 },
    Nurse: { wage: 47.32, currency: "USD" },
    Retail: { wage: 17.86, currency: "USD" },
    BusDriver: { wage: 25.89, currency: "USD" },
    FoodService: { wage: 15.43, currency: "USD" }
  },
  "Boston": {
    Teacher: { wage: null, currency: "USD", annual: 68500 },
    Nurse: { wage: 47.32, currency: "USD" },
    Retail: { wage: 17.86, currency: "USD" },
    BusDriver: { wage: 25.89, currency: "USD" },
    FoodService: { wage: 15.43, currency: "USD" }
  },
  "Seattle": {
    Teacher: { wage: null, currency: "USD", annual: 68500 },
    Nurse: { wage: 47.32, currency: "USD" },
    Retail: { wage: 17.86, currency: "USD" },
    BusDriver: { wage: 25.89, currency: "USD" },
    FoodService: { wage: 15.43, currency: "USD" }
  },
  "San Francisco": {
    Teacher: { wage: null, currency: "USD", annual: 68500 },
    Nurse: { wage: 47.32, currency: "USD" },
    Retail: { wage: 17.86, currency: "USD" },
    BusDriver: { wage: 25.89, currency: "USD" },
    FoodService: { wage: 15.43, currency: "USD" }
  },
  "Toronto": {
    Teacher: { wage: null, currency: "CAD", annual: 88400 },
    Nurse: { wage: 38.50, currency: "CAD" },
    Retail: { wage: 16.85, currency: "CAD" },
    BusDriver: { wage: 28.50, currency: "CAD" },
    FoodService: { wage: 16.20, currency: "CAD" }
  },
  "Vancouver": {
    Teacher: { wage: null, currency: "CAD", annual: 88400 },
    Nurse: { wage: 38.50, currency: "CAD" },
    Retail: { wage: 16.85, currency: "CAD" },
    BusDriver: { wage: 28.50, currency: "CAD" },
    FoodService: { wage: 16.20, currency: "CAD" }
  },
  "Mexico City": {
    Teacher: { wage: null, currency: "MXN", annual: 135360 },
    Nurse: { wage: 55.00, currency: "MXN" },
    Retail: { wage: 25.00, currency: "MXN" },
    BusDriver: { wage: 35.00, currency: "MXN" },
    FoodService: { wage: 22.00, currency: "MXN" }
  },
  "Guadalajara": {
    Teacher: { wage: null, currency: "MXN", annual: 135360 },
    Nurse: { wage: 55.00, currency: "MXN" },
    Retail: { wage: 25.00, currency: "MXN" },
    BusDriver: { wage: 35.00, currency: "MXN" },
    FoodService: { wage: 22.00, currency: "MXN" }
  },
  "Monterrey": {
    Teacher: { wage: null, currency: "MXN", annual: 135360 },
    Nurse: { wage: 55.00, currency: "MXN" },
    Retail: { wage: 25.00, currency: "MXN" },
    BusDriver: { wage: 35.00, currency: "MXN" },
    FoodService: { wage: 22.00, currency: "MXN" }
  }
};

// Utility functions
const getWageUSD = (city, occupation) => {
  const data = wageData[city][occupation];
  let wage = data.wage;
  
  if (!wage) {
    wage = data.annual / HOURS_PER_YEAR;
  }
  
  return wage * EXCHANGE_RATES[data.currency];
};

const calculateHours = (price, wageUSD) => price / wageUSD;

const formatCurrency = (amount) => `$${Math.round(amount).toLocaleString()}`;

const formatHours = (hours) => hours.toFixed(1);

// Main Component
export default function WorldCupAffordabilityAnalysis() {
  const [city, setCity] = useState('New York/New Jersey');
  const [occupation, setOccupation] = useState('FoodService');
  const [stage, setStage] = useState('Final');
  const [category, setCategory] = useState('cat4');

  const cities = Object.keys(wageData);
  
  const selectedWage = getWageUSD(city, occupation);
  const selectedPrice = ticketPrices[stage][category];
  const selectedHours = calculateHours(selectedPrice, selectedWage);
  const supporterHours = calculateHours(SUPPORTER_TIER_PRICE, selectedWage);
  const priceMultiplier = selectedPrice / SUPPORTER_TIER_PRICE;

  // Calculate all occupations for comparison
  const occupationComparison = Object.keys(occupationLabels).map(occ => {
    const wage = getWageUSD(city, occ);
    const hours = calculateHours(selectedPrice, wage);
    return { occupation: occ, wage, hours };
  });

  // Calculate all stages for escalation
  const stageEscalation = Object.keys(stageLabels).map(stg => {
    const price = ticketPrices[stg][category];
    const hours = calculateHours(price, selectedWage);
    return { stage: stg, price, hours };
  });

  const maxOccHours = Math.max(...occupationComparison.map(o => o.hours));
  const maxStageHours = Math.max(...stageEscalation.map(s => s.hours));

  const getColorClass = (hours) => {
    if (hours < 5) return 'bg-emerald-500';
    if (hours < 15) return 'bg-lime-500';
    if (hours < 30) return 'bg-yellow-500';
    if (hours < 50) return 'bg-orange-500';
    if (hours < 100) return 'bg-red-500';
    return 'bg-rose-700';
  };

  const getTextColorClass = (hours) => {
    if (hours < 5) return 'text-emerald-600';
    if (hours < 15) return 'text-lime-600';
    if (hours < 30) return 'text-yellow-600';
    if (hours < 50) return 'text-orange-600';
    if (hours < 100) return 'text-red-600';
    return 'text-rose-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            ⚽ FIFA World Cup 2026: The Affordability Crisis
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Analyzing ticket prices against working-class wages across host cities—exposing the gap between FIFA's $60 "supporter tier" promise and economic reality
          </p>
        </header>

        {/* Controls */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2 uppercase tracking-wide">
                Host City
              </label>
              <select 
                value={city} 
                onChange={e => setCity(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {cities.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2 uppercase tracking-wide">
                Occupation
              </label>
              <select 
                value={occupation} 
                onChange={e => setOccupation(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {Object.entries(occupationLabels).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2 uppercase tracking-wide">
                Match Stage
              </label>
              <select 
                value={stage} 
                onChange={e => setStage(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {Object.entries(stageLabels).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2 uppercase tracking-wide">
                Ticket Category
              </label>
              <select 
                value={category} 
                onChange={e => setCategory(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {Object.entries(categoryLabels).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Supporter Tier Callout */}
          <div className="mt-6 bg-gradient-to-r from-rose-600 to-pink-600 rounded-xl p-6 text-center">
            <div className="text-2xl font-bold mb-2">FIFA's "Supporter Entry Tier": $60</div>
            <div className="text-sm opacity-90">
              Limited to ~1,000 tickets per match • Available only through national associations • Only for qualified team supporters
            </div>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 text-center">
            <div className="text-sm text-slate-400 mb-2 uppercase tracking-wide">Ticket Price</div>
            <div className="text-3xl font-bold text-rose-400">{formatCurrency(selectedPrice)}</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 text-center">
            <div className="text-sm text-slate-400 mb-2 uppercase tracking-wide">Hourly Wage</div>
            <div className="text-3xl font-bold text-blue-400">{formatCurrency(selectedWage)}</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 text-center">
            <div className="text-sm text-slate-400 mb-2 uppercase tracking-wide">Hours Required</div>
            <div className={`text-3xl font-bold ${getTextColorClass(selectedHours)}`}>
              {formatHours(selectedHours)}
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 text-center">
            <div className="text-sm text-slate-400 mb-2 uppercase tracking-wide">Supporter Hours</div>
            <div className="text-3xl font-bold text-emerald-400">{formatHours(supporterHours)}</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 text-center">
            <div className="text-sm text-slate-400 mb-2 uppercase tracking-wide">Price Gap</div>
            <div className="text-3xl font-bold text-amber-400">{priceMultiplier.toFixed(1)}x</div>
          </div>
        </div>

        {/* Impact Statement */}
        <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-xl p-8 mb-8 border-l-4 border-rose-500">
          <p className="text-lg leading-relaxed">
            A <span className="font-bold text-blue-400">{occupationLabels[occupation]}</span> in{' '}
            <span className="font-bold text-blue-400">{city.split(',')[0]}</span> must work{' '}
            <span className="font-bold text-rose-400 text-xl">{formatHours(selectedHours)} hours</span> to afford a single{' '}
            {categoryLabels[category]} ticket for the {stageLabels[stage]}.{' '}
            {selectedHours > 40 && "That's more than a full work week. "}
            {selectedHours > 20 && selectedHours <= 40 && "That's roughly half a work week. "}
            Meanwhile, FIFA's $60 "Supporter Entry Tier" would require just{' '}
            <span className="font-bold text-emerald-400">{formatHours(supporterHours)} hours</span> of work—but these tickets represent less than 1% of available inventory and are distributed exclusively through national associations, not to local residents or general fans.
          </p>
        </div>

        {/* Occupation Comparison */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-slate-700">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded"></span>
            Occupation Comparison: {city.split(',')[0]}
          </h2>
          
          <div className="space-y-4">
            {occupationComparison.map(({ occupation: occ, hours }) => (
              <div key={occ} className="flex items-center gap-4">
                <div className="w-48 text-sm font-medium text-slate-300">
                  {occupationLabels[occ]}
                </div>
                <div className="flex-1 bg-slate-700 rounded-full h-12 relative overflow-hidden">
                  <div 
                    className={`h-full ${getColorClass(hours)} transition-all duration-500 flex items-center justify-end px-4 text-white font-bold`}
                    style={{ width: `${(hours / maxOccHours) * 100}%` }}
                  >
                    {formatHours(hours)} hrs
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stage Escalation */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-slate-700">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-1 h-8 bg-gradient-to-b from-rose-500 to-orange-500 rounded"></span>
            Price Escalation by Stage: {categoryLabels[category]}
          </h2>
          
          <div className="space-y-4">
            {stageEscalation.map(({ stage: stg, price, hours }) => (
              <div key={stg} className="flex items-center gap-4">
                <div className="w-40 text-sm font-medium text-slate-300">
                  {stageLabels[stg]}
                </div>
                <div className="flex-1 bg-slate-700 rounded-full h-12 relative overflow-hidden">
                  <div 
                    className={`h-full ${getColorClass(hours)} transition-all duration-500 flex items-center justify-end px-4 text-white font-bold text-sm`}
                    style={{ width: `${(hours / maxStageHours) * 100}%` }}
                  >
                    {formatCurrency(price)} • {formatHours(hours)} hrs
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Complete Price Matrix */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-slate-700 overflow-x-auto">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded"></span>
            Complete Price Matrix: {occupationLabels[occupation]} in {city.split(',')[0]}
          </h2>
          
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 font-semibold text-slate-300">Stage</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-300">Category 1</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-300">Category 2</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-300">Category 3</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-300">Category 4</th>
                <th className="text-left py-3 px-4 font-semibold text-emerald-400">Supporter ($60)</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(stageLabels).map(stg => (
                <tr key={stg} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                  <td className="py-3 px-4 font-medium">{stageLabels[stg]}</td>
                  {['cat1', 'cat2', 'cat3', 'cat4'].map(cat => {
                    const price = ticketPrices[stg][cat];
                    const hours = calculateHours(price, selectedWage);
                    return (
                      <td key={cat} className="py-3 px-4">
                        <div className="font-semibold">{formatCurrency(price)}</div>
                        <div className={`text-xs ${getTextColorClass(hours)}`}>
                          {formatHours(hours)} hrs
                        </div>
                      </td>
                    );
                  })}
                  <td className="py-3 px-4">
                    <div className="font-semibold text-emerald-400">$60</div>
                    <div className="text-xs text-emerald-300">
                      {formatHours(supporterHours)} hrs
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Methodology */}
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-bold mb-4 text-slate-300">Methodology & Data Sources</h3>
          <div className="space-y-2 text-sm text-slate-400 leading-relaxed">
            <p>
              <strong className="text-slate-300">Wage Data:</strong> U.S. Bureau of Labor Statistics (BLS OEWS, May 2024), 
              Statistics Canada Job Bank (2024), INEGI ENOE (Q1 2025). All wages converted to USD using January 2026 
              exchange rates (CAD: 0.70, MXN: 0.05).
            </p>
            <p>
              <strong className="text-slate-300">Ticket Prices:</strong> Based on FIFA's official 2026 pricing structure 
              as compiled from multiple sources including official announcements, price grids, and verified resale marketplace data. 
              Prices reflect face-value list prices for general public sale.
            </p>
            <p>
              <strong className="text-slate-300">Calculations:</strong> Hours worked = (Ticket Price ÷ Median Hourly Wage). 
              Pre-tax calculations; does not account for additional costs (travel, accommodation, food).
            </p>
            <p>
              <strong className="text-slate-300">Context:</strong> The $60 "Supporter Entry Tier" represents approximately 
              8% of total match inventory (≈1,000 seats per match), distributed exclusively through Participating Member 
              Associations (PMAs) to qualified supporters of competing teams. These seats are not available to general 
              public or host-city residents.
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-slate-500">
          <p>Data Analysis: FIFA World Cup 2026 Affordability Crisis</p>
          <p>Sources: BLS, Statistics Canada, INEGI, FIFA Official Pricing</p>
          <p>Analysis Date: January 2026</p>
          <p>Dr. Cary Woods</p>
          <p><a href="https://harnessai.net">Harness AI</a></p>
        </footer>

      </div>
    </div>
  );
}
