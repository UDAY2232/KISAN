import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ShoppingBag, DollarSign, Award } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function ProfileStats() {
  const { state } = useAuth();

  if (!state.user) return null;

  const { stats } = state.user;

  const statItems = [
    {
      label: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900',
    },
    {
      label: 'Total Sales',
      value: stats.totalSales,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900',
    },
    {
      label: 'Total Spent',
      value: `$${stats.totalSpent.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-red-600',
      bgColor: 'bg-red-100 dark:bg-red-900',
    },
    {
      label: 'Total Earned',
      value: `$${stats.totalEarned.toLocaleString()}`,
      icon: Award,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
    >
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Activity Overview
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index }}
            className="text-center"
          >
            <div className={`w-16 h-16 ${item.bgColor} rounded-full flex items-center justify-center mx-auto mb-3`}>
              <item.icon className={`h-8 w-8 ${item.color}`} />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {item.value}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {item.label}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Member since: {new Date(stats.joinDate).toLocaleDateString()}</span>
          <span>Last active: {new Date(stats.lastActivity).toLocaleDateString()}</span>
        </div>
      </div>
    </motion.div>
  );
}