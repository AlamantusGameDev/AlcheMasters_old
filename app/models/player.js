import {Geolocation} from '../classes/geolocation';

export class Player extends Phaser.Sprite {
    constructor(game, x = 0, y = 0, key = 'player') {
        super(game, x, y, key);

        game.add.existing(this);
        game.physics.arcade.enable(this);

        this.geo = new Geolocation(this);
    }
}
