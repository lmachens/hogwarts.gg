import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareSupabaseClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.redirect(new URL(`/sign-in`, req.url));
  }
  const result = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', session.user.id);
  const userRole = result.data?.[0]?.role;
  if (!userRole || !['admin', 'moderator'].includes(userRole)) {
    return NextResponse.redirect(new URL(`/sign-in`, req.url));
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
