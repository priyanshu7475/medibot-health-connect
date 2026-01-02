import { Link } from 'react-router-dom';
import { Heart, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full healthcare-gradient flex items-center justify-center">
                <Heart className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl text-foreground">
                Medi<span className="text-primary">Bot</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md">
              {t('hero.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('nav.home')}
              </Link>
              <Link to="/features" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('nav.features')}
              </Link>
              <Link to="/chat" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('nav.chat')}
              </Link>
              <Link to="/hospitals" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('nav.hospitals')}
              </Link>
            </nav>
          </div>

          {/* Emergency Contact */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Emergency</h4>
            <div className="flex flex-col gap-3">
              <a 
                href="tel:108" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>108 (Ambulance)</span>
              </a>
              <a 
                href="tel:104" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>104 (Health Helpline)</span>
              </a>
              <a 
                href="mailto:support@medibot.in" 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>support@medibot.in</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MediBot. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
