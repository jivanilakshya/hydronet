import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-green-600">HydroNet</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Green Hydrogen Infrastructure
            <span className="text-green-600 block">Mapping & Optimization</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Advanced platform for mapping, analyzing, and optimizing green hydrogen infrastructure.
            Visualize assets, analyze supply chains, and identify optimal site locations.
          </p>
          <div className="flex justify-center space-x-4 ">
            <Link href="/auth/signup">
              <Button size="lg" className="px-8 text-gray-600">
                Start Exploring
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="px-8">
                View Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  🗺️
                </div>
                <span>Interactive Mapping</span>
              </CardTitle>
              <CardDescription>
                Visualize hydrogen plants, storage facilities, renewables, and demand centers on an interactive map
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  📊
                </div>
                <span>Data Analytics</span>
              </CardTitle>
              <CardDescription>
                Advanced charts and visualizations for supply-demand analysis, capacity planning, and cost optimization
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  🎯
                </div>
                <span>Site Optimization</span>
              </CardTitle>
              <CardDescription>
                AI-powered recommendations for optimal site selection based on multiple criteria and constraints
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Quick Preview */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Platform Preview
          </h2>
          <div className="bg-white rounded-xl shadow-xl p-8">
            <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <h3 className="text-xl font-semibold text-gray-700">Interactive Infrastructure Map</h3>
                <p className="text-gray-500 mt-2">Sign up to access the full mapping interface</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500">
            <p>&copy; 2024 HydroNet. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
