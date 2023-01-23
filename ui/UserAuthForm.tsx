'use client';

import supabase from '#/lib/supabase-browser';
import type { Provider } from '@supabase/supabase-js';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from './Button';
import Divider from './Divider';
import Input from './Input';

const getURL = () => {
  let url =
    process.env.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process.env.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/';
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Make sure to including trailing `/`.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
  return url;
};

export default function UserAuthForm() {
  const signInWithOAuth = async (provider: Provider) => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: getURL(),
      },
    });
  };

  return (
    <div className="flex flex-col gap-4 w-72">
      <Button type="button" onClick={() => signInWithOAuth('discord')}>
        <svg
          className="mr-2 h-4 w-4"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="discord"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 127.14 96.36"
        >
          <path
            fill="currentColor"
            d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"
          ></path>
        </svg>
        Continue with Discord
      </Button>
      <Button type="button" onClick={() => signInWithOAuth('github')}>
        <svg
          className="mr-2 h-4 w-4"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="github"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 496 512"
        >
          <path
            fill="currentColor"
            d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
          ></path>
        </svg>
        Continue with GitHub
      </Button>
      <Divider>or</Divider>
      <AuthForm />
    </div>
  );
}

type FormData = { email: string; captchaToken: string };

function AuthForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      captchaToken: '',
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [sentOtp, setSentOtp] = useState('');

  const router = useRouter();
  const pathname = usePathname();
  const isSignIn = pathname === '/sign-in';

  async function onSubmitEmail(data: FormData) {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: data.email,
      options: {
        shouldCreateUser: !isSignIn,
        emailRedirectTo: getURL(),
      },
    });
    setIsLoading(false);
    if (error) {
      setError('email', { message: error.message });
    } else {
      setSentOtp(data.email);
    }
  }

  async function onSubmitOtp(data: FormData) {
    setIsLoading(true);
    const { error } = await supabase.auth.verifyOtp({
      email: data.email,
      token: data.captchaToken,
      type: 'magiclink',
    });
    if (error) {
      setError('captchaToken', { message: error.message });
      setIsLoading(false);
    } else {
      router.push('/');
    }
  }

  if (sentOtp) {
    return (
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmitOtp)}
      >
        <h2>Awaiting Confirmation</h2>
        <p className="text-gray-400">
          We just sent an email to{' '}
          <span className="block text-white">{sentOtp}</span>
          Follow the link or enter the code:
        </p>
        <Input
          label="Code"
          type="text"
          placeholder="000000"
          required
          {...register('captchaToken')}
        />
        {errors.captchaToken && (
          <p className="text-xs	text-orange-500">
            {errors.captchaToken.message}
          </p>
        )}
        <Button type="submit" kind="brand" disabled={isLoading}>
          Submit
        </Button>
      </form>
    );
  }

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={handleSubmit(onSubmitEmail)}
    >
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        required
        {...register('email')}
      />
      {errors.email && (
        <p className="text-xs	text-orange-500">
          {isSignIn ? (
            <>
              There is no account associated with this email address.{' '}
              <Link className="underline" href="/sign-up">
                Sign up?
              </Link>
            </>
          ) : (
            errors.email.message
          )}
        </p>
      )}

      <Button type="submit" kind="brand" disabled={isLoading}>
        Continue with Email
      </Button>
      {!isSignIn && (
        <p className="text-sm text-gray-400">
          By clicking continue, you agree to the{' '}
          <a
            className="text-white underline"
            href="/privacy-policy"
            target="_blank"
          >
            Privacy Policy
          </a>
          .
        </p>
      )}
      <p className="text-sm text-gray-400">
        {isSignIn ? "Don't have an account?" : 'Have an account?'}{' '}
        <Link
          className="text-white underline"
          href={isSignIn ? '/sign-up' : '/sign-in'}
        >
          Sign {isSignIn ? 'Up' : 'In'} Now
        </Link>
      </p>
    </form>
  );
}
