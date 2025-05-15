"use client"

import type React from "react"

import { useCallback, useState } from "react"
import Papa from "papaparse"
import { Upload } from "lucide-react"
import type { Match } from "../types"

interface CsvUploaderProps {
  leagueId: string
  onUploadSuccess: () => void
}

export function CsvUploader({ leagueId, onUploadSuccess }: CsvUploaderProps) {
  const [uploading, setUploading] = useState(false)

  const handleFileUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (!file) return

      setUploading(true)

      Papa.parse<Match>(file, {
        header: true,
        skipEmptyLines: true,
        complete: async (result) => {
          const matches = result.data
          if (!matches || matches.length === 0) {
            alert("No matches found in CSV file")
            setUploading(false)
            return
          }

          try {
            // Upload to Supabase
            // Assuming supabase is available in this scope
            const { error } = await supabase.from("matches").insert(
              matches.map((match) => ({
                ...match,
                league_id: leagueId,
                home_score: Number(match.home_score),
                away_score: Number(match.away_score),
                ht_home_score: Number(match.ht_home_score),
                ht_away_score: Number(match.ht_away_score),
              })),
            )

            if (error) {
              console.error("Error uploading matches:", error)
              alert(`Error uploading matches: ${error.message}`)
            } else {
              alert("Matches uploaded successfully!")
              onUploadSuccess()
            }
          } catch (e) {
            console.error("Upload error", e)
            alert("Upload failed")
          } finally {
            setUploading(false)
          }
        },
        error: (error) => {
          console.error("CSV parsing error", error)
          alert(`CSV parsing error: ${error.message}`)
          setUploading(false)
        },
      })
    },
    [leagueId, onUploadSuccess],
  )

  return (
    <div>
      <label
        htmlFor="upload-csv"
        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-10 px-4 py-2"
      >
        <Upload className="w-4 h-4 mr-2" />
        Upload CSV
      </label>
      <input
        type="file"
        id="upload-csv"
        accept=".csv"
        onChange={handleFileUpload}
        disabled={uploading}
        className="sr-only"
      />
      {uploading && <p className="mt-2 text-sm text-gray-400">Uploading...</p>}
    </div>
  )
}
