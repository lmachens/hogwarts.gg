'use client';

import { fallbackLang, languages } from '#/lib/i18n/settings';
import type { Translations } from '#/lib/i18n/types';
import supabase from '#/lib/supabase-browser';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '../Button';

export default function PostCreateButton({
  translations,
}: {
  translations: Translations;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const result = await supabase
      .from('posts')
      .insert({ language: fallbackLang })
      .select()
      .maybeSingle();
    setIsLoading(false);
    if (result.data) {
      for (const language of languages) {
        if (language !== fallbackLang) {
          await supabase
            .from('posts')
            .insert({ language, group_id: result.data.id })
            .select();
        }
      }
      router.push(`/dashboard/posts/${result.data.id}`);
    }
  };

  return (
    <Button onClick={handleClick} disabled={isLoading}>
      {translations.create}
    </Button>
  );
}
