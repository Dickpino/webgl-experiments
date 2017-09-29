
// const experiment = {
//   scene: new THREE.Scene(),
//   renderer: window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer(),
//   //light: new THREE.AmbientLight(0x404040), // soft white light
//   camera: new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight,
//     1, 1000),
//   box: new THREE.Mesh(
//       new THREE.BoxGeometry(20, 20, 20),
//       new THREE.MeshLambertMaterial({ color: 0x00ff00 }),
//     ),
//     plane: new THREE.Mesh(new THREE.PlaneGeometry(100,100),
//       new THREE.MeshLambertMaterial({
//         color:0x0088aa,
//         ambient:0x0088aa,
//         specular:0x003344,
//         shininess: 100,
//         shading: THREE.Flatshading,
//         side: THREE.DoubleSide
//       })
//     ),
//     directionalLight: new THREE.DirectionalLight( 0x9900 ),
//   init() {
//     // Setting up canvas size to display WebGL animation
//     experiment.renderer.setSize(window.innerWidth, window.innerHeight);

//     document.getElementById('webgl-container').appendChild(experiment.renderer.domElement);    

//     experiment.renderer.shadowMapEnabled = true;
//     experiment.renderer.shadowMapEnabled = true;
//     //experiment.scene.add(experiment.light);

//     experiment.scene.background = new THREE.Color( 0xffffff );

//     experiment.camera.position.z = 150;
//     experiment.camera.position.y = 50;
//     experiment.scene.add(experiment.camera);

//     experiment.plane.rotation.x = 90 * (Math.PI/180);
//     experiment.plane.y = 10;

//     experiment.plane.name = 'plane';
//     experiment.plane.receiveShadow = true;

//     experiment.scene.add(experiment.plane);
//     experiment.directionalLight.position.set(20,20,20);
//     experiment.scene.add(experiment.directionalLight)


//     experiment.box.name = 'box';
//     experiment.box.position.y = 20;
//     experiment.box.castShadow = true;

//     experiment.scene.add(experiment.box);
//   },
//   render() {
//     experiment.box.rotation.y += 0.05;
//     experiment.box.rotation.x += 0.05;
//     experiment.renderer.render(experiment.scene, experiment.camera);
//     requestAnimationFrame(experiment.render);
//   },
// };

// window.onload = () => {
//   experiment.init();
//   experiment.render();
// };