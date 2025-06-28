"use client";

import React from "react";

export default function FormControl({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    required = false,
    error,
}) {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-1">
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${error ? "border-red-500 focus:ring-red-300" : "focus:ring-blue-300"
                    }`}
            />
            {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
    );
}
