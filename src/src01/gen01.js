class Gen01 {
    constructor() {
        this.canvas = document.getElementById("canvas01");

        this.isPlaying = true;

        // Input parameters for the fragment shader
        this.uniforms = {
            iResolution: {
                value: new THREE.Vector3(
                    this.canvas.width,
                    this.canvas.height,
                    1
                ),
            },
            iTime: { value: 0.0 },
        };

        // Store the start time
        this.startTime = Date.now();

        // Initialize ThreeJS
        this.initThreeJS();
    }

    async initThreeJS() {
        const vertexShader = await this.loadShader("src/src01/vertex01.vert");
        const fragmentShader = await this.loadShader(
            "src/src01/fragment01.frag"
        );

        // Set up the scene, camera, and renderer
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.canvas.width / this.canvas.height,
            0.1,
            1000
        );
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });

        this.renderer.setSize(this.canvas.width, this.canvas.height);

        // Create a plane geometry
        const geometry = new THREE.PlaneGeometry(2, 2);

        // Create shader material
        const material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
        });

        // Create a mesh with the geometry and material
        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);

        // Set camera position
        this.camera.position.z = 5;

        // Start rendering
        this.animate();
    }

    async loadShader(url) {
        const response = await fetch(url);
        return await response.text();
    }

    animate() {
        if (this.isPlaying) {
            requestAnimationFrame(() => this.animate());
            const currentTime = Date.now();
            this.uniforms.iTime.value = (currentTime - this.startTime) / 1000;
            this.renderer.render(this.scene, this.camera);
        }
    }
}

// Start the generator
new Gen01();
