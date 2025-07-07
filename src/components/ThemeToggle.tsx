"use client";

import * as React from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

export function ThemeToggle({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { setTheme } = useTheme();

  return (
    <div className={className} {...props}>
     <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button 
      variant="ghost" 
      size="icon"
      className="h-9 w-9 p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors focus-visible:ring-1 focus-visible:ring-ring"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-zinc-700 dark:text-zinc-300" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-zinc-700 dark:text-zinc-300" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent 
    align="end"
    className="mt-1 border border-zinc-200 dark:border-zinc-700 shadow-lg"
  >
    <DropdownMenuItem 
      onClick={() => setTheme("light")}
      className="cursor-pointer focus:bg-zinc-100 dark:focus:bg-zinc-800"
    >
      <Sun className="mr-2 h-4 w-4" />
      Light
    </DropdownMenuItem>
    <DropdownMenuItem 
      onClick={() => setTheme("dark")}
      className="cursor-pointer focus:bg-zinc-100 dark:focus:bg-zinc-800"
    >
      <Moon className="mr-2 h-4 w-4" />
      Dark
    </DropdownMenuItem>
    <DropdownMenuItem 
      onClick={() => setTheme("system")}
      className="cursor-pointer focus:bg-zinc-100 dark:focus:bg-zinc-800"
    >
      <Monitor className="mr-2 h-4 w-4" />
      System
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
    </div>
  );
}