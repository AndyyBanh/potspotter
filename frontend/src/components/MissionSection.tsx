"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const cards = [
  { num: "1", title: "Report", desc: "Users report potholes across the GTA by dropping pins and uploading photos." },
  { num: "2", title: "Verify", desc: "AI analyzes each submission to confirm it's a pothole and estimate its severity." },
  { num: "3", title: "Display", desc: "Verified potholes appear on the public map for community awareness and action." },
];

export default function MissionSection() {
  return (
    <section className="flex flex-col items-center gap-12 px-8 py-20 text-center">
      <motion.div
        className="max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold tracking-tight">Our Mission</h2>
        <p className="mt-4 text-lg text-zinc-500">
          Bringing the community together to spread awareness of dangerous road
          conditions that may cause accidents — one pothole at a time.
        </p>
      </motion.div>

      {/* How It Works */}
      <div className="grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
        {cards.map((card, i) => (
          <motion.div
            key={card.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
          >
            <Card className="flex flex-col items-center gap-3 p-6 shadow-sm h-full">
              <span className="flex size-10 items-center justify-center rounded-full bg-orange-100 text-lg font-bold text-orange-600">{card.num}</span>
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <p className="text-sm text-zinc-500">{card.desc}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
