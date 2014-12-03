optionjs
========

Option manager for javascript components.

[![Build Status](https://travis-ci.org/gghez/optionjs.png?branch=master)](https://travis-ci.org/gghez/optionjs)

## Why

Optionjs handles options creation using default values and read/write operations. The most interesting part of using optionjs is the ability to attach handler on an option value change.

Using kind of util inside a component to read/write related options also gives more flexibility to add more options in the future without changing your shipped interfaces.

## Installation

Using bower package manager:

```
bower install https://github.com/gghez/optionjs.git
```

Using npm package manager for nodejs module:

```
npm install optionjs
```

## Usage

You can use **optionjs** as client side javascript resource as well as nodejs module.

### Client side

Reference **optionjs.js** script:
```html
<script src="bower_components/optionjs/src/optionjs.js"></script>
```

Assuming you create a prototype which needs to be configurable using option list. Optionjs replaces option management logical layer. Use **optionjs** this way:

```js
// onOpt1Change handler
function onOpt1Change(newValue, oldValue) {
    console.log('opt1 option value changed from', opt1OldValue, 'to', opt1NewValue);
}

// Constructor
var MyProto = function(options) {
    this.options = new OptionsManager(options, {
        'opt1': 'opt1 default value',
        'opt2': null
    });

    // An opt1 value change raises onOpt1Change function.
    this.options.onChange('opt1', onOpt1Change);
};

// Getter / Setter example
MyProto.prototype.options = function(optKey, optValue) {
    if (optValue === undefined) { // Use as getter
        return this.options.get(optKey);
    } else { // Use as setter
        this.options.set(optKey, optValue);
    }
}
```

### Server side

```js
var optionjs = require('optionjs');

var options = optionjs(
    { opt1: 'string1', opt3: 'string3'},
    { opt2: 'default string 2' }
);

console.log(options.get('opt1')); // string 1
console.log(options.get('opt2')); // default string 2
```

## API

###OptionsManager(options, defaults)
Constructor creates a new instance of **OptionsManager**.
Example:
```js
var options = OptionsManager(
  {opt1: 'string1', opt3: null},
  {opt2: 'string2', opt3: 'string3'});

console.log(options.get('opt1')); // string1
console.log(options.get('opt2')); // string2
console.log(options.get('opt3')); // null
```
Parameter   | Description
------------|------------
options     | Options object using keys as option names and values as option values.
defaults    | Options object used to complete ```options``` on non-existing option name.

###.get(optKey)
Retrieves an option value given its name (```optKey```).

###.set(optKey, optValue)
Defines or overrides existing option given its name (```optKey```) and new value (```optValue```).

###.onChange(optKey, handler)
Attach an event handler called each time option has its value changed.

Parameter   | Description
------------|------------
optKey      | The option name.
handler     | A user defined function called with respectively new value and old value of option on which it has been attached.

###.hasChangeHandler(optKey)
Indicates whether option named ```optKey``` has an attached handler spying its value changes.
Returns ```true``` or ```false``` only.

##Development
 1. Clone git repository
  ```
  git clone https://github.com/gghez/optionjs.git
  ```
  
 2. Installation
  ```
  npm install
  ```
  
 3. Run tests

    a. Continuous integration

        ```
        grunt run
        ```

    b. One time

        ```
        grunt test
        ```
        
