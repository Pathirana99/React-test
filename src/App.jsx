import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CategoryGrid from './components/CategoryGrid';
import NearbyShopsSection from './components/NearbyShopsSection';
import HomeMapAndCta from './components/HomeMapAndCta';
import ExploreMapPage from './components/ExploreMapPage';
import ShopDetailsModal from './components/ShopDetailsModal';
import AuthModal from './components/AuthModal';
import BusinessRegistrationModal from './components/BusinessRegistrationModal';
import BusinessDashboard from './components/BusinessDashboard';
import ServicesView from './components/ServicesView';
import Footer from './components/Footer';
import ThemeCustomizer from './components/ThemeCustomizer';
import { INITIAL_SHOPS } from './data/automotiveData';

export default function App() {
  const [activeView, setActiveView] = useState('home'); // 'home' | 'explore' | 'services' | 'dashboard'
  const [shops, setShops] = useState(INITIAL_SHOPS);
  const [selectedShop, setSelectedShop] = useState(null);
  const [detailsModalShop, setDetailsModalShop] = useState(null);
  const [activeRouteShop, setActiveRouteShop] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Search trigger from Hero
  const handleHeroSearch = (query) => {
    setSearchQuery(query);
    setActiveView('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Category select trigger from Home
  const handleSelectCategory = (categoryId) => {
    setSearchQuery('');
    setActiveView('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Route toggle (Simulated navigation path on map)
  const handleToggleRoute = (shop) => {
    if (activeRouteShop?.id === shop.id) {
      setActiveRouteShop(null);
    } else {
      setActiveRouteShop(shop);
      setSelectedShop(shop);
      if (activeView !== 'explore') {
        setActiveView('explore');
      }
    }
  };

  // Use My Location trigger
  const handleUseLocation = () => {
    setActiveView('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Complete Business Registration Handler
  const handleRegisterComplete = (newBusinessData) => {
    const newShop = {
      id: `shop-${Date.now()}`,
      name: newBusinessData.businessName,
      category: newBusinessData.category,
      categoryId: newBusinessData.categoryId,
      rating: 5.0,
      reviewCount: 1,
      distance: "0.8 km away",
      location: newBusinessData.address,
      city: newBusinessData.city,
      isOpen: true,
      openingHours: newBusinessData.openingHours,
      phone: newBusinessData.phone,
      email: newBusinessData.email,
      verified: true,
      coverImage: newBusinessData.photoUrl || "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
      gallery: [
        newBusinessData.photoUrl || "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80"
      ],
      description: newBusinessData.description,
      services: newBusinessData.services,
      coords: newBusinessData.coords || { x: 50, y: 50 },
      lat: parseFloat(newBusinessData.lat) || 34.053,
      lng: parseFloat(newBusinessData.lng) || -118.242
    };

    setShops([newShop, ...shops]);
    setSelectedShop(newShop);
    setActiveView('explore');
  };

  return (
    <div className="min-h-screen bg-midnight text-snow flex flex-col font-sans selection:bg-yellow selection:text-midnight">
      
      {/* 1. Global Navigation Bar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenAuth={(mode = 'login') => setAuthModal({ isOpen: true, mode })}
        onOpenRegister={() => setRegisterModalOpen(true)}
      />

      {/* 2. Main Page Views Router */}
      <main className="flex-1">
        
        {/* VIEW A: HOME PAGE */}
        {activeView === 'home' && (
          <div>
            <HeroSection
              onSearch={handleHeroSearch}
              onExploreMap={() => setActiveView('explore')}
              onUseLocation={handleUseLocation}
            />

            <CategoryGrid
              onSelectCategory={handleSelectCategory}
            />

            <NearbyShopsSection
              shops={shops}
              onViewShopDetails={(shop) => setDetailsModalShop(shop)}
              onNavigateToShop={handleToggleRoute}
              onExploreAll={() => setActiveView('explore')}
            />

            <HomeMapAndCta
              shops={shops}
              selectedShop={selectedShop}
              onSelectShop={setSelectedShop}
              onViewShopDetails={(shop) => setDetailsModalShop(shop)}
              onExploreAll={() => setActiveView('explore')}
              onOpenRegister={() => setRegisterModalOpen(true)}
            />
          </div>
        )}

        {/* VIEW B: EXPLORE SHOPS / FULL MAP DISCOVERY PAGE */}
        {activeView === 'explore' && (
          <ExploreMapPage
            shops={shops}
            selectedShop={selectedShop}
            onSelectShop={setSelectedShop}
            onViewShopDetails={(shop) => setDetailsModalShop(shop)}
            activeRouteShop={activeRouteShop}
            onToggleRoute={handleToggleRoute}
            initialQuery={searchQuery}
          />
        )}

        {/* VIEW C: SERVICES PAGE */}
        {activeView === 'services' && (
          <ServicesView
            onSelectCategoryOnMap={handleSelectCategory}
          />
        )}

        {/* VIEW D: BUSINESS OWNER DASHBOARD */}
        {activeView === 'dashboard' && (
          <BusinessDashboard
            currentShop={shops[0]}
            onUpdateShop={() => {}}
          />
        )}

      </main>

      {/* 3. Global Footer (shown on all pages except full-screen map mode) */}
      {activeView !== 'explore' && (
        <Footer
          onNavigate={(view) => {
            setActiveView(view);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenRegister={() => setRegisterModalOpen(true)}
        />
      )}

      {/* 4. Shop Details Profile Modal */}
      {detailsModalShop && (
        <ShopDetailsModal
          shop={detailsModalShop}
          onClose={() => setDetailsModalShop(null)}
          onNavigate={(shop) => {
            handleToggleRoute(shop);
            setDetailsModalShop(null);
          }}
          isRouteActive={activeRouteShop?.id === detailsModalShop.id}
        />
      )}

      {/* 5. User Authentication Modal */}
      <AuthModal
        isOpen={authModal.isOpen}
        initialMode={authModal.mode}
        onClose={() => setAuthModal({ isOpen: false, mode: 'login' })}
        onLoginSuccess={(user) => setCurrentUser(user)}
      />

      {/* 6. Multi-Step Business Registration Modal */}
      <BusinessRegistrationModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        onRegisterComplete={handleRegisterComplete}
      />

      {/* 7. Live Theme Customizer Pill (Easily switch or test colors) */}
      <ThemeCustomizer />

    </div>
  );
}
