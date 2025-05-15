"use client"

import Image from "next/image"

interface SectionWithMockupProps {
  title: string
  description: string
  primaryImageSrc: string
  secondaryImageSrc?: string
}

export function SectionWithMockup({ title, description, primaryImageSrc, secondaryImageSrc }: SectionWithMockupProps) {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-gray-900 to-black py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="max-w-xl">
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">{title}</h2>
            <p className="mb-8 text-lg text-gray-300">{description}</p>
            <div className="flex flex-wrap gap-4">
              <button className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700">
                Get Started
              </button>
              <button className="rounded-lg border border-gray-600 px-6 py-3 font-medium text-white transition-colors hover:bg-white/10">
                Learn More
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10 overflow-hidden rounded-xl border border-gray-800 bg-gray-900 shadow-2xl">
              <Image
                src={primaryImageSrc || "/placeholder.svg"}
                alt="Dashboard mockup"
                width={800}
                height={600}
                className="w-full"
              />
            </div>
            {secondaryImageSrc && (
              <div className="absolute -bottom-6 -right-6 z-0 hidden w-3/4 overflow-hidden rounded-xl border border-gray-800 bg-gray-900 shadow-xl md:block">
                <Image
                  src={secondaryImageSrc || "/placeholder.svg"}
                  alt="Secondary mockup"
                  width={600}
                  height={400}
                  className="w-full opacity-50"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
