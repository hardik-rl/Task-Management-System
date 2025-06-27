import React from 'react'
import { cn } from './utils'

const Button = ({ children, disabled, onClick, className }) => {
    return (
        <button
            onClick={onClick}
            type="submit"
            disabled={disabled}
            className={cn(className, "w-full cursor-pointer bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-60")}
        >
            {children}
        </button>
    )
}

export default Button