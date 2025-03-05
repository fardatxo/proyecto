// window.onload = () => {
//     const form = document.getElementById('userForm');
//     const shapeInput = document.getElementById('shape');
//     const baseInput = document.getElementById('base');
//     const flavorInput = document.getElementById('flavor');
//     const extrasInput = document.getElementById('extras');
//     const threeContainer = document.getElementById('three-container');
    
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, 400 / 400, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({ alpha: true });
//     renderer.setSize(400, 400);
//     threeContainer.appendChild(renderer.domElement);

//     const controls = new THREE.OrbitControls(camera, renderer.domElement);

//     const light = new THREE.AmbientLight(0xffffff, 1);
//     scene.add(light);
//     const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
//     directionalLight.position.set(5, 5, 5);
//     scene.add(directionalLight);

//     const createShape = (shape) => {
//         let geometry;
//         if (shape === 'esfera') {
//             geometry = new THREE.SphereGeometry(1, 32, 32);
//         } else if (shape === 'cubo') {
//             geometry = new THREE.BoxGeometry(1, 1, 1);
//         } else if (shape === 'cilindro') {
//             geometry = new THREE.CylinderGeometry(1, 1, 2, 32);
//         } else {
//             geometry = new THREE.SphereGeometry(1, 32, 32);
//         }

//         const material = new THREE.MeshLambertMaterial({ color: 0xeeeeee });
//         return new THREE.Mesh(geometry, material);
//     };

//     const updateBaseColor = (base) => {
//         switch (base.toLowerCase()) {
//             case 'chocolate':
//                 return new THREE.MeshLambertMaterial({ color: 0x3e2723 }); 
//             case 'fresa':
//                 return new THREE.MeshLambertMaterial({ color: 0xf50057 });
//             case 'vainilla':
//                 return new THREE.MeshLambertMaterial({ color: 0xf1f8e9 });
//             default:
//                 return new THREE.MeshLambertMaterial({ color: 0xeeeeee });
//         }
//     };

//     const createText = async () => {
//         const loader = new THREE.FontLoader();
//         loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
//             const textGeometry = new THREE.TextGeometry('¡Próxima vez!', {
//                 font: font,
//                 size: 0.4,
//                 height: 0.1,
//                 curveSegments: 12,
//                 bevelEnabled: true,
//                 bevelThickness: 0.02,
//                 bevelSize: 0.02,
//                 bevelSegments: 5
//             });

//             const textMaterial = new THREE.MeshLambertMaterial({ color: 0xffcc00 }); // Yellow
//             const textMesh = new THREE.Mesh(textGeometry, textMaterial);

//             textMesh.position.set(-1, 1.5, 0);
//             textMesh.rotation.y = 0.2;

//             scene.add(textMesh);
//         });
//     };

//     const createTurron = (shape, base, flavor, extras) => {
//         while (scene.children.length) {
//             scene.remove(scene.children[0]);
//         }

//         const turronShape = createShape(shape);
//         const baseMaterial = updateBaseColor(base);
//         turronShape.material = baseMaterial;
//         scene.add(turronShape);

//         if (flavor === 'fresa') {
//             turronShape.material.color.set(0xf50057);
//         } else if (flavor === 'vainilla') {
//             turronShape.material.color.set(0xf1f8e9); 
//         }

//         camera.position.z = 5;

//         createText();
//     };
//     form.addEventListener('submit', (e) => {
//         e.preventDefault();
//         const shape = shapeInput.value.trim().toLowerCase();
//         const base = baseInput.value.trim().toLowerCase();
//         const flavor = flavorInput.value.trim().toLowerCase();
//         const extras = extrasInput.value.trim().toLowerCase();

//         createTurron(shape, base, flavor, extras);
//     });
    
//     const animate = () => {
//         requestAnimationFrame(animate);
//         controls.update();
//         renderer.render(scene, camera);
//     };

//     animate();
// };
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("userForm");
    const container = document.getElementById("three-container");

    // Asegurar que el contenedor tenga dimensiones adecuadas
    container.style.width = "100%";
    container.style.height = "400px";

    // LIMPIAR CONTENEDOR ANTES DE CREAR EL RENDERER
    container.innerHTML = ""; 

    // Inicializar la escena
    const scene = new THREE.Scene();

    // Cámara con mejor perspectiva
    const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 3, 8); // Posicionamos la cámara más arriba y lejos

    // Renderer con fondo claro
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0xf5f5f5); // Color de fondo claro
    container.appendChild(renderer.domElement);

    // Controles de órbita
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Luces mejoradas
    const ambientLight = new THREE.AmbientLight(0xffffff, 2); // Luz ambiental fuerte
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(10, 10, 10); // Ubicamos la luz desde arriba
    scene.add(directionalLight);

    let turron;

    function createTurron(shape, color) {
        // Eliminar el turrón anterior si existe
        if (turron) {
            scene.remove(turron);
        }

        let geometry;
        switch (shape.toLowerCase()) {
            case "esfera":
                geometry = new THREE.SphereGeometry(1, 32, 32);
                break;
            case "cilindro":
                geometry = new THREE.CylinderGeometry(1, 1, 2, 32);
                break;
            case "cubo":
            case "rectángulo":
            case "tableta":
                geometry = new THREE.BoxGeometry(4, 1, 2);
                break;
            default:
                geometry = new THREE.BoxGeometry(4, 1, 2); // Predeterminado
                break;
        }

        const material = new THREE.MeshStandardMaterial({ color: new THREE.Color(color) });
        turron = new THREE.Mesh(geometry, material);
        turron.position.set(0, 0, 0);
        scene.add(turron);

        console.log("Turrón generado:", shape, color); // DEBUG
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const shape = document.getElementById("shape").value;
        const base = document.getElementById("base").value.toLowerCase();
        const flavor = document.getElementById("flavor").value.toLowerCase();

        let color = "#d2691e"; // Marrón por defecto
        if (base.includes("chocolate")) color = "#5a3e1b";
        if (base.includes("vainilla")) color = "#f3e5ab";
        if (flavor.includes("fresa")) color = "#ff5c8a";
        if (flavor.includes("limón")) color = "#fdee00";
        if (flavor.includes("menta")) color = "#3eb489";

        createTurron(shape, color);
    });

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
});
