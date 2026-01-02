import { Globe } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLanguage, languageOptions, Language } from '@/contexts/LanguageContext';

interface LanguageSelectorProps {
  variant?: 'default' | 'compact';
  className?: string;
}

export const LanguageSelector = ({ variant = 'default', className = '' }: LanguageSelectorProps) => {
  const { language, setLanguage } = useLanguage();

  return (
    <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
      <SelectTrigger 
        className={`${variant === 'compact' ? 'w-[100px]' : 'w-[140px]'} bg-card border-border ${className}`}
      >
        <Globe className="h-4 w-4 mr-2 text-primary" />
        <SelectValue>
          {variant === 'compact' 
            ? languageOptions.find(l => l.code === language)?.code.toUpperCase()
            : languageOptions.find(l => l.code === language)?.nativeName
          }
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {languageOptions.map((option) => (
          <SelectItem key={option.code} value={option.code}>
            <span className="font-medium">{option.nativeName}</span>
            {variant !== 'compact' && (
              <span className="text-muted-foreground ml-2">({option.name})</span>
            )}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
