import { User, Bell, Shield, CreditCard, HelpCircle, Settings, LogOut, ChevronRight } from 'lucide-react';

interface ProfileViewProps {
  user: any;
  stats: {
    saved: number;
    viewed: number;
    inquiries: number;
  };
  onSignOut: () => void;
}

export function ProfileView({ user, stats, onSignOut }: ProfileViewProps) {
  const menuItems = [
    { icon: User, label: 'Personal Information', subtitle: 'Update your details' },
    { icon: Bell, label: 'Notifications', subtitle: 'Manage your alerts' },
    { icon: Shield, label: 'Privacy & Security', subtitle: 'Password and verification' },
    { icon: CreditCard, label: 'Payment Methods', subtitle: 'Add or update payments' },
    { icon: HelpCircle, label: 'Help & Support', subtitle: 'Get assistance' },
    { icon: Settings, label: 'Settings', subtitle: 'App preferences' },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Sign in to view profile</h2>
          <p className="text-gray-600">Create an account to access your profile and saved properties</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white px-4 pt-6 pb-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-900 to-blue-600 rounded-full flex items-center justify-center mb-4">
            <span className="text-3xl font-bold text-white">
              {user.email?.[0]?.toUpperCase() || 'U'}
            </span>
          </div>
          <h2 className="text-xl font-bold text-gray-900">John Doe</h2>
          <p className="text-gray-600">{user.email}</p>
          <button className="mt-3 px-6 py-2 bg-blue-900 text-white rounded-full font-semibold hover:bg-blue-800 transition-colors">
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <p className="text-2xl font-bold text-blue-900">{stats.saved}</p>
            <p className="text-sm text-gray-600">Saved</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <p className="text-2xl font-bold text-blue-900">{stats.viewed}</p>
            <p className="text-sm text-gray-600">Viewed</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-xl">
            <p className="text-2xl font-bold text-blue-900">{stats.inquiries}</p>
            <p className="text-sm text-gray-600">Inquiries</p>
          </div>
        </div>
      </div>

      <div className="px-4 mt-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-2">
          Account
        </h3>
        <div className="bg-white rounded-2xl overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={`w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors ${
                  index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                  <Icon className="w-5 h-5 text-blue-900" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-gray-900">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.subtitle}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-4 mt-4">
        <button
          onClick={onSignOut}
          className="w-full bg-white rounded-2xl p-4 flex items-center justify-center gap-2 text-red-600 font-semibold hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}
