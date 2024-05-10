class startScene extends Phaser.Scene{
    constructor(){
        super("startingScene");
        this.my = {sprite: {}};

        this.spaceKey = null;

    }

    preload(){

        document.getElementById('description').innerHTML = '<h2>Galaxy Shooter</h2>';

        
    }

    create(){
        let my = this.my;

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.add.text(300, 300, '     Galaxy Shooter\n Press Space to Begin\n \n \n     W to move left\n    D to move right\n    SPACE to shoot', { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });





    }

    update(){
        let my = this.my;
        
        if (this.spaceKey.isDown){
            this.scene.start('firstRoundScene');
        }
    }
}