import React from 'react';
import { Info, AlertTriangle, Heart, Activity } from 'lucide-react';

export const InfoSection = () => {
  const factors = [
    {
      icon: <Heart className="w-6 h-6 text-red-500" />,
      title: 'Risk Factors',
      description: 'Family history, obesity, physical inactivity, and age are key factors.',
    },
    {
      icon: <Activity className="w-6 h-6 text-blue-500" />,
      title: 'Prevention',
      description: 'Regular exercise, healthy diet, and maintaining optimal weight can help prevent diabetes.',
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
      title: 'Early Detection',
      description: 'Regular screening and monitoring of blood glucose levels is crucial.',
    },
  ];

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 justify-center mb-8">
          <Info className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-800">Important Information</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {factors.map((factor, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                {factor.icon}
                <h3 className="text-xl font-semibold text-gray-800">{factor.title}</h3>
              </div>
              <p className="text-gray-600">{factor.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}