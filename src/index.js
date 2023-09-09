import _ from "lodash";
import "./styles/styles.css";
import Logo from "./assets/favicon.svg";

let headTitle = document.querySelector('head');
let setFavicon = document.createElement('link');
setFavicon.setAttribute('rel','shortcut icon');
setFavicon.setAttribute('href',Logo);
headTitle.appendChild(setFavicon);
