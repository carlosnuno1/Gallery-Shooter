class gameOver extends Phaser.Scene{
    constructor(){
        super("gameOverScene");
        this.my = {sprite: {}};

        this.spaceKey = null;

    }

    preload(){

        document.getElementById('description').innerHTML = '<h2>Game Over</h2>';

        
    }

    create(){
        let my = this.my;

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.scoreText = this.add.text(300, 300, '  You Died\n Game Over', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });

    }

    update(){
        let my = this.my;
        
        if (this.spaceKey.isDown){
            this.scene.start('firstRoundScene');
        }
    }
}