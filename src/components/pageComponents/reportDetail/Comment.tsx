// components/Comment.js
import React from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

const Comment = ({ content }: any) => {
  const { data: session } = useSession();

  return (
    <div className="py-4 border-b border-slate-800">
      <div className="flex items-center mb-2">
        <Image
          src={session?.user?.image || '/public/logo.svg'}
          alt=""
          width={20}
          height={20}
          className="rounded-full mr-2"
          draggable='false'
        />
        <strong>{session?.user?.name || 'Anonymous'}</strong>
      </div>
      <div className="text-gray-700 max-w-[250px]">{content}</div>
    </div>
  );
};

export default Comment;
