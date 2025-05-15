"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, Save, ArrowRight, Check } from "lucide-react"

export function PatternCreator() {
  const [activeTab, setActiveTab] = useState("basic")
  const [patternName, setPatternName] = useState("")
  const [patternDescription, setPatternDescription] = useState("")
  const [patternCategory, setPatternCategory] = useState("Gólok")
  const [conditions, setConditions] = useState([
    { type: "Gólok", parameter: "Hazai gólok", operator: ">=", value: "2" },
  ])

  // Add new condition
  const addCondition = () => {
    setConditions([...conditions, { type: "Gólok", parameter: "Hazai gólok", operator: ">=", value: "2" }])
  }

  // Remove condition
  const removeCondition = (index: number) => {
    const newConditions = [...conditions]
    newConditions.splice(index, 1)
    setConditions(newConditions)
  }

  // Update condition
  const updateCondition = (index: number, field: string, value: string) => {
    const newConditions = [...conditions]
    newConditions[index] = { ...newConditions[index], [field]: value }
    setConditions(newConditions)
  }

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-black/20 w-full grid grid-cols-3">
          <TabsTrigger value="basic" className="data-[state=active]:bg-blue-500/20">
            Alapadatok
          </TabsTrigger>
          <TabsTrigger value="conditions" className="data-[state=active]:bg-blue-500/20">
            Feltételek
          </TabsTrigger>
          <TabsTrigger value="preview" className="data-[state=active]:bg-blue-500/20">
            Előnézet
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Basic Information */}
      {activeTab === "basic" && (
        <Card className="bg-gradient-to-br from-gray-900/60 to-gray-900/40 backdrop-blur-md border border-white/5 shadow-none">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Mintázat alapadatai</h3>

            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="pattern-name" className="text-sm font-medium text-gray-300">
                  Mintázat neve
                </label>
                <input
                  id="pattern-name"
                  type="text"
                  className="w-full bg-black/30 text-white border border-white/10 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Pl. Hazai csapat 2+ gól"
                  value={patternName}
                  onChange={(e) => setPatternName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="pattern-description" className="text-sm font-medium text-gray-300">
                  Leírás
                </label>
                <textarea
                  id="pattern-description"
                  className="w-full bg-black/30 text-white border border-white/10 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[100px]"
                  placeholder="Pl. A hazai csapat legalább 2 gólt szerez a mérkőzésen"
                  value={patternDescription}
                  onChange={(e) => setPatternDescription(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="pattern-category" className="text-sm font-medium text-gray-300">
                  Kategória
                </label>
                <select
                  id="pattern-category"
                  className="w-full bg-black/30 text-white border border-white/10 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={patternCategory}
                  onChange={(e) => setPatternCategory(e.target.value)}
                >
                  <option value="Gólok">Gólok</option>
                  <option value="Birtoklás">Birtoklás</option>
                  <option value="Eredmény">Eredmény</option>
                  <option value="Statisztika">Statisztika</option>
                </select>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setActiveTab("conditions")}>
                Tovább a feltételekhez
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Conditions */}
      {activeTab === "conditions" && (
        <Card className="bg-gradient-to-br from-gray-900/60 to-gray-900/40 backdrop-blur-md border border-white/5 shadow-none">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Mintázat feltételei</h3>

            <div className="space-y-6">
              {conditions.map((condition, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-medium">Feltétel #{index + 1}</h4>
                    <button
                      className="h-8 w-8 rounded-full bg-red-500/20 flex items-center justify-center hover:bg-red-500/30 transition-colors"
                      onClick={() => removeCondition(index)}
                    >
                      <Trash2 className="h-4 w-4 text-red-400" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Típus</label>
                      <select
                        className="w-full bg-black/30 text-white border border-white/10 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={condition.type}
                        onChange={(e) => updateCondition(index, "type", e.target.value)}
                      >
                        <option value="Gólok">Gólok</option>
                        <option value="Birtoklás">Birtoklás</option>
                        <option value="Eredmény">Eredmény</option>
                        <option value="Statisztika">Statisztika</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Paraméter</label>
                      <select
                        className="w-full bg-black/30 text-white border border-white/10 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={condition.parameter}
                        onChange={(e) => updateCondition(index, "parameter", e.target.value)}
                      >
                        {condition.type === "Gólok" && (
                          <>
                            <option value="Hazai gólok">Hazai gólok</option>
                            <option value="Vendég gólok">Vendég gólok</option>
                            <option value="Összes gól">Összes gól</option>
                            <option value="Félidei gólok">Félidei gólok</option>
                          </>
                        )}
                        {condition.type === "Birtoklás" && (
                          <>
                            <option value="Hazai birtoklás">Hazai birtoklás</option>
                            <option value="Vendég birtoklás">Vendég birtoklás</option>
                            <option value="Birtoklás különbség">Birtoklás különbség</option>
                          </>
                        )}
                        {condition.type === "Eredmény" && (
                          <>
                            <option value="Félidő eredmény">Félidő eredmény</option>
                            <option value="Végeredmény">Végeredmény</option>
                            <option value="Gólkülönbség">Gólkülönbség</option>
                          </>
                        )}
                        {condition.type === "Statisztika" && (
                          <>
                            <option value="Szögletek">Szögletek</option>
                            <option value="Lövések">Lövések</option>
                            <option value="Kaput eltaláló lövések">Kaput eltaláló lövések</option>
                            <option value="Sárga lapok">Sárga lapok</option>
                          </>
                        )}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Operátor</label>
                      <select
                        className="w-full bg-black/30 text-white border border-white/10 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={condition.operator}
                        onChange={(e) => updateCondition(index, "operator", e.target.value)}
                      >
                        <option value="=">=</option>
                        <option value="!=">!=</option>
                        <option value=">">{">"}</option>
                        <option value="<">{"<"}</option>
                        <option value=">=">{"≥"}</option>
                        <option value="<=">{"≤"}</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Érték</label>
                      <input
                        type="text"
                        className="w-full bg-black/30 text-white border border-white/10 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={condition.value}
                        onChange={(e) => updateCondition(index, "value", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10"
                onClick={addCondition}
              >
                <Plus className="h-4 w-4 mr-2" />
                Új feltétel hozzáadása
              </Button>
            </div>

            <div className="mt-8 flex justify-between">
              <Button
                variant="outline"
                className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                onClick={() => setActiveTab("basic")}
              >
                Vissza
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setActiveTab("preview")}>
                Előnézet
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Preview */}
      {activeTab === "preview" && (
        <Card className="bg-gradient-to-br from-gray-900/60 to-gray-900/40 backdrop-blur-md border border-white/5 shadow-none">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-white mb-6">Mintázat előnézet</h3>

            <div className="space-y-6">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="text-white font-medium mb-2">Alapadatok</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Név:</p>
                    <p className="text-white">{patternName || "Nincs megadva"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Kategória:</p>
                    <p className="text-white">{patternCategory}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-400">Leírás:</p>
                    <p className="text-white">{patternDescription || "Nincs megadva"}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="text-white font-medium mb-2">Feltételek</h4>
                <div className="space-y-3">
                  {conditions.map((condition, index) => (
                    <div key={index} className="bg-black/20 rounded-lg p-3 border border-white/5">
                      <div className="flex items-center gap-2">
                        <span className="h-5 w-5 rounded-full bg-blue-500/20 flex items-center justify-center text-xs text-blue-400">
                          {index + 1}
                        </span>
                        <span className="text-white">
                          {condition.parameter} {condition.operator} {condition.value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
                <div className="flex items-center gap-3 mb-2">
                  <Check className="h-5 w-5 text-blue-400" />
                  <h4 className="text-white font-medium">Becsült pontosság</h4>
                </div>
                <p className="text-sm text-gray-300">
                  A megadott feltételek alapján a mintázat becsült pontossága{" "}
                  <span className="text-blue-400 font-medium">65%</span>.
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Button
                variant="outline"
                className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                onClick={() => setActiveTab("conditions")}
              >
                Vissza
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Save className="h-4 w-4 mr-2" />
                Mintázat mentése
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
