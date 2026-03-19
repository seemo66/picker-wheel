# Picker Wheel

A lightweight, dependency‑free picker wheel delivered as a single self-contained [index.html](index.html) file (CSS and JS are inlined). Open locally or drop onto any page as a widget.

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
  - **Facebook & Twitter/X**: Message copied to clipboard and social intent window opens
  - **WhatsApp**: Web-based link with pre-filled message
  - **Instagram**: PNG downloaded and caption copied (manual paste flow)

## Customizing Styles with PickerWheelTheme

PickerWheelTheme lets you change the look and feel of Picker Wheel by overriding built-in CSS variables. You cannot add new variables—only change the values of those already defined in the app.

**How to use:**
Set `window.PickerWheelTheme` before the main script in index.html, like this:

```html
<script>
  window.PickerWheelTheme = {
    '--color-primary': '#6c5ce7',      // Main button background
    '--color-primary-border': '#5e54a4', // Button border/focus color
    '--color-accent': '#ffb347',       // Accent color (delete/edit)
    '--color-modal-bg': '#f8f8f8',     // Modal background
    '--color-border': '#ddd',          // Neutral borders
    '--color-text': '#333',            // Main text color
    '--font-base': 'Arial, sans-serif', // Base font for app
    '--font-heading': 'Georgia, serif', // Font for headings
    '--control-height': '44px'         // Height for input/button controls
    // Only override existing variables; new ones won’t have any effect
  };
</script>
```

**What each variable controls:**
- `--color-primary`: Main button backgrounds (e.g., Add, Spin, Clear)
- `--color-primary-border`: Button/input border color on focus
- `--color-accent`: Accent color for delete/edit actions and wheel arrow
- `--color-modal-bg`: Background color for modals and result cards
- `--color-border`: Border color for inputs, options, and modal
- `--color-text`: Main text color throughout the app
- `--font-base`: Font family for most text
- `--font-heading`: Font family for headings and modal titles
- `--control-height`: Height for input fields and buttons

**Note:**
You can only override the variables listed above. Adding new variables will not change the app unless the code itself is updated.


## Customizing Behavior with PickerWheelConfig

PickerWheelConfig lets you control the app’s behavior, branding, and sharing features. Set it before the main script in index.html to override defaults.

**How to use:**
Insert a `<script>` block above the main picker wheel script in index.html:

```html
<script>
  window.PickerWheelConfig = {
    palette:     ['#6c5ce7', '#74b9ff', '#55efc4', '#ffeaa7', '#fd79a8'], // Custom slice colors
    headerImage: 'https://example.com/logo.png',  // Logo for winner modal and result card
    shareUrl:    'https://your-website.com/',     // URL for social sharing
    fanfareUrl:  'https://your-website.com/wp-content/uploads/fanfare.mp3' // Winner sound
  };
</script>
```

**What each property controls:**
- `palette`: Array of hex color strings for wheel slices. Cycles through the list as options are added. If not set, uses the built-in pastel palette.
- `headerImage`: URL or data URI for the image shown at the top of the winner modal and on downloaded result cards. Defaults to the built-in logo.
- `shareUrl`: The URL included in social share messages. Defaults to the current page URL. Override for iframe embeds, custom tracking, or canonical links.
- `fanfareUrl`: URL of the MP3 audio file played when a winner is selected. Defaults to a built-in external MP3. Set to '' to disable the sound.

**Examples:**
- To change slice colors:
  ```javascript
  window.PickerWheelConfig = { palette: ['#ff0000', '#00ff00', '#0000ff'] };
  ```
- To use your own logo:
  ```javascript
  window.PickerWheelConfig = { headerImage: 'https://yourdomain.com/logo.png' };
  ```
- To set a custom share URL:
  ```javascript
  window.PickerWheelConfig = { shareUrl: 'https://yourdomain.com/picker' };
  ```
- To change or disable the winner sound:
  ```javascript
  window.PickerWheelConfig = { fanfareUrl: 'https://yourdomain.com/fanfare.mp3' };
  // or
  window.PickerWheelConfig = { fanfareUrl: '' };
  ```

**Note:**
Always place PickerWheelConfig before the main script so your settings are applied when the widget initializes.

- Open [index.html](index.html) directly in your browser.
- Type options and click “Add” (need at least 2).
- Click “SPIN” to randomly select an option.
- The winner appears in a modal; choose "Download Image" to save as a PNG, "Remove" to delete, or "Close" to keep it.

## Embedding

All CSS and JS are inlined directly in [index.html](index.html) — no external dependencies.

- Drop [index.html](index.html) into your project and open it directly, or host it and embed via an `<iframe>`.
- To place it as a widget on an existing page, copy the contents of the `<style>` and `<script>` blocks and the widget's HTML markup into your page.

Initialization happens automatically on `DOMContentLoaded`.

### WordPress (iframe embed)

The recommended approach for WordPress is to host [index.html](index.html) as a static file (uploaded via FTP, a CDN, or GitHub Pages) and embed it using a **Custom HTML block**:

```html
<script>
  window.PickerWheelConfig = {
    shareUrl: 'https://yoursite.com/your-page-slug',
    fanfareUrl: 'https://yoursite.com/wp-content/uploads/fanfare.mp3'
  };
</script>
<iframe
  src="https://yoursite.com/picker-wheel/index.html"
  width="100%"
  height="850"
  style="border:none;"
  title="Picker Wheel">
</iframe>
```

Key points for WordPress embedding:
- **`shareUrl`** — set this to the WordPress page URL so social shares link to your page, not the iframe source file.
- **`fanfareUrl`** — the default fanfare audio is loaded from an external host. Some managed WordPress hosts block cross-origin audio via their Content Security Policy. Upload your own MP3 via the WordPress Media Library and set this to its URL. To disable the sound entirely, set `fanfareUrl: ''`.
- The `<script>` block must appear **before** the `<iframe>` tag so config is set before the widget initialises.
- WordPress may strip `<script>` tags for non-administrator roles. Use a plugin such as [WPCode](https://wpcode.com/) if you cannot save the script, or ensure you are editing as an administrator.

## Layout

- Desktop/tablet (wide screens): Wheel on the left, inputs and options list in a right-hand column.
- Mobile (narrow screens): Inputs and options list stack under the wheel.

This is handled purely with CSS grid and media queries in the `<style>` block of [index.html](index.html). Adjust the breakpoint or column widths in the `@media (min-width: 900px)` section if you want a different threshold or proportions.

## Theming (CSS Variables)

Update variables on the `.demo-container` selector in the `<style>` block of [index.html](index.html) to match your brand. Scoping to the widget container prevents collisions with site-wide variables:

- `--font-base`: Base text font stack
- `--font-heading`: Heading font stack
- `--color-text`: Base text color
- `--color-primary`: Button background color
- `--color-primary-border`: Button/input focus border color
- `--color-accent`: Accent color for delete/edit and arrow
- `--color-modal-bg`: Winner row background in the modal
- `--color-border`: Neutral border color for inputs

### Idle Animation Speed

The idle rotation uses a CSS animation applied to an outer wrapper. Adjust speed via the `--idle-duration` variable (default `30s`). Set it on `.demo-container` in the `<style>` block of [index.html](index.html) or via `window.PickerWheelTheme`:

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

## Runtime Config & Theme Override (JS)

You can override behaviour, branding, and CSS variables at runtime by inserting a small `<script>` above the main `<script>` block in [index.html](index.html):

```html
<script>
  window.PickerWheelConfig = {
    palette:     ['#6c5ce7', '#74b9ff', '#55efc4', '#ffeaa7', '#fd79a8'],
    headerImage: 'https://example.com/logo.png',  // or a data URI
    shareUrl:    'https://your-website.com/',      // URL for social sharing
    fanfareUrl:  'https://your-website.com/wp-content/uploads/fanfare.mp3' // winner sound
  };

  window.PickerWheelTheme = {
    '--color-primary': '#6c5ce7',
    '--color-text':    '#222',
    '--color-accent':  '#e17055'
  };
</script>
```

Place this block before the main picker wheel `<script>` so the overrides are applied.

### `palette`
Array of hex color strings for wheel slices. Cycles through the list as options are added. Falls back to the built-in pastel palette if not set.

### `headerImage`
URL or data URI for the image displayed at the top of the winner modal and on downloaded result cards. Defaults to the built-in logo if not set.

### `shareUrl`
The URL included in social share messages. Defaults to `window.location.origin + pathname` (the current page URL).

Override when:
- Embedded in a WordPress iframe — set to the WordPress page URL so shares link to your page, not the iframe source.
- Adding UTM parameters or referral codes.
- Deploying in a context where `window.location` doesn't reflect the canonical URL.

Example:
```javascript
window.PickerWheelConfig = {
  shareUrl: 'https://your-website.com/?utm_source=picker_wheel'
};
```

### `fanfareUrl`
URL of the MP3 audio file played when a winner is selected. Defaults to a built-in external MP3.

Override when:
- Your WordPress host's Content Security Policy blocks cross-origin audio (a common restriction on managed hosts). Upload your own MP3 via the WordPress Media Library and set this to its URL.
- You want a different sound.
- You want to disable the fanfare entirely — set `fanfareUrl: ''`.

Example:
```javascript
window.PickerWheelConfig = {
  fanfareUrl: 'https://yoursite.com/wp-content/uploads/fanfare.mp3'
};
// or to disable:
window.PickerWheelConfig = { fanfareUrl: '' };
```
## Behavior & Persistence

- Options are stored in `localStorage` under the key `pickerWheelOptions`.
- Colors are normalized (hex) and deduplicated; new options get the next unused color from the palette, with safe fallbacks.
- The spin animation uses easing and plays a light “click” sound as segments pass the arrow and a short fanfare on selection.
- Weighted options (1×–5×) are saved alongside each option under `pickerWheelOptions` and drive slice sizes and selection probability.
- Spin counts per option are stored in `localStorage` under `pickerWheelSpinCounts` and displayed inline next to each option. Use “Clear Counts” (next to “Clear Options”) to reset counts without affecting current options.
 - Custom per-option colors are saved as normalized hex values within `pickerWheelOptions` and applied to wheel slices on render.

## Social Sharing

The result modal provides per-platform sharing buttons. Behaviour differs between desktop and mobile browsers, and between platforms, due to browser and app API limitations.

### Facebook (Desktop & Mobile)

- **Desktop:** Clicking the Facebook icon opens the Facebook Share dialog with the current page URL. Users write their own post message. The preview (title, description, image) comes from the host page's Open Graph metadata.
- **Mobile:** Clicking the icon opens the device's native share sheet. Users can share the link, but the widget cannot attach the winner image — users must add images manually.
- **Limitations:** Cannot prefill text; preview content is controlled by the host page's metadata.

### X / Twitter (Desktop & Mobile)

Clicking the X icon opens the X share dialog with a pre-populated message that includes the actual winner.

Example (if "Pizza" is the winner):
> *I just spun a Picker Wheel and the winner was 'Pizza'! Create your own wheel here: https://seemo66.github.io/picker-wheel/*

Users can edit the message before posting.

### Instagram (Mobile only)

- Clicking the Instagram icon uses the device's native share sheet.
- The winner image is preloaded for sharing to Instagram Stories or Feed.
- Users must edit captions or text manually.
- Only works on mobile devices with the Instagram app installed.
- Desktop Instagram does not support sharing images directly from the widget.

### WhatsApp (Desktop & Mobile)

Clicking the WhatsApp icon opens a WhatsApp share dialog (or the app on mobile) with a pre-populated message including the winner.

Example (if "Pizza" is the winner):
> *I just spun a Picker Wheel and got 'Pizza'! Let's create your own wheel here: https://seemo66.github.io/picker-wheel/*

Users can edit the message before sending.

### Limitations Summary

| Platform | Prefill text | Attach winner image | Desktop | Mobile |
|---|---|---|---|---|
| Facebook | ✗ | ✗ | Share URL with OG preview | Link via native share |
| X / Twitter | ✓ (winner included) | ✗ | ✓ | ✓ |
| Instagram | ✗ | ✓ (mobile only) | ✗ | ✓ (native share) |
| WhatsApp | ✓ (winner included) | ✗ | ✓ | ✓ |

## Development Notes

- Core logic is implemented in the `PickerWheel` class in the `<script>` block of [index.html](index.html).
- Styling uses CSS variables defined on the `.demo-container` selector in the `<style>` block of [index.html](index.html).
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