"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <PageTransition>
    <div className="flex min-h-screen flex-col bg-zinc-50">
      <Navbar />

      <main className="grid flex-1 grid-cols-1 items-center gap-8 px-8 py-12 lg:grid-cols-2">
        {/* Hero Section */}
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl font-bold tracking-tight lg:text-6xl uppercase">
            Pot Spotter
          </h1>
          <p className="max-w-md text-lg text-zinc-500">
            Report and track potholes across the GTA. Help your community by
            pinning road hazards, uploading photos, and voting on reports — all
            verified with AI.
          </p>
          <div className="flex gap-3">
            <Link
              href="/auth/signup"
            >
              <Button className="rounded-2xl p-5" size="lg">
                Get Started
              </Button>
              
            </Link>
          </div>
        </div>

        {/* Map Section */}
        <div className="h-125 w-full overflow-hidden rounded-2xl bg-zinc-200 shadow-lg lg:h-150">
          
        </div>
      </main>
    </div>
    </PageTransition>
  );
}
