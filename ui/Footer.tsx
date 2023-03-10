import type { Translations } from '#/lib/i18n/types';

export default function Footer({
  translations,
}: {
  translations: Translations;
}) {
  return (
    <small className="block py-0.5 text-center text-gray-400 truncate h-6">
      {translations.copyright}
    </small>
  );
}
