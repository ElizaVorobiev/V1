import React from "react";
import { Card } from "@/components/ui/card";

interface WelcomeHeroProps {
  title?: string;
  subtitle?: string;
  logoUrl?: string;
}

export default function WelcomeHero({
  title = "Welcome to Herd",
  subtitle = "Join the community of goal achievers and challenge yourself to grow",
  logoUrl = "https://dummyimage.com/120/6366f1/ffffff&text=HERD",
}: WelcomeHeroProps) {
  return (
    <Card className="w-full h-[400px] bg-gradient-to-br from-primary to-primary/80 text-white border-0 rounded-none flex flex-col items-center justify-center px-4 space-y-6">
      <div className="flex flex-col items-center space-y-8">
        <img
          src={logoUrl}
          alt="Herd Logo"
          className="w-[120px] h-[120px] rounded-2xl shadow-lg"
        />

        <div className="text-center space-y-4 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-white/90">{subtitle}</p>
        </div>
      </div>
    </Card>
  );
}
