/*
 * https://tamyam.github.io/tamyamLibrary/
 */
(function(global, undefined) {
    "use strict";
    function ArrayLike() {
        var args = arguments;
        console.log(ArrayLike.obj);
        var obj = new ArrayLike.obj;

        switch(args.length) {
            case 0:
                obj.length = 0;
                break;
            case 1:
                obj.length = 1;
                obj[0] = args[0];
                break;
            default:
                obj.length = args.length;
                for(var i = 0; i < obj.length; i++) {
                    obj[i] = args[i];
                }
        }
        return obj;
    }
    ArrayLike.obj = function() {};
    ArrayLike.obj.prototype = {
        get innerHTML() {
            return (this[0] || {}).innerHTML;
        },
        set innerHTML(val) {
            allCall(function(el) {
                el.innerHTML = val;
            }, this);
        },
        get value() {
            return (this[0] || {}).innerHTML;
        },
        set value(val) {
            allCall(function(el) {
                el.value = val;
            }, this);
        }
    };
    function allCall(func, self) {
        for(var i = 0; i < self.length; i++) {
            func(self[i]);
        }
    }
    global.$ = global.tamyamDOM = {
        clone: function(obj) {
            var r = {};
            for(var name in obj) {
                if(typeof obj[name] === "object" && obj[name] != null) {
                    r[name] = global.tamyamDOM.clone(obj[name]);
                } else {
                    r[name] = obj[name];
                }
            }
            return r;
        },
        get: {
            id: function(selector) {
                var el = document.getElementById(selector);
                return el == null ? ArrayLike() : ArrayLike(el);
            },
            class: function(selector) {
                var els = document.getElementsByClassName(selector);
                return ArrayLike.apply(0, els);
            },
            name: function(selector) {
                var els = document.getElementsByName(selector);
                return ArrayLike.apply(0, els);
            },
            tag: function(selector) {
                var els = document.getElementsByTagName(selector);
                return ArrayLike.apply(0, els);
            },
            query: function(selector) {
                var els = document.querySelectorAll(selector);
                return ArrayLike.apply(0, els);
            }
        },
        noConflict: function(bool) {
            global.$ = bool || bool === undefined ? global.tamyamDOM.old$ : global.tamyamDOM;
        },
        old$: global.$
    };
})(this);
