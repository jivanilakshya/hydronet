import { AssetCollection, AssetFeature, RecommendationSite, ChartData } from './dataClient';

// Mock GeoJSON data for testing
export const mockAssets: AssetCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      id: 'plant-1',
      geometry: {
        type: 'Point',
        coordinates: [-74.006, 40.7128], // NYC
      },
      properties: {
        name: 'Green Hydrogen Plant Alpha',
        type: 'plant',
        capacity: 100,
        status: 'operational',
        description: 'Large-scale electrolysis facility',
      },
    },
    {
      type: 'Feature',
      id: 'storage-1',
      geometry: {
        type: 'Point',
        coordinates: [-73.935, 40.730], // Brooklyn
      },
      properties: {
        name: 'Brooklyn Storage Hub',
        type: 'storage',
        capacity: 50,
        status: 'operational',
        description: 'Underground hydrogen storage',
      },
    },
    {
      type: 'Feature',
      id: 'renewable-1',
      geometry: {
        type: 'Point',
        coordinates: [-74.1, 40.7], // Jersey
      },
      properties: {
        name: 'Wind Farm Delta',
        type: 'renewable',
        capacity: 200,
        status: 'operational',
        description: 'Offshore wind generation',
      },
    },
    {
      type: 'Feature',
      id: 'demand-1',
      geometry: {
        type: 'Point',
        coordinates: [-73.98, 40.75], // Manhattan
      },
      properties: {
        name: 'Industrial District',
        type: 'demand_center',
        capacity: 80,
        status: 'operational',
        description: 'Heavy industry hydrogen demand',
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
          [-74.006, 40.7128],
          [-73.935, 40.730],
          [-73.98, 40.75],
        ],
      },
      properties: {
        name: 'Main Transport Pipeline',
        type: 'transport_route',
        status: 'operational',
        description: 'Primary hydrogen distribution pipeline',
      },
    },
  ],
};

export const mockSupplyDemandData: ChartData[] = [
  { id: '1', label: 'Jan', value: 100, category: 'supply', date: '2024-01' },
  { id: '2', label: 'Jan', value: 80, category: 'demand', date: '2024-01' },
  { id: '3', label: 'Feb', value: 120, category: 'supply', date: '2024-02' },
  { id: '4', label: 'Feb', value: 95, category: 'demand', date: '2024-02' },
  { id: '5', label: 'Mar', value: 140, category: 'supply', date: '2024-03' },
  { id: '6', label: 'Mar', value: 110, category: 'demand', date: '2024-03' },
];

export const mockCapacityByRegion: ChartData[] = [
  { id: '1', label: 'North', value: 200, category: 'region' },
  { id: '2', label: 'South', value: 150, category: 'region' },
  { id: '3', label: 'East', value: 180, category: 'region' },
  { id: '4', label: 'West', value: 220, category: 'region' },
];

export const mockCostDistanceData: ChartData[] = [
  { id: '1', label: '0-10km', value: 2.5, category: 'cost' },
  { id: '2', label: '10-25km', value: 3.2, category: 'cost' },
  { id: '3', label: '25-50km', value: 4.1, category: 'cost' },
  { id: '4', label: '50-100km', value: 5.8, category: 'cost' },
  { id: '5', label: '100km+', value: 7.2, category: 'cost' },
];

export function generateMockRecommendations(criteria: any): RecommendationSite[] {
  const sites: RecommendationSite[] = [
    {
      id: 'rec-1',
      coordinates: [-74.02, 40.71],
      score: 0.85,
      factors: {
        renewableDistance: 5.2,
        demandScore: 0.9,
        regulatoryScore: 0.8,
        costFactor: 0.7,
      },
      description: 'Optimal location near renewable source and demand center',
    },
    {
      id: 'rec-2',
      coordinates: [-73.95, 40.72],
      score: 0.78,
      factors: {
        renewableDistance: 8.1,
        demandScore: 0.85,
        regulatoryScore: 0.75,
        costFactor: 0.8,
      },
      description: 'Good accessibility to transport infrastructure',
    },
    {
      id: 'rec-3',
      coordinates: [-74.05, 40.69],
      score: 0.72,
      factors: {
        renewableDistance: 12.5,
        demandScore: 0.7,
        regulatoryScore: 0.9,
        costFactor: 0.6,
      },
      description: 'Favorable regulatory environment',
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
