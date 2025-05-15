"use client"

import { useState } from "react"
import { PageContainer } from "@/components/ui/page-container"
import { PageHeader } from "@/components/ui/page-header"
import { ContentGrid, MainContent } from "@/components/ui/content-grid"
import { SectionContainer } from "@/components/ui/section-container"
import { Puzzle, Search, Plus, Star, Clock, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function PatternsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <PageContainer>
      <PageHeader
        title="Betting Patterns"
        description="Discover and create betting patterns for better predictions"
        icon={<Puzzle className="h-5 w-5" />}
        action={
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create New Pattern
          </Button>
        }
      />

      <ContentGrid>
        <MainContent fullWidth>
          <Tabs defaultValue="discover">
            <TabsList className="w-full md:w-auto">
              <TabsTrigger value="discover">Discover</TabsTrigger>
              <TabsTrigger value="my-patterns">My Patterns</TabsTrigger>
              <TabsTrigger value="create">Create New</TabsTrigger>
            </TabsList>

            <div className="my-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search patterns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-full"
                />
              </div>
            </div>

            <TabsContent value="discover" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {discoverPatterns.map((pattern, index) => (
                  <PatternCard key={index} pattern={pattern} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="my-patterns" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myPatterns.map((pattern, index) => (
                  <PatternCard key={index} pattern={pattern} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="create" className="mt-4">
              <SectionContainer>
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-xl font-bold">Create New Pattern</CardTitle>
                </CardHeader>
                <CardContent className="px-0 pt-2">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Pattern Name</label>
                      <Input placeholder="Enter pattern name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Description</label>
                      <textarea
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
                        placeholder="Describe your pattern"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Conditions</label>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                            <option>Home Team</option>
                            <option>Away Team</option>
                            <option>League</option>
                            <option>Time of Day</option>
                          </select>
                          <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                            <option>is</option>
                            <option>is not</option>
                            <option>contains</option>
                            <option>does not contain</option>
                          </select>
                          <Input placeholder="Value" />
                          <Button variant="outline" size="icon">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button>Create Pattern</Button>
                    </div>
                  </div>
                </CardContent>
              </SectionContainer>
            </TabsContent>
          </Tabs>
        </MainContent>
      </ContentGrid>
    </PageContainer>
  )
}

interface PatternCardProps {
  pattern: {
    name: string
    description: string
    accuracy: number
    usage: number
    author: string
    isPopular?: boolean
    isNew?: boolean
  }
}

function PatternCard({ pattern }: PatternCardProps) {
  return (
    <Card className="overflow-hidden border border-[#222224] bg-[#121214]">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">{pattern.name}</CardTitle>
          <div className="flex gap-1">
            {pattern.isPopular && (
              <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400">
                Popular
              </span>
            )}
            {pattern.isNew && (
              <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
                New
              </span>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-400 mt-1">{pattern.description}</p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Star className="h-4 w-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Accuracy</p>
              <p className="font-bold text-white">{pattern.accuracy}%</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Clock className="h-4 w-4 text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Usage</p>
              <p className="font-bold text-white">{pattern.usage}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-[#222224]">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center">
              <Users className="h-3 w-3 text-gray-400" />
            </div>
            <p className="text-xs text-gray-400">{pattern.author}</p>
          </div>
          <Button variant="outline" size="sm">
            Apply
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

const discoverPatterns = [
  {
    name: "Home Advantage",
    description: "Teams with strong home record against away teams with poor away form",
    accuracy: 78,
    usage: 1245,
    author: "System",
    isPopular: true,
  },
  {
    name: "Goal Fest",
    description: "Matches likely to have over 2.5 goals based on team scoring patterns",
    accuracy: 72,
    usage: 987,
    author: "System",
    isPopular: true,
  },
  {
    name: "Derby Day Special",
    description: "Local derby matches with historical data patterns",
    accuracy: 68,
    usage: 456,
    author: "System",
  },
  {
    name: "Clean Sheet Predictor",
    description: "Teams likely to keep a clean sheet based on defensive metrics",
    accuracy: 75,
    usage: 789,
    author: "System",
  },
  {
    name: "Underdog Victory",
    description: "Conditions where underdogs are likely to win or draw",
    accuracy: 65,
    usage: 321,
    author: "System",
    isNew: true,
  },
  {
    name: "Late Goal Pattern",
    description: "Teams that frequently score in the last 15 minutes",
    accuracy: 70,
    usage: 654,
    author: "System",
  },
]

const myPatterns = [
  {
    name: "Premier League Home Wins",
    description: "Custom pattern for Premier League home teams with good form",
    accuracy: 82,
    usage: 45,
    author: "You",
  },
  {
    name: "La Liga Goal Machine",
    description: "High scoring La Liga matches with specific conditions",
    accuracy: 76,
    usage: 32,
    author: "You",
  },
  {
    name: "Bundesliga Away Specialists",
    description: "Away teams in Bundesliga with strong away records",
    accuracy: 71,
    usage: 28,
    author: "You",
  },
]
