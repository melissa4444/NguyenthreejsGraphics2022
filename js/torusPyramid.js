let camera, scene, renderer;
let cameraControls;
let clock = new THREE.Clock();


function createScene() {
    var zball = 5;
	var radius = 40;
    var geometry = new THREE.TorusGeometry( radius, 1, 8, 50 );
	const color = '#'+Math.floor(Math.random()*16777215).toString(16);
    var material = new THREE.MeshBasicMaterial({color: color});

	const sphere = new THREE.Mesh(new THREE.SphereGeometry( 6, 32, 16 ), material );
	sphere.position.z = zball * 8;
	scene.add(sphere);
    
        for(var j = 0; j < 8; j++){
			const color = '#'+Math.floor(Math.random()*16777215).toString(16);
			var mat = new THREE.MeshBasicMaterial({color: color});
        	var mesh  = new THREE.Mesh(new THREE.TorusGeometry(radius,3,8,50), mat);
            mesh.position.z = (zball * j);
        		scene.add(mesh);
				radius=radius-5;
        }
}
function createTorus() {
    const geom = new THREE.TorusGeometry( 10, 3, 8, 10 );
	const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
	const torus = new THREE.Mesh( geometry, material );
	return torus;
}

//
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