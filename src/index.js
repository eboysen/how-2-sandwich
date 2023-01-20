import _ from "lodash";
import "./styles/styles.css";
import printMe from "./print";
import * as THREE from "three"
import * as BUILDER from "./scripts/sandwichBuilder";
import "./styles/styles.css";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { PMREMGenerator } from 'three';
import BreadModel from "./assets/bread.glb";
import CheeseModel from "./assets/cheese.glb";
import LettuceModel from "./assets/lettuce.glb";
import TomatoModel from "./assets/tomato.glb";

const WIDTH = document.body.clientWidth;
const HEIGHT = document.body.clientHeight;

const scene =  new THREE.Scene();
const light = new THREE.AmbientLight(0xffffff,1);
const camera = new THREE.PerspectiveCamera( 75, WIDTH / HEIGHT, 0.1, 1000 );
const kitchenTexture = new THREE.TextureLoader().load("./kitchen.jpeg");
const renderer = new THREE.WebGLRenderer({
    alpha:true,
});
const envMap = new PMREMGenerator(renderer);
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const message = document.getElementById("message");

configureCamera();
addObjectsToScene();
addRendererToDOM();
let bread1 = await getIngredient(BreadModel);
bread1.position.x=0;
bread1.position.z=25;
bread1.position.y=-10;
let bread2 = await getIngredient(TomatoModel);
bread2.position.x=0;
bread2.position.z=25;
bread2.position.y=-6;
let bread3 = await getIngredient(LettuceModel);
bread3.position.x=0;
bread3.position.z=25;
bread3.position.y=-2;
let bread4 = await getIngredient(CheeseModel);
bread4.position.x=0;
bread4.position.z=25;
bread4.position.y=2;
let bread5 = await getIngredient(TomatoModel);
bread5.position.x=0;
bread5.position.z=25;
bread5.position.y=6;
let bread6 = await getIngredient(BreadModel);
bread6.position.x=0;
bread6.position.z=25;
bread6.position.y=10;
window.addEventListener('mousemove', onMouseMove);
animate();

function configureCamera(){
    camera.position.x=30;
    camera.position.y=0;
    camera.lookAt(new THREE.Vector3(0,0,0));
    camera.aspect = WIDTH/HEIGHT;
}

function addObjectsToScene(){
    scene.add(light);
}

function addRendererToDOM(){
    renderer.setSize(WIDTH, HEIGHT);
    document.getElementById("canvas").appendChild(renderer.domElement);
    renderer.domElement.classList.add("renderer");
}

function animate(){
    raycaster.setFromCamera(mouse,camera);
    const intersects = raycaster.intersectObjects(scene.children);

    for(let i = 0; i<intersects.length; i++){
        if(intersects[i].object.id === bread1.id){
            message.innerHTML = "Hello";
        }
        else if(intersects[i].object.id === bread2.id){
            message.innerHTML = "Hi";
        }
    }
    if(intersects.length ===0){
        message.innerHTML = "Welcome 2 Sandwich";
    }

    requestAnimationFrame( animate.bind(this) );
    renderer.render( scene, camera );
    bread1.rotation.y+=.01;
    bread2.rotation.y+=.01;
    bread3.rotation.y+=.01;
    bread4.rotation.y+=.01;
    bread5.rotation.y+=.01;
    bread6.rotation.y+=.01;
}

async function getIngredient(ingredient){
    const loader = new GLTFLoader();

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
    loader.setDRACOLoader( dracoLoader );
    return new Promise((resolve,reject) =>{
        loader.load( ingredient, (gltf)=>{
            let object = gltf.scene.children[0];
            object.envMap = envMap.fromScene(scene, 0, 0.1, 1000);
            scene.add( object );
            resolve(object);
        }, function ( xhr ) {

            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
        }, function ( error ) {

            console.error( error );
            reject("Failed to load ingredient")

        } );
    });
}

function onMouseMove(event){
    mouse.x = (event.clientX / window.innerWidth)*2-1;
    mouse.y = -(event.clientY / window.innerHeight)*2+1;
}