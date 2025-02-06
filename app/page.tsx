"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

export default function OrangeBox() {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const sections = ["Team Fortress 2", "HL2: Episode Two", "Portal", "HL2: Episode One", "Half-Life 2"]

  return (
    <div className="min-h-screen bg-orange relative overflow-hidden">
      {/* Background Lambda Symbol */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 -z-10">
        <div className="w-96 h-96 text-white text-[600px] leading-none">λ</div>
      </div>

      {/* Header Logo */}
      <header className="p-8 relative z-10">
        <div className="flex items-center gap-4">
          <div 
            onClick={() => setActiveSection(null)}
            className="w-8 h-8 bg-white hover:scale-110 transition-transform cursor-pointer"
          />
          <h1 className="text-white text-2xl tracking-wider font-light" style={{ fontFamily: "Arial, sans-serif" }}>The Orange Box®</h1>
        </div>
      </header>

      <main className="flex min-h-[calc(100vh-200px)]">
        {/* Side Navigation */}
        <nav className="w-64 relative z-10">
          <div className="fixed pl-24 pt-8">
            {sections.map((section, index) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={cn(
                  "origin-bottom-left rotate-90 text-[#8B2500] hover:text-white transition-colors whitespace-nowrap text-3xl block",
                  activeSection === section && "text-white",
                )}
                style={{
                  transformOrigin: "0 100%",
                  position: "absolute",
                  left: `${(index * 40) + 40}px`,
                  bottom: "0",
                  fontFamily: "Arial, sans-serif",
                  fontWeight: 300,
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
              <div className="text-white space-y-2">
                <h2 className="text-4xl tracking-wide font-light" style={{ fontFamily: "Arial, sans-serif" }}>Look inside</h2>
                <h3 className="text-6xl leading-[0.9] tracking-wide font-light" style={{ fontFamily: "Arial, sans-serif" }}>
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
        <div className="text-orange uppercase text-sm font-light" style={{ fontFamily: "Arial, sans-serif" }}>Momichisky Corp</div>
        <div className="w-6 h-6 bg-orange rounded" />
      </footer>
    </div>
  )
}

function ContentSection({ section }: { section: string }) {
  const [playingVideos, setPlayingVideos] = useState<{ [key: number]: boolean }>({})

  const handlePlayVideo = (index: number) => {
    setPlayingVideos(prev => ({ ...prev, [index]: true }))
  }

  const sectionContent = {
    "Team Fortress 2": {
      info: {
        title: "About the game",
        description: `Team Fortress® 2 (TF2) is the sequel to the game that put class-based,
        multiplayer team warfare on the map. This year's most anticipated online
        action game, TF2 delivers new gametypes, a signature art style powered by
        Valve's next generation animation technology, persistent player statistics, and more.`,
      },
      screenshots: [
        "/images/tf2/screenshot1.jpg",
        "/images/tf2/screenshot2.jpg",
        "/images/tf2/screenshot3.jpg",
        "/images/tf2/screenshot4.jpg",
        "/images/tf2/screenshot5.jpg",
        "/images/tf2/screenshot6.jpg",
        "/images/tf2/screenshot7.jpg",
        "/images/tf2/screenshot8.jpg",
        "/images/tf2/screenshot9.jpg",
      ],
      trailers: [
        "/videos/tf2/trailer1.mp4",
        "/videos/tf2/trailer2.mp4",
      ],
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
    "Half-Life 2": {
      info: {
        title: "About the game",
        description:
          "Half-Life® sends a shock through the game industry with its combination of pounding action and continuous, immersive storytelling. Valve's debut title wins more than 50 game-of-the-year awards on its way to being named \"Best PC Game Ever\" by PC Gamer.",
      },
      screenshots: Array(9).fill(null),
      trailers: Array(2).fill(null),
    },
    // Add content for other sections similarly
  }

  const content = sectionContent[section as keyof typeof sectionContent] || sectionContent["Team Fortress 2"]

  return (
    <div className="grid grid-cols-3 gap-8" style={{ fontFamily: "Arial, sans-serif", fontWeight: 300 }}>
      <div className="text-white space-y-4">
        <h2 className="text-xl font-light">.info</h2>
        <p className="text-sm opacity-80 font-mono">{content.info.title}</p>
        <div className="space-y-4">
          <p className="font-mono">{content.info.description}</p>
        </div>
      </div>

      <div className="text-white">
        <h2 className="text-xl font-light mb-4">.screenshots</h2>
        <div className="grid grid-cols-3 gap-2">
          {content.screenshots.map((src, i) => (
            <div key={i} className="aspect-video bg-black/20 rounded-lg overflow-hidden">
              <img 
                src={src} 
                alt={`${section} screenshot ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="text-white">
        <h2 className="text-xl font-light mb-4">.trailers</h2>
        <div className="space-y-4">
          {content.trailers.map((src, i) => (
            <div key={i} className="aspect-video bg-black/20 rounded-lg overflow-hidden relative">
              {src && (
                <>
                  {!playingVideos[i] && (
                    <div 
                      className="absolute inset-0 z-10 cursor-pointer"
                      onClick={() => {
                        handlePlayVideo(i)
                        // Find and play the video element
                        const video = document.querySelector(`#video-${i}`) as HTMLVideoElement
                        if (video) {
                          video.play()
                        }
                      }}
                    >
                      <img 
                        src={`/images/team fortress 2/trailer${i + 1}-thumb.jpg`}
                        alt={`${section} trailer ${i + 1} thumbnail`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                          <div 
                            className="w-0 h-0 
                              border-t-[16px] border-t-transparent 
                              border-b-[16px] border-b-transparent 
                              border-l-[24px] border-l-white 
                              ml-2"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  <video 
                    id={`video-${i}`}
                    controls={playingVideos[i]}
                    className="w-full h-full object-cover"
                    onPlay={() => handlePlayVideo(i)}
                  >
                    <source src={src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

