'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LayerControl from '@/components/Map/LayerControl';
import AssetDetails from '@/components/Map/AssetDetails';
import RecommendationPanel from '@/components/Map/RecommendationPanel';
import BarChart from '@/components/Charts/BarChart';
import LineChart from '@/components/Charts/LineChart';
import { dataClient, AssetFeature, RecommendationSite } from '@/lib/dataClient';

// Dynamically import the map to avoid SSR issues
const LeafletMap = dynamic(() => import('@/components/Map/LeafletMap'), {
  ssr: false,
  loading: () => <div className="h-full flex items-center justify-center">Loading map...</div>
});

export default function DashboardPage() {
  const router = useRouter();
  const [selectedAsset, setSelectedAsset] = useState<AssetFeature | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendationSite[]>([]);
  const [layerVisibility, setLayerVisibility] = useState({
    plant: true,
    storage: true,
    renewable: true,
    demand_center: true,
    pipeline: false,
    distribution_hub: false,
    transport_route: false,
  });

  // Check if user is authenticated
  const { data: user, isError } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await fetch('/api/auth/me');
      if (!response.ok) {
        throw new Error('Not authenticated');
      }
      return response.json();
    },
    retry: false,
  });

  // Fetch assets data
  const { data: assets, isLoading: assetsLoading } = useQuery({
    queryKey: ['assets'],
    queryFn: () => dataClient.getAssets(),
  });

  // Fetch chart data
  const { data: supplyDemandData } = useQuery({
    queryKey: ['supply-demand'],
    queryFn: () => dataClient.getSupplyDemandData(),
  });

  const { data: capacityData } = useQuery({
    queryKey: ['capacity-region'],
    queryFn: () => dataClient.getCapacityByRegion(),
  });

  const { data: costData } = useQuery({
    queryKey: ['cost-distance'],
    queryFn: () => dataClient.getCostDistanceData(),
  });

  useEffect(() => {
    if (isError) {
      router.push('/auth/login');
    }
  }, [isError, router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleLayerToggle = (layer: string, visible: boolean) => {
    setLayerVisibility(prev => ({ ...prev, [layer]: visible }));
  };

  if (isError) {
    return null; // Will redirect to login
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-green-600">HydroNet</h1>
          <span className="text-gray-400">|</span>
          <h2 className="text-lg font-medium text-gray-700">Infrastructure Dashboard</h2>
        </div>
        <div className="flex items-center space-x-4">
          {user && (
            <span className="text-sm text-gray-600">
              Welcome, {user.user?.name}
            </span>
          )}
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </nav>

      <div className="flex-1 flex">
        {/* Left Sidebar */}
        <div className="w-80 bg-white border-r p-4 space-y-4 overflow-y-auto">
          <LayerControl
            layerVisibility={layerVisibility}
            onLayerToggle={handleLayerToggle}
          />
          <RecommendationPanel
            onRecommendationsGenerated={setRecommendations}
          />
        </div>

        {/* Main Map Area */}
        <div className="flex-1 relative">
          {assetsLoading ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
                <p className="mt-4 text-gray-600">Loading infrastructure data...</p>
              </div>
            </div>
          ) : (
            <LeafletMap
              assets={assets || null}
              selectedAsset={selectedAsset}
              onAssetSelect={setSelectedAsset}
              layerVisibility={layerVisibility}
              recommendations={recommendations}
            />
          )}
        </div>

        {/* Right Sidebar */}
        <div className="w-80 bg-white border-l p-4 space-y-4 overflow-y-auto">
          <AssetDetails
            asset={selectedAsset}
            onClose={() => setSelectedAsset(null)}
          />

          {/* Charts Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-gray-600">Analytics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {supplyDemandData && (
                <div className="space-y-2 text-gray-600">
                  <h4 className="font-medium text-sm ">Supply vs Demand</h4>
                  <LineChart
                    data={supplyDemandData}
                    width={280}
                    height={150}
                  />
                </div>
              )}
              
              {capacityData && (
                <div className="space-y-2 text-gray-600">
                  <h4 className="font-medium text-sm">Capacity by Region</h4>
                  <BarChart
                    data={capacityData}
                    width={280}
                    height={150}
                  />
                </div>
              )}
              
              {costData && (
                <div className="space-y-2 text-gray-600">
                  <h4 className="font-medium text-sm">Cost vs Distance</h4>
                  <BarChart
                    data={costData}
                    width={280}
                    height={150}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
