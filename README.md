# Library
tamyam's Library.
## tamyamDOM
### tamyamDOM reference
$ = tamyamDOM

- *$elem* = $(*selector*)
- *newObject* = $.objclone(*obj*)
- *$elem* = $.get.id(*id*)
- *$elem* = $.get.class(*class*)
- *$elem* = $.get.name(*name*)
- *$elem* = $.get.tag(*tagname*)
- *$elem* = $.get.query(*cssquery*)
- *$elem* = $.createElem(*tagname*, *namespace*?)
- *$text* = $.createText(*text*)
- *type* = $.typeof(*object*)
- $.noConflict(*bool*)
- *old$* = old$
- *new$name* = $.noConflict(*bool*)
- *innerHTML* = *$elem*.innerHTML
- *$elem*.innerHTML = *innerHTML*
- *value* = *$elem*.value
- *$elem*.value = *value*
- *attr* = *$elem*.attr(*name*)
- *$elem*.attr(*name*, *value*)
- *$elem*.on(*type*, *listener*, *options*?)
- *$elem*.on(*type*, *listener*, *useCapture*?)
- *$elem*.off(*type*, *listener*, *options*?)
- *$elem*.off(*type*, *listener*, *useCapture*?)
- *$elem*.on(Array(*...type*), *listener*, *options*?)
- *$elem*.on(Array(*...type*), *listener*, *useCapture*?)
- *$elem*.off(Array(*...type*), *listener*, *options*?)
- *$elem*.off(Array(*...type*), *listener*, *useCapture*?)
- *cssProp* = *$elem*.css(*name*)
- *$elem*.css(*name*, *value*)
- *$elem*.css(*props*)
- *$elem*.addClass(*...class*)
- *$elem*.removeClass(*...class*)
- *hasClass* = *$elem*.hasClass(*class*)
- *$elem*.toggleClass(*class*, *force*?)
- *$elem* = *$elem*.index(*index*)
- *$elem*.append(*...$elem*)
- *$elem*.prepend(*...$elem*)
- *$elem*.parent()
- *$elem*.remove()
- *$elem*.reverse === *array*.reverse
- *$elem*.pop === *array*.pop
- *$elem*.push === *array*.push
- *$elem*.shift === *array*.shift
- *$elem*.unshift === *array*.unshift
- *$elem*.forEach(*callback*, *thisArg*?)
- *tagName* = *$elem*.tag
