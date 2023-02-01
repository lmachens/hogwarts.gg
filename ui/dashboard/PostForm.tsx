'use client';

import useLanguage from '#/lib/hooks/use-language';
import { labels } from '#/lib/i18n/settings';
import type { Translations } from '#/lib/i18n/types';
import type { Post } from '#/lib/posts';
import supabase from '#/lib/supabase-browser';
import { cn } from '#/lib/utils';
import { postPatchSchema } from '#/lib/validations/post';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconChevronLeft, IconWhirl } from '@tabler/icons';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import type * as z from 'zod';
import Button from '../Button';
import ButtonLink from '../ButtonLink';
import Divider from '../Divider';
import EditorInput from '../EditorInput';
import Input from '../Input';
import Select from '../Select';

type FormData = z.infer<typeof postPatchSchema>;

export default function PostForm({
  post,
  translations,
}: {
  post: Post;
  translations: Translations;
}) {
  const router = useRouter();
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
      slug: post.slug ?? '',
      title: post.title ?? '',
      short: post.short ?? '',
      body: post.body ?? '',
      image: post.image ?? '',
      published: post.published ?? false,
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const language = useLanguage();

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

  async function onDelete() {
    const ok = confirm(
      'Are you sure? This post and all translations will be removed.',
    );
    if (!ok) {
      return;
    }
    clearErrors();
    if (post.group_id) {
      await supabase.from('posts').delete().eq('id', post.group_id);
      await supabase.from('posts').delete().eq('group_id', post.group_id);
    } else {
      await supabase.from('posts').delete().eq('id', post.id);
      await supabase.from('posts').delete().eq('group_id', post.id);
    }
    router.push(`/${language}/dashboard/posts`);
  }

  const otherPosts = [
    { value: post.id.toString(), title: labels[post.language] },
    ...post.posts.map((otherPost) => ({
      value: otherPost.id.toString(),
      title: labels[otherPost.language],
    })),
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid w-full gap-10">
      <div className="flex w-full items-center justify-between">
        <ButtonLink href="/dashboard/posts">
          <IconChevronLeft />
          {translations.back}
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
                {value ? translations.published : translations.draft}
              </label>
            )}
          />

          <Button type="submit" kind="brand" disabled={isLoading}>
            {isLoading && <IconWhirl className="animate-spin" />}
            {translations.save}
          </Button>
        </div>
      </div>
      <Select
        label="Language"
        onChange={async (event) =>
          router.push(`/${language}/dashboard/posts/${event.target.value}`)
        }
        value={post.language}
        options={otherPosts}
      />

      <Input
        label={translations.title}
        error={errors.title?.message}
        autoFocus
        {...register('title')}
      />
      <Input
        label={translations.slug}
        error={errors.slug?.message}
        {...register('slug')}
      />
      <section>
        <label>{translations.short}</label>
        <Controller
          name="short"
          control={control}
          render={({ field }) => <EditorInput postId={post.id} {...field} />}
        />
        {errors.short && (
          <p className="text-xs	text-orange-500">{errors.short.message}</p>
        )}
      </section>
      <section>
        <label>{translations.full}</label>
        <Controller
          name="body"
          control={control}
          render={({ field }) => <EditorInput postId={post.id} {...field} />}
        />
        {errors.body && (
          <p className="text-xs	text-orange-500">{errors.body.message}</p>
        )}
      </section>
      <Divider>{translations.dangerZone}</Divider>
      <div className="flex justify-center">
        <Button type="button" onClick={onDelete} kind="danger">
          {translations.delete}
        </Button>
      </div>
    </form>
  );
}
