'use client';

import { type } from 'os';
import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface Props {
  id: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors
}

export default function MessageInput({
  id,
  placeholder,
  type,
  required,
  register,
  errors
}: Props) {

  return (
    <div className='relative w-full'>
      <input
        id={id}
        type={type}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className='
          w-full
          text-black
          font-light
          py-2
          px-4
          bg-neutral-100
          rounded-full
          focus:outline-none
        '
      />
    </div>
  )
}
