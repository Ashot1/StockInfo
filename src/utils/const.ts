export const URLList = new (class {
   front = '/front'
   login = `${this.front}/login`
   register = `${this.front}/signup`

   home = '/home'

   news = '/news'
   current_news = `${this.news}`

   stocks = '/stocks'
   current_stock = `${this.stocks}`
   logos_stock = '/Logos/Stocks'

   bonds = '/bonds'
   current_bond = `${this.bonds}`
   logos_bonds = '/Logos/Bonds'

   currency = '/currency'
   current_currency = `${this.currency}`

   notFound = '/notfound'
})()

export const PageStartCounter = 50

export const MobileScreen = 820

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

export const LocalStorageParameters = {
   glowBG: {
      name: 'glowBGEffect',
      defaultValue: 'on',
      negative: 'off',
      positive: 'on',
      conditionalRender: true,
   },
}
