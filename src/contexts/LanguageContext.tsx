import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'or' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.features': 'Features',
    'nav.chat': 'Chat with MediBot',
    'nav.hospitals': 'Find Hospital',
    'nav.login': 'Login',
    'nav.logout': 'Logout',
    
    // Hero
    'hero.title': 'Your Trusted Health Companion',
    'hero.subtitle': 'In Your Language',
    'hero.description': 'MediBot provides verified health information, busts myths, and helps you find nearby hospitals - all in your preferred language.',
    'hero.cta.chat': 'Chat with MediBot',
    'hero.cta.hospital': 'Find Nearby Hospital',
    
    // Features
    'features.title': 'How MediBot Helps You',
    'features.subtitle': 'Empowering communities with accessible health information',
    'features.multilingual.title': 'Multilingual Support',
    'features.multilingual.desc': 'Communicate in English, Hindi, Odia, or Bengali - whichever is most comfortable for you.',
    'features.verified.title': 'Verified Information',
    'features.verified.desc': 'All health information is sourced from trusted medical resources and verified by experts.',
    'features.myths.title': 'Myth Busting',
    'features.myths.desc': 'Clear misconceptions about health topics with evidence-based facts.',
    'features.preventive.title': 'Preventive Care',
    'features.preventive.desc': 'Get tips and guidance on preventive healthcare to stay healthy.',
    'features.alerts.title': 'Health Alerts',
    'features.alerts.desc': 'Stay informed about disease outbreaks and vaccination drives in your area.',
    'features.hospital.title': 'Hospital Finder',
    'features.hospital.desc': 'Find nearby hospitals and healthcare facilities using your pincode or district.',
    
    // Disclaimer
    'disclaimer.title': 'Medical Disclaimer',
    'disclaimer.text': 'MediBot provides general health information for awareness purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for medical concerns.',
    
    // Chat
    'chat.title': 'Chat with MediBot',
    'chat.placeholder': 'Ask me about health topics...',
    'chat.voice': 'Voice Input',
    'chat.send': 'Send',
    'chat.listening': 'Listening...',
    'chat.welcome': 'Hello! I\'m MediBot, your health assistant. Ask me about health topics, symptoms, preventive care, or find nearby hospitals.',
    
    // Hospital Finder
    'hospital.title': 'Find Nearby Hospitals',
    'hospital.search.placeholder': 'Enter pincode or district name',
    'hospital.search.button': 'Search',
    'hospital.emergency': 'Emergency Available',
    'hospital.services': 'Services',
    'hospital.contact': 'Contact',
    'hospital.no.results': 'No hospitals found. Try a different search.',
    
    // Auth
    'auth.login': 'Login',
    'auth.signup': 'Sign Up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.name': 'Full Name',
    'auth.language': 'Preferred Language',
    'auth.login.button': 'Login',
    'auth.signup.button': 'Create Account',
    'auth.switch.signup': 'Don\'t have an account? Sign up',
    'auth.switch.login': 'Already have an account? Login',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.back': 'Back',
  },
  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.features': 'विशेषताएं',
    'nav.chat': 'मेडीबॉट से बात करें',
    'nav.hospitals': 'अस्पताल खोजें',
    'nav.login': 'लॉगिन',
    'nav.logout': 'लॉगआउट',
    
    // Hero
    'hero.title': 'आपका विश्वसनीय स्वास्थ्य साथी',
    'hero.subtitle': 'आपकी भाषा में',
    'hero.description': 'मेडीबॉट सत्यापित स्वास्थ्य जानकारी प्रदान करता है, मिथकों को दूर करता है, और आपको नजदीकी अस्पताल खोजने में मदद करता है - आपकी पसंदीदा भाषा में।',
    'hero.cta.chat': 'मेडीबॉट से बात करें',
    'hero.cta.hospital': 'नजदीकी अस्पताल खोजें',
    
    // Features
    'features.title': 'मेडीबॉट आपकी कैसे मदद करता है',
    'features.subtitle': 'सुलभ स्वास्थ्य जानकारी से समुदायों को सशक्त बनाना',
    'features.multilingual.title': 'बहुभाषी सहायता',
    'features.multilingual.desc': 'अंग्रेजी, हिंदी, ओड़िया या बंगाली में संवाद करें - जो आपके लिए सबसे आरामदायक हो।',
    'features.verified.title': 'सत्यापित जानकारी',
    'features.verified.desc': 'सभी स्वास्थ्य जानकारी विश्वसनीय चिकित्सा संसाधनों से प्राप्त और विशेषज्ञों द्वारा सत्यापित है।',
    'features.myths.title': 'मिथक तोड़ना',
    'features.myths.desc': 'साक्ष्य-आधारित तथ्यों से स्वास्थ्य विषयों के बारे में गलत धारणाओं को स्पष्ट करें।',
    'features.preventive.title': 'निवारक देखभाल',
    'features.preventive.desc': 'स्वस्थ रहने के लिए निवारक स्वास्थ्य देखभाल पर सुझाव और मार्गदर्शन प्राप्त करें।',
    'features.alerts.title': 'स्वास्थ्य अलर्ट',
    'features.alerts.desc': 'अपने क्षेत्र में बीमारी के प्रकोप और टीकाकरण अभियानों के बारे में सूचित रहें।',
    'features.hospital.title': 'अस्पताल खोजक',
    'features.hospital.desc': 'अपने पिनकोड या जिले का उपयोग करके नजदीकी अस्पताल और स्वास्थ्य सुविधाएं खोजें।',
    
    // Disclaimer
    'disclaimer.title': 'चिकित्सा अस्वीकरण',
    'disclaimer.text': 'मेडीबॉट केवल जागरूकता उद्देश्यों के लिए सामान्य स्वास्थ्य जानकारी प्रदान करता है। यह पेशेवर चिकित्सा सलाह, निदान या उपचार का विकल्प नहीं है। चिकित्सा संबंधी चिंताओं के लिए हमेशा योग्य स्वास्थ्य सेवा प्रदाता से परामर्श लें।',
    
    // Chat
    'chat.title': 'मेडीबॉट से बात करें',
    'chat.placeholder': 'स्वास्थ्य विषयों के बारे में पूछें...',
    'chat.voice': 'आवाज इनपुट',
    'chat.send': 'भेजें',
    'chat.listening': 'सुन रहा हूं...',
    'chat.welcome': 'नमस्ते! मैं मेडीबॉट हूं, आपका स्वास्थ्य सहायक। स्वास्थ्य विषयों, लक्षणों, निवारक देखभाल के बारे में पूछें, या नजदीकी अस्पताल खोजें।',
    
    // Hospital Finder
    'hospital.title': 'नजदीकी अस्पताल खोजें',
    'hospital.search.placeholder': 'पिनकोड या जिले का नाम दर्ज करें',
    'hospital.search.button': 'खोजें',
    'hospital.emergency': 'आपातकालीन उपलब्ध',
    'hospital.services': 'सेवाएं',
    'hospital.contact': 'संपर्क',
    'hospital.no.results': 'कोई अस्पताल नहीं मिला। अलग खोज आज़माएं।',
    
    // Auth
    'auth.login': 'लॉगिन',
    'auth.signup': 'साइन अप',
    'auth.email': 'ईमेल',
    'auth.password': 'पासवर्ड',
    'auth.name': 'पूरा नाम',
    'auth.language': 'पसंदीदा भाषा',
    'auth.login.button': 'लॉगिन',
    'auth.signup.button': 'खाता बनाएं',
    'auth.switch.signup': 'खाता नहीं है? साइन अप करें',
    'auth.switch.login': 'पहले से खाता है? लॉगिन करें',
    
    // Common
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'एक त्रुटि हुई',
    'common.back': 'वापस',
  },
  or: {
    // Navigation
    'nav.home': 'ମୂଳପୃଷ୍ଠା',
    'nav.features': 'ବୈଶିଷ୍ଟ୍ୟଗୁଡ଼ିକ',
    'nav.chat': 'ମେଡିବଟ୍ ସହିତ କଥା ହୁଅନ୍ତୁ',
    'nav.hospitals': 'ହସ୍ପିଟାଲ୍ ଖୋଜନ୍ତୁ',
    'nav.login': 'ଲଗଇନ୍',
    'nav.logout': 'ଲଗଆଉଟ୍',
    
    // Hero
    'hero.title': 'ଆପଣଙ୍କର ବିଶ୍ୱସ୍ତ ସ୍ୱାସ୍ଥ୍ୟ ସାଥୀ',
    'hero.subtitle': 'ଆପଣଙ୍କ ଭାଷାରେ',
    'hero.description': 'ମେଡିବଟ୍ ଯାଞ୍ଚ ହୋଇଥିବା ସ୍ୱାସ୍ଥ୍ୟ ସୂଚନା ପ୍ରଦାନ କରେ, ମିଥ୍ୟା ଦୂର କରେ, ଏବଂ ନିକଟତମ ହସ୍ପିଟାଲ୍ ଖୋଜିବାରେ ସାହାଯ୍ୟ କରେ - ଆପଣଙ୍କ ପସନ୍ଦର ଭାଷାରେ।',
    'hero.cta.chat': 'ମେଡିବଟ୍ ସହିତ କଥା ହୁଅନ୍ତୁ',
    'hero.cta.hospital': 'ନିକଟତମ ହସ୍ପିଟାଲ୍ ଖୋଜନ୍ତୁ',
    
    // Features
    'features.title': 'ମେଡିବଟ୍ କିପରି ସାହାଯ୍ୟ କରେ',
    'features.subtitle': 'ସୁଲଭ ସ୍ୱାସ୍ଥ୍ୟ ସୂଚନା ସହିତ ସମୁଦାୟକୁ ସଶକ୍ତ କରିବା',
    'features.multilingual.title': 'ବହୁଭାଷୀ ସହାୟତା',
    'features.multilingual.desc': 'ଇଂରାଜୀ, ହିନ୍ଦୀ, ଓଡ଼ିଆ କିମ୍ବା ବଙ୍ଗଳାରେ ଯୋଗାଯୋଗ କରନ୍ତୁ - ଯେଉଁଟି ଆପଣଙ୍କ ପାଇଁ ଆରାମଦାୟକ।',
    'features.verified.title': 'ଯାଞ୍ଚ ହୋଇଥିବା ସୂଚନା',
    'features.verified.desc': 'ସମସ୍ତ ସ୍ୱାସ୍ଥ୍ୟ ସୂଚନା ବିଶ୍ୱାସଯୋଗ୍ୟ ଚିକିତ୍ସା ଉତ୍ସରୁ ଆସିଛି ଏବଂ ବିଶେଷଜ୍ଞଙ୍କ ଦ୍ୱାରା ଯାଞ୍ଚ ହୋଇଛି।',
    'features.myths.title': 'ମିଥ୍ୟା ଭଙ୍ଗ',
    'features.myths.desc': 'ପ୍ରମାଣ-ଆଧାରିତ ତଥ୍ୟ ସହିତ ସ୍ୱାସ୍ଥ୍ୟ ବିଷୟରେ ଭୁଲ ଧାରଣା ସ୍ପଷ୍ଟ କରନ୍ତୁ।',
    'features.preventive.title': 'ପ୍ରତିଷେଧକ ଯତ୍ନ',
    'features.preventive.desc': 'ସୁସ୍ଥ ରହିବା ପାଇଁ ପ୍ରତିଷେଧକ ସ୍ୱାସ୍ଥ୍ୟ ସେବା ଉପରେ ଟିପ୍ସ ଏବଂ ମାର୍ଗଦର୍ଶନ ପାଆନ୍ତୁ।',
    'features.alerts.title': 'ସ୍ୱାସ୍ଥ୍ୟ ଆଲର୍ଟ',
    'features.alerts.desc': 'ଆପଣଙ୍କ ଅଞ୍ଚଳରେ ରୋଗ ବିସ୍ତାର ଏବଂ ଟୀକାକରଣ ଅଭିଯାନ ବିଷୟରେ ସୂଚିତ ରୁହନ୍ତୁ।',
    'features.hospital.title': 'ହସ୍ପିଟାଲ୍ ଖୋଜକ',
    'features.hospital.desc': 'ଆପଣଙ୍କ ପିନକୋଡ୍ କିମ୍ବା ଜିଲ୍ଲା ବ୍ୟବହାର କରି ନିକଟତମ ହସ୍ପିଟାଲ୍ ଏବଂ ସ୍ୱାସ୍ଥ୍ୟ ସୁବିଧା ଖୋଜନ୍ତୁ।',
    
    // Disclaimer
    'disclaimer.title': 'ଚିକିତ୍ସା ଅସ୍ୱୀକାର',
    'disclaimer.text': 'ମେଡିବଟ୍ କେବଳ ସଚେତନତା ଉଦ୍ଦେଶ୍ୟ ପାଇଁ ସାଧାରଣ ସ୍ୱାସ୍ଥ୍ୟ ସୂଚନା ପ୍ରଦାନ କରେ। ଏହା ବୃତ୍ତିଗତ ଚିକିତ୍ସା ପରାମର୍ଶ, ନିର୍ଣ୍ଣୟ କିମ୍ବା ଚିକିତ୍ସାର ବିକଳ୍ପ ନୁହେଁ। ଚିକିତ୍ସା ସମ୍ବନ୍ଧୀୟ ଚିନ୍ତା ପାଇଁ ସର୍ବଦା ଯୋଗ୍ୟ ସ୍ୱାସ୍ଥ୍ୟସେବା ପ୍ରଦାତାଙ୍କ ସହ ପରାମର୍ଶ କରନ୍ତୁ।',
    
    // Chat
    'chat.title': 'ମେଡିବଟ୍ ସହିତ କଥା ହୁଅନ୍ତୁ',
    'chat.placeholder': 'ସ୍ୱାସ୍ଥ୍ୟ ବିଷୟରେ ପଚାରନ୍ତୁ...',
    'chat.voice': 'ଭଏସ୍ ଇନପୁଟ୍',
    'chat.send': 'ପଠାନ୍ତୁ',
    'chat.listening': 'ଶୁଣୁଛି...',
    'chat.welcome': 'ନମସ୍କାର! ମୁଁ ମେଡିବଟ୍, ଆପଣଙ୍କର ସ୍ୱାସ୍ଥ୍ୟ ସହାୟକ। ସ୍ୱାସ୍ଥ୍ୟ ବିଷୟ, ଲକ୍ଷଣ, ପ୍ରତିଷେଧକ ଯତ୍ନ ବିଷୟରେ ପଚାରନ୍ତୁ, କିମ୍ବା ନିକଟତମ ହସ୍ପିଟାଲ୍ ଖୋଜନ୍ତୁ।',
    
    // Hospital Finder
    'hospital.title': 'ନିକଟତମ ହସ୍ପିଟାଲ୍ ଖୋଜନ୍ତୁ',
    'hospital.search.placeholder': 'ପିନକୋଡ୍ କିମ୍ବା ଜିଲ୍ଲା ନାମ ଲେଖନ୍ତୁ',
    'hospital.search.button': 'ଖୋଜନ୍ତୁ',
    'hospital.emergency': 'ଜରୁରୀକାଳୀନ ଉପಲବ୍ଧ',
    'hospital.services': 'ସେବାଗୁଡ଼ିକ',
    'hospital.contact': 'ଯୋଗାଯୋଗ',
    'hospital.no.results': 'କୌଣସି ହସ୍ପିଟାଲ୍ ମିଳିଲା ନାହିଁ। ଅଲଗା ଖୋଜ ଚେଷ୍ଟା କରନ୍ତୁ।',
    
    // Auth
    'auth.login': 'ଲଗଇନ୍',
    'auth.signup': 'ସାଇନ୍ ଅପ୍',
    'auth.email': 'ଇମେଲ୍',
    'auth.password': 'ପାସୱାର୍ଡ',
    'auth.name': 'ପୂର୍ଣ୍ଣ ନାମ',
    'auth.language': 'ପସନ୍ଦର ଭାଷା',
    'auth.login.button': 'ଲଗଇନ୍',
    'auth.signup.button': 'ଖାତା ତିଆରି କରନ୍ତୁ',
    'auth.switch.signup': 'ଖାତା ନାହିଁ? ସାଇନ୍ ଅପ୍ କରନ୍ତୁ',
    'auth.switch.login': 'ପୂର୍ବରୁ ଖାତା ଅଛି? ଲଗଇନ୍ କରନ୍ତୁ',
    
    // Common
    'common.loading': 'ଲୋଡ୍ ହେଉଛି...',
    'common.error': 'ଏକ ତ୍ରୁଟି ଘଟିଲା',
    'common.back': 'ପଛକୁ',
  },
  bn: {
    // Navigation
    'nav.home': 'হোম',
    'nav.features': 'বৈশিষ্ট্য',
    'nav.chat': 'মেডিবট-এর সাথে কথা বলুন',
    'nav.hospitals': 'হাসপাতাল খুঁজুন',
    'nav.login': 'লগইন',
    'nav.logout': 'লগআউট',
    
    // Hero
    'hero.title': 'আপনার বিশ্বস্ত স্বাস্থ্য সঙ্গী',
    'hero.subtitle': 'আপনার ভাষায়',
    'hero.description': 'মেডিবট যাচাইকৃত স্বাস্থ্য তথ্য প্রদান করে, মিথ দূর করে এবং নিকটতম হাসপাতাল খুঁজে পেতে সাহায্য করে - আপনার পছন্দের ভাষায়।',
    'hero.cta.chat': 'মেডিবট-এর সাথে কথা বলুন',
    'hero.cta.hospital': 'নিকটতম হাসপাতাল খুঁজুন',
    
    // Features
    'features.title': 'মেডিবট কীভাবে সাহায্য করে',
    'features.subtitle': 'সহজলভ্য স্বাস্থ্য তথ্যের মাধ্যমে সম্প্রদায়কে ক্ষমতায়ন করা',
    'features.multilingual.title': 'বহুভাষী সমর্থন',
    'features.multilingual.desc': 'ইংরেজি, হিন্দি, ওড়িয়া বা বাংলায় যোগাযোগ করুন - যেটি আপনার জন্য সবচেয়ে আরামদায়ক।',
    'features.verified.title': 'যাচাইকৃত তথ্য',
    'features.verified.desc': 'সমস্ত স্বাস্থ্য তথ্য বিশ্বস্ত চিকিৎসা সংস্থান থেকে নেওয়া এবং বিশেষজ্ঞদের দ্বারা যাচাইকৃত।',
    'features.myths.title': 'মিথ ভাঙা',
    'features.myths.desc': 'প্রমাণ-ভিত্তিক তথ্যের মাধ্যমে স্বাস্থ্য বিষয়ক ভুল ধারণা পরিষ্কার করুন।',
    'features.preventive.title': 'প্রতিরোধমূলক যত্ন',
    'features.preventive.desc': 'সুস্থ থাকতে প্রতিরোধমূলক স্বাস্থ্যসেবার টিপস এবং নির্দেশনা পান।',
    'features.alerts.title': 'স্বাস্থ্য সতর্কতা',
    'features.alerts.desc': 'আপনার এলাকায় রোগ প্রাদুর্ভাব এবং টিকাদান প্রচারণা সম্পর্কে অবগত থাকুন।',
    'features.hospital.title': 'হাসপাতাল খোঁজক',
    'features.hospital.desc': 'আপনার পিনকোড বা জেলা ব্যবহার করে নিকটতম হাসপাতাল এবং স্বাস্থ্য সুবিধা খুঁজুন।',
    
    // Disclaimer
    'disclaimer.title': 'চিকিৎসা দাবিত্যাগ',
    'disclaimer.text': 'মেডিবট শুধুমাত্র সচেতনতার উদ্দেশ্যে সাধারণ স্বাস্থ্য তথ্য প্রদান করে। এটি পেশাদার চিকিৎসা পরামর্শ, রোগ নির্ণয় বা চিকিৎসার বিকল্প নয়। চিকিৎসা সংক্রান্ত উদ্বেগের জন্য সর্বদা যোগ্য স্বাস্থ্যসেবা প্রদানকারীর সাথে পরামর্শ করুন।',
    
    // Chat
    'chat.title': 'মেডিবট-এর সাথে কথা বলুন',
    'chat.placeholder': 'স্বাস্থ্য বিষয়ে জিজ্ঞাসা করুন...',
    'chat.voice': 'ভয়েস ইনপুট',
    'chat.send': 'পাঠান',
    'chat.listening': 'শুনছি...',
    'chat.welcome': 'হ্যালো! আমি মেডিবট, আপনার স্বাস্থ্য সহায়ক। স্বাস্থ্য বিষয়, উপসর্গ, প্রতিরোধমূলক যত্ন সম্পর্কে জিজ্ঞাসা করুন, অথবা নিকটতম হাসপাতাল খুঁজুন।',
    
    // Hospital Finder
    'hospital.title': 'নিকটতম হাসপাতাল খুঁজুন',
    'hospital.search.placeholder': 'পিনকোড বা জেলার নাম লিখুন',
    'hospital.search.button': 'খুঁজুন',
    'hospital.emergency': 'জরুরি উপলব্ধ',
    'hospital.services': 'সেবাসমূহ',
    'hospital.contact': 'যোগাযোগ',
    'hospital.no.results': 'কোনো হাসপাতাল পাওয়া যায়নি। অন্য অনুসন্ধান চেষ্টা করুন।',
    
    // Auth
    'auth.login': 'লগইন',
    'auth.signup': 'সাইন আপ',
    'auth.email': 'ইমেইল',
    'auth.password': 'পাসওয়ার্ড',
    'auth.name': 'পূর্ণ নাম',
    'auth.language': 'পছন্দের ভাষা',
    'auth.login.button': 'লগইন',
    'auth.signup.button': 'অ্যাকাউন্ট তৈরি করুন',
    'auth.switch.signup': 'অ্যাকাউন্ট নেই? সাইন আপ করুন',
    'auth.switch.login': 'ইতিমধ্যে অ্যাকাউন্ট আছে? লগইন করুন',
    
    // Common
    'common.loading': 'লোড হচ্ছে...',
    'common.error': 'একটি ত্রুটি ঘটেছে',
    'common.back': 'পিছনে',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('medibot-language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('medibot-language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const languageOptions = [
  { code: 'en' as Language, name: 'English', nativeName: 'English' },
  { code: 'hi' as Language, name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'or' as Language, name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
  { code: 'bn' as Language, name: 'Bengali', nativeName: 'বাংলা' },
];
