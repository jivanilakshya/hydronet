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
    <Card className="w-72">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm text-gray-600">Map Layers</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className='text-gray-600'
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? '−' : '+'}
          </Button>
        </div>
      </CardHeader>
      {expanded && (
        <CardContent className="space-y-3">
          {Object.entries(LAYER_LABELS).map(([layer, label]) => (
            <div key={layer} className="flex items-center space-x-3">
              <div
                className={`w-3 h-3 rounded-full  ${LAYER_COLORS[layer as keyof typeof LAYER_COLORS]}`}
              />
              <Label className="flex-1 text-sm text-gray-600 cursor-pointer" htmlFor={layer}>
                {label}
              </Label>
              <input
                id={layer}
                type="checkbox"
                checked={layerVisibility[layer] || false}
                onChange={(e) => onLayerToggle(layer, e.target.checked)}
                className="rounded border-gray-300"
              />
            </div>
          ))}
          <div className="pt-2 border-t">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  Object.keys(LAYER_LABELS).forEach(layer => {
                    onLayerToggle(layer, true);
                  });
                }}
              >
                Show All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  Object.keys(LAYER_LABELS).forEach(layer => {
                    onLayerToggle(layer, false);
                  });
                }}
              >
                Hide All
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
