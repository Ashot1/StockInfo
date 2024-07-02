import { NextRequest, NextResponse } from 'next/server'
import { SupabaseCustomServer } from '@/utils/supabase/server'
import { URLList } from '@/utils/config'
import { CreateTable } from '@/actions/Account/Account'

export async function GET(request: NextRequest) {
   const requestURL = new URL(request.url)
   const code = requestURL.searchParams.get('code')
   const next = requestURL.searchParams.get('next') ?? URLList.home
   const badResponse = NextResponse.redirect(
      `${requestURL.origin}${URLList.errorLoginPage}`
   )

   if (code) {
      const supabase = SupabaseCustomServer()
      const { error, data } = await supabase.auth.exchangeCodeForSession(code)
      if (error || !data.user?.id) return badResponse

      await CreateTable(data.user.id)
      return NextResponse.redirect(`${requestURL.origin}${next}`)
   }

   return badResponse
}
