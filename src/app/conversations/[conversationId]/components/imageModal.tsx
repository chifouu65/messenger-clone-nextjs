"use client";
import Modal from '@/app/components/modals/modal';
import Image from 'next/image';
import React from 'react'

interface Props {
    isOpen: boolean;
    onClose: () => void;
    src: string;
}

export default function ImageModal({ isOpen, onClose, src }: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-full h-full flex justify-center">
        <Image
          alt="image full"
          src={src}
          width={500}
          height={500}
          className="object-cover"
        />
      </div>
    </Modal>
  )
}
