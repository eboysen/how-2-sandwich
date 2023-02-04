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
    await Bread.addIngredient("Br");
}

async function addCheese(){
    await Bread.addIngredient("Ch")
}

async function addLettuce(){
    await Bread.addIngredient("Lt")
}

async function addTomato(){
    await Bread.addIngredient("Tm")
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

//buildGrilledCheese();