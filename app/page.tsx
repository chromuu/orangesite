"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

export default function OrangeBox() {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const sections = ["Team Fortress 2", "HL2: Episode Two", "Portal", "HL2: Episode One", "Half-Life 2"]

  return (
    <div className="min-h-screen bg-orange relative overflow-hidden">
      {/* Background Lambda Symbol */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <div className="w-96 h-96 text-white text-[600px] leading-none">λ</div>
      </div>

      {/* Header Logo */}
      <header className="p-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white" />
          <h1 className="text-white text-2xl font-light">The Orange Box®</h1>
        </div>
      </header>

      <main className="flex min-h-[calc(100vh-200px)]">
        {/* Side Navigation */}
        <nav className="w-48 relative z-10">
          <div className="fixed pl-12 pt-8">
            {sections.map((section, index) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={cn(
                  "origin-bottom-left rotate-90 text-[#8B2500] hover:text-white transition-colors whitespace-nowrap text-xl block",
                  activeSection === section && "text-white",
                )}
                style={{
                  transformOrigin: "0 100%",
                  position: "absolute",
                  left: `${index * 40}px`,
                  bottom: "0", // Changed from -200px to 0
                }}
              >
                {section}
              </button>
            ))}
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="flex-1 p-8">
          {!activeSection ? (
            <div className="border-2 border-white/20 rounded-lg p-8 max-w-xl">
              <div className="text-white space-y-4">
                <h2 className="text-4xl font-light">Look inside</h2>
                <h3 className="text-6xl font-light">
                  The
                  <br />
                  Orange
                  <br />
                  Box
                </h3>
              </div>
            </div>
          ) : (
            <ContentSection section={activeSection} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="h-16 bg-orange-dark flex items-center px-8 gap-4">
        <div className="text-orange uppercase text-sm">Valve</div>
        <div className="w-6 h-6 bg-orange rounded" />
      </footer>
    </div>
  )
}

function ContentSection({ section }: { section: string }) {
  const sectionContent = {
    "Team Fortress 2": {
      info: {
        title: "About the game",
        description: `Team Fortress® 2 (TF2) is the sequel to the game that put class-based,
        multiplayer team warfare on the map. This year's most anticipated online
        action game, TF2 delivers new gametypes, a signature art style powered by
        Valve's next generation animation technology, persistent player statistics, and more.`,
      },
      screenshots: Array(9).fill(null),
      trailers: Array(2).fill(null),
    },
    Portal: {
      info: {
        title: "About the game",
        description:
          "Portal™ is a new single player game from Valve. Set in the mysterious Aperture Science Laboratories, Portal has been called one of the most innovative new games on the horizon and will offer gamers hours of unique gameplay.",
      },
      screenshots: Array(9).fill(null),
      trailers: Array(2).fill(null),
    },
    // Add content for other sections similarly
  }

  const content = sectionContent[section as keyof typeof sectionContent] || sectionContent["Team Fortress 2"]

  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="text-white space-y-4">
        <h2 className="text-xl font-bold">.info</h2>
        <p className="text-sm opacity-80">{content.info.title}</p>
        <div className="space-y-4">
          <p>{content.info.description}</p>
        </div>
      </div>

      <div className="text-white">
        <h2 className="text-xl font-bold mb-4">.screenshots</h2>
        <div className="grid grid-cols-3 gap-2">
          {content.screenshots.map((_, i) => (
            <div key={i} className="aspect-video bg-black/20 rounded-lg" />
          ))}
        </div>
      </div>

      <div className="text-white">
        <h2 className="text-xl font-bold mb-4">.trailers</h2>
        <div className="space-y-4">
          {content.trailers.map((_, i) => (
            <div key={i} className="aspect-video bg-black/20 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  )
}

