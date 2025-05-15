"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { AlertCircle, Calendar, Copy, Download, Share2, Star, ThumbsUp, User } from "lucide-react"

// Sample performance data
const performanceData = [
  { month: "Jan", winRate: 65, profit: 120 },
  { month: "Feb", winRate: 58, profit: 90 },
  { month: "Mar", winRate: 72, profit: 180 },
  { month: "Apr", winRate: 68, profit: 150 },
  { month: "May", winRate: 75, profit: 210 },
  { month: "Jun", winRate: 70, profit: 160 },
]

const situationsData = [
  { name: "Home Games", value: 72 },
  { name: "Away Games", value: 64 },
  { name: "Favorites", value: 68 },
  { name: "Underdogs", value: 75 },
]

const COLORS = ["#4ade80", "#3b82f6", "#f43f5e", "#facc15"]

interface PatternDetailsProps {
  pattern: {
    id: string
    name: string
    description: string
    category: string
    accuracy: number
    popularity: number
    usageCount: number
    creator: string
    tags: string[]
    createdAt: string
  }
}

export function PatternDetails({ pattern }: PatternDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">{pattern.name}</h2>
          <p className="text-muted-foreground">{pattern.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <Copy className="mr-2 h-4 w-4" />
            Clone
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="default" size="sm">
            <ThumbsUp className="mr-2 h-4 w-4" />
            Use Pattern
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pattern.accuracy}%</div>
            <p className="text-xs text-muted-foreground">Based on historical data</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pattern.usageCount}</div>
            <p className="text-xs text-muted-foreground">People using this pattern</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              {pattern.popularity} <Star className="h-4 w-4 ml-1 text-yellow-500 fill-yellow-500" />
            </div>
            <p className="text-xs text-muted-foreground">User satisfaction</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Created</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-md font-medium flex items-center gap-1">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              {pattern.createdAt}
            </div>
            <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <User className="h-3 w-3" /> {pattern.creator}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary">{pattern.category}</Badge>
        {pattern.tags.map((tag) => (
          <Badge key={tag} variant="outline">
            {tag}
          </Badge>
        ))}
      </div>

      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="situations">Best Situations</TabsTrigger>
          <TabsTrigger value="rules">Pattern Rules</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Over Time</CardTitle>
              <CardDescription>Win rate and profit trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="winRate"
                      name="Win Rate %"
                      stroke="#4ade80"
                      activeDot={{ r: 8 }}
                    />
                    <Line yAxisId="right" type="monotone" dataKey="profit" name="Profit" stroke="#3b82f6" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="situations" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Best Situations</CardTitle>
              <CardDescription>When this pattern performs best</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={situationsData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" name="Win Rate %" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={situationsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {situationsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="mt-4 p-4 bg-muted rounded-md flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="font-medium">Recommendation</p>
                  <p className="text-sm text-muted-foreground">
                    This pattern performs best when betting on underdogs in home games. Consider using it primarily in
                    these situations for optimal results.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Pattern Rules</CardTitle>
              <CardDescription>Conditions that trigger this pattern</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-md">
                  <h4 className="font-medium mb-2">Rule 1: Home Team Condition</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Home team must have won at least 3 of their last 5 home games.
                  </p>
                  <Badge>Primary Condition</Badge>
                </div>

                <div className="p-4 border rounded-md">
                  <h4 className="font-medium mb-2">Rule 2: Underdog Status</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Home team must be an underdog with odds of +100 or greater.
                  </p>
                  <Badge>Primary Condition</Badge>
                </div>

                <div className="p-4 border rounded-md">
                  <h4 className="font-medium mb-2">Rule 3: Recent Form</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Home team must have scored in each of their last 3 games.
                  </p>
                  <Badge variant="outline">Secondary Condition</Badge>
                </div>

                <div className="p-4 border rounded-md">
                  <h4 className="font-medium mb-2">Rule 4: Head-to-Head</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Home team must have won at least 1 of the last 3 meetings against the away team.
                  </p>
                  <Badge variant="outline">Secondary Condition</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
