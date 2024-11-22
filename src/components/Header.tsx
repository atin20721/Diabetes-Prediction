import React from 'react';
import { Activity, Heart } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-8 h-8 text-red-400" />
            <h1 className="text-2xl font-bold">Diabetes Prediction</h1>
          </div>
          <Activity className="w-6 h-6" />
        </div>
        <p className="mt-4 max-w-xl">
          Advanced diabetes risk assessment using medical parameters and lifestyle factors
        </p>
      </div>
    </header>
  );
}