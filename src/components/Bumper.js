export class Bumper extends Phaser.Physics.Matter.Image 
{
    constructor(scene, x, y, name)
    {
        super(scene.matter.world, x, y, name)
        this.setCircle(24)
        this.setStatic(true)
		this.setScale(0.75)
		this.setDepth(5)
        this.body.mass = .999
        this.x = x
        this.y = y
        this.body.label = name
        this.scene = scene
        this.body.restitution = 1
        this.setCollisionCategory(scene.collisionGroupB)
        this.canAnimate = true
        this.canPlaySound = true
    }

    fire(position)
    {
        let sounds = ['Bumper', 'BumperLeft', 'BumperMiddle', 'BumperRight']

        if (this.canAnimate) 
        {
            //Play a random bumper sound & a bell
            this.scene.sound.playAudioSprite('sound_effects', sounds[Math.floor(Math.random()*sounds.length)])
            this.scene.sound.playAudioSprite('sound_effects', 'bell_ding', {
                volume: 0.2
            })
            
            //Restrict firing 
            this.canAnimate = false
            
            //Grab the starting position
            let startPosition = 
            {
                x: this.x,
                y: this.y
            }
            //Calculate the midpoint between the ball and bumper
            let targetX = (this.x + position.x) / 2
            let targetY = (this.y + position.y) / 2

            //Tween to that point
            this.scene.tweens.add(
            {
                targets: this,
                x: targetX,
                y: targetY,
                yoyo: true,
                duration: 20,
                repeat: 0
            })

            //Move the bumper back to the starting position and un-restrict firing shortly thereafter. 
            setTimeout(()=>
            {
                this.x = startPosition.x
                this.y = startPosition.y
                setTimeout(()=>
                {
                    this.canAnimate = true
                }, 100)
            }, 40)
        }
    }
}
