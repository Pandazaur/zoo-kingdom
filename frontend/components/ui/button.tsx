import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import styles from './button.module.css'
import { grandstander } from '@/lib/fonts'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
    `inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 
    focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`,
    {
        variants: {
            variant: {
                default: `bg-amber-400 text-primary-foreground border-2 border-black ${styles.default} ${grandstander.className}`,
                // pending: `bg-gray-200 text-primary-foreground border-2 border-gray-500 text-gray-500 cursor-wait ${grandstander.className}`,
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 px-3 rounded-lg text-xs',
                lg: 'h-11 px-8',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
    isPending?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button'
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
                disabled={props.isPending || props.disabled}
            />
        )
    },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
