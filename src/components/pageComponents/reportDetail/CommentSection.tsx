import React, { useState, useEffect } from 'react';
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
import { useSelector } from 'react-redux'
import idSlice from '@/redux/slices/idSlice';

const CommentSection = () => {
  const [showAllComments, setShowAllComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [commentsData, setCommentsData] = useState([]);
  const id = useSelector((state: any) => state.id.id)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/getComments/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        const data = await response.json();
        setCommentsData(data.comments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [id]);

  const handleSendComment = async () => {
    const test = JSON.stringify({ input: newComment, id: id })
    try {
      const response = await fetch('/api/comments', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: newComment, id: id }),
      });


      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      // After successfully adding a comment, fetch the updated comments
      const updatedResponse = await fetch(`/api/getComments/${id}`);
      if (!updatedResponse.ok) {
        throw new Error('Failed to fetch updated comments');
      }
      const updatedData = await updatedResponse.json();
      setCommentsData(updatedData.comments);

      setNewComment('');
    } catch (error) {
      console.error('Error sending comment:', error);
    }
  };

  const displayedComments = showAllComments ? commentsData : commentsData.slice(0, 2);
  const hiddenCommentsCount = commentsData.length - displayedComments.length;


  return (
    <div>
      <h1 className="text-xl md:text-[1rem] lg:text-[2rem] font-bold h-fit mb-3 flex flex-col">Comments</h1>
      {displayedComments.map((comment, index) => (
        <Comment key={index} content={comment} />
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
            {commentsData.map((comment, index) => (
              <Comment key={index} content={comment} />
            ))}
          </div>
          <Card className='w-full p-5 flex flex-col mt-3 sticky bottom-0'> {/* Adjusted padding */}
              <Input 
                placeholder="Write a new comment..." 
                className='w-full'
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button className="mt-4" onClick={handleSendComment}>Send <Send size={15} className='ml-2'/></Button> {/* Adjusted margin */}
          </Card>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CommentSection;
