/*

 TOWER-OF-BABEL
────────────────
 CLASS EXTEND
 Exercise 3 of 12


# Introduction

Now that we are able to create and use classes, lets look at how we can create classes that build on existing functionality.

Take this class for example:

    class Character {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.health_ = 100;
      }
      attack(character) {
        if (!(character instanceof Character)) throw new Error('');
        character.health_ -= 10;
      }
    }

it is possible to build on the character class like this:

    class Monster extends Character {
      constructor(x, y, name) {
        super(x, y);
        this.name = name;
      }
    }

In this example, the extends keyword lets Monster inherit(build on, reuse) the methods defined in Character. When you use this syntax it is also possible to use super. super allows to specify whether the function defined in this class should be used or the class it extends from, the "super-class".

    class Monster extends Character {
      constructor(x, y, name) {
        super(x, y);
        this.name = name;
      }
      attack(character) {
        super.attack(character);
        character.health_ -= 5;
      }
    }

# Problem

Rewrite the classes that are written below in the prototype and util.inherit fashion with the new ES6 syntax.

    var util = require('util');
    var Character = function(x, y) {
      this.x = x;
      this.y = y;
      this.health_ = 100;
    };
    
    Character.prototype.damage = function() {
      this.health_ = this.health_ - 10;
    };
    
    Character.prototype.getHealth = function() {
      return this.health_;
    };
    
    Character.prototype.toString = function() {
      return "x: " + this.x + " y: " + this.y + " health: " + this.getHealth();
    };
    
    var Player = function(x, y, name) {
      Character.call(this, x, y);
      this.name = name;
    };
    
    util.inherits(Player, Character);
    
    Player.prototype.move = function(dx, dy){
      this.x += dx;
      this.y += dy;
    };
    
    Player.prototype.toString = function() {
      return "name: " + this.name + " " + Player.super_.prototype.toString.call(this);
    };

When you have the file created, use it to make some damage and write the result to the console like this:

    var x = process.argv[2];
    var y = process.argv[3];
    var name = process.argv[4];
    var character = new Character(+x, +y);
    character.damage();
    console.log(character.toString());
    var player = new Player(+x, +y, name);
    player.damage();
    player.move(7, 8);
    console.log(player.toString());

 */

'use strict';

class Character{
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.health_ = 100;
  }

  damage() {
    this.health_ -= 10;
  }

  getHealth() {
    return this.health_;
  }

  toString() {
    return `x: ${this.x} y: ${this.y} health: ${this.health_}`;
  }
}

class Player extends Character{
  constructor(x, y, name){
    super(x, y);
    this.name = name;
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  toString() {
    return `name: ${this.name} ${super.toString()}`;
  }
}

const x = process.argv[2];
const y = process.argv[3];
const name = process.argv[4];
const character = new Character(+x, +y);
character.damage();
console.log(character.toString());
const player = new Player(+x, +y, name);
player.damage();
player.move(7, 8);
console.log(player.toString());


/*

Here's the official solution in case you want to compare notes:

────────────────────────────────────────────────────────────────────────────────
    'use strict';
    
    class Character {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.health_ = 100;
      }
      damage() {
        this.health_ -= 10;
      }
      getHealth() {
        return this.health_;
      }
      toString() {
        return "x: " + this.x + " y: " + this.y + " health: " + this.health_;
      }
    }
    
    class Player extends Character {
      constructor(x, y, name) {
        super(x, y);
        this.name = name;
      }
      move(dx, dy) {
        this.x += dx;
        this.y += dy;
      }
      toString() {
        return "name: " + this.name + " " + super.toString();
      }
    }
    
    var x = process.argv[2];
    var y = process.argv[3];
    var name = process.argv[4];
    var character = new Character(+x, +y);
    character.damage();
    console.log(character.toString());
    var player = new Player(+x, +y, name);
    player.damage();
    player.move(7, 8);
    console.log(player.toString());

────────────────────────────────────────────────────────────────────────────────


 */