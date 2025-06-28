import Link from 'next/link'
import React from 'react'

const NavigationLink = ({ href, children }) => {
    return (
        <Link href={href} className="text-blue-600 hover:underline">
            {children}
        </Link>
    )
}

export default NavigationLink