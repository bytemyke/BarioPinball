// import {StaticShape} from '../components/classes.js';

export class Launcher 
{
    constructor(scene, x, y) 
    {
        this.x = x
        this.y = y
        this.scene = scene
        this.createComponents()
    }

    createComponents() 
    {
        //Create the top of the launcher
        let rectA = Phaser.Physics.Matter.Matter.Bodies.circle(this.x , this.y, 15)
        let body = this.scene.matter.body.create({
            parts: [ rectA ]
        })
        this.top = this.scene.matter.add.image(150, 0, null).setExistingBody(body).setVisible(false)
        this.top.setCollisionCategory(this.scene.collisionGroupA)
        this.top.setCollidesWith(this.scene.collisionGroupA)
        this.top.body.inertia = Infinity
        //Create the rest of the launcher
        // this.bottom = new StaticShape(this.scene, 'rectangle', this.x, this.y + 50, 40, 20, 0, this.scene.collisionGroupA )
        // this.left = new StaticShape(this.scene, 'rectangle', this.x - 10, this.y, 10, 100, 0, this.scene.collisionGroupA )
        // this.right = new StaticShape(this.scene, 'rectangle', this.x + 10, this.y, 10, 100, 0, this.scene.collisionGroupA )
        this.spring = this.scene.matter.add.constraint(this.bottom, this.top)
        this.spring.length = 90
    }

    charge() 
    {
        //Starts the music
		//backgroundMusic.play()
		// document.querySelector('.launcher-inner').style.transition = 'height 1s linear'
		// document.querySelector('.launcher-inner').style.height = '100%'
        //Pulls back the spring until it reaches desired length
        this.update = setInterval(() => 
        {
			this.spring.length--
            if (this.spring.length < 70)
            {
                clearInterval(this.update)
            }
        }, 40)
    }

    fire() 
    {
		// document.querySelector('.launcher-inner').style.transition = '0.3s'
		// document.querySelector('.launcher-inner').style.height = '0%'
        //Play sound
        this.scene.sound.playAudioSprite('sound_effects', "Plunger")

        //Stop pulling the spring back
        clearInterval(this.update)

        //Tween back to the starting position. The time is constant, so the greater distance the greater the impact. 
        this.scene.tweens.add(
        {
            targets: this.spring,
            length: 102,
            duration: 20
        })

        //Reset the spring
        setTimeout(() => 
        {
            this.spring.length = 90
        }, 50)
    }
}