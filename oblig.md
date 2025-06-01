# Obligatorisk oppgave — «File Browser» fra Vanilla‑JS til **Vue 3 + Pinia + strict TypeScript**

> **Omfang:** beregnet til ca. **12 arbeidstimer**  
> **Mål:** Oppgaven tester at du  
> 1. porter en eksisterende _frameworkless_ SPA til Vue 3‑komponenter  
> 2. etablerer en Pinia‑store der **alle** tilstandsendringer skjer gjennom *actions*  
> 3. bruker **strict** TypeScript konsekvent i både komponenter og store  
> 4. holder datastrømmen «nedover med props – oppover med emits»

---

## 0  Forarbeid og oppsett

1. **Startprosjekt**

   ```bash
   npm create vite@latest file-browser-vue -- --template vue-ts
   cd file-browser-vue
   npm i
   npm i pinia
   ```

   Legg Pinia til i `main.ts`:

   ```ts
   import { createPinia } from 'pinia'
   const app = createApp(App)
   app.use(createPinia())
   ```

2. **TypeScript‑krav**

   I `tsconfig.json` skal

   ```json
   "strict": true,
   "skipLibCheck": false
   ```

   Ingen `any` er tillatt uten en tydelig kommentar (`// FIXME:`).

3. **Design/CSS**

   Originalen laster **Pico.css** via CDN i `index.html`. Kopier `<link …>`‑linjen, eller installer Pico lokalt.

---

## 1  Domenemodell → Pinia‑store

`model.js` beskriver både data og logikk i den opprinnelige appen. Den deles slik:

| Del i `model.js` | Hva det gjør | Hva det skal bli |
| ---------------- | ----------- | ---------------- |
| `state`‑feltet   | rot‑tilstand | `ref` / `reactive` i `defineStore(() => { … })` |
| Funksjoner som endrer data (f.eks. `saveFile`) | logiske operasjoner | **actions** |
| Visningshjelpere (`getViewState`) | filtrerer/mapper data | **getters** |

> **Viktig:** All skriving til `state` skal **kun** skje i actions.

### 1.1 Type‑definisjoner

Lage eksplisitte TypeScript datatyper for alt som finnes i appState. 


### 1.2 Store‑skjelett


---

## 2  Komponentkart

| Original JS‑fil | Ny `.vue`‑fil          | Props                                      | Emits                          | Kommentar                                          |
| --------------- | ---------------------- | ------------------------------------------ | ------------------------------ | -------------------------------------------------- |
| `fileBrowser.js` | `FileBrowser.vue`      | –                                          | –                              | **Den eneste** som bruker Pinia direkte            |
| `breadcrumbPath.js` | `BreadcrumbPath.vue` | `currentId`, `items`                       | –                              | Viser sti                                          |
| `fileAndFolderList.js` | `FileAndFolderList.vue` | `files`, `folders`, `currentId`, `current` | `select`, `select-parent`      | Klikk‑navigasjon                                   |
| `fileEditor.js` | `FileEditor.vue`       | `file`                                     | `save`, `cancel`               | `<textarea v-model>`                               |
| `newForm.js`    | `NewForm.vue`          | `currentFolder`                            | `create-new`                   | Skjema for ny fil/mappe                            |
| `deleteForm.js` | `DeleteForm.vue`       | `current`                                  | `delete-item`                  | Bekreft sletting                                   |

Alle komponenter bruker `<script setup lang="ts">`.

---

## 3  Filstruktur og datastrøm

```
App.vue
 └─► FileBrowser.vue                  // importerer useFsStore()
        ├─► BreadcrumbPath.vue        (props ↓)
        ├─► FileAndFolderList.vue     (props ↓, emits ↑)
        ├─► FileEditor.vue            (props ↓, emits ↑)
        ├─► NewForm.vue               (props ↓, emits ↑)
        └─► DeleteForm.vue            (props ↓, emits ↑)
```

`FileBrowser.vue` håndterer alle emits og kaller tilhørende actions:

## 4  Obligatoriske krav

| # | Krav | Hvordan vi tester |
|---|------|-------------------|
| 1 | `tsc --noEmit` kjører uten feil | CI‑skript |
| 2 | Ingen komponent skriver direkte til store‑state | Kodegjennomgang |
| 3 | Navigasjon, oppretting, redigering, sletting fungerer | Manuell test |
| 4 | Breadcrumb oppdateres korrekt | Manuell test |
| 6 | Koden er formatert med Prettier | Lint‑regler |

---

## 5  Innsending

1. **Lag en ZIP-fil uten `node_modules/`**

   | Plattform | Kommando | Forklaring |
   |-----------|----------|------------|
   | macOS / Linux (bash) | ```bash
zip -r file-browser-vue.zip . -x "node_modules/*"``` | `-r` rekursivt, `-x` ekskluderer alt i `node_modules/`. |
   | Windows PowerShell ≥ 5 | ```powershell
Compress-Archive -Path * -DestinationPath file-browser-vue.zip -Exclude node_modules,node_modules\*``` | `-Exclude` tar bort mappen. |
   | Git (hvis repoet er rent) | ```bash
git archive --format zip --output ../file-browser-vue.zip HEAD``` | Bruker `.gitignore` til å utelate `node_modules/`. |

   > **Tips:** Sørg for at `dist/` eller `build/` mappen *er* med i ZIP-en dersom du bygger før innsending.  
   > Kontroller at ZIP-filen er under ~10 MB; hvis den er mye større har du sannsynligvis fått med `node_modules`.

2. **Last opp ZIP til Google Disk**

   1. Gå til <https://drive.google.com/> og dra filen inn i ønsket mappe.  
   2. Høyre‑klikk filen → **Del** → skriv inn min e‑postadresse (brukernavn oppgitt i oppgaven) og gi *Viser*‑rettighet.  
      <br>Alternativt: velg «Kopier lenke», sett *Alle med lenken → Viser*, og lim lenken inn i README eller i innleveringsskjemaet.

## 6  Vurdering

| Vekting | Moment |
| ------- | ------ |
| 40 % | Funksjonalitet i henhold til kravene |
| 30 % | Typesikkerhet (ingen `any`, tydelige modeller) |
| 20 % | Arkitektur (prop/emit‑flyt, actions) |
| 10 % | Kodekvalitet (lesbarhet, navngivning, styling) |

---

## 7  Tips og vanlige feil

* **Reaktive referanser** – bruk `ref`/`computed` for små verdier, ikke `reactive` overalt.  
* **Unngå unødvendig `watch`** – getters dekker mye.  
* **ID‑generering** – originalen bruker `Date.now()`. Det er greit her også.  
* **Dialoger** – bruk `<dialog>` eller eget komponent så lenge sletting bekreftes.

---

> **Trenger du presiseringer?**  
> Spør hvis noe fortsatt er uklart. Lykke til!
