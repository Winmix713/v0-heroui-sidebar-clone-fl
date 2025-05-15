import { PageContainer } from "@/components/ui/page-container"
import { SectionContainer } from "@/components/ui/section-container"
import { ContentGrid, MainContent, SidebarContent } from "@/components/ui/content-grid"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart, Calendar, Trophy, Users } from "lucide-react"
import { SystemLog } from "@/components/system-log"
import { VideoCard } from "@/components/video-card"
import { VimeoCard } from "@/components/vimeo-card"
import { VideoGrid } from "@/components/video-grid"

export default function Home() {
  return (
    <PageContainer>
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your Virtual Premier League management system</p>
      </div>

      <SystemLog
        title="Virtual Premier League Teams Only"
        description="This platform exclusively features Virtual Premier League teams. All match data and statistics refer to these virtual teams, not actual Premier League teams."
        type="info"
      />

      <VideoCard
        title="Premier League Header"
        videoUrl="https://player.vimeo.com/progressive_redirect/playback/859314337/rendition/1080p/file.mp4?loc=external&signature=086f2dff273737c68e918e0e6cc07912b0b15913a05c1e48fa59e573a29c5234&user_id=644152"
        aspectRatio="wide"
        className="mb-6"
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        <Card className="bg-[#121214] border-[#222224]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Total Teams</span>
                <span className="text-3xl font-bold text-white">16</span>
              </div>
              <div className="h-12 w-12 rounded-lg bg-blue-950/50 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-500 font-medium">+4</span>
              <span className="text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#121214] border-[#222224]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Upcoming Matches</span>
                <span className="text-3xl font-bold text-white">18</span>
              </div>
              <div className="h-12 w-12 rounded-lg bg-green-950/50 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-green-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-500 font-medium">+2</span>
              <span className="text-muted-foreground ml-1">from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#121214] border-[#222224]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Prediction Accuracy</span>
                <span className="text-3xl font-bold text-white">76%</span>
              </div>
              <div className="h-12 w-12 rounded-lg bg-purple-950/50 flex items-center justify-center">
                <BarChart className="h-6 w-6 text-purple-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-500 font-medium">+2.5%</span>
              <span className="text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#121214] border-[#222224]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-muted-foreground">Active Leagues</span>
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <div className="h-12 w-12 rounded-lg bg-amber-950/50 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-amber-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-muted-foreground">Virtual Premier League</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <VideoGrid columns={2} className="my-6">
        <VimeoCard
          title="Premier League Case Study"
          vimeoUrl="https://player.vimeo.com/video/854948211?h=f6230ed63b&title=0&byline=0&portrait=0&color=ffffff&muted=1&autopause=0&controls=0&loop=1&app_id=122963"
        />
        <VimeoCard
          title="Premier League Presents"
          vimeoUrl="https://player.vimeo.com/video/854712871?h=f166775e66&title=0&byline=0&portrait=0&color=ffffff&muted=1&autopause=0&controls=0&loop=1&app_id=122963"
        />
      </VideoGrid>

      {/* Main Content */}
      <ContentGrid sidebar>
        <MainContent>
          <SectionContainer>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Recent Matches</h2>
              <Trophy className="h-5 w-5 text-amber-500" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#222224]">
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Home Team</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Away Team</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Score</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#222224]">
                    <td className="py-3 px-2 text-sm">2025-05-15</td>
                    <td className="py-3 px-2 text-sm font-medium">Liverpool</td>
                    <td className="py-3 px-2 text-sm">Manchester Kék</td>
                    <td className="py-3 px-2 text-sm font-medium">2-1</td>
                    <td className="py-3 px-2">
                      <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-500/20 text-green-500">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-[#222224]">
                    <td className="py-3 px-2 text-sm">2025-05-16</td>
                    <td className="py-3 px-2 text-sm font-medium">London Ágyúk</td>
                    <td className="py-3 px-2 text-sm">Chelsea</td>
                    <td className="py-3 px-2 text-sm font-medium">0-0</td>
                    <td className="py-3 px-2">
                      <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-red-500/20 text-red-500">
                        Live
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-[#222224]">
                    <td className="py-3 px-2 text-sm">2025-05-17</td>
                    <td className="py-3 px-2 text-sm font-medium">Tottenham</td>
                    <td className="py-3 px-2 text-sm">West Ham</td>
                    <td className="py-3 px-2 text-sm font-medium">3-2</td>
                    <td className="py-3 px-2">
                      <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-500/20 text-green-500">
                        Completed
                      </span>
                    </td>
                  </tr>
                  <tr className="border-b border-[#222224]">
                    <td className="py-3 px-2 text-sm">2025-05-18</td>
                    <td className="py-3 px-2 text-sm font-medium">Aston Oroszlán</td>
                    <td className="py-3 px-2 text-sm">Everton</td>
                    <td className="py-3 px-2 text-sm font-medium">-</td>
                    <td className="py-3 px-2">
                      <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-500">
                        Upcoming
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2 text-sm">2025-05-19</td>
                    <td className="py-3 px-2 text-sm font-medium">Newcastle</td>
                    <td className="py-3 px-2 text-sm">Brighton</td>
                    <td className="py-3 px-2 text-sm font-medium">-</td>
                    <td className="py-3 px-2">
                      <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-500">
                        Upcoming
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full border-[#222224] hover:bg-[#222224] text-muted-foreground">
                View All Matches
              </Button>
            </div>
          </SectionContainer>

          <VideoGrid columns={3} className="mt-6">
            <VideoCard
              title="Premier League Logo"
              videoUrl="https://s3.eu-west-2.amazonaws.com/nomadstudio-com/videos/premier-league-rebrand-new-logo.mp4"
            />
            <VideoCard
              title="Premier League Clubs"
              videoUrl="https://s3.eu-west-2.amazonaws.com/nomadstudio-com/videos/premier-league-rebrand-clubs.mp4"
            />
            <VideoCard
              title="Premier League Colors"
              videoUrl="https://s3.eu-west-2.amazonaws.com/nomadstudio-com/videos/premier-league-rebrand-colour-2.mp4"
            />
          </VideoGrid>
        </MainContent>

        <SidebarContent>
          <SectionContainer>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Upcoming Matches</h2>
              <Calendar className="h-5 w-5 text-green-500" />
            </div>
            <div className="space-y-4">
              <div className="border border-[#222224] rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">2025-05-18 15:00</span>
                  <span className="text-xs font-medium bg-blue-600/20 text-blue-500 px-2 py-0.5 rounded">
                    Virtual Premier League
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium bg-gray-800 px-1.5 py-0.5 rounded">AO</span>
                    <span className="text-sm font-medium">Aston Oroszlán</span>
                  </div>
                  <span className="text-xs font-medium">vs</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Everton</span>
                    <span className="text-xs font-medium bg-gray-800 px-1.5 py-0.5 rounded">EV</span>
                  </div>
                </div>
              </div>

              <div className="border border-[#222224] rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">2025-05-19 20:00</span>
                  <span className="text-xs font-medium bg-blue-600/20 text-blue-500 px-2 py-0.5 rounded">
                    Virtual Premier League
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium bg-gray-800 px-1.5 py-0.5 rounded">NC</span>
                    <span className="text-sm font-medium">Newcastle</span>
                  </div>
                  <span className="text-xs font-medium">vs</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Brighton</span>
                    <span className="text-xs font-medium bg-gray-800 px-1.5 py-0.5 rounded">BR</span>
                  </div>
                </div>
              </div>

              <div className="border border-[#222224] rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">2025-05-20 16:45</span>
                  <span className="text-xs font-medium bg-blue-600/20 text-blue-500 px-2 py-0.5 rounded">
                    Virtual Premier League
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium bg-gray-800 px-1.5 py-0.5 rounded">LÁ</span>
                    <span className="text-sm font-medium">London Ágyúk</span>
                  </div>
                  <span className="text-xs font-medium">vs</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Vörös Ördögök</span>
                    <span className="text-xs font-medium bg-gray-800 px-1.5 py-0.5 rounded">VÖ</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full border-[#222224] hover:bg-[#222224] text-muted-foreground">
                View All Upcoming
              </Button>
            </div>
          </SectionContainer>

          <VimeoCard
            title="Broadcast Head to Head"
            vimeoUrl="https://player.vimeo.com/video/854717626?h=db2dafd636&title=0&byline=0&portrait=0&color=ffffff&muted=1&autopause=0&controls=0&loop=1&app_id=122963"
            className="mt-6"
          />
        </SidebarContent>
      </ContentGrid>
    </PageContainer>
  )
}
