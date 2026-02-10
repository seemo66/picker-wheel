# Picker Wheel

A lightweight, dependency‑free picker wheel as a simple static page with separate files: [index.html](index.html), [style.css](style.css), and [app.js](app.js). Open locally or embed in your site.

## Features

### Core Functionality
- Add, edit, delete, and clear options
- Persistent options via localStorage
- Unique slice colors enforced automatically
- Smooth spin animation with click sounds and dramatic celebration fanfare
- Mobile-friendly, responsive layout
- Easy theming using CSS variables; optional runtime palette override

### Idle Wheel Animation
- Subtle rotation when idle for visual interest
- Pauses immediately on hover, tap, or during spin
- Resumes automatically when not interacting
- Configurable speed via `--idle-duration` CSS variable

### Weighted Options
- Assign 1×–5× probability multipliers per option
- Larger weights = bigger slice and higher selection chance
- Weights persist across page reloads

### Per-Option Color Assignment
- Choose custom colors for each option
- Wheel segments reflect your color choices
- Colors persist across reloads

### Results History Tracking
- Records all spins with option name and count
- Spin counts displayed inline next to each option
- "Clear History" control to reset counts without deleting options
- Full persistence across page reloads via localStorage

### Shareable Result Card
- Export winner result as beautifully formatted PNG image
- Shows winner name, celebration header, and branding
- Includes downloadable image for easy sharing
- Result timestamp automatically captured in filename

### Social Media Integration
- Share directly to major platforms: Facebook, Twitter/X, WhatsApp, Instagram
- Configurable share URL that links to your website or custom destination
- Platform-specific sharing flows:
  - **Facebook & Twitter/X**: Message copied to clipboard and social intent window opens
  - **WhatsApp**: Web-based link with pre-filled message
  - **Instagram**: PNG downloaded and caption copied (manual paste flow)
- Share URL is customizable via runtime config: `window.PickerWheelConfig = { shareUrl: 'your-url' }`
- Native share fallback on supported platforms (mobile)

## Quick Start

- Open [index.html](index.html) directly in your browser.
- Type options and click “Add” (need at least 2).
- Click “SPIN” to randomly select an option.
- The winner appears in a modal; choose "Download PNG" to save as an image, "Remove" to delete, or "Close" to keep it.

## Embedding

Single-file handoff (recommended):

- Deliver a single [index.html](index.html) that already contains all CSS and JS inline.
- Drop that file into your project and open it directly, or host it and embed via an iframe.

Multi-file development (this repo):

- During development, the HTML, CSS, and JS are split across [index.html](index.html), [style.css](style.css), and [app.js](app.js).
- At handoff, the CSS and JS will be inlined into the single [index.html](index.html).

Initialization happens automatically on DOMContentLoaded.

## Layout

- Desktop/tablet (wide screens): Wheel on the left, inputs and options list in a right-hand column.
- Mobile (narrow screens): Inputs and options list stack under the wheel.
 
This is handled purely with CSS grid and media queries in [style.css](style.css). Adjust the breakpoint or column widths in the `@media (min-width: 900px)` section if you want a different threshold or proportions.

## Theming (CSS Variables)

Update variables on the `.demo-container` selector in [style.css](style.css) to match your brand. Scoping to the widget container prevents collisions with site-wide variables:

- `--font-base`: Base text font stack
- `--font-heading`: Heading font stack
- `--color-text`: Base text color
- `--color-primary`: Button background color
- `--color-primary-border`: Button/input focus border color
- `--color-accent`: Accent color for delete/edit and arrow
- `--color-modal-bg`: Winner row background in the modal
- `--color-border`: Neutral border color for inputs

### Idle Animation Speed

The idle rotation uses a CSS animation applied to an outer wrapper. Adjust speed via the `--idle-duration` variable (default `30s`). Set it on `.demo-container` in [style.css](style.css) or via `window.PickerWheelTheme`:

```css
.demo-container {
  --idle-duration: 20s; /* faster idle spin */
}
/* or slower: */
/* .demo-container { --idle-duration: 45s; } */
```

Behavior notes:
- Idle rotation is active when the wheel has at least 2 options and is not spinning.
- It pauses immediately on hover, pointer/touch down, and while spinning.
- It resumes when the pointer leaves or the spin finishes.

## Runtime Palette, Theme & Share URL Override (JS)

You can override the slice palette, CSS variables, and share URL at runtime by inserting a small `<script>` above the app script in [index.html](index.html):

```html
<script>
	window.PickerWheelConfig = {
		palette: ['#6c5ce7', '#74b9ff', '#55efc4', '#ffeaa7', '#fd79a8'],
		headerImage: 'https://example.com/logo.png',  // or use a data URI
		shareUrl: 'https://your-website.com/'  // URL for social media sharing
	};

	window.PickerWheelTheme = {
		'--color-primary': '#6c5ce7',
		'--color-text': '#222',
		'--color-accent': '#e17055'
	};
</script>
```

Place this block before the main picker wheel `<script>` so the overrides are applied. Overrides target the widget container's variables.

### Share URL Configuration
By default, the `shareUrl` is automatically set to the current page's URL (`window.location.origin + pathname`). This ensures that when the widget is embedded, shares link back to the site where it's hosted.

You can optionally override this with a custom URL via config if needed:
- Point to a different website or landing page
- Track shares with custom UTM parameters or referral codes
- Use different URLs based on deployment context

Example override:
```javascript
window.PickerWheelConfig = {
  shareUrl: 'https://your-website.com/?utm_source=picker_wheel'
};
```

Default (auto-detected): Current page URL

### Header Image Customization
The `headerImage` option allows you to customize the image displayed at the top of the winner modal and result card. Provide any valid image URL or data URI. If not specified, the default logo will be shown.
## Behavior & Persistence

- Options are stored in `localStorage` under the key `pickerWheelOptions`.
- Colors are normalized (hex) and deduplicated; new options get the next unused color from the palette, with safe fallbacks.
- The spin animation uses easing and plays a light “click” sound as segments pass the arrow and a short fanfare on selection.
- Weighted options (1×–5×) are saved alongside each option under `pickerWheelOptions` and drive slice sizes and selection probability.
- Spin counts per option are stored in `localStorage` under `pickerWheelSpinCounts` and displayed inline next to each option. Use “Clear Counts” (next to “Clear Options”) to reset counts without affecting current options.
 - Custom per-option colors are saved as normalized hex values within `pickerWheelOptions` and applied to wheel slices on render.

## Development Notes

- Core logic is implemented in the `PickerWheel` class in [app.js](app.js).
- Styling uses CSS variables defined on the `.demo-container` selector in [style.css](style.css).
- The wheel is rendered with inline SVG for slices, labels, and the indicator arrow.

## Troubleshooting

- Need at least two options to spin.
- If audio is muted by the browser until user interaction, click once anywhere to unlock Web Audio.
- Duplicate colors are prevented automatically and corrected on load/edits.

## License

MIT License

Copyright (c) 2026 Brian Simpson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.