import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Languages, ShieldCheck, Lightbulb, Heart, Bell, Building2, MessageCircle, Mic } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Features = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Languages, titleKey: 'features.multilingual.title', descKey: 'features.multilingual.desc', color: 'bg-blue-500' },
    { icon: ShieldCheck, titleKey: 'features.verified.title', descKey: 'features.verified.desc', color: 'bg-green-500' },
    { icon: Lightbulb, titleKey: 'features.myths.title', descKey: 'features.myths.desc', color: 'bg-amber-500' },
    { icon: Heart, titleKey: 'features.preventive.title', descKey: 'features.preventive.desc', color: 'bg-rose-500' },
    { icon: Bell, titleKey: 'features.alerts.title', descKey: 'features.alerts.desc', color: 'bg-purple-500' },
    { icon: Building2, titleKey: 'features.hospital.title', descKey: 'features.hospital.desc', color: 'bg-teal-500' },
  ];

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">{t('features.title')}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('features.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:healthcare-shadow transition-all duration-300">
                <CardContent className="p-8">
                  <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-6`}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground mb-3">{t(feature.titleKey)}</h3>
                  <p className="text-muted-foreground">{t(feature.descKey)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 healthcare-gradient-soft border-primary/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">Text-Based Chat</h3>
                  <p className="text-muted-foreground text-sm">Type your health questions and get instant, verified responses in your preferred language.</p>
                </div>
              </div>
            </Card>
            <Card className="p-8 healthcare-gradient-soft border-secondary/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                  <Mic className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">Voice Interaction</h3>
                  <p className="text-muted-foreground text-sm">Speak naturally in your language. MediBot understands and responds to voice queries.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Features;
