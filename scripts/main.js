/**
 * MinecraftJS - Modern Voxel Game
 * Author: TT
 * A beautifully crafted Minecraft clone using Three.js
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { World } from './world';
import { Player } from './player';
import { Physics } from './physics';
import { setupUI } from './ui';
import { ModelLoader } from './modelLoader';

// Game Configuration
const CONFIG = {
    GRAPHICS: {
        FOV: 75,
        NEAR: 0.1,
        FAR: 1000,
        FOG_NEAR: 50,
        FOG_FAR: 75,
        SKY_COLOR: 0x80a0e0
    },
    WORLD: {
        CHUNK_SIZE: 16,
        RENDER_DISTANCE: 4
    },
    PHYSICS: {
        GRAVITY: -9.81,
        JUMP_FORCE: 5
    }
};

// Initialize core game components
class Game {
    constructor() {
        this.initRenderer();
        this.initScene();
        this.initWorld();
        this.initPlayer();
        this.initControls();
        this.initModels();
        this.setupEventListeners();
        this.animate();
    }

    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(CONFIG.GRAPHICS.SKY_COLOR);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.body.appendChild(this.renderer.domElement);
    }

    initScene() {
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(
            CONFIG.GRAPHICS.SKY_COLOR,
            CONFIG.GRAPHICS.FOG_NEAR,
            CONFIG.GRAPHICS.FOG_FAR
        );
        this.setupLights();
    }

    initWorld() {
        this.world = new World();
        this.world.generate();
        this.scene.add(this.world);
    }

    initPlayer() {
        this.player = new Player(this.scene, this.world);
        this.physics = new Physics(this.scene);
    }

    initControls() {
        this.orbitCamera = new THREE.PerspectiveCamera(
            CONFIG.GRAPHICS.FOV,
            window.innerWidth / window.innerHeight,
            CONFIG.GRAPHICS.NEAR,
            CONFIG.GRAPHICS.FAR
        );
        this.orbitCamera.position.set(24, 24, 24);
        this.orbitCamera.layers.enable(1);

        this.controls = new OrbitControls(this.orbitCamera, this.renderer.domElement);
        this.controls.update();
    }

    initModels() {
        this.modelLoader = new ModelLoader((models) => {
            this.player.setTool(models.pickaxe);
        });
    }

    setupLights() {
        // Directional light (sun)
        this.sun = new THREE.DirectionalLight(0xffffff, 1.5);
        this.sun.position.set(50, 50, 50);
        this.sun.castShadow = true;
        this.scene.add(this.sun);

        // Ambient light
        const ambient = new THREE.AmbientLight(0x404040, 1.5);
        this.scene.add(ambient);
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.handleResize());
        setupUI(this.world, this.player, this.physics, this.scene);
    }

    handleResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.orbitCamera.aspect = width / height;
        this.orbitCamera.updateProjectionMatrix();
        this.player.camera.aspect = width / height;
        this.player.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const currentTime = performance.now();
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        if (this.player.controls.isLocked) {
            this.physics.update(deltaTime, this.player, this.world);
            this.player.update(this.world);
            this.world.update(this.player);

            // Update sun position relative to player
            this.sun.position.copy(this.player.camera.position);
            this.sun.position.sub(new THREE.Vector3(-50, -50, -50));
            this.sun.target.position.copy(this.player.camera.position);

            // Update orbit camera position
            this.orbitCamera.position.copy(this.player.position).add(new THREE.Vector3(16, 16, 16));
            this.controls.target.copy(this.player.position);
        }

        this.renderer.render(
            this.scene,
            this.player.controls.isLocked ? this.player.camera : this.orbitCamera
        );
    }
}

// Initialize game
const game = new Game();
game.lastTime = performance.now();