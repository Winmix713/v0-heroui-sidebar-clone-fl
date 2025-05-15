# API Dokumentáció

Ez a dokumentum részletesen leírja a Heroui Sidebar Clone rendszer API végpontjait.

## Alapvető információk

- **Base URL**: `/api`
- **Formátum**: Minden API végpont JSON formátumban válaszol
- **Autentikáció**: A legtöbb végpont Supabase JWT tokent igényel

## Végpontok

### Liga Menedzsment API

#### Ligák lekérése

\`\`\`
GET /api/leagues
\`\`\`

**Paraméterek**:
- Nincs

**Válasz**:
\`\`\`json
{
  "data": [
    {
      "id": "uuid",
      "name": "Premier League",
      "season": "2023-2024",
      "status": "In Progress",
      "created_at": "2023-10-15T10:30:00Z",
      "updated_at": "2023-10-15T10:30:00Z"
    },
    ...
  ]
}
\`\`\`

#### Új liga létrehozása

\`\`\`
POST /api/leagues
\`\`\`

**Kérés törzs**:
\`\`\`json
{
  "name": "La Liga",
  "season": "2023-2024",
  "status": "In Progress"
}
\`\`\`

**Válasz**:
\`\`\`json
{
  "data": {
    "id": "uuid",
    "name": "La Liga",
    "season": "2023-2024",
    "status": "In Progress",
    "created_at": "2023-11-15T14:20:00Z",
    "updated_at": "2023-11-15T14:20:00Z"
  }
}
\`\`\`

#### Liga részletek lekérése

\`\`\`
GET /api/leagues/:id
\`\`\`

**Paraméterek**:
- `id`: A liga azonosítója

**Válasz**:
\`\`\`json
{
  "data": {
    "id": "uuid",
    "name": "Premier League",
    "season": "2023-2024",
    "status": "In Progress",
    "created_at": "2023-10-15T10:30:00Z",
    "updated_at": "2023-10-15T10:30:00Z"
  }
}
\`\`\`

#### Liga frissítése

\`\`\`
PUT /api/leagues/:id
\`\`\`

**Paraméterek**:
- `id`: A liga azonosítója

**Kérés törzs**:
\`\`\`json
{
  "name": "Premier League",
  "season": "2023-2024",
  "status": "Completed"
}
\`\`\`

**Válasz**:
\`\`\`json
{
  "data": {
    "id": "uuid",
    "name": "Premier League",
    "season": "2023-2024",
    "status": "Completed",
    "created_at": "2023-10-15T10:30:00Z",
    "updated_at": "2023-11-15T16:45:00Z"
  }
}
\`\`\`

#### Liga törlése

\`\`\`
DELETE /api/leagues/:id
\`\`\`

**Paraméterek**:
- `id`: A liga azonosítója

**Válasz**:
\`\`\`json
{
  "success": true
}
\`\`\`

### Teams API

#### Csapatok lekérése

\`\`\`
GET /api/teams
\`\`\`

**Paraméterek**:
- Nincs

**Válasz**:
\`\`\`json
{
  "data": [
    {
      "id": "uuid",
      "name": "Manchester City",
      "logo_url": "https://example.com/logos/mancity.png",
      "players_count": 25,
      "trophies_count": 8,
      "created_at": "2023-10-15T10:30:00Z"
    },
    ...
  ]
}
\`\`\`

#### Csapat részletek lekérése

\`\`\`
GET /api/teams/:id
\`\`\`

**Paraméterek**:
- `id`: A csapat azonosítója

**Válasz**:
\`\`\`json
{
  "data": {
    "id": "uuid",
    "name": "Manchester City",
    "logo_url": "https://example.com/logos/mancity.png",
    "players_count": 25,
    "trophies_count": 8,
    "created_at": "2023-10-15T10:30:00Z"
  }
}
\`\`\`

#### Csapat statisztikák lekérése

\`\`\`
GET /api/teams/:id/stats
\`\`\`

**Paraméterek**:
- `id`: A csapat azonosítója
- `leagueId`: A liga azonosítója (query paraméter)

**Válasz**:
\`\`\`json
{
  "data": {
    "id": "uuid",
    "team_id": "uuid",
    "league_id": "uuid",
    "played": 10,
    "won": 7,
    "drawn": 2,
    "lost": 1,
    "goals_for": 22,
    "goals_against": 8,
    "goal_difference": 14,
    "points": 23,
    "form": "WWDWL",
    "position": 1,
    "updated_at": "2023-11-15T16:45:00Z"
  }
}
\`\`\`

### Matches API

#### Mérkőzések lekérése

\`\`\`
GET /api/matches
\`\`\`

**Paraméterek**:
- `leagueId`: A liga azonosítója (query paraméter)

**Válasz**:
\`\`\`json
{
  "data": [
    {
      "id": "uuid",
      "league_id": "uuid",
      "home_team_id": "uuid",
      "away_team_id": "uuid",
      "date": "2023-10-15",
      "home_score": 2,
      "away_score": 1,
      "ht_home_score": 1,
      "ht_away_score": 0,
      "round": "1",
      "created_at": "2023-10-15T10:30:00Z"
    },
    ...
  ]
}
\`\`\`

#### Mérkőzés részletek lekérése

\`\`\`
GET /api/matches/:id
\`\`\`

**Paraméterek**:
- `id`: A mérkőzés azonosítója

**Válasz**:
\`\`\`json
{
  "data": {
    "id": "uuid",
    "league_id": "uuid",
    "home_team_id": "uuid",
    "away_team_id": "uuid",
    "date": "2023-10-15",
    "home_score": 2,
    "away_score": 1,
    "ht_home_score": 1,
    "ht_away_score": 0,
    "round": "1",
    "created_at": "2023-10-15T10:30:00Z",
    "home_team": {
      "id": "uuid",
      "name": "Manchester City",
      "logo_url": "https://example.com/logos/mancity.png"
    },
    "away_team": {
      "id": "uuid",
      "name": "Arsenal",
      "logo_url": "https://example.com/logos/arsenal.png"
    }
  }
}
\`\`\`

### CSV Upload API

#### CSV fájl feltöltése

\`\`\`
POST /api/csv-upload
\`\`\`

**Kérés**:
- `leagueId`: A liga azonosítója (form data)
- `file`: CSV fájl (form data)

**Válasz**:
\`\`\`json
{
  "success": true,
  "uploadId": "uuid"
}
\`\`\`

#### Feltöltés státuszának lekérése

\`\`\`
GET /api/csv-upload-status/:id
\`\`\`

**Paraméterek**:
- `id`: A feltöltés azonosítója

**Válasz**:
\`\`\`json
{
  "status": "completed",
  "processedRows": 240,
  "errorMessage": null
}
\`\`\`

## Hibakezelés

Minden API végpont a következő formátumban adja vissza a hibákat:

\`\`\`json
{
  "error": {
    "code": "error_code",
    "message": "Hiba leírása"
  }
}
\`\`\`

### Általános hibakódok

- `400`: Érvénytelen kérés
- `401`: Nem hitelesített
- `403`: Hozzáférés megtagadva
- `404`: Nem található
- `500`: Szerver hiba

## Példák

### cURL példa liga létrehozására

\`\`\`bash
curl -X POST \
  http://localhost:3000/api/leagues \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_JWT_TOKEN' \
  -d '{
    "name": "Bundesliga",
    "season": "2023-2024",
    "status": "In Progress"
  }'
\`\`\`

### JavaScript példa mérkőzések lekérésére

\`\`\`javascript
async function fetchMatches(leagueId) {
  const response = await fetch(`/api/matches?leagueId=${leagueId}`, {
    headers: {
      'Authorization': `Bearer ${jwtToken}`
    }
  });
  
  const data = await response.json();
  return data.data;
}
\`\`\`