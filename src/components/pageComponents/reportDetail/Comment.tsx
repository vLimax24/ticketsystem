// components/Comment.js
import React from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

const Comment = ({ content }: any) => {
  const { data: session } = useSession();

  return (
    <div className="border border-solid border-gray-300 p-4 mb-4 rounded-md shadow-md">
      <div className="flex justify-between items-center mb-2">
        <Image
          src={session?.user?.image || '/public/logo.svg'}
          alt=""
          width={20}
          height={20}
          className="rounded-full"
        />
        <strong>{session?.user?.name || 'Anonymous'}</strong>
        <div className="flex items-center">
          <AiOutlineEye className="text-gray-600" />
        </div>
      </div>
      <div className="text-gray-700">{content}</div>
    </div>
  );
};

export default Comment;
