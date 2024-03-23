# Raw Assets

## Potential Icon Sources

- https://bakadesign.dk/warhammer-40-000-icons/

## Favicon and PWA Icon

### Generating Favicon

- https://graphicdesign.stackexchange.com/questions/77359/how-to-convert-a-square-svg-to-all-size-ico
- https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs

Legacy favicon:

```sh
inkscape -w 32 -h 32 -o assets/temp/icon-32x32.png assets/icon-master.svg
convert assets/temp/icon-32x32.png public/favicon.ico
```

SVG favicon:

```sh
cp assets/icon-master.svg public/favicon.svg
```

Remove all:
- inkscape and sodipodi namespace from SVG.
- id attributes
- style attributes
- df element
- metadata element
- xml DTD element

Add SVG icon styles:

```css
.dice-face {
    stroke-width: 0.22048;
    fill: #000000;
}

.dice-pip {
    stroke-width: 0.22048;
    fill: #ffffff;
}

@media (prefers-color-scheme: dark) {
    .dice-face {
        stroke-width: 0.22048;
        fill: #ffffff;
    }

    .dice-pip {
        stroke-width: 0.22048;
        fill: #000000;
    }
}
```

### Generating App Manifest Icons for PWAs

```sh
inkscape -w 180 -h 180 -o public/icon-180x180.png assets/icon-master.svg
inkscape -w 192 -h 192 -o public/icon-192x192.png assets/icon-master.svg
inkscape -w 512 -h 512 -o public/icon-512x512.png assets/icon-master.svg
```

### Generating Apple Icons

```sh
inkscape -w 180 -h 180 -o public/apple-touch-icon.png assets/icon-master.svg
```
