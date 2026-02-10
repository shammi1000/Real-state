import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { PropertyCard } from './PropertyCard';
import type { Property } from '../lib/database.types';

interface SavedViewProps {
  savedPropertyIds: Set<string>;
  onToggleSave: (id: string) => void;
  userId: string | null;
}

export function SavedView({ savedPropertyIds, onToggleSave, userId }: SavedViewProps) {
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchSavedProperties();
    }
  }, [userId, savedPropertyIds]);

  const fetchSavedProperties = async () => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('saved_properties')
        .select('property_id')
        .eq('user_id', userId);

      if (error) throw error;

      const propertyIds = data?.map(sp => sp.property_id) || [];

      if (propertyIds.length === 0) {
        setSavedProperties([]);
        return;
      }

      const { data: properties, error: propsError } = await supabase
        .from('properties')
        .select('*')
        .in('id', propertyIds);

      if (propsError) throw propsError;

      setSavedProperties(properties || []);
    } catch (error) {
      console.error('Error fetching saved properties:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!userId) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Sign in to save properties</h2>
          <p className="text-gray-600">Create an account to save your favorite properties</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white px-4 pt-6 pb-4 mb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Properties</h1>
        <p className="text-gray-600">{savedProperties.length} properties saved</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : savedProperties.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Heart className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">No saved properties yet</h2>
          <p className="text-gray-600 text-center">
            Start exploring and save properties you love by tapping the heart icon
          </p>
        </div>
      ) : (
        <div className="px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isSaved={savedPropertyIds.has(property.id)}
                onToggleSave={onToggleSave}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
