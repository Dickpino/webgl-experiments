const width = window.innerWidth / 2;
const height = window.innerHeight / 2;
let camera;
let renderer;
let scene;
let loader;
let light;
let objects = [];

function init() {
  const container = document.getElementById('heracles-animation');
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
  renderer = new THREE.WebGLRenderer();
  scene = new THREE.Scene();


  renderer.setSize(width, height);
  container.append(renderer.domElement);

  // controls = new THREE.OrbitControls(camera, renderer.domElement);
    loader = new THREE.ObjectLoader();

  loader.load(
    // resource URL
    'models/scene.json', function loadObject(obj) {
    // add the loaded object to the scene
      for (let i = 0; i < obj.children.length; i++) {
        if (obj.children[i].name === 'Cylinder 1') {
          objects.push(obj.children[i]);
        }
      }
      console.log(objects);
      scene.add(obj);
    },
    // Function called when download progresses
     function downloadProgress(xhr) {
       console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // Function called when download errors
    function (xhr) {
      console.error('An error happened');
    },

  );

  light = new THREE.PointLight(0x00304D, 1, 100);
  light.position.set(7.15, 1.02, -2.89);
  scene.add(light);
  camera.position.set(3, 0, 0);
  camera.rotation.y = 90;
  camera.lookAt(scene.position);

}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  //controls.update();
}

function onDocumentMouseDown(event) {
  const projector = new THREE.Projector();  
  const mouseVector = new THREE.Vector3(
    ( event.clientX / width) * 2 - 1,
    - ( event.clientY / height)  * 2 + 1,
      0.5 );  

  projector.unprojectVector(mouseVector, camera);

    const raycaster = new THREE.Raycaster(camera.position,
    mouseVector.sub(camera.position).normalize());
      console.log('dit zit er in het object' + objects);
  const intersects = raycaster.intersectObjects(objects.c, true);
  console.log(intersects);
  if (intersects.length > 0) {
    console.log("komt in if");
    intersects[1].object.material.color.setHex(Math.random() * 0xffffff);
  }
}

window.addEventListener('mousedown', onDocumentMouseDown, false);

init();
animate();
