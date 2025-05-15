# Felhasználói Kézikönyv

Ez a dokumentum részletesen leírja a Heroui Sidebar Clone rendszer használatát.

## Tartalomjegyzék

1. [Bevezetés](#bevezetés)
2. [Bejelentkezés](#bejelentkezés)
3. [Dashboard](#dashboard)
4. [Liga Kezelés](#liga-kezelés)
5. [Csapatok](#csapatok)
6. [Mérkőzések](#mérkőzések)
7. [Statisztikák](#statisztikák)
8. [Elemzések](#elemzések)
9. [Beállítások](#beállítások)
10. [Hibaelhárítás](#hibaelhárítás)

## Bevezetés

A Heroui Sidebar Clone egy modern, reszponzív sportstatisztikai és liga menedzsment rendszer, amely lehetővé teszi a felhasználók számára, hogy sportligákat, csapatokat, mérkőzéseket és statisztikákat kezeljenek.

### Rendszerkövetelmények

- Modern webböngésző (Chrome, Firefox, Safari, Edge)
- Internetkapcsolat
- Minimum 1280x720 képernyőfelbontás (mobileszközökön is működik)

## Bejelentkezés

1. Nyissa meg a rendszert a böngészőben
2. A bejelentkező oldalon adja meg felhasználónevét és jelszavát
3. Kattintson a "Bejelentkezés" gombra

![Bejelentkezési képernyő](/public/placeholder-user.jpg)

### Elfelejtett jelszó

Ha elfelejtette jelszavát:

1. Kattintson az "Elfelejtett jelszó" linkre
2. Adja meg e-mail címét
3. Kattintson a "Jelszó visszaállítása" gombra
4. Ellenőrizze e-mail fiókját a további utasításokért

## Dashboard

A Dashboard oldal áttekintést nyújt a rendszer fő metrikáiról és a legutóbbi tevékenységekről.

![Dashboard képernyő](/public/placeholder-logo.png)

### Fő elemek

1. **Legutóbbi mérkőzések**: Az utolsó néhány mérkőzés eredményei
2. **Közelgő mérkőzések**: A következő mérkőzések listája
3. **Teljesítmény mutatók**: Fő teljesítménymutatók grafikonjai
4. **Gyors hozzáférés**: Gyors linkek a gyakran használt funkciókhoz

### Navigáció

A bal oldali sidebaron keresztül navigálhat a rendszer különböző részei között:

- Dashboard
- League Management
- Teams
- Matches
- Statistics
- Analysis
- Settings

## Liga Kezelés

A Liga Kezelés oldal lehetővé teszi a sportligák létrehozását, szerkesztését és kezelését.

### Új Liga Létrehozása

1. Navigáljon a "League Management" oldalra
2. Kattintson a "Create New League" gombra
3. Adja meg a liga nevét és szezonját
4. Kattintson a "Save" gombra

### Liga Szerkesztése

1. Válassza ki a ligát a listából
2. Kattintson az "Edit" gombra
3. Módosítsa a liga adatait
4. Kattintson a "Save Changes" gombra

### CSV Fájl Feltöltése

1. Válassza ki a ligát, amelyhez adatokat szeretne feltölteni
2. Kattintson az "Edit League" gombra
3. A "Upload Matches Data (CSV)" szekcióban kattintson a "Choose CSV File" gombra
4. Válassza ki a CSV fájlt a számítógépéről
5. Kattintson a "Save Changes" gombra
6. Várja meg, amíg a feldolgozás befejeződik

#### CSV Fájl Formátum

A CSV fájlnak a következő formátumban kell lennie:

\`\`\`
date,home_team,away_team,ht_home_score,ht_away_score,home_score,away_score,round
2023-08-12,Manchester City,Arsenal,1,0,2,1,1
2023-08-19,Liverpool,Chelsea,2,0,3,1,1
\`\`\`

### Liga Statisztikák Megtekintése

1. Válassza ki a ligát a listából
2. Használja a lapfüleket a különböző nézetek között:
   - **Overview**: Általános információk
   - **Matches**: Mérkőzések listája
   - **Standings**: Tabella
   - **Form**: Csapatforma

### Liga Törlése

1. Válassza ki a ligát a listából
2. Kattintson a "Delete" gombra
3. Erősítse meg a törlési szándékát

## Csapatok

A Teams oldal lehetővé teszi a csapatok kezelését és statisztikáik megtekintését.

### Csapatok Listázása

1. Navigáljon a "Teams" oldalra
2. Használja a keresőmezőt a csapatok szűréséhez
3. Kattintson egy csapatra a részletek megtekintéséhez

### Csapatrészletek Megtekintése

A csapatrészletek oldalon a következő információkat tekintheti meg:

- Csapat alapadatai
- Játékosok száma
- Trófeák száma
- Mérkőzéstörténet
- Statisztikák ligánként

## Mérkőzések

A Matches oldal lehetővé teszi a mérkőzések kezelését és részleteik megtekintését.

### Mérkőzések Listázása

1. Navigáljon a "Matches" oldalra
2. Használja a szűrőket a mérkőzések szűréséhez:
   - Liga
   - Dátum
   - Csapat
   - Eredmény
3. Kattintson egy mérkőzésre a részletek megtekintéséhez

### Mérkőzésrészletek Megtekintése

A mérkőzésrészletek oldalon a következő információkat tekintheti meg:

- Mérkőzés alapadatai
- Eredmény
- Félidei eredmény
- Csapatok adatai
- Forduló

## Statisztikák

A Statistics oldal részletes statisztikákat nyújt a ligákról, csapatokról és mérkőzésekről.

### Statisztikák Megtekintése

1. Navigáljon a "Statistics" oldalra
2. Válassza ki a ligát a legördülő menüből
3. Használja a lapfüleket a különböző statisztikák között:
   - **Standings**: Tabella
   - **Goals**: Gólstatisztikák
   - **Form**: Csapatforma

### Statisztikák Exportálása

1. Navigáljon a kívánt statisztika oldalra
2. Kattintson az "Export" gombra
3. Válassza ki az exportálás formátumát (CSV, Excel, PDF)
4. Kattintson a "Download" gombra

## Elemzések

Az Analysis oldal fejlett elemzési eszközöket nyújt a teljesítmény értékeléséhez.

### Teljesítményelemzés

1. Navigáljon az "Analysis" oldalra
2. Válassza ki a ligát és a csapatot
3. Válassza ki az elemzés típusát:
   - Teljesítménytrendek
   - Csapatösszehasonlítás
   - Predikciós pontosság
   - Trendanalízis

### Grafikonok és Diagramok

Az elemzési oldalon különböző grafikonok és diagramok segítik a teljesítmény vizualizálását:

- Vonaldiagramok a trendek megjelenítéséhez
- Oszlopdiagramok az összehasonlításokhoz
- Kördiagramok a megoszlások megjelenítéséhez
- Hőtérképek a mintázatok azonosításához

## Beállítások

A Settings oldal lehetővé teszi a felhasználói beállítások testreszabását.

### Profil Beállítások

1. Navigáljon a "Settings" oldalra
2. A "Profile" szekcióban módosíthatja a következőket:
   - Felhasználónév
   - E-mail cím
   - Jelszó
   - Profilkép

### Értesítési Beállítások

1. Navigáljon a "Settings" oldalra
2. Az "Notifications" szekcióban beállíthatja, hogy milyen értesítéseket szeretne kapni:
   - E-mail értesítések
   - Rendszerértesítések
   - Mérkőzésértesítések

### Megjelenítési Beállítások

1. Navigáljon a "Settings" oldalra
2. A "Display" szekcióban testreszabhatja a megjelenítést:
   - Téma (világos/sötét)
   - Nyelv
   - Időzóna
   - Dátumformátum

## Hibaelhárítás

### Gyakori Problémák és Megoldások

#### Bejelentkezési Problémák

**Probléma**: Nem tudok bejelentkezni a rendszerbe.

**Megoldás**:
1. Ellenőrizze, hogy helyesen adta-e meg felhasználónevét és jelszavát
2. Ellenőrizze, hogy be van-e kapcsolva a Caps Lock
3. Próbálja meg visszaállítani a jelszavát
4. Ha továbbra is problémája van, vegye fel a kapcsolatot a rendszergazdával

#### CSV Feltöltési Hibák

**Probléma**: Hiba történt a CSV fájl feltöltése során.

**Megoldás**:
1. Ellenőrizze, hogy a CSV fájl a megfelelő formátumban van-e
2. Győződjön meg róla, hogy a fájl tartalmazza a kötelező mezőket
3. Ellenőrizze, hogy nincsenek-e speciális karakterek vagy formázási problémák a fájlban
4. Próbálja meg újra feltölteni a fájlt

#### Megjelenítési Problémák

**Probléma**: Az oldal nem jelenik meg megfelelően.

**Megoldás**:
1. Frissítse az oldalt (F5 vagy Ctrl+R)
2. Törölje a böngésző gyorsítótárát
3. Próbáljon meg másik böngészőt használni
4. Ellenőrizze az internetkapcsolatát

### Kapcsolat a Támogatással

Ha problémája van a rendszerrel, kérjük, vegye fel a kapcsolatot a támogatással:

- **Email**: support@heroui-system.com
- **Telefon**: +36 1 234 5678
- **Hibabejelentő rendszer**: https://support.heroui-system.com
\`\`\`

## 10. .github/ISSUE_TEMPLATE/bug_report.md
