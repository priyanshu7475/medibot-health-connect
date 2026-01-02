import { Link } from 'react-router-dom';
import { MessageCircle, MapPin, Languages, ShieldCheck, Lightbulb, Bell, Building2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Languages, titleKey: 'features.multilingual.title', descKey: 'features.multilingual.desc' },
    { icon: ShieldCheck, titleKey: 'features.verified.title', descKey: 'features.verified.desc' },
    { icon: Lightbulb, titleKey: 'features.myths.title', descKey: 'features.myths.desc' },
    { icon: Heart, titleKey: 'features.preventive.title', descKey: 'features.preventive.desc' },
    { icon: Bell, titleKey: 'features.alerts.title', descKey: 'features.alerts.desc' },
    { icon: Building2, titleKey: 'features.hospital.title', descKey: 'features.hospital.desc' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 healthcare-gradient-soft opacity-50" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
              <Heart className="h-4 w-4" />
              <span>Digital Health Assistant</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              {t('hero.title')} <br />
              <span className="text-gradient">{t('hero.subtitle')}</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button asChild size="lg" className="healthcare-gradient text-primary-foreground healthcare-shadow hover:opacity-90">
                <Link to="/chat">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  {t('hero.cta.chat')}
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/hospitals">
                  <MapPin className="h-5 w-5 mr-2" />
                  {t('hero.cta.hospital')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('features.title')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-border hover:healthcare-shadow transition-shadow duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg healthcare-gradient flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t(feature.descKey)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="healthcare-gradient p-8 md:p-12 text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Ready to get health information in your language?
            </h2>
            <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
              Start chatting with MediBot now and get verified health information, myth-busting facts, and find nearby hospitals.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link to="/chat">
                <MessageCircle className="h-5 w-5 mr-2" />
                {t('hero.cta.chat')}
              </Link>
            </Button>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
