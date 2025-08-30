'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface LayerControlProps {
  layerVisibility: Record<string, boolean>;
  onLayerToggle: (layer: string, visible: boolean) => void;
}

const LAYER_LABELS = {
  plant: 'Hydrogen Plants',
  storage: 'Storage Facilities',
  renewable: 'Renewable Sources',
  demand_center: 'Demand Centers',
  pipeline: 'Pipelines',
  distribution_hub: 'Distribution Hubs',
  transport_route: 'Transport Routes',
};

const LAYER_COLORS = {
  plant: 'bg-green-500',
  storage: 'bg-blue-500',
  renewable: 'bg-yellow-500',
  demand_center: 'bg-red-500',
  pipeline: 'bg-purple-500',
  distribution_hub: 'bg-orange-500',
  transport_route: 'bg-gray-500',
};

export default function LayerControl({ layerVisibility, onLayerToggle }: LayerControlProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="space-y-4">
      {expanded && (
        <div className="space-y-3">
          {Object.entries(LAYER_LABELS).map(([layer, label]) => (
            <div
              key={layer}
              className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3 flex-1">
                <div className={`w-3 h-3 rounded-full ${LAYER_COLORS[layer as keyof typeof LAYER_COLORS]}`} />
                <Label 
                  htmlFor={layer} 
                  className="text-sm font-medium text-gray-700 cursor-pointer flex-1"
                >
                  {label}
                </Label>
              </div>
              <div className="relative">
                <input
                  id={layer}
                  type="checkbox"
                  checked={layerVisibility[layer]}
                  onChange={(e) => onLayerToggle(layer, e.target.checked)}
                  className="sr-only"
                />
                <div
                  onClick={() => onLayerToggle(layer, !layerVisibility[layer])}
                  className={`w-11 h-6 rounded-full cursor-pointer transition-colors ${
                    layerVisibility[layer] 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                      : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform transform ${
                      layerVisibility[layer] ? 'translate-x-6' : 'translate-x-1'
                    } mt-1`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex space-x-2">
        <Button
          size="sm"
          onClick={() => {
            Object.keys(LAYER_LABELS).forEach(layer => {
              onLayerToggle(layer, true);
            });
          }}
          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0"
        >
          Show All
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            Object.keys(LAYER_LABELS).forEach(layer => {
              onLayerToggle(layer, false);
            });
          }}
          className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Hide All
        </Button>
      </div>
    </div>
  );
}
