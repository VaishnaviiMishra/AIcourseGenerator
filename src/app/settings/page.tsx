"use client";

import { Card } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Settings, Rocket, Shield } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Settings className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <Card className="p-6 mb-8">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="bg-primary/10 p-4 rounded-full">
            <Rocket className="w-10 h-10 text-primary" />
          </div>
          
          <h2 className="text-2xl font-semibold">Enjoy Our Free Version!</h2>
          
          <p className="text-muted-foreground max-w-md">
            Currently, all features are available for free. No payment or subscription is required to 
            create and access courses.
          </p>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span>Your data is always secure with us</span>
          </div>
        </div>
      </Card>

      <Card className="p-6 border-primary/30 bg-primary/5">
        <div className="flex flex-col items-center text-center gap-4">
          <h3 className="text-lg font-medium">Premium Version Coming Soon!</h3>
          <p className="text-muted-foreground text-sm max-w-md">
            We're working on exciting premium features that will enhance your learning experience. 
            Stay tuned for updates!
          </p>
          <Button 
            variant="outline" 
            className="mt-2"
            onClick={() => router.push("/")}
          >
            Back to Home
          </Button>
        </div>
      </Card>
    </div>
  );
}