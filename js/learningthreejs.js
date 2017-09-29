// once everything is loaded, we run our Three.js stuff.
function init() {

  const stats = initStats();
  // create a scene, that will hold all our elements such as objects, cameras and lights.
  const scene = new THREE.Scene();

  // create a camera, which defines where we're looking at.
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

  const width = window.innerWidth;
  const height = window.innerHeight;

  // create a render and set the size
  const renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
  renderer.setSize(width, height);
  renderer.shadowMapEnabled = true;
  renderer.shadowMapType = THREE.PCFSoftShadowMap;

  // show axes in the screen
  const axes = new THREE.AxisHelper(20);
  scene.add(axes);

  // create the ground plane
  const planeGeometry = new THREE.PlaneGeometry(80, 70);
  const planeMaterial = new THREE.MeshPhongMaterial({color: 0xcccccc });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);

  // rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 15;
  plane.position.y = 0;
  plane.position.z = 0;
  plane.receiveShadow = true;

  // add the plane to the scene
  scene.add(plane);

  // create a cube
  const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  const cubeMaterial = new THREE.MeshPhongMaterial({color: 0xff0000 });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

  // position the cube
  cube.position.x = -4;
  cube.position.y = 8;
  cube.position.z = 0;
  cube.castShadow = true;

  // add the cube to the scene
  scene.add(cube);

  // create a sphere
  const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
  const sphereMaterial = new THREE.MeshPhongMaterial({color: 0x7777ff });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

  // position the sphere
  sphere.position.x = 20;
  sphere.position.y = 4;
  sphere.position.z = 2;
  sphere.castShadow = true;

  // add the sphere to the scene
  scene.add(sphere);

  // position and point the camera to the center of the scene
  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 30;
  camera.lookAt(scene.position);

  // let ambiColor = '#45465f';
  // const ambientLight = new THREE.AmbientLight(ambiColor);
  // scene.add(ambientLight);

  let pointColor = '#b9eeff';
  const pointLight = new THREE.PointLight(pointColor, 1, 100);
  pointLight.distance = 100;
  pointLight.position.set(0, 20, 10);
  pointLight.castShadow = true;
  scene.add(pointLight);

  const sphereSize = 1;
  const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
  scene.add(pointLightHelper);
  // // add spotlight for the shadows
  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(20, 30, 10);
  spotLight.rotation.z = 30;
  spotLight.angle = 0.25;
  spotLight.penumbra = 0.236;

  const target = new THREE.Object3D();
  target.position = new THREE.Vector3(5);
  spotLight.target = target;
  spotLight.castShadow = true;
  scene.add(spotLight);

  const spotLightHelper = new THREE.SpotLightHelper(spotLight, sphereSize);
  scene.add(spotLightHelper);

  const helper = new THREE.CameraHelper(pointLight.shadow.camera);
  scene.add(helper);

  // add the output of the renderer to the html element
  document.getElementById('webgl-container').appendChild(renderer.domElement);

  // defines the speed of animation
  let step = 0;

  let controls = new function () {
    this.rotationSpeed = 0.02;
    this.bouncingSpeed = 0.03;
    this.pointColor = pointColor;
    this.intensity = 1.6;

    this.addCube = () => {
      let cubeSize = Math.ceil((Math.random() * 3));
      let cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      let cubeMaterial = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
      let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.castShadow = true;
      cube.name = 'cube-' + scene.children.length;
      // position the cube randomly in the scene
      cube.position.x = -30 + Math.round((Math.random() * planeGeometry.parameters.width));
      cube.position.y = Math.round((Math.random() * 5));
      cube.position.z = -20 + Math.round((Math.random() * planeGeometry.parameters.height));
      // add the cube to the scene
      scene.add(cube);
      this.numberOfObjects = scene.children.length;
    };

    this.outputObjects = function () {
      console.log(scene.children);
    };
  };

  const gui = new dat.GUI();
  gui.add(controls, 'rotationSpeed', 0, 0.5);
  gui.add(controls, 'bouncingSpeed', 0, 0.5);
  gui.add(controls, 'addCube');
  gui.add(controls, 'outputObjects');
  gui.addColor(controls, 'pointColor').onChange((e) => {
    pointLight.color = new THREE.Color(e);
  });
  gui.add(controls, 'intensity', 0, 3).onChange((e) => {
    pointLight.intensity = e;
  });
  // render the scene
  renderScene();

  // render function for getting animations going 
  function renderScene() {
    stats.update();

    cube.rotation.x += controls.rotationSpeed;
    cube.rotation.y += controls.rotationSpeed;
    cube.rotation.z += controls.rotationSpeed;

    step += controls.bouncingSpeed;
    sphere.position.x = 20 + (15 * (Math.cos(step)));
    sphere.position.z = 2 + (10 * (Math.cos(step)));
    sphere.position.y = 5 + (10 * Math.abs(Math.sin(step)));

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  }

  function initStats() {
    const stats = new Stats();
    stats.setMode(0); // 0: fps, 1: ms
    // Align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.getElementById('Stats-output').appendChild(stats.domElement);
    return stats;
  }
}

window.onload = init;