"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PageTemplate } from "@/components/templates/page-template"
import { Plus } from "lucide-react"

export default function TemplatePage() {
  // Egyedi fejléc műveletek
  const headerActions = (
    <Button className="gap-1">
      <Plus className="h-4 w-4" />
      <span>Új elem</span>
    </Button>
  )

  return (
    <PageTemplate
      title="Sablon oldal"
      description="Ez egy sablon oldal, amit minden más oldalon használhatsz"
      headerActions={headerActions}
    >
      <div className="grid gap-6">
        {/* Tartalom szekció */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Statisztikai kártyák */}
          {["Csapatok", "Játékosok", "Mérkőzések", "Események"].map((item, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{item}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{(index + 1) * 12}</div>
                <p className="text-xs text-muted-foreground">+{index + 2} az elmúlt hónapban</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Fő tartalom */}
        <div className="grid gap-6 md:grid-cols-6">
          {/* Bal oldali nagyobb szekció */}
          <Card className="md:col-span-4">
            <CardHeader>
              <CardTitle>Fő tartalom</CardTitle>
              <CardDescription>Itt jelenhet meg a fő tartalom, amit minden oldalon testreszabhatsz</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] rounded-md border border-dashed border-border flex items-center justify-center">
                <p className="text-muted-foreground">Fő tartalom helye</p>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button variant="outline" className="mr-2">
                Mégse
              </Button>
              <Button>Mentés</Button>
            </CardFooter>
          </Card>

          {/* Jobb oldali kisebb szekció */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Oldalsáv</CardTitle>
              <CardDescription>Kiegészítő információk</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border border-dashed border-border p-3">
                  <p className="text-sm text-muted-foreground">Információs blokk 1</p>
                </div>
                <div className="rounded-md border border-dashed border-border p-3">
                  <p className="text-sm text-muted-foreground">Információs blokk 2</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTemplate>
  )
}
