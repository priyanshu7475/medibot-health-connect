import { useState, useEffect } from 'react';
import { Search, MapPin, Phone, Clock, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';

interface Hospital {
  id: string; name: string; address: string; district: string; state: string;
  pincode: string; phone: string | null; type: string; services: string[] | null; emergency_available: boolean | null;
}

const Hospitals = () => {
  const [search, setSearch] = useState('');
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const { t } = useLanguage();

  const handleSearch = async () => {
    if (!search.trim()) return;
    setLoading(true);
    setSearched(true);
    const { data, error } = await supabase
      .from('hospitals')
      .select('*')
      .or(`pincode.ilike.%${search}%,district.ilike.%${search}%,name.ilike.%${search}%`)
      .limit(20);
    setHospitals(error ? [] : (data as Hospital[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    const loadInitial = async () => {
      const { data } = await supabase.from('hospitals').select('*').limit(6);
      if (data) setHospitals(data as Hospital[]);
    };
    loadInitial();
  }, []);

  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">{t('hospital.title')}</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">Search by pincode, district name, or hospital name to find healthcare facilities near you.</p>
          </div>
          <div className="max-w-2xl mx-auto mb-10">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input value={search} onChange={(e) => setSearch(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSearch()} placeholder={t('hospital.search.placeholder')} className="pl-10" />
              </div>
              <Button onClick={handleSearch} className="healthcare-gradient" disabled={loading}>
                <Search className="h-4 w-4 mr-2" />{t('hospital.search.button')}
              </Button>
            </div>
          </div>
          {loading ? (
            <div className="text-center py-12"><p className="text-muted-foreground">{t('common.loading')}</p></div>
          ) : hospitals.length === 0 && searched ? (
            <div className="text-center py-12"><p className="text-muted-foreground">{t('hospital.no.results')}</p></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hospitals.map((hospital) => (
                <Card key={hospital.id} className="hover:healthcare-shadow transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-primary" />
                      </div>
                      {hospital.emergency_available && <Badge variant="destructive" className="text-xs">Emergency</Badge>}
                    </div>
                    <h3 className="font-display font-semibold text-lg text-foreground mb-2">{hospital.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3 flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />{hospital.address}, {hospital.district} - {hospital.pincode}
                    </p>
                    {hospital.phone && (
                      <a href={`tel:${hospital.phone}`} className="text-sm text-primary flex items-center gap-2 mb-3 hover:underline">
                        <Phone className="h-4 w-4" />{hospital.phone}
                      </a>
                    )}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <Clock className="h-3 w-3" /><span>{hospital.type}</span>
                    </div>
                    {hospital.services && hospital.services.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {hospital.services.slice(0, 3).map((service, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">{service}</Badge>
                        ))}
                        {hospital.services.length > 3 && <Badge variant="outline" className="text-xs">+{hospital.services.length - 3}</Badge>}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Hospitals;
