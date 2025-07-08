import { cn } from "../lib/utils";
import { Chapter, Course, Unit } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { Separator } from "./ui/separator";
import { ChevronRight } from "lucide-react";

type Props = {
  course: Course & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
  currentChapterId: string;
};

const CourseSideBar = async ({ course, currentChapterId }: Props) => {
  return (
    <div className="w-[320px] mt-8 absolute ml-5 p-6 rounded-xl bg-background border border-border shadow-lg">
      <h1 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b border-border">
        {course.name}
      </h1>
      
      <div className="space-y-6">
        {course.units.map((unit, unitIndex) => {
          return (
            <div key={unit.id} className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {unitIndex + 1}
                </div>
                <h2 className="text-lg font-semibold text-foreground">
                  {unit.name}
                </h2>
              </div>
              
              <div className="ml-10 space-y-2">
                {unit.chapters.map((chapter, chapterIndex) => {
                  const isActive = chapter.id === currentChapterId;
                  return (
                    <Link
                      key={chapter.id}
                      href={`/course/${course.id}/${unitIndex}/${chapterIndex}`}
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-md transition-colors hover:bg-accent",
                        {
                          "bg-primary/10 text-primary font-medium": isActive,
                          "text-muted-foreground": !isActive,
                        }
                      )}
                    >
                      {isActive && (
                        <ChevronRight className="h-4 w-4 text-primary" />
                      )}
                      <span>{chapter.name}</span>
                    </Link>
                  );
                })}
              </div>
              
              {unitIndex < course.units.length - 1 && (
                <Separator className="my-4 bg-border" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseSideBar;