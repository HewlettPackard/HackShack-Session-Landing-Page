/* (C) Copyright 2019 Hewlett Packard Enterprise Development LP. */
import Phaser from 'phaser';

export default class BackToTitleScene extends Phaser.Scene {
  constructor() {
    super('BackToTitle');
  }

  init(data) {
    this.gamepad = undefined;
    this.buttonPressed = false;
    this.stickPressed = false;
    this.startScene = false;

    this.height = this.game.config.height;
    this.width = this.game.config.width;

    this.selection = 'submit';
    this.score = data.score;
  }

  create() {
    this.countdown();
    this.createScene();
    this.createAnimations();
    this.keyboardInputs();
  }

  update() {
    if (this.input.gamepad.total > 0) {
      this.gamepad = this.input.gamepad.getPad(0);
    }
    if (this.startScene) {
      if (this.gamepad) {
        this.gamepadInputs();
      }
    }
  }

  countdown() {
    if (!this.startScene) {
      const startTimer = this.time.addEvent({
        delay: 500,
        repeat: 1,
        callback: () => {
          if (startTimer.repeatCount === 1) {
            this.startScene = true;
          }
        },
      });
    }
  }

  keyboardInputs() {
    this.leftInput = this.input.keyboard.on('keyup_LEFT', this.onChange, this);
    this.rightInput = this.input.keyboard.on(
      'keyup_RIGHT',
      this.onChange,
      this,
    );
    this.enterInput = this.input.keyboard.on(
      'keyup_ENTER',
      this.onSelect,
      this,
    );
  }

  gamepadInputs() {
    // A button
    if (this.gamepad.id.indexOf('Pro Controller') !== -1) {
      if (this.gamepad.buttons[1].pressed) {
        this.buttonPressed = true;
        this.onSelect();
      }
      if (!this.gamepad.buttons[1].pressed) {
        this.buttonPressed = false;
      }
    } else {
      if (this.gamepad.A && this.buttonPressed === false) {
        this.buttonPressed = true;
        this.onSelect();
      }
      if (!this.gamepad.A) {
        this.buttonPressed = false;
      }
    }
    // joystick
    if (
      this.gamepad.leftStick.x <= -0.6 &&
      this.stickPressed === false &&
      this.selection !== 'submit'
    ) {
      this.stickPressed = true;
      this.onChange();
    } else if (
      this.gamepad.leftStick.x >= 0.6 &&
      this.stickPressed === false &&
      this.selection !== 'cancel'
    ) {
      this.stickPressed = true;
      this.onChange();
    }
    if (this.gamepad.leftStick.x === 0) {
      this.stickPressed = false;
    }
  }

  createScene() {
    // submit select box
    this.submitSelectionBox = this.add
      .graphics()
      .fillStyle(0xffffff, 1)
      .fillRoundedRect(this.width / 3 - 80, this.height / 2 + 70, 200, 80);

    // cancel select box
    this.cancelSelectionBox = this.add
      .graphics()
      .fillStyle(0xffffff, 1)
      .fillRoundedRect(this.width / 2 + 20, this.height / 2 + 70, 200, 80);
    this.cancelSelectionBox.visible = false;

    // submit and cancel buttons
    this.submitButton = this.add
      .text(this.width / 3 - 35, this.height / 2 + 75, 'Yes', {
        fontFamily: 'ArcadeClassic',
        fontSize: '60px',
      })
      .setTint(0x000000)
      .setInteractive();

    this.cancelButton = this.add
      .text(this.width / 2 + 85, this.height / 2 + 75, 'No', {
        fontFamily: 'ArcadeClassic',
        fontSize: '60px',
      })
      .setTint(0xffffff)
      .setInteractive();

    this.message1 = this.add.text(
      this.width / 2 - 280,
      this.height / 2 - 180,
      'Cancel submitting',
      { fontFamily: 'ArcadeClassic', fontSize: '60px' },
    );
    this.message2 = this.add.text(
      this.width / 2 - 180,
      this.height / 2 - 100,
      'your score?',
      { fontFamily: 'ArcadeClassic', fontSize: '60px' },
    );

    this.background = this.add
      .sprite(this.width / 2, this.height / 2, 'highscoreBG')
      .setScale(6.2, 9);
    this.eyes = this.add
      .sprite(this.width / 2, this.height / 2 - 120, 'highscoreEyes')
      .setScale(5);
  }

  createAnimations() {
    this.eyes.play('blink');
    this.background.anims.playReverse('closeMouth');
  }

  onSelect() {
    if (this.selection === 'cancel') {
      this.startScene = false;
      this.background.play('closeMouth');
      this.background.on('animationcomplete', () => {
        this.scene.start('HighScore', { score: this.score });
      });
    } else {
      this.startScene = false;
      this.background.play('closeMouth');
      this.background.on('animationcomplete', () => {
        this.scene.start('Title');
      });
    }
  }

  onChange() {
    if (this.selection === 'submit') {
      this.cancelSelectionBox.visible = true;
      this.submitSelectionBox.visible = false;
      this.cancelButton.setTint(0x000000);
      this.submitButton.setTint(0xffffff);
      this.selection = 'cancel';
    } else {
      this.cancelSelectionBox.visible = false;
      this.submitSelectionBox.visible = true;
      this.cancelButton.setTint(0xffffff);
      this.submitButton.setTint(0x000000);
      this.selection = 'submit';
    }
  }
}
