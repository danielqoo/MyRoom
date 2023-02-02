import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import GUI from "lil-gui";

export default class Environment{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        // this.gui = new GUI({ container: document.querySelector(".hero-main") });
        this.obj = {
            colorObj: { r:0, g:0, b:0 },
            intensity: 3,
        }
        
        this.setSunlight();
        // this.setGUI();
    }

    setGUI(){
        this.gui.addColor(this.obj, "colorObj").onChange(()=>{
            this.sunLight.color.copy(this.obj.colorObj);
            this.ambientLight.color.copy(this.obj.colorObj);
            console.log(this.obj.colorObj);
        });
        this.gui.add(this.obj, "intensity", 0, 10).onChange(()=>{
            this.sunLight.intensity = this.obj.intensity;
            this.ambientLight.intensity = this.obj.intensity;
        });
    }

    setSunlight(){
        this.sunLight = new THREE.DirectionalLight("#c7c892", 2.1);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;   
        this.sunLight.shadow.mapSize.set(2048, 2048);
        this.sunLight.shadow.normalBias = 0.05;

        this.sunLight.position.set(-1.5, 7, 3);
        this.scene.add(this.sunLight);

        this.ambientLight = new THREE.AmbientLight("#c7c892", 2.1);
        this.scene.add(this.ambientLight);
    }

    switchTheme(theme){
        if(theme === "dark"){
            GSAP.to(this.sunLight.color, {
                r: 0.14901960784313725, 
                g: 0.06274509803921569, 
                b: 0.21568627450980393,
            });
            GSAP.to(this.ambientLight.color, {
                r: 0.14901960784313725, 
                g: 0.06274509803921569, 
                b: 0.21568627450980393,
            });
            GSAP.to(this.sunLight, {
                intensity: 1.84,
            });
            GSAP.to(this.ambientLight, {
                intensity: 1.84,
            });
        } else {
            GSAP.to(this.sunLight.color, {
                r: 0.7803921568627451, 
                g: 0.7843137254901961, 
                b: 0.5725490196078431,
            });
            GSAP.to(this.ambientLight.color, {
                r: 0.7803921568627451, 
                g: 0.7843137254901961, 
                b: 0.5725490196078431,
            });
            GSAP.to(this.sunLight, {
                intensity: 2.1,
            });
            GSAP.to(this.ambientLight, {
                intensity: 2.1,
            });
        }
    }


    resize(){}

    update(){}

}