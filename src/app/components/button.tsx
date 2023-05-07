'use client';
import clsx from "clsx";
import React from 'react'

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

export default function Button({
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled
} : ButtonProps ) {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={clsx(`
          flex
          justify-center
          rounded-md
          px-3
          py-2
          text-sm
          font-semibold
          focus-visible:outline
          focus-visible:outline-2
          focus-visible:outline-offset-2
          `,
          disabled && 'opacity-50 cursor-default',
          fullWidth && 'w-full',
          secondary ? 'text-gray-900' : 'text-white',
          danger&& 'bg-red-500 hover:bg-red-600 focus-visible:ring-red-500',
          !secondary && !danger && 'bg-blue-500 hover:bg-blue-600 focus-visible:ring-blue-500'
        )}
      >
        {children}
      </button>
    )
}
