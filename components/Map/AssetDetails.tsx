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
    return (
      <Card className="w-80">
        <CardContent className="p-6">
          <p className="text-gray-500 text-center">Select an asset on the map to view details</p>
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-green-100 text-green-800';
      case 'planned':
        return 'bg-blue-100 text-blue-800';
      case 'under_construction':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      plant: 'bg-green-100 text-green-800',
      storage: 'bg-blue-100 text-blue-800',
      renewable: 'bg-yellow-100 text-yellow-800',
      demand_center: 'bg-red-100 text-red-800',
      pipeline: 'bg-purple-100 text-purple-800',
      distribution_hub: 'bg-orange-100 text-orange-800',
      transport_route: 'bg-gray-100 text-gray-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="w-80">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{asset.properties.name}</CardTitle>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Badge className={getTypeColor(asset.properties.type)}>
            {asset.properties.type.replace('_', ' ').toUpperCase()}
          </Badge>
          <Badge className={getStatusColor(asset.properties.status)}>
            {asset.properties.status.replace('_', ' ').toUpperCase()}
          </Badge>
        </div>

        {asset.properties.capacity && (
          <div>
            <h4 className="font-medium text-sm text-gray-700">Capacity</h4>
            <p className="text-lg font-semibold">{asset.properties.capacity} MW</p>
          </div>
        )}

        {asset.properties.description && (
          <div>
            <h4 className="font-medium text-sm text-gray-700">Description</h4>
            <p className="text-sm text-gray-600">{asset.properties.description}</p>
          </div>
        )}

        <div>
          <h4 className="font-medium text-sm text-gray-700">Coordinates</h4>
          <p className="text-sm text-gray-600 font-mono">
            {(asset.geometry.coordinates as [number, number])[1].toFixed(4)}, {(asset.geometry.coordinates as [number, number])[0].toFixed(4)}
          </p>
        </div>

        {/* Additional properties */}
        {Object.entries(asset.properties).map(([key, value]) => {
          if (['name', 'type', 'status', 'capacity', 'description'].includes(key)) {
            return null;
          }
          return (
            <div key={key}>
              <h4 className="font-medium text-sm text-gray-700 capitalize">
                {key.replace('_', ' ')}
              </h4>
              <p className="text-sm text-gray-600">{String(value)}</p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
