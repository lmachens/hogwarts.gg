'use client';

import supabase from '#/lib/supabase-browser';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '../Button';

export default function PostCreateButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const result = await supabase.from('posts').insert({}).select();
    setIsLoading(false);
    if (result.data) {
      router.push(`/dashboard/posts/${result.data[0].id}`);
    }
  };

  return (
    <Button onClick={handleClick} disabled={isLoading}>
      Create
    </Button>
  );
}
