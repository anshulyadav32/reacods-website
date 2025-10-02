"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { Globe, Plus, BarChart3, Users, Shield, Zap } from "lucide-react"

export default function Home() {
  const { data: session, status } = useSession()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Manage All Your Websites
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              A comprehensive platform to track, manage, and monitor all your websites in one place
            </p>
            {session && status === "authenticated" ? (
              <div className="space-x-4">
                <Link
                  href="/dashboard"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-block"
                >
                  Go to Dashboard
                </Link>
                <Link
                  href="/table"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors inline-block"
                >
                  View Websites
                </Link>
              </div>
            ) : (
              <div className="space-x-4">
                <Link
                  href="/auth/signin"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-block"
                >
                  Get Started
                </Link>
                <Link
                  href="/table"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors inline-block"
                >
                  View Public Websites
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Manage Websites
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features to help you organize, monitor, and grow your web presence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Globe className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Website Management
              </h3>
              <p className="text-gray-600">
                Add, edit, and organize all your websites with detailed information including domains, descriptions, and status tracking.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Analytics Dashboard
              </h3>
              <p className="text-gray-600">
                Get insights into your website portfolio with comprehensive analytics and performance metrics.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Team Collaboration
              </h3>
              <p className="text-gray-600">
                Share website management with your team and collaborate on projects with role-based access control.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Secure Authentication
              </h3>
              <p className="text-gray-600">
                Sign in securely with Google or GitHub OAuth. Your data is protected with enterprise-grade security.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Fast & Reliable
              </h3>
              <p className="text-gray-600">
                Built with Next.js and Neon database for lightning-fast performance and 99.9% uptime reliability.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <Plus className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Easy Integration
              </h3>
              <p className="text-gray-600">
                Seamlessly integrate with your existing workflow. Import websites from various sources and export data when needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Domain Details Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Domain: dev0-1.com
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A powerful development platform for modern web applications
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Domain Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Domain:</span>
                    <span className="text-blue-600 font-mono">dev0-1.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Status:</span>
                    <span className="text-green-600 font-semibold">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Type:</span>
                    <span className="text-gray-600">Development Platform</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">SSL:</span>
                    <span className="text-green-600 font-semibold">Enabled</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Modern React/Next.js development environment
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Real-time collaboration tools
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Integrated testing and deployment pipeline
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Advanced debugging and monitoring
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Performance Metrics</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Uptime</span>
                    <span className="text-green-600 font-semibold">99.9%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '99.9%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Response Time</span>
                    <span className="text-blue-600 font-semibold">120ms</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700">Security Score</span>
                    <span className="text-green-600 font-semibold">A+</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '95%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust AllWebsite to manage their web presence
          </p>
          {(!session || status !== "authenticated") && (
            <div className="space-x-4">
              <Link
                href="/auth/signin"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors inline-block"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-semibold text-lg transition-colors inline-block"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}