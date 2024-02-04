import { RegisterOptions } from 'react-hook-form'

export const URLList = {
   front: '/front',
   login: '/front/login',
   register: '/front/signup',
   home: '/home',
   news: '/news',
   stocks: '/stocks',
   bonds: '/bonds',
   currency: '/currency',
   notFound: '/notfound',
}

export const PageStartCounter = 50

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
