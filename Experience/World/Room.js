import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";


export default class Room{
    
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.avatar = this.resources.items.avatar;
        this.actualAvatar = this.avatar.scene;
        this.roomChildren = {};

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        };

        this.setModel();
        this.setAnimation();
        this.onMouseMove();

    }

    setModel(){

        //shadows Room

        let childrenObject = this.actualRoom.children;
        let grandchildren = childrenObject[0].children;
        let grandchildren001 = childrenObject[1].children;
        let grandchildren002 = grandchildren001[0].children;
        let grandchildren003 = grandchildren002[0].children;

        let grandchildren004 = childrenObject[2].children;


        for(let i = 0; i < grandchildren.length; i++){
            grandchildren[i].castShadow = true;
            grandchildren[i].receiveShadow = true;
            let grandchildrenObject = grandchildren[i].children
            for(let j = 0; j < grandchildrenObject.length; j++){
                grandchildrenObject[j].castShadow = true;
                grandchildrenObject[j].receiveShadow = true;
            }
        }

        for(let i = 0; i < grandchildren003.length; i++){
            grandchildren003[i].castShadow = true;
            grandchildren003[i].receiveShadow = true;
            let grandchildrenObject003 = grandchildren003[i].children
            for(let j = 0; j < grandchildrenObject003.length; j++){
                grandchildrenObject003[j].castShadow = true;
                grandchildrenObject003[j].receiveShadow = true;
            }
        }

        for(let i = 0; i < grandchildren004.length; i++){
            grandchildren004[i].castShadow = true;
            grandchildren004[i].receiveShadow = true;
            let grandchildrenObject004 = grandchildren004[i].children
            for(let j = 0; j < grandchildrenObject004.length; j++){
                grandchildrenObject004[j].castShadow = true;
                grandchildrenObject004[j].receiveShadow = true;
            }
        }

        
        //shadows Avatar

        let childrenAvatarObject = this.actualAvatar;
        let grandchildrenAvatar = childrenAvatarObject.children[0].children;

        for(let i = 0; i < grandchildrenAvatar.length; i++){
            grandchildrenAvatar[i].castShadow = true;
            grandchildrenAvatar[i].receiveShadow = true;
            let grandchildrenAvatarObject = grandchildrenAvatar[i].children
            for(let j = 0; j < grandchildrenAvatarObject.length; j++){
                grandchildrenAvatarObject[j].castShadow = true;
                grandchildrenAvatarObject[j].receiveShadow = true;
            }
        }

        //shadows ETC
        for(let i = 0; i < childrenObject.length; i++){
            if (childrenObject[i].name === "Monster"){
                let childrenMonster = childrenObject[i].children;
                for(let j = 0; j < childrenMonster.length; j++){
                    childrenMonster[j].castShadow = true;
                    childrenMonster[j].receiveShadow = true;
                    let childrenMonster001 = childrenMonster[j].children;
                    for(let k = 0; k < childrenMonster001.length; k++){
                        childrenMonster001[k].castShadow = true;
                        childrenMonster001[k].receiveShadow = true;
                        let childrenMonster002 = childrenMonster001[k].children;
                        for(let l = 0; l < childrenMonster002.length; l++){
                            childrenMonster002[l].castShadow = true;
                            childrenMonster002[l].receiveShadow = true;
                        }
                    }
                }
            }
        }

        for(let i = 0; i < childrenObject.length; i++){
            // console.log(childrenObject[i]);
            if (childrenObject[i].name === "HelloSign"){
                let childrenHello = childrenObject[i].children;
                for(let j = 0; j < childrenHello.length; j++){
                    childrenHello[j].castShadow = true;
                    childrenHello[j].receiveShadow = true;
                    let childrenHello001 = childrenHello[j].children;
                    // console.log(childrenHello001);
                    for(let k = 0; k < childrenHello001.length; k++){
                        childrenHello001[k].castShadow = true;
                        childrenHello001[k].receiveShadow = true;
                        let childrenHello002 = childrenHello001[k].children;
                        // console.log(childrenHello002);
                        for(let l = 0; l < childrenHello002.length; l++){
                            childrenHello002[l].castShadow = true;
                            childrenHello002[l].receiveShadow = true;
                            let childrenHello003 = childrenHello002[l].children;
                            // console.log(childrenHello003);
                            for(let m = 0; m < childrenHello003.length; m++){
                                childrenHello003[m].castShadow = true;
                                childrenHello003[m].receiveShadow = true;
                                let childrenHello004 = childrenHello003[m].children;
                                // console.log(childrenHello004);
                                for(let n = 0; n < childrenHello004.length; n++){
                                    childrenHello004[n].castShadow = true;
                                    childrenHello004[n].receiveShadow = true;
                                    // let childrenHello005 = childrenHello004[n].children;
                                    // console.log(childrenHello005);
                                }
                            }
                        }
                    }
                }
            }
        }

        for(let i = 0; i < childrenObject.length; i++){
            // console.log(childrenObject[i]);
            if (childrenObject[i].name === "HomeLogo"){
                let childrenHome = childrenObject[i].children;
                for(let j = 0; j < childrenHome.length; j++){
                    childrenHome[j].castShadow = true;
                    childrenHome[j].receiveShadow = true;
                    let childrenHome001 = childrenHome[j].children;
                    // console.log(childrenHome001);
                    for(let k = 0; k < childrenHome001.length; k++){
                        childrenHome001[k].castShadow = true;
                        childrenHome001[k].receiveShadow = true;
                        // let childrenHome002 = childrenHome001[k].children;
                        // console.log(childrenHome002);
                    }
                }
            }
        }

        for(let i = 0; i < childrenObject.length; i++){
            // console.log(childrenObject[i]);
            if (childrenObject[i].name === "InstaLogo"){
                let childrenInsta = childrenObject[i].children;
                for(let j = 0; j < childrenInsta.length; j++){
                    childrenInsta[j].castShadow = true;
                    childrenInsta[j].receiveShadow = true;
                    let childrenInsta001 = childrenInsta[j].children;
                    // console.log(childrenInsta001);
                    for(let k = 0; k < childrenInsta001.length; k++){
                        childrenInsta001[k].castShadow = true;
                        childrenInsta001[k].receiveShadow = true;
                        let childrenInsta002 = childrenInsta001[k].children;
                        // console.log(childrenInsta002);
                        for(let l = 0; l < childrenInsta002.length; l++){
                            childrenInsta002[l].castShadow = true;
                            childrenInsta002[l].receiveShadow = true;
                            let childrenInsta003 = childrenInsta002[l].children;
                            // console.log(childrenInsta003);
                            for(let m = 0; m < childrenInsta003.length; m++){
                                childrenInsta003[m].castShadow = true;
                                childrenInsta003[m].receiveShadow = true;
                                let childrenInsta004 = childrenInsta003[m].children;
                                // console.log(childrenInsta004);
                                for(let n = 0; n < childrenInsta004.length; n++){
                                    childrenInsta004[n].castShadow = true;
                                    childrenInsta004[n].receiveShadow = true;
                                    // let childrenInsta005 = childrenInsta004[n].children;
                                    // console.log(childrenInsta005);
                                }
                            }
                        }
                    }
                }
            }
        }


        for(let i = 0; i < childrenObject.length; i++){
            // console.log(childrenObject[i]);
            if (childrenObject[i].name === "BrunchLogo"){
                childrenObject[i].castShadow = true;
                childrenObject[i].receiveShadow = true;
                let childrenBrunch = childrenObject[i].children;
                for(let j = 0; j < childrenBrunch.length; j++){
                    childrenBrunch[j].castShadow = true;
                    childrenBrunch[j].receiveShadow = true;
                    // let childrenBrunch001 = childrenBrunch[j].children;
                    // console.log(childrenBrunch001);
                }
            }
        }



        for(let i = 0; i < childrenObject.length; i++){
            let childrenJD = childrenObject[i];
            if (childrenJD.name === "MyRoom") {
                for(let j = 0; j < childrenJD.children.length; j++){
                    let childrenJD001 = childrenJD.children[j];
                    if (childrenJD001.name === "bookshelf") {
                        for(let k = 0; k < childrenJD001.children.length; k++){
                            let childrenJD002 = childrenJD001.children[k];
                            // console.log(childrenJD002)
                            if (childrenJD002.name === "jordanshoe"){
                                for(let l = 0; l < childrenJD002.children.length; l++){
                                    let childrenJD003 = childrenJD002.children[l];
                                    childrenJD003.castShadow = true;
                                    childrenJD003.receiveShadow = true;
                                    // console.log(childrenJD003);
                                    for(let m = 0; m < childrenJD003.children.length; m++){
                                        let childrenJD004 = childrenJD003.children[m];
                                        childrenJD004.castShadow = true;
                                        childrenJD004.receiveShadow = true;
                                        // console.log(childrenJD004);
                                        for(let n = 0; n < childrenJD004.children.length; n++){
                                            let childrenJD005 = childrenJD004.children[n];
                                            childrenJD005.castShadow = true;
                                            childrenJD005.receiveShadow = true;
                                            // console.log(childrenJD005);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    
                }
            }
        }


        //flower_vase Edit

        for(let i = 0; i < grandchildren.length; i++){
            let grandchildrenObject = grandchildren[i].children;
            for(let j = 0; j < grandchildrenObject.length; j++){

                if (grandchildrenObject[j].name === "Cube_2004") {
                    grandchildrenObject[j].material = new THREE.MeshPhysicalMaterial();

                    grandchildrenObject[j].material.roughness = 0;
                    grandchildrenObject[j].material.color.set(0x549dd2);
                    grandchildrenObject[j].material.ior = 3;
                    // grandchildrenObject[j].material.transmission = 1.0;
                    grandchildrenObject[j].material.transparent = true;
                    grandchildrenObject[j].material.opacity = 1.0;
                    
                }
            }
        }

        // Screens

        for(let i = 0; i < grandchildren.length; i++){
            let grandchildrenObject = grandchildren[i].children
            // console.log(grandchildrenObject);
            for(let j = 0; j < grandchildrenObject.length; j++){

                if (grandchildrenObject[j].name === "screen002"){

                    grandchildrenObject[j].material = new THREE.MeshBasicMaterial({
                        map: this.resources.items.screen001,
                    });

                } else if (grandchildrenObject[j].name === "screen"){

                    grandchildrenObject[j].material = new THREE.MeshBasicMaterial({
                        map: this.resources.items.screen002,
                    });

                } else if (grandchildrenObject[j].name === "screen001"){
 
                    grandchildrenObject[j].material = new THREE.MeshBasicMaterial({
                        map: this.resources.items.screen003,
                    });


                } else if (grandchildrenObject[j].name === "Group"){
                    
                    grandchildrenObject[j].children[4].material = new THREE.MeshBasicMaterial({
                        map: this.resources.items.screen004,
                    });

                }
            }
        }







        // Pre-Animation Effect


        for(let i = 0; i < childrenObject.length; i++){
            let childrenPopup = childrenObject[i];
            if (childrenPopup.name === "HelloSign") {
                childrenPopup.position.x = -10.8242;
                childrenPopup.position.z = 3.7636;
                // childrenPopup.scale.set(0, 0, 0);
            }
            // if (
            //     childrenPopup.name === "Shiba" ||
            //     childrenPopup.name === "HomeLogo" ||
            //     childrenPopup.name === "InstaLogo" ||
            //     childrenPopup.name === "BrunchLogo"
            // ) {
            //     childrenPopup.scale.set(0, 0, 0);
            // }
            if (childrenPopup.name === "MyRoom") {
                for(let j = 0; j < childrenPopup.children.length; j++){
                    let childrenPopup001 = childrenPopup.children[j];
                    if (childrenPopup001.name === "bookshelf") {
                        for(let k = 0; k < childrenPopup001.children.length; k++){
                            let childrenPopup002 = childrenPopup001.children[k];
                            if (childrenPopup002.name === "jordanshoe"){
                                // console.log(childrenPopup002.scale);
                                childrenPopup002.scale.set(0, 0, 0);

                                ///// Jordan - Original Scale
                                //// (-1, 0, 0)
                                
                            }
                        }
                    }   
                }
            }
            

            childrenPopup.scale.set(0, 0, 0);
            
            // console.log(childrenPopup);

           
            ////Moster - RePosition

            if (childrenPopup.name === "Monster"){
                // childrenPopup.scale.set(
                //     0.044260830357670784, 
                //     0.0436524997651577, 
                //     0.059700590521097183
                // );
                childrenPopup.position.set(3, 5.137828826904297, 1);
                // console.log(childrenPopup.position);
            }

            this.roomChildren[childrenPopup.name.toLowerCase()] = childrenPopup;
            

            // if (childrenPopup.name === "Monster"){
            //     childrenPopup.scale.set(
            //         0.014260830357670784, 
            //         0.0136524997651577, 
            //         0.019700590521097183
            //     );
            //     // console.log(childrenPopup.position);
            // }

            // Monster - Original Position
            // x: -3.430586814880371,
            // y: 5.137828826904297,
            // z: 3.706470012664795,
        }


        const width = 1.5;
        const height = 1.4;
        const intensity = 1.0;
        const rectLight = new THREE.RectAreaLight( 
            0xC6BDAA, 
            intensity,  
            width, 
            height 
        );
        rectLight.position.set( 10.64, 7.4, 1.8 );
        rectLight.rotation.set(-0.0095, 20.0573, 0);
        this.actualRoom.add( rectLight )

        const rectLightHelper = new RectAreaLightHelper( rectLight );
        rectLight.add( rectLightHelper );

        this.roomChildren['rectLight'] = rectLight;
        


        // Remove RectLight

        // console.log(rectLight);
        rectLight.scale.set(0, 0, 0);


        // Remove Avatar
        
        for(let i = 0; i < this.actualAvatar.children.length; i++){
            let actualAvatarObject = this.actualAvatar.children[i]
            // console.log(actualAvatarObject);
            for(let j = 0; j < actualAvatarObject.children.length; j++){
                let actualAvatarObject002 = actualAvatarObject.children[j]
                // console.log(actualAvatarObject002)
                // actualAvatarObject002.scale.set(0, 0, 0);
            }
        }

        
        //// RePosition Avatar

        // this.actualAvatar.scale.set(1, 1, 1);
        this.actualAvatar.position.set(0.3, 0, 1);

        this.roomChildren['actualAvatar'] = this.actualAvatar;
        // console.log(this.roomChildren);

        
        
        //Avatar - Original Position
        
        //Destop
        // this.avatar.scale.set(0.68, 0.68, 0.68);
        // this.avatar.position.set(0.9, 0, 0.9);
        
        //Mobile
        // this.avatar.position.set(0.7, 0, 0.7);


        // add scene (Room, Avatar)

        this.scene.add(this.actualRoom);
        this.scene.add(this.actualAvatar);

        this.actualRoom.scale.set(0.11, 0.11, 0.11);
        this.actualRoom.position.set(0, 0, 0.5);
        this.actualRoom.rotation.x = Math.PI;
        this.actualRoom.rotation.y = Math.PI;
        this.actualRoom.rotation.z = Math.PI;

        this.actualAvatar.scale.set(0.68, 0.68, 0.68);
        // this.actualAvatar.position.set(0.9, 0, 0.8);
        this.actualAvatar.rotation.y = - Math.PI / 6;
        // console.log(this.actualAvatar.scale);


    }







    setAnimation(){
        this.mixer = new THREE.AnimationMixer(this.actualAvatar);
        this.avataraction = this.mixer.clipAction(this.avatar.animations[0]);
        this.avataraction.play();
    }


    onMouseMove(){
        window.addEventListener("mousemove", (e) => {
            this.rotation = 
                ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.target = this.rotation * 0.2;
        });
    }


    resize(){}

    update(){
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;
        this.actualAvatar.rotation.y = this.lerp.current;

        this.mixer.update(this.time.delta * 0.0009);
    }

}