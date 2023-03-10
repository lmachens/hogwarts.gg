'use client';

import { useMe } from '#/lib/hooks/use-me';
import Button from '#/ui/Button';
import { useEffect, useState } from 'react';

export default function OverwolfStatus() {
  const [seconds, setSeconds] = useState(5);
  const { data: me, isLoading } = useMe();

  useEffect(() => {
    if (seconds < 1) {
      window.close();
    }
  }, [seconds]);

  useEffect(() => {
    if (!me) {
      return;
    }
    const intervalId = setInterval(() => {
      setSeconds((s) => s - 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [me]);

  let content;
  if (isLoading) {
    content = <></>;
  } else if (!me) {
    content = (
      <>
        <h1 className="text-xl">Could not sign-in 😡</h1>
      </>
    );
  } else {
    content = (
      <>
        <h1 className="text-xl">Successfully logged in 🤘</h1>
        <p>This window will be self-destroyed in {seconds} seconds</p>
        <Button onClick={() => window.close()} className="w-60 mx-auto">
          Close now 🚀
        </Button>
      </>
    );
  }
  return (
    <div className="grid gap-2 place-content-center h-screen text-center">
      {content}
    </div>
  );
}
