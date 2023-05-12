'use client';
import Input from '@/app/components/inputs/Input';
import Modal from '@/app/components/modals/modal';
import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Select from '@/app/components/inputs/select';
import Button from '@/app/components/button';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
}

export default function GroupChatModal({isOpen, onClose, users}: Props) {

    const router = useRouter();
    const [isLoaded, setIsLoaded] = React.useState(false);

    const {register, handleSubmit, setValue, watch, formState: { errors }} = useForm<FieldValues>({
        defaultValues: {
            name: '',
            members: []
        }
    });

    const members = watch('members');
    const onSubmit : SubmitHandler<FieldValues> = async (data) => {
      setIsLoaded(true);
    console.log(data);
      
      if (members.length < 2) {
        toast.error('Please select at least 2 members.');
        setIsLoaded(false);
        return;
      } else {
        axios.post('/api/conversations', {
          ...data,
          isGroup: true
        })
        .then(() => {
          router.refresh();
        })
        .catch(() => toast.error('Error creating group chat. Please try again.'))
        .finally(() => {
          setIsLoaded(false);
          onClose();
          toast.success(`Group chat (${data.name}) created successfully.`);
        })
      }
    }
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-bold text-neutral-900 leading-7">
                Create a group chat
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Group chats are great for planning events, or chatting with friends or family.
              </p>
              <div className="mt-10 flex flex-col gap-y-8">
                <Input
                  register={register}
                  label="Group name"
                  id="name"
                  disabled={isLoaded}
                  errors={errors}
                  required
                />
                <Select
                  disabled={isLoaded}
                  label="Members"
                  options={users.map((user) => ({
                    value: user.id,
                    label: user.name
                  }))}
                  value={members}
                  onChange={(value) => setValue('members', value, {shouldValidate: true})}
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-center gap-x-6">
            <Button
              type='button'
              onClick={onClose}
              disabled={isLoaded}
              secondary
            >
              Cancel
            </Button>
            <Button
              type='submit'
              disabled={isLoaded}
            >
              Create
            </Button>
          </div>
        </form>
      </Modal>
    )
}
