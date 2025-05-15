"use client"

import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { SectionWithMockup } from "@/components/section-with-mockup"
import { ShowcaseCard } from "@/components/showcase-card"
import { SignInCard } from "@/components/sign-in-card"
import { GradientCard } from "@/components/gradient-card"
import { BarChart2, Zap, Shield, Sparkles } from "lucide-react"

export default function ShowcasePage() {
  return (
    <DashboardLayout pageTitle="Component Showcase">
      <div className="space-y-16 pb-16">
        {/* Section with Mockup */}
        <SectionWithMockup
          title="Intelligence, delivered to you."
          description="Get a tailored Monday morning brief directly in your inbox, crafted by your virtual personal analyst, spotlighting essential watchlist stories and earnings for the week ahead."
          primaryImageSrc="/placeholder.svg?height=600&width=800"
          secondaryImageSrc="/placeholder.svg?height=400&width=600"
        />

        {/* Showcase Cards */}
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-3xl font-bold text-white">Featured Solutions</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ShowcaseCard
              title="Advanced Analytics"
              description="Gain insights from your data with our powerful analytics tools."
              imageSrc="/placeholder.svg?height=250&width=400"
              ctaText="Explore Analytics"
            />
            <ShowcaseCard
              title="Team Collaboration"
              description="Work together seamlessly with integrated collaboration features."
              imageSrc="/placeholder.svg?height=250&width=400"
              ctaText="See Collaboration Tools"
            />
            <ShowcaseCard
              title="Secure Storage"
              description="Keep your data safe with enterprise-grade security features."
              imageSrc="/placeholder.svg?height=250&width=400"
              ctaText="Learn About Security"
            />
          </div>
        </div>

        {/* Gradient Cards */}
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-3xl font-bold text-white">Key Features</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <GradientCard
              title="Real-time Analytics"
              description="Monitor your data in real-time with powerful dashboards."
              icon={<BarChart2 className="h-6 w-6 text-white" />}
              gradientFrom="from-blue-600"
              gradientTo="to-blue-400"
            />
            <GradientCard
              title="Lightning Fast"
              description="Optimized performance for quick loading and response times."
              icon={<Zap className="h-6 w-6 text-white" />}
              gradientFrom="from-purple-600"
              gradientTo="to-pink-500"
            />
            <GradientCard
              title="Enterprise Security"
              description="Keep your data safe with our advanced security features."
              icon={<Shield className="h-6 w-6 text-white" />}
              gradientFrom="from-green-500"
              gradientTo="to-emerald-400"
            />
            <GradientCard
              title="AI-Powered"
              description="Leverage artificial intelligence to automate and optimize."
              icon={<Sparkles className="h-6 w-6 text-white" />}
              gradientFrom="from-amber-500"
              gradientTo="to-orange-400"
            />
          </div>
        </div>

        {/* Sign In Card */}
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-3xl font-bold text-white">Authentication</h2>
          <div className="flex justify-center">
            <SignInCard />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
