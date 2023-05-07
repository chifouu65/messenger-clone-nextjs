'use client'
import React, { useCallback } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Input from '@/app/components/Input'
import Button from '@/app/components/button'

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

    const onSubmit : SubmitHandler<FieldValues> = async (data) => {
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
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>

                {variant === 'REGISTER' && (
                    <Input 
                        label='email' 
                        id='email'
                        type='email'
                        register={register}
                        errors={errors}
                    />     
                )}

                <Input
                    label='Email Address'
                    id='email'
                    type='email'              
                    register={register}
                    errors={errors}
                />

                <Input
                    label='Password'
                    id='password'
                    type='password'
                    register={register}
                    errors={errors}
                />

                <div className='flex justify-between items-center'>
                    <Button
                        type='submit'
                        fullWidth
                        disabled={isLoading}
                    >
                        {variant === 'LOGIN' ? 'Login' : 'Register'}
                    </Button>
                </div>
            </form>
        </div>
    )
}
