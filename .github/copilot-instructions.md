# Copilot Workspace Instructions for Picker Wheel

## Purpose
Enable GitHub Copilot and AI agents to assist productively in the Picker Wheel workspace, following project-specific conventions and avoiding common pitfalls.

## Project Overview
- **Single-file widget:** All code (HTML, CSS, JS) is inlined in index.html.
- **No dependencies:** No build tools, package managers, or external libraries.
- **Widget usage:** Designed for direct browser use or easy embedding.

## Key Conventions
- **All logic is in index.html.**
- **CSS variables:** Used for theming; update `.demo-container` for brand colors/fonts.
- **Persistence:** Uses localStorage for options, weights, colors, and history.
- **Initialization:** Runs on DOMContentLoaded; no manual setup required.
- **Share config:** Set `window.PickerWheelConfig` for custom share URLs and fanfare.

## Common Pitfalls
- **Do not split code into multiple files.** All changes must remain in index.html.
- **Avoid adding dependencies or build steps.** Keep the project dependency-free.
- **Do not remove accessibility features** (e.g., `.sr-only` class).
- **Do not break mobile responsiveness.** Test changes on various screen sizes.

## Build/Test Commands
- **No build or test commands.**
- **To test:** Open index.html in a browser.

## Example Prompts
- "Add a new option to the picker wheel UI."
- "Change the default slice colors."
- "Make the spin animation faster."
- "Add a new social share platform."
- "Fix accessibility for screen readers."

## Agent Customization Suggestions
- **Frontend-only instructions:** ApplyTo index.html for UI/logic changes.
- **Accessibility agent:** Create agent to audit and improve ARIA and screen-reader support.
- **Widget embed agent:** Create agent to generate embed code for various platforms (WordPress, Squarespace, etc.).

---
For more details, see README.md and index.html.
