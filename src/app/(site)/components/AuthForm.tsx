'use client'
import React, {useCallback} from 'react'
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form'
import Input from '@/app/components/Input'
import Button from '@/app/components/button'
import AuthSocialButton from "@/app/(site)/components/AuthSocialButton";
import {BsGithub, BsGoogle} from "react-icons/bs";

export default function AuthForm() {
    type Variant = 'LOGIN' | 'REGISTER'
    const [variant, setVariant] = React.useState<Variant>('LOGIN')
    const [isLoading, setIsLoading] = React.useState(false)

    const toggleVariant = useCallback(() => {
        setVariant((prev) => prev === 'LOGIN' ? 'REGISTER' : 'LOGIN')
    }, [setVariant])

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true)
        if (variant === 'LOGIN') {
            // NextAuth Login

        }

        if (variant === 'REGISTER') {
            // NextAuth Register

        }
    }

    const socialAction = (acion: string) => {
        setIsLoading(true)

        //NextAuth Social Login
    }
    return (
        <>
            <h2 className="text-2xl font-bold">
                {variant === 'LOGIN' ? 'Login to your account' : 'Register a new account'}{' '}
            </h2>
            <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
                {variant === 'REGISTER' && (
                    <Input
                        label='Name'
                        id='name'
                        type='name'
                        register={register}
                        // @ts-ignore
                        errors={errors}
                        disabled={isLoading}
                    />
                )}
                <Input
                    label='Email Address'
                    id='email'
                    type='email'
                    register={register}
                    // @ts-ignore
                    errors={errors}
                    disabled={isLoading}
                />
                <Input
                    label='Password'
                    id='password'
                    type='password'
                    register={register}
                    // @ts-ignore
                    errors={errors}
                    disabled={isLoading}
                />

                <div className='flex flex-col justify-between items-center pt-2 gap-2'>
                    <Button
                        type='submit'
                        fullWidth
                        disabled={isLoading}
                    >
                        {variant === 'LOGIN' ? 'Login' : 'Register'}
                    </Button>
                    <p className='text-sm text-gray-500'>
                        or continue with
                    </p>
                    <div className='flex justify-center items-center gap-2 w-full'>
                        <AuthSocialButton
                            onClick={() => socialAction('google')}
                            icon={BsGoogle}
                        />
                        <AuthSocialButton
                            onClick={() => socialAction('github')}
                            icon={BsGithub}
                        />
                    </div>
                </div>

                <div className='flex justify-between items-center pt-2 gap-2'>
                    <p>
                        {variant === 'LOGIN' ? "Don't have an account?" : "Already have an account?"}
                    </p>
                    <button
                        type='button'
                        className='text-indigo-500 hover:text-indigo-600'
                        onClick={toggleVariant}
                    >
                        {variant === 'LOGIN' ? 'Register' : 'Login'}
                    </button>
                </div>

            </form>
        </>
    )
}
