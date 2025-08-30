import { AssetCollection, AssetFeature, RecommendationSite, ChartData } from './dataClient';

// Mock GeoJSON data for India-based green hydrogen infrastructure
export const mockAssets: AssetCollection = {
  type: 'FeatureCollection',
  features: [
    // Hydrogen Plants
    {
      type: 'Feature',
      id: 'plant-1',
      geometry: {
        type: 'Point',
        coordinates: [77.2090, 28.6139], // New Delhi
      },
      properties: {
        name: 'Delhi Green Hydrogen Plant',
        type: 'plant',
        capacity: 150,
        status: 'operational',
        description: 'Major electrolysis facility serving NCR region',
        region: 'North India',
        technology: 'PEM Electrolysis',
      },
    },
    {
      type: 'Feature',
      id: 'plant-2',
      geometry: {
        type: 'Point',
        coordinates: [72.8777, 19.0760], // Mumbai
      },
      properties: {
        name: 'Mumbai Hydrogen Hub',
        type: 'plant',
        capacity: 200,
        status: 'operational',
        description: 'Coastal hydrogen production facility',
        region: 'West India',
        technology: 'Alkaline Electrolysis',
      },
    },
    {
      type: 'Feature',
      id: 'plant-3',
      geometry: {
        type: 'Point',
        coordinates: [80.2707, 13.0827], // Chennai
      },
      properties: {
        name: 'Chennai Green Energy Center',
        type: 'plant',
        capacity: 120,
        status: 'under_construction',
        description: 'Solar-powered hydrogen production',
        region: 'South India',
        technology: 'PEM Electrolysis',
      },
    },
    {
      type: 'Feature',
      id: 'plant-4',
      geometry: {
        type: 'Point',
        coordinates: [88.3639, 22.5726], // Kolkata
      },
      properties: {
        name: 'Kolkata Industrial Complex',
        type: 'plant',
        capacity: 90,
        status: 'planned',
        description: 'Industrial hydrogen supply center',
        region: 'East India',
        technology: 'Alkaline Electrolysis',
      },
    },
    {
      type: 'Feature',
      id: 'plant-5',
      geometry: {
        type: 'Point',
        coordinates: [75.7873, 11.2588], // Kochi
      },
      properties: {
        name: 'Kochi Port Hydrogen Facility',
        type: 'plant',
        capacity: 80,
        status: 'operational',
        description: 'Port-based hydrogen production for shipping',
        region: 'South India',
        technology: 'PEM Electrolysis',
      },
    },
    
    // Storage Facilities
    {
      type: 'Feature',
      id: 'storage-1',
      geometry: {
        type: 'Point',
        coordinates: [77.5946, 12.9716], // Bangalore
      },
      properties: {
        name: 'Bangalore Storage Complex',
        type: 'storage',
        capacity: 75,
        status: 'operational',
        description: 'Underground hydrogen storage facility',
        region: 'South India',
        storageType: 'Underground Cavern',
      },
    },
    {
      type: 'Feature',
      id: 'storage-2',
      geometry: {
        type: 'Point',
        coordinates: [78.4867, 17.3850], // Hyderabad
      },
      properties: {
        name: 'Hyderabad Storage Hub',
        type: 'storage',
        capacity: 60,
        status: 'operational',
        description: 'High-pressure hydrogen storage',
        region: 'South India',
        storageType: 'Compressed Gas',
      },
    },
    {
      type: 'Feature',
      id: 'storage-3',
      geometry: {
        type: 'Point',
        coordinates: [72.5714, 23.0225], // Ahmedabad
      },
      properties: {
        name: 'Gujarat Storage Facility',
        type: 'storage',
        capacity: 100,
        status: 'under_construction',
        description: 'Large-scale hydrogen storage for industrial use',
        region: 'West India',
        storageType: 'Salt Cavern',
      },
    },

    // Renewable Energy Sources
    {
      type: 'Feature',
      id: 'renewable-1',
      geometry: {
        type: 'Point',
        coordinates: [70.4579, 23.2599], // Kutch, Gujarat
      },
      properties: {
        name: 'Kutch Solar Park',
        type: 'renewable',
        capacity: 500,
        status: 'operational',
        description: 'Massive solar installation for hydrogen production',
        region: 'West India',
        renewableType: 'Solar PV',
      },
    },
    {
      type: 'Feature',
      id: 'renewable-2',
      geometry: {
        type: 'Point',
        coordinates: [79.0882, 21.1458], // Nagpur area (wind corridor)
      },
      properties: {
        name: 'Maharashtra Wind Corridor',
        type: 'renewable',
        capacity: 300,
        status: 'operational',
        description: 'Wind farm cluster for clean hydrogen',
        region: 'Central India',
        renewableType: 'Wind',
      },
    },
    {
      type: 'Feature',
      id: 'renewable-3',
      geometry: {
        type: 'Point',
        coordinates: [77.7064, 9.9252], // Tamil Nadu
      },
      properties: {
        name: 'Tamil Nadu Wind Complex',
        type: 'renewable',
        capacity: 400,
        status: 'operational',
        description: 'Coastal wind farms for hydrogen production',
        region: 'South India',
        renewableType: 'Wind',
      },
    },
    {
      type: 'Feature',
      id: 'renewable-4',
      geometry: {
        type: 'Point',
        coordinates: [74.7973, 34.0837], // Ladakh
      },
      properties: {
        name: 'Ladakh Solar Project',
        type: 'renewable',
        capacity: 600,
        status: 'planned',
        description: 'High-altitude solar installation',
        region: 'North India',
        renewableType: 'Solar PV',
      },
    },

    // Demand Centers
    {
      type: 'Feature',
      id: 'demand-1',
      geometry: {
        type: 'Point',
        coordinates: [76.2673, 9.9312], // Kochi Industrial Area
      },
      properties: {
        name: 'Kochi Industrial Cluster',
        type: 'demand_center',
        capacity: 100,
        status: 'operational',
        description: 'Petrochemical and refinery hydrogen demand',
        region: 'South India',
        industry: 'Petrochemicals',
      },
    },
    {
      type: 'Feature',
      id: 'demand-2',
      geometry: {
        type: 'Point',
        coordinates: [72.8479, 21.1702], // Bharuch, Gujarat
      },
      properties: {
        name: 'Bharuch Chemical Complex',
        type: 'demand_center',
        capacity: 150,
        status: 'operational',
        description: 'Major chemical industry hydrogen consumer',
        region: 'West India',
        industry: 'Chemicals',
      },
    },
    {
      type: 'Feature',
      id: 'demand-3',
      geometry: {
        type: 'Point',
        coordinates: [86.2029, 22.2587], // Jamshedpur
      },
      properties: {
        name: 'Jamshedpur Steel Hub',
        type: 'demand_center',
        capacity: 200,
        status: 'operational',
        description: 'Steel industry hydrogen requirements',
        region: 'East India',
        industry: 'Steel',
      },
    },
    {
      type: 'Feature',
      id: 'demand-4',
      geometry: {
        type: 'Point',
        coordinates: [75.3412, 19.8762], // Aurangabad
      },
      properties: {
        name: 'Aurangabad Manufacturing Zone',
        type: 'demand_center',
        capacity: 80,
        status: 'operational',
        description: 'Automotive and manufacturing hydrogen use',
        region: 'West India',
        industry: 'Automotive',
      },
    },

    // Distribution Hubs
    {
      type: 'Feature',
      id: 'hub-1',
      geometry: {
        type: 'Point',
        coordinates: [77.1025, 28.7041], // Gurgaon
      },
      properties: {
        name: 'NCR Distribution Hub',
        type: 'distribution_hub',
        capacity: 50,
        status: 'operational',
        description: 'Regional hydrogen distribution center',
        region: 'North India',
      },
    },
    {
      type: 'Feature',
      id: 'hub-2',
      geometry: {
        type: 'Point',
        coordinates: [73.8567, 18.5204], // Pune
      },
      properties: {
        name: 'Pune Distribution Center',
        type: 'distribution_hub',
        capacity: 40,
        status: 'operational',
        description: 'Maharashtra hydrogen distribution',
        region: 'West India',
      },
    },
  ],
};

export const mockRenewables: AssetCollection = {
  type: 'FeatureCollection',
  features: mockAssets.features.filter(f => f.properties.type === 'renewable'),
};

export const mockDemandCenters: AssetCollection = {
  type: 'FeatureCollection',
  features: mockAssets.features.filter(f => f.properties.type === 'demand_center'),
};

export const mockTransportRoutes: AssetCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      id: 'route-1',
      geometry: {
        type: 'LineString',
        coordinates: [
          [77.2090, 28.6139], // Delhi
          [77.1025, 28.7041], // Gurgaon
          [76.2673, 9.9312],  // Kochi
        ],
      },
      properties: {
        name: 'Delhi-Kochi Hydrogen Corridor',
        type: 'transport_route',
        status: 'planned',
        description: 'Major north-south hydrogen distribution pipeline',
        length: '2200 km',
        dailyCapacity: '100 tons/day',
      },
    },
    {
      type: 'Feature',
      id: 'route-2',
      geometry: {
        type: 'LineString',
        coordinates: [
          [72.8777, 19.0760], // Mumbai
          [73.8567, 18.5204], // Pune
          [72.8479, 21.1702], // Bharuch
        ],
      },
      properties: {
        name: 'Mumbai-Gujarat Industrial Pipeline',
        type: 'transport_route',
        status: 'operational',
        description: 'Western corridor connecting major industrial centers',
        length: '350 km',
        dailyCapacity: '150 tons/day',
      },
    },
    {
      type: 'Feature',
      id: 'route-3',
      geometry: {
        type: 'LineString',
        coordinates: [
          [80.2707, 13.0827], // Chennai
          [77.5946, 12.9716], // Bangalore
          [75.7873, 11.2588], // Kochi
        ],
      },
      properties: {
        name: 'South India Hydrogen Network',
        type: 'transport_route',
        status: 'under_construction',
        description: 'Connecting southern manufacturing hubs',
        length: '800 km',
        dailyCapacity: '120 tons/day',
      },
    },
  ],
};

export const mockSupplyDemandData: ChartData[] = [
  { id: '1', label: 'Apr 2024', value: 180, category: 'supply', date: '2024-04' },
  { id: '2', label: 'Apr 2024', value: 150, category: 'demand', date: '2024-04' },
  { id: '3', label: 'May 2024', value: 220, category: 'supply', date: '2024-05' },
  { id: '4', label: 'May 2024', value: 180, category: 'demand', date: '2024-05' },
  { id: '5', label: 'Jun 2024', value: 280, category: 'supply', date: '2024-06' },
  { id: '6', label: 'Jun 2024', value: 220, category: 'demand', date: '2024-06' },
  { id: '7', label: 'Jul 2024', value: 320, category: 'supply', date: '2024-07' },
  { id: '8', label: 'Jul 2024', value: 260, category: 'demand', date: '2024-07' },
  { id: '9', label: 'Aug 2024', value: 350, category: 'supply', date: '2024-08' },
  { id: '10', label: 'Aug 2024', value: 290, category: 'demand', date: '2024-08' },
];

export const mockCapacityByRegion: ChartData[] = [
  { id: '1', label: 'North India', value: 380, category: 'region' },
  { id: '2', label: 'South India', value: 520, category: 'region' },
  { id: '3', label: 'East India', value: 240, category: 'region' },
  { id: '4', label: 'West India', value: 680, category: 'region' },
  { id: '5', label: 'Central India', value: 180, category: 'region' },
];

export const mockCostDistanceData: ChartData[] = [
  { id: '1', label: '0-50km', value: 3.2, category: 'cost' },
  { id: '2', label: '50-150km', value: 4.1, category: 'cost' },
  { id: '3', label: '150-300km', value: 5.5, category: 'cost' },
  { id: '4', label: '300-500km', value: 7.2, category: 'cost' },
  { id: '5', label: '500km+', value: 9.8, category: 'cost' },
];

export function generateMockRecommendations(criteria: any): RecommendationSite[] {
  const sites: RecommendationSite[] = [
    {
      id: 'rec-1',
      coordinates: [76.6394, 12.2958], // Mysore region
      score: 0.85,
      factors: {
        renewableDistance: 45,
        demandScore: 0.88,
        regulatoryScore: 0.82,
        costFactor: 0.65,
      },
      description: 'Excellent location near Karnataka solar corridor with good industrial access',
    },
    {
      id: 'rec-2',
      coordinates: [74.8723, 12.9141], // Mangalore region
      score: 0.78,
      factors: {
        renewableDistance: 65,
        demandScore: 0.85,
        regulatoryScore: 0.75,
        costFactor: 0.70,
      },
      description: 'Coastal location with port access and renewable energy potential',
    },
    {
      id: 'rec-3',
      coordinates: [73.1812, 22.3072], // Vadodara region
      score: 0.82,
      factors: {
        renewableDistance: 35,
        demandScore: 0.90,
        regulatoryScore: 0.85,
        costFactor: 0.60,
      },
      description: 'Strategic location in Gujarat industrial belt with policy support',
    },
    {
      id: 'rec-4',
      coordinates: [78.9629, 20.5937], // Nagpur region
      score: 0.75,
      factors: {
        renewableDistance: 55,
        demandScore: 0.75,
        regulatoryScore: 0.80,
        costFactor: 0.75,
      },
      description: 'Central India location with good connectivity to multiple regions',
    },
    {
      id: 'rec-5',
      coordinates: [85.8245, 20.2961], // Bhubaneswar region
      score: 0.70,
      factors: {
        renewableDistance: 75,
        demandScore: 0.70,
        regulatoryScore: 0.78,
        costFactor: 0.80,
      },
      description: 'Emerging industrial hub with potential for hydrogen development',
    },
  ];

  // Simple scoring based on criteria weights
  return sites
    .map(site => ({
      ...site,
      score: 
        criteria.renewableWeight * (1 / (site.factors.renewableDistance / 10)) +
        criteria.demandWeight * site.factors.demandScore +
        criteria.regulatoryWeight * site.factors.regulatoryScore -
        criteria.costWeight * site.factors.costFactor
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}
