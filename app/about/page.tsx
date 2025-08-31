'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
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
                <Link href="/reports">
                  <button className="text-gray-300 hover:text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Reports
                  </button>
                </Link>
                <button className="text-white bg-gray-700 px-4 py-2 rounded-lg font-medium">
                  About
                </button>
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

      <div className="p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">About HydroNet</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Advanced Green Hydrogen Infrastructure Mapping & Analytics Platform
            </p>
          </div>

          {/* Hero Section */}
          <Card className="bg-gray-800 border-gray-700 shadow-xl">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">🌱</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Empowering Sustainable Energy</h3>
                  <p className="text-gray-300 leading-relaxed">
                    HydroNet is a comprehensive platform designed to revolutionize how we plan, analyze, 
                    and optimize green hydrogen infrastructure. Our advanced mapping and analytics tools 
                    help organizations make data-driven decisions for a sustainable energy future.
                  </p>
                  <div className="flex space-x-4">
                    <Button asChild className="bg-green-500 hover:bg-green-600">
                      <Link href="/dashboard">Explore Platform</Link>
                    </Button>
                    <Button variant="outline" asChild className="border-gray-600 text-gray-300 hover:bg-gray-700">
                      <Link href="/analysis">View Analytics</Link>
                    </Button>
                  </div>
                </div>
                <div className="bg-gray-700 rounded-lg p-6 h-64 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="text-6xl">🗺️</div>
                    <h4 className="text-xl font-semibold text-white">Interactive Mapping</h4>
                    <p className="text-gray-400">Visualize hydrogen infrastructure across regions</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Section */}
          <Card className="bg-gray-800 border-gray-700 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white text-center">Meet Our Team</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-3xl">∞</span>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">Infinite Looper</h3>
                  <p className="text-green-400 text-lg font-semibold mb-4">Development Team</p>
                  <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
                    We are <strong className="text-white">Infinite Looper</strong>, a passionate team of developers 
                    and engineers dedicated to creating innovative solutions for sustainable energy. Our mission is 
                    to build cutting-edge technology that accelerates the transition to green hydrogen infrastructure 
                    and helps create a more sustainable future for all.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-gray-700 p-6 rounded-lg">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Full-Stack Development</h4>
                    <p className="text-gray-400 text-sm">Next.js, React, TypeScript, Node.js</p>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded-lg">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Data Analytics</h4>
                    <p className="text-gray-400 text-sm">Advanced visualization and insights</p>
                  </div>
                  
                  <div className="bg-gray-700 p-6 rounded-lg">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">GIS Mapping</h4>
                    <p className="text-gray-400 text-sm">Interactive maps and geospatial analysis</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gray-800 border-gray-700 shadow-xl">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <CardTitle className="text-white">Interactive Mapping</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Advanced GIS mapping with real-time data visualization for hydrogen infrastructure planning.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 shadow-xl">
              <CardHeader>
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <CardTitle className="text-white">Optimization Engine</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  AI-powered algorithms for optimal site selection and cost-effective infrastructure deployment.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 shadow-xl">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <CardTitle className="text-white">Analytics Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Comprehensive data analytics with advanced charts and reporting capabilities.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Technology Stack */}
          <Card className="bg-gray-800 border-gray-700 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white text-center">Technology Stack</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center mx-auto">
                    <span className="text-white font-bold text-lg">⚡</span>
                  </div>
                  <h4 className="text-white font-semibold">Next.js 15</h4>
                  <p className="text-gray-400 text-sm">React framework with App Router</p>
                </div>
                
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto">
                    <span className="text-white font-bold text-lg">TS</span>
                  </div>
                  <h4 className="text-white font-semibold">TypeScript</h4>
                  <p className="text-gray-400 text-sm">Type-safe development</p>
                </div>
                
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-cyan-500 rounded-lg flex items-center justify-center mx-auto">
                    <span className="text-white font-bold text-lg">🎨</span>
                  </div>
                  <h4 className="text-white font-semibold">Tailwind CSS</h4>
                  <p className="text-gray-400 text-sm">Utility-first styling</p>
                </div>
                
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center mx-auto">
                    <span className="text-white font-bold text-lg">🗺️</span>
                  </div>
                  <h4 className="text-white font-semibold">Leaflet.js</h4>
                  <p className="text-gray-400 text-sm">Interactive mapping</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="bg-gray-800 border-gray-700 shadow-xl">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Transform Energy Planning?</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Join the revolution in sustainable energy infrastructure. Explore our platform and discover 
                how HydroNet can help optimize your green hydrogen projects.
              </p>
              <div className="flex justify-center space-x-4">
                <Button asChild className="bg-green-500 hover:bg-green-600">
                  <Link href="/dashboard">Get Started</Link>
                </Button>
                <Button variant="outline" asChild className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  <Link href="/analysis">View Demo</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
