import React, { useState } from 'react';
import Comment from './Comment';
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


const commentsData = [
  {
    id: 1,
    author: 'John Doe',
    content: 'This is an awesome comment! This is an awesome comment!This is an awesome comment!This is an awesome comment!',
    likes: 5,
  },
  {
    id: 2,
    author: 'Jane Smith',
    content: 'I totally agree with John!',
    likes: 3,
  },
  {
    id: 3,
    author: 'Jane Smith',
    content: 'I totally agree with John!',
    likes: 3,
  },
  {
    id: 4,
    author: 'Jane Smith',
    content: 'I totally agree with John!',
    likes: 3,
  },
  {
    id: 4,
    author: 'Jane Smith',
    content: 'I totally agree with John!',
    likes: 3,
  },
  {
    id: 4,
    author: 'Jane Smith',
    content: 'I totally agree with John!',
    likes: 3,
  },
  {
    id: 4,
    author: 'Jane Smith',
    content: 'I totally agree with John!',
    likes: 3,
  },
  {
    id: 4,
    author: 'Jane Smith',
    content: 'I totally agree with John!',
    likes: 3,
  },
  {
    id: 4,
    author: 'Jane Smith',
    content: 'I totally agree with John!',
    likes: 3,
  },
  {
    id: 4,
    author: 'Jane Smith',
    content: 'I totally agree with John!',
    likes: 3,
  },
  {
    id: 4,
    author: 'Jane Smith',
    content: 'I totally agree with John!',
    likes: 3,
  },
  {
    id: 4,
    author: 'Jane Smith',
    content: 'I totally agree with John!',
    likes: 3,
  },
  {
    id: 4,
    author: 'Jane Smith',
    content: 'I totally agree with John!',
    likes: 3,
  },


  // Add more comments as needed
];

const CommentSection = () => {
  const [showAllComments, setShowAllComments] = useState(false);
  const displayedComments = showAllComments ? commentsData : commentsData.slice(0, 2);
  const hiddenCommentsCount = commentsData.length - displayedComments.length;

  return (
    <div>
      <h1 className="text-xl md:text-[1rem] lg:text-[2rem] font-bold h-fit mb-5 flex flex-col">Comments</h1>
      {displayedComments.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
      {hiddenCommentsCount > 0 && !showAllComments && (
        <p className="text-gray-500 mt-2">
          {`+ ${hiddenCommentsCount} more comments `}
        </p>
      )}
    <Sheet>
      <SheetTrigger asChild>
        <Button className='w-full mt-3' variant={'outline'}>
          View all comments
        </Button>
      </SheetTrigger>
      <SheetContent className='overflow-y-auto'>
        <SheetHeader>
          <SheetTitle>
            <h1 className="text-xl md:text-[1rem] lg:text-[2rem] font-bold h-fit mb-5">Comments</h1>
          </SheetTitle>
          <div>
          {commentsData.map((comment) => (
            <Comment key={comment.id} {...comment} />
          ))}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>

    </div>
  );
};

export default CommentSection;
