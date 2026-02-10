import { Heart, Bed, Bath, Square } from 'lucide-react';
import type { Property } from '../lib/database.types';

interface PropertyCardProps {
  property: Property;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export function PropertyCard({ property, isSaved, onToggleSave }: PropertyCardProps) {
  const formatPrice = (price: number, period: string | null) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);

    return period === 'month' ? `${formatted}/mo` : formatted;
  };

  const image = property.images && property.images.length > 0 ? property.images[0] : 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg';

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative">
        <img
          src={image}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        {property.featured && (
          <span className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Featured
          </span>
        )}
        <button
          onClick={() => onToggleSave(property.id)}
          className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          <Heart
            className={`w-5 h-5 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </button>
        {property.listing_type && (
          <span className="absolute bottom-3 left-3 bg-blue-900 text-white px-3 py-1 rounded-lg text-xs font-semibold capitalize">
            {property.property_type}
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="mb-2">
          <p className="text-2xl font-bold text-blue-900">
            {formatPrice(property.price, property.price_period)}
          </p>
        </div>

        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
          {property.title}
        </h3>

        <p className="text-sm text-gray-600 mb-3">
          {property.address}, {property.city}, {property.state}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="w-4 h-4" />
            <span>{property.square_feet} sqft</span>
          </div>
        </div>

        {property.rating > 0 && (
          <div className="mt-3 flex items-center gap-1 text-sm">
            <span className="text-yellow-500">★</span>
            <span className="font-semibold">{property.rating}</span>
            <span className="text-gray-600">({property.review_count} reviews)</span>
          </div>
        )}
      </div>
    </div>
  );
}
