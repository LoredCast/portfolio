

export default function spring(p) {
    class Spring {
        constructor (x, y, size, damp, mass, hardness) {
            this.xpos = x
            this.ypos = y

            this.size = size
            this.move = false
            this.over = false // if mouse is over spring

            this.mass = mass
            this.k = hardness
            this.damp = damp

            this.restxPos = x
            this.restyPos = y

            this.velx = 0.0
            this.vely = 0.0
            this.accel = 0.0
            this.force = 0.0

            this.graph = new Array(1000)


            this.changeValues = (x, y, size, mass, damp, hardness) => {
                this.size = size
                this.mass = mass
                this.k = hardness
                this.damp = damp
                this.restxPos = x
                this.xpos = x
                this.restyPos = y
                this.ypos = y
            }

            this.update = () => {
                if (this.move) {
                    this.ypos = p.mouseY
                    this.accel = 0
                    this.vely = 0
                } else {
                    this.force = -this.k * (this.ypos - this.restyPos)
                    this.accel = this.force / this.mass
                    this.vely = this.damp * (this.vely + this.accel)
                    this.ypos = this.ypos + this.vely
                }

                

                if ((this.overEvent() || this.move)) {
                    this.over = true;
                } else {
                    this.over = false;
                }
            }

            this.display = function () {
                if (this.over) {
                    p.fill(200);
                } else {
                    p.fill(255);
                }
                p.line(this.xpos, 0, this.xpos, this.ypos)

                p.stroke(255)
                this.graph.push(this.ypos)
                this.graph.shift()

                for(let i = 0; i < this.graph.length; i++) {
                    p.point(this.xpos - i, this.graph[this.graph.length - 1 - i])
                    p.stroke(255)
                    p.strokeWeight(5)
                }
                p.ellipse(this.xpos, this.ypos, this.size, this.size);
            }

            this.overEvent = function () {
                let disX = this.xpos - p.mouseX;
                let disY = this.ypos - p.mouseY;
                let dis = p.createVector(disX, disY);
                if (dis.mag() < this.size / 2) {
                    return true;
                } else {
                    return false;
                }
            }

            this.pressed = function () {
                if (this.over) {
                    this.move = true;
                } else {
                    this.move = false;
                }
            }

            this.released = function () {
                this.move = false;
            }
        }
    }
    


    let canvas;
    let damped_spring
    let mass
    let k 
    let damp 
     
    
    let width
    let height



    p.setup = () => {
        canvas = p.createCanvas(window.innerWidth - 200, window.innerHeight - 300);
        console.log(p.windoWidth)
        p.noStroke();


        mass = 20
        k = 0.1
        damp = 0.999
        

        width = 800
        height = 800

        damped_spring = new Spring((window.innerWidth - 200) / 2, (window.innerHeight - 300) / 2, mass * 3,damp, mass, k)
 
    }

    p.draw = () => {
        p.background('black');
        
        damped_spring.update()
        damped_spring.display()
        p.rect(0, 0,window.innerWidth, 10) 
    }

    p.mousePressed = () => {
        damped_spring.pressed()
        console.log("pressed")
    }

    p.mouseReleased = () => {
        damped_spring.released()
    }

    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
        

        width = newProps.width
        height = newProps.height

        mass = newProps.options.mass
        k = newProps.options.constant
        damp = newProps.options.damp
        
        
        if (canvas) //Make sure the canvas has been created
            p.resizeCanvas(newProps.width, newProps.height, true)
        
        if(damped_spring) 
            damped_spring.changeValues(width / 2, height / 2, mass * 3, mass, damp, k)

        
            
    }

}