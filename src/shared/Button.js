import React from 'react'
import { cn } from './utils'

const Button = ({ children, disabled, onClick, className, type }) => {
    return (
        <>
            <style jsx>{`
        @keyframes buzz {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-2px); }
          50% { transform: translateX(2px); }
          75% { transform: translateX(-2px); }
        }

        .buzz:hover {
          animation: buzz 0.3s linear;
        }
      `}</style>

            <button
                onClick={onClick}
                type={type}
                disabled={disabled}
                className={cn(
                    className,
                    `w-full text-sm cursor-pointer bg-[#1976d2] text-white py-2 rounded-md hover:bg-[#0d47a1] transition disabled:opacity-60 buzz`
                )}>
                {children}
            </button>
        </>
    )
}

export default Button