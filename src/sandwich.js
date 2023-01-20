import _ from "lodash";
import "./styles/styles.css";
import Snowy from "./assets/snowy_alaska.jpg"
import printMe from "./print";
import * as THREE from "three"
import * as BUILDER from "./scripts/sandwichBuilder";
import "./styles/styles.css";

const Bread = new BUILDER.SandwhichBuilder(document.body.clientWidth,document.body.clientHeight);
console.log("here");
document.getElementById("canvas").appendChild( Bread.getRenderer());
Bread.getRenderer().classList.add("renderer");
Bread.animate();

async function addBread(){
    return new Promise(async resolve => {
        await Bread.addIngredient("Br");
        resolve("Added Bread");
      });
}

async function addCheese(){
    return new Promise(async resolve => {
        await Bread.addIngredient("Ch")
        resolve("Added Cheese");
    });
}

async function addLettuce(){
    return new Promise(async resolve => {
        await Bread.addIngredient("Lt")
        resolve("Added Lettuce");
    });
}

async function addTomato(){
    return new Promise(async resolve => {
        await Bread.addIngredient("Tm")
        resolve("Added Tomato");
    });
}

function zoom(){
    Bread.zoomOutCamera();
}

async function buildGrilledCheese(){
    await addBread();
    console.log(await addCheese());
    await addLettuce();
    await addTomato();
    await addBread();
}

document.getElementById("breadBtn").addEventListener("click",addBread,false);
document.getElementById("cheeseBtn").addEventListener("click",addCheese, false);
document.getElementById("lettuceBtn").addEventListener("click",addLettuce, false);
document.getElementById("tomatoBtn").addEventListener("click",addTomato, false);
document.getElementById("zoomBtn").addEventListener("click", zoom,false);

buildGrilledCheese();