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

| Original JS‑fil | Ny `.vue`‑fil          | 
| --------------- | ---------------------- | 
| `fileBrowser.js` | `FileBrowser.vue`      | 
| `breadcrumbPath.js` | `BreadcrumbPath.vue` | 
| `fileAndFolderList.js` | `FileAndFolderList.vue` |
| `fileEditor.js` | `FileEditor.vue`       | 
| `newForm.js`    | `NewForm.vue`          | 
| `deleteForm.js` | `DeleteForm.vue`       | 

Alle komponenter bruker `<script setup lang="ts">`.

---

## 3  Oppsummering filer og avghengigheter

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
   > Kontroller at ZIP-filen er under ~10 MB; hvis den er mye større har du sannsynligvis fått med `node_modules`.

2. **Last opp ZIP til Google Disk**
3. Del Zip-filen med Terje - og gi beskjed også på en annen måte at du har levert. 

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
