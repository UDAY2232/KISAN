import React from 'react';
import { motion } from 'framer-motion';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileStats from '../components/profile/ProfileStats';
import ProfileSettings from '../components/profile/ProfileSettings';

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          <ProfileHeader />
          <ProfileStats />
          <ProfileSettings />
        </motion.div>
      </div>
    </div>
  );
}