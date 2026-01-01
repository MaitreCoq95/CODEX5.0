"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Award, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const router = useRouter();

  // Auto-redirect to CODEX after 3 seconds (optional)
  // useEffect(() => {
  //   const timer = setTimeout(() => router.push('/codex'), 3000)
  //   return () => clearTimeout(timer)
  // }, [router])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="min-h-screen flex flex-col items-center justify-center p-8"
    >
      <motion.div variants={item} className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-vyxo-navy to-slate-900 mb-6">
          <BookOpen className="h-10 w-10 text-vyxo-gold" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-vyxo-navy dark:text-white mb-4">
          Vyxo CODEX
        </h1>
        <p className="text-xl text-muted-foreground max-w-lg mx-auto">
          Votre plateforme de formation et certification qualité
        </p>
      </motion.div>

      <motion.div
        variants={item}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mb-12"
      >
        <Card className="border-none shadow-lg hover:shadow-xl transition-all bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-2">
              <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className="text-lg">Modules</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-sm text-muted-foreground">
            Parcours de formation structurés par norme ISO
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg hover:shadow-xl transition-all bg-gradient-to-br from-amber-50 to-white dark:from-slate-900 dark:to-slate-800">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-2">
              <GraduationCap className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
            <CardTitle className="text-lg">Évaluations</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-sm text-muted-foreground">
            Tests et quiz pour valider vos compétences
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg hover:shadow-xl transition-all bg-gradient-to-br from-emerald-50 to-white dark:from-slate-900 dark:to-slate-800">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-2">
              <Award className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <CardTitle className="text-lg">Certifications</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-sm text-muted-foreground">
            Obtenez vos certificats de compétence
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={item}>
        <Button
          size="lg"
          onClick={() => router.push("/codex")}
          className="bg-vyxo-navy hover:bg-vyxo-navy/90 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
        >
          Accéder au CODEX
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
