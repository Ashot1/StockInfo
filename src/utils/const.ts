export const URLList = new (class {
   front = '/front' as const
   login = `${this.front}/login` as const
   register = `${this.front}/signup` as const
   notFoundFront = `${this.front}/notFound` as const
   errorLoginPage = `${this.front}`

   home = '/home' as const

   news = '/news' as const
   current_news = `${this.news}` as const

   stocks = '/stocks' as const
   current_stock = `${this.stocks}` as const
   logos_stock = '/Logos/Stocks' as const

   bonds = '/bonds' as const
   current_bond = `${this.bonds}` as const
   logos_bonds = '/Logos/Bonds' as const

   currency = '/currency' as const
   current_currency = `${this.currency}` as const

   notFound = '/notFound' as const
})()

export const PageStartCounter = 50

export const MobileScreen = 820

export const SwipeLength = 100

export const AuthFormPatterns = {
   email: {
      required: {
         value: true,
         message: 'Это поле не может быть пустым',
      },
      maxLength: {
         value: 80,
         message: `Максимальная длинна 80 символов`,
      },
   },
   full_name: {
      required: {
         value: true,
         message: 'Это поле не может быть пустым',
      },
      maxLength: {
         value: 30,
         message: `Максимальная длинна 30 символов`,
      },
      minLength: {
         value: 4,
         message: `Минимальная длинна 4 символа`,
      },
   },
   password: {
      required: {
         value: true,
         message: 'Это поле не может быть пустым',
      },
      minLength: {
         value: 8,
         message: `Минимальная длинна 4 символа`,
      },
   },
}

export const LocalStorageParameters: Record<
   'glowBG',
   {
      name: string
      defaultValue: string
      negative: string
      positive: string
      conditionalRender: boolean
   }
> = {
   glowBG: {
      name: 'glowBGEffect',
      defaultValue: 'on',
      negative: 'off',
      positive: 'on',
      conditionalRender: true,
   },
}

export const RevalidateTags = {}
