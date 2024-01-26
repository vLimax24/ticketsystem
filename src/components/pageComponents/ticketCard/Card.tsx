'use client'
import { useState, useEffect } from 'react'
import LoginTip from './loginTip/LoginTip'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useSession } from 'next-auth/react'

export function CardForm() {
    const [projectId, setProjectId] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [description, setDescription] = useState("")
    const [relevance, setRelevance] = useState("")
    const [sender, setSender] = useState("")
    const [error, setError] = useState([])
    const [message, setMessage] = useState("")

    const { data: session, status }: { data: any, status: string } = useSession();

    const senderEmail = session?.user?.email || ''


    const handleSubmit = async (e:any) => {
        e.preventDefault();

    
        const res = await fetch('api/issues', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            projectId: projectId,
            name: name,
            description: description,
            relevance: relevance,
            email: email,
            senderEmail: senderEmail,
          }),
        });
        const { msg } = await res.json();
        setMessage(msg); // Set the message based on the response
    
        if (res.ok) {
          setMessage("Form submitted successfully!"); // Success message
        } else {
          setMessage("Error submitting form"); // Error message
        }
    
        setProjectId("");
        setName("");
        setDescription("");
        setRelevance("");
        setEmail("");
      };
  return (
    <>
    
      <div className='flex flex-col'>
        <div className='mb-5'>
          <LoginTip />
        </div>
        <Card className="w-[500px]">
          <CardHeader>
            {message && (
                <div
                className={`${
                    message === "Form submitted successfully!"
                    ? "bg-green-500 text-white bg-opacity-40 border-2 border-green-500 p-3 mb-5 opacity-90"
                    : "bg-red-500 text-white bg-opacity-40 border 2 border-red-500 p-3 mb-5 opacity-90"
                } p-2 rounded-md`}
                >
                    {message}
                </div>
            )}
            <CardTitle>Report your Issue</CardTitle>
            <CardDescription>Tell me if you have a problem on your project</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="client">ProjectID</Label>
                  <Input id="client" placeholder="ID of your project" onChange={(e) => setProjectId(e.target.value)} value={projectId}/>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Name of your project" onChange={(e) => setName(e.target.value)} value={name}/>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email of the Recipiant</Label>
                  <Input id="name" placeholder="Enter the Email of your recipiant" onChange={(e) => setEmail(e.target.value)} value={email}/>
                </div>
                <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Type your message here." onChange={(e) => setDescription(e.target.value)} value={description}/>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Relevance</Label>
                  <Select onValueChange={(value) => setRelevance(value)}>
                    <SelectTrigger id="framework">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="major">Major</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="minor">Minor</SelectItem>
                      <SelectItem value="trivial">Trivial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button className="w-full" type='submit' onClick={handleSubmit}>Report Issue</Button>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}

export default CardForm
