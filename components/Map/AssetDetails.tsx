'use client';

import { AssetFeature } from '@/lib/dataClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AssetDetailsProps {
  asset: AssetFeature | null;
  onClose: () => void;
}

export default function AssetDetails({ asset, onClose }: AssetDetailsProps) {
  if (!asset) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200';
      case 'planned':
        return 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200';
      case 'under_construction':
        return 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      plant: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200',
      storage: 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200',
      renewable: 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-yellow-200',
      demand_center: 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-200',
      pipeline: 'bg-gradient-to-r from-purple-100 to-violet-100 text-purple-800 border-purple-200',
      distribution_hub: 'bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border-orange-200',
      transport_route: 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200',
    };
    return colors[type] || 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200';
  };

  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      plant: '🏭',
      storage: '🔋',
      renewable: '☀️',
      demand_center: '🏢',
      pipeline: '🚰',
      distribution_hub: '📡',
      transport_route: '🚛',
    };
    return icons[type] || '📍';
  };

  return (
    <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xl">{getTypeIcon(asset.properties.type)}</span>
              <CardTitle className="text-lg font-semibold text-gray-800">
                {asset.properties.name}
              </CardTitle>
            </div>
            <p className="text-xs text-gray-500">Infrastructure Asset Details</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex flex-wrap gap-2">
          <Badge className={`${getTypeColor(asset.properties.type)} border px-3 py-1 text-xs font-medium`}>
            {asset.properties.type.replace('_', ' ').toUpperCase()}
          </Badge>
          <Badge className={`${getStatusColor(asset.properties.status)} border px-3 py-1 text-xs font-medium`}>
            {asset.properties.status.replace('_', ' ').toUpperCase()}
          </Badge>
        </div>

        {asset.properties.capacity && (
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100">
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <h4 className="font-medium text-sm text-gray-700">Production Capacity</h4>
            </div>
            <p className="text-2xl font-bold text-blue-700">{asset.properties.capacity}</p>
            <p className="text-xs text-blue-600">Megawatts (MW)</p>
          </div>
        )}

        {asset.properties.description && (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              <h4 className="font-medium text-sm text-gray-700">Description</h4>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg">
              {asset.properties.description}
            </p>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <h4 className="font-medium text-sm text-gray-700">Location Coordinates</h4>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-sm font-mono text-gray-600">
              Lat: {(asset.geometry.coordinates as [number, number])[1].toFixed(6)}
            </p>
            <p className="text-sm font-mono text-gray-600">
              Lng: {(asset.geometry.coordinates as [number, number])[0].toFixed(6)}
            </p>
          </div>
        </div>

        {/* Additional properties */}
        {Object.entries(asset.properties).filter(([key]) => 
          !['name', 'type', 'status', 'capacity', 'description'].includes(key)
        ).length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <h4 className="font-medium text-sm text-gray-700">Additional Information</h4>
            </div>
            <div className="space-y-2">
              {Object.entries(asset.properties).map(([key, value]) => {
                if (['name', 'type', 'status', 'capacity', 'description'].includes(key)) {
                  return null;
                }
                return (
                  <div key={key} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg">
                    <span className="text-xs font-medium text-gray-600 capitalize">
                      {key.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-gray-800 font-medium">{String(value)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
