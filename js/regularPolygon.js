   /***********
 * melissa nguyen
    Math.cos(radians)
    Math.sin(radians)
    (i/n)*2*Math.PI

    generate the n+1 vertices and push them into geom.vertices array (loop)
    generate the n triangles (face) ->loop to generate triangles
    new THREE.Face3(0,1,2)
        face.vertexColors.push(innerColor)
        face.vertexColors.push(outerColor)
        face.vertexColors.push(outerColor)
    new THREE.Face3(0,2,3)
    ...
    new THREE.Face3(0,n,1)
    and push them into geo.faces array 

    set vertexcolor to true     

   **********/

   var camera, scene, renderer;
   var cameraControls;
   var currentMat, wireframeMat, currentMesh;
   var currentObjectName;
   var clock = new THREE.Clock();
    
    function createScene() {
      currentMat = new THREE.MUC
    }
    
  function regularPolygon(){

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
    
        renderer = new THREE.WebGLRenderer({antialias : true});
        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        renderer.setSize(canvasWidth, canvasHeight);
        renderer.setClearColor(0x000000, 1.0);
    
        camera = new THREE.PerspectiveCamera(40, canvasRatio, 1, 1000);
        camera.position.set(0, 0, 12);
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
  
    