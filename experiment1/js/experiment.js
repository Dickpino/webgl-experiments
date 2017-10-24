
$(function() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();

  renderer.setClearColor(0x000000);
  renderer.setSize(window.innerWidth, window.innerHeight);

  const cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
  const cubeMaterial = new THREE.MeshBasicMaterial({
    color: 0xdddddd,
  });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

  cube.position.x = 0;
  cube.position.y = 0;
  cube.position.z = 0;

  const loader = new THREE.ObjectLoader();
  loader.load(
    // resource URL
    'models/fles.json',

    // pass the loaded data to the onLoad function.
    //Here it is assumed to be an object
    function (obj) {
		//add the loaded object to the scene
        scene.add(obj);
    },
);

  // // Alternatively, to parse a previously loaded JSON structure
  // const object = loader.parse(obj);

  // scene.add( object );

  scene.add(cube);

  camera.position.x = 10;
  camera.position.y = 10;
  camera.position.z = 10;

  camera.lookAt(scene.position);

  renderer.render(scene, camera);
  $('#webGL-container').append(renderer.domElement);
});
