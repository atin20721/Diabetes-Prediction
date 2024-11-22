import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { ContactInfo } from './ContactInfo';

interface FormData {
  name: string;
  address: string;
  mobile: string;
  age: string;
  glucose: string;
  bloodPressure: string;
  insulin: string;
  bmi: string;
  diabetesPedigree: string;
  pregnancies: string;
  skinThickness: string;
}

export const PredictionForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    address: '',
    mobile: '',
    age: '',
    glucose: '',
    bloodPressure: '',
    insulin: '',
    bmi: '',
    diabetesPedigree: '',
    pregnancies: '',
    skinThickness: '',
  });

  const [prediction, setPrediction] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          age: parseInt(formData.age),
          glucose: parseFloat(formData.glucose),
          bloodPressure: parseFloat(formData.bloodPressure),
          insulin: parseFloat(formData.insulin),
          bmi: parseFloat(formData.bmi),
          diabetesPedigree: parseFloat(formData.diabetesPedigree),
          pregnancies: parseInt(formData.pregnancies),
          skinThickness: parseFloat(formData.skinThickness),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit data');
      }

      const result = await response.json();
      setPrediction(result.riskLevel);
      
      // Fetch patient history
      const historyResponse = await fetch(`/api/patients/${formData.mobile}`);
      const historyData = await historyResponse.json();
      console.log('Patient history:', historyData.patients);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <ContactInfo 
          formData={{
            name: formData.name,
            address: formData.address,
            mobile: formData.mobile,
          }}
          onChange={handleChange}
        />

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Medical Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter age"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Glucose Level</label>
              <input
                type="number"
                name="glucose"
                value={formData.glucose}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="mg/dL"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Blood Pressure</label>
              <input
                type="number"
                name="bloodPressure"
                value={formData.bloodPressure}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="mm Hg"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Insulin Level</label>
              <input
                type="number"
                name="insulin"
                value={formData.insulin}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="mu U/ml"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">BMI</label>
              <input
                type="number"
                name="bmi"
                value={formData.bmi}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="kg/m²"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Diabetes Pedigree</label>
              <input
                type="number"
                name="diabetesPedigree"
                value={formData.diabetesPedigree}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Function value"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Pregnancies</label>
              <input
                type="number"
                name="pregnancies"
                value={formData.pregnancies}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Number"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Skin Thickness</label>
              <input
                type="number"
                name="skinThickness"
                value={formData.skinThickness}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="mm"
                required
              />
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center gap-2 ${
                isSubmitting ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
              } text-white px-6 py-3 rounded-md transition-colors`}
            >
              <Calculator className="w-5 h-5" />
              {isSubmitting ? 'Processing...' : 'Calculate Risk'}
            </button>
          </div>
        </div>
      </form>

      {error && (
        <div className="mt-8 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {prediction && (
        <div className={`mt-8 p-6 rounded-lg ${
          prediction === 'High' ? 'bg-red-100' : 'bg-green-100'
        }`}>
          <h3 className="text-xl font-semibold mb-2">Prediction Result for {formData.name}</h3>
          <p className={`text-lg ${
            prediction === 'High' ? 'text-red-700' : 'text-green-700'
          }`}>
            Risk Level: <span className="font-bold">{prediction}</span>
          </p>
          <p className="mt-2 text-gray-600">
            {prediction === 'High' 
              ? 'Please consult with a healthcare professional for proper medical advice.'
              : 'Continue maintaining a healthy lifestyle and regular check-ups.'}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            A detailed report will be sent to your WhatsApp number: {formData.mobile}
          </p>
        </div>
      )}
    </div>
  );
};