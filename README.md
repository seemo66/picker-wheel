# Picker Wheel

A vanilla JavaScript picker wheel component - no libraries or dependencies required!

## Features

- Pure vanilla HTML, CSS, and JavaScript
- No external dependencies
- Easy to drop into any existing website
- Customizable colors, segments, and behavior
- Smooth animations with easing
- Canvas-based rendering

## Quick Start

Simply include the CSS and JavaScript files in your HTML:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="picker-wheel.css">
</head>
<body>
    <div id="my-wheel"></div>
    <button id="spin-btn">Spin</button>

    <script src="picker-wheel.js"></script>
    <script>
        const wheel = new PickerWheel('my-wheel', {
            items: [
                { label: 'Option 1', color: '#FF6B6B' },
                { label: 'Option 2', color: '#4ECDC4' },
                { label: 'Option 3', color: '#45B7D1' },
                { label: 'Option 4', color: '#FFA07A' }
            ],
            onSpinEnd: function(result) {
                alert('You got: ' + result.label);
            }
        });

        document.getElementById('spin-btn').addEventListener('click', function() {
            wheel.spin();
        });
    </script>
</body>
</html>
```

## Options

The `PickerWheel` constructor accepts the following options:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `items` | Array | `[]` | Array of objects with `label` and optional `color` properties |
| `radius` | Number | `250` | Radius of the wheel in pixels |
| `textOffset` | Number | `0.7` | Position of text as a fraction of radius (0-1) |
| `lineWidth` | Number | `2` | Width of segment divider lines |
| `duration` | Number | `4000` | Spin duration in milliseconds |
| `spinCount` | Number | `8` | Number of full rotations during spin |
| `onSpinStart` | Function | `null` | Callback function when spin starts |
| `onSpinEnd` | Function | `null` | Callback function when spin ends (receives result) |

## Methods

- `spin()` - Start spinning the wheel
- `updateItems(items)` - Update the wheel with new items
- `destroy()` - Remove the wheel from the DOM

## Files

- `index.html` - Demo/example page
- `picker-wheel.js` - Core JavaScript module
- `picker-wheel.css` - Styling for the wheel

## Usage in Your Project

To use this picker wheel in your own project:

1. Copy `picker-wheel.js` and `picker-wheel.css` to your project
2. Include them in your HTML:
   ```html
   <link rel="stylesheet" href="path/to/picker-wheel.css">
   <script src="path/to/picker-wheel.js"></script>
   ```
3. Create a container element and initialize the wheel (see Quick Start above)

## Demo

Open `index.html` in your browser to see a working demo.

## Security Note

The picker wheel uses `Math.random()` for generating random results. This is sufficient for entertainment and demonstration purposes. However, if you're using this wheel for valuable prizes, giveaways, or gambling, you should replace the random number generation with a cryptographically secure alternative (e.g., `crypto.getRandomValues()`) to ensure fairness and prevent predictability.

## License

Free to use and modify.