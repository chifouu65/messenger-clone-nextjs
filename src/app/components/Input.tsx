import React from 'react'
import clsx from 'clsx'
import { 
    FieldValues,
    FieldError,
    UseFormRegister,
} from 'react-hook-form'

interface InputProps {
    label: string;
    id: string;
    type?: string;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors?: FieldError;
    disabled?: boolean;
}

export default function Input({
    label,
    id,
    type,
    required,
    register,
    errors,
    disabled
}: InputProps) {
    
    return (
        <div>
            <label htmlFor={id}>
                {label}
            </label>
            <div>
                <input
                    id={id}
                    type={type}
                    autoComplete={id}
                    disabled={disabled}
                    {...register(id, { required })}
                    className={clsx(`
                        form-input
                        block
                        w-full
                        rounded-md
                        border-0
                        py-1.5
                        text-gray-900
                        shadow-sm
                        ring-1
                        ring-inset
                        ring-gray-200
                        placeholder:text-gray-400
                        focus:ring-2
                        focus:ring-insset
                        focus:ring-indigo-500
                        sm:text-sm
                        sm:leading-5
                    `,
                    errors?[id] && "focus:ring-red-500": "focus:ring-indigo-500",
                    disabled && "opacity-50 cursor-not-allowed"
                    )}
                />
            </div>
        </div>
    )
}
