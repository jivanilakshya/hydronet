import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Simple Navigation */}
      <nav className="bg-transparent absolute top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🌱</span>
              </div>
              <h1 className="text-lg font-bold text-white">HydroNet</h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/dashboard" className="text-white hover:text-gray-200 font-medium transition-colors">
                Dashboard
              </Link>
              <Link href="/about" className="text-white hover:text-gray-200 font-medium transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-white hover:text-gray-200 font-medium transition-colors">
                Contact
              </Link>
              <Link href="/auth/login" className="text-white hover:text-gray-200 font-medium transition-colors">
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-cover bg-center bg-no-repeat min-h-screen" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80")'
      }}>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        
        {/* Content */}
        <div className="relative flex items-center justify-center min-h-screen">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Mapping a Sustainable Future with Green Hydrogen
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-4xl mx-auto leading-relaxed opacity-90">
              Explore the potential of green hydrogen infrastructure in urban environments. 
              Our platform provides advanced mapping and optimization tools for urban 
              planners and policy makers.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button 
                size="lg" 
                className="px-8 py-4 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white border-none"
                asChild
              >
                <Link href="/auth/signup">Get Started</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-4 text-lg font-semibold border-2 border-white text-white bg-transparent hover:bg-white hover:text-gray-800"
                asChild
              >
                <Link href="/dashboard">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Our Features
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Everything you need for Green Hydrogen Infrastructure Planning
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A comprehensive suite of tools to analyze, visualize and optimize your green hydrogen projects.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">
                Interactive GIS Mapping
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Visualize hydrogen infrastructure layers, including distribution 
                and demand centers on a dynamic map.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">
                Optimization Algorithms
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Run leverage simulations to find the most cost-
                effective and efficient infrastructure 
                configurations.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">
                Data-driven Insights
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Access comprehensive data and analytics to 
                support your strategic decision-making.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🌱</span>
                </div>
                <h3 className="text-xl font-bold">HydroNet</h3>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                © 2025 HydroNet. All rights reserved.
              </p>
            </div>
            
            <div>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/auth/login" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            
            <div>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><span className="hover:text-white transition-colors">Privacy Policy</span></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
