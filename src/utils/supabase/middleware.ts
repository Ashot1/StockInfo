import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { URLList } from '@/utils/config'

export async function updateSession(request: NextRequest) {
   let supabaseResponse = NextResponse.next({
      request,
   })

   const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
         cookies: {
            getAll() {
               return request.cookies.getAll()
            },
            setAll(cookiesToSet) {
               cookiesToSet.forEach(({ name, value, options }) =>
                  request.cookies.set(name, value)
               )
               supabaseResponse = NextResponse.next({
                  request,
               })
               cookiesToSet.forEach(({ name, value, options }) =>
                  supabaseResponse.cookies.set(name, value, options)
               )
            },
         },
      }
   )

   const {
      data: { user },
   } = await supabase.auth.getUser()

   const path = request.nextUrl.pathname

   if (path === '/') {
      const url = request.nextUrl.clone()
      url.pathname = user ? URLList.home : URLList.front
      return NextResponse.redirect(url)
   }

   if (!user && !path.startsWith(URLList.front)) {
      const url = request.nextUrl.clone()
      url.pathname = URLList.front
      return NextResponse.redirect(url)
   }

   if (
      user &&
      (path.startsWith(URLList.register) || path.startsWith(URLList.login))
   ) {
      const url = request.nextUrl.clone()
      url.pathname = `${URLList.home}`
      return NextResponse.redirect(url)
   }

   return supabaseResponse
}
