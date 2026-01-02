import { AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface MedicalDisclaimerProps {
  variant?: 'banner' | 'card' | 'inline';
  className?: string;
}

export const MedicalDisclaimer = ({ variant = 'banner', className = '' }: MedicalDisclaimerProps) => {
  const { t } = useLanguage();

  if (variant === 'inline') {
    return (
      <p className={`text-xs text-muted-foreground flex items-start gap-2 ${className}`}>
        <AlertTriangle className="h-3 w-3 mt-0.5 text-warning flex-shrink-0" />
        <span>{t('disclaimer.text')}</span>
      </p>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`bg-warning/10 border border-warning/20 rounded-lg p-4 ${className}`}>
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-1">
              {t('disclaimer.title')}
            </h4>
            <p className="text-sm text-muted-foreground">
              {t('disclaimer.text')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-warning/10 border-y border-warning/20 py-3 px-4 ${className}`}>
      <div className="container mx-auto flex items-center gap-3">
        <AlertTriangle className="h-4 w-4 text-warning flex-shrink-0" />
        <p className="text-xs sm:text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{t('disclaimer.title')}:</span>{' '}
          {t('disclaimer.text')}
        </p>
      </div>
    </div>
  );
};
