# Picker Wheel

A lightweight, dependency‑free picker wheel as a single HTML file (`index.html`). Everything (HTML, CSS, JS) is in one place, easy to open or embed.

## Features

- Add, edit, delete, and clear options
- Persistent options via localStorage
- Unique slice colors enforced automatically
- Smooth spin animation with click and fanfare sounds
- Winner modal with quick remove and close actions
- Mobile-friendly, responsive layout
- Easy theming using CSS variables; optional runtime palette override

## Quick Start

- Open [index.html](index.html) directly in your browser.
- Type options and click “Add” (need at least 2).
- Click “SPIN” to randomly select an option.
- The winner appears in a modal; choose “Remove” to delete or “Close” to keep it.

## Embedding

Two simple options:

- Copy the contents of [index.html](index.html) into your page where you want the wheel to live.
- Or embed it via an `iframe` and point the `src` to the file you host.

Initialization happens automatically on `DOMContentLoaded`.

## Theming (CSS Variables)

Update variables in the `:root` block inside the `<style>` tag in [index.html](index.html) to match your brand:

- `--font-base`: Base text font stack
- `--font-heading`: Heading font stack
- `--color-text`: Base text color
- `--color-primary`: Button background color
- `--color-primary-border`: Button/input focus border color
- `--color-accent`: Accent color for delete/edit and arrow
- `--color-modal-bg`: Winner row background in the modal
- `--color-border`: Neutral border color for inputs

## Runtime Palette & Theme Override (JS)

You can override the slice palette or CSS variables at runtime by inserting a small `<script>` above the main script block in [index.html](index.html):

```html
<script>
	window.PickerWheelConfig = {
		palette: ['#6c5ce7', '#74b9ff', '#55efc4', '#ffeaa7', '#fd79a8']
	};

	window.PickerWheelTheme = {
		'--color-primary': '#6c5ce7',
		'--color-text': '#222',
		'--color-accent': '#e17055'
	};
</script>
```

Place this block before the main picker wheel `<script>` so the overrides are applied.

## Behavior & Persistence

- Options are stored in `localStorage` under the key `pickerWheelOptions`.
- Colors are normalized (hex) and deduplicated; new options get the next unused color from the palette, with safe fallbacks.
- The spin animation uses easing and plays a light “click” sound as segments pass the arrow and a short fanfare on selection.

## Development Notes

- Core logic is implemented in the `PickerWheel` class within [index.html](index.html).
- Styling uses CSS variables defined in the `:root` block of [index.html](index.html).
- The wheel is rendered with inline SVG for slices, labels, and the indicator arrow.

## Troubleshooting

- Need at least two options to spin.
- If audio is muted by the browser until user interaction, click once anywhere to unlock Web Audio.
- Duplicate colors are prevented automatically and corrected on load/edits.

## License

No license specified. If you plan to reuse or distribute, consider adding a license to suit your needs.