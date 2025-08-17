import React from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, User, Truck, ShoppingCart, Building2, ExternalLink } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const Header = ({ setIsCartOpen }) => {
  const { cartItems } = useCart();
  const { user } = useAuth();
  const location = useLocation();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  const isStoreRelatedPage = location.pathname.startsWith('/store') || location.pathname.startsWith('/product') || location.pathname.startsWith('/success');

  // This header is only for the store pages.
  if (!isStoreRelatedPage) {
    return null; 
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-primary/20 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/store" className="flex items-center gap-2">
          <img src="https://horizons-cdn.hostinger.com/955ce100-87ca-4773-b469-c8eb5957e3a3/04ee59a64a9932800c97ae452154c91e.jpg" alt="Lilou Logistique Logo" className="h-8 w-8 rounded-full" />
          <span className="font-bold text-lg text-primary-foreground hidden sm:inline">Boutique Lilou</span>
        </Link>
        <nav className="flex items-center gap-2">
          <NavLink to="/store" end>
            {({ isActive }) => (
              <Button variant={isActive ? 'secondary' : 'ghost'} size="sm">
                <Home className="h-4 w-4 mr-2" />
                Boutique
              </Button>
            )}
          </NavLink>
           <a href="/" target="_blank" rel="noopener noreferrer">
                <Button variant='ghost' size="sm">
                    <Building2 className="h-4 w-4 mr-2" />
                    Portail Principal
                    <ExternalLink className="h-3 w-3 ml-2" />
                </Button>
            </a>
          
          {user ? (
            <Link to="/select-role">
                <Button variant='ghost' size="sm">
                    <Truck className="h-4 w-4 mr-2" />
                    Mon Espace
                </Button>
            </Link>
          ) : (
             <Link to="/select-role">
                <Button variant='ghost' size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Connexion
                </Button>
            </Link>
          )}

          <Button onClick={() => setIsCartOpen(true)} variant="outline" size="sm" className="relative">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Panier
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;