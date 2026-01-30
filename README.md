# FIFA World Cup 2026: The Affordability Crisis

An interactive data visualization analyzing FIFA World Cup 2026 ticket prices against working-class wages across all 16 host cities in the United States, Canada, and Mexico.

## Overview

This tool exposes the gap between FIFA's promised $60 "Supporter Entry Tier" and the economic reality facing working-class fans. It calculates hours of work required to afford tickets across different occupations, cities, match stages, and seating categories.

## Key Features

- **Supporter Tier Reality Check**: Direct comparison between FIFA's $60 promise and actual ticket availability
- **Multi-Dimensional Analysis**: Filter by city, occupation, match stage, and ticket category
- **Visual Insights**: 
  - Occupation comparison charts showing relative burden across professions
  - Stage escalation visualization revealing price increases from group stage to final
  - Complete price matrix with hours-worked calculations
- **Data-Driven**: Built on wage data from BLS, Statistics Canada, and INEGI
- **Comprehensive Coverage**: All 16 host cities, 5 working-class occupations, 6 match stages, 4 ticket categories

## Data Sources

- **Wage Data**: 
  - U.S. Bureau of Labor Statistics (BLS OEWS, May 2024)
  - Statistics Canada Job Bank (2024)
  - INEGI ENOE (Q1 2025)
- **Ticket Prices**: FIFA official 2026 pricing structure
- **Exchange Rates**: January 2026 estimates (CAD: 0.70, MXN: 0.05 to USD)

## Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Docker (for Coolify deployment)

### Local Development

```bash
# Clone the repository
git clone <repository-url>
cd fifa-2026-affordability-crisis

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Deployment with Coolify

This project is configured for deployment with Coolify using Docker.

**Automatic Deployment:**

1. Connect your Git repository to Coolify
2. Coolify will automatically detect the Dockerfile
3. Set build configuration:
   - Build Pack: Dockerfile
   - Port: 80
4. Deploy!

**Manual Docker Build (optional):**

```bash
# Build the Docker image
docker build -t fifa-2026-affordability .

# Run locally
docker run -p 3000:80 fifa-2026-affordability

# Access at http://localhost:3000
```

**Environment Variables:**

No environment variables required - this is a static React application.

**Health Check:**

The nginx server includes a health check endpoint at `/health` for Coolify monitoring.

## Project Structure

```
fifa-2026-affordability-crisis/
├── src/
│   ├── App.jsx          # Main application component
│   └── main.jsx         # React entry point
├── index.html           # HTML entry point
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## Usage

1. **Select Parameters**: Choose host city, occupation, match stage, and ticket category
2. **View Analysis**: See hours-of-work calculations and comparative visualizations
3. **Explore Data**: Navigate through occupation comparisons, stage escalation, and complete price matrix

## Key Findings

- A food service worker in New York must work **131.6 hours** for the cheapest Final ticket ($2,030)
- The same ticket would require just **3.9 hours** at FIFA's $60 "Supporter Tier" price
- Supporter Tier tickets represent <1% of inventory, unavailable to general public or host-city residents
- Price multipliers range from **1.2x** (Group Stage Cat 4) to **106x** (Final Cat 1) vs. Supporter Tier

## Methodology

**Calculations**: Hours worked = (Ticket Price ÷ Median Hourly Wage)

**Notes**: 
- Pre-tax calculations
- Does not account for additional costs (travel, accommodation, food)
- Wages converted to USD using January 2026 exchange rates
- Teacher wages calculated from annual salary ÷ 2,080 hours

## Technical Stack

- **React 18**: UI framework
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Styling (via CDN)
- **Pure JavaScript**: No additional dependencies

## Contributing

This project is maintained by Dr. Cary Woods. Contributions, bug reports, and feature requests are welcome.

## License

MIT License

## Author

**Dr. Cary Woods**
- Managing Director, HarnessAI
- Research Associate (former), Indiana University School of Medicine
- Website: [Breaking Barriers](https://breakingbarriers.blog)

## Acknowledgments

Data analysis built on official government wage statistics and FIFA's published ticket pricing structure. This tool aims to provide transparency around ticket affordability for working-class fans across North America.

---

**Analysis Date**: January 2026  
**Data Sources**: BLS, Statistics Canada, INEGI, FIFA Official Pricing
