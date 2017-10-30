// once everything is loaded, we run our Babylon.JS content.
function init() {

  const canvas = document.getElementById('renderCanvas');
  canvas.style.width = '100%';
  canvas.style.height = '100%';

  const engine = new BABYLON.Engine(canvas, true);

  const createScene = function() {
    // create a basic BJS Scene object
    const scene = new BABYLON.Scene(engine);

    // create a FreeCamera, and set its position to (x:0, y:5, z:-10)
    const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5,-10), scene);
    
    camera.inputs.clear();

    // target the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // attach the camera to the canvas
    camera.attachControl(canvas, false);

    // create a basic light, aiming 0,1,0 - meaning, to the sky
    const light = new BABYLON.PointLight('light1', new BABYLON.Vector3(0, 5, -5), scene);
    
    // Creating material for the box and giving it a color
    var boxMaterial = new BABYLON.StandardMaterial("boxMaterial", scene);
    boxMaterial.diffuseColor = new BABYLON.Color3(1, 0, 1);

    // create a built-in "box" shape; its constructor takes 3 params: name, height, scene
    var box = BABYLON.MeshBuilder.CreateBox("box", {height: 1}, scene);
    box.material = boxMaterial;

    // move the sphere upward 1/2 of its height
    box.position.y = 1;
    box.rotation.y = 30;

    // create a built-in "ground" shape; its constructor takes 5 params: name, width, height, subdivisions and scene
    const ground = BABYLON.Mesh.CreateGround('ground1', 6, 6, 2, scene);

    // return the created scene
    return scene;
  }

  const scene = createScene();

  // Rendering the scene
  engine.runRenderLoop(function() {
    scene.render();
  });

  window.addEventListener('resize', function() {
    engine.resize();
  });
}

window.onload = init;
