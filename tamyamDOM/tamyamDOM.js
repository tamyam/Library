/*
 * https://tamyam.github.io/tamyamLibrary/
 */
(function(global, undefined) {
    "use strict";
    function ArrayLike() {
        var temp = [];
        var args = Array.prototype.filter.call(arguments, function(x) {
            var returnBool = temp.indexOf(x) == -1;
            if(returnBool) temp.push(x);
            return returnBool;
        });
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
        on: function(type, listener, options) {
            var args = arguments;
            allCall(function(el) {
                if(global.tamyamDOM.type(type) === "String") {
                    el.addEventListener(type, listener, options);
                } else {
                    type.forEach(function(typ) {
                        el.addEventListener(typ, listener, options);
                    });
                }
            }, this);
            return this;
        },
        off: function(type, listener, options) {
            var args = arguments;
            allCall(function(el) {
                if(global.tamyamDOM.type(type) === "String") {
                    el.removeEventListener(type, listener, options);
                } else {
                    type.forEach(function(typ) {
                        el.removeEventListener(typ, listener, options);
                    });
                }
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
                    if(i === 0) args[i].remove();
                }
            }, this);
            return this;
        },
        prepend: function() {
            var args = arguments;
            allCall(function(el) {
                for(var i = 0; i < args.length; i++) {
                    for(var j = 0; j < args[i].length; j++) {
                        el.insertBefore(args[i][j].cloneNode(true), el.firstElementChild);
                    }
                    if(i === 0) args[i].remove();
                }
            }, this);
            return this;
        },
        parent: function() {
            var array = [];
            allCall(function(el) {
                array.push(el.parentNode);
            }, this);
            return ArrayLike.apply(0, array);
        },
        remove: function() {
            allCall(function(el) {
                var parent = el.parentNode;
                if(parent != null) parent.removeChild(el);
            }, this);
        }
    };
    ArrayLike.obj.prototype.reverse = Array.prototype.reverse;
    ArrayLike.obj.prototype.forEach = Array.prototype.forEach;
    ArrayLike.obj.prototype.pop = Array.prototype.pop;
    ArrayLike.obj.prototype.push = Array.prototype.push;
    ArrayLike.obj.prototype.shift = Array.prototype.shift;
    ArrayLike.obj.prototype.unshift = Array.prototype.unshift;
    function allCall(func, self) {
        for(var i = 0; i < self.length; i++) {
            func(self[i]);
        }
    }
    var fn = {
        objclone: function(obj) {
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
        typeof: function(obj) {
            if(typeof obj === "number" && obj !== obj) {
                return "NaN";
            } else {
                return Object.prototype.toString.call(obj).slice(8, -1);
            }
        },
        noConflict: function(bool) {
            global.$ = bool || bool === undefined ? global.tamyamDOM.old$ : global.tamyamDOM;
            return global.tamyamDOM;
        },
        old$: global.$
    };
    global.$ = global.tamyamDOM = function(selector) {
        var selectorMatch = selector.match(/^([#.]?)\w+$/);
        if(selectorMatch != null) {
            var selectorName = selectorMatch[1];
            switch(selectorName) {
                case "#":
                    return global.tamyamDOM.get.id(selector.replace(/^./, ""));
                    break;
                case ".":
                    return global.tamyamDOM.get.class(selector.replace(/^./, ""));
                    break;
                case "":
                    return global.tamyamDOM.get.tag(selector);
                    break;
                default:
                    return undefined;
            }
        } else {
            return global.tamyamDOM.get.query(selector);
        }
    };
    for(var key in fn) {
        if(fn.hasOwnProperty(key)) {
            global.tamyamDOM[key] = fn[key];
        }
    }
})(this);
