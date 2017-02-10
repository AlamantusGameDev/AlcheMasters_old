export class UI {
    constructor (name, state) {
        this.name = name;
        this.state = state;
        this.isActive = false;

        this.uiGroup = this.state.add.group();
        this.updateVisibility();

        this.setup();
    }

    setup () {
        // Create the buttons in here.
    }

    show () {
        this.isActive = true;

        this.updateVisibility();
    }

    hide () {
        this.isActive = true;

        this.updateVisibility();
    }

    updateVisibility () {
        this.uiGroup.visible = this.isActive;
    }

    addButton (x, y, imageKey, callback, {overFrame = null, outFrame = null, downFrame = null, upFrame = null, anchorX = 0.5, anchorY = 0.5}) {
        let button = this.state.add.button(x, y, imageKey, callback, this.state, overFrame, outFrame, downFrame, upFrame, this.uiGroup);
        button.anchor.setTo(anchorX, anchorY);

        return button;
    }

    addText (x, y, text, {font = 'Georgia', size = 32, align = 'center', anchorX = 0.5, anchorY = 0}) {
        let style = {
            font: font
        ,   fontSize: size
        ,   align: align
        };
        let webText = this.state.add.text(x, y, font, text, style, this.uiGroup);
        webText.align = align;
        webText.anchor.setTo(anchorX, anchorY);

        return webText;
    }
}