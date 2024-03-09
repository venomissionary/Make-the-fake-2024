let config = {
    type: Phaser.AUTO,
    PixelArt: true,
    antialias: true,
    width:  1050,
    height: 720,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0},
            debug: false
        }
    },
    scene: [Menu, Play]
}

let ScreenBorder = {
    width: config.width,
    height: config.height
}

let TextStyle = {
    fontSize: '128px',
    fontFamily:'Eightbitext',
    color: '#ffffff',
    align: 'center'
}

let game = new Phaser.Game(config)