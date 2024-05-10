class youWon extends Phaser.Scene{
    constructor(){
        super("youWonScene");
        this.my = {sprite: {}};

        this.spaceKey = null;

    }

    preload(){

        document.getElementById('description').innerHTML = '<h2>You Won</h2>';

        
    }

    create(){
        let my = this.my;

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.scoreText = this.add.text(300, 300, '  You Won!!\n Good Job!!!', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });

    }

    update(){
        let my = this.my;
        
    }
}