export interface AssetFeature {
  type: 'Feature';
  id: string;
  geometry: {
    type: 'Point' | 'LineString' | 'Polygon';
    coordinates: number[] | number[][] | number[][][];
  };
  properties: {
    name: string;
    type: 'plant' | 'storage' | 'pipeline' | 'distribution_hub' | 'renewable' | 'demand_center' | 'transport_route';
    capacity?: number;
    status: 'operational' | 'planned' | 'under_construction';
    description?: string;
    [key: string]: any;
  };
}

export interface AssetCollection {
  type: 'FeatureCollection';
  features: AssetFeature[];
}

export interface RecommendationSite {
  id: string;
  coordinates: [number, number];
  score: number;
  factors: {
    renewableDistance: number;
    demandScore: number;
    regulatoryScore: number;
    costFactor: number;
  };
  description: string;
}

export interface ChartData {
  id: string;
  label: string;
  value: number;
  category?: string;
  date?: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '/api/mock';

class DataClient {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  }

  async getAssets(params?: { type?: string; status?: string }): Promise<AssetCollection> {
    const searchParams = new URLSearchParams();
    if (params?.type) searchParams.set('type', params.type);
    if (params?.status) searchParams.set('status', params.status);
    
    const query = searchParams.toString();
    return this.request<AssetCollection>(`/assets${query ? `?${query}` : ''}`);
  }

  async getRenewables(): Promise<AssetCollection> {
    return this.request<AssetCollection>('/renewables');
  }

  async getDemandCenters(): Promise<AssetCollection> {
    return this.request<AssetCollection>('/demand-centers');
  }

  async getTransportRoutes(): Promise<AssetCollection> {
    return this.request<AssetCollection>('/transport-routes');
  }

  async getRecommendations(criteria: {
    renewableWeight: number;
    demandWeight: number;
    regulatoryWeight: number;
    costWeight: number;
    maxDistance: number;
    minCapacity: number;
  }): Promise<RecommendationSite[]> {
    return this.request<RecommendationSite[]>('/recommendations', {
      method: 'POST',
      body: JSON.stringify(criteria),
    });
  }

  async getSupplyDemandData(): Promise<ChartData[]> {
    return this.request<ChartData[]>('/charts/supply-demand');
  }

  async getCapacityByRegion(): Promise<ChartData[]> {
    return this.request<ChartData[]>('/charts/capacity-region');
  }

  async getCostDistanceData(): Promise<ChartData[]> {
    return this.request<ChartData[]>('/charts/cost-distance');
  }
}

export const dataClient = new DataClient();
