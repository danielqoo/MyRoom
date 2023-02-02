import { EventEmitter } from "events";
import Experience from "./Experience.js";
import GSAP from "gsap";
import convert from "./Utils/convertDivsToSpans.js";

export default class Preloader extends EventEmitter {
    constructor(){
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.sizes.device;

        this.sizes.on("switchdevice", (device) => {
            this.device = device;
        });

        this.world.on("worldready", () => {
            this.setAssets();
            this.playIntro();
        });

    }


    setAssets(){
        convert(document.querySelector(".intro-text"));
        convert(document.querySelector(".hero-main-title"));
        convert(document.querySelector(".hero-main-description"));
        convert(document.querySelector(".hero-second-subheading"));
        convert(document.querySelector(".second-sub"));

        this.room = this.experience.world.room.actualRoom;
        this.avatar = this.experience.world.room.actualAvatar;
        this.roomChildren = this.experience.world.room.roomChildren;
        // console.log(this.roomChildren);
    }

    firstIntro(){
        return new Promise((resolve)=>{
            this.timeline = new GSAP.timeline();

            // console.log(this.roomChildren.myroom.children);

            this.timeline
            .set("body", {
                onComplete: () => {
                    document
                        .querySelector("body")
                        .style.overflow = "hidden";
                },
            }, "first")
            .set(".hero-main", {
                opacity : 0,
                onComplete: () => {
                    document
                        .querySelector(".hero-main")
                        .classList.add("hidden");
                },
            }, "first")
            .set(".hero-second", {
                opacity : 0,
                onComplete: () => {
                    document
                        .querySelector(".hero-second")
                        .classList.add("hidden");
                },
            }, "first")
            .set(".animatethis", { y: 0, yPercent: 100 }, "first")
            .set(this.avatar.position,{
                x : 0.3,
            }, "first")
            .to(".preloader", {
                opacity: 0,
                delay: 1,
                onComplete: () => {
                    document
                        .querySelector(".preloader")
                        .classList.add("hidden");
                },
            }, "first");

            if(this.device === "desktop"){

                this.timeline

                .to(this.roomChildren.monster.scale, {
                    x: 0.044260830357670784,
                    y: 0.0436524997651577,
                    z: 0.059700590521097183,
                    ease: "back.out(2.5)",
                    duration: 3,
                }, "same")
                .to(this.roomChildren.monster.position,{
                    y : 2.5,
                    ease: "power1.out",
                    duration: 0.7,
                }, "same")
                .to(this.roomChildren.monster.position,{
                    x : 11.5,
                    ease: "power1.out",
                    duration: 0.7,
                }, "second same")

                .to(this.avatar.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.5)",
                    duration: 3,
                }, "same")
                .to(this.avatar.position,{
                    y : -0.2,
                    ease: "power1.out",
                    duration: 0.7,
                }, "same")
                .to(this.avatar.position,{
                    x : 1.4,
                    ease: "power1.out",
                    duration: 0.7,
                }, "second same")

            } else {

                this.timeline
                .to(this.roomChildren.monster.scale, {
                    x: 0.044260830357670784,
                    y: 0.0436524997651577,
                    z: 0.059700590521097183,
                    ease: "back.out(2.5)",
                    duration: 3,
                }, "same")
                .to(this.roomChildren.monster.position,{
                    z : -10.4,
                    ease: "power1.out",
                    duration: 0.7,
                }, "second same")

                .to(this.avatar.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.5)",
                    duration: 3,
                }, "same")
                .to(this.avatar.position,{
                    z : 2.2,
                    ease: "power1.out",
                    duration: 0.7,
                }, "second same")
            }
            this.timeline
                .to(".intro-text .animatethis", {
                    yPercent: 0,
                    stagger: 0.07,
                    ease: "back.out(1.7)",
                })
                .to(
                    ".toggle-bar",
                    {
                        opacity: 1,
                    },
                    "second same"
                )
                .to(
                    ".arrow-svg-wrapper",
                    {
                        opacity: 1,
                        onComplete: resolve,
                    },
                    "third same"
                );
        });
    }

    secondIntro(){
        return new Promise((resolve)=>{

            this.secondTimeline = new GSAP.timeline();

            this.secondTimeline
            .set(".hero-main", {
                onComplete: () => {
                    document
                        .querySelector(".hero-main")
                        .classList.remove("hidden");
                },
            }, "fadeout")
            .set(".hero-second", {
                onComplete: () => {
                    document
                        .querySelector(".hero-second")
                        .classList.remove("hidden");
                },
            },"fadeout")
            .to(".intro-text .animatethis", {
                yPercent: 100,
                stagger: 0.05,
                ease: "back.in(1.7)",
            }, "fadeout")
            .to(".arrow-svg-wrapper", {
                opacity: 0,
            }, "fadeout")



            if(this.device === "desktop"){
                this.secondTimeline



                .to(this.roomChildren.monster.position,{
                    x: 0,
                    y: 12,
                    z: -15,
                    ease: "power1.out"
                }, "first same")
                .to(this.roomChildren.monster.rotation, {
                    z: 13 * Math.PI,
                    duration: 0.8,
                }, "first same")
                .to(this.roomChildren.monster.scale, {
                    x: 0.204260830357670784,
                    y: 0.2036524997651577,
                    z: 0.269700590521097183,
                }, "first same")
                .to(this.avatar.position,{
                    x : 0,
                    ease: "power1.out",
                }, "first same")


                .set(".hero-main", {
                    opacity: 1,
                }, "second same")
                .set(".hero-second", {
                    opacity: 1,
                }, "second same")
                .to(".hero-main-title .animatethis", {
                        yPercent: 0,
                        stagger: 0.07,
                        ease: "back.out(1.7)",
                }, "second same")
                .to(".hero-main-description .animatethis",{
                        yPercent: 0,
                        stagger: 0.07,
                        ease: "back.out(1.7)",
                }, "second same")
                .to(".first-sub .animatethis",{
                        yPercent: 0,
                        stagger: 0.07,
                        ease: "back.out(1.7)",
                },"second same")
                .to(".second-sub .animatethis",{
                        yPercent: 0,
                        stagger: 0.07,
                        ease: "back.out(1.7)",
                },"second same")

                

                .to(this.roomChildren.myroom.scale,{
                    x: 0.009999999776482582,
                    y: 0.009999999776482582,
                    z: 0.009999999776482582,
                    ease: "back.out(2.2)",
                    duration: 0.1,
                }, "third same")
                .set(this.roomChildren.rectLight.scale,{
                    x: 10.68, 
                    y: 7.4, 
                    z: 1.9,
                }, "third same")
                .set([
                    this.roomChildren.myroom.children[0].scale, 
                    this.roomChildren.myroom.children[1].scale,
                    this.roomChildren.myroom.children[2].scale,
                    this.roomChildren.myroom.children[3].scale,
                    this.roomChildren.myroom.children[4].scale,
                    this.roomChildren.myroom.children[5].scale,
                    this.roomChildren.myroom.children[6].scale,
                    this.roomChildren.myroom.children[7].scale,
                    this.roomChildren.myroom.children[8].scale,
                    this.roomChildren.myroom.children[9].scale,
                    this.roomChildren.myroom.children[10].scale,
                    this.roomChildren.myroom.children[11].scale,
                    this.roomChildren.myroom.children[12].scale,
                    this.roomChildren.myroom.children[13].scale,
                    this.roomChildren.myroom.children[15].scale,
                    this.roomChildren.myroom.children[17].scale,
                    this.roomChildren.myroom.children[18].scale,
                ], {
                    x: 0,
                    y: 0,
                    z: 0,
                }, "third same")


                .to(this.roomChildren.monster.rotation, {
                    z: 33 * Math.PI,
                    duration: 0.8,
                }, ">-0.5")
                .to(this.roomChildren.monster.scale, {
                    x: 0.014260830357670784, 
                    y: 0.0136524997651577, 
                    z: 0.019700590521097183
                }, "third same")
                .to(this.roomChildren.monster.rotation, {
                    z: 53 * Math.PI,
                    duration: 0.8,
                }, "third same")
                .to(this.roomChildren.monster.position, {
                    x: -3.430586814880371,
                    y: 5.137828826904297,
                    z: 3.706470012664795,
                }, "third same")
                .to(this.avatar.scale, {
                    x: 0.68, 
                    y: 0.68, 
                    z: 0.68,
                }, "third same")
                .to(this.avatar.position, {
                    x: 0.9, 
                    y: 0, 
                    z: 0.9,
                }, "third same")



                .set(this.roomChildren.hellosign.scale,{
                    x: 0.009842989966273308,
                    y: 0.02096511609852314,
                    z: 0.00861157476902008,
                })
                .to(this.roomChildren.myroom.children[0].scale,{
                    x: 2.1017112731933594,
                    y: 1.1422470808029175,
                    z: 2.1723873615264893,
                    ease: "back.out(2.2)",
                    duration: 0.5
                })
                .to(this.roomChildren.myroom.children[3].scale,{
                    x: 1.5076863765716553,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5
                })
                .to(this.roomChildren.myroom.children[4].scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5
                })
                .to(this.roomChildren.myroom.children[17].scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5
                })
                .to([this.roomChildren.myroom.children[12].scale, this.roomChildren.myroom.children[8].scale],{
                    x: 0.7812415957450867, 
                    y: 0.7812415957450867, 
                    z: 0.7812415957450867,
                    ease: "back.out(2.2)",
                    duration: 0.5
                })
                .to([this.roomChildren.myroom.children[5].scale, this.roomChildren.myroom.children[6].scale],{
                    x: 1, 
                    y: 1, 
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5
                })
                .to(this.roomChildren.myroom.children[7].scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5
                })
                .to([this.roomChildren.myroom.children[1].scale, this.roomChildren.myroom.children[2].scale],{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5
                })
                .to(this.roomChildren.myroom.children[15].scale,{
                    x: 1.0355336666107178, 
                    y: 1.039078712463379, 
                    z: 1.039078712463379,
                    ease: "back.out(2.2)",
                    duration: 0.5
                })
                .to(this.roomChildren.myroom.children[9].scale,{
                    x: 1.5206981897354126, 
                    y: 1.5206981897354126, 
                    z: 1.5206981897354126,
                    ease: "back.out(2.2)",
                    duration: 0.5
                })
                .to([this.roomChildren.myroom.children[10].scale, this.roomChildren.myroom.children[11].scale],{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5
                })
                .to(this.roomChildren.myroom.children[13].scale,{
                    x: -0.9999999403953552, 
                    y: -0.9999999403953552, 
                    z: -1,
                    ease: "back.out(2.2)",
                    duration: 0.5
                })
                .to(this.roomChildren.myroom.children[18].scale,{
                    x: 0.6560832262039185, 
                    y: 0.6560832262039185, 
                    z: 0.6560832262039185,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                })
                .to(".arrow-svg-wrapper", {
                    opacity: 1,
                })
                .set("body", {
                    onComplete: () => {
                        document
                            .querySelector("body")
                            .style.removeProperty("overflow");
                    },
                });



            } else {

                this.secondTimeline


                .to(this.roomChildren.monster.position,{
                    x: 0,
                    y: 12,
                    z: -25,
                    ease: "power1.out"
                }, "first same")
                .to(this.roomChildren.monster.rotation, {
                    z: 13 * Math.PI
                }, "first same")
                .to(this.roomChildren.monster.scale, {
                    x: 0.204260830357670784,
                    y: 0.2036524997651577,
                    z: 0.269700590521097183,
                }, "first same")
                .to(this.avatar.position,{
                    x : 0,
                    ease: "power1.out",
                }, "first same")
                

                .set(".hero-main", {
                    opacity: 1,
                }, "second same")
                .set(".hero-second", {
                    opacity: 1,
                }, "second same")
                .to(".hero-main-title .animatethis",{
                    yPercent: 0,
                    stagger: 0.07,
                    ease: "back.out(1.7)",
                }, "second same")
                .to(".hero-main-description .animatethis",{
                    yPercent: 0,
                    stagger: 0.07,
                    ease: "back.out(1.7)",
                }, "second same")
                .to(".first-sub .animatethis",{
                    yPercent: 0,
                    stagger: 0.07,
                    ease: "back.out(1.7)",
            }, "second same")
                .to(".second-sub .animatethis",{
                    yPercent: 0,
                    stagger: 0.07,
                    ease: "back.out(1.7)",
                }, "second same")


                .to(this.roomChildren.myroom.scale,{
                    x: 0.009999999776482582,
                    y: 0.009999999776482582,
                    z: 0.009999999776482582,
                    ease: "back.out(2.2)",
                    duration: 0.1,
                }, "third same")
                .set(this.roomChildren.rectLight.scale,{
                    x: 10.68, 
                    y: 7.4, 
                    z: 1.9,
                }, "third same")
                .set([
                    this.roomChildren.myroom.children[0].scale, 
                    this.roomChildren.myroom.children[1].scale,
                    this.roomChildren.myroom.children[2].scale,
                    this.roomChildren.myroom.children[3].scale,
                    this.roomChildren.myroom.children[4].scale,
                    this.roomChildren.myroom.children[5].scale,
                    this.roomChildren.myroom.children[6].scale,
                    this.roomChildren.myroom.children[7].scale,
                    this.roomChildren.myroom.children[8].scale,
                    this.roomChildren.myroom.children[9].scale,
                    this.roomChildren.myroom.children[10].scale,
                    this.roomChildren.myroom.children[11].scale,
                    this.roomChildren.myroom.children[12].scale,
                    this.roomChildren.myroom.children[13].scale,
                    this.roomChildren.myroom.children[15].scale,
                    this.roomChildren.myroom.children[17].scale,
                    this.roomChildren.myroom.children[18].scale,
                ], {
                    x: 0,
                    y: 0,
                    z: 0,
                }, "third same")

                
                .to(this.roomChildren.monster.scale, {
                    x: 0.014260830357670784, 
                    y: 0.0136524997651577, 
                    z: 0.019700590521097183
                }, "third same")
                .to(this.roomChildren.monster.rotation, {
                    z: 33 * Math.PI
                }, "third same")
                .to(this.roomChildren.monster.position, {
                    x: -3.430586814880371,
                    y: 5.137828826904297,
                    z: 3.706470012664795,
                }, "third same")
                .to(this.avatar.scale, {
                    x: 0.68, 
                    y: 0.68, 
                    z: 0.68,
                }, "third same")
                .to(this.avatar.position, {
                    x: 0.9, 
                    y: 0, 
                    z: 0.9,
                }, "third same")



                .set(this.roomChildren.hellosign.scale,{
                    x: 0.009842989966273308,
                    y: 0.02096511609852314,
                    z: 0.00861157476902008,
                })
                .to(this.roomChildren.myroom.children[0].scale,{
                    x: 2.1017112731933594,
                    y: 1.1422470808029175,
                    z: 2.1723873615264893,
                    ease: "back.out(2.2)",
                    duration: 0.5
                })
                .to(this.roomChildren.myroom.children[3].scale,{
                    x: 1.5076863765716553,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5
                })
                .to(this.roomChildren.myroom.children[4].scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5
                })
                .to(this.roomChildren.myroom.children[17].scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5
                })
                .to([this.roomChildren.myroom.children[12].scale, this.roomChildren.myroom.children[8].scale],{
                    x: 0.7812415957450867, 
                    y: 0.7812415957450867, 
                    z: 0.7812415957450867,
                    ease: "back.out(2.2)",
                    duration: 0.5
                })
                .to([this.roomChildren.myroom.children[5].scale, this.roomChildren.myroom.children[6].scale],{
                    x: 1, 
                    y: 1, 
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5
                })
                .to(this.roomChildren.myroom.children[7].scale,{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5
                })
                .to([this.roomChildren.myroom.children[1].scale, this.roomChildren.myroom.children[2].scale],{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5
                })
                .to(this.roomChildren.myroom.children[15].scale,{
                    x: 1.0355336666107178, 
                    y: 1.039078712463379, 
                    z: 1.039078712463379,
                    ease: "back.out(2.2)",
                    duration: 0.5
                })
                .to(this.roomChildren.myroom.children[9].scale,{
                    x: 1.5206981897354126, 
                    y: 1.5206981897354126, 
                    z: 1.5206981897354126,
                    ease: "back.out(2.2)",
                    duration: 0.5
                })
                .to([this.roomChildren.myroom.children[10].scale, this.roomChildren.myroom.children[11].scale],{
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5
                })
                .to(this.roomChildren.myroom.children[13].scale,{
                    x: -0.9999999403953552, 
                    y: -0.9999999403953552, 
                    z: -1,
                    ease: "back.out(2.2)",
                    duration: 0.5
                })
                .to(this.roomChildren.myroom.children[18].scale,{
                    x: 0.6560832262039185, 
                    y: 0.6560832262039185, 
                    z: 0.6560832262039185,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                })
                .to(".arrow-svg-wrapper", {
                    opacity: 1,
                })
                .set("body", {
                    onComplete: () => {
                        document
                            .querySelector("body")
                            .style.removeProperty("overflow");
                    },
                });

            }
        });
    }

    onScroll(e) {
        if (e.deltaY > 0) {
            this.removeEventListeners();
            this.playSecondIntro();
        }
    }

    onTouch(e) {
        this.initialY = e.touches[0].clientY;
    }

    onTouchMove(e) {
        let currentY = e.touches[0].clientY;
        let difference = this.initialY - currentY;
        if (difference > 0) {
            console.log("swipped up");
            this.removeEventListeners();
            this.playSecondIntro();
        }
        this.intialY = null;
    }

    removeEventListeners() {
        window.removeEventListener("wheel", this.scrollOnceEvent);
        window.removeEventListener("touchstart", this.touchStart);
        window.removeEventListener("touchmove", this.touchMove);
    }

    async playIntro() {
        this.scaleFlag = true;
        await this.firstIntro();
        this.moveFlag = true;
        this.scrollOnceEvent = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this);
        window.addEventListener("wheel", this.scrollOnceEvent);
        window.addEventListener("touchstart", this.touchStart);
        window.addEventListener("touchmove", this.touchMove);
    }
    async playSecondIntro() {
        this.moveFlag = false;
        await this.secondIntro();
        this.scaleFlag = false;
        this.emit("enablecontrols");
    }

    move() {
        if (this.device === "desktop") {
            this.room.position.set(0, 0, 0);
        } else {
            this.room.position.set(0, 0, 0);
        }
    }

    scale() {
        // this.roomChildren.rectLight.width = 0;
        // this.roomChildren.rectLight.height = 0;

        // if (this.device === "desktop") {
        //     this.room.scale.set(0.11, 0.11, 0.11);
        // } else {
        //     this.room.scale.set(0.09, 0.09, 0.09);
        // }
    }

    update() {
        if (this.moveFlag) {
            this.move();
        }

        // if (this.scaleFlag) {
        //     this.scale();
        // }
    }


}

