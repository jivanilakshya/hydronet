import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <h1 className="text-2xl font-bold text-green-600">HydroNet</h1>
          </Link>
          <span className="text-gray-400">|</span>
          <h2 className="text-lg font-medium text-gray-700">Projects</h2>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="outline">Dashboard</Button>
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Saved Projects</h1>
          <p className="text-gray-600 mt-2">Manage your site selection recommendations and analysis projects</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Northeast Corridor Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Comprehensive site analysis for the Northeast corridor including 15 potential locations
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Created: Jan 15, 2024</span>
                <Button size="sm" variant="outline">View Details</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>West Coast Optimization</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Multi-criteria optimization for hydrogen infrastructure on the west coast
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Created: Dec 28, 2023</span>
                <Button size="sm" variant="outline">View Details</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-dashed border-2 border-gray-300">
            <CardContent className="flex flex-col items-center justify-center h-full py-12">
              <div className="text-4xl text-gray-300 mb-4">+</div>
              <h3 className="font-medium text-gray-700 mb-2">Create New Project</h3>
              <p className="text-sm text-gray-500 text-center mb-4">
                Start a new site analysis or optimization project
              </p>
              <Link href="/dashboard">
                <Button>Get Started</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
