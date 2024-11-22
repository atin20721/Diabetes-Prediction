import React from 'react';
import { User, MapPin, Phone } from 'lucide-react';

interface ContactInfoProps {
  formData: {
    name: string;
    address: string;
    mobile: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const ContactInfo = ({ formData, onChange }: ContactInfoProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <User className="w-5 h-5 text-blue-600" />
        Personal Information
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              className="w-full p-2 pl-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
              required
            />
            <User className="w-4 h-4 text-gray-400 absolute left-2 top-3" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
          <div className="relative">
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={onChange}
              className="w-full p-2 pl-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your WhatsApp number"
              pattern="[0-9]{10}"
              title="Please enter a valid 10-digit mobile number"
              required
            />
            <Phone className="w-4 h-4 text-gray-400 absolute left-2 top-3" />
          </div>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <div className="relative">
            <textarea
              name="address"
              value={formData.address}
              onChange={onChange}
              className="w-full p-2 pl-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full address"
              rows={3}
              required
            />
            <MapPin className="w-4 h-4 text-gray-400 absolute left-2 top-3" />
          </div>
        </div>
      </div>
    </div>
  );
};