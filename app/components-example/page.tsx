"use client"
import { Logo } from "@/components/ui/logo"
import { SidebarNav } from "@/components/ui/sidebar-nav"
import { HeaderNav } from "@/components/ui/header-nav"
import { DashboardLayout } from "@/components/ui/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ComponentsExamplePage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Komponensek példatára</h1>
        <p className="text-gray-400">
          Ez az oldal bemutatja az alkalmazásban használt összes újrafelhasználható komponenst.
        </p>

        <Tabs defaultValue="layout">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="layout">Layout komponensek</TabsTrigger>
            <TabsTrigger value="navigation">Navigációs komponensek</TabsTrigger>
            <TabsTrigger value="branding">Branding komponensek</TabsTrigger>
          </TabsList>

          <TabsContent value="layout" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Dashboard Layout</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400 mb-4">
                  A DashboardLayout komponens tartalmazza a Sidebar és Header komponenseket, és kezeli a mobilnézet
                  állapotát.
                </p>
                <div className="border border-dashed border-gray-700 rounded-lg p-4">
                  <pre className="text-xs overflow-auto">
                    {`<DashboardLayout>
  {children}
</DashboardLayout>`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="navigation" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Sidebar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-400">
                  A Sidebar komponens tartalmazza a navigációs elemeket és a logót.
                </p>
                <div className="border border-dashed border-gray-700 rounded-lg p-4 bg-[#09090b] max-w-[240px]">
                  <SidebarNav />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Header Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-400">
                  A HeaderNav komponens a fejlécben található navigációs elemeket tartalmazza.
                </p>
                <div className="border border-dashed border-gray-700 rounded-lg p-4 bg-[#09090b]">
                  <HeaderNav />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="branding" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Logo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-2">
                  <p className="text-sm text-gray-400">Alapértelmezett logó:</p>
                  <div className="border border-dashed border-gray-700 rounded-lg p-4 inline-block">
                    <Logo />
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-gray-400">Sidebar logó:</p>
                  <div className="border border-dashed border-gray-700 rounded-lg p-4 bg-[#09090b] inline-block">
                    <Logo variant="sidebar" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
