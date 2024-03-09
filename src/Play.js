class Play extends Phaser.Scene {
    constructor() {
        super("Play")
    }

    init() {

    }

    preload() {

        this.load.image('LifeBar', './assets/Life.png' )
        this.load.image('Player', './assets/Ship.png' )
        this.load.image('Enemy_1', './assets/Alien_1.png' )
        this.load.image('bullet_1', '/assets/bullet.png')

        this.load.audio('Bullets', './assets/laserShoot.wav' )
        //this.load.audio('Explosion_1', './assets/Explosion.wav' )

    }

    create() {

        this.EnemyAmount = 0
        this.MaxEnemies = 3
        this.DelayShoot = true

        this.centerX = ScreenBorder.width / 2
        this.centerY = ScreenBorder.height / 2

        this.add.particles('star', {
        x: { min: 0, max: ScreenBorder.width },
        y: { min: 0, max: ScreenBorder.height },
        speed: 5,
        scale: { start: 0.02, end: 0 },
        quantity: 5,
        frequency: 150,
        lifespan: 5000,
        // tint: [0xffffff, 000B5C4, 0xFF5E47 ],
        gravityY: 100    

       })

       this.ship = this.add.sprite(this.centerX, this.centerY, 'Player').setScale(0.7).setOrigin(0.5,-2.7)
       this.key = this.input.keyboard.createCursorKeys()
       this.Shoot = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

       this.BulletAmmo = this.physics.add.group({
        defaultKey: 'bullet_1',
        maxSize: 10
       })

       this.PlayerStats()
    


    }

    update() {

        this.ShipSpeed = 4

        if (this.key.left.isDown) {
            this.ship.x -= this.ShipSpeed
        } else if (this.key.right.isDown) {
            this.ship.x += this.ShipSpeed
        }

        if (Phaser.Input.Keyboard.JustDown(this.Shoot) && this.DelayShoot) {
            this.sound.play('Bullets', {volume: 0.3})
            this.ShootBullets()
            this.DelayShoot = false
            this.time.delayedCall(500, () => {this.DelayShoot = true})
        }

        this.BulletAmmo.children.each((bullet) => {
            if (bullet.active && bullet.y < 0) {
                this.BulletAmmo.killAndHide(bullet)
            }
        }, this)

        this.Enemies = this.physics.add.group()
        
        this.time.addEvent({
            delay: 2000,
            callback: this.Enemytest,
            callbackScope: this,
            loop: true
        })

        this.physics.add.overlap(this.BulletAmmo, this.Enemies, this.collide, null, this) 

    }

    PlayerStats() {
        
        this.ScoreText = this.add.text(this.centerX, this.centerY, "Score : ", { ...TextStyle, color: '#00ff00' }).setOrigin(2.2, 9).setScale(0.3).setDepth(2)
        this.ScoreText = this.add.text(this.centerX, this.centerY, " N/A ", { ...TextStyle, color: '#00ff00' }).setOrigin(2, 9).setScale(0.3).setDepth(2)

        this.Lifebar_1 = this.add.image(this.centerX, this.centerY, 'LifeBar').setOrigin(-4, 4.8).setScale(0.5).setDepth(2)
        this.Lifebar_2 = this.add.image(this.centerX, this.centerY, 'LifeBar').setOrigin(-5, 4.8).setScale(0.5).setDepth(2)
        this.Lifebar_3 = this.add.image(this.centerX, this.centerY, 'LifeBar').setOrigin(-6, 4.8).setScale(0.5).setDepth(2)

    }

    ShootBullets() {
        this.bullet = this.BulletAmmo.get(this.ship.x, this.ship.y - -200, 'bullet_1')
        if (this.bullet){
            this.bullet.setActive(true)
            this.bullet.setVisible(true)
            this.bullet.setScale(0.5)
            this.bullet.body.velocity.y = -300

         
        }
    }

    Enemytest() {

        if (this.EnemyAmount < this.MaxEnemies) {
        this.Spawn = Phaser.Math.Between(0, ScreenBorder.width)
        this.Enemy = this.Enemies.create(this.Spawn, 0, 'Enemy_1')
        this.Enemy.body.velocity.y = 100
        this.Enemy.setScale(0.8)
        this.EnemyAmount++
    }

}

    collide(bullet, Enemy) {
        bullet.destroy()
        Enemy.destroy()
        //this.sound.play('Explosion_1', {volume: 0.3})
        this.EnemyAmount--
        
    }


    PlayerLife() {

    }

    CoinDrop() {

    }

}