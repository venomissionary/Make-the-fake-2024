let config = {
    type: Phaser.AUTO,
    antialias: false,
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

/* 

Hernandez Steven
CMPM 120
3/18/24

Phaser Components used: Collision Physics, Particles, Sprite Animation, Tweens, tilesprites, and Timer events 

*/
