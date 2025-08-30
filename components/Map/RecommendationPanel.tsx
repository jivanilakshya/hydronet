'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RecommendationSite } from '@/lib/dataClient';

interface RecommendationPanelProps {
  onRecommendationsGenerated: (recommendations: RecommendationSite[]) => void;
}

export default function RecommendationPanel({ onRecommendationsGenerated }: RecommendationPanelProps) {
  const [loading, setLoading] = useState(false);
  const [criteria, setCriteria] = useState({
    renewableWeight: 0.3,
    demandWeight: 0.3,
    regulatoryWeight: 0.2,
    costWeight: 0.2,
    maxDistance: 50,
    minCapacity: 10,
  });

  const handleSliderChange = (key: string, value: number) => {
    setCriteria(prev => ({ ...prev, [key]: value }));
  };

  const generateRecommendations = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/mock/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(criteria),
      });

      if (response.ok) {
        const recommendations = await response.json();
        onRecommendationsGenerated(recommendations);
      } else {
        console.error('Failed to generate recommendations');
      }
    } catch (error) {
      console.error('Error generating recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <Label className="text-sm font-medium text-gray-700 mb-2 block">Renewable Proximity Weight</Label>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={criteria.renewableWeight}
                onChange={(e) => handleSliderChange('renewableWeight', parseFloat(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <span className="text-sm font-semibold text-gray-800 bg-gray-100 px-2 py-1 rounded min-w-[3rem] text-center">
                {criteria.renewableWeight.toFixed(1)}
              </span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <Label className="text-sm font-medium text-gray-700 mb-2 block">Demand Access Weight</Label>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={criteria.demandWeight}
                onChange={(e) => handleSliderChange('demandWeight', parseFloat(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <span className="text-sm font-semibold text-gray-800 bg-gray-100 px-2 py-1 rounded min-w-[3rem] text-center">
                {criteria.demandWeight.toFixed(1)}
              </span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <Label className="text-sm font-medium text-gray-700 mb-2 block">Regulatory Score Weight</Label>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={criteria.regulatoryWeight}
                onChange={(e) => handleSliderChange('regulatoryWeight', parseFloat(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <span className="text-sm font-semibold text-gray-800 bg-gray-100 px-2 py-1 rounded min-w-[3rem] text-center">
                {criteria.regulatoryWeight.toFixed(1)}
              </span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <Label className="text-sm font-medium text-gray-700 mb-2 block">Cost Factor Weight</Label>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={criteria.costWeight}
                onChange={(e) => handleSliderChange('costWeight', parseFloat(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <span className="text-sm font-semibold text-gray-800 bg-gray-100 px-2 py-1 rounded min-w-[3rem] text-center">
                {criteria.costWeight.toFixed(1)}
              </span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <Label className="text-sm font-medium text-gray-700 mb-2 block">Max Distance (km)</Label>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="10"
                max="200"
                step="10"
                value={criteria.maxDistance}
                onChange={(e) => handleSliderChange('maxDistance', parseInt(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <span className="text-sm font-semibold text-gray-800 bg-gray-100 px-2 py-1 rounded min-w-[3rem] text-center">
                {criteria.maxDistance}
              </span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <Label className="text-sm font-medium text-gray-700 mb-2 block">Min Capacity (MW)</Label>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="1"
                max="100"
                step="5"
                value={criteria.minCapacity}
                onChange={(e) => handleSliderChange('minCapacity', parseInt(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <span className="text-sm font-semibold text-gray-800 bg-gray-100 px-2 py-1 rounded min-w-[3rem] text-center">
                {criteria.minCapacity}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-700">Total Weights:</span>
            <span className="text-sm font-bold text-blue-800">
              {(criteria.renewableWeight + criteria.demandWeight + criteria.regulatoryWeight + criteria.costWeight).toFixed(1)}
            </span>
          </div>
        </div>

        <Button 
          onClick={generateRecommendations} 
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 py-3 font-medium"
        >
          {loading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Generating...</span>
            </div>
          ) : (
            'Generate Site Recommendations'
          )}
        </Button>
      </div>
    </div>
  );
}
