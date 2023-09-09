import "./styles/creation.css";
import * as BUILDER from "./scripts/sandwichBuilder";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const entry = urlParams.get("entry");
const name = urlParams.get("name");

const Builder = new BUILDER.SandwhichBuilder(850,600);
document.getElementById("canvas").appendChild( Builder.getRenderer());
Builder.getRenderer().classList.add("renderer");
Builder.animate();

buildSandwich(entry);

async function buildSandwich(str){
    let start = 0;
    while (start<str.length){
        let ingredient = str.substring(start, start+2);
        await Builder.addIngredient(ingredient);
        start = start+2;
    }
}