import { NextRequest, NextResponse } from 'next/server'
import { SupabaseCustomServer } from '@/utils/supabase/server'
import { URLList } from '@/utils/const'

export async function GET(request: NextRequest) {
   const requestURL = new URL(request.url)
   const code = requestURL.searchParams.get('code')
   const next = requestURL.searchParams.get('next') ?? URLList.home

   if (code) {
      const supabase = await SupabaseCustomServer()
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      if (!error) return NextResponse.redirect(`${requestURL.origin}${next}`)
   }

   return NextResponse.redirect(`${requestURL.origin}${URLList.errorLoginPage}`)
}
