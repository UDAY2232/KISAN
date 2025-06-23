import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Mail, Smartphone, MessageSquare, TrendingUp, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function NotificationSettings() {
  const { state, updateUser } = useAuth();

  if (!state.user) return null;

  const { notifications } = state.user.preferences;

  const updateNotificationSetting = (key: keyof typeof notifications, value: boolean) => {
    updateUser({
      preferences: {
        ...state.user!.preferences,
        notifications: {
          ...notifications,
          [key]: value,
        },
      },
    });
  };

  const notificationTypes = [
    {
      key: 'email' as const,
      label: 'Email Notifications',
      description: 'Receive notifications via email',
      icon: Mail,
    },
    {
      key: 'push' as const,
      label: 'Push Notifications',
      description: 'Receive browser push notifications',
      icon: Bell,
    },
    {
      key: 'sms' as const,
      label: 'SMS Notifications',
      description: 'Receive notifications via text message',
      icon: Smartphone,
    },
  ];

  const notificationCategories = [
    {
      key: 'orderUpdates' as const,
      label: 'Order Updates',
      description: 'Notifications about your orders and deliveries',
      icon: TrendingUp,
    },
    {
      key: 'priceAlerts' as const,
      label: 'Price Alerts',
      description: 'Alerts when prices change for items you\'re watching',
      icon: AlertCircle,
    },
    {
      key: 'marketing' as const,
      label: 'Marketing Communications',
      description: 'Promotional offers and product recommendations',
      icon: MessageSquare,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
    >
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Notification Preferences
      </h2>

      <div className="space-y-8">
        {/* Notification Methods */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Notification Methods
          </h3>
          <div className="space-y-4">
            {notificationTypes.map((type) => (
              <div key={type.key} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="flex items-center">
                  <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg mr-3">
                    <type.icon className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {type.label}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {type.description}
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications[type.key]}
                    onChange={(e) => updateNotificationSetting(type.key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Categories */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            What You'll Receive
          </h3>
          <div className="space-y-4">
            {notificationCategories.map((category) => (
              <div key={category.key} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="flex items-center">
                  <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-3">
                    <category.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {category.label}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {category.description}
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications[category.key]}
                    onChange={(e) => updateNotificationSetting(category.key, e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Quiet Hours */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Quiet Hours
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Set times when you don't want to receive notifications
          </p>
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                From
              </label>
              <input
                type="time"
                defaultValue="22:00"
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                To
              </label>
              <input
                type="time"
                defaultValue="08:00"
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <div className="pt-6">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}