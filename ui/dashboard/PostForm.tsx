'use client';

import type { Database } from '#/lib/database.types';
import supabase from '#/lib/supabase-browser';
import { cn } from '#/lib/utils';
import { postPatchSchema } from '#/lib/validations/post';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconChevronLeft, IconWhirl } from '@tabler/icons';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import type * as z from 'zod';
import Button from '../Button';
import ButtonLink from '../ButtonLink';
import EditorInput from '../EditorInput';
import Input from '../Input';

type FormData = z.infer<typeof postPatchSchema>;

export default function PostForm({
  post,
}: {
  post: Database['public']['Tables']['posts']['Row'];
}) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
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

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    clearErrors();
    const { error } = await supabase
      .from('posts')
      .update({
        ...data,
        published_at: new Date().toISOString(),
      })
      .eq('id', post.id);
    if (error) {
      setError('title', { message: error.message });
    }
    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid w-full gap-10">
      <div className="flex w-full items-center justify-between">
        <ButtonLink href="/dashboard/posts">
          <IconChevronLeft />
          Back
        </ButtonLink>
        <div className="flex items-center space-x-2">
          <Controller
            name="published"
            control={control}
            render={({ field: { value, ...field } }) => (
              <label
                className={cn('cursor-pointer', {
                  'bg-gray-900': post.published,
                })}
              >
                <input
                  className="hidden"
                  type="checkbox"
                  {...field}
                  checked={value}
                />
                {value ? 'Published' : 'Draft'}
              </label>
            )}
          />
          <Button type="submit" kind="brand" disabled={isLoading}>
            {isLoading && <IconWhirl className="animate-spin" />}
            Save
          </Button>
        </div>
      </div>
      {errors.title && (
        <p className="text-xs	text-orange-500">{errors.title.message}</p>
      )}
      <Input label="Title" autoFocus {...register('title')} />
      <section>
        <label>Short</label>
        <Controller
          name="short"
          control={control}
          render={({ field }) => <EditorInput postId={post.id} {...field} />}
        />
      </section>
      <section>
        <label>Full</label>
        <Controller
          name="body"
          control={control}
          render={({ field }) => <EditorInput postId={post.id} {...field} />}
        />
      </section>
    </form>
  );
}
