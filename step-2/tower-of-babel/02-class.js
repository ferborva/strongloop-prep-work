/*

 TOWER-OF-BABEL
────────────────
 CLASS
 Exercise 2 of 12


# Introduction

When you wanted to write class-like structures in JavaScript before ES6, you had to use the prototype property of functions like this:

    var Person = function(name) {
      this.name = name;
    };
    
    Person.prototype.getName = function() {
      return this.name;
    };
    
    Person.prototype.setName = function(name) {
      this.name = name;
    };
    
    var alice = new Person("alice");
    alice.getName(); // alice
    alice.setName('bob');
    alice.getName(); // bob

This way of writing a class is not entirely impractical but it has
several shortcomings: You need to add prototype for every method
definition and the defining function doubles as the type's constructor
You need to know these "tricks" to deal with classes properly. ES6 adds a new syntax to define a class.

The same class as before written with the new ES6 syntax would look like this:

    class Person {
      constructor(name) {
        this.name = name;
      }
      getName() {
        return this.name;
      }
      setName(name) {
        this.name = name;
      }
    }
    
    var alice = new Person("alice");
    alice.getName(); // alice
    alice.setName('bob');
    alice.getName(); // bob

# Exercise

Rewrite the following class in the new ES6 class syntax:

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

and then use the class like this:

    var x = process.argv[2];
    var y = process.argv[3];
    var character = new Character(+x, +y);
    character.damage();
    console.log(character.toString());

 */

'use strict';

class Character {
	constructor(x, y){
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
		return `x: ${this.x} y: ${this.y} health: ${this.getHealth()}`
	}
}

const character = new Character(+process.argv[2], +process.argv[3]);

character.damage();

console.log(character.toString());

/*

Here's the official solution in case you want to compare notes:

────────────────────────────────────────────────────────────────────────────────
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
    
    var x = process.argv[2];
    var y = process.argv[3];
    var character = new Character(+x, +y);
    character.damage();
    console.log(character.toString());

────────────────────────────────────────────────────────────────────────────────

 */