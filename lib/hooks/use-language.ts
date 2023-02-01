import { usePathname } from 'next/navigation';
import { getPathLanguage } from '../i18n/pathname';

export default function useLanguage() {
  const pathname = usePathname()!;
  const language = getPathLanguage(pathname);
  return language;
}
