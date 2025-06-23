import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Wheat, Heart, TrendingUp, Users, Award } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: ShoppingBag,
      title: 'Buy Agricultural Supplies',
      description: 'Access quality fertilizers, pesticides, seeds, and farming equipment from trusted suppliers.',
      link: '/supplies',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Wheat,
      title: 'Sell Your Crops',
      description: 'Connect directly with buyers and get the best prices for your fresh produce.',
      link: '/crops',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: Heart,
      title: 'Disease Management',
      description: 'Expert solutions and treatments for common crop diseases and plant health issues.',
      link: '/diseases',
      color: 'bg-red-100 text-red-600',
    },
  ];

  const stats = [
    { label: 'Active Farmers', value: '10,000+', icon: Users },
    { label: 'Products Sold', value: '50,000+', icon: TrendingUp },
    { label: 'Success Rate', value: '98%', icon: Award },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-800 to-green-600 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Empowering Farmers with
              <span className="block text-green-200">Digital Solutions</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Your one-stop platform for agricultural supplies, crop sales, and expert farming guidance.
              Join thousands of farmers growing their success with FarmHub.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/supplies"
                className="bg-white text-green-800 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                Shop Supplies
              </Link>
              <Link
                to="/crops"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-800 transition-colors"
              >
                Sell Crops
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From purchasing quality supplies to selling your harvest, we provide comprehensive solutions for modern farming.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow group"
              >
                <div className={`w-16 h-16 ${feature.color} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Farmers Nationwide
            </h2>
            <p className="text-xl text-gray-600">
              Join our growing community of successful farmers
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Farming Business?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get started today and experience the power of digital agriculture solutions.
          </p>
          <Link
            to="/supplies"
            className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors inline-block"
          >
            Start Shopping Now
          </Link>
        </div>
      </section>
    </div>
  );
}