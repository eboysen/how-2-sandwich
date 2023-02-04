import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { PMREMGenerator } from 'three';
import Bread from '../assets/bread.glb';
import Cheese from '../assets/cheese.glb';
import Tomato from '../assets/tomato.glb';
import Lettuce from '../assets/lettuce.glb';
import Kitchen from '../assets/kitchen.jpeg';

export class SandwhichBuilder{
    camera;
    verticalPosition;
    scene;
    renderer;
    light;
    envMap;
    prevVert;

    constructor(width,height){
        this.ingredients = [];
        this.scene = new THREE.Scene();
        this.verticalPosition = 0;
        this.light = new THREE.AmbientLight(0xffffff,1);
        //this.light.position.set(15,8,15);
        this.scene.add(this.light);
        this.camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
        this.camera.position.x=15;
        this.camera.position.y=15;
        this.camera.position.z=15;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.renderer = new THREE.WebGLRenderer({
            alpha:false,
        });
        this.envMap = new PMREMGenerator(this.renderer);
        const kitchenTexture = new THREE.TextureLoader().load(Kitchen);
        this.scene.background = kitchenTexture;
        this.renderer.setSize(width,height);
        this.camera.aspect = width/height;
        console.log(this.camera);
        this.prevVert = 0;
    }

    

    setRendererSize(width, height){
        this.renderer.setSize(width, height);
        this.camera.aspect = width/height;
    }

    getRenderer(){
        return this.renderer.domElement;
    }

    zoomOutCamera(){
        console.log(this);
        console.log(this.camera);
        this.camera.zoom *= .9;
        this.camera.updateProjectionMatrix()
    }

    async addIngredient(selection){
        
        var ingredient = "";
        if(selection === "Br"){
            ingredient = Bread
            this.verticalPosition=1.1;
        }
        else if(selection === "Ch"){
            ingredient = Cheese
            this.verticalPosition=.1;
        }
        else if(selection === "Lt"){
            ingredient = Lettuce
            this.verticalPosition=.3;
        }
        else if(selection === "Tm"){
            ingredient = Tomato
            this.verticalPosition=.2;
        }
        return await this.getIngredient(ingredient)
    }


    onLoad(gltf){
        let object = gltf.scene.children[0];
        object.envMap = this.envMap.fromScene(this.scene, 0, 0.1, 1000);
        console.log(object);
        object.position.y = this.prevVert;
        this.scene.add( object );
    }

    async getIngredient(ingredient){
        const loader = new GLTFLoader();

        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
        loader.setDRACOLoader( dracoLoader );
        return new Promise((resolve,reject) =>{
            loader.load( ingredient, (gltf)=>{
                let object = gltf.scene.children[0];
                object.envMap = this.envMap.fromScene(this.scene, 0, 0.1, 1000);
                console.log(object);
                let bbox = new THREE.Box3().setFromObject(object);
                object.position.y = this.prevVert+(bbox.max.y-bbox.min.y)/2;
                this.prevVert +=bbox.max.y-bbox.min.y;
                console.log(object.position.y);
                this.scene.add( object );
                resolve("Successfully added ingredient");
            }, function ( xhr ) {

                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        
            }, function ( error ) {

                console.error( error );
                reject("Failed to load ingredient")

            } );
        });
    }
    getBread(){
        const geometry = new THREE.BoxGeometry( 20, 1, 20 );
        const breadMaterial = new THREE.MeshLambertMaterial( { color:0xf0ff00 } );
        const bread = new THREE.Mesh( geometry, breadMaterial );
        this.verticalPosition++;
        return bread;
    }

    getCheese(){
        return new Promise((resolve)=>{
            const geometry = new THREE.BoxGeometry( 20, 2, 20 );
            const breadMaterial = new THREE.MeshLambertMaterial( { color:0xe6bc3e } );
            const bread = new THREE.Mesh( geometry, breadMaterial );
            bread.position.y = this.verticalPosition;
            console.log(bread.position);
            this.verticalPosition+=.25;
            this.scene.add(bread);
            resolve("Successfully added Cheese");
        });
        
    }

    animate() {
        requestAnimationFrame( this.animate.bind(this) );
        this.renderer.render( this.scene, this.camera );
    }
}
