var camera, scene, renderer;
var cameraControls;
var clock = new THREE.Clock();
//var whiteMat = new THREE.MeshLambertMaterial({color: new THREE.Color(1,1,1)}); 

function createScene() {
   // var color = new THREE.Color(0xFFFF00);
   // let inner = new THREE.Color
    let axes = new THREE.AxesHelper(10);

    let  n =10;
    var mat = new THREE.MeshLambertMaterial({vertexColor:true,side:THREE.DoubleSide});    
    var geom = createPoly(10, 10,10);
    var poly = new THREE.Mesh(geom, mat);
    var basicMat = new THREE.MeshBasicMaterial({ wireframe: true, wireframeLinewidth: 2});
    var polyWiremesh = new THREE.Mesh(geom, basicMat);
   // var light = new THREE.PointLight(0xFFFFFF, 1, 1000 );
   // light.position.set(0, 0, 10);
    scene.add(poly, polyWiremesh);
    scene.add(axes);
}

function createPoly(n,inner,outer) {
    //var len2 = len / 2;
    //var rad = 6;
    var geom = new THREE.Geometry();
    var vec = new THREE.Vector3(0,0,0);
    // push n + 1 vertices
    //  first the apex...
    
   // var vec = new THREE.Vector3(0,1,0);
    geom.vertices.push(vec);
   
    //  and then the vertices of the base
    var rad = 2;
    var x = rad* Math.PI/n;
    for (var i = 0, a = 0; i < n; i++, a += x) {
        var cos = Math.cos(a);
        var sin = Math.sin(a);
        var vec = new THREE.Vector3( cos,0, sin);
        geom.vertices.push(vec);
       
    }
    // push the n triangular faces
   
    var face = new THREE.Face3(0,1,n);
    var face1 = new THREE.Face3(1,2,n);
    geom.faces.push(face, face1);
    
    // set face normals and return the geometry
    geom.computeFaceNormals();
    return geom;
}




function animate() {
	window.requestAnimationFrame(animate);
	render();
}


function render() {
    var delta = clock.getDelta();
    cameraControls.update(delta);
	renderer.render(scene, camera);
}
function init() {
	var canvasWidth = window.innerWidth;
	var canvasHeight = window.innerHeight;
	var canvasRatio = canvasWidth / canvasHeight;
	scene = new THREE.Scene();
	renderer = new THREE.WebGLRenderer({antialias : true});
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.setSize(canvasWidth, canvasHeight);
	renderer.setClearColor(0x000000, 1.0);
	camera = new THREE.PerspectiveCamera( 40, canvasRatio, 1, 1000);
	camera.position.set(0, 0, 16);
	camera.lookAt(new THREE.Vector3(0, 0, 0));
	cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
}
function addToDOM() {
	var container = document.getElementById('container');
	var canvas = container.getElementsByTagName('canvas');
	if (canvas.length>0) {
		container.removeChild(canvas[0]);
	}
	container.appendChild( renderer.domElement );
}
function loadFontCreateScene() {
    var loader = new THREE.FontLoader();
    loader.load('fonts/helvetiker_regular.typeface.json', function (font) {
        myFont = font;
        console.log(myFont)
        createScene();
    });
}
try {
	init();
    loadFontCreateScene();
	addToDOM();
    render();
	animate();
} catch(e) {
    var errorMsg = "Error: " + e;
    document.getElementById("msg").innerHTML = errorMsg;
}