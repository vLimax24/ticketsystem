import React, { useContext, createContext, useState } from "react";
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"


interface SidebarContextProps {
  expanded: boolean;
}

const defaultSidebarContext: SidebarContextProps = {
  expanded: true,
};

const SidebarContext = createContext<SidebarContextProps>(defaultSidebarContext);

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  const { data: session, status }: { data: any, status: string } = useSession()

  return (
    <aside className=" text-black left-0">
      <nav className="flex flex-col bg-transparent shadow-sm">
        <div className="p-4 pb-2 flex justify-end items-center">
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg text-gray-600 hover:bg-opacity-50 hover:bg-gray-50"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="flex p-3">
          <Image
            src={session?.user?.image}
            alt=""
            className="w-10 h-10 rounded-md"
            width={40}
            height={40}
            draggable="false"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold text-white">{session?.user?.name}</h4>
              <span className="text-xs text-gray-600">{session?.user?.email}</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert, action }: any) {
  const { expanded }: SidebarContextProps = useContext(SidebarContext);

  return (
    <li
      className={`
      relative flex items-center py-2 px-3 my-1
      font-medium rounded-md cursor-pointer
      transition-colors group max-h-11
      ${
        active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-black"
          : "hover:bg-indigo-50 text-gray-600"
      }
  `}
  onClick={action}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          // expanded ? "w-52 ml-3" : "w-0"
          expanded ? "ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
