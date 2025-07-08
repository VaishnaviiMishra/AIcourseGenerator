import CourseSideBar from "@/src/components/CourseSideBar";
import MainVideoSummary from "@/src/components/MainVideoSummary";
import QuizCards from "@/src/components/QuizCards";
import { prisma } from "@/src/lib/db";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    slug: string[];
  };
};

const CoursePage = async ({ params: { slug } }: Props) => {
  const [courseId, unitIndexParam, chapterIndexParam] = slug;
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      units: {
        include: {
          chapters: {
            include: { questions: true },
          },
        },
      },
    },
  });
  if (!course) {
    return redirect("/gallery");
  }
  const unitIndex = parseInt(unitIndexParam);
  const chapterIndex = parseInt(chapterIndexParam);

  const unit = course.units[unitIndex];
  if (!unit) {
    return redirect("/gallery");
  }
  const chapter = unit.chapters[chapterIndex];
  if (!chapter) {
    return redirect("/gallery");
  }
  const nextChapter = unit.chapters[chapterIndex + 1];
  const prevChapter = unit.chapters[chapterIndex - 1];

  return (
    <div className="relative flex min-h-screen">
      <CourseSideBar course={course} currentChapterId={chapter.id} />
      
      <main className="flex-1 ml-[320px] p-8">
        <div className="max-w-6xl mx-auto">
          {/* Video and Quiz Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-background rounded-xl border border-border p-6 shadow-sm">
              <MainVideoSummary
                chapter={chapter}
                chapterIndex={chapterIndex}
                unit={unit}
                unitIndex={unitIndex}
              />
            </div>
            
            <div className="bg-background rounded-xl border border-border p-6 shadow-sm">
              <QuizCards chapter={chapter} />
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-12 pt-8 border-t border-border">
            {prevChapter && (
              <Link
                href={`/course/${course.id}/${unitIndex}/${chapterIndex - 1}`}
                className="group flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-accent transition-colors w-full sm:w-auto"
              >
                <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <ChevronLeft className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <span className="text-sm text-muted-foreground">Previous</span>
                  <p className="font-medium text-foreground line-clamp-1">
                    {prevChapter.name}
                  </p>
                </div>
              </Link>
            )}

            {nextChapter && (
              <Link
                href={`/course/${course.id}/${unitIndex}/${chapterIndex + 1}`}
                className="group flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-accent transition-colors w-full sm:w-auto ml-auto text-right"
              >
                <div className="text-right">
                  <span className="text-sm text-muted-foreground">Next</span>
                  <p className="font-medium text-foreground line-clamp-1">
                    {nextChapter.name}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <ChevronRight className="w-5 h-5 text-primary" />
                </div>
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CoursePage;