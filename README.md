# Verity Encounter Helper (Web)

A **web‑based** application to help Guardians navigate the Verity encounter in Destiny&nbsp;2’s *Salvation’s Edge* raid challenges. This tool covers four modes:

* **Scenario&nbsp;1 – All Doubled** — Everyone starts *doubled* and follows a fixed deposit rotation.  
* **Scenario&nbsp;2 – One Doubled & Two Mixed** — Choose the doubled player; the app generates give‑and‑take steps for mixed roles.  
* **Scenario&nbsp;3 – All Mixed** — Computes the shortest symbol‑swap sequence (via Dijkstra’s algorithm) for a fully mixed start.  
* **Varied Geometry Challenge** — Three‑phase flow (Normal → Perfect → Normal) mapping statues to **Circle / Square / Triangle**.

---

## 📋 Prerequisites

* **Modern Web Browser** — Chrome, Edge, Firefox, Safari

---

## 🚀 Getting Started

### Option A – Use the live site *(zero setup)*

1. Visit **<https://wilsoni02.github.io/verity-tool/>**.  
2. Select a scenario tab and generate your instructions — you’re ready to raid!

### Option B – Clone the repository (offline use)

```bash
git clone https://github.com/wilsoni02/verity-tool.git
cd verity-tool
```

*Double‑click* `index.html` to launch the tool in your default browser. (No build step or local server required.)

---

## 🎮 Usage

| Tab | What to do |
|-----|------------|
| **All Doubled** | Loads automatically; review the rotation. |
| **One Doubled 2 Mixed** | Select the Doubled Player (Left / Middle / Right) → **Generate**. |
| **All Mixed** | 1⃣ Choose each statue’s shape (L → M → R)  <br> 2⃣ Pick each player’s two starting symbols under **Initial Banks**  <br> 3⃣ Click **Generate**. |
| **Varied Geometry** | Enter a permutation of **C S T** (e.g. `CST`) → **Generate**. |

### Output Controls

* **Clear** — resets the results panel  
* Copy the plain‑text instructions into Discord, notes, or an overlay

---

## 🔍 Features

* **Four Scenario Generators** — All Doubled, One Doubled 2 Mixed, All Mixed, Varied Geometry  
* **Input Validation** — prevents duplicate banks and enforces total symbol counts  
* **Optimal Path Calculation** — Dijkstra’s algorithm for Scenario 3  
* **Dark‑mode UI** — theming via CSS variables  

---

## 🛠️ Customization

| What to tweak | File & Location |
|---------------|----------------|
| Theme colors (background, accent, etc.) | `style.css` — variables `--bg`, `--fg`, `--accent` |
| Max bank capacity | `script.js` — `const MAX_BANK_SIZE` |
| Tab names / layout | `<nav>` buttons in `index.html` |
| Shape lists & call‑out logic | Helper functions at top of `script.js` |

---

## 🤝 Contributing

Bug reports, feature ideas, and pull requests are welcome! Open an issue or PR on GitHub.

---

## 📝 License

Released under the **MIT License** — see [`LICENSE`](LICENSE) for details.
