import { Provider } from '@supabase/gotrue-js'

export type OAuthProviders = 'google' | 'discord'
export type OAuthData =
   | { provider: Provider; url: string }
   | { provider: Provider; url: null }

export type BasicAuthInfo = { email: string; password: string }

export type LoginPasswordInfo = BasicAuthInfo

export type UserMetadata = {
   avatar_url: string
   email_verified: boolean
   full_name: string
   // VisitHistory: { icon: string; title: string; url: string }[]
}

export type RegisterPasswordInfo = BasicAuthInfo & { metadata: UserMetadata }
