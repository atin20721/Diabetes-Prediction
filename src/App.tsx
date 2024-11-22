import React from 'react';
import { Header } from './components/Header';
import { PredictionForm } from './components/PredictionForm';
import { InfoSection } from './components/InfoSection';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Diabetes Risk Assessment
            </h2>
            <p className="text-gray-600 mb-6">
              Enter your health metrics below to assess your diabetes risk. This tool uses
              multiple factors to provide a preliminary risk assessment.
            </p>
            <PredictionForm />
          </div>
        </div>
      </main>
      <InfoSection />
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            Disclaimer: This tool provides an estimated risk assessment and should not be
            used as a substitute for professional medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;