// Generated by CoffeeScript 1.6.3
var ASPECT, FAR, HEIGHT, NEAR, VIEW_ANGLE, WIDTH, animate, camera, controls, face, faceColorMaterial, keyboard, light, mouse, product, productGeometry, projector, renderer, scene, skyBox, skyBoxGeometry, skyBoxMaterial, stats, update, _i, _len, _ref;

mouse = {
  x: 0,
  y: 0
};

keyboard = new THREEx.KeyboardState();

scene = new THREE.Scene();

WIDTH = window.innerWidth;

HEIGHT = window.innerHeight;

ASPECT = WIDTH / HEIGHT;

VIEW_ANGLE = 45;

NEAR = 0.1;

FAR = 20000;

camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);

scene.add(camera);

camera.position.set(0, 150, 400);

camera.lookAt(scene.position);

renderer = Detector.webgl ? new THREE.WebGLRenderer({
  antialias: true
}) : new THREE.CanvasRenderer();

renderer.setSize(WIDTH, HEIGHT);

document.body.appendChild(renderer.domElement);

$(window).on("resize", function() {
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
  ASPECT = WIDTH / HEIGHT;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = ASPECT;
  return camera.updateProjectionMatrix();
});

THREEx.FullScreen.bindKey({
  charCode: 'm'.charCodeAt(0)
});

controls = new THREE.OrbitControls(camera, renderer.domElement);

stats = new Stats();

stats.domElement.style.position = 'absolute';

stats.domElement.style.bottom = '0px';

stats.domElement.style.zIndex = 100;

document.body.appendChild(stats.domElement);

light = new THREE.PointLight(0xffffff);

light.position.set(0, 250, 0);

scene.add(light);

/*
floorTexture = new THREE.ImageUtils.loadTexture 'images/checkerboard.jpg'
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping 
floorTexture.repeat.set(10, 10)
floorMaterial = new THREE.MeshBasicMaterial(map: floorTexture, side: THREE.DoubleSide)
floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10)
floor = new THREE.Mesh(floorGeometry, floorMaterial)
floor.position.y = -0.5
floor.rotation.x = Math.PI / 2
scene.add(floor)
*/


skyBoxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);

skyBoxMaterial = new THREE.MeshBasicMaterial({
  color: 0x9999ff,
  side: THREE.BackSide
});

skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);

scene.add(skyBox);

faceColorMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  vertexColors: THREE.FaceColors
});

productGeometry = new THREE.CubeGeometry(180, 220, 50);

_ref = productGeometry.faces;
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  face = _ref[_i];
  face.color.setRGB(0, 0, 0.8 * Math.random() + 0.2);
}

product = new THREE.Mesh(productGeometry, faceColorMaterial);

product.position.set(0, 0, 0);

scene.add(product);

projector = new THREE.Projector();

$(renderer.domElement).on("mousemove", function(e) {
  var intersects, ray, vector;
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = (e.clientY / window.innerHeight) * -2 + 1;
  vector = new THREE.Vector3(mouse.x, mouse.y, 1);
  projector.unprojectVector(vector, camera);
  ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
  intersects = ray.intersectObjects([product]);
  if (intersects.length > 0) {
    intersects[0].face.color.setRGB(Math.random(), Math.random(), Math.random());
    return intersects[0].object.geometry.colorsNeedUpdate = true;
  }
});

animate = function() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  return update();
};

update = function() {
  controls.update();
  return stats.update();
};

animate();

/*
//@ sourceMappingURL=main.map
*/
