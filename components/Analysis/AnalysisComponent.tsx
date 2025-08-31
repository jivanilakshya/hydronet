'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export default function AnalysisComponent() {
  const [selectedDateRange, setSelectedDateRange] = useState('Last 12 Months');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedParameter, setSelectedParameter] = useState('All Parameters');

  // Mock data for charts
  const costOptimizationData = [
    { month: 'Jan', value: 1.0 },
    { month: 'Feb', value: 1.3 },
    { month: 'Mar', value: 1.1 },
    { month: 'Apr', value: 1.4 },
    { month: 'May', value: 1.2 },
    { month: 'Jun', value: 1.6 },
    { month: 'Jul', value: 1.0 },
    { month: 'Aug', value: 1.3 },
    { month: 'Sep', value: 1.1 },
    { month: 'Oct', value: 1.7 },
    { month: 'Nov', value: 1.4 },
    { month: 'Dec', value: 1.2 },
  ];

  const demandForecastData = [
    { period: 'Q1', value: 1800 },
    { period: 'Q2', value: 2200 },
    { period: 'Q3', value: 2000 },
    { period: 'Q4', value: 2500 },
  ];

  const networkGrowthData = [
    { year: '2022', percentage: 85 },
    { year: '2023', percentage: 92 },
    { year: '2024', percentage: 96 },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 shadow-lg">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Navigation */}
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity cursor-pointer">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🌱</span>
                </div>
                <h1 className="text-xl font-semibold text-white">HydroNet </h1>
              </Link>
              
              {/* Navigation Menu */}
              <nav className="hidden md:flex items-center space-x-6">
                <Link href="/dashboard">
                  <button className="text-gray-300 hover:text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Dashboard
                  </button>
                </Link>
                <button className="text-white bg-gray-700 px-4 py-2 rounded-lg font-medium">
                  Analysis
                </button>
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

            {/* User Info */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-300 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5zm-5-12h5l-5-5-5 5h5z" />
                </svg>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center space-x-2">
                <img 
                  src="https://ui-avatars.com/api/?name=User&background=10b981&color=fff"
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar - Analysis Tools */}
        <div className="w-80 bg-gray-800 border-r border-gray-700">
          <div className="p-6 space-y-6">
            <h2 className="text-lg font-semibold text-white">Analysis Tools</h2>
            
            {/* Date Range Filter */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300">Data Range</label>
              <select 
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option>Last 12 Months</option>
                <option>Last 6 Months</option>
                <option>Last 3 Months</option>
                <option>Last Month</option>
              </select>
            </div>

            {/* Geographical Area Filter */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300">Geographical Area</label>
              <select 
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option>All Regions</option>
                <option>North India</option>
                <option>South India</option>
                <option>West India</option>
                <option>East India</option>
                <option>Northeast India</option>
              </select>
            </div>

            {/* Parameter Filter */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300">Parameter</label>
              <select 
                value={selectedParameter}
                onChange={(e) => setSelectedParameter(e.target.value)}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option>All Parameters</option>
                <option>Production Capacity</option>
                <option>Cost Efficiency</option>
                <option>Environmental Impact</option>
                <option>Infrastructure Density</option>
              </select>
            </div>

            {/* Apply Filters Button */}
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors">
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 bg-gray-900 overflow-y-auto">
          <div className="space-y-6">
            {/* Page Title */}
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Analysis</h1>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Cost Optimization */}
              <Card className="bg-gray-800 border-gray-700 col-span-1 lg:col-span-2">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-white">Cost Optimization</CardTitle>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <div className="text-3xl font-bold text-white">$1.2M</div>
                    <div className="flex items-center space-x-1">
                      <span className="text-green-400 text-sm">▲ 6%</span>
                      <span className="text-gray-400 text-sm">Last 12 Months</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={costOptimizationData}>
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#10b981" 
                          strokeWidth={3}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Network Growth */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-white">Network Growth</CardTitle>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <div className="text-3xl font-bold text-white">15%</div>
                    <div className="flex items-center space-x-1">
                      <span className="text-green-400 text-sm">▲ +2%</span>
                      <span className="text-gray-400 text-sm">YoY</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    {networkGrowthData.map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-300">{item.year}</span>
                          <span className="text-white">{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Demand Forecasts */}
              <Card className="bg-gray-800 border-gray-700 col-span-1 lg:col-span-2 xl:col-span-3">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-white">Demand Forecasts</CardTitle>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <div className="text-3xl font-bold text-white">2500 Units</div>
                    <div className="flex items-center space-x-1">
                      <span className="text-green-400 text-sm">▲ +10%</span>
                      <span className="text-gray-400 text-sm">Next 12 Months</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={demandForecastData} barCategoryGap="20%">
                        <XAxis 
                          dataKey="period" 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#9CA3AF', fontSize: 12 }}
                        />
                        <YAxis hide />
                        <Bar 
                          dataKey="value" 
                          fill="#10b981" 
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
