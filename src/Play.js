class Play extends Phaser.Scene {
    constructor() {
        super("Play")

    }

    preload() {
        this.load.image('LifeBar', './assets/LifeBar.png')
        this.load.image('bulletf', '/assets/bullet.png')
        this.load.image('planet', '/assets/Planet.png')
        this.load.image('LevelComp', './assets/Level.png')

        this.load.spritesheet('Player', './assets/Test2.png', { frameWidth: 42, frameHeight: 51 })
        this.load.spritesheet('Enemy_1', './assets/Test3.png', { frameWidth: 40.6, frameHeight: 28 })

        this.load.audio('explode_1', './assets/explosion.wav')
        this.load.audio('LifeSound_1', './assets/LifeSound.wav')
        this.load.audio('Shooting', './assets/Shoot.wav')
        this.load.audio('Congrats', './assets/Congrats.wav')

    }

    create() {

        this.Score = 0
        this.ShipSpeed = 4
        this.AllowShoot = true
        this.ShootDelay = 200
        this.active = 0
        this.CheckPause = false
        this.Level = 1
        this.Speed = 1
        this.setGameOver = false

        this.add.image(ScreenBorder.width, ScreenBorder.y, 'LevelComp')
        this.TileImage = this.add.tileSprite(this.centerX, this.centerY, 4200, 720, 'planet').setOrigin(0.5, 0).setScale(0.5).setAlpha(0.02)

        this.key = this.input.keyboard.createCursorKeys()
        this.Lkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L)
        this.Kkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K)
        this.Esckey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)



        this.Spacekey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

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
            gravityY: 100
        })


        this.anims.create({
            key: 'launch',
            frames: this.anims.generateFrameNumbers('Player', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1

        })

        this.ship = this.add.sprite(this.centerX, this.centerY, 'Player').play('launch').setScale(1.8).setOrigin(0.5, -2.5)

        this.anims.create({
            key: 'Saucer',
            frames: this.anims.generateFrameNumbers('Enemy_1', { start: 0, end: 5 }),
            frameRate: 24,
            repeat: -1
        })

        this.Bullets = this.physics.add.group({
            defaultKey: 'bulletf'
        })

        this.Enemies = this.physics.add.group()

        this.Border = new Phaser.Geom.Line(0, ScreenBorder.height - 50, ScreenBorder.width, ScreenBorder.height - 50)
        this.Line = this.add.graphics({ lineStyle: { width: 3, color: 0xff0000 } })
        this.Line.strokeLineShape(this.Border)

        this.physics.add.collider(this.Bullets, this.Enemies, this.Collide, null, this)

        this.Wave()
        this.PlayerStats()



    }

    update() {
        if (!this.CheckPause && !this.setGameOver) {
            this.Ship()

            if (Phaser.Input.Keyboard.JustDown(this.Spacekey)) {
                this.Shooting()
            }
        }

        if (!this.setGameOver && Phaser.Input.Keyboard.JustDown(this.Esckey)) {
            this.Pause()
        }

        this.Enemies.children.iterate((enemy) => {
            if (enemy && enemy.active && enemy.y >= this.Border.y1) {
                enemy.destroy()
                this.Lives()
            }
        })

        if (!this.CheckPause && !this.setGameOver) {
            this.TileImage.tilePositionX += 1.2
        }
    }

    Ship() {
        if (this.key.left.isDown) {
            this.ship.x = Math.max(this.ship.width / 2, this.ship.x - this.ShipSpeed)
        } else if (this.key.right.isDown) {
            this.ship.x = Math.min(ScreenBorder.width - this.ship.width / 2, this.ship.x + this.ShipSpeed)
        }
    }

    Lives() {
        if (this.Lifebar_1.visible) {
            this.Lifebar_1.setVisible(false)
        } else if (this.Lifebar_2.visible) {
            this.Lifebar_2.setVisible(false)
        } else if (this.Lifebar_3.visible) {
            this.Lifebar_3.setVisible(false)
            this.GameOver()
        }

        this.sound.play('LifeSound_1', { volume: 0.8 })
    }

    Shooting() {

        if (this.AllowShoot) {
            this.AllowShoot = false
            this.time.addEvent({
                delay: this.ShootDelay,
                callback: () => {
                    this.AllowShoot = true
                },
                callbackScope: this
            })


            this.bullet = this.Bullets.get(this.ship.x, this.ship.y + 250)

            if (this.bullet) {
                this.bullet.setActive(true)
                this.bullet.setVisible(true)
                this.bullet.setScale(2)
                this.bullet.body.setSize(4, 9)
                this.bullet.body.setOffset(18, 8)
                this.bullet.body.velocity.y = -600

                this.sound.play('Shooting', { volume: 0.7 })
            }
        }
    }

    EnemySpawn() {
        this.enemy = this.Enemies.create(Phaser.Math.Between(30, ScreenBorder.width - 30), -50, 'Enemy_1')
        this.enemy.setVelocityY(Phaser.Math.Between(50, 85 * this.Speed))
    
       this.enemy.on('destroy', () => {
            this.active--
            if (this.active === 0) {
                this.time.delayedCall(2000, () => {
                    this.Wave()
                })
            }
        })

        this.active++
    }

    Wave() {
        if (this.active === 0) {
            this.Level++
            if (this.Level % 5 === 0) {
                this.NextLevel()
            } else {
                this.EnemyWave = 5 + Math.floor(this.Level / 5)
                for (let i = 0; i < this.EnemyWave; i++) {
                    this.EnemySpawn()
                }
            }
        }
    }


    Collide(bullet, enemy) {
        this.Scoreboard()
        bullet.destroy()
        enemy.destroy()
        this.sound.play('explode_1', { volume: 0.2 })
    }

    NextLevel() {

        if (this.setGameOver) {
            return
        }

        this.NextImage = this.add.image(ScreenBorder.width / 2, ScreenBorder.height / 2, 'LevelComp').setDepth(2)
        this.Speed += 0.2
        this.sound.play('Congrats', { volume: 0.6 })

        this.tweens.add({
            targets: this.NextImage,
            alpha: {
                from: 1,
                to: 0,
            },
            duration: 500,
            ease: 'Linear',
            yoyo: true,
            repeat: 5,
            onComplete: () => {
                this.NextImage.destroy()
                this.Wave()
            }
        })
    }


    GameOver() {
        this.setGameOver = true
        this.physics.pause()
        this.HighScoreData()
        this.children.each(child => {
            if (child !== this.TileImage) {
                child.setAlpha(0.5)

            }
        })

        this.TitleGameOver = this.add.text(this.centerX, this.centerY, "Game Over", TextStyle).setOrigin(0.5, 2).setScale(0.6).setDepth(2)
        this.time.delayedCall(3000, () => {
            this.Button_23 = this.add.text(this.centerX, this.centerY, "Main Menu", TextStyle).setOrigin(0.5, 0).setScale(0.6).setDepth(2).setBackgroundColor('#25A01D')
            this.Button_23.setInteractive()
            this.Button_23.on('pointerup', () => {
                this.scene.start('Menu')
            })

        })

    }


    Pause() {
        this.CheckPause = !this.CheckPause
        this.children.each(child => {
            if (child !== this.TileImage) {
                child.setAlpha(0.5)
            }
        })

        if (this.CheckPause) {
            this.physics.pause()
            this.Button_22 = this.add.text(this.centerX, this.centerY, "Main Menu", TextStyle).setOrigin(0.90, -2.5).setScale(0.6).setDepth(2)
            this.Button_22.setInteractive()
            this.Button_22.on('pointerup', () => {
                this.scene.start('Menu')
            })
            this.Button_21 = this.add.text(this.centerX, this.centerY, "Restart", TextStyle).setOrigin(1.15, -1.2).setScale(0.6).setDepth(2)
            this.Button_21.setInteractive()
            this.Button_21.on('pointerup', () => {
                this.scene.restart()
            })
        } else {
            this.children.each(child => {
                if (child !== this.TileImage) {
                    child.setAlpha(1)
                }
            })
            this.physics.resume()
            this.Button_22.destroy()
            this.Button_21.destroy()
        }
    }

    HighScoreData() {
        this.HighScore = this.registry.get('HighScore') || 0
        if (this.Score > this.HighScore) {
            this.registry.set('HighScore', this.Score)
        }
    }

    Scoreboard() {
        this.Score += 55
        this.ScoreBump = String(this.Score).padStart(6, '0')
        this.NumText.setText(this.ScoreBump).setOrigin(1.9, 8.8)

    }


    PlayerStats() {
        this.ScoreText = this.add.text(this.centerX, this.centerY, "Score : ", { ...TextStyle, color: '#00ff00' }).setOrigin(3.3, 13).setScale(0.2).setDepth(2)
        this.NumText = this.add.text(this.centerX, this.centerY, String(this.Score).padStart(6, '0'), { ...TextStyle, color: '#CACFD2' }).setOrigin(1.9, 8.8).setScale(0.3).setDepth(2)
        this.Lifebar_1 = this.add.image(this.centerX, this.centerY, 'LifeBar').setOrigin(-2.6, 4.8).setScale(2.3).setDepth(2)
        this.Lifebar_2 = this.add.image(this.centerX, this.centerY, 'LifeBar').setOrigin(-3.3, 4.8).setScale(2.3).setDepth(2)
        this.Lifebar_3 = this.add.image(this.centerX, this.centerY, 'LifeBar').setOrigin(-4, 4.8).setScale(2.3).setDepth(2)

    }





}
