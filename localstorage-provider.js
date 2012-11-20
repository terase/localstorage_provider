/**
 * The constructor is implemented in the YUI module pattern.
 *
 * @class It's a helper class to wrap the local storage control.
 * @constructor
 * @param {Array} arguments(implicit argument of javascript.)
 * @auther kterase
 * @copyright Iridium
 * @version 1.0
 * @license MIT
 */
function LocalStorageProvider() {
    var args = Array.prototype.slice.call(arguments),
        callback = (function() {
            if(typeof args[args.length - 1] === "function") {
                return args.pop();
            }
            //undefined
            return;
        })(),
        modules = (args[0] && typeof args[0] === "String") ? args : args[0],
        i;
    if(!(this instanceof LocalStorageProvider)) {
        return new LocalStorageProvider(modules, callback);
    }
    if(!modules || modules === '*') {
        modules = [];
        for(i in LocalStorageProvider.modules) {
            if(LocalStorageProvider.modules.hasOwnProperty(i)) {
                modules.push(i);
            }
        }
    }
    for(i = 0; i < args.length; i += 1) {
        var moduleName = args[i];
        LocalStorageProvider.modules[moduleName](this);
    }
    if(callback) {
        callback(this);
    }
}

LocalStorageProvider.prototype = {

    /* @property {string} name The class name */
    name: "LocalStorageProvider",

    /* @property {boolean} logging The this class develop for debug */
    logging: false,

    /**
     * this class debuging logger.
     *
     * @this {LocalStorageProvider}
     * @param {string} message 
     * @deprecated
     */
    log : function(message) {
        if(this.logging) {
            console.log(message);
        }
    },
    /**
     * Returns the value for the key from the localstorage.
     *
     * @this {LocalStorageProvider}
     * @param {string} key set localstorage key.
     * @param {string} value set localstorage value.
     */
    setItem : function(key, value) {
        try {
            this.log("Inside setItem:" + key + ":" + value);
            localStorage.removeItem(key);
            localStorage.setItem(key, value);
        } catch(e) {
            this.log("Error inside setItem");
            this.log(e);
        }
        this.log("Return from setItem" + key + ":" +  value);
    },
    /**
     * Returns the value for the key from the localstorage.
     *
     * @this {LocalStorageProvider}
     * @param {string} key get target key.
     * @return {string} localstorage value.
     */
    getItem : function(key) {
        var value;
        this.log('Get Item:' + key);
        try {
            value = localStorage.getItem(key);
        } catch(e) {
            this.log("Error inside getItem() for key:" + key);
            this.log(e);
            value = "null";
        }
        this.log("Returning value: " + value);
        return value;
    },
    /**
     * removed the key from the localstorage.
     *
     * @this {LocalStorageProvider}
     * @param {string} key remove target key.
     */
    removeItem : function(key) {
        try {
            this.log("Inside removeItem:" + key);
            localStorage.removeItem(key);
        } catch(e) {
            this.log("Error inside removeItem");
            this.log(e);
        }
        this.log("Return from removeItem " + key);
    },
    /**
     * delete all the values ​​set in the local storage.
     *
     * @this {LocalStorageProvider}
     */
    removeAll : function() {
        this.log('about to clear local storage');
        localStorage.clear();
        this.log('cleared');
    }
};

//---------------------------------------------------- Origin Storage Modules
LocalStorageProvider.modules = {};
LocalStorageProvider.modules.skelton = function(storage) {

    storage.exist = function() {
    };
    storage.initStorage = function() {
    };
    storage.getStorageData = function() {
    };
    storage.setStorageData = function(data) {
    };
};
