"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/src/components/ui/card";
import { ChevronRight, BookOpen, Youtube, Brain, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { Integrations } from "../components/eldoraui/integration";
import { GitStarButton } from "../components/eldoraui/gitstarbutton";
import AvatarCircles from "../components/ui/Avatar-circle";

const Index = () => {
  const [isHovered, setIsHovered] = useState(false);

  const avatars = [
    {
      imageUrl: "https://avatars.githubusercontent.com/u/16860528",
      profileUrl: "https://github.com/dillionverma",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/20110627",
      profileUrl: "https://github.com/tomonarifeehan",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/106103625",
      profileUrl: "https://github.com/BankkRoll",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/59228569",
      profileUrl: "https://github.com/safethecode",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/59442788",
      profileUrl: "https://github.com/sanjay-mali",
    },
    {
      imageUrl: "https://avatars.githubusercontent.com/u/89768406",
      profileUrl: "https://github.com/itsarghyadas",
    },
  ];

  const features = [
    {
      icon: <BookOpen className="w-6 h-6 text-primary" />,
      title: "Personalized Learning Path",
      description: "Create custom courses tailored to your specific learning needs and goals.",
    },
    {
      icon: <Youtube className="w-6 h-6 text-primary" />,
      title: "Curated Video Content",
      description: "Access carefully selected YouTube videos that perfectly match your topics.",
    },
    {
      icon: <Brain className="w-6 h-6 text-primary" />,
      title: "AI-Powered Structure",
      description: "Let AI organize your learning materials in the most effective sequence.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-primary" />,
      title: "Enhanced Learning",
      description: "Benefit from LangChain's advanced processing for optimal course structure.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* Gradient overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 bottom-0 h-[75vh] bg-gradient-to-t from-primary/20 via-primary/10 to-transparent" />
      </div>
      
      {/* Hero Section */}
      <div className="relative">
        <div className="container mx-auto px-4 pt-20 pb-32 relative">
          <div className="flex flex-col items-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <span className="px-4 py-2 rounded-full bg-secondary text-white inline-block mb-6 text-sm font-medium">
                Revolutionize Your Learning Journey
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Generate Personalized Courses with
                <span className="text-primary block mt-2">AI-Powered Intelligence</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Transform any topic into a structured learning experience.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex justify-center"
              >
                <Link href="/create">
                  <Button
                    size="lg"
                    className="px-8 py-6 rounded-full text-lg font-medium"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    Start Learning Now
                    <ChevronRight className={`ml-2 w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full"
            >
              <div className="relative drop-shadow-xl bg-secondary/50 rounded-lg backdrop-blur-sm border border-border">
                <Image
                  src="/hero.png"
                  alt="AIcademics Platform Interface"
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover rounded-lg shadow-2xl"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full hover:border-primary transition-colors">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Create your personalized learning experience in three simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              step: "01",
              title: "Choose Your Topic",
              description: "Enter the main subject you want to learn about",
            },
            {
              step: "02",
              title: "Add Subtopics",
              description: "Specify 3-8 subtopics to focus your learning journey",
            },
            {
              step: "03",
              title: "Get Your Course",
              description: "Receive an AI-curated course with matching video content",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-card rounded-lg border border-border"
            >
              <span className="text-primary text-4xl font-bold mb-4 block">
                {item.step}
              </span>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Integrations Section */}
      <div className="bg-secondary/50 py-20">
        <Integrations />
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-card rounded-2xl p-12 text-center max-w-4xl mx-auto border border-border"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Learning Experience?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are already benefiting from AI-powered education
          </p>
          <div className="items-center justify-center flex mx-auto mb-6">
            <AvatarCircles numPeople={99} avatarUrls={avatars} />
          </div>
          <Link href="/create">
            <Button size="lg" className="px-8 py-6 rounded-full text-lg font-medium">
              Get Started Free
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <div className="mx-auto items-center justify-center flex mt-8">
            <GitStarButton />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;