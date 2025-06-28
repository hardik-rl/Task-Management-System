import React from 'react'

const HeadingLg = ({ text }) => {
    return (
        <h1 className="md:text-3xl text-xl font-bold text-center text-blue-600 mb-6">
            {text}
        </h1>
    )
}

export default HeadingLg