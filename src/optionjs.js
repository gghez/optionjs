(function(){

    /**
     * Initializes a new OptionsManager instance based on provided options and their default values.
     *
     * @param {object} options Provided options.
     * @param {object} defaults Default values for provided options.
     * @constructor
     */
    var OptionsManager = window.OptionsManager = function (options, defaults) {
        var _this = this;

        options = options || {};
        defaults = defaults || {};

        _this.options = {};
        Object.keys(options).concat(Object.keys(defaults)).forEach(function (optKey) {
            _this.options[optKey] = options[optKey] !== undefined ? options[optKey] : defaults[optKey];
        });

        _this.handlers = {};
    };


    /**
     * Assigns a handler to an option key called each time option value changes.
     *
     * @param {string} optKey The option key on which assign handler.
     * @param {function} handler User defined handler.
     */
    OptionsManager.prototype.onChange = function (optKey, handler) {
        this.handlers[optKey] = handler;
    };


    /**
     * Indicates whether an option key has a handler assigned to its value change event.
     *
     * @param {string} optKey The option key.
     * @returns {boolean} true if handler defined, otherwise false.
     */
    OptionsManager.prototype.hasChangeHandler = function (optKey) {
        return this.handlers[optKey] !== undefined;
    };


    /**
     * Retrieves option value from its key.
     *
     * @param {string} optKey The option key.
     * @returns {*} The option value.
     */
    OptionsManager.prototype.get = function (optKey) {
        return this.options[optKey];
    };


    /**
     * Assigns a value to an option.
     *
     * @param {string} optKey The option key.
     * @param {*} optValue The option value.
     */
    OptionsManager.prototype.set = function (optKey, optValue) {
        var _this = this;

        var oldValue = _this.options[optKey];
        if (oldValue !== optValue) {
            _this.options[optKey] = optValue;
            if (_this.handlers[optKey]) {
                _this.handlers[optKey](optValue, oldValue);
            }
        }
    };

})();
