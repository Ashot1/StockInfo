import * as React from 'react'
import { Slot, SlotProps } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/utils'
import { motion, MotionProps } from 'framer-motion'
import { RefAttributes } from 'react'

const buttonVariants = cva(
   'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
   {
      variants: {
         variant: {
            default:
               'bg-primary text-primary-foreground shadow hover:bg-primary/90',
            destructive:
               'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
            outline:
               'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
            secondary:
               'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
            ghost: 'hover:bg-accent hover:text-accent-foreground',
            link: 'text-primary underline-offset-4 hover:underline',
         },
         size: {
            default: 'h-9 px-4 py-2 text-xs 300p:text-sm',
            sm: 'h-8 rounded-md px-3 text-xs',
            lg: 'h-10 rounded-md px-8',
            icon: 'h-9 w-9',
         },
      },
      defaultVariants: {
         variant: 'default',
         size: 'default',
      },
   }
)

export interface ButtonProps
   extends Omit<
         SlotProps & RefAttributes<HTMLButtonElement> & MotionProps,
         'ref'
      >,
      VariantProps<typeof buttonVariants> {
   asChild?: boolean
   disabled?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
   ({ className, variant, size, asChild = false, ...props }, ref) => {
      const Comp = asChild ? motion(Slot) : motion.button
      return (
         <Comp
            whileTap={{ scale: 0.9 }}
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
         />
      )
   }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
