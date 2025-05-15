"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Star, TrendingUp, Users, Zap } from "lucide-react"
import { useState } from "react"
import { PatternDetails } from "./pattern-details"

// Sample data for patterns
const discoverPatterns = [
  {
    id: "pattern-1",
    name: "Home Underdog Value",
    description: "Betting on home underdogs in specific situations",
    category: "Value Betting",
    accuracy: 68,
    popularity: 4.2,
    usageCount: 1245,
    creator: "System",
    tags: ["Underdog", "Home Advantage", "Value"],
    createdAt: "2023-05-15",
  },
  {
    id: "pattern-2",
    name: "Late Season Motivation",
    description: "Teams fighting for playoff spots in late season games",
    category: "Situational",
    accuracy: 72,
    popularity: 4.5,
    usageCount: 982,
    creator: "System",
    tags: ["Playoffs", "Motivation", "Late Season"],
    createdAt: "2023-06-22",
  },
  {
    id: "pattern-3",
    name: "Over/Under Weather Impact",
    description: "How weather conditions affect over/under betting",
    category: "Totals",
    accuracy: 65,
    popularity: 4.0,
    usageCount: 1567,
    creator: "System",
    tags: ["Weather", "Over/Under", "Environmental"],
    createdAt: "2023-04-10",
  },
  {
    id: "pattern-4",
    name: "Injury Impact Analysis",
    description: "Analyzing the true impact of key player injuries",
    category: "Player Analysis",
    accuracy: 70,
    popularity: 4.7,
    usageCount: 2103,
    creator: "System",
    tags: ["Injuries", "Key Players", "Line Movement"],
    createdAt: "2023-07-05",
  },
]

const myPatterns = [
  {
    id: "my-pattern-1",
    name: "Premier League Away Favorites",
    description: "Strong favorites playing away in Premier League",
    category: "Custom",
    accuracy: 64,
    popularity: 0,
    usageCount: 23,
    creator: "You",
    tags: ["Premier League", "Favorites", "Away"],
    createdAt: "2023-08-12",
  },
  {
    id: "my-pattern-2",
    name: "Second Half Scoring",
    description: "Teams that score significantly more in the second half",
    category: "Custom",
    accuracy: 71,
    popularity: 0,
    usageCount: 15,
    creator: "You",
    tags: ["Second Half", "Scoring", "Timing"],
    createdAt: "2023-09-03",
  },
]

interface PatternsListProps {
  type: "discover" | "my-patterns"
}

export function PatternsList({ type }: PatternsListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null)

  const patterns = type === "discover" ? discoverPatterns : myPatterns

  const filteredPatterns = patterns.filter(
    (pattern) =>
      pattern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pattern.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pattern.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  if (selectedPattern) {
    const pattern = [...discoverPatterns, ...myPatterns].find((p) => p.id === selectedPattern)
    if (pattern) {
      return (
        <div className="space-y-4">
          <Button variant="ghost" onClick={() => setSelectedPattern(null)} className="mb-4">
            ← Back to Patterns
          </Button>
          <PatternDetails pattern={pattern} />
        </div>
      )
    }
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search patterns..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatterns.map((pattern) => (
          <Card key={pattern.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{pattern.name}</CardTitle>
                <Badge variant={pattern.accuracy >= 70 ? "default" : "secondary"}>{pattern.accuracy}% Accuracy</Badge>
              </div>
              <CardDescription>{pattern.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="flex flex-wrap gap-2 mb-4">
                {pattern.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="flex flex-col items-center">
                  <Users className="h-4 w-4 mb-1 text-muted-foreground" />
                  <span className="font-medium">{pattern.usageCount}</span>
                  <span className="text-xs text-muted-foreground">Users</span>
                </div>
                {type === "discover" && (
                  <div className="flex flex-col items-center">
                    <Star className="h-4 w-4 mb-1 text-muted-foreground" />
                    <span className="font-medium">{pattern.popularity}</span>
                    <span className="text-xs text-muted-foreground">Rating</span>
                  </div>
                )}
                <div className="flex flex-col items-center">
                  <TrendingUp className="h-4 w-4 mb-1 text-muted-foreground" />
                  <span className="font-medium">{pattern.accuracy}%</span>
                  <span className="text-xs text-muted-foreground">Success</span>
                </div>
                <div className="flex flex-col items-center">
                  <Zap className="h-4 w-4 mb-1 text-muted-foreground" />
                  <span className="font-medium">{pattern.category}</span>
                  <span className="text-xs text-muted-foreground">Type</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-1">
              <Button variant="default" className="w-full" onClick={() => setSelectedPattern(pattern.id)}>
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}

        {filteredPatterns.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-3 mb-4">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">No patterns found</h3>
            <p className="text-muted-foreground mt-1">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
