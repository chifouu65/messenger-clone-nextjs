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
    disabled?: boolean;
}

export default function Input({
                                  label,
                                  id,
                                  type,
                                  required,
                                  register,
                                  disabled
                              }: InputProps) {
    return (
        <div>
            <label
                className={'block text-sm font-medium text-gray-700 mb-2'}
                htmlFor={id}>
                {label}
            </label>
            <div>
                <input
                    id={id}
                    type={type}
                    autoComplete={id}
                    disabled={disabled}
                    {...register(id, {required})}
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
                        focus:ring-inset
                        focus:ring-indigo-500
                        sm:text-sm
                        sm:leading-5
                    `,
                        disabled && "opacity-50 cursor-not-allowed"
                    )}
                />
            </div>
        </div>
    )
}
