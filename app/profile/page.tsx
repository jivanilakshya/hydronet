'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Providers from '@/components/providers';

function ProfileComponent() {
  const router = useRouter();

  const { data: user, isError, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await fetch('/api/auth/me');
      if (!response.ok) {
        throw new Error('Not authenticated');
      }
      return response.json();
    },
    retry: false,
  });

  useEffect(() => {
    if (isError) {
      router.push('/auth/login');
    }
  }, [isError, router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (isError) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <h1 className="text-2xl font-bold text-green-600">HydroNet</h1>
          </Link>
          <span className="text-gray-400">|</span>
          <h2 className="text-lg font-medium text-gray-700">Profile</h2>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="outline">Dashboard</Button>
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Name</label>
                <p className="text-lg">{user?.user?.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <p className="text-lg">{user?.user?.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Member Since</label>
                <p className="text-lg">
                  {user?.user?.createdAt ? new Date(user.user.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Last Login</label>
                <p className="text-lg">
                  {user?.user?.lastLoginAt ? new Date(user.user.lastLoginAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Quick Links</h3>
                <div className="space-y-2">
                  <Link href="/dashboard" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      Go to Dashboard
                    </Button>
                  </Link>
                  <Link href="/projects" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      View Projects
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2 text-red-600">Danger Zone</h3>
                <Button 
                  variant="destructive" 
                  onClick={handleLogout}
                  className="w-full"
                >
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Usage Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">12</div>
                <div className="text-sm text-gray-600">Projects Created</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">45</div>
                <div className="text-sm text-gray-600">Sites Analyzed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">8</div>
                <div className="text-sm text-gray-600">Optimizations Run</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Providers>
      <ProfileComponent />
    </Providers>
  );
}
