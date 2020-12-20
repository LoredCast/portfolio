import React from 'react';
import * as THREE from 'three'
import './contact.css'



class ContactRender extends React.Component {
    
    
    three = () => {
        let scene, camera, renderer
        
        const radius = 0.010
        const POINTS = 500
        

        let init = () => {
            scene = new THREE.Scene()
            camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
            renderer = new THREE.WebGLRenderer()

            renderer.setSize(window.innerWidth, window.innerHeight)
            this.mount.appendChild(renderer.domElement)


            for (let i = 0; i < POINTS; i++) {
                let sphereGeometry = new THREE.CircleGeometry(radius, 5);
                let material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF })
                let sphere = new THREE.Mesh(sphereGeometry, material)
                sphere.position.x = (Math.random() - 0.5) * 20
                sphere.position.y = (Math.random() - 0.5) * 20
                sphere.position.z = ((Math.random() - 0.5) * 10) - 5
                scene.add(sphere)
            }
            
            camera.position.z = 5
            camera.position.y += 1
            camera.position.x += 1

            
        }

        let prevX = 0
        let prevY = 0
        let prevScroll = 0


        let onLoad = () => {
            
            
        }


        let onMouseMove = (event) => {
            
            camera.position.x -= (event.screenX - prevX) / 500
            camera.position.y += (event.screenY - prevY) / 500
            
            prevX = event.screenX
            prevY = event.screenY
        }

        let onMouseIn = (event) => {
            prevX = event.screenX
            prevY = event.screenY 
        }

        let onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()
            renderer.setSize(window.innerWidth, window.innerHeight)
        }

        let onScroll = () => {
            camera.position.y -= (window.scrollY - prevScroll) / 500
            prevScroll = window.scrollY
        }

        init()


        let animate = () => {
            requestAnimationFrame(animate)
            renderer.render(scene, camera) 

        }
        window.addEventListener('load', onLoad, false)
        window.addEventListener('mouseenter', onMouseIn, false)
        window.addEventListener('mousemove', onMouseMove, false)
        window.addEventListener('scroll', onScroll, false)
        window.addEventListener('resize', onWindowResize, false)    
        animate()

    }

    
    
    componentDidMount() {
        this.three()
    };

    render() {
        return <div id="canvas" ref={(ref) => (this.mount = ref)}></div>;
    };
};


export default ContactRender