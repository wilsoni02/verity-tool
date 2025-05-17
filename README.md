Verity Encounter Helper

A browser-based web application to guide Guardians through the Verity encounter in Destiny 2’s Salvation’s Edge raid. This tool supports four modes:

Scenario 1: All Doubled – Everyone starts “doubled” and follows a fixed deposit rotation.

Scenario 2: One Doubled & Two Mixed – Select the doubled player; generates the give-and-take steps for mixed roles.

Scenario 3: All Mixed – Computes the sequence of symbol swaps for a fully mixed start, ensuring correct totals and no duplicates.

Varied Geometry Challenge – Custom flow mapping statues to geometric shapes with callout-based consolidation and distribution.

📋 Prerequisites

Modern Web Browser (Chrome, Firefox, Edge, Safari)

No additional libraries or servers — runs entirely client-side.

🚀 Installation

Clone the repository

git clone https://github.com/<your-username>/verity-encounter-helper.git
cd verity-encounter-helper

Open index.html in your browser:

Double-click the file, or

Serve via a simple HTTP server (e.g., npx http-server).

🎮 Usage

Launch

Open index.html in your browser.

Select a Tab

All Doubled: Auto-loads on page open.

One Doubled & Two Mixed: Choose Left/Middle/Right, then click Generate.

All Mixed:

Pick each statue’s symbol (Circle/Square/Triangle).

Set each player’s two starting symbols.

Click Generate to compute steps (with input validation).

Varied Geometry: Enter a permutation of CST (e.g., TSC), then click Generate.

Output Controls

Results display in the right-hand textarea.

Clear Output empties the textarea.

🔍 Features

Four Scenario Generators for all major Verity patterns.

Input Validation prevents duplicates and enforces symbol totals.

Dark-Mode Styling with CSS variables.

Zero Dependencies: pure HTML, CSS, and vanilla JavaScript.

Responsive Layout for desktop and mobile browsers.

🛠️ Customization

Theme Colors: adjust CSS variables (--bg, --fg, --accent, etc.) in style.css.

Bank Capacity: modify MAX_BANK_SIZE in script.js.

Tabs & Labels: edit <nav> buttons and <section> IDs in index.html.

🤝 Contributing

Contributions, bug reports, and pull requests are welcome! Please open an issue or PR on GitHub.

📝 License

This project is licensed under the MIT License. See LICENSE for details.
