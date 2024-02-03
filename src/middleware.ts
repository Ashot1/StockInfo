import { NextRequest, NextResponse } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { URLList } from '@/utils/const'

export async function middleware(req: NextRequest) {
   const res = NextResponse.next()
   const supabase = createMiddlewareClient({ req, res })
   const session = await supabase.auth.getSession()

   if (
      !session.data.session &&
      !req.url.startsWith(`${process.env.NEXT_PUBLIC_SITEURL}${URLList.front}`)
   )
      return NextResponse.redirect(new URL(URLList.front, req.url))

   if (
      req.url.split('?')[0] === `${process.env.NEXT_PUBLIC_SITEURL}/` ||
      req.url.split('?')[0] === `${process.env.NEXT_PUBLIC_SITEURL}`
   )
      return NextResponse.rewrite(new URL(URLList.home, req.url))

   return res
}

export const config = {
   matcher: ['/', '/news', '/home', '/front', '/stocks', '/bonds', '/currency'],
}
