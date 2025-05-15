"use client"

import { PageTemplate } from "@/components/templates/page-template"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"

export default function TemplateGuidePage() {
  return (
    <PageTemplate
      title="Sablon használati útmutató"
      description="Hogyan használd a PageTemplate komponenst minden oldalon"
    >
      <div className="space-y-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Fontos információ</AlertTitle>
          <AlertDescription>
            Ez az oldal bemutatja, hogyan használd a PageTemplate komponenst az összes oldalon egységes megjelenés
            érdekében.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="usage">
          <TabsList>
            <TabsTrigger value="usage">Használat</TabsTrigger>
            <TabsTrigger value="props">Tulajdonságok</TabsTrigger>
            <TabsTrigger value="examples">Példák</TabsTrigger>
          </TabsList>

          <TabsContent value="usage" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Alap használat</CardTitle>
                <CardDescription>Így használd a PageTemplate komponenst minden oldalon</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="rounded-md bg-muted p-4 overflow-x-auto">
                  <code>{`
import { PageTemplate } from "@/components/templates/page-template"

export default function YourPage() {
  return (
    <PageTemplate 
      title="Oldal címe" 
      description="Oldal leírása"
    >
      {/* Az oldal tartalma */}
      <div>
        <h2>Tartalom</h2>
        <p>Az oldal egyedi tartalma...</p>
      </div>
    </PageTemplate>
  )
}
                  `}</code>
                </pre>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="props" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Tulajdonságok (Props)</CardTitle>
                <CardDescription>A PageTemplate komponens testreszabható tulajdonságai</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">title</h3>
                    <p className="text-sm text-muted-foreground">Az oldal címe, ami a fejlécben jelenik meg</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">description</h3>
                    <p className="text-sm text-muted-foreground">Az oldal rövid leírása, ami a cím alatt jelenik meg</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">showHeader</h3>
                    <p className="text-sm text-muted-foreground">Fejléc megjelenítése (alapértelmezetten true)</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">showBreadcrumbs</h3>
                    <p className="text-sm text-muted-foreground">
                      Breadcrumb navigáció megjelenítése (alapértelmezetten true)
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">headerActions</h3>
                    <p className="text-sm text-muted-foreground">Egyedi gombok vagy műveletek a fejlécben</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">className</h3>
                    <p className="text-sm text-muted-foreground">Egyedi CSS osztályok a fő tartalomhoz</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Példák</CardTitle>
                <CardDescription>Különböző használati példák</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Egyedi fejléc műveletekkel</h3>
                    <pre className="rounded-md bg-muted p-4 overflow-x-auto">
                      <code>{`
const headerActions = (
  <Button>
    <Plus className="mr-2 h-4 w-4" />
    Új elem
  </Button>
)

<PageTemplate 
  title="Oldal címe" 
  headerActions={headerActions}
>
  {/* Tartalom */}
</PageTemplate>
                      `}</code>
                    </pre>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Fejléc nélkül</h3>
                    <pre className="rounded-md bg-muted p-4 overflow-x-auto">
                      <code>{`
<PageTemplate 
  showHeader={false}
>
  {/* Tartalom */}
</PageTemplate>
                      `}</code>
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTemplate>
  )
}
