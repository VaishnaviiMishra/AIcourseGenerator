import Link from "next/link";
import React from "react";
import SignInButton from "./SignInButton";
import { getAuthSession } from "../lib/auth";
import UserAccountNav from "./UserAccountNav";
import { ThemeToggle } from "./ThemeToggle";

type Props = {};

const Navbar = async (props: Props) => {
  const session = await getAuthSession();
  
  return (
    <nav className="fixed inset-x-0 top-0 bg-white/80 dark:bg-gray-700/80 backdrop-blur-md z-[10] h-fit border-b border-pink-400 dark:border-white-800 py-3">
      <div className="flex items-center justify-between h-full gap-4 px-4 mx-auto sm:px-6 max-w-7xl">
        {/* Logo/Brand */}
        <Link 
          href="/" 
          className="flex items-center gap-2 group transition-all duration-200"
        >
          <p className="rounded-lg border-2 border-b-4 border-r-4 border-pink-500 dark:border-white px-3 py-1 text-xl font-bold text-primary-600 dark:text-primary-400 transition-all hover:-translate-y-[2px] hover:shadow-md active:translate-y-0 active:shadow-none">
            StudyWithNotes
          </p>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="/gallery" 
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Gallery
            </Link>
            
            {session?.user && (
              <>
                <Link 
                  href="/create" 
                  className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Create Course
                </Link>
                <Link 
                  href="/settings" 
                  className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Settings
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle className="h-8 w-8 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors" />
            
            <div className="h-8 border-l border-zinc-200 dark:border-zinc-700 mx-1" />
            
            <div className="flex items-center">
              {session?.user ? (
                <UserAccountNav user={session.user} />
              ) : (
                <div className="px-3 py-1.5 text-sm font-medium rounded-md bg-slate-800 hover:bg-primary-700 text-white transition-colors">
                  <SignInButton />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;