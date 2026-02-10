import { MapPin, Navigation } from 'lucide-react';

export function MapView() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="relative h-screen">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-gray-200 flex items-center justify-center">
          <div className="text-center px-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <MapPin className="w-10 h-10 text-blue-900" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Interactive Map View</h2>
            <p className="text-gray-600 max-w-md">
              Explore properties on an interactive map with live location data and neighborhood insights
            </p>
            <div className="mt-6 flex gap-2 justify-center">
              <div className="bg-white px-4 py-2 rounded-full shadow-sm flex items-center gap-2">
                <Navigation className="w-4 h-4 text-blue-900" />
                <span className="text-sm font-medium text-gray-700">Use my location</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
