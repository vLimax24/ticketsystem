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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Send } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea';



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
      <h1 className="text-xl md:text-[1rem] lg:text-[2rem] font-bold h-fit mb-3 flex flex-col">Comments</h1>
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
        <SheetContent className='overflow-y-auto pl-0 pr-0 pb-0'>
          <SheetHeader className='pl-6'>
            <SheetTitle>
              <h1 className="text-xl md:text-[1rem] lg:text-[2rem] font-bold h-fit mb-5">Comments</h1>
            </SheetTitle>
          </SheetHeader>
          <div className='pl-6 pr-5'> {/* Adjusted margin */}
            {commentsData.map((comment) => (
              <Comment key={comment.id} {...comment} />
            ))}
          </div>
          <Card className='w-full p-5 flex flex-col mt-3 sticky bottom-0'> {/* Adjusted padding */}
              <Input placeholder="Write a new comment..." className='w-full'/>
              <Button className="mt-4">Send <Send size={15} className='ml-2'/></Button> {/* Adjusted margin */}
          </Card>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CommentSection;
