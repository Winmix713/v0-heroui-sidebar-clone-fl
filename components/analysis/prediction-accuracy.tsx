"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, Legend, Tooltip, RadialBarChart, RadialBar } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const COLORS = ["#4ade80", "#f43f5e", "#facc15"]

const overallData = [
  { name: "Correct", value: 68 },
  { name: "Incorrect", value: 24 },
  { name: "Push", value: 8 },
]

const homeData = [
  { name: "Correct", value: 72 },
  { name: "Incorrect", value: 21 },
  { name: "Push", value: 7 },
]

const awayData = [
  { name: "Correct", value: 64 },
  { name: "Incorrect", value: 27 },
  { name: "Push", value: 9 },
]

const favoriteData = [
  { name: "Correct", value: 75 },
  { name: "Incorrect", value: 18 },
  { name: "Push", value: 7 },
]

const underdogData = [
  { name: "Correct", value: 58 },
  { name: "Incorrect", value: 32 },
  { name: "Push", value: 10 },
]

export function PredictionAccuracy() {
  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle>Prediction Accuracy</CardTitle>
          <CardDescription>Breakdown of prediction results by category</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overall" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="overall">Overall</TabsTrigger>
            <TabsTrigger value="homeaway">Home/Away</TabsTrigger>
            <TabsTrigger value="favdog">Fav/Underdog</TabsTrigger>
          </TabsList>

          <TabsContent value="overall" className="space-y-4">
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="10%"
                  outerRadius="80%"
                  barSize={20}
                  data={[
                    { name: "Correct", value: 68, fill: COLORS[0] },
                    { name: "Incorrect", value: 24, fill: COLORS[1] },
                    { name: "Push", value: 8, fill: COLORS[2] },
                  ]}
                >
                  <RadialBar label={{ position: "insideStart", fill: "#fff" }} background dataKey="value" />
                  <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
                  <Tooltip />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>
                Total Predictions: <span className="font-medium text-foreground">1,200</span>
              </p>
              <p>
                Correct Predictions: <span className="font-medium text-foreground">816 (68%)</span>
              </p>
              <p>
                ROI: <span className="font-medium text-foreground">+12.5%</span>
              </p>
            </div>
          </TabsContent>

          <TabsContent value="homeaway" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2 text-center">Home Teams</h4>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                      cx="50%"
                      cy="50%"
                      innerRadius="10%"
                      outerRadius="80%"
                      barSize={20}
                      data={[
                        { name: "Correct", value: homeData[0].value, fill: COLORS[0] },
                        { name: "Incorrect", value: homeData[1].value, fill: COLORS[1] },
                        { name: "Push", value: homeData[2].value, fill: COLORS[2] },
                      ]}
                    >
                      <RadialBar label={{ position: "insideStart", fill: "#fff" }} background dataKey="value" />
                      <Tooltip />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2 text-center">Away Teams</h4>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                      cx="50%"
                      cy="50%"
                      innerRadius="10%"
                      outerRadius="80%"
                      barSize={20}
                      data={[
                        { name: "Correct", value: awayData[0].value, fill: COLORS[0] },
                        { name: "Incorrect", value: awayData[1].value, fill: COLORS[1] },
                        { name: "Push", value: awayData[2].value, fill: COLORS[2] },
                      ]}
                    >
                      <RadialBar label={{ position: "insideStart", fill: "#fff" }} background dataKey="value" />
                      <Tooltip />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>
                Home Team Accuracy: <span className="font-medium text-foreground">72%</span>
              </p>
              <p>
                Away Team Accuracy: <span className="font-medium text-foreground">64%</span>
              </p>
              <p>
                Difference: <span className="font-medium text-foreground">+8%</span> for home teams
              </p>
            </div>
          </TabsContent>

          <TabsContent value="favdog" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2 text-center">Favorites</h4>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                      cx="50%"
                      cy="50%"
                      innerRadius="10%"
                      outerRadius="80%"
                      barSize={20}
                      data={[
                        { name: "Correct", value: favoriteData[0].value, fill: COLORS[0] },
                        { name: "Incorrect", value: favoriteData[1].value, fill: COLORS[1] },
                        { name: "Push", value: favoriteData[2].value, fill: COLORS[2] },
                      ]}
                    >
                      <RadialBar label={{ position: "insideStart", fill: "#fff" }} background dataKey="value" />
                      <Tooltip />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2 text-center">Underdogs</h4>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                      cx="50%"
                      cy="50%"
                      innerRadius="10%"
                      outerRadius="80%"
                      barSize={20}
                      data={[
                        { name: "Correct", value: underdogData[0].value, fill: COLORS[0] },
                        { name: "Incorrect", value: underdogData[1].value, fill: COLORS[1] },
                        { name: "Push", value: underdogData[2].value, fill: COLORS[2] },
                      ]}
                    >
                      <RadialBar label={{ position: "insideStart", fill: "#fff" }} background dataKey="value" />
                      <Tooltip />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>
                Favorites Accuracy: <span className="font-medium text-foreground">75%</span>
              </p>
              <p>
                Underdogs Accuracy: <span className="font-medium text-foreground">58%</span>
              </p>
              <p>
                ROI Underdogs: <span className="font-medium text-foreground">+18.2%</span> (higher payout)
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
