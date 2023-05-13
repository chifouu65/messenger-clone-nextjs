'use client';

import { User } from "@prisma/client";
import Image from "next/image";
import useActiveList from "../hooks/useActiveList";

interface AvatarProps {
   currentUser?: User | null;
};

const Avatar: React.FC<AvatarProps> = ({ currentUser }) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(currentUser?.email!) !== -1;

  return (
    <div className="relative">
      <div className="
        relative 
        inline-block 
        rounded-full 
        overflow-hidden
        h-9 
        w-9 
        md:h-11 
        md:w-11
      ">
        <Image
          fill
          src={currentUser?.image || '/images/placeholder.jpg'}
          alt="Avatar"
        />
      </div>
      {isActive && (
        <span 
            className={`
              absolute 
              block 
              rounded-full 
              ring-2 
              ring-white 
              top-0 
              right-0
              h-2 
              w-2 
              md:h-3 
              md:w-3
              bg-green-500
            `
            }
        />
      )}
    </div>
  );
}

export default Avatar;