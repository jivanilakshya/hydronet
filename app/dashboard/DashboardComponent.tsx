'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LayerControl from '@/components/Map/LayerControl';
import AssetDetails from '@/components/Map/AssetDetails';
import RecommendationPanel from '@/components/Map/RecommendationPanel';
import BarChart from '@/components/Charts/BarChart';
import LineChart from '@/components/Charts/LineChart';
import { dataClient, AssetFeature, RecommendationSite } from '@/lib/dataClient';

// Dynamically import the map to avoid SSR issues
const LeafletMap = dynamic(() => import('@/components/Map/LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center space-y-4">
        <div className="relative w-16 h-16 mx-auto">
          <div className="absolute inset-0 border-4 border-blue-200 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 border-t-4 border-blue-600 rounded-full animate-spin"></div>
        </div>
        <div className="space-y-2">
          <p className="text-lg font-semibold text-gray-800">Loading Infrastructure Map</p>
          <p className="text-sm text-gray-600">Mapping India's green hydrogen ecosystem...</p>
        </div>
      </div>
    </div>
  )
});

export default function DashboardPage() {
  const router = useRouter();
  const [selectedAsset, setSelectedAsset] = useState<AssetFeature | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendationSite[]>([]);
  const [activeTab, setActiveTab] = useState<'layers' | 'recommendations' | 'analytics'>('layers');
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

  const stats = [
    { label: 'Total Assets', value: assets?.features?.length || 0, color: 'bg-blue-500', icon: '🏭' },
    { label: 'Active Plants', value: assets?.features?.filter((a: AssetFeature) => a.properties.type === 'plant' && a.properties.status === 'operational').length || 0, color: 'bg-green-500', icon: '⚡' },
    { label: 'Storage Units', value: assets?.features?.filter((a: AssetFeature) => a.properties.type === 'storage').length || 0, color: 'bg-purple-500', icon: '🔋' },
    { label: 'Renewable Sources', value: assets?.features?.filter((a: AssetFeature) => a.properties.type === 'renewable').length || 0, color: 'bg-yellow-500', icon: '☀️' },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Dark Theme Header */}
      <header className="bg-gray-800 border-b border-gray-700 shadow-lg">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Navigation */}
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity cursor-pointer">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🌱</span>
                </div>
                <h1 className="text-xl font-semibold text-white">HydroNet</h1>
              </Link>
              
              {/* Navigation Menu */}
              <nav className="hidden md:flex items-center space-x-6">
                <button className="text-white bg-gray-700 px-4 py-2 rounded-lg font-medium">
                  Dashboard
                </button>
                <Link href="/analysis">
                  <button className="text-gray-300 hover:text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Analysis
                  </button>
                </Link>
                <Link href="/reports">
                  <button className="text-gray-300 hover:text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Reports
                  </button>
                </Link>
                <Link href="/about">
                  <button className="text-gray-300 hover:text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    About
                  </button>
                </Link>
              </nav>
            </div>

            {/* Search & User */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search location"
                  className="bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 pl-10 w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <button className="relative p-2 text-gray-300 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5zm-5-12h5l-5-5-5 5h5z" />
                </svg>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              
              {user && (
                <div className="flex items-center space-x-2">
                  <img 
                    src={`https://ui-avatars.com/api/?name=${user.user?.name}&background=10b981&color=fff`}
                    alt="User"
                    className="w-8 h-8 rounded-full"
                  />
                </div>
              )}
              
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="border-gray-600 bg-gray-700 text-white hover:bg-gray-600"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar with Filters */}
        <div className="w-80 bg-gray-800 border-r border-gray-700">
          <div className="p-6 space-y-6">
            {/* Search Location */}
            <div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search location"
                  className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <svg className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Filters Section */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-lg">Filters</h3>
              
              {/* Region Filter */}
              <div>
                <label className="text-gray-300 text-sm font-medium mb-2 block">Region</label>
                <select className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>All Regions</option>
                  <option>North India</option>
                  <option>South India</option>
                  <option>West India</option>
                  <option>East India</option>
                  <option>Northeast India</option>
                </select>
              </div>

              {/* Plant Type Filter */}
              <div>
                <label className="text-gray-300 text-sm font-medium mb-2 block">Plant Type</label>
                <select className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>All Types</option>
                  <option>Electrolysis Plant</option>
                  <option>Steam Reforming</option>
                  <option>Biomass Gasification</option>
                </select>
              </div>

              {/* Capacity Filter */}
              <div>
                <label className="text-gray-300 text-sm font-medium mb-2 block">Capacity</label>
                <select className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>All Capacities</option>
                  <option>0-50 MW</option>
                  <option>50-100 MW</option>
                  <option>100-500 MW</option>
                  <option>500+ MW</option>
                </select>
              </div>
            </div>

            {/* Layers Section */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-lg">Layers</h3>
              
              {/* Layer Controls */}
              <div className="space-y-3">
                {[
                  { key: 'plant', label: 'Hydrogen Plants', color: 'bg-blue-500', checked: layerVisibility.plant },
                  { key: 'storage', label: 'Storage Facilities', color: 'bg-green-500', checked: layerVisibility.storage },
                  { key: 'renewable', label: 'Renewable Energy Sources', color: 'bg-purple-500', checked: layerVisibility.renewable },
                  { key: 'demand_center', label: 'Demand Centers', color: 'bg-red-500', checked: layerVisibility.demand_center },
                  { key: 'pipeline', label: 'Pipelines', color: 'bg-yellow-500', checked: layerVisibility.pipeline },
                ].map((layer) => (
                  <div key={layer.key} className="flex items-center space-x-3">
                    <div className="relative">
                      <input
                        type="checkbox"
                        id={layer.key}
                        checked={layer.checked}
                        onChange={(e) => handleLayerToggle(layer.key, e.target.checked)}
                        className="sr-only"
                      />
                      <div
                        onClick={() => handleLayerToggle(layer.key, !layer.checked)}
                        className={`w-4 h-4 rounded cursor-pointer border border-gray-600 ${
                          layer.checked ? layer.color : 'bg-gray-700'
                        }`}
                      >
                        {layer.checked && (
                          <svg className="w-3 h-3 text-white ml-0.5 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <label htmlFor={layer.key} className="text-gray-300 text-sm cursor-pointer flex-1">
                      {layer.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Legend Section */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-lg">Legend</h3>
              <div className="space-y-2">
                {[
                  { icon: '●', color: 'text-blue-400', label: 'Hydrogen Plant' },
                  { icon: '●', color: 'text-green-400', label: 'Storage Facility' },
                  { icon: '—', color: 'text-yellow-400', label: 'Pipeline' },
                  { icon: '●', color: 'text-purple-400', label: 'Renewable Energy Source' },
                  { icon: '●', color: 'text-red-400', label: 'Demand Center' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className={`${item.color} text-lg font-bold`}>{item.icon}</span>
                    <span className="text-gray-300 text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Map Area */}
        <div className="flex-1 relative bg-gray-900">
          {assetsLoading ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="relative w-20 h-20 mx-auto">
                  <div className="absolute inset-0 border-4 border-green-400 rounded-full animate-pulse opacity-20"></div>
                  <div className="absolute inset-0 border-t-4 border-green-500 rounded-full animate-spin"></div>
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-semibold text-white">Loading Infrastructure Data</p>
                  <p className="text-sm text-gray-400">Mapping India's green hydrogen ecosystem...</p>
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
              
              {/* Map Controls */}
              <div className="absolute top-4 right-4 space-y-2">
                <button className="bg-white rounded-lg p-2 shadow-lg hover:shadow-xl transition-shadow">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
                <button className="bg-white rounded-lg p-2 shadow-lg hover:shadow-xl transition-shadow">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <button className="bg-white rounded-lg p-2 shadow-lg hover:shadow-xl transition-shadow">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                  </svg>
                </button>
              </div>
            </>
          )}

          {/* Statistics Cards at Bottom */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">CO2 Reduction</p>
                  <p className="text-white text-2xl font-bold">250K Tons</p>
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                    </svg>
                    <span className="text-green-400 text-sm font-medium">+15%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">Job Creation</p>
                  <p className="text-white text-2xl font-bold">5K Jobs</p>
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                    </svg>
                    <span className="text-green-400 text-sm font-medium">+10%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                <div className="space-y-1">
                  <p className="text-gray-400 text-sm">Investment</p>
                  <p className="text-white text-2xl font-bold">$1.2B</p>
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                    </svg>
                    <span className="text-green-400 text-sm font-medium">+20%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel for Asset Details */}
        {selectedAsset && (
          <div className="w-96 bg-gray-800 border-l border-gray-700">
            <div className="p-6">
              <AssetDetails
                asset={selectedAsset}
                onClose={() => setSelectedAsset(null)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
