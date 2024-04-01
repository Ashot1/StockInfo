import { Provider } from '@supabase/gotrue-js'
import { Enums } from '@/types/supabase.types'

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
}

export type RegisterPasswordInfo = BasicAuthInfo & { metadata: UserMetadata }

export type FavoritesListTypes = Enums<'favorite_types'>

export type TFavoritesList = {
   type: FavoritesListTypes
   secID: string
   image: string
}
