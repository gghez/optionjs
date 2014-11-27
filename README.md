optionjs
========

Option manager for javascript components.

## Installation

Using bower package manager:

```
bower install https://github.com/gghez/optionjs.git
```

## Usage

Reference **optionjs.js** script:
```html
<script src="bower_components/optionjs/src/optionjs.js"></script>
```

Assuming you create a prototype which needs to be configurable using option list:

```js
// Constructor
var MyProto = function(options) {
    // Set options in instance variables
};

// Used to override some option
MyProto.prototype.options = function(optKey, optValue) {
    // Change instance variables
};
```

You do not have to implement option management logical. Use **optionjs** this way:

```js
// Constructor
var MyProto = function(options) {
    this.options = new OptionsManager(options, {
        'opt1': 'opt1 default value',
        'opt2': null
    });

    this.options.onChange('opt1', function(opt1NewValue, opt1OldValue) {
        console.log('opt1 option value changed from', opt1OldValue, 'to', opt1NewValue);
    });
};

// Getter / Setter example
MyProto.prototype.options = function(optKey, optValue) {
    if (optValue === undefined) {
        return this.options.get(optKey);
    } else {
        this.options.set(optKey, optValue);
    }
}

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

###options.get(optKey)
Retrieves an option value given its name (```optKey```).

###options.set(optKey, optValue)
Defines or overrides existing option given its name (```optKey```) and new value (```optValue```).

###options.onChange(optKey, handler)
Attach an event handler called each time option has its value changed.
Parameter   | Description
------------|------------
optKey      | The option name.
handler     | A user defined function called with respectively new value and old value of option on which it has been attached.

###options.hasChangeHandler(optKey)
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
  
 3. Run tests as continuous integration
  ```
  grunt run
  ```
