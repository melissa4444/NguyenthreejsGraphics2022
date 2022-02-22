let camera, scene, renderer;
let cameraControls;
let clock = new THREE.Clock();
let sierpinski, currentGeom;
let len = 1;
let mat
let tetrahedronGeom;
//



function createScene(){
    let nbrLevels = controls.nbrLevels;
    let color = new THREE.Color(controls.color);
    //mat 
    let matargs = {color: color, side: THREE.DoubleSide};

    mat = new THREE.MeshLambertMaterial(matargs);
    tetraGeom = new THREE.TetrahedronGeometry(len);


    currentGeom = tetrahedronGeom;
    //snowflake 
    sierpinski = makeSierpinski(nbrLevels, 0.5, currentGeom);
    //light
    let light = new THREE.PointLight(0xFFFFFF, 1.0,1000);
    light.position.set(0,100,200);
    let light2 = new THREE.PointLight(0xFFFFFF, 0.4,1000);
    light2.position.set(60,1000, -200);
    let ambientLight = new THREE.ambientLight(0x111111);
    scene.add(light);
    scene.add(light2);
    scene.add(ambientLight);

    //add 
    scene.add(sierpinski);

}

//the sierpinski 
function makeSierpinski(level, scale, geom){
    if (level === 0){
        return new THREE.Mesh(geom, mat);
    } else {  
        let root = new THREE.Object3D();
        root.scale.set(scale,scale,scale);
        let tf = (1-scale)/scale;

        for(let v of geom.vertices){
            let root2 = new THREE.Object3D();
            let v2 = v.clone().multiplyScalar(tf);

            root2.position.set(v2.x, v2.y, v2.z);
            root2.add(makeSierpinski(level-1, scale, geom));
            root.add(root2);
        }
        return root;
    }
}

//update scale
function updateScale(){
    //traverse
    let scale = controls.scale;
    let tf = (1-scale)/scale;
    let geom = currentGeom;

    //update
    let updateRec = function (root, level){
        if(level > 0){
            root.scale.set(scale,scale,scale);
            for(let i=0; i<root.children.length; i++){
                let c = root.children[i];
                let v = geom.vertices[i].clone().multiplyScalar(tf);
                c.position.set(v.x,v.y,v.z);
                updateRec(c.children[0], level-1);

            }

        }

    }
    updateRec(sierpinski, controls.nbrLevels);
}

// geometry 
function generalGeometry(data, scale=1){
    let vertex = data.vertex;
    let face = data.face;
    let geom = new THREE.Geometry();
    let vertices = [];
    
    //loop
    for(let i = 0; i<vertex.length; i++)
        vertices.push(new THREE.Vector3(...vertex[i]));
    let faces =[];
    var faceIndex = 0; 

    for (var faceNum = 0; face.length; faceNum++){
        for(var i = 0; i < face[faceNum].length-2; i++){
            faces[faceIndex] = new THREE.Face3(face[faceNum][0], data.face[faceNum][i+1],data.face[faceNum][i+2]);
            faceIndex++;
        }

    }
  geom.vertices = vertices; 
  geom.faces = faces;
  geom.computeFaceNormals();
  return geom;  
}




var controls = new function(){
    this.nbrLevels = 6;
    this.scale = 0.5;
    this.shape = 'Tetrahedron';
    this.color = 'red';
  
}

function initGui(){
    var gui = new dat.GUI();
    gui.add(controls, 'nbrlevels', 0.4).name('level').step(1).onChange(update);
    let objectTypes = ['Tetrahedron'];   
}
//


// update 
function update(){
    if (sierpinski)
        scene.remove(sierpinski);
    switch(controls.shape){
        case 'Tetrahedron': currentGeom = tetrahedronGeom;
            break;
    
    }
    sierpinski = makeSierpinski(contorls.nbrLevels, contorls.scale, currentGeom, len);
    scene.add(sierpinski);
}

function render() {
    var delta = clock.getDelta();
    cameraControls.update(delta);
    mat.color = new THREE.Color(controls.color);
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
    renderer.setAnimationLoop(function () {
        render();
    });

    camera = new THREE.PerspectiveCamera(45, canvasRatio, 0.01, 1000);
    camera.position.set(0, 1, 3);
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

init();
createScene();
initGui();
addToDOM();
