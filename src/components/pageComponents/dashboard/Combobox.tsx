"use client";

import * as React from "react";
import { useState } from 'react'
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"];

enum SelectedItem {
  INITIATED = "INITIATED",
  PROGRESS = "PROGRESS",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
  HOLD = "HOLD",
}

export default function Combobox({ reportId }: { reportId: string }) {
    const [selectedItem, setSelectedItem] = React.useState<SelectedItem | null>(null);
  
    const handleItemClick = (item: SelectedItem) => {
      setSelectedItem(item === selectedItem ? null : item);
    };
  
    const updateStatus = React.useCallback(async () => {
      try {
        const statusToUpdate = selectedItem;
        const response = await fetch(`/api/updateStatus/${reportId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ statusToUpdate }),
          });
  
        if (response.ok) {
          const result = await response.json();
          console.log(result.message);
        } else {
          console.error('Error updating status:', response.statusText);
        }
      } catch (error) {
        console.error('Error updating status:', error);
      }
    }, [selectedItem, reportId]);
  
    React.useEffect(() => {
      if (selectedItem !== null) {
        updateStatus();
      }
    }, [selectedItem, updateStatus]);
  

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full">
          {"Change Status"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        <DropdownMenuCheckboxItem
          checked={selectedItem === SelectedItem.INITIATED}
          onCheckedChange={() => handleItemClick(SelectedItem.INITIATED)}
        >
          Initiated
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedItem === SelectedItem.PROGRESS}
          onCheckedChange={() => handleItemClick(SelectedItem.PROGRESS)}
        >
          In Progress
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedItem === SelectedItem.CANCELLED}
          onCheckedChange={() => handleItemClick(SelectedItem.CANCELLED)}
        >
          Cancelled
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedItem === SelectedItem.COMPLETED}
          onCheckedChange={() => handleItemClick(SelectedItem.COMPLETED)}
        >
          Completed
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={selectedItem === SelectedItem.HOLD}
          onCheckedChange={() => handleItemClick(SelectedItem.HOLD)}
        >
          On Hold
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
