'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Report {
  id: string;
  name: string;
  type: string;
  region: string;
  dateGenerated: string;
}

export default function ReportsComponent() {
  const [selectedReportType, setSelectedReportType] = useState('Project Summary');
  const [selectedRegion, setSelectedRegion] = useState('Metro City');
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('Last 30 Days');
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock reports data
  const reports: Report[] = [
    {
      id: '1',
      name: 'Project Summary - Green Hydrogen Initiative',
      type: 'Project Summary',
      region: 'Metro City',
      dateGenerated: '2024-07-26'
    },
    {
      id: '2',
      name: 'Regional Overview - Renewable Energy Integration',
      type: 'Regional Overview',
      region: 'Coastal Region',
      dateGenerated: '2024-07-20'
    },
    {
      id: '3',
      name: 'Investment Report - Hydrogen Infrastructure',
      type: 'Investment Report',
      region: 'National',
      dateGenerated: '2024-07-15'
    }
  ];

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      // In a real app, this would trigger the report generation API
      alert(`Generating ${selectedReportType} for ${selectedRegion} (${selectedTimePeriod})`);
    }, 2000);
  };

  const handleExportAll = () => {
    // In a real app, this would export all reports
    alert('Exporting all reports...');
  };

  const handleDownload = (reportId: string) => {
    // In a real app, this would download the specific report
    alert(`Downloading report ${reportId}...`);
  };

  const handleView = (reportId: string) => {
    // In a real app, this would open the report viewer
    alert(`Viewing report ${reportId}...`);
  };

  const handleDelete = (reportId: string) => {
    // In a real app, this would delete the report
    if (confirm('Are you sure you want to delete this report?')) {
      alert(`Deleting report ${reportId}...`);
    }
  };

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
                <h1 className="text-xl font-semibold text-white">HydroNet</h1>
              </Link>
              
              {/* Navigation Menu */}
              <nav className="hidden md:flex items-center space-x-6">
                <Link href="/dashboard">
                  <button className="text-gray-300 hover:text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Dashboard
                  </button>
                </Link>
                <Link href="/analysis">
                  <button className="text-gray-300 hover:text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Analysis
                  </button>
                </Link>
                <button className="text-white bg-gray-700 px-4 py-2 rounded-lg font-medium">
                  Reports
                </button>
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
        {/* Left Sidebar - Report Parameters */}
        <div className="w-80 bg-gray-800 border-r border-gray-700">
          <div className="p-6 space-y-6">
            <h2 className="text-lg font-semibold text-white">Report Parameters</h2>
            
            {/* Report Type */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300">Report Type</label>
              <select 
                value={selectedReportType}
                onChange={(e) => setSelectedReportType(e.target.value)}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option>Project Summary</option>
                <option>Regional Overview</option>
                <option>Investment Report</option>
                <option>Environmental Impact</option>
                <option>Infrastructure Analysis</option>
                <option>Performance Metrics</option>
              </select>
            </div>

            {/* Region */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300">Region</label>
              <select 
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option>Metro City</option>
                <option>Coastal Region</option>
                <option>National</option>
                <option>North India</option>
                <option>South India</option>
                <option>West India</option>
                <option>East India</option>
                <option>Northeast India</option>
              </select>
            </div>

            {/* Time Period */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-300">Time Period</label>
              <select 
                value={selectedTimePeriod}
                onChange={(e) => setSelectedTimePeriod(e.target.value)}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
                <option>Last 6 Months</option>
                <option>Last 12 Months</option>
                <option>Year to Date</option>
                <option>Custom Range</option>
              </select>
            </div>

            {/* Generate Report Button */}
            <Button 
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-all duration-200 disabled:opacity-50"
            >
              {isGenerating ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating Report</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Generate Report</span>
                </div>
              )}
            </Button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 bg-gray-900 overflow-y-auto">
          <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Reports</h1>
                <p className="text-gray-300">Generate and view comprehensive reports based on your infrastructure mapping and optimization data.</p>
              </div>
            </div>

            {/* Generated Reports Section */}
            <Card className="bg-gray-800 border border-gray-700 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-white">Generated Reports</CardTitle>
                  <Button 
                    onClick={handleExportAll}
                    variant="outline"
                    className="flex items-center space-x-2 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Export All</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 py-3 px-4 bg-gray-700 rounded-lg text-sm font-medium text-gray-300 mb-2">
                  <div className="col-span-4">Report Name</div>
                  <div className="col-span-2">Type</div>
                  <div className="col-span-2">Region</div>
                  <div className="col-span-2">Date Generated</div>
                  <div className="col-span-2">Actions</div>
                </div>

                {/* Table Rows */}
                <div className="space-y-2">
                  {reports.map((report) => (
                    <div key={report.id} className="grid grid-cols-12 gap-4 py-3 px-4 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors">
                      <div className="col-span-4">
                        <p className="font-medium text-white">{report.name}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-900 text-green-200">
                          {report.type}
                        </span>
                      </div>
                      <div className="col-span-2">
                        <p className="text-gray-300">{report.region}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-gray-300">{report.dateGenerated}</p>
                      </div>
                      <div className="col-span-2">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => handleView(report.id)}
                            className="p-1 text-green-400 hover:bg-gray-600 rounded transition-colors"
                            title="View"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => handleDownload(report.id)}
                            className="p-1 text-blue-400 hover:bg-gray-600 rounded transition-colors"
                            title="Download"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => handleDelete(report.id)}
                            className="p-1 text-red-400 hover:bg-gray-600 rounded transition-colors"
                            title="Delete"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Empty State */}
                {reports.length === 0 && (
                  <div className="text-center py-12">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No reports generated yet</h3>
                    <p className="text-gray-500">Create your first report using the parameters in the sidebar.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
