# Minecraft Clone with Three.js

A voxel-based game inspired by Minecraft, built using Three.js and modern JavaScript.

## Author
TT

## Features

- Voxel-based world generation
- Player movement and physics
- Block placement and destruction
- Inventory system with different block types
- Dynamic lighting and shadows
- Fog effect for better immersion
- Performance monitoring

## Controls

- WASD - Move
- SHIFT - Sprint
- SPACE - Jump
- R - Reset Camera
- U - Toggle UI
- 0 - Pickaxe
- 1-8 - Select Block
- F1 - Save Game
- F2 - Load Game
- F10 - Debug Camera

## Installation

1. Clone the repository:
```bash
git clone https://github.com/TT/minecraft-threejs-clone.git
cd minecraft-threejs-clone
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://127.0.0.1:5173`

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Tech Stack

- Three.js - 3D graphics library
- Vite - Build tool and development server
- JavaScript (ES6+)

## Project Structure

```
minecraft-threejs-clone/
├── public/             # Static assets (textures, models)
├── scripts/           # Game logic
│   ├── main.js       # Entry point
│   ├── world.js      # World generation and management
│   ├── player.js     # Player controls and physics
│   ├── physics.js    # Physics engine
│   └── ui.js         # User interface
├── style.css         # Global styles
└── index.html        # Main HTML file
```

## License

MIT License
