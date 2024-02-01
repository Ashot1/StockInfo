import { ReactNode } from 'react'
import { nunito, raleway, tektur } from '@/utils/fonts'

export default function PageTitle({
    children,
    animated = true,
}: {
    children: ReactNode
    animated?: boolean
}) {
    return (
        <p
            className={`text-lg 300p:text-xl mb-6 ${raleway.className}${
                animated ? ' animate-appearance' : ''
            }`}
        >
            {children}
        </p>
    )
}
