'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { AssetCollection, AssetFeature } from '@/lib/dataClient';

// Fix for default markers in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
});

interface LeafletMapProps {
  assets: AssetCollection | null;
  selectedAsset: AssetFeature | null;
  onAssetSelect: (asset: AssetFeature | null) => void;
  layerVisibility: Record<string, boolean>;
  recommendations?: any[];
}

export default function LeafletMap({
  assets,
  selectedAsset,
  onAssetSelect,
  layerVisibility,
  recommendations = [],
}: LeafletMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Initialize map
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([40.7128, -74.006], 10);
      
      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(mapRef.current);

      markersRef.current = L.layerGroup().addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !markersRef.current || !assets) return;

    // Clear existing markers
    markersRef.current.clearLayers();

    // Add asset markers
    assets.features.forEach((asset) => {
      const isVisible = layerVisibility[asset.properties.type];
      if (!isVisible) return;

      const [lng, lat] = asset.geometry.coordinates as [number, number];
      
      // Choose icon based on asset type
      const iconUrl = getIconForAssetType(asset.properties.type);
      const icon = L.icon({
        iconUrl,
        iconSize: [25, 25],
        iconAnchor: [12, 12],
        popupAnchor: [0, -12],
      });

      const marker = L.marker([lat, lng], { icon })
        .bindPopup(`
          <div>
            <h3 class="font-semibold">${asset.properties.name}</h3>
            <p class="text-sm text-gray-600">Type: ${asset.properties.type}</p>
            <p class="text-sm text-gray-600">Status: ${asset.properties.status}</p>
            ${asset.properties.capacity ? `<p class="text-sm text-gray-600">Capacity: ${asset.properties.capacity} MW</p>` : ''}
            <p class="text-sm">${asset.properties.description || ''}</p>
          </div>
        `)
        .on('click', () => {
          onAssetSelect(asset);
        });

      markersRef.current!.addLayer(marker);
    });

    // Add recommendation markers
    recommendations.forEach((rec) => {
      const [lng, lat] = rec.coordinates;
      const icon = L.icon({
        iconUrl: '/icons/recommendation.png',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        popupAnchor: [0, -15],
      });

      const marker = L.marker([lat, lng], { icon })
        .bindPopup(`
          <div>
            <h3 class="font-semibold">Recommended Site</h3>
            <p class="text-sm text-gray-600">Score: ${rec.score.toFixed(2)}</p>
            <p class="text-sm">${rec.description}</p>
          </div>
        `);

      markersRef.current!.addLayer(marker);
    });
  }, [assets, layerVisibility, recommendations, onAssetSelect]);

  return (
    <div id="map" className="w-full h-full rounded-lg" />
  );
}

function getIconForAssetType(type: string): string {
  const iconMap: Record<string, string> = {
    plant: '/icons/plant.png',
    storage: '/icons/storage.png',
    renewable: '/icons/renewable.png',
    demand_center: '/icons/demand.png',
    pipeline: '/icons/pipeline.png',
    distribution_hub: '/icons/hub.png',
    transport_route: '/icons/transport.png',
  };
  
  return iconMap[type] || '/icons/default.png';
}
