/**
 * Melissa Nguyen 
 * Computer Graphics 
 * Final Project
 * winter-2022
 * 
 * notes: finally using webgl with three.js 
 * an infinity symbol
 * 
 */


const scene = new THREE.Scene();
scene.background = new THREE.Color('white');
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const cameraPole = new THREE.Object3D();
scene.add(cameraPole);
cameraPole.add(camera);

const renderer = new THREE.WebGLRenderer();



renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const geometry = new THREE.TorusKnotGeometry(2,0.2,64,8,1,2);

const vertices = [];
const positionAttribute = geometry.getAttribute('position');


const material = new THREE.MeshBasicMaterial( { 
    color: 0x00ff00,
    transparent: true, 
    
} );
const cube = new THREE.Mesh( geometry, material );
cube.position.x = 0;
cube.position.y = 0;
cube.position.z = 0;
scene.add( cube );

//helper
scene.add(new THREE.AxesHelper(20));

camera.position.z = 5;

function animate() {
requestAnimationFrame( animate );


cube.rotation.x += 0.01;
cube.rotation.y += 0.01;

renderer.render( scene, camera );
};
animate();