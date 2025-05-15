### Dokumentáció a Heroui Sidebar Clone Rendszerhez

## 1. Rendszer Áttekintés

### 1.1 Bevezetés

A Heroui Sidebar Clone egy modern, reszponzív sportstatisztikai és liga menedzsment rendszer, amely lehetővé teszi a felhasználók számára, hogy sportligákat, csapatokat, mérkőzéseket és statisztikákat kezeljenek. A rendszer Next.js keretrendszerre épül, és a Supabase adatbázist használja az adatok tárolására és kezelésére.

### 1.3 Technológiai Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Server Actions
- **Adatbázis**: Supabase (PostgreSQL)
- **Autentikáció**: Supabase Auth
- **Verziókezelés**: Git, GitHub
- **Deployment**: Vercel


## 2. Telepítési Útmutató

### 2.1 Előfeltételek

- Node.js 18.x vagy újabb
- npm 9.x vagy újabb
- Git
- Supabase fiók


### 2.2 Telepítési Lépések

1. **Klónozza a repository-t**:

```shellscript
git clone https://github.com/Winmix713/v0-heroui-sidebar-clone-fl.git
cd v0-heroui-sidebar-clone-fl
```


2. **Függőségek telepítése**:

```shellscript
npm install
```


3. **Környezeti változók beállítása**:
Hozzon létre egy `.env.local` fájlt a projekt gyökérkönyvtárában a következő tartalommal:

```plaintext
NEXT_PUBLIC_SUPABASE_URL=az_ön_supabase_url-je
NEXT_PUBLIC_SUPABASE_ANON_KEY=az_ön_supabase_anon_key-je
SUPABASE_SERVICE_ROLE_KEY=az_ön_supabase_service_role_key-je
```


4. **Adatbázis inicializálása**:
Futtassa a következő SQL szkripteket a Supabase SQL Editorban:

```sql
-- Leagues tábla létrehozása
CREATE TABLE leagues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  season TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('In Progress', 'Completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Teams tábla létrehozása
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  logo_url TEXT,
  players_count INTEGER DEFAULT 0,
  trophies_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Matches tábla létrehozása
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  league_id UUID REFERENCES leagues(id) ON DELETE CASCADE,
  home_team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  away_team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  date TEXT NOT NULL,
  home_score INTEGER NOT NULL,
  away_score INTEGER NOT NULL,
  ht_home_score INTEGER NOT NULL,
  ht_away_score INTEGER NOT NULL,
  round TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team Stats tábla létrehozása
CREATE TABLE team_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
  league_id UUID REFERENCES leagues(id) ON DELETE CASCADE,
  played INTEGER NOT NULL DEFAULT 0,
  won INTEGER NOT NULL DEFAULT 0,
  drawn INTEGER NOT NULL DEFAULT 0,
  lost INTEGER NOT NULL DEFAULT 0,
  goals_for INTEGER NOT NULL DEFAULT 0,
  goals_against INTEGER NOT NULL DEFAULT 0,
  goal_difference INTEGER NOT NULL DEFAULT 0,
  points INTEGER NOT NULL DEFAULT 0,
  form TEXT,
  position INTEGER NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(team_id, league_id)
);

-- CSV Uploads tábla létrehozása
CREATE TABLE csv_uploads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  league_id UUID REFERENCES leagues(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  processed_rows INTEGER DEFAULT 0,
  error_message TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```


5. **Fejlesztői szerver indítása**:

```shellscript
npm run dev
```


6. **Böngészőben megnyitás**:
Nyissa meg a `http://localhost:3000` címet a böngészőben.


### 2.3 Deployment

A rendszer Vercel-re való telepítéséhez:

1. Hozzon létre egy fiókot a [Vercel](https://vercel.com) oldalon
2. Importálja a GitHub repository-t
3. Konfigurálja a környezeti változókat
4. Kattintson a "Deploy" gombra


## 3. Adatbázis Struktúra

### 3.1 Adatbázis Diagram

```mermaid
Adatbázis Diagram.download-icon {
            cursor: pointer;
            transform-origin: center;
        }
        .download-icon .arrow-part {
            transition: transform 0.35s cubic-bezier(0.35, 0.2, 0.14, 0.95);
             transform-origin: center;
        }
        button:has(.download-icon):hover .download-icon .arrow-part, button:has(.download-icon):focus-visible .download-icon .arrow-part {
          transform: translateY(-1.5px);
        }
        #mermaid-diagram-rc3d{font-family:var(--font-geist-sans);font-size:12px;fill:#000000;}#mermaid-diagram-rc3d .error-icon{fill:#552222;}#mermaid-diagram-rc3d .error-text{fill:#552222;stroke:#552222;}#mermaid-diagram-rc3d .edge-thickness-normal{stroke-width:1px;}#mermaid-diagram-rc3d .edge-thickness-thick{stroke-width:3.5px;}#mermaid-diagram-rc3d .edge-pattern-solid{stroke-dasharray:0;}#mermaid-diagram-rc3d .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-diagram-rc3d .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-diagram-rc3d .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-diagram-rc3d .marker{fill:#666;stroke:#666;}#mermaid-diagram-rc3d .marker.cross{stroke:#666;}#mermaid-diagram-rc3d svg{font-family:var(--font-geist-sans);font-size:12px;}#mermaid-diagram-rc3d p{margin:0;}#mermaid-diagram-rc3d .entityBox{fill:#eee;stroke:#999;}#mermaid-diagram-rc3d .attributeBoxOdd{fill:#ffffff;stroke:#999;}#mermaid-diagram-rc3d .attributeBoxEven{fill:#f2f2f2;stroke:#999;}#mermaid-diagram-rc3d .relationshipLabelBox{fill:hsl(-160, 0%, 93.3333333333%);opacity:0.7;background-color:hsl(-160, 0%, 93.3333333333%);}#mermaid-diagram-rc3d .relationshipLabelBox rect{opacity:0.5;}#mermaid-diagram-rc3d .relationshipLine{stroke:#666;}#mermaid-diagram-rc3d .entityTitleText{text-anchor:middle;font-size:18px;fill:#000000;}#mermaid-diagram-rc3d #MD_PARENT_START{fill:#f5f5f5!important;stroke:#666!important;stroke-width:1;}#mermaid-diagram-rc3d #MD_PARENT_END{fill:#f5f5f5!important;stroke:#666!important;stroke-width:1;}#mermaid-diagram-rc3d .flowchart-link{stroke:hsl(var(--gray-400));stroke-width:1px;}#mermaid-diagram-rc3d .marker,#mermaid-diagram-rc3d marker,#mermaid-diagram-rc3d marker *{fill:hsl(var(--gray-400))!important;stroke:hsl(var(--gray-400))!important;}#mermaid-diagram-rc3d .label,#mermaid-diagram-rc3d text,#mermaid-diagram-rc3d text>tspan{fill:hsl(var(--black))!important;color:hsl(var(--black))!important;}#mermaid-diagram-rc3d .background,#mermaid-diagram-rc3d rect.relationshipLabelBox{fill:hsl(var(--white))!important;}#mermaid-diagram-rc3d .entityBox,#mermaid-diagram-rc3d .attributeBoxEven{fill:hsl(var(--gray-150))!important;}#mermaid-diagram-rc3d .attributeBoxOdd{fill:hsl(var(--white))!important;}#mermaid-diagram-rc3d .label-container,#mermaid-diagram-rc3d rect.actor{fill:hsl(var(--white))!important;stroke:hsl(var(--gray-400))!important;}#mermaid-diagram-rc3d line{stroke:hsl(var(--gray-400))!important;}#mermaid-diagram-rc3d :root{--mermaid-font-family:var(--font-geist-sans);}leaguesuuididPKstringnamestringseasonstringstatustimestampcreated_attimestampupdated_atteamsuuididPKstringnamestringlogo_urlintplayers_countinttrophies_counttimestampcreated_atmatchesuuididPKuuidleague_idFKuuidhome_team_idFKuuidaway_team_idFKstringdateinthome_scoreintaway_scoreintht_home_scoreintht_away_scorestringroundtimestampcreated_atteam_statsuuididPKuuidteam_idFKuuidleague_idFKintplayedintwonintdrawnintlostintgoals_forintgoals_againstintgoal_differenceintpointsstringformintpositiontimestampupdated_atcsv_uploadsuuididPKuuidleague_idFKstringfilenamestringstatusintprocessed_rowsstringerror_messagetimestampuploaded_athascontainshascontainsplays_homeplays_awayhas
```

### 3.2 Táblák Részletes Leírása

#### 3.2.1 Leagues Tábla

| Mező | Típus | Leírás
|-----|-----|-----
| id | UUID | Elsődleges kulcs
| name | TEXT | Liga neve
| season | TEXT | Szezon (pl. "2023-2024")
| status | TEXT | Liga státusza ("In Progress" vagy "Completed")
| created_at | TIMESTAMP | Létrehozás időpontja
| updated_at | TIMESTAMP | Utolsó frissítés időpontja


#### 3.2.2 Teams Tábla

| Mező | Típus | Leírás
|-----|-----|-----
| id | UUID | Elsődleges kulcs
| name | TEXT | Csapat neve
| logo_url | TEXT | Csapat logójának URL-je
| players_count | INTEGER | Játékosok száma
| trophies_count | INTEGER | Trófeák száma
| created_at | TIMESTAMP | Létrehozás időpontja


#### 3.2.3 Matches Tábla

| Mező | Típus | Leírás
|-----|-----|-----
| id | UUID | Elsődleges kulcs
| league_id | UUID | Liga azonosító (külső kulcs)
| home_team_id | UUID | Hazai csapat azonosító (külső kulcs)
| away_team_id | UUID | Vendég csapat azonosító (külső kulcs)
| date | TEXT | Mérkőzés dátuma
| home_score | INTEGER | Hazai csapat góljainak száma
| away_score | INTEGER | Vendég csapat góljainak száma
| ht_home_score | INTEGER | Hazai csapat góljainak száma félidőben
| ht_away_score | INTEGER | Vendég csapat góljainak száma félidőben
| round | TEXT | Forduló
| created_at | TIMESTAMP | Létrehozás időpontja


#### 3.2.4 Team Stats Tábla

| Mező | Típus | Leírás
|-----|-----|-----
| id | UUID | Elsődleges kulcs
| team_id | UUID | Csapat azonosító (külső kulcs)
| league_id | UUID | Liga azonosító (külső kulcs)
| played | INTEGER | Lejátszott mérkőzések száma
| won | INTEGER | Győzelmek száma
| drawn | INTEGER | Döntetlenek száma
| lost | INTEGER | Vereségek száma
| goals_for | INTEGER | Lőtt gólok száma
| goals_against | INTEGER | Kapott gólok száma
| goal_difference | INTEGER | Gólkülönbség
| points | INTEGER | Pontok száma
| form | TEXT | Forma (pl. "WWDLW")
| position | INTEGER | Helyezés a tabellán
| updated_at | TIMESTAMP | Utolsó frissítés időpontja


#### 3.2.5 CSV Uploads Tábla

| Mező | Típus | Leírás
|-----|-----|-----
| id | UUID | Elsődleges kulcs
| league_id | UUID | Liga azonosító (külső kulcs)
| filename | TEXT | Feltöltött fájl neve
| status | TEXT | Feldolgozás státusza ("pending", "processing", "completed", "failed")
| processed_rows | INTEGER | Feldolgozott sorok száma
| error_message | TEXT | Hibaüzenet (ha van)
| uploaded_at | TIMESTAMP | Feltöltés időpontja


## 4. Funkcionális Specifikáció

### 4.1 Felhasználói Szerepkörök

- **Admin**: Teljes hozzáférés minden funkcióhoz
- **Menedzser**: Ligák, csapatok és mérkőzések kezelése
- **Elemző**: Statisztikák és elemzések megtekintése
- **Felhasználó**: Alapvető adatok megtekintése


### 4.2 Fő Funkciók

#### 4.2.1 Dashboard

- Áttekintés a rendszer fő metrikáiról
- Legutóbbi mérkőzések megjelenítése
- Közelgő mérkőzések listázása
- Gyors hozzáférés a fő funkciókhoz


#### 4.2.2 League Management

- Ligák létrehozása, szerkesztése és törlése
- CSV fájlok feltöltése mérkőzésadatokkal
- Ligastatisztikák megtekintése
- Tabella és forma megjelenítése


#### 4.2.3 Teams

- Csapatok listázása és keresése
- Csapatrészletek megtekintése
- Csapatstatisztikák megjelenítése
- Csapatforma követése


#### 4.2.4 Matches

- Mérkőzések listázása és szűrése
- Mérkőzésrészletek megtekintése
- Mérkőzésstatisztikák elemzése
- Eredmények rögzítése


#### 4.2.5 Statistics

- Részletes statisztikák megjelenítése
- Teljesítményelemzés
- Grafikonok és diagramok
- Adatexportálás


#### 4.2.6 Analysis

- Fejlett elemzési eszközök
- Teljesítménytrendek
- Predikciós modellek
- Összehasonlító elemzések


### 4.3 CSV Feltöltés Folyamata

```mermaid
CSV Feltöltés Folyamata.download-icon {
            cursor: pointer;
            transform-origin: center;
        }
        .download-icon .arrow-part {
            transition: transform 0.35s cubic-bezier(0.35, 0.2, 0.14, 0.95);
             transform-origin: center;
        }
        button:has(.download-icon):hover .download-icon .arrow-part, button:has(.download-icon):focus-visible .download-icon .arrow-part {
          transform: translateY(-1.5px);
        }
        SupabaseAPIFrontendFelhasználóSupabaseAPIFrontendFelhasználó#mermaid-diagram-rcqb{font-family:var(--font-geist-sans);font-size:12px;fill:#000000;}#mermaid-diagram-rcqb .error-icon{fill:#552222;}#mermaid-diagram-rcqb .error-text{fill:#552222;stroke:#552222;}#mermaid-diagram-rcqb .edge-thickness-normal{stroke-width:1px;}#mermaid-diagram-rcqb .edge-thickness-thick{stroke-width:3.5px;}#mermaid-diagram-rcqb .edge-pattern-solid{stroke-dasharray:0;}#mermaid-diagram-rcqb .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-diagram-rcqb .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-diagram-rcqb .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-diagram-rcqb .marker{fill:#666;stroke:#666;}#mermaid-diagram-rcqb .marker.cross{stroke:#666;}#mermaid-diagram-rcqb svg{font-family:var(--font-geist-sans);font-size:12px;}#mermaid-diagram-rcqb p{margin:0;}#mermaid-diagram-rcqb .actor{stroke:hsl(0, 0%, 83%);fill:#eee;}#mermaid-diagram-rcqb text.actor>tspan{fill:#333;stroke:none;}#mermaid-diagram-rcqb .actor-line{stroke:hsl(0, 0%, 83%);}#mermaid-diagram-rcqb .messageLine0{stroke-width:1.5;stroke-dasharray:none;stroke:#333;}#mermaid-diagram-rcqb .messageLine1{stroke-width:1.5;stroke-dasharray:2,2;stroke:#333;}#mermaid-diagram-rcqb #arrowhead path{fill:#333;stroke:#333;}#mermaid-diagram-rcqb .sequenceNumber{fill:white;}#mermaid-diagram-rcqb #sequencenumber{fill:#333;}#mermaid-diagram-rcqb #crosshead path{fill:#333;stroke:#333;}#mermaid-diagram-rcqb .messageText{fill:#333;stroke:none;}#mermaid-diagram-rcqb .labelBox{stroke:hsl(0, 0%, 83%);fill:#eee;}#mermaid-diagram-rcqb .labelText,#mermaid-diagram-rcqb .labelText>tspan{fill:#333;stroke:none;}#mermaid-diagram-rcqb .loopText,#mermaid-diagram-rcqb .loopText>tspan{fill:#333;stroke:none;}#mermaid-diagram-rcqb .loopLine{stroke-width:2px;stroke-dasharray:2,2;stroke:hsl(0, 0%, 83%);fill:hsl(0, 0%, 83%);}#mermaid-diagram-rcqb .note{stroke:#999;fill:#666;}#mermaid-diagram-rcqb .noteText,#mermaid-diagram-rcqb .noteText>tspan{fill:#fff;stroke:none;}#mermaid-diagram-rcqb .activation0{fill:#f4f4f4;stroke:#666;}#mermaid-diagram-rcqb .activation1{fill:#f4f4f4;stroke:#666;}#mermaid-diagram-rcqb .activation2{fill:#f4f4f4;stroke:#666;}#mermaid-diagram-rcqb .actorPopupMenu{position:absolute;}#mermaid-diagram-rcqb .actorPopupMenuPanel{position:absolute;fill:#eee;box-shadow:0px 8px 16px 0px rgba(0,0,0,0.2);filter:drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4));}#mermaid-diagram-rcqb .actor-man line{stroke:hsl(0, 0%, 83%);fill:#eee;}#mermaid-diagram-rcqb .actor-man circle,#mermaid-diagram-rcqb line{stroke:hsl(0, 0%, 83%);fill:#eee;stroke-width:2px;}#mermaid-diagram-rcqb .flowchart-link{stroke:hsl(var(--gray-400));stroke-width:1px;}#mermaid-diagram-rcqb .marker,#mermaid-diagram-rcqb marker,#mermaid-diagram-rcqb marker *{fill:hsl(var(--gray-400))!important;stroke:hsl(var(--gray-400))!important;}#mermaid-diagram-rcqb .label,#mermaid-diagram-rcqb text,#mermaid-diagram-rcqb text>tspan{fill:hsl(var(--black))!important;color:hsl(var(--black))!important;}#mermaid-diagram-rcqb .background,#mermaid-diagram-rcqb rect.relationshipLabelBox{fill:hsl(var(--white))!important;}#mermaid-diagram-rcqb .entityBox,#mermaid-diagram-rcqb .attributeBoxEven{fill:hsl(var(--gray-150))!important;}#mermaid-diagram-rcqb .attributeBoxOdd{fill:hsl(var(--white))!important;}#mermaid-diagram-rcqb .label-container,#mermaid-diagram-rcqb rect.actor{fill:hsl(var(--white))!important;stroke:hsl(var(--gray-400))!important;}#mermaid-diagram-rcqb line{stroke:hsl(var(--gray-400))!important;}#mermaid-diagram-rcqb :root{--mermaid-font-family:var(--font-geist-sans);}CSV fájl kiválasztásaFájl feltöltéseFeltöltés rekord létrehozásaCSV fájl feldolgozásaCsapatok létrehozása/frissítéseMérkőzések mentéseStatisztikák kiszámításaCsapatstatisztikák mentéseFeltöltés státusz frissítéseSikeres feltöltés visszajelzéseSikeres feltöltés megjelenítése
```

## 5. Komponens Dokumentáció

### 5.1 Fő Komponensek

#### 5.1.1 Layouts

- **AppLayout**: Az alkalmazás fő elrendezése, tartalmazza a sidebárt és a fejlécet
- **DashboardLayout**: Dashboard oldal elrendezése
- **PageContainer**: Általános oldal konténer


#### 5.1.2 UI Komponensek

- **Sidebar**: Navigációs oldalsáv
- **Header**: Fejléc komponens
- **Card**: Kártya komponens
- **Button**: Gomb komponens
- **Table**: Táblázat komponens
- **Tabs**: Lapfülek komponens
- **Modal**: Modal ablak komponens


#### 5.1.3 Funkcionális Komponensek

- **LeagueTable**: Ligák listázása és kezelése
- **LeagueDetails**: Liga részletek megjelenítése
- **CsvUploader**: CSV fájl feltöltő komponens
- **MatchesTable**: Mérkőzések táblázata
- **StandingsTable**: Tabella megjelenítése
- **FormTable**: Csapatforma megjelenítése
- **TeamCard**: Csapat kártya komponens


### 5.2 Komponens Hierarchia

```mermaid
Komponens Hierarchia.download-icon {
            cursor: pointer;
            transform-origin: center;
        }
        .download-icon .arrow-part {
            transition: transform 0.35s cubic-bezier(0.35, 0.2, 0.14, 0.95);
             transform-origin: center;
        }
        button:has(.download-icon):hover .download-icon .arrow-part, button:has(.download-icon):focus-visible .download-icon .arrow-part {
          transform: translateY(-1.5px);
        }
        #mermaid-diagram-rcv0{font-family:var(--font-geist-sans);font-size:12px;fill:#000000;}#mermaid-diagram-rcv0 .error-icon{fill:#552222;}#mermaid-diagram-rcv0 .error-text{fill:#552222;stroke:#552222;}#mermaid-diagram-rcv0 .edge-thickness-normal{stroke-width:1px;}#mermaid-diagram-rcv0 .edge-thickness-thick{stroke-width:3.5px;}#mermaid-diagram-rcv0 .edge-pattern-solid{stroke-dasharray:0;}#mermaid-diagram-rcv0 .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-diagram-rcv0 .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-diagram-rcv0 .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-diagram-rcv0 .marker{fill:#666;stroke:#666;}#mermaid-diagram-rcv0 .marker.cross{stroke:#666;}#mermaid-diagram-rcv0 svg{font-family:var(--font-geist-sans);font-size:12px;}#mermaid-diagram-rcv0 p{margin:0;}#mermaid-diagram-rcv0 .label{font-family:var(--font-geist-sans);color:#000000;}#mermaid-diagram-rcv0 .cluster-label text{fill:#333;}#mermaid-diagram-rcv0 .cluster-label span{color:#333;}#mermaid-diagram-rcv0 .cluster-label span p{background-color:transparent;}#mermaid-diagram-rcv0 .label text,#mermaid-diagram-rcv0 span{fill:#000000;color:#000000;}#mermaid-diagram-rcv0 .node rect,#mermaid-diagram-rcv0 .node circle,#mermaid-diagram-rcv0 .node ellipse,#mermaid-diagram-rcv0 .node polygon,#mermaid-diagram-rcv0 .node path{fill:#eee;stroke:#999;stroke-width:1px;}#mermaid-diagram-rcv0 .rough-node .label text,#mermaid-diagram-rcv0 .node .label text{text-anchor:middle;}#mermaid-diagram-rcv0 .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-diagram-rcv0 .node .label{text-align:center;}#mermaid-diagram-rcv0 .node.clickable{cursor:pointer;}#mermaid-diagram-rcv0 .arrowheadPath{fill:#333333;}#mermaid-diagram-rcv0 .edgePath .path{stroke:#666;stroke-width:2.0px;}#mermaid-diagram-rcv0 .flowchart-link{stroke:#666;fill:none;}#mermaid-diagram-rcv0 .edgeLabel{background-color:white;text-align:center;}#mermaid-diagram-rcv0 .edgeLabel p{background-color:white;}#mermaid-diagram-rcv0 .edgeLabel rect{opacity:0.5;background-color:white;fill:white;}#mermaid-diagram-rcv0 .labelBkg{background-color:rgba(255, 255, 255, 0.5);}#mermaid-diagram-rcv0 .cluster rect{fill:hsl(0, 0%, 98.9215686275%);stroke:#707070;stroke-width:1px;}#mermaid-diagram-rcv0 .cluster text{fill:#333;}#mermaid-diagram-rcv0 .cluster span{color:#333;}#mermaid-diagram-rcv0 div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:var(--font-geist-sans);font-size:12px;background:hsl(-160, 0%, 93.3333333333%);border:1px solid #707070;border-radius:2px;pointer-events:none;z-index:100;}#mermaid-diagram-rcv0 .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#000000;}#mermaid-diagram-rcv0 .flowchart-link{stroke:hsl(var(--gray-400));stroke-width:1px;}#mermaid-diagram-rcv0 .marker,#mermaid-diagram-rcv0 marker,#mermaid-diagram-rcv0 marker *{fill:hsl(var(--gray-400))!important;stroke:hsl(var(--gray-400))!important;}#mermaid-diagram-rcv0 .label,#mermaid-diagram-rcv0 text,#mermaid-diagram-rcv0 text>tspan{fill:hsl(var(--black))!important;color:hsl(var(--black))!important;}#mermaid-diagram-rcv0 .background,#mermaid-diagram-rcv0 rect.relationshipLabelBox{fill:hsl(var(--white))!important;}#mermaid-diagram-rcv0 .entityBox,#mermaid-diagram-rcv0 .attributeBoxEven{fill:hsl(var(--gray-150))!important;}#mermaid-diagram-rcv0 .attributeBoxOdd{fill:hsl(var(--white))!important;}#mermaid-diagram-rcv0 .label-container,#mermaid-diagram-rcv0 rect.actor{fill:hsl(var(--white))!important;stroke:hsl(var(--gray-400))!important;}#mermaid-diagram-rcv0 line{stroke:hsl(var(--gray-400))!important;}#mermaid-diagram-rcv0 :root{--mermaid-font-family:var(--font-geist-sans);}AppLayoutSidebarHeaderMain ContentPageContainerPageHeaderContentGridMainContentSidebarContentSectionContainerLeagueManagementPageLeagueTableLeagueDetailsCsvUploaderMatchesTableStandingsTableFormTable
```

## 6. API Dokumentáció

### 6.1 API Végpontok

#### 6.1.1 League Management API

| Végpont | Metódus | Leírás | Paraméterek | Válasz
|-----|-----|-----
| `/api/leagues` | GET | Ligák lekérése | - | `{ data: League[] }`
| `/api/leagues` | POST | Új liga létrehozása | `{ name, season, status }` | `{ data: League }`
| `/api/leagues/:id` | GET | Liga részletek lekérése | `id` | `{ data: League }`
| `/api/leagues/:id` | PUT | Liga frissítése | `id, { name, season, status }` | `{ data: League }`
| `/api/leagues/:id` | DELETE | Liga törlése | `id` | `{ success: boolean }`


#### 6.1.2 Teams API

| Végpont | Metódus | Leírás | Paraméterek | Válasz
|-----|-----|-----
| `/api/teams` | GET | Csapatok lekérése | - | `{ data: Team[] }`
| `/api/teams/:id` | GET | Csapat részletek lekérése | `id` | `{ data: Team }`
| `/api/teams/:id/stats` | GET | Csapat statisztikák lekérése | `id, leagueId` | `{ data: TeamStats }`


#### 6.1.3 Matches API

| Végpont | Metódus | Leírás | Paraméterek | Válasz
|-----|-----|-----
| `/api/matches` | GET | Mérkőzések lekérése | `leagueId` | `{ data: Match[] }`
| `/api/matches/:id` | GET | Mérkőzés részletek lekérése | `id` | `{ data: Match }`


#### 6.1.4 CSV Upload API

| Végpont | Metódus | Leírás | Paraméterek | Válasz
|-----|-----|-----
| `/api/csv-upload` | POST | CSV fájl feltöltése | `leagueId, file` | `{ success: boolean, uploadId: string }`
| `/api/csv-upload-status/:id` | GET | Feltöltés státuszának lekérése | `id` | `{ status, processedRows, errorMessage }`


### 6.2 Adatmodellek

#### 6.2.1 League

```typescript
interface League {
  id: string;
  name: string;
  season: string;
  status: "In Progress" | "Completed";
  created_at: string;
  updated_at: string;
}
```

#### 6.2.2 Team

```typescript
interface Team {
  id: string;
  name: string;
  logo_url: string;
  players_count: number;
  trophies_count: number;
  created_at: string;
}
```

#### 6.2.3 Match

```typescript
interface Match {
  id: string;
  league_id: string;
  home_team_id: string;
  away_team_id: string;
  date: string;
  home_score: number;
  away_score: number;
  ht_home_score: number;
  ht_away_score: number;
  round: string;
  created_at: string;
}
```

#### 6.2.4 TeamStats

```typescript
interface TeamStats {
  id: string;
  team_id: string;
  league_id: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goals_for: number;
  goals_against: number;
  goal_difference: number;
  points: number;
  form: string;
  position: number;
  updated_at: string;
}
```

## 7. CSV Feltöltés Specifikáció

### 7.1 CSV Fájl Formátum

A rendszer a következő formátumú CSV fájlokat fogadja el:

```plaintext
date,home_team,away_team,ht_home_score,ht_away_score,home_score,away_score,round
2023-08-12,Manchester Kék,London Ágyúk,1,0,2,1,1
2023-08-19,Liverpool,Chelsea,2,0,3,1,1
```

### 7.2 Kötelező Mezők

| Mező | Típus | Leírás
|-----|-----|-----
| date | string | Mérkőzés dátuma (YYYY-MM-DD)
| home_team | string | Hazai csapat neve
| away_team | string | Vendég csapat neve
| ht_home_score | number | Hazai csapat góljainak száma félidőben
| ht_away_score | number | Vendég csapat góljainak száma félidőben
| home_score | number | Hazai csapat góljainak száma
| away_score | number | Vendég csapat góljainak száma


### 7.3 Opcionális Mezők

| Mező | Típus | Leírás
|-----|-----|-----
| round | string | Forduló
| league | string | Liga neve (ha több ligát tartalmaz a fájl)


### 7.4 Feldolgozási Folyamat

1. **Fájl feltöltése**: A felhasználó kiválasztja a CSV fájlt és a ligát
2. **Validáció**: A rendszer ellenőrzi a fájl formátumát és a kötelező mezőket
3. **Csapatok létrehozása**: Ha új csapatnevek szerepelnek, a rendszer létrehozza őket
4. **Mérkőzések mentése**: A rendszer elmenti a mérkőzésadatokat
5. **Statisztikák számítása**: A rendszer kiszámítja a csapatstatisztikákat
6. **Visszajelzés**: A felhasználó értesítést kap a feltöltés eredményéről


## 8. Felhasználói Kézikönyv

### 8.1 Bejelentkezés

1. Nyissa meg a rendszert a böngészőben
2. Adja meg felhasználónevét és jelszavát
3. Kattintson a "Bejelentkezés" gombra


### 8.2 Dashboard Használata

A Dashboard oldal áttekintést nyújt a rendszer fő metrikáiról és a legutóbbi tevékenységekről.

- **Legutóbbi mérkőzések**: Az utolsó néhány mérkőzés eredményei
- **Közelgő mérkőzések**: A következő mérkőzések listája
- **Teljesítmény mutatók**: Fő teljesítménymutatók grafikonjai
- **Gyors hozzáférés**: Gyors linkek a gyakran használt funkciókhoz


### 8.3 Liga Kezelés

#### 8.3.1 Új Liga Létrehozása

1. Navigáljon a "League Management" oldalra
2. Kattintson a "Create New League" gombra
3. Adja meg a liga nevét és szezonját
4. Kattintson a "Save" gombra


#### 8.3.2 CSV Fájl Feltöltése

1. Válassza ki a ligát, amelyhez adatokat szeretne feltölteni
2. Kattintson az "Edit League" gombra
3. A "Upload Matches Data (CSV)" szekcióban kattintson a "Choose CSV File" gombra
4. Válassza ki a CSV fájlt a számítógépéről
5. Kattintson a "Save Changes" gombra
6. Várja meg, amíg a feldolgozás befejeződik


#### 8.3.3 Liga Statisztikák Megtekintése

1. Válassza ki a ligát a listából
2. Használja a lapfüleket a különböző nézetek között:

1. **Overview**: Általános információk
2. **Matches**: Mérkőzések listája
3. **Standings**: Tabella
4. **Form**: Csapatforma





### 8.4 Csapatok Kezelése

1. Navigáljon a "Teams" oldalra
2. Használja a keresőmezőt a csapatok szűréséhez
3. Kattintson egy csapatra a részletek megtekintéséhez


### 8.5 Statisztikák Elemzése

1. Navigáljon a "Statistics" oldalra
2. Használja a lapfüleket a különböző statisztikák között:

1. **Standings**: Tabella
2. **Goals**: Gólstatisztikák
3. **Form**: Csapatforma





## 9. Hibaelhárítási Útmutató

### 9.1 Gyakori Hibák és Megoldások

#### 9.1.1 CSV Feltöltési Hibák

| Hiba | Lehetséges ok | Megoldás
|-----|-----|-----
| "Invalid CSV format" | A CSV fájl formátuma nem megfelelő | Ellenőrizze, hogy a CSV fájl a megfelelő formátumban van-e, és tartalmazza-e a kötelező mezőket
| "Duplicate match data" | A mérkőzés már létezik az adatbázisban | Ellenőrizze, hogy nem próbál-e már létező mérkőzésadatokat feltölteni
| "Team not found" | A csapat nem található az adatbázisban | Ellenőrizze a csapatneveket a CSV fájlban


#### 9.1.2 Adatbázis Kapcsolati Hibák

| Hiba | Lehetséges ok | Megoldás
|-----|-----|-----
| "Database connection error" | Probléma a Supabase kapcsolattal | Ellenőrizze a környezeti változókat és a Supabase szolgáltatás állapotát
| "Permission denied" | Nincs megfelelő jogosultság | Ellenőrizze a Supabase jogosultságokat és a Row Level Security beállításokat


#### 9.1.3 Felhasználói Felület Hibák

| Hiba | Lehetséges ok | Megoldás
|-----|-----|-----
| "Page not loading" | JavaScript hiba vagy hálózati probléma | Ellenőrizze a böngésző konzolját a hibákért, és frissítse az oldalt
| "Data not updating" | Frissítési probléma | Próbálja meg újratölteni az oldalt vagy kijelentkezni és újra bejelentkezni


### 9.2 Kapcsolat a Támogatással

Ha problémája van a rendszerrel, kérjük, vegye fel a kapcsolatot a támogatással:

- **Email**: [support@heroui-system.com](mailto:support@heroui-system.com)
- **Telefon**: +36 1 234 5678
- **Hibabejelentő rendszer**: [https://support.heroui-system.com](https://support.heroui-system.com)


## 10. Fejlesztői Dokumentáció

### 10.1 Kódszervezés

A projekt a következő struktúrát követi:

```plaintext
/
├── app/                    # Next.js App Router
│   ├── api/                # API Routes
│   ├── league-management/  # League Management oldal
│   ├── teams/              # Teams oldal
│   ├── matches/            # Matches oldal
│   ├── statistics/         # Statistics oldal
│   ├── analysis/           # Analysis oldal
│   └── ...
├── components/             # React komponensek
│   ├── ui/                 # UI komponensek
│   ├── layouts/            # Layout komponensek
│   ├── league-management/  # Liga kezelés komponensek
│   ├── teams/              # Csapat komponensek
│   └── ...
├── hooks/                  # React hooks
├── lib/                    # Segédfüggvények és utility-k
│   ├── utils/              # Általános utility-k
│   └── ...
├── public/                 # Statikus fájlok
└── styles/                 # CSS és stílus fájlok
```

### 10.2 Adatáramlás

```mermaid
Adatáramlás.download-icon {
            cursor: pointer;
            transform-origin: center;
        }
        .download-icon .arrow-part {
            transition: transform 0.35s cubic-bezier(0.35, 0.2, 0.14, 0.95);
             transform-origin: center;
        }
        button:has(.download-icon):hover .download-icon .arrow-part, button:has(.download-icon):focus-visible .download-icon .arrow-part {
          transform: translateY(-1.5px);
        }
        #mermaid-diagram-rdpk{font-family:var(--font-geist-sans);font-size:12px;fill:#000000;}#mermaid-diagram-rdpk .error-icon{fill:#552222;}#mermaid-diagram-rdpk .error-text{fill:#552222;stroke:#552222;}#mermaid-diagram-rdpk .edge-thickness-normal{stroke-width:1px;}#mermaid-diagram-rdpk .edge-thickness-thick{stroke-width:3.5px;}#mermaid-diagram-rdpk .edge-pattern-solid{stroke-dasharray:0;}#mermaid-diagram-rdpk .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-diagram-rdpk .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-diagram-rdpk .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-diagram-rdpk .marker{fill:#666;stroke:#666;}#mermaid-diagram-rdpk .marker.cross{stroke:#666;}#mermaid-diagram-rdpk svg{font-family:var(--font-geist-sans);font-size:12px;}#mermaid-diagram-rdpk p{margin:0;}#mermaid-diagram-rdpk .label{font-family:var(--font-geist-sans);color:#000000;}#mermaid-diagram-rdpk .cluster-label text{fill:#333;}#mermaid-diagram-rdpk .cluster-label span{color:#333;}#mermaid-diagram-rdpk .cluster-label span p{background-color:transparent;}#mermaid-diagram-rdpk .label text,#mermaid-diagram-rdpk span{fill:#000000;color:#000000;}#mermaid-diagram-rdpk .node rect,#mermaid-diagram-rdpk .node circle,#mermaid-diagram-rdpk .node ellipse,#mermaid-diagram-rdpk .node polygon,#mermaid-diagram-rdpk .node path{fill:#eee;stroke:#999;stroke-width:1px;}#mermaid-diagram-rdpk .rough-node .label text,#mermaid-diagram-rdpk .node .label text{text-anchor:middle;}#mermaid-diagram-rdpk .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-diagram-rdpk .node .label{text-align:center;}#mermaid-diagram-rdpk .node.clickable{cursor:pointer;}#mermaid-diagram-rdpk .arrowheadPath{fill:#333333;}#mermaid-diagram-rdpk .edgePath .path{stroke:#666;stroke-width:2.0px;}#mermaid-diagram-rdpk .flowchart-link{stroke:#666;fill:none;}#mermaid-diagram-rdpk .edgeLabel{background-color:white;text-align:center;}#mermaid-diagram-rdpk .edgeLabel p{background-color:white;}#mermaid-diagram-rdpk .edgeLabel rect{opacity:0.5;background-color:white;fill:white;}#mermaid-diagram-rdpk .labelBkg{background-color:rgba(255, 255, 255, 0.5);}#mermaid-diagram-rdpk .cluster rect{fill:hsl(0, 0%, 98.9215686275%);stroke:#707070;stroke-width:1px;}#mermaid-diagram-rdpk .cluster text{fill:#333;}#mermaid-diagram-rdpk .cluster span{color:#333;}#mermaid-diagram-rdpk div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:var(--font-geist-sans);font-size:12px;background:hsl(-160, 0%, 93.3333333333%);border:1px solid #707070;border-radius:2px;pointer-events:none;z-index:100;}#mermaid-diagram-rdpk .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#000000;}#mermaid-diagram-rdpk .flowchart-link{stroke:hsl(var(--gray-400));stroke-width:1px;}#mermaid-diagram-rdpk .marker,#mermaid-diagram-rdpk marker,#mermaid-diagram-rdpk marker *{fill:hsl(var(--gray-400))!important;stroke:hsl(var(--gray-400))!important;}#mermaid-diagram-rdpk .label,#mermaid-diagram-rdpk text,#mermaid-diagram-rdpk text>tspan{fill:hsl(var(--black))!important;color:hsl(var(--black))!important;}#mermaid-diagram-rdpk .background,#mermaid-diagram-rdpk rect.relationshipLabelBox{fill:hsl(var(--white))!important;}#mermaid-diagram-rdpk .entityBox,#mermaid-diagram-rdpk .attributeBoxEven{fill:hsl(var(--gray-150))!important;}#mermaid-diagram-rdpk .attributeBoxOdd{fill:hsl(var(--white))!important;}#mermaid-diagram-rdpk .label-container,#mermaid-diagram-rdpk rect.actor{fill:hsl(var(--white))!important;stroke:hsl(var(--gray-400))!important;}#mermaid-diagram-rdpk line{stroke:hsl(var(--gray-400))!important;}#mermaid-diagram-rdpk :root{--mermaid-font-family:var(--font-geist-sans);}AdatkérésLekérdezésSQL LekérdezésAdatokAdatokAdatokFájlFeldolgozott AdatokSQL BeszúrásStatisztika SzámításFrissített StatisztikákFelhasználói FelületAPI RétegSupabase KliensSupabase AdatbázisCSV FeltöltésCSV FeldolgozóAdatmentésStatisztika Számító
```

### 10.3 Supabase Integráció

#### 10.3.1 Kliens Inicializálása

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

#### 10.3.2 Adatlekérés Példa

```typescript
async function fetchLeagues() {
  const { data, error } = await supabase
    .from('leagues')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching leagues:', error)
    return []
  }
  
  return data || []
}
```

#### 10.3.3 Adatbeszúrás Példa

```typescript
async function createLeague(league: { name: string, season: string, status: string }) {
  const { data, error } = await supabase
    .from('leagues')
    .insert(league)
    .select()
    .single()
  
  if (error) {
    console.error('Error creating league:', error)
    throw error
  }
  
  return data
}
```

### 10.4 CSV Feldolgozás Implementáció

```typescript
import Papa from 'papaparse'

async function processCSV(file: File, leagueId: string) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        try {
          // Adatok validálása
          const validatedData = validateMatchData(results.data)
          
          // Csapatok létrehozása/lekérése
          const teams = await processTeams(validatedData)
          
          // Mérkőzések mentése
          await saveMatches(validatedData, teams, leagueId)
          
          // Statisztikák számítása
          await calculateStatistics(leagueId)
          
          resolve({ success: true, processedRows: validatedData.length })
        } catch (error) {
          reject(error)
        }
      },
      error: (error) => {
        reject(error)
      }
    })
  })
}
```

## 11. Biztonsági Dokumentáció

### 11.1 Autentikáció és Jogosultságkezelés

A rendszer a Supabase Auth szolgáltatást használja a felhasználók autentikációjára és jogosultságkezelésére.

#### 11.1.1 Autentikációs Módszerek

- Email/jelszó alapú autentikáció
- OAuth (Google, GitHub)
- Magic Link (email link)


#### 11.1.2 Jogosultsági Szintek

- **Admin**: Teljes hozzáférés
- **Menedzser**: Liga és csapat kezelés
- **Elemző**: Csak olvasási jogosultság
- **Felhasználó**: Korlátozott olvasási jogosultság


### 11.2 Adatvédelem

#### 11.2.1 Adattitkosítás

- HTTPS protokoll használata minden kommunikációhoz
- Érzékeny adatok titkosítása az adatbázisban
- Környezeti változók használata a titkos kulcsok tárolására


#### 11.2.2 GDPR Megfelelőség

- Felhasználói adatok minimalizálása
- Adatkezelési tájékoztató
- Adattörlési lehetőség


### 11.3 API Biztonság

- Rate limiting a túlterheléses támadások ellen
- CORS beállítások a nem engedélyezett hozzáférések megakadályozására
- Input validáció az injekciós támadások ellen


## 12. Teljesítmény Optimalizáció

### 12.1 Frontend Optimalizáció

- Komponensek memoizálása a felesleges újrarenderelések elkerülésére
- Képek optimalizálása a Next.js Image komponenssel
- Code splitting a gyorsabb betöltési idő érdekében
- Lazy loading a nem azonnal szükséges komponensekhez


### 12.2 Backend Optimalizáció

- Adatbázis indexek a gyakran lekérdezett mezőkön
- Lekérdezések optimalizálása
- Cachelés a gyakran használt adatokhoz
- Batch feldolgozás a nagy adatmennyiségekhez


### 12.3 Adatbázis Optimalizáció

- Megfelelő indexek használata
- Kapcsolatok optimalizálása
- Lekérdezések finomhangolása
- Adatbázis particionálás (ha szükséges)


## 13. Tesztelési Dokumentáció

### 13.1 Tesztelési Stratégia

- **Unit tesztek**: Egyedi komponensek és függvények tesztelése
- **Integrációs tesztek**: Komponensek együttműködésének tesztelése
- **End-to-end tesztek**: Teljes felhasználói folyamatok tesztelése
- **Teljesítménytesztek**: Rendszer teljesítményének tesztelése nagy terhelés alatt


### 13.2 Tesztesetek

#### 13.2.1 Liga Kezelés Tesztesetek

- Liga létrehozása sikeres
- Liga szerkesztése sikeres
- Liga törlése sikeres
- Érvénytelen adatokkal liga létrehozása sikertelen


#### 13.2.2 CSV Feltöltés Tesztesetek

- Érvényes CSV fájl feltöltése sikeres
- Érvénytelen formátumú CSV fájl feltöltése sikertelen
- Duplikált adatokat tartalmazó CSV fájl kezelése
- Nagy méretű CSV fájl feltöltése sikeres


#### 13.2.3 Statisztika Számítás Tesztesetek

- Tabella számítás helyes
- Forma számítás helyes
- Gólkülönbség számítás helyes
- Helyezések számítása helyes


## 14. Karbantartási Dokumentáció

### 14.1 Rendszeres Karbantartási Feladatok

- **Napi**: Biztonsági mentések ellenőrzése
- **Heti**: Hibanapló ellenőrzése
- **Havi**: Teljesítmény ellenőrzése, adatbázis optimalizáció
- **Negyedéves**: Biztonsági audit, szoftverfrissítések


### 14.2 Hibajavítási Folyamat

1. Hiba azonosítása és dokumentálása
2. Hiba prioritásának meghatározása
3. Hiba reprodukálása és elemzése
4. Javítás fejlesztése és tesztelése
5. Javítás telepítése
6. Utólagos ellenőrzés


### 14.3 Verziókezelés

- Szemantikus verziószámozás (MAJOR.MINOR.PATCH)
- Változásnapló vezetése
- Git branching stratégia (main, develop, feature, hotfix)


## 15. Jövőbeli Fejlesztési Tervek

### 15.1 Tervezett Funkciók

- **Predikciós Rendszer**: Mérkőzés eredmények előrejelzése gépi tanulással
- **Mobilalkalmazás**: Natív mobilalkalmazás iOS és Android platformokra
- **Bővített Elemzések**: Fejlett statisztikai elemzések és vizualizációk
- **Többnyelvű Támogatás**: Több nyelv támogatása a felhasználói felületen


### 15.2 Technológiai Fejlesztések

- **Real-time Frissítések**: WebSocket integráció a valós idejű frissítésekhez
- **GraphQL API**: REST API kiváltása GraphQL-lel a hatékonyabb adatlekéréshez
- **Mikroszolgáltatások**: Monolitikus architektúra átalakítása mikroszolgáltatásokká
- **Konténerizáció**: Docker és Kubernetes integráció a skálázhatóság érdekében


## 16. Függelék

### 16.1 Rövidítések és Szakkifejezések

| Rövidítés | Jelentés
|-----|-----|-----
| API | Application Programming Interface
| CSV | Comma-Separated Values
| GDPR | General Data Protection Regulation
| REST | Representational State Transfer
| UI | User Interface
| UUID | Universally Unique Identifier


### 16.2 Referenciák

- [Next.js Dokumentáció](https://nextjs.org/docs)
- [Supabase Dokumentáció](https://supabase.io/docs)
- [React Dokumentáció](https://reactjs.org/docs)
- [TypeScript Dokumentáció](https://www.typescriptlang.org/docs)
- [Tailwind CSS Dokumentáció](https://tailwindcss.com/docs)


### 16.3 Kapcsolattartók

- **Projekt Menedzser**: John Doe ([john.doe@example.com](mailto:john.doe@example.com))
- **Vezető Fejlesztő**: Jane Smith ([jane.smith@example.com](mailto:jane.smith@example.com))
- **Adatbázis Adminisztrátor**: Bob Johnson ([bob.johnson@example.com](mailto:bob.johnson@example.com))
- **Ügyfélszolgálat**: [support@example.com](mailto:support@example.com)
