'use client';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Modal from './modal';
import Input from '../inputs/Input';
import Image from 'next/image';
import { CldUploadButton } from 'next-cloudinary';
import Button from '../button';

interface SettingsModalProps {
    currentUser?: User | null;
    isOpen?: boolean;
    onClose: () => void;
}

export default function settingsModal({ currentUser, isOpen, onClose}: SettingsModalProps) {
    
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);
    const { register, handleSubmit, setValue, watch } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser?.name,
            image: currentUser?.image,
        }
    })

    const image = watch('image');
    const handleUpload = (result : any) => {
        setValue('image', result?.info?.secure_url, { shouldValidate: true });
    }
    const onSubmit : SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        axios.post('/api/settings', data)
            .then(() => {
                router.refresh();
                onClose();
            })
            .catch((err) => {
                toast.error('Something went wrong!');
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray 900">
                            Profile
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray 600">
                            Edit your profile details.
                        </p>
                        <div className="mt-10 flex flex-col gap-y-8">
                            <Input
                                disabled={isLoading}
                                label='Name'
                                id='name'
                                required
                                register={register}
                            />
                            <div>
                                <label htmlFor="" className="block text-sm font-medium leading-6 text-gray 900">
                                    Photo
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    <Image
                                        alt="avatar"
                                        width='48'
                                        height='48'
                                        className="rounded-full"
                                        src={image || currentUser?.image || '/images/placeholder.jpg'}
                                    />
                                    <CldUploadButton
                                        options={{ maxFiles: 1 }}
                                        onUpload={handleUpload}
                                        uploadPreset='zhed3thj'
                                    >
                                        <Button
                                            type='button'
                                            disabled={isLoading}
                                            secondary
                                        >
                                            Change
                                        </Button>
                                    </CldUploadButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-3">
                        <Button
                            secondary
                            type='button'
                            disabled={isLoading}
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            type='submit'
                            disabled={isLoading}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    )
}
