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
    <Card className="w-80">
      <CardHeader>
        <CardTitle className="text-lg text-gray-600">Site Recommendations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div>
            <Label className="text-sm text-gray-600 font-medium">Renewable Proximity Weight</Label>
            <div className="flex items-center space-x-2 mt-1">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={criteria.renewableWeight}
                onChange={(e) => handleSliderChange('renewableWeight', parseFloat(e.target.value))}
                className="flex-1 text-gray-600"
              />
              <span className="text-sm text-gray-600 w-10">{criteria.renewableWeight.toFixed(1)}</span>
            </div>
          </div>

          <div>
            <Label className="text-sm text-gray-600 font-medium">Demand Access Weight</Label>
            <div className="flex items-center space-x-2 mt-1">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={criteria.demandWeight}
                onChange={(e) => handleSliderChange('demandWeight', parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm text-gray-600 w-10">{criteria.demandWeight.toFixed(1)}</span>
            </div>
          </div>

          <div>
            <Label className="text-sm text-gray-600 font-medium">Regulatory Score Weight</Label>
            <div className="flex items-center space-x-2 mt-1">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={criteria.regulatoryWeight}
                onChange={(e) => handleSliderChange('regulatoryWeight', parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm text-gray-600 w-10">{criteria.regulatoryWeight.toFixed(1)}</span>
            </div>
          </div>

          <div>
            <Label className="text-sm text-gray-600 font-medium">Cost Factor Weight</Label>
            <div className="flex items-center space-x-2 mt-1">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={criteria.costWeight}
                onChange={(e) => handleSliderChange('costWeight', parseFloat(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm text-gray-600 w-10">{criteria.costWeight.toFixed(1)}</span>
            </div>
          </div>

          <div>
            <Label className="text-sm text-gray-600 font-medium">Max Distance (km)</Label>
            <div className="flex items-center space-x-2 mt-1">
              <input
                type="range"
                min="10"
                max="200"
                step="10"
                value={criteria.maxDistance}
                onChange={(e) => handleSliderChange('maxDistance', parseInt(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm text-gray-600 w-10">{criteria.maxDistance}</span>
            </div>
          </div>

          <div>
            <Label className="text-sm text-gray-600 font-medium">Min Capacity (MW)</Label>
            <div className="flex items-center space-x-2 mt-1">
              <input
                type="range"
                min="1"
                max="100"
                step="5"
                value={criteria.minCapacity}
                onChange={(e) => handleSliderChange('minCapacity', parseInt(e.target.value))}
                className="flex-1"
              />
              <span className="text-sm text-gray-600 w-10">{criteria.minCapacity}</span>
            </div>
          </div>
        </div>

        <Button 
          onClick={generateRecommendations} 
          disabled={loading}
          className="w-full text-gray-600"
        >
          {loading ? 'Generating...' : 'Generate Recommendations'}
        </Button>

        <div className="text-xs text-gray-500">
          Total weights: {(criteria.renewableWeight + criteria.demandWeight + criteria.regulatoryWeight + criteria.costWeight).toFixed(1)}
        </div>
      </CardContent>
    </Card>
  );
}
