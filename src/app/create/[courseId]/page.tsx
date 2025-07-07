
import ConfirmChapters from "@/src/components/ConfirmChapters";
import { getAuthSession } from "@/src/lib/auth";
import { prisma } from "@/src/lib/db";
import { Info } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    courseId: string;
  };
};

const CreateChapters = async ({ params }: Props) => {
  // Validate courseId first
  if (!params?.courseId || typeof params.courseId !== "string") {
    return redirect("/create");
  }

  const { courseId } = await params;

  // Check session
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/gallery");
  }

  try {
    // Fetch course with error handling
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        units: {
          include: {
            chapters: true,
          },
        },
      },
    });

    if (!course) {
      return redirect("/create");
    }

    return (
      <div className="flex flex-col items-start max-w-xl mx-auto my-16">
        <h5 className="text-sm uppercase text-secondary-foreground/60">
          Course Name
        </h5>
        <h1 className="text-5xl font-bold">{course.name}</h1>

        <div className="flex p-4 mt-5 border-none bg-secondary">
          <Info className="w-12 h-12 mr-3 text-blue-400" />
          <div>
            We generated chapters for each of your units. Look over them and then
            click the Button to confirm and continue
          </div>
        </div>
        <ConfirmChapters course={course} />
      </div>
    );
  } catch (error) {
    console.error("Error loading course:", error);
    return redirect("/create");
  }
};

export default CreateChapters;