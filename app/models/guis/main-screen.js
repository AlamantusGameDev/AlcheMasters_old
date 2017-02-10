import {UI} from '../ui';

export class MainScreen extends UI {
    constructor (state) {
        super('MainScreenGUI', state);
    }

    setup () {
        let game = this.state.game;

        let mainButton = this.addButton(game.width / 2, game.height / 2, 'player', () => {console.log('yay')});
    }
}