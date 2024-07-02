import ColorThief, { RGBColor } from 'colorthief'
import { useEffect, useState } from 'react'

const ColorModule = new ColorThief()

const rgbToHex = (r: number, g: number, b: number) => {
   const hexValue = [r, g, b]
      .map((x) => {
         const hex = x.toString(16)
         return hex.length === 1 ? '0' + hex : hex
      })
      .join('')

   return '#' + hexValue
}

const rgbToString = (r: number, g: number, b: number) => {
   return `rgb(${r},${g},${b})`
}

const calculateBrightness = (r: number, g: number, b: number) => {
   return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

type ColorMode = 'hex' | 'rgbString' | 'rgb'

type ThiefHooksProps = {
   image: string | undefined
   mode: ColorMode
   quality?: number
}

type ThiefHooksManyProps = {
   images: string[] | undefined
   mode: ColorMode
   quality?: number
}

type defaultState = {
   error: undefined | string
   loading: boolean
}

const loadImage = (image: string) =>
   new Promise<HTMLImageElement>((resolve, reject) => {
      const img = document.createElement('img')
      img.src = image
      img.onload = () => resolve(img)
      img.onerror = (error) => reject(error)
   })

type useColorManyState = {
   data: undefined | string[] | RGBColor[]
} & defaultState

export const useColorMany = ({
   images,
   mode,
   quality,
}: ThiefHooksManyProps) => {
   const [ColorData, setColorData] = useState<useColorManyState>({
      data: undefined,
      error: undefined,
      loading: true,
   })

   const last_img = images?.at(-1)

   useEffect(() => {
      const getColor = async () => {
         if (!images)
            return setColorData({
               data: undefined,
               error: 'Список цветов пуст',
               loading: false,
            })

         try {
            const imgs = await Promise.all(images.map(loadImage))
            const colors = imgs.map((img) => ColorModule.getColor(img))
            const baseColor: RGBColor = [0, 0, 0]

            const data: Record<ColorMode, string[] | RGBColor[]> = {
               hex: colors.map((color) => rgbToHex(...(color || baseColor))),
               rgbString: colors.map((color) =>
                  rgbToString(...(color || baseColor))
               ),
               rgb: colors.filter((color) => !!color),
            }

            setColorData({ data: data[mode], error: undefined, loading: false })
            imgs.forEach((img) => img.remove())
         } catch (error) {
            return setColorData({
               data: undefined,
               error: (error as Error).message,
               loading: false,
            })
         }
      }

      getColor()
   }, [last_img, mode, quality])

   return {
      data: ColorData.data,
      error: ColorData.error,
      loading: ColorData.loading,
   }
}

type useColorState = {
   data: undefined | RGBColor | string
} & defaultState

export const useColor = ({ image, mode, quality }: ThiefHooksProps) => {
   const [ColorData, setColorData] = useState<useColorState>({
      data: undefined,
      error: undefined,
      loading: true,
   })

   useEffect(() => {
      const getColor = async () => {
         if (!image)
            return setColorData({
               data: undefined,
               error: 'Цвет отсутствует',
               loading: false,
            })

         try {
            const img = await loadImage(image)
            const color = ColorModule.getColor(img)
            if (!color) throw new Error('Не удалось получить цвет')

            const data: Record<ColorMode, string | RGBColor> = {
               hex: rgbToHex(...color),
               rgbString: rgbToString(...color),
               rgb: color,
            }

            setColorData({ data: data[mode], error: undefined, loading: false })
            img.remove()
         } catch (error) {
            return setColorData({
               data: undefined,
               error: (error as Error).message,
               loading: false,
            })
         }
      }

      getColor()
   }, [image, mode, quality])

   return {
      data: ColorData.data,
      error: ColorData.error,
      loading: ColorData.loading,
   }
}

type usePaletteState = {
   data: undefined | RGBColor[] | string[]
} & defaultState

export const usePalette = ({ image, mode, quality }: ThiefHooksProps) => {
   const [ColorData, setColorData] = useState<usePaletteState>({
      data: undefined,
      error: undefined,
      loading: true,
   })

   useEffect(() => {
      const getPalette = async () => {
         if (!image)
            return setColorData({
               data: undefined,
               error: 'Цвет отсутствует',
               loading: false,
            })

         try {
            const img = await loadImage(image)
            let Colors = ColorModule.getPalette(img)
            if (!Colors) throw new Error('Не удалось получить цвет')

            Colors = Colors.sort((color) => -calculateBrightness(...color))

            const data: Record<ColorMode, string[] | RGBColor[]> = {
               hex: Colors.map((color) => rgbToHex(...color)),
               rgbString: Colors.map((color) => rgbToString(...color)),
               rgb: Colors,
            }

            setColorData({ data: data[mode], error: undefined, loading: false })
            img.remove()
         } catch (error) {
            return setColorData({
               data: undefined,
               error: (error as Error).message,
               loading: false,
            })
         }
      }

      getPalette()
   }, [image, mode, quality])

   return {
      data: ColorData.data,
      error: ColorData.error,
      loading: ColorData.loading,
   }
}
