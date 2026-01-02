import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Mic, MicOff, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Layout } from '@/components/Layout';
import { MedicalDisclaimer } from '@/components/MedicalDisclaimer';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';

interface Message { id: string; role: 'user' | 'assistant'; content: string; }

const demoResponses: Record<string, Record<string, string>> = {
  en: {
    default: "I'm MediBot, your health assistant. I can help you with health information, myth-busting, preventive care tips, and finding nearby hospitals. How can I assist you today?",
    fever: "For fever management: Rest well, stay hydrated, and take paracetamol as directed. Seek medical help if fever exceeds 103°F or lasts more than 3 days. This is general guidance - please consult a doctor for proper diagnosis.",
    hospital: "I can help you find hospitals! Please visit the Hospital Finder page or tell me your pincode/district to search for nearby healthcare facilities.",
  },
  hi: {
    default: "मैं मेडीबॉट हूं, आपका स्वास्थ्य सहायक। मैं स्वास्थ्य जानकारी, मिथक-भंजन, निवारक देखभाल युक्तियाँ और नजदीकी अस्पताल खोजने में आपकी मदद कर सकता हूं।",
    fever: "बुखार प्रबंधन के लिए: अच्छी तरह आराम करें, हाइड्रेटेड रहें, और निर्देशानुसार पैरासिटामोल लें। यदि बुखार 103°F से अधिक हो या 3 दिनों से अधिक रहे तो चिकित्सा सहायता लें।",
  },
  or: { default: "ମୁଁ ମେଡିବଟ୍, ଆପଣଙ୍କର ସ୍ୱାସ୍ଥ୍ୟ ସହାୟକ। ସ୍ୱାସ୍ଥ୍ୟ ସୂଚନା, ମିଥ୍ୟା-ଭଙ୍ଗ, ପ୍ରତିଷେଧକ ଯତ୍ନ ଟିପ୍ସ ଏବଂ ନିକଟତମ ହସ୍ପିଟାଲ ଖୋଜିବାରେ ସାହାଯ୍ୟ କରିପାରିବି।" },
  bn: { default: "আমি মেডিবট, আপনার স্বাস্থ্য সহায়ক। স্বাস্থ্য তথ্য, মিথ-ভাঙা, প্রতিরোধমূলক যত্নের টিপস এবং কাছাকাছি হাসপাতাল খুঁজে পেতে সাহায্য করতে পারি।" },
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading && !user) navigate('/auth');
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user && messages.length === 0) {
      setMessages([{ id: '1', role: 'assistant', content: demoResponses[language]?.default || demoResponses.en.default }]);
    }
  }, [user, language]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let response = demoResponses[language]?.default || demoResponses.en.default;
      if (lowerInput.includes('fever') || lowerInput.includes('बुखार')) response = demoResponses[language]?.fever || demoResponses.en.fever;
      if (lowerInput.includes('hospital') || lowerInput.includes('अस्पताल')) response = demoResponses[language]?.hospital || demoResponses.en.hospital;
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: response }]);
    }, 1000);
  };

  const toggleVoice = () => setIsListening(!isListening);

  if (loading) return <div className="min-h-screen flex items-center justify-center">{t('common.loading')}</div>;
  if (!user) return null;

  return (
    <Layout showDisclaimer={false}>
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-display text-2xl font-bold text-foreground">{t('chat.title')}</h1>
          <LanguageSelector variant="compact" />
        </div>
        <MedicalDisclaimer variant="card" className="mb-4" />
        <Card className="h-[60vh] flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full healthcare-gradient flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
                <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  <p className="text-sm">{msg.content}</p>
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-secondary-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={toggleVoice} className={isListening ? 'bg-destructive/10 text-destructive' : ''}>
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Input value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder={t('chat.placeholder')} className="flex-1" />
              <Button onClick={handleSend} className="healthcare-gradient"><Send className="h-4 w-4" /></Button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Chat;
