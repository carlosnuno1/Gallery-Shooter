class secondRound extends Phaser.Scene{
    constructor(){
        super("secondRoundScene");
        this.my = {sprite: {}};

        this.bodyX = 400;
        this.bodyY = 550;

        this.enemyX = 400;
        this.enemyY = 100;

        this.aKey = null;
        this.dKey = null;
        this.rKey = null;

        this.spaceKey = null;

        this.my.sprite.bullet = [];
        this.maxBullets = 10;

        this.my.sprite.enemyBullets = [];
        
        this.my.sprite.enemies = [];
        this.maxEnemies = 3;
        this.enemyOffset = 0;
        this.gameStart = true;

        this.phaseOne = true;
        this.enemyGoLeft = true;
        this.enemyGoRight = false;

        this.enemyBulletCooldown = 65;
        this.playerButtetCooldown = 10;
        
        this.health = 3;
        this.my.sprite.displayHealth = [];

        this.healthOffset = 0;

        this.actualhealth = 3;
        this.enemycount = 3;

    }

    preload(){
        this.load.setPath("./assets/");

        this.load.image("playerCharacter", "playerShip2_blue.png");

        this.load.image("emition", "laserBlue01.png");

        this.load.image("enemyEmition", "laserRed02.png");
    
        this.load.image("enemy", "enemyBlack3.png");

        this.load.image("enemy2", "enemyBlack2.png");

        document.getElementById('description').innerHTML = '<h2>Wave Two</h2>';

        
    }

    create(){
        let my = this.my;

        my.sprite.playerShip = this.add.sprite(this.bodyX, this.bodyY, "playerCharacter");
        my.sprite.playerShip.setScale(.60);

        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.playerSpeed = 10;
        this.bulletSpeed = 10;
        this.enemyBulletSpeed = 5;

        this.secondRound = true;
        this.maxEnemies = 7; 
        this.my.sprite.enemiesSecond = [];
        this.maxSecondEnemies = 3;
        this.secondenemyOffset = 0;
        this.enemysecondGoLeft = true;
        this.enemysecondGoRight = false;
        this.enemycount = 7;
        this.enemyBulletCooldown = 45;

        this.score = 0;

        this.scoreText = this.add.text(700, 10, 'Score: ' + this.score, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });

    }

    update(){
        let my = this.my;
        
        this.playerButtetCooldown--;
        this.enemyBulletCooldown--;

        // if (this.rKey.isDown){
        //     console.log(my.sprite.enemies.length);
        //     for (let enemy of my.sprite.enemies){
        //         enemy.y = -1000;
        //     }
        //     for (let health of my.sprite.displayHealth){
        //         health.y = -1000;
        //     }
        //     for (let bullet of my.sprite.enemyBullets){
        //         bullet.y = -1000;
        //     }
        //     this.healthOffset = 0;
        //     this.enemyOffset = 0;
        //     this.score = 0;
        //     this.health = 3;
        //     my.sprite.enemies = my.sprite.enemies.filter((enemies) => enemies.y > - (enemies.displayHeight/2));
        //     my.sprite.displayHealth = my.sprite.displayHealth.filter((health) => health.y > - (health.displayHeight/2));
        //     my.sprite.enemyBullets = my.sprite.enemyBullets.filter((bullets) => bullets.y > - (bullets.displayHeight/2));
            
        //     this.gameStart = true;
        //     console.log(my.sprite.displayHealth.length);

        //     this.scene.start('startingScene');
        // }

        if (this.aKey.isDown){
            if (38 < my.sprite.playerShip.x){
                my.sprite.playerShip.x -= this.playerSpeed;
            }
        } 
        
        if(this.dKey.isDown){
            if (762 > my.sprite.playerShip.x){
                my.sprite.playerShip.x += this.playerSpeed;
            }
        }

        if (this.secondRound){
            if (my.sprite.enemies.length == 4){
                this.enemyX = 100;
                this.enemyY = 200;
            }
            if (my.sprite.enemies.length < this.maxEnemies){
                my.sprite.enemies.push(this.add.sprite(this.enemyX + this.enemyOffset, this.enemyY, "enemy2"));
                this.enemyOffset += 120;
            } else {
                this.secondRound = false;
            }

            // if (my.sprite.enemiesSecond.length < this.maxSecondEnemies){
            //     my.sprite.enemiesSecond.push(this.add.sprite(this.enemyX + this.enemyOffset, 200, "enemy"));
            //     this.secondenemyOffset += 120;
            // } else {
            //     this.secondRound = false;
            // }
            for (let enemy of my.sprite.enemiesSecond){
                enemy.setScale(.6);
            }
            for (let enemy of my.sprite.enemies){
                enemy.setScale(.6)
            }
            if (my.sprite.displayHealth.length < this.health){
                my.sprite.displayHealth.push(this.add.sprite(15 + this.healthOffset, 10, "playerCharacter"))
                this.healthOffset += 40;
            }
            for (let health of my.sprite.displayHealth){
                health.setScale(.3);
            }
            // console.log(my.sprite.displayHealth.length);

        } 

            
        if (this.health <= 0){
            my.sprite.playerShip.visible = false;
            this.scene.start("gameOverScene");

        }

        if (this.enemycount == 0){
            this.scene.start("youWonScene");
        }

        if (this.spaceKey.isDown){
            if (this.playerButtetCooldown < 0){
                if (my.sprite.bullet.length < this.maxBullets) {
                    my.sprite.bullet.push(this.add.sprite(my.sprite.playerShip.x, my.sprite.playerShip.y - (my.sprite.playerShip.displayWidth/2), "emition"));
                }
                this.playerButtetCooldown = 10;
            }
        }

        for (let bullet of my.sprite.bullet) {
            bullet.y -= this.bulletSpeed;
        }

        for (let bullet of my.sprite.enemyBullets){
            bullet.y += this.enemyBulletSpeed;
        }

        my.sprite.bullet = my.sprite.bullet.filter((bullet) => bullet.y > - (bullet.displayHeight/2));
        my.sprite.enemies = my.sprite.enemies.filter((enemies) => enemies.y > - (enemies.displayHeight/2));
        my.sprite.displayHealth = my.sprite.displayHealth.filter((health) => health.y > - (health.displayHeight/2));

        for (let bullet of my.sprite.bullet){
            for (let enemy of my.sprite.enemies){
                if (collides(enemy, bullet)) {
                    this.sound.play("playerhit");
                    enemy.visible = false;
                    bullet.y = -100;
                    enemy.y = -100;
                    my.sprite.enemies = my.sprite.enemies.filter((enemies) => enemies.y > - (enemies.displayHeight/2));
                    this.score += 10;
                    this.scoreText.setText("Score: "+ this.score);
                    this.enemycount -= 1;
                }
            }
        }

        for (let bullet of my.sprite.enemyBullets){
            if (collides(my.sprite.playerShip, bullet)){
                this.sound.play("hit")
                this.health -= 1;
                bullet.y = 555555;
                let num = my.sprite.displayHealth.length - 1;
                my.sprite.displayHealth[num].visible = false;
                my.sprite.displayHealth.pop();
                this.score -= 10;
                this.scoreText.setText("Score: " + this.score);
            }
        }

        function collides(a, b) {
            if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
            if (Math.abs(a.y - b.y) > (a.displayWidth/2 + b.displayWidth/2)) return false;
            return true;
        }

        if (this.phaseOne) {
            let num = my.sprite.enemies.length - 1;
            if (my.sprite.enemies.length > 0){
                if (my.sprite.enemies[0].x < 30){
                    this.enemyGoLeft = false;
                    this.enemyGoRight = true;
                } else if (my.sprite.enemies[num].x > 750){
                    this.enemyGoLeft = true;
                    this.enemyGoRight = false;
                }
                for (let enemy of my.sprite.enemies){
                    if (this.enemyGoLeft){
                        enemy.x -= 4;
                    } else if (this.enemyGoRight) {
                        enemy.x += 4;
                    }
                }
            }

            // let numtwo = my.sprite.enemiesSecond.length - 1;
            // if (my.sprite.enemiesSecond.length > 0){
            //     if (my.sprite.enemiesSecond[0].x < 30){
            //         this.enemysecondGoLeft = false;
            //         this.enemysecondGoRight = true;
            //     } else if (my.sprite.enemiesSecond[numtwo].x > 750){
            //         this.enemysecondGoLeft = true;
            //         this.enemysecondGoRight = false;
            //     }
            //     for (let enemy of my.sprite.enemiesSecond){
            //         if (this.enemysecondGoLeft){
            //             enemy.x -= 4;
            //         } else if (this.enemysecondGoRight) {
            //             enemy.x += 4;
            //         }
            //     }
            // }
            
            if (this.enemyBulletCooldown < 0){
                for (let enemy of my.sprite.enemies){
                        my.sprite.enemyBullets.push(this.add.sprite(enemy.x, enemy.y + 50, "enemyEmition"));                        
                }
                this.enemyBulletCooldown = 45;
            }
        }
    }
}