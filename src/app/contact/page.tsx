'use client'
import { useState } from 'react'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function Contact() {
    const [projectId, setProjectId] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [description, setDescription] = useState("")

    const handleSubmit = async (e:any) => {
        e.preventDefault();
    
        setProjectId("");
        setName("");
        setDescription("");
        setEmail("");
      };
  return (
    <div className='flex justify-center items-center mt-20'>
            <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Want to get in touch with us?</CardTitle>
        <CardDescription>Hit me up with a message!</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
              <Label htmlFor="client">Name</Label>
              <Input id="client" placeholder="John Doe" onChange={(e) => setProjectId(e.target.value)} value={projectId}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="name" placeholder="johndoe@gmail.com" onChange={(e) => setEmail(e.target.value)} value={email}/>
            </div>
            <div>
                <Label htmlFor="description">Message</Label>
                <Textarea id="description" placeholder="I want to start a big project with you!" onChange={(e) => setDescription(e.target.value)} value={description}/>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button className="w-full" type='submit' onClick={handleSubmit}>Submit</Button>
      </CardFooter>
    </Card>
    </div>
  )
}

export default Contact
