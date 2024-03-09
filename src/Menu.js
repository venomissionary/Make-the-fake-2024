class Menu extends Phaser.Scene {
    constructor() {
        super("Menu")
    }
  
    init() {

    }

    preload() {
        this.load.image('star', './assets/Pixel.png')
        this.load.audio('click', './assets/click.wav' )
        this.load.audio('Music', './assets/Music.mp3')

 
    }

    create() {

        this.sound.play('Music', {loop: true, volume: 0.5})

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

    update() {


    }

    MainMenu() {

        this.Button_3 = this.add.text(this.centerX, this.centerY, "credits", TextStyle).setOrigin(1.16,-2.5).setScale(0.6)
        this.Button_2 = this.add.text(this.centerX, this.centerY, "Options", TextStyle).setOrigin(1.16,-1).setScale(0.6)
        this.Button_1 = this.add.text(this.centerX, this.centerY, "Play", TextStyle).setOrigin(2,0.5).setScale(0.6)
        this.Extra = this.add.text(this.centerX, this.centerY, "ver. 0.2.5", TextStyle).setOrigin(-2.2,-14.5).setScale(0.2)

        this.Title = this.add.text(this.centerX, this.centerY, "Super Mega Blasteroids 10", TextStyle).setOrigin(0.5,6).setScale(0.4).setBackgroundColor('#F25757')
        this.Version = this.add.text(this.centerX, this.centerY, " -Alpha- ", TextStyle).setOrigin(0.5,4).setScale(0.4).setBackgroundColor('#25ABE5')

        
        
        this.Button_3.setInteractive()
        this.Button_3.on('pointerup', () => {
            this.sound.play('click')
            this.Button_1.destroy()
            this.Button_2.destroy()
            this.Button_3.destroy()
            this.Title.destroy()
            this.Version.destroy()
            this.CreditMenu()
       })
       
       this.Button_2.setInteractive()
       this.Button_2.on('pointerup', () => {
           this.sound.play('click')
           this.Button_1.destroy()
           this.Button_2.destroy()
           this.Button_3.destroy()
           this.Title.destroy()
           this.Version.destroy()
           this.OptionMenu()
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

    CreditMenu() {
       this.Text_1 = this.add.text(this.centerX, this.centerY, 'Credits Menu', TextStyle).setOrigin(0.5,4).setScale(0.5)
       this.Text_2 = this.add.text(this.centerX, this.centerY, ' - work in progress - ', TextStyle).setOrigin(0.5,0).setScale(0.2)
       this.Button_back = this.add.text(this.centerX, this.centerY, ' [Main Menu] ', TextStyle).setOrigin(0.5,3).setScale(0.2)

       this.Button_back.setInteractive() 
       this.Button_back.on('pointerup', () => {
        this.Text_1.destroy()
        this.Text_2.destroy()
        this.Button_back.destroy()
        
        this.MainMenu()
       })


    }

    OptionMenu() {
       
        this.Text_3 = this.add.text(this.centerX, this.centerY, 'Options Menu', TextStyle).setOrigin(0.5,4).setScale(0.5)
        this.Text_4 = this.add.text(this.centerX, this.centerY, ' - work in progress - ', TextStyle).setOrigin(0.5,0).setScale(0.2)
 
        this.Button_back = this.add.text(this.centerX, this.centerY, ' [Main Menu] ', TextStyle).setOrigin(0.5,3).setScale(0.2)
 
        this.Button_back.setInteractive() 
        this.Button_back.on('pointerup', () => {
         this.Text_3.destroy()
         this.Text_4.destroy()
         this.Button_back.destroy()
         this.MainMenu()
        })

     }


     PlayScene() {
        this.scene.start('Play')
     }

}