/*
	
*/
let camera, scene, renderer;
let cameraControls;
let clock = new THREE.Clock();
 
 
function createScene() {
    let n = 10;
    let inner = new THREE.Color(0xFF00FF);
    let outer = new THREE.Color(0x00FF00);
    let geom = regularPolygon(n,inner,outer);
    let mat = new THREE.MeshBasicMaterial({vertexColors:true,side:THREE.DoubleSide});
    let polygon = new THREE.Mesh(geom,mat);
    scene.add(polygon);
    let axes = new THREE.AxesHelper(10);
    scene.add(axes);
}
 
 
function regularPolygon(n, inner, outer) {
// console.log('hello')
    let geom = new THREE.Geometry();
    geom.vertices.push(new THREE.Vector3(0,0,0));
 
    let radius = 2.0;
    var x = 2.0 *  Math.PI/n;
    for(let i=0, a=0; i<n; i++, a+=x){
        let cos = Math.cos(a);
        let sin = Math.sin(a);
        geom.vertices.push(new THREE.Vector3(radius*cos, 0, radius*sin));
    }
 
  for(let i = 1; i<n;i++){
      let face = new THREE.Face3(i+1,i,0);
      face.vertexColors.push(outer);
      face.vertexColors.push(outer);
      face.vertexColors.push(inner);
      geom.faces.push(face);
  }
 
let face = new THREE.Face3(0,1,n);
geom.faces.push(face);
face.vertexColors.push(inner);
face.vertexColors.push(outer);
face.vertexColors.push(outer);
return geom;
}
 
 
 
function animate() {
    window.requestAnimationFrame(animate);
    render();
}
 
 
function render() {
    let delta = clock.getDelta();
    cameraControls.update(delta);
    renderer.render(scene, camera);
}
 
 
function init() {
    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;
    let canvasRatio = canvasWidth / canvasHeight;
 
    scene = new THREE.Scene();
 
    renderer = new THREE.WebGLRenderer({antialias : true, preserveDrawingBuffer: true});
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setClearColor(0x000000, 1.0);
 
    camera = new THREE.PerspectiveCamera( 40, canvasRatio, 1, 1000);
    camera.position.set(0, 0, 30);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
 
    cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
}
 
 
function addToDOM() {
    let container = document.getElementById('container');
    let canvas = container.getElementsByTagName('canvas');
    if (canvas.length>0) {
        container.removeChild(canvas[0]);
    }
    container.appendChild( renderer.domElement );
}
 
 
init();
createScene();
addToDOM();
render();
animate();
 
 
 