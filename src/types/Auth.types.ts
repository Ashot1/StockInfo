import { Enums } from '@/types/supabase.types'

export type OAuthProviders = 'google' | 'discord'

export type BasicAuthInfo = { email: string; password: string }

export type LoginPasswordInfo = BasicAuthInfo

export type UserMetadata = {
   avatar_url: string
   email_verified: boolean
   full_name: string
}

export type RegisterPasswordInfo = BasicAuthInfo & { metadata: UserMetadata }

export type FavoritesListTypes = Enums<'favorite_types'>
export type TransactionTypes = Enums<'transaction_types'>

export type TFavoritesList = {
   type: FavoritesListTypes
   secID: string
   image: string
}

export type TPurchasesList = TFavoritesList & { transaction_id: number }

export type TTransactionsList = {
   type: string
   image: string
   title: string
   subtitle: string
   price: number
   date: string
   transaction_type: TransactionTypes
   transaction_id: number
}
