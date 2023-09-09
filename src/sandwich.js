import _ from "lodash";
import "./styles/builder.css";
import * as BUILDER from "./scripts/sandwichBuilder";

const Builder = new BUILDER.SandwhichBuilder(850,600);
document.getElementById("canvas").appendChild( Builder.getRenderer());
Builder.getRenderer().classList.add("renderer");
const state = {
    sandwhichName: "",
    sandwhichStr:"",
}
Builder.animate();

async function addBread(){
    await Builder.addIngredient("Br");
    state.sandwhichStr+="Br";
}

async function addCheese(){
    await Builder.addIngredient("Ch")
    state.sandwhichStr+="Ch";
}

async function addLettuce(){
    await Builder.addIngredient("Lt")
    state.sandwhichStr+="Lt";
}

async function addTomato(){
    await Builder.addIngredient("Tm")
    state.sandwhichStr+="Tm";
}

function zoom(){
    Builder.zoomOutCamera();
}

async function buildGrilledCheese(){
    await addBread();
    console.log(await addCheese());
    await addLettuce();
    await addTomato();
    await addBread();
}

function updateName(){
    state.sandwhichName = document.getElementById("sandwich-name").value;
}

function share(){
    console.log(state);
    document.getElementById("popup").style.visibility = "visible";
    let sharelink = document.getElementById("shareLink").innerText=window.location.origin+"/creation.html?";
    state.sandwhichStr != "" ? sharelink +="entry="+state.sandwhichStr : sharelink = sharelink+"&";
    state.sandwhichName != "" ? sharelink+="name="+state.sandwhichName : sharelink = sharelink;
}

document.getElementById("sandwich-name").addEventListener("focusout",updateName,false);
document.getElementById("share-button").addEventListener("click",share,false);
document.getElementById("breadBtn").addEventListener("click",addBread,false);
document.getElementById("cheeseBtn").addEventListener("click",addCheese, false);
document.getElementById("lettuceBtn").addEventListener("click",addLettuce, false);
document.getElementById("tomatoBtn").addEventListener("click",addTomato, false);
document.getElementById("zoomBtn").addEventListener("click", zoom,false);

//buildGrilledCheese();