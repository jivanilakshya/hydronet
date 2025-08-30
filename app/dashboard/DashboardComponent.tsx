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
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Enhanced Top Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                HydroNet
              </h1>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <div className="w-1 h-6 bg-gray-300 rounded-full"></div>
              <h2 className="text-lg font-medium text-gray-700">Infrastructure Dashboard</h2>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {user && (
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Welcome back!</p>
                  <p className="text-xs text-gray-500">{user.user?.name}</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">
                    {user.user?.name?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
              </div>
            )}
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="border-gray-300 hover:bg-gray-50 text-gray-700"
            >
              Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        {/* Enhanced Left Sidebar */}
        <div className="w-72 bg-white/95 backdrop-blur-sm border-r border-gray-200 shadow-sm">
          <div className="p-6 space-y-6 overflow-y-auto h-full">
            {/* Map Layers Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                <h3 className="text-lg font-semibold text-gray-800">Map Layers</h3>
              </div>
              <LayerControl
                layerVisibility={layerVisibility}
                onLayerToggle={handleLayerToggle}
              />
            </div>

            {/* Site Recommendations Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                <h3 className="text-lg font-semibold text-gray-800">Site Recommendations</h3>
              </div>
              <RecommendationPanel
                onRecommendationsGenerated={setRecommendations}
              />
            </div>
          </div>
        </div>

        {/* Enhanced Main Map Area */}
        <div className="flex-1 relative bg-gray-100">
          {assetsLoading ? (
            <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
              <div className="text-center space-y-4">
                <div className="relative">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 absolute top-0 left-0"></div>
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-medium text-gray-800">Loading Infrastructure Data</p>
                  <p className="text-sm text-gray-600">Mapping India's green hydrogen ecosystem...</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <LeafletMap
                assets={assets || null}
                selectedAsset={selectedAsset}
                onAssetSelect={setSelectedAsset}
                layerVisibility={layerVisibility}
                recommendations={recommendations}
              />
              {/* Map Overlay Info */}
              {!selectedAsset && (
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200 max-w-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <p className="text-sm font-medium text-gray-800">Live Infrastructure Map</p>
                  </div>
                  <p className="text-xs text-gray-600">
                    Click on any asset marker to view detailed information and analytics
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Enhanced Right Sidebar */}
        <div className="w-80 bg-white/95 backdrop-blur-sm border-l border-gray-200 shadow-sm">
          <div className="p-6 space-y-6 overflow-y-auto h-full">
            {/* Asset Details Section */}
            {selectedAsset ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-6 bg-gradient-to-b from-emerald-500 to-green-500 rounded-full"></div>
                    <h3 className="text-lg font-semibold text-gray-800">Asset Details</h3>
                  </div>
                </div>
                <AssetDetails
                  asset={selectedAsset}
                  onClose={() => setSelectedAsset(null)}
                />
              </div>
            ) : (
              <div className="text-center py-8 space-y-3">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-700">Select an Asset</p>
                  <p className="text-xs text-gray-500">Click on any marker to view details</p>
                </div>
              </div>
            )}

            {/* Enhanced Analytics Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
                <h3 className="text-lg font-semibold text-gray-800">Analytics Overview</h3>
              </div>
              
              <div className="space-y-6">
                {supplyDemandData && (
                  <Card className="border-0 shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-medium text-gray-700 flex items-center space-x-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                        <span>Supply vs Demand Trends</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-4 rounded-xl border border-gray-100">
                        <LineChart
                          data={supplyDemandData}
                          width={300}
                          height={180}
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {capacityData && (
                  <Card className="border-0 shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-medium text-gray-700 flex items-center space-x-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                        <span>Regional Capacity Analysis</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="bg-gradient-to-br from-gray-50 to-green-50 p-4 rounded-xl border border-gray-100">
                        <BarChart
                          data={capacityData}
                          width={300}
                          height={180}
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {costData && (
                  <Card className="border-0 shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-medium text-gray-700 flex items-center space-x-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                        <span>Transportation Cost Analysis</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="bg-gradient-to-br from-gray-50 to-purple-50 p-4 rounded-xl border border-gray-100">
                        <BarChart
                          data={costData}
                          width={300}
                          height={180}
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
