// once everything is loaded, we run our Three.js content.
function init() {

  // create a scene, that will hold all our elements such as objects, cameras and lights.
  const scene = new THREE.Scene();

  const width = window.innerWidth;
  const height = window.innerHeight;

  // create a camera, which defines where we're looking at.
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

  // create a render and set the size
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
  renderer.setSize(width, height);

  // create the ground plane
  const planeGeometry = new THREE.PlaneGeometry(80, 70);
  const planeMaterial = new THREE.MeshPhongMaterial({color: 0xcccccc });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);

  // rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 15;

  // add the plane to the scene
  scene.add(plane);

  // create a cube with Phong material
  const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  const cubeMaterial = new THREE.MeshPhongMaterial({color: 0xbb0000 });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  scene.add(cube);
  
  // position the cube
  cube.position.x = -4;
  cube.position.y = 8;
  cube.position.z = 0;

  // add the cube to the scene

  // position and point the camera to the center of the scene
  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 30;
  camera.lookAt(scene.position);

  const light = new THREE.AmbientLight(0xFFFFFF); // soft white light
  scene.add(light);

  // add the output of the renderer to the html element
  document.getElementById('webgl-container').appendChild(renderer.domElement);

  // render function for getting animations going 
  function renderScene() {
    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
  }

  renderScene();
}

window.onload = init;