# Adatbázis Dokumentáció

Ez a dokumentum részletesen leírja a Heroui Sidebar Clone rendszer adatbázis struktúráját.

## Adatbázis Diagram

\`\`\`
+---------------+       +---------------+       +---------------+
|    leagues    |       |     teams     |       |    matches    |
+---------------+       +---------------+       +---------------+
| id            |       | id            |       | id            |
| name          |       | name          |       | league_id     |
| season        |       | logo_url      |       | home_team_id  |
| status        |       | players_count |       | away_team_id  |
| created_at    |       | trophies_count|       | date          |
| updated_at    |       | created_at    |       | home_score    |
+---------------+       +---------------+       | away_score    |
       |                        |               | ht_home_score |
       |                        |               | ht_away_score |
       |                        |               | round         |
       |                        |               | created_at    |
       |                        |               +---------------+
       |                        |                      |
       |                        |                      |
+---------------+               |                      |
|  team_stats   |<--------------+                      |
+---------------+               |                      |
| id            |               |                      |
| team_id       |<--------------+                      |
| league_id     |<--------------+----------------------+
| played        |
| won           |
| drawn         |
| lost          |
| goals_for     |
| goals_against |
| goal_difference|
| points        |
| form          |
| position      |
| updated_at    |
+---------------+

+---------------+
|  csv_uploads  |
+---------------+
| id            |
| league_id     |
| filename      |
| status        |
| processed_rows|
| error_message |
| uploaded_at   |
+---------------+
\`\`\`

## Táblák Részletes Leírása

### Leagues Tábla

A `leagues` tábla tárolja a sportligák adatait.

| Mező | Típus | Leírás | Példa |
|------|------|--------|-------|
| id | UUID | Elsődleges kulcs | 550e8400-e29b-41d4-a716-446655440000 |
| name | TEXT | Liga neve | Premier League |
| season | TEXT | Szezon (pl. "2023-2024") | 2023-2024 |
| status | TEXT | Liga státusza | In Progress |
| created_at | TIMESTAMP | Létrehozás időpontja | 2023-10-15T10:30:00Z |
| updated_at | TIMESTAMP | Utolsó frissítés időpontja | 2023-10-15T10:30:00Z |

**Megszorítások**:
- `status` csak "In Progress" vagy "Completed" lehet

### Teams Tábla

A `teams` tábla tárolja a csapatok adatait.

| Mező | Típus | Leírás | Példa |
|------|------|--------|-------|
| id | UUID | Elsődleges kulcs | 550e8400-e29b-41d4-a716-446655440001 |
| name | TEXT | Csapat neve | Manchester City |
| logo_url | TEXT | Csapat logójának URL-je | https://example.com/logos/mancity.png |
| players_count | INTEGER | Játékosok száma | 25 |
| trophies_count | INTEGER | Trófeák száma | 8 |
| created_at | TIMESTAMP | Létrehozás időpontja | 2023-10-15T10:30:00Z |

### Matches Tábla

A `matches` tábla tárolja a mérkőzések adatait.

| Mező | Típus | Leírás | Példa |
|------|------|--------|-------|
| id | UUID | Elsődleges kulcs | 550e8400-e29b-41d4-a716-446655440002 |
| league_id | UUID | Liga azonosító (külső kulcs) | 550e8400-e29b-41d4-a716-446655440000 |
| home_team_id | UUID | Hazai csapat azonosító (külső kulcs) | 550e8400-e29b-41d4-a716-446655440001 |
| away_team_id | UUID | Vendég csapat azonosító (külső kulcs) | 550e8400-e29b-41d4-a716-446655440003 |
| date | TEXT | Mérkőzés dátuma | 2023-10-15 |
| home_score | INTEGER | Hazai csapat góljainak száma | 2 |
| away_score | INTEGER | Vendég csapat góljainak száma | 1 |
| ht_home_score | INTEGER | Hazai csapat góljainak száma félidőben | 1 |
| ht_away_score | INTEGER | Vendég csapat góljainak száma félidőben | 0 |
| round | TEXT | Forduló | 1 |
| created_at | TIMESTAMP | Létrehozás időpontja | 2023-10-15T10:30:00Z |

**Külső kulcs kapcsolatok**:
- `league_id` -> `leagues.id` (CASCADE DELETE)
- `home_team_id` -> `teams.id` (CASCADE DELETE)
- `away_team_id` -> `teams.id` (CASCADE DELETE)

### Team Stats Tábla

A `team_stats` tábla tárolja a csapatok statisztikáit ligánként.

| Mező | Típus | Leírás | Példa |
|------|------|--------|-------|
| id | UUID | Elsődleges kulcs | 550e8400-e29b-41d4-a716-446655440004 |
| team_id | UUID | Csapat azonosító (külső kulcs) | 550e8400-e29b-41d4-a716-446655440001 |
| league_id | UUID | Liga azonosító (külső kulcs) | 550e8400-e29b-41d4-a716-446655440000 |
| played | INTEGER | Lejátszott mérkőzések száma | 10 |
| won | INTEGER | Győzelmek száma | 7 |
| drawn | INTEGER | Döntetlenek száma | 2 |
| lost | INTEGER | Vereségek száma | 1 |
| goals_for | INTEGER | Lőtt gólok száma | 22 |
| goals_against | INTEGER | Kapott gólok száma | 8 |
| goal_difference | INTEGER | Gólkülönbség | 14 |
| points | INTEGER | Pontok száma | 23 |
| form | TEXT | Forma (pl. "WWDWL") | WWDWL |
| position | INTEGER | Helyezés a tabellán | 1 |
| updated_at | TIMESTAMP | Utolsó frissítés időpontja | 2023-11-15T16:45:00Z |

**Külső kulcs kapcsolatok**:
- `team_id` -> `teams.id` (CASCADE DELETE)
- `league_id` -> `leagues.id` (CASCADE DELETE)

**Egyedi megszorítások**:
- `(team_id, league_id)` páros egyedi kell, hogy legyen

### CSV Uploads Tábla

A `csv_uploads` tábla tárolja a CSV feltöltések adatait.

| Mező | Típus | Leírás | Példa |
|------|------|--------|-------|
| id | UUID | Elsődleges kulcs | 550e8400-e29b-41d4-a716-446655440005 |
| league_id | UUID | Liga azonosító (külső kulcs) | 550e8400-e29b-41d4-a716-446655440000 |
| filename | TEXT | Feltöltött fájl neve | matches_2023.csv |
| status | TEXT | Feldolgozás státusza | completed |
| processed_rows | INTEGER | Feldolgozott sorok száma | 240 |
| error_message | TEXT | Hibaüzenet (ha van) | null |
| uploaded_at | TIMESTAMP | Feltöltés időpontja | 2023-11-15T14:20:00Z |

**Külső kulcs kapcsolatok**:
- `league_id` -> `leagues.id` (CASCADE DELETE)

**Megszorítások**:
- `status` csak "pending", "processing", "completed" vagy "failed" lehet

## Indexek

A teljesítmény optimalizálása érdekében a következő indexek vannak definiálva:

### Leagues Tábla
- `leagues_name_idx`: A `name` mezőre (keresés optimalizálása)
- `leagues_status_idx`: A `status` mezőre (szűrés optimalizálása)

### Teams Tábla
- `teams_name_idx`: A `name` mezőre (keresés optimalizálása)

### Matches Tábla
- `matches_league_id_idx`: A `league_id` mezőre (szűrés optimalizálása)
- `matches_home_team_id_idx`: A `home_team_id` mezőre (szűrés optimalizálása)
- `matches_away_team_id_idx`: A `away_team_id` mezőre (szűrés optimalizálása)
- `matches_date_idx`: A `date` mezőre (rendezés optimalizálása)

### Team Stats Tábla
- `team_stats_team_id_idx`: A `team_id` mezőre (szűrés optimalizálása)
- `team_stats_league_id_idx`: A `league_id` mezőre (szűrés optimalizálása)
- `team_stats_points_idx`: A `points` mezőre (rendezés optimalizálása)

## Adatbázis Inicializálás

Az adatbázis inicializálásához futtassa a következő SQL szkriptet a Supabase SQL Editorban:

\`\`\`sql
-- Leagues tábla létrehozása
CREATE TABLE IF NOT EXISTS leagues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  season TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('In Progress', 'Completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Teams tábla létrehozása
CREATE TABLE IF NOT EXISTS teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  logo_url TEXT,
  players_count INTEGER DEFAULT 0,
  trophies_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Matches tábla létrehozása
CREATE TABLE IF NOT EXISTS matches (
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
CREATE TABLE IF NOT EXISTS team_stats (
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
  position INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(team_id, league_id)
);

-- CSV Uploads tábla létrehozása
CREATE TABLE IF NOT EXISTS csv_uploads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  league_id UUID REFERENCES leagues(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  processed_rows INTEGER DEFAULT 0,
  error_message TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexek létrehozása
CREATE INDEX IF NOT EXISTS leagues_name_idx ON leagues(name);
CREATE INDEX IF NOT EXISTS leagues_status_idx ON leagues(status);
CREATE INDEX IF NOT EXISTS teams_name_idx ON teams(name);
CREATE INDEX IF NOT EXISTS matches_league_id_idx ON matches(league_id);
CREATE INDEX IF NOT EXISTS matches_home_team_id_idx ON matches(home_team_id);
CREATE INDEX IF NOT EXISTS matches_away_team_id_idx ON matches(away_team_id);
CREATE INDEX IF NOT EXISTS matches_date_idx ON matches(date);
CREATE INDEX IF NOT EXISTS team_stats_team_id_idx ON team_stats(team_id);
CREATE INDEX IF NOT EXISTS team_stats_league_id_idx ON team_stats(league_id);
CREATE INDEX IF NOT EXISTS team_stats_points_idx ON team_stats(points);
\`\`\`

## Row Level Security (RLS) Beállítások

A Supabase adatbázisban a Row Level Security (RLS) segítségével szabályozhatjuk, hogy mely felhasználók mely adatokhoz férhetnek hozzá. Az alábbi RLS szabályokat javasoljuk:

### Leagues Tábla

\`\`\`sql
-- Olvasási jogosultság mindenkinek
CREATE POLICY "Leagues are viewable by everyone" ON leagues
  FOR SELECT USING (true);

-- Írási jogosultság csak az adminoknak
CREATE POLICY "Leagues are editable by admins" ON leagues
  FOR INSERT WITH CHECK (auth.role() = 'admin');
CREATE POLICY "Leagues are updatable by admins" ON leagues
  FOR UPDATE USING (auth.role() = 'admin');
CREATE POLICY "Leagues are deletable by admins" ON leagues
  FOR DELETE USING (auth.role() = 'admin');
\`\`\`

### Teams Tábla

\`\`\`sql
-- Olvasási jogosultság mindenkinek
CREATE POLICY "Teams are viewable by everyone" ON teams
  FOR SELECT USING (true);

-- Írási jogosultság csak az adminoknak
CREATE POLICY "Teams are editable by admins" ON teams
  FOR INSERT WITH CHECK (auth.role() = 'admin');
CREATE POLICY "Teams are updatable by admins" ON teams
  FOR UPDATE USING (auth.role() = 'admin');
CREATE POLICY "Teams are deletable by admins" ON teams
  FOR DELETE USING (auth.role() = 'admin');
\`\`\`

### Matches Tábla

\`\`\`sql
-- Olvasási jogosultság mindenkinek
CREATE POLICY "Matches are viewable by everyone" ON matches
  FOR SELECT USING (true);

-- Írási jogosultság csak az adminoknak
CREATE POLICY "Matches are editable by admins" ON matches
  FOR INSERT WITH CHECK (auth.role() = 'admin');
CREATE POLICY "Matches are updatable by admins" ON matches
  FOR UPDATE USING (auth.role() = 'admin');
CREATE POLICY "Matches are deletable by admins" ON matches
  FOR DELETE USING (auth.role() = 'admin');
\`\`\`

### Team Stats Tábla

\`\`\`sql
-- Olvasási jogosultság mindenkinek
CREATE POLICY "Team stats are viewable by everyone" ON team_stats
  FOR SELECT USING (true);

-- Írási jogosultság csak az adminoknak
CREATE POLICY "Team stats are editable by admins" ON team_stats
  FOR INSERT WITH CHECK (auth.role() = 'admin');
CREATE POLICY "Team stats are updatable by admins" ON team_stats
  FOR UPDATE USING (auth.role() = 'admin');
CREATE POLICY "Team stats are deletable by admins" ON team_stats
  FOR DELETE USING (auth.role() = 'admin');
\`\`\`

### CSV Uploads Tábla

\`\`\`sql
-- Olvasási jogosultság csak az adminoknak
CREATE POLICY "CSV uploads are viewable by admins" ON csv_uploads
  FOR SELECT USING (auth.role() = 'admin');

-- Írási jogosultság csak az adminoknak
CREATE POLICY "CSV uploads are editable by admins" ON csv_uploads
  FOR INSERT WITH CHECK (auth.role() = 'admin');
CREATE POLICY "CSV uploads are updatable by admins" ON csv_uploads
  FOR UPDATE USING (auth.role() = 'admin');
CREATE POLICY "CSV uploads are deletable by admins" ON csv_uploads
  FOR DELETE USING (auth.role() = 'admin');
\`\`\`

## Adatbázis Karbantartás

Az adatbázis optimális teljesítményének fenntartása érdekében a következő karbantartási feladatokat javasoljuk:

1. **Rendszeres biztonsági mentések**: Naponta készítsen biztonsági mentést az adatbázisról
2. **VACUUM ANALYZE**: Hetente futtassa a `VACUUM ANALYZE` parancsot a táblák optimalizálásához
3. **Indexek újraépítése**: Havonta építse újra az indexeket a `REINDEX TABLE` paranccsal
4. **Statisztikák frissítése**: Hetente frissítse a statisztikákat az `ANALYZE` paranccsal
5. **Régi adatok archiválása**: Évente archiválja a régi, már nem használt adatokat
\`\`\`

## 9. docs/user-manual.md
