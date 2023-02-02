import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";

export default class Floor{
    
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setFloor();
        this.setCircles();
    }

    setFloor(){
        this.geometry = new THREE.PlaneGeometry(38, 38);
        this.material = new THREE.MeshStandardMaterial({
            color: 0xFBE09B,
            side: THREE.BackSide,
        })
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.plane);
        this.plane.rotation.x = Math.PI / 2;
        this.plane.position.y = -0.3;
        this.plane.receiveShadow = true;
    }

    setCircles(){
        const geometry = new THREE.CircleGeometry(5, 64);

        const material = new THREE.MeshStandardMaterial({color: 0x8A90E1 });
        const material2 = new THREE.MeshStandardMaterial({color: 0x8ec7d2});
        const material3 = new THREE.MeshStandardMaterial({color: 0x3A5DD1});
        const material4 = new THREE.MeshStandardMaterial({color: 0xAF64E5});

        this.circleFirst = new THREE.Mesh(geometry, material);
        this.circleSecond = new THREE.Mesh(geometry, material2);
        this.circleThird = new THREE.Mesh(geometry, material3);
        this.circleFourth = new THREE.Mesh(geometry, material4);

        this.circleFirst.position.y = -0.29;
        this.circleSecond.position.y = -0.28;
        this.circleThird.position.y = -0.27;
        this.circleFourth.position.y = -0.26;

        this.circleFirst.scale.set(0, 0, 0);
        this.circleSecond.scale.set(0, 0, 0);
        this.circleThird.scale.set(0, 0, 0);
        this.circleFourth.scale.set(0, 0, 0);

        this.circleFirst.rotation.x =
            this.circleSecond.rotation.x = 
            this.circleThird.rotation.x = 
            this.circleFourth.rotation.x = 
                -Math.PI / 2;

        this.circleFirst.receiveShadow =
            this.circleSecond.receiveShadow = 
            this.circleThird.receiveShadow = 
            this.circleFourth.receiveShadow = 
                true;

        this.scene.add(this.circleFirst);
        this.scene.add(this.circleSecond);
        this.scene.add(this.circleThird);
        this.scene.add(this.circleFourth);
    }

    resize(){}

    update(){

    }

}