/*
 * https://tamyam.github.io/tamyamLibrary/
 */
(function(global, undefined) {
    "use strict";
    function ArrayLike() {
        var args = arguments;
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
        obj.tag = (obj[0] || {}).tagName;
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
        },
        attr: function(name, value) {
            if(value == null) {
                if((this[0] || {}).hasAttribute(name)) {
                    return (this[0] || {}).getAttribute(name);
                }
            } else {
                allCall(function(el) {
                    el.setAttribute(name, value);
                }, this);
            }
            return this;
        },
        on: function() {
            var args = arguments;
            allCall(function(el) {
                EventTarget.prototype.addEventListener.apply(el, args);
            }, this);
            return this;
        },
        off: function() {
            var args = arguments;
            allCall(function(el) {
                EventTarget.prototype.removeEventListener.apply(el, args);
            }, this);
            return this;
        },
        css: function(name, value) {
            if(value == null) {
                if(typeof name === "object" && name != null) {
                    for(var key in name) {
                        if(name.hasOwnProperty(key)) {
                            var val = name[key];
                            allCall(function(el) {
                                el.style.setProperty(key, val);
                            }, this);
                        }
                    }
                    return this;
                } else {
                    return (this[0] || {}).style.getPropertyValue(name);
                }
            } else {
                allCall(function(el) {
                    el.style.setProperty(name, value);
                }, this);
            }
            return this;
        },
        addClass: function() {
            var args = arguments;
            allCall(function(el) {
                el.classList.add.apply(el.classList, args);
            }, this);
            return this;
        },
        removeClass: function() {
            var args = arguments;
            allCall(function(el) {
                el.classList.remove.apply(el.classList, args);
            }, this);
            return this;
        },
        hasClass: function(classname) {
            var hasClass = false;
            allCall(function(el) {
                hasClass = el.classList.contains(classname) || hasClass;
            }, this);
            return hasClass;
        },
        toggleClass: function() {
            var args = arguments;
            allCall(function(el) {
                el.classList.toggle.apply(el.classList, args);
            }, this);
            return this;
        },
        index: function(i) {
            return ArrayLike(this[i]);
        },
        append: function() {
            var args = arguments;
            allCall(function(el) {
                for(var i = 0; i < args.length; i++) {
                    for(var j = 0; j < args[i].length; j++) {
                        el.appendChild(args[i][j].cloneNode(true));
                    }
                }
            }, this);
            return this;
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
        createElem: function(tag) {
            return ArrayLike(document.createElement(tag));
        },
        createText: function(tag) {
            return ArrayLike(document.createTextNode(tag));
        },
        noConflict: function(bool) {
            global.$ = bool || bool === undefined ? global.tamyamDOM.old$ : global.tamyamDOM;
            return global.tamyamDOM;
        },
        old$: global.$
    };
})(this);
