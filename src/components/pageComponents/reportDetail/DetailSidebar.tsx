import React, { useContext, createContext, useState } from "react";
import { MoreVertical } from "lucide-react";

import { useSession } from 'next-auth/react';
import Image from 'next/image';

interface SidebarContextProps {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultSidebarContext: SidebarContextProps = {
  expanded: true,
  setExpanded: () => {},
};

const SidebarContext = createContext<SidebarContextProps>(defaultSidebarContext);

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  const { data: session, status }: { data: any, status: string } = useSession();

  return (
    <aside className=" text-black left-0 transition-all duration-300" onMouseEnter={() => setExpanded(true)} onMouseLeave={() => setExpanded(false)}>
      <nav className="flex flex-col bg-transparent shadow-sm transition-all duration-300">
        <SidebarContext.Provider value={{ expanded, setExpanded }}>
          <ul className="px-3 h-[71vh] transition-all duration-300">{children}</ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert, action }: any) {
  const { expanded, setExpanded }: SidebarContextProps = useContext(SidebarContext);

  const handleClick = () => {
    setExpanded(false);
    action && action();
  };

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        group max-h-11
        transition-all duration-300
        ${active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-black" : "hover:bg-indigo-50 text-gray-600"}
      `}
      onClick={handleClick}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${expanded ? "ml-3" : "w-0"}`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`}
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
