import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import { BottomNav } from './components/BottomNav';
import { SearchView } from './components/SearchView';
import { SavedView } from './components/SavedView';
import { ProfileView } from './components/ProfileView';
import { MapView } from './components/MapView';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState<any>(null);
  const [savedPropertyIds, setSavedPropertyIds] = useState<Set<string>>(new Set());
  const [stats, setStats] = useState({ saved: 0, viewed: 0, inquiries: 0 });

  useEffect(() => {
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        (() => {
          setUser(session?.user ?? null);
          if (session?.user) {
            fetchUserData(session.user.id);
          } else {
            setSavedPropertyIds(new Set());
            setStats({ saved: 0, viewed: 0, inquiries: 0 });
          }
        })();
      }
    );



    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user ?? null);
    if (session?.user) {
      fetchUserData(session.user.id);
    }
  };

  const fetchUserData = async (userId: string) => {
    try {
      const [savedResult, viewedResult, inquiriesResult] = await Promise.all([
        supabase.from('saved_properties').select('property_id').eq('user_id', userId),
        supabase.from('viewed_properties').select('id').eq('user_id', userId),
        supabase.from('inquiries').select('id').eq('user_id', userId),
      ]);

      const savedIds = new Set(savedResult.data?.map(sp => sp.property_id) || []);
      setSavedPropertyIds(savedIds);

      setStats({
        saved: savedResult.data?.length || 0,
        viewed: viewedResult.data?.length || 0,
        inquiries: inquiriesResult.data?.length || 0,
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleToggleSave = async (propertyId: string) => {
    if (!user) {
      alert('Please sign in to save properties');
      return;
    }

    const isSaved = savedPropertyIds.has(propertyId);

    try {
      if (isSaved) {
        await supabase
          .from('saved_properties')
          .delete()
          .eq('user_id', user.id)
          .eq('property_id', propertyId);

        setSavedPropertyIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(propertyId);
          return newSet;
        });

        setStats(prev => ({ ...prev, saved: prev.saved - 1 }));
      } else {
        await supabase
          .from('saved_properties')
          .insert({ user_id: user.id, property_id: propertyId });

        setSavedPropertyIds(prev => new Set([...prev, propertyId]));
        setStats(prev => ({ ...prev, saved: prev.saved + 1 }));
      }
    } catch (error) {
      console.error('Error toggling save:', error);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSavedPropertyIds(new Set());
    setStats({ saved: 0, viewed: 0, inquiries: 0 });
    setActiveTab('home');
  };

  const renderView = () => {
    switch (activeTab) {
      case 'home':
      case 'search':
        return (
          <SearchView
            savedPropertyIds={savedPropertyIds}
            onToggleSave={handleToggleSave}
          />
        );
      case 'map':
        return <MapView />;
      case 'saved':
        return (
          <SavedView
            savedPropertyIds={savedPropertyIds}
            onToggleSave={handleToggleSave}
            userId={user?.id || null}
          />
        );
      case 'profile':
        return (
          <ProfileView
            user={user}
            stats={stats}
            onSignOut={handleSignOut}
          />
        );
      default:
        return (
          <SearchView
            savedPropertyIds={savedPropertyIds}
            onToggleSave={handleToggleSave}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderView()}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default App;
