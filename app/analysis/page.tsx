"use client"

import { useState } from "react"
import { PageContainer } from "@/components/ui/page-container"
import { PageHeader } from "@/components/ui/page-header"
import { ContentGrid, MainContent } from "@/components/ui/content-grid"
import { SectionContainer } from "@/components/ui/section-container"
import { LineChart, BarChart2, TrendingUp, Activity } from "lucide-react"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AnalysisPage() {
  const [timeRange, setTimeRange] = useState("30")

  return (
    <PageContainer>
      <PageHeader
        title="Analysis"
        description="Advanced analytics and performance insights for your predictions"
        icon={<LineChart className="h-5 w-5" />}
        action={
          <Select defaultValue="30" onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
        }
      />

      <ContentGrid>
        <MainContent fullWidth>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SectionContainer>
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <BarChart2 className="h-5 w-5 text-blue-400" />
                  Performance Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 pt-2">
                <Tabs defaultValue="overall">
                  <TabsList className="w-full">
                    <TabsTrigger value="overall">Overall</TabsTrigger>
                    <TabsTrigger value="leagues">By League</TabsTrigger>
                    <TabsTrigger value="teams">By Team</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overall" className="mt-4">
                    <div className="h-[300px] flex items-center justify-center bg-white/5 rounded-lg border border-white/10">
                      <p className="text-gray-400">Overall performance chart will be displayed here</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="leagues" className="mt-4">
                    <div className="h-[300px] flex items-center justify-center bg-white/5 rounded-lg border border-white/10">
                      <p className="text-gray-400">League performance chart will be displayed here</p>
                    </div>
                  </TabsContent>
                  <TabsContent value="teams" className="mt-4">
                    <div className="h-[300px] flex items-center justify-center bg-white/5 rounded-lg border border-white/10">
                      <p className="text-gray-400">Team performance chart will be displayed here</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </SectionContainer>

            <SectionContainer>
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Activity className="h-5 w-5 text-purple-400" />
                  Team Comparison
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 pt-2">
                <div className="flex gap-4 mb-4">
                  <Select defaultValue="liverpool">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select team 1" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="liverpool">Liverpool</SelectItem>
                      <SelectItem value="mancity">Manchester City</SelectItem>
                      <SelectItem value="arsenal">Arsenal</SelectItem>
                      <SelectItem value="chelsea">Chelsea</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="mancity">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select team 2" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="liverpool">Liverpool</SelectItem>
                      <SelectItem value="mancity">Manchester City</SelectItem>
                      <SelectItem value="arsenal">Arsenal</SelectItem>
                      <SelectItem value="chelsea">Chelsea</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="h-[300px] flex items-center justify-center bg-white/5 rounded-lg border border-white/10">
                  <p className="text-gray-400">Team comparison chart will be displayed here</p>
                </div>
              </CardContent>
            </SectionContainer>

            <SectionContainer>
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald-400" />
                  Prediction Accuracy
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 pt-2">
                <div className="h-[300px] flex items-center justify-center bg-white/5 rounded-lg border border-white/10">
                  <p className="text-gray-400">Prediction accuracy chart will be displayed here</p>
                </div>
              </CardContent>
            </SectionContainer>

            <SectionContainer>
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-amber-400" />
                  Trend Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 pt-2">
                <div className="h-[300px] flex items-center justify-center bg-white/5 rounded-lg border border-white/10">
                  <p className="text-gray-400">Trend analysis chart will be displayed here</p>
                </div>
              </CardContent>
            </SectionContainer>
          </div>
        </MainContent>
      </ContentGrid>
    </PageContainer>
  )
}
