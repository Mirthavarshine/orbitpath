# App Icons for AI Travel Buddy Deploy Launchers

This directory contains placeholder files for custom app icons. Replace these with your actual icon files.

## Required Files

### macOS (.icns)
- **File**: `app.icns`
- **Size**: 512x512 pixels minimum (1024x1024 recommended)
- **Format**: macOS icon format (.icns)
- **Usage**: Automatically copied to the .app bundle

### Linux (.png)
- **File**: `app.png`
- **Size**: 512x512 pixels
- **Format**: PNG with transparency
- **Usage**: Referenced in .desktop file

## Creating Icons

### macOS .icns
1. Create a 1024x1024 PNG image
2. Use macOS Icon Composer or online tools like:
   - https://cloudconvert.com/png-to-icns
   - https://www.icoconverter.com/
3. Save as `app.icns` in this directory

### Linux .png
1. Create a 512x512 PNG image with transparency
2. Use any image editor (GIMP, Photoshop, etc.)
3. Save as `app.png` in this directory

## Icon Guidelines

- **Style**: Modern, flat design with rounded corners
- **Colors**: Use your app's brand colors
- **Background**: Transparent or solid color
- **Symbol**: Travel/rocket/plane icon representing deployment
- **Text**: Avoid text in small sizes

## Current Placeholders

The current placeholder files are simple colored squares that will be replaced when you add your custom icons.

## Build Process

When you run `npm run build:launcher`, the script will:
1. Check for `app.icns` and copy it to the macOS .app bundle
2. Check for `app.png` and reference it in the Linux .desktop file
3. Skip gracefully if icons are not found
4. Show warnings if icons are missing

## Testing

After adding icons:
```bash
npm run build:launcher:clean
npm run build:launcher
```

The launchers will now display your custom icons in the system. 