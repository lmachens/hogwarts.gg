import useLanguage from '#/lib/hooks/use-language';
import { languages } from '#/lib/i18n/settings';
import { cn } from '#/lib/utils';
import { IconLanguage } from '@tabler/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Popover from './Popover';

const labels: {
  [language: string]: string;
} = {
  en: 'English',
  de: 'Deutsch',
};

export default function LanguageSelect({ className }: { className?: string }) {
  const language = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname()!;

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
      trigger={
        <button
          className={cn(
            'text-sm flex gap-1 items-center text-gray-400 hover:text-gray-300',
            className,
          )}
        >
          <IconLanguage /> {labels[language]}
        </button>
      }
    >
      <nav className="flex flex-col">
        {languages
          .filter((lang) => lang !== language)
          .map((lang) => (
            <Link
              key={lang}
              href={pathname.replace(/^\/\w+/, `/${lang}`)}
              onClick={() => setIsOpen(false)}
              className="block px-3 py-1  rounded-md text-sm text-center text-gray-400 hover:text-gray-300"
            >
              {labels[lang]}
            </Link>
          ))}
      </nav>
    </Popover>
  );
}
