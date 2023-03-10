import { dispatchEvent } from '#/lib/hooks/use-event-listener';
import useLanguage from '#/lib/hooks/use-language';
import type { Translations } from '#/lib/i18n/types';
import { usePathname, useRouter } from 'next/navigation';
import Button from '../Button';

export default function ShowOnMapButton({
  translations,
  disabled,
}: {
  translations: Translations;
  disabled?: boolean;
}) {
  const router = useRouter();
  const lang = useLanguage();
  const pathname = usePathname();

  return (
    <Button
      size="xs"
      className="my-1"
      disabled={disabled}
      onClick={() => {
        if (!pathname?.includes('/map')) {
          const href = `/${lang}/map/hogwarts`;
          router.prefetch(href);
          router.replace(href);
        } else {
          dispatchEvent('show-on-map');
        }
      }}
    >
      {translations.showOnMap}
    </Button>
  );
}
