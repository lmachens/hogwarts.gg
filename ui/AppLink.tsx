'use client';
import useLanguage from '#/lib/hooks/use-language';
import Link from 'next/link';
import { forwardRef } from 'react';

const AppLink = forwardRef<HTMLAnchorElement, Parameters<typeof Link>[0]>(
  (props, ref) => {
    const language = useLanguage();
    const href = `/${language}${props.href}`;
    if (props.target === '_blank') {
      return <a ref={ref} {...props} href={props.href.toString()} />;
    }
    return <Link ref={ref} {...props} href={href} />;
  },
);
AppLink.displayName = 'AppLink';

export default AppLink;
