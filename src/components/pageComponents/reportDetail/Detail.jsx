import React from "react";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter, } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Detail = () => {
    return (
        <div className="grid grid-cols-4 gap-2">
            <div className="grid col-span-2 col-start-2">
                <div className="grid grid-cols-3 gap-2">
                    <div className="grid col-span-2 p-1 bg-green-500">
                        <div className="grid grid-cols-3">
                            <div className="grid col-span-2">
                                <div className="w-full mx-6 my-10 overflow-hidden">
                                    
                                </div>
                                <Card className="w-full mx-6 my-10 overflow-hidden">
                                    <CardHeader>
                                        <CardTitle>ProguardSeo</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid w-full items-center gap-4">
                                            <div>
                                                <Label htmlFor="status">Priority</Label>
                                                <CardDescription>Priority</CardDescription>
                                            </div>
                                            <div>
                                                <Label htmlFor="name">Relevance</Label>
                                                <CardDescription>Critical</CardDescription>
                                            </div>
                                            <div>
                                                <Label htmlFor="name">Project ID</Label>
                                                <CardDescription>2345345345</CardDescription>
                                            </div>
                                            <div>
                                                <Label htmlFor="name">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger>
                                                            <Button variant="outline">In Progress</Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent>
                                                            <DropdownMenuItem>In Progress</DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem>Finished</DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem>Started</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </Label>
                                            </div>
                                            <div className="flex flex-col space-y-1.5">
                                                <Label htmlFor="name">Description</Label>
                                                <CardDescription className="">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque doloribus illo obcaecati. Iste neque, iusto modi provident exercitationem id eligendi sed quidem quasi, nobis alias magnam, officia dolore quisquam. Facere.</CardDescription>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                    <div className="bg-green-500 p-1">
                        <div className="w-full mx-6 my-10">
                            <div className="p-3">
                                <Button className="w-full">Mark as Done</Button>
                                <Button className="w-full mt-3">Reassign Task</Button>
                                <Button className="w-full mt-3" variant={'outline'}>Delete Task</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail