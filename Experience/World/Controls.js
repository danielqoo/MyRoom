import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import ASScroll from '@ashthornton/asscroll'

export default class Controls {
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        this.avatar = this.experience.world.room.actualAvatar;
        this.room.children.forEach((child) => {
            if (child.type === "RectAreaLight") {
                this.rectLight = child;
            }
        });
        this.room.children.forEach((child) => {
            if (child.name === "MyRoom") {
                this.myroom = child;
            }
        });

        this.circleFirst = this.experience.world.floor.circleFirst;
        this.circleSecond = this.experience.world.floor.circleSecond;
        this.circleThrid = this.experience.world.floor.circleThird;
        this.circleFourth = this.experience.world.floor.circleFourth;

        GSAP.registerPlugin(ScrollTrigger);

        document.querySelector(".page").style.overflow = "visible";


        if (
            !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            )
        ) {
            // this.setSmoothScroll();
        }

        this.setScrollTrigger();
    }


    setupASScroll(){
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            ease: 0.5,
            disableRaf: true,
        });

        GSAP.ticker.add(asscroll.update);

        ScrollTrigger.defaults({
            scroller: asscroll.containerElement,
        });

        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
            scrollTop(value) {
                if (arguments.length) {
                    asscroll.currentPos = value;
                    return;
                }
                return asscroll.currentPos;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
            fixedMarkers: true,
            disableNativeScrollbar: true,
        });

        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);

        requestAnimationFrame(() => {
            asscroll.enable({
                newScrollElements: document.querySelectorAll(
                    ".gsap-marker-start, .gsap-marker-end, [asscroll]"
                ),
            });
        });
        return asscroll;
    }


    setSmoothScroll() {
        this.asscroll = this.setupASScroll();
    }

    setScrollTrigger() {
        ScrollTrigger.matchMedia({
            //Desktop
            "(min-width: 969px)": () => {
                // console.log("fired desktop");

                // Resets
                this.room.scale.set(0.11, 0.11, 0.11);
                this.room.position.set(0, 0, 0);
                this.rectLight.width = 1.5;
                this.rectLight.height = 1.3;
                this.camera.orthographicCamera.position.set(0, 0.5, 0.5);
                this.avatar.scale.set(0.68, 0.68, 0.68);
                this.avatar.position.set(0.9, 0, 0.9);


                //----- First Section -----
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }, "first section");
                this.firstMoveTimeline.to(this.room.position, {
                    x: () => {
                        return this.sizes.width * 0.00095;
                    },
                }, "first section")
                this.firstMoveTimeline.to(this.avatar.position, {
                    x: () => {
                        return this.sizes.width * 0.00105;
                    },
                }, "first section");

                //----- Second Section -----
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }, "second section")
                .to(this.avatar.scale, {
                    x: 2.53,
                    y: 2.53,
                    z: 2.53,
                }, "second section")
                .to(this.avatar.position, {
                    x: () => {
                        return 3.051;
                    },
                    z: () => {
                        return 1.8205;
                    },
                }, "second section")
                .to(this.room.position, {
                    x: () => {
                        return 1;
                    },
                    z: () => {
                        return 0.0032;
                    },
                }, "second section")
                .to(this.room.scale, {
                    x: 0.4,
                    y: 0.4,
                    z: 0.4,
                }, "second section")
                .to(this.camera.orthographicCamera.position, {
                    y: 4.5,
                    x: 1.5,
                }, "second section")
                .to(this.rectLight, {
                    width: 1.5 * 3.6,
                    height: 1.3 * 3.6,
                }, "second section")

                //----- Third Section -----
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }, "third section")
                .to(this.rectLight, {
                    width: 1.5 * 3.6,
                    height: 1.3 * 3.6,
                }, "third section")
                .to(this.camera.orthographicCamera.position, {
                    y: 3.4,
                    x: 4.1,
                }, "third section")
                // .to(this.avatar.scale, {
                //     x: 2.83,
                //     y: 2.83,
                //     z: 2.83,
                // }, "same");


                //----- Fourth Section -----
                this.fourthMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".fourth-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }, "fourth section")
                .to(this.avatar.position, {
                    x: () => {
                        return this.sizes.width * - 0.00125;
                    },
                    z: () => {
                        return this.sizes.height * 0.0039;
                    },
                }, "fourth section")
                .to(this.avatar.scale, {
                    x: 1.13,
                    y: 1.13,
                    z: 1.13,
                }, "fourth section")
                .to(this.room.scale, {
                    x: 0.18,
                    y: 0.18,
                    z: 0.18,
                }, "fourth section")
                .to(this.camera.orthographicCamera.position, {
                    y: 0.5,
                    x: -1.5,
                }, "fourth section")
                .to(this.rectLight,{
                    width: 1.5 * 1.6,
                    height: 1.3 * 1.6,
                }, "fourth section")
                .to(this.room.position, {
                    x: () => {
                        return this.sizes.width * - 0.00175;
                    },
                    z: () => {
                        return this.sizes.height * 0.0028;
                    },
                }, "fourth section");
            },
            



            // Mobile
            "(max-width: 968px)": () => {
                // console.log("fired mobile");

                // Resets
                this.room.scale.set(0.09, 0.09, 0.09);
                this.room.position.set(0, 0, 0);
                this.rectLight.width = 1.22;
                this.rectLight.height = 1.0;
                this.camera.orthographicCamera.position.set(0, 6.5, 15);
                this.avatar.scale.set(0.55, 0.55, 0.55);
                this.avatar.position.set(0.7, 0, 0.7);

                //----- First Section -----
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }, "first section")
                .to(this.room.scale, {
                    x: 0.08,
                    y: 0.08,
                    z: 0.08,
                }, "first section")
                .to(this.rectLight, {
                        width: 1.5 * 0.7,
                        height: 1.3 * 0.7,
                    }, "first section")
                .to(this.avatar.scale, {
                    x: 0.48,
                    y: 0.48,
                    z: 0.48,
                }, "first section")
                .to(this.avatar.position, {
                    x: () => {
                        return this.sizes.width * 0.001085;
                    },
                    z: () => {
                        return this.sizes.height * 0.000781;
                    },
                }, "first section");

                //----- Second Section -----

                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }, "second section")
                .to(this.room.scale, {
                        x: 0.21,
                        y: 0.21,
                        z: 0.21,
                }, "second section")
                .to(this.room.position, {
                    x: 1.5,
                    z: 3,
                }, "second section")
                .to(this.avatar.scale, {
                    x: 1.25,
                    y: 1.25,
                    z: 1.25,
                }, "second section")
                .to(this.avatar.position, {
                    x: () => {
                        return this.sizes.width * 0.0055;
                    },
                    z: () => {
                        return this.sizes.height * 0.0055;
                    },
                }, "second section")
                .to(this.camera.orthographicCamera.position, {
                    x: 0.95,
                }, "second section")
                .to(this.rectLight, {
                    width: 1.5 * 1.85,
                    height: 1.3 * 1.85,
                }, "second section");

                // //----- Third Section -----
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }, "third section")
                .to(this.camera.orthographicCamera.position, {
                    x: 3.7,
                    y: 1.2,
                    z: 2.2,
                }, "third section")
                .to(this.rectLight, {
                    width: 1.5 * 1.85,
                    height: 1.3 * 1.85,
                }, "third section");


                // //----- Fourth Section -----
                this.fourthMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".fourth-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }, "fourth section")
                .to(this.room.scale, {
                    x: 0.09,
                    y: 0.09, 
                    z: 0.09,
                }, "fourth section")
                .to(this.room.position, {
                    x: 0, 
                    y: 0, 
                    z: 0
                }, "fourth section")
                .to(this.camera.orthographicCamera.position, {
                    x: 0,
                    y: 6.5, 
                    z: 15
                }, "fourth section")
                .to(this.avatar.scale, {
                    x: 0.55, 
                    y: 0.55, 
                    z: 0.55
                }, "fourth section")
                .to(this.rectLight, {
                    width: 1.5 * 0.8,
                    height: 1.3 * 0.8,
                }, "fourth section")
                .to(this.avatar.position, {
                    x: 0.6, 
                    y: 0, 
                    z: 0.7
                }, "fourth section");

            },


            
            // all Section Style Animation
            all: () => {
                this.sections = document.querySelectorAll(".section");
                this.sections.forEach((section) => {
                    this.progressWrapper =
                        section.querySelector(".progress-wrapper");
                    this.progressBar = 
                        section.querySelector(".progress-bar");

                    if(section.classList.contains("right")){
                        GSAP.to(section, {
                            borderTopLeftRadius: 50,
                            scrollTrigger:{
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomLeftRadius: 400,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        });
                    } else {
                        GSAP.to(section, {
                            borderTopRightRadius: 50,
                            scrollTrigger:{
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomRightRadius: 400,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        });
                    }
                    GSAP.from(this.progressBar, {
                        scaleY: 0,
                        scrollTrigger: {
                            trigger: section,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.4, 
                            pin: this.progressWrapper,
                            pinSpacing: false,
                        },
                    });
                });

                // Floor Circle Animations -------
                //----- First Section -----
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }, "first circle")
                .to(this.circleFirst.scale, {
                    x: 5,
                    y: 5,
                    z: 5,
                }, "first circle");

                //----- Second Section -----
                // console.log(this.circleSecond.position);
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }, "second circle")
                .to(this.circleSecond.scale, {
                    x: 5,
                    y: 5,
                    z: 5,
                }, "second circle")
                .to(this.room.position, {
                    y: 0.6,
                }, "second circle")
                .to(this.avatar.position, {
                    y: 0.6,
                }, "second circle");

                // //----- Third Section -----
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }, "third circle")
                .to(this.circleThrid.scale, {
                    x: 5,
                    y: 5,
                    z: 5,
                }, "third circle");


                // //----- Fourth Section -----
                this.fourthMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".fourth-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }, "fourth circle")
                .to(this.circleFourth.scale, {
                    x: 5,
                    y: 5,
                    z: 5,
                }, "fourth circle");


                // Third Page Mini Platform Animations
                this.secondPartTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "center center",
                    },
                });

                this.room.children.forEach((child) => {
                    if(child.name == "Shiba"){
                        this.first = GSAP.to(child.scale, {
                            x: 1,
                            y: 1, 
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3,
                        });
                    }

                    if(child.name == "HelloSign"){
                        this.second = GSAP.to(child.position, {
                            x: -10.822311401367188,
                            z: 1.2202684879302979,
                            ease: "back.out(2)",
                            duration: 0.3,
                        });
                    }

                    if(child.name == "InstaLogo"){
                        this.third = GSAP.to(child.scale, {
                            x: 1,
                            y: 1, 
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3,
                        });
                    }

                    if(child.name == "BrunchLogo"){
                        this.fourth = GSAP.to(child.scale, {
                            x: 0.007810677867382765,
                            y: 0.008662229403853416, 
                            z: 0.008684196509420872,
                            ease: "back.out(2)",
                            duration: 0.3,
                        });
                    }

                    if(child.name == "HomeLogo"){
                        this.fifth = GSAP.to(child.scale, {
                            x: 0.0041643972508609295,
                            y: 0.00456685246899724, 
                            z: 0.003971317317336798,
                            ease: "back.out(2)",
                            duration: 0.5,
                        });
                    }

                    if(child.name == "MyRoom"){
                        for(let i = 0; i < child.children.length; i++){
                            let childJordan001 = child.children[i];
                            if(childJordan001.name == "bookshelf"){
                                for(let j=0; j < childJordan001.children.length; j++){
                                    let childJordan002 = childJordan001.children[j];
                                    if(childJordan002.name === "jordanshoe"){
                                        this.sixth = GSAP.to(childJordan002.scale, {
                                            x: 0.390408992767334,
                                            y: 0.509611189365387,
                                            z: 0.6887184977531433,
                                            ease: "back.out(2)",
                                            duration: 0.3,
                                        });
                                        // console.log(childJordan002.scale);
                                    }
                                }
                            }
                        }
                    }

                });
                this.secondPartTimeline.add(this.first);
                this.secondPartTimeline.add(this.second, "-=0.1");
                this.secondPartTimeline.add(this.third);
                this.secondPartTimeline.add(this.fourth, "-=0.3");
                this.secondPartTimeline.add(this.fifth, "-=0.1");
                this.secondPartTimeline.add(this.sixth, "-=0.3");

            }

        });
    }


    resize(){}

    update(){}

}