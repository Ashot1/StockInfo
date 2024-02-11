export type ErrorMessageProps = {
   errMessage?: string
}

export default function ErrorMessage({ errMessage }: ErrorMessageProps) {
   return (
      <div className="grid h-full w-full place-items-center">
         Произошла ошибка <br /> {errMessage}
      </div>
   )
}
