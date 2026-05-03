import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ locale: string }> }
) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const { locale } = await params
  
  // if "next" is in search params, use it as the redirection URL
  const next = searchParams.get('next') ?? `/${locale}`

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
      return NextResponse.redirect(`${siteUrl}${next}`)
    }
  }

  // return the user to an error page with instructions
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  return NextResponse.redirect(`${siteUrl}/${locale}/auth/auth-code-error`)
}
