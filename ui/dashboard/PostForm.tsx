'use client';

import type { Database } from '#/lib/database.types';
import supabase from '#/lib/supabase-browser';
import { postPatchSchema } from '#/lib/validations/post';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconChevronLeft, IconWhirl } from '@tabler/icons';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type * as z from 'zod';
import Button from '../Button';
import ButtonLink from '../ButtonLink';
import Input from '../Input';

type FormData = z.infer<typeof postPatchSchema>;

export default function PostForm({
  post,
}: {
  post: Database['public']['Tables']['posts']['Row'];
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(postPatchSchema),
    defaultValues: {
      title: post.title ?? '',
      short: post.short ?? '',
      body: post.body ?? '',
      image: post.image ?? '',
      published: post.published ?? false,
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    const { error } = await supabase
      .from('posts')
      .update(data)
      .eq('id', post.id);
    if (error) {
      setError('title', { message: error.message });
      setIsLoading(false);
    } else {
      router.push('/dashboard/posts');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid w-full gap-10">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center space-x-10">
          <ButtonLink href="/dashboard/posts">
            <IconChevronLeft />
            Back
          </ButtonLink>
          <p className="text-sm text-slate-600">
            {post.published ? 'Published' : 'Draft'}
          </p>
        </div>
        <Button type="submit" kind="brand" disabled={isLoading}>
          {isLoading && <IconWhirl className="animate-spin" />}
          Save
        </Button>
      </div>
      {errors.title && (
        <p className="text-xs	text-orange-500">{errors.title.message}</p>
      )}
      <Input label="Title" autoFocus {...register('title')} />
    </form>
  );
}
