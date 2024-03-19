class Menu extends Phaser.Scene {
    constructor() {
        super("Menu")
    }
    
    preload() {
        this.load.image('star', './assets/Pixel.png')
        this.load.audio('click', './assets/click.wav' )
        this.load.audio('Music', './assets/Music.mp3')
        this.load.image('ImageJSFXR', './assets/header.png')

 
    }

    create() {
     
        if (!this.registry.get('playMusic')) {
            this.sound.play('Music', {loop: true, volume: 0.5})
            this.registry.set('playMusic', true)
       }

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
        tint: [0xffffff, 0x00B5C4, 0xFF5E47  ]
    
       })

       this.MainMenu()

    }

    MainMenu() {

        this.Button_3 = this.add.text(this.centerX, this.centerY, "Tutorial", TextStyle).setOrigin(1.03,-2.5).setScale(0.6)
        this.Button_2 = this.add.text(this.centerX, this.centerY, "Credits", TextStyle).setOrigin(1.16,-1).setScale(0.6)
        this.Button_1 = this.add.text(this.centerX, this.centerY, "Play", TextStyle).setOrigin(2,0.5).setScale(0.6)
        this.Extra = this.add.text(this.centerX, this.centerY, "ver. 1.0", TextStyle).setOrigin(-2.9,-14.5).setScale(0.2)

        this.Title = this.add.text(this.centerX, this.centerY, "Super Mega Blasteroids 10", TextStyle).setOrigin(0.5,6).setScale(0.4).setBackgroundColor('#F25757')
        this.Version = this.add.text(this.centerX, this.centerY, " Main Menu ", TextStyle).setOrigin(0.5,4).setScale(0.4).setBackgroundColor('#25ABE5')

         this.HighScore = this.registry.get('HighScore') || 0
         this.HighScoreDisplay = this.add.text(this.centerX, this.centerY, "Highest Score: " + this.HighScore, TextStyle).setOrigin(0.5, -9).setScale(0.3).setBackgroundColor('#FFC300')

        
        
        this.Button_3.setInteractive()
        this.Button_3.on('pointerup', () => {
            this.sound.play('click')
            this.Button_1.destroy()
            this.Button_2.destroy()
            this.Button_3.destroy()
            this.Title.destroy()
            this.Version.destroy()
            this.TutorialMenu()
       })
       
       this.Button_2.setInteractive()
       this.Button_2.on('pointerup', () => {
           this.sound.play('click')
           this.Button_1.destroy()
           this.Button_2.destroy()
           this.Button_3.destroy()
           this.Title.destroy()
           this.Version.destroy()
           this.CreditMenu()
      })
      
      this.Button_1.setInteractive() 
      this.Button_1.on('pointerup', () => {
        this.sound.play('click')
        this.Button_1.destroy()
        this.Button_2.destroy()
        this.Button_3.destroy()
        this.Title.destroy()
        this.Version.destroy()
        this.PlayScene()
      })

    }

    TutorialMenu() {
       this.Text_1 = this.add.text(this.centerX, this.centerY, 'Tutorial Menu', TextStyle).setOrigin(0.5,4).setScale(0.5)
       this.Text_11 = this.add.text(this.centerX, this.centerY, ' Press SpaceBar to shoot', TextStyle).setOrigin(0.5,0).setScale(0.2)
       this.Text_12 = this.add.text(this.centerX, this.centerY, ' Press ESC to Pause ', TextStyle).setOrigin(0.5,-6).setScale(0.2)
       this.Text_13 = this.add.text(this.centerX, this.centerY, ' Press <-> Arrow Keys to Move ', TextStyle).setOrigin(0.5,-2).setScale(0.2)
       this.Text_14 = this.add.text(this.centerX, this.centerY, ' Shoot Aliens to acheive a high score ', TextStyle).setOrigin(0.5,-8).setScale(0.2)
       this.Text_15 = this.add.text(this.centerX, this.centerY, ' And avoid letting them pass!', TextStyle).setOrigin(0.5,-10).setScale(0.2)
       this.Button_back = this.add.text(this.centerX, this.centerY, ' [Main Menu] ', TextStyle).setOrigin(0.5,3).setScale(0.4).setBackgroundColor('#25ABE5')

       this.Button_back.setInteractive() 
       this.Button_back.on('pointerup', () => {
        this.Text_1.destroy()
        this.Text_11.destroy()
        this.Text_12.destroy()
        this.Text_13.destroy()
        this.Text_14.destroy()
        this.Text_15.destroy()
        this.Button_back.destroy()
        
        this.MainMenu()
       })


    }

    CreditMenu() {
       
        this.Text_3 = this.add.text(this.centerX, this.centerY, 'Credits Menu', TextStyle).setOrigin(0.5,4).setScale(0.6)
        this.Text_5 = this.add.text(this.centerX, this.centerY, ' [Sound by] ', TextStyle).setOrigin(0.5,3.6).setScale(0.2)
        this.image_1 = this.add.image(this.centerX, this.centerY, 'ImageJSFXR').setScale(0.15).setOrigin(0.5, 0.65)
        this.Text_6 = this.add.text(this.centerX, this.centerY, ' [Visual Assets]', TextStyle).setOrigin(0.5,-2).setScale(0.2)
        this.Text_7 = this.add.text(this.centerX, this.centerY, ' Steven Hernandez ', TextStyle).setOrigin(0.5,-4).setScale(0.2)

        this.Text_8 = this.add.text(this.centerX, this.centerY, ' [Music] ', TextStyle).setOrigin(0.5,-6).setScale(0.2)
        this.Text_9  = this.add.text(this.centerX, this.centerY, ' TimeWarp by Free Royalty YT ', TextStyle).setOrigin(0.5,-8).setScale(0.2)
        this.Button_back = this.add.text(this.centerX, this.centerY, ' [Main Menu] ', TextStyle).setOrigin(0.5,5).setScale(0.3).setBackgroundColor('#25ABE5')
 
        this.Button_back.setInteractive() 
        this.Button_back.on('pointerup', () => {
         this.Text_3.destroy()
         this.Text_5.destroy()
         this.image_1.destroy()
         this.Text_6.destroy()
         this.Text_7.destroy()
         this.Text_8.destroy()
         this.Text_9.destroy()
         this.Button_back.destroy()
         this.MainMenu()
        })

     }


     PlayScene() {
        this.scene.start('Play')
     }

}