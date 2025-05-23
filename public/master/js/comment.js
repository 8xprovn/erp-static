

function customAjax(options) {
    // Kiểm tra xem cookie_name có tồn tại và có giá trị hợp lệ không
    if (typeof cookie_name === 'undefined' || cookie_name === null || cookie_name === "") {
        console.warn("cookie_name is not defined or is empty. Aborting request.");
        return; // Dừng lại nếu cookie_name không hợp lệ
    }

    // Default configurations for this file
    let defaultOptions = {
        headers: {
            Authorization: "Bearer " + getCookie(cookie_name),
            "Content-Type": "application/json",
            "contact-id": $('meta[name="contact-id"]').attr("content") || "",
            token: $('meta[name="contact-token"]').attr("content") || "",
        },
        beforeSend: function (xhr) {
            // Kiểm tra cookie_name ở đây một lần nữa nếu cần
            if (typeof cookie_name === 'undefined' || cookie_name === null || cookie_name === "") {
                console.warn("cookie_name is not defined or is empty. Aborting request.");
                return false; // Dừng lại nếu cookie_name không hợp lệ
            }
        },
    };

    // Merge default options with specific request options
    let finalOptions = $.extend(true, {}, defaultOptions, options);

    // Execute AJAX call
    return $.ajax(finalOptions);
}

(function (global, factory) {
    typeof exports === "object" && typeof module !== "undefined"
        ? (module.exports = factory())
        : typeof define === "function" && define.amd
        ? define(factory)
        : ((global = global || self), (global.Tribute = factory()));
})(this, function () {
    "use strict";

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
    }

    function _slicedToArray(arr, i) {
        return (
            _arrayWithHoles(arr) ||
            _iterableToArrayLimit(arr, i) ||
            _unsupportedIterableToArray(arr, i) ||
            _nonIterableRest()
        );
    }

    function _arrayWithHoles(arr) {
        if (Array.isArray(arr)) return arr;
    }

    function _iterableToArrayLimit(arr, i) {
        if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr)))
            return;
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = undefined;

        try {
            for (
                var _i = arr[Symbol.iterator](), _s;
                !(_n = (_s = _i.next()).done);
                _n = true
            ) {
                _arr.push(_s.value);

                if (i && _arr.length === i) break;
            }
        } catch (err) {
            _d = true;
            _e = err;
        } finally {
            try {
                if (!_n && _i["return"] != null) _i["return"]();
            } finally {
                if (_d) throw _e;
            }
        }

        return _arr;
    }

    function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(n);
        if (
            n === "Arguments" ||
            /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
        )
            return _arrayLikeToArray(o, minLen);
    }

    function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;

        for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

        return arr2;
    }

    function _nonIterableRest() {
        throw new TypeError(
            "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
    }

    if (!Array.prototype.find) {
        Array.prototype.find = function (predicate) {
            if (this === null) {
                throw new TypeError(
                    "Array.prototype.find called on null or undefined"
                );
            }

            if (typeof predicate !== "function") {
                throw new TypeError("predicate must be a function");
            }

            var list = Object(this);
            var length = list.length >>> 0;
            var thisArg = arguments[1];
            var value;

            for (var i = 0; i < length; i++) {
                value = list[i];

                if (predicate.call(thisArg, value, i, list)) {
                    return value;
                }
            }

            return undefined;
        };
    }

    if (window && typeof window.CustomEvent !== "function") {
        var CustomEvent$1 = function CustomEvent(event, params) {
            params = params || {
                bubbles: false,
                cancelable: false,
                detail: undefined,
            };
            var evt = document.createEvent("CustomEvent");
            evt.initCustomEvent(
                event,
                params.bubbles,
                params.cancelable,
                params.detail
            );
            return evt;
        };

        if (typeof window.Event !== "undefined") {
            CustomEvent$1.prototype = window.Event.prototype;
        }

        window.CustomEvent = CustomEvent$1;
    }

    var TributeEvents = /*#__PURE__*/ (function () {
        function TributeEvents(tribute) {
            _classCallCheck(this, TributeEvents);

            this.tribute = tribute;
            this.tribute.events = this;
        }

        _createClass(
            TributeEvents,
            [
                {
                    key: "bind",
                    value: function bind(element) {
                        element.boundKeydown = this.keydown.bind(element, this);
                        element.boundKeyup = this.keyup.bind(element, this);
                        element.boundInput = this.input.bind(element, this);
                        element.addEventListener(
                            "keydown",
                            element.boundKeydown,
                            false
                        );
                        element.addEventListener(
                            "keyup",
                            element.boundKeyup,
                            false
                        );
                        element.addEventListener(
                            "input",
                            element.boundInput,
                            false
                        );
                    },
                },
                {
                    key: "unbind",
                    value: function unbind(element) {
                        element.removeEventListener(
                            "keydown",
                            element.boundKeydown,
                            false
                        );
                        element.removeEventListener(
                            "keyup",
                            element.boundKeyup,
                            false
                        );
                        element.removeEventListener(
                            "input",
                            element.boundInput,
                            false
                        );
                        delete element.boundKeydown;
                        delete element.boundKeyup;
                        delete element.boundInput;
                    },
                },
                {
                    key: "keydown",
                    value: function keydown(instance, event) {
                        if (instance.shouldDeactivate(event)) {
                            instance.tribute.isActive = false;
                            instance.tribute.hideMenu();
                        }

                        var element = this;
                        instance.commandEvent = false;
                        TributeEvents.keys().forEach(function (o) {
                            if (o.key === event.keyCode) {
                                instance.commandEvent = true;
                                instance
                                    .callbacks()
                                    [o.value.toLowerCase()](event, element);
                            }
                        });
                    },
                },
                {
                    key: "input",
                    value: function input(instance, event) {
                        instance.inputEvent = true;
                        instance.keyup.call(this, instance, event);
                    },
                },
                {
                    key: "click",
                    value: function click(instance, event) {
                        var tribute = instance.tribute;

                        if (
                            tribute.menu &&
                            tribute.menu.contains(event.target)
                        ) {
                            var li = event.target;
                            event.preventDefault();
                            event.stopPropagation();

                            while (li.nodeName.toLowerCase() !== "li") {
                                li = li.parentNode;

                                if (!li || li === tribute.menu) {
                                    throw new Error(
                                        "cannot find the <li> container for the click"
                                    );
                                }
                            }

                            tribute.selectItemAtIndex(
                                li.getAttribute("data-index"),
                                event
                            );
                            tribute.hideMenu(); // TODO: should fire with externalTrigger and target is outside of menu
                        } else if (
                            tribute.current.element &&
                            !tribute.current.externalTrigger
                        ) {
                            tribute.current.externalTrigger = false;
                            setTimeout(function () {
                                return tribute.hideMenu();
                            });
                        }
                    },
                },
                {
                    key: "keyup",
                    value: function keyup(instance, event) {
                        if (instance.inputEvent) {
                            instance.inputEvent = false;
                        }

                        instance.updateSelection(this);
                        if (event.keyCode === 27) return;

                        if (
                            !instance.tribute.allowSpaces &&
                            instance.tribute.hasTrailingSpace
                        ) {
                            instance.tribute.hasTrailingSpace = false;
                            instance.commandEvent = true;
                            instance.callbacks()["space"](event, this);
                            return;
                        }

                        if (!instance.tribute.isActive) {
                            if (instance.tribute.autocompleteMode) {
                                instance
                                    .callbacks()
                                    .triggerChar(event, this, "");
                            } else {
                                var keyCode = instance.getKeyCode(
                                    instance,
                                    this,
                                    event
                                );
                                if (isNaN(keyCode) || !keyCode) return;
                                var trigger = instance.tribute
                                    .triggers()
                                    .find(function (trigger) {
                                        return (
                                            trigger.charCodeAt(0) === keyCode
                                        );
                                    });

                                if (typeof trigger !== "undefined") {
                                    instance
                                        .callbacks()
                                        .triggerChar(event, this, trigger);
                                }
                            }
                        }

                        if (
                            instance.tribute.current.mentionText.length <
                            instance.tribute.current.collection
                                .menuShowMinLength
                        ) {
                            return;
                        }

                        if (
                            ((instance.tribute.current.trigger ||
                                instance.tribute.autocompleteMode) &&
                                instance.commandEvent === false) ||
                            (instance.tribute.isActive && event.keyCode === 8)
                        ) {
                            instance.tribute.showMenuFor(this, true);
                        }
                    },
                },
                {
                    key: "shouldDeactivate",
                    value: function shouldDeactivate(event) {
                        if (!this.tribute.isActive) return false;

                        if (this.tribute.current.mentionText.length === 0) {
                            var eventKeyPressed = false;
                            TributeEvents.keys().forEach(function (o) {
                                if (event.keyCode === o.key)
                                    eventKeyPressed = true;
                            });
                            return !eventKeyPressed;
                        }

                        return false;
                    },
                },
                {
                    key: "getKeyCode",
                    value: function getKeyCode(instance, el, event) {
                        var tribute = instance.tribute;
                        var info = tribute.range.getTriggerInfo(
                            false,
                            tribute.hasTrailingSpace,
                            true,
                            tribute.allowSpaces,
                            tribute.autocompleteMode
                        );

                        if (info) {
                            return info.mentionTriggerChar.charCodeAt(0);
                        } else {
                            return false;
                        }
                    },
                },
                {
                    key: "updateSelection",
                    value: function updateSelection(el) {
                        this.tribute.current.element = el;
                        var info = this.tribute.range.getTriggerInfo(
                            false,
                            this.tribute.hasTrailingSpace,
                            true,
                            this.tribute.allowSpaces,
                            this.tribute.autocompleteMode
                        );

                        if (info) {
                            this.tribute.current.selectedPath =
                                info.mentionSelectedPath;
                            this.tribute.current.mentionText = info.mentionText;
                            this.tribute.current.selectedOffset =
                                info.mentionSelectedOffset;
                        }
                    },
                },
                {
                    key: "callbacks",
                    value: function callbacks() {
                        var _this = this;

                        return {
                            triggerChar: function triggerChar(e, el, trigger) {
                                var tribute = _this.tribute;
                                tribute.current.trigger = trigger;
                                var collectionItem = tribute.collection.find(
                                    function (item) {
                                        return item.trigger === trigger;
                                    }
                                );
                                tribute.current.collection = collectionItem;

                                if (
                                    tribute.current.mentionText.length >=
                                        tribute.current.collection
                                            .menuShowMinLength &&
                                    tribute.inputEvent
                                ) {
                                    tribute.showMenuFor(el, true);
                                }
                            },
                            enter: function enter(e, el) {
                                // choose selection
                                if (
                                    _this.tribute.isActive &&
                                    _this.tribute.current.filteredItems
                                ) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setTimeout(function () {
                                        _this.tribute.selectItemAtIndex(
                                            _this.tribute.menuSelected,
                                            e
                                        );

                                        _this.tribute.hideMenu();
                                    }, 0);
                                }
                            },
                            escape: function escape(e, el) {
                                if (_this.tribute.isActive) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    _this.tribute.isActive = false;

                                    _this.tribute.hideMenu();
                                }
                            },
                            tab: function tab(e, el) {
                                // choose first match
                                _this.callbacks().enter(e, el);
                            },
                            space: function space(e, el) {
                                if (_this.tribute.isActive) {
                                    if (_this.tribute.spaceSelectsMatch) {
                                        _this.callbacks().enter(e, el);
                                    } else if (!_this.tribute.allowSpaces) {
                                        e.stopPropagation();
                                        setTimeout(function () {
                                            _this.tribute.hideMenu();

                                            _this.tribute.isActive = false;
                                        }, 0);
                                    }
                                }
                            },
                            up: function up(e, el) {
                                // navigate up ul
                                if (
                                    _this.tribute.isActive &&
                                    _this.tribute.current.filteredItems
                                ) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    var count =
                                            _this.tribute.current.filteredItems
                                                .length,
                                        selected = _this.tribute.menuSelected;

                                    if (count > selected && selected > 0) {
                                        _this.tribute.menuSelected--;

                                        _this.setActiveLi();
                                    } else if (selected === 0) {
                                        _this.tribute.menuSelected = count - 1;

                                        _this.setActiveLi();

                                        _this.tribute.menu.scrollTop =
                                            _this.tribute.menu.scrollHeight;
                                    }
                                }
                            },
                            down: function down(e, el) {
                                // navigate down ul
                                if (
                                    _this.tribute.isActive &&
                                    _this.tribute.current.filteredItems
                                ) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    var count =
                                            _this.tribute.current.filteredItems
                                                .length - 1,
                                        selected = _this.tribute.menuSelected;

                                    if (count > selected) {
                                        _this.tribute.menuSelected++;

                                        _this.setActiveLi();
                                    } else if (count === selected) {
                                        _this.tribute.menuSelected = 0;

                                        _this.setActiveLi();

                                        _this.tribute.menu.scrollTop = 0;
                                    }
                                }
                            },
                            delete: function _delete(e, el) {
                                if (
                                    _this.tribute.isActive &&
                                    _this.tribute.current.mentionText.length < 1
                                ) {
                                    _this.tribute.hideMenu();
                                } else if (_this.tribute.isActive) {
                                    _this.tribute.showMenuFor(el);
                                }
                            },
                        };
                    },
                },
                {
                    key: "setActiveLi",
                    value: function setActiveLi(index) {
                        var lis = this.tribute.menu.querySelectorAll("li"),
                            length = lis.length >>> 0;
                        if (index) this.tribute.menuSelected = parseInt(index);

                        for (var i = 0; i < length; i++) {
                            var li = lis[i];

                            if (i === this.tribute.menuSelected) {
                                li.classList.add(
                                    this.tribute.current.collection.selectClass
                                );
                                var liClientRect = li.getBoundingClientRect();
                                var menuClientRect =
                                    this.tribute.menu.getBoundingClientRect();

                                if (
                                    liClientRect.bottom > menuClientRect.bottom
                                ) {
                                    var scrollDistance =
                                        liClientRect.bottom -
                                        menuClientRect.bottom;
                                    this.tribute.menu.scrollTop +=
                                        scrollDistance;
                                } else if (
                                    liClientRect.top < menuClientRect.top
                                ) {
                                    var _scrollDistance =
                                        menuClientRect.top - liClientRect.top;

                                    this.tribute.menu.scrollTop -=
                                        _scrollDistance;
                                }
                            } else {
                                li.classList.remove(
                                    this.tribute.current.collection.selectClass
                                );
                            }
                        }
                    },
                },
                {
                    key: "getFullHeight",
                    value: function getFullHeight(elem, includeMargin) {
                        var height = elem.getBoundingClientRect().height;

                        if (includeMargin) {
                            var style =
                                elem.currentStyle ||
                                window.getComputedStyle(elem);
                            return (
                                height +
                                parseFloat(style.marginTop) +
                                parseFloat(style.marginBottom)
                            );
                        }

                        return height;
                    },
                },
            ],
            [
                {
                    key: "keys",
                    value: function keys() {
                        return [
                            {
                                key: 9,
                                value: "TAB",
                            },
                            {
                                key: 8,
                                value: "DELETE",
                            },
                            {
                                key: 13,
                                value: "ENTER",
                            },
                            {
                                key: 27,
                                value: "ESCAPE",
                            },
                            {
                                key: 32,
                                value: "SPACE",
                            },
                            {
                                key: 38,
                                value: "UP",
                            },
                            {
                                key: 40,
                                value: "DOWN",
                            },
                        ];
                    },
                },
            ]
        );

        return TributeEvents;
    })();

    var TributeMenuEvents = /*#__PURE__*/ (function () {
        function TributeMenuEvents(tribute) {
            _classCallCheck(this, TributeMenuEvents);

            this.tribute = tribute;
            this.tribute.menuEvents = this;
            this.menu = this.tribute.menu;
        }

        _createClass(TributeMenuEvents, [
            {
                key: "bind",
                value: function bind(menu) {
                    var _this = this;

                    this.menuClickEvent = this.tribute.events.click.bind(
                        null,
                        this
                    );
                    this.menuContainerScrollEvent = this.debounce(
                        function () {
                            if (_this.tribute.isActive) {
                                _this.tribute.hideMenu();
                            }
                        },
                        10,
                        false
                    );
                    this.windowResizeEvent = this.debounce(
                        function () {
                            if (_this.tribute.isActive) {
                                _this.tribute.hideMenu();
                            }
                        },
                        10,
                        false
                    ); // fixes IE11 issues with mousedown

                    this.tribute.range
                        .getDocument()
                        .addEventListener(
                            "MSPointerDown",
                            this.menuClickEvent,
                            false
                        );
                    this.tribute.range
                        .getDocument()
                        .addEventListener(
                            "mousedown",
                            this.menuClickEvent,
                            false
                        );
                    window.addEventListener("resize", this.windowResizeEvent);

                    if (this.menuContainer) {
                        this.menuContainer.addEventListener(
                            "scroll",
                            this.menuContainerScrollEvent,
                            false
                        );
                    } else {
                        window.addEventListener(
                            "scroll",
                            this.menuContainerScrollEvent
                        );
                    }
                },
            },
            {
                key: "unbind",
                value: function unbind(menu) {
                    this.tribute.range
                        .getDocument()
                        .removeEventListener(
                            "mousedown",
                            this.menuClickEvent,
                            false
                        );
                    this.tribute.range
                        .getDocument()
                        .removeEventListener(
                            "MSPointerDown",
                            this.menuClickEvent,
                            false
                        );
                    window.removeEventListener(
                        "resize",
                        this.windowResizeEvent
                    );

                    if (this.menuContainer) {
                        this.menuContainer.removeEventListener(
                            "scroll",
                            this.menuContainerScrollEvent,
                            false
                        );
                    } else {
                        window.removeEventListener(
                            "scroll",
                            this.menuContainerScrollEvent
                        );
                    }
                },
            },
            {
                key: "debounce",
                value: function debounce(func, wait, immediate) {
                    var _arguments = arguments,
                        _this2 = this;

                    var timeout;
                    return function () {
                        var context = _this2,
                            args = _arguments;

                        var later = function later() {
                            timeout = null;
                            if (!immediate) func.apply(context, args);
                        };

                        var callNow = immediate && !timeout;
                        clearTimeout(timeout);
                        timeout = setTimeout(later, wait);
                        if (callNow) func.apply(context, args);
                    };
                },
            },
        ]);

        return TributeMenuEvents;
    })();

    var TributeRange = /*#__PURE__*/ (function () {
        function TributeRange(tribute) {
            _classCallCheck(this, TributeRange);

            this.tribute = tribute;
            this.tribute.range = this;
        }

        _createClass(TributeRange, [
            {
                key: "getDocument",
                value: function getDocument() {
                    var iframe;

                    if (this.tribute.current.collection) {
                        iframe = this.tribute.current.collection.iframe;
                    }

                    if (!iframe) {
                        return document;
                    }

                    return iframe.contentWindow.document;
                },
            },
            {
                key: "positionMenuAtCaret",
                value: function positionMenuAtCaret(scrollTo) {
                    var context = this.tribute.current,
                        coordinates;
                    var info = this.getTriggerInfo(
                        false,
                        this.tribute.hasTrailingSpace,
                        true,
                        this.tribute.allowSpaces,
                        this.tribute.autocompleteMode
                    );

                    if (typeof info !== "undefined") {
                        if (!this.tribute.positionMenu) {
                            this.tribute.menu.style.cssText = "display: block;";
                            return;
                        }

                        if (!this.isContentEditable(context.element)) {
                            coordinates =
                                this.getTextAreaOrInputUnderlinePosition(
                                    this.tribute.current.element,
                                    info.mentionPosition
                                );
                        } else {
                            coordinates = this.getContentEditableCaretPosition(
                                info.mentionPosition
                            );
                        }

                        this.tribute.menu.style.cssText = "top: "
                            .concat(
                                coordinates.top,
                                "px;\n                                     left: "
                            )
                            .concat(
                                coordinates.left,
                                "px;\n                                     right: "
                            )
                            .concat(
                                coordinates.right,
                                "px;\n                                     bottom: "
                            )
                            .concat(
                                coordinates.bottom,
                                "px;\n                                     max-height: "
                            )
                            .concat(
                                coordinates.maxHeight || 500,
                                "px;\n                                     max-width: "
                            )
                            .concat(
                                coordinates.maxWidth || 300,
                                "px;\n                                     position: "
                            )
                            .concat(
                                coordinates.position || "absolute",
                                ";\n                                     display: block;"
                            );

                        if (coordinates.left === "auto") {
                            this.tribute.menu.style.left = "auto";
                        }

                        if (coordinates.top === "auto") {
                            this.tribute.menu.style.top = "auto";
                        }

                        if (scrollTo) this.scrollIntoView();
                    } else {
                        this.tribute.menu.style.cssText = "display: none";
                    }
                },
            },
            {
                key: "selectElement",
                value: function selectElement(targetElement, path, offset) {
                    var range;
                    var elem = targetElement;

                    if (path) {
                        for (var i = 0; i < path.length; i++) {
                            elem = elem.childNodes[path[i]];

                            if (elem === undefined) {
                                return;
                            }

                            while (elem.length < offset) {
                                offset -= elem.length;
                                elem = elem.nextSibling;
                            }

                            if (elem.childNodes.length === 0 && !elem.length) {
                                elem = elem.previousSibling;
                            }
                        }
                    }

                    var sel = this.getWindowSelection();
                    range = this.getDocument().createRange();
                    range.setStart(elem, offset);
                    range.setEnd(elem, offset);
                    range.collapse(true);

                    try {
                        sel.removeAllRanges();
                    } catch (error) {}

                    sel.addRange(range);
                    targetElement.focus();
                },
            },
            {
                key: "replaceTriggerText",
                value: function replaceTriggerText(
                    text,
                    requireLeadingSpace,
                    hasTrailingSpace,
                    originalEvent,
                    item
                ) {
                    var info = this.getTriggerInfo(
                        true,
                        hasTrailingSpace,
                        requireLeadingSpace,
                        this.tribute.allowSpaces,
                        this.tribute.autocompleteMode
                    );

                    if (info !== undefined) {
                        var context = this.tribute.current;
                        var replaceEvent = new CustomEvent("tribute-replaced", {
                            detail: {
                                item: item,
                                instance: context,
                                context: info,
                                event: originalEvent,
                            },
                        });

                        if (!this.isContentEditable(context.element)) {
                            var myField = this.tribute.current.element;
                            var textSuffix =
                                typeof this.tribute.replaceTextSuffix ==
                                "string"
                                    ? this.tribute.replaceTextSuffix
                                    : " ";
                            text += textSuffix;
                            var startPos = info.mentionPosition;
                            var endPos =
                                info.mentionPosition +
                                info.mentionText.length +
                                textSuffix.length;

                            if (!this.tribute.autocompleteMode) {
                                endPos += info.mentionTriggerChar.length - 1;
                            }

                            myField.value =
                                myField.value.substring(0, startPos) +
                                text +
                                myField.value.substring(
                                    endPos,
                                    myField.value.length
                                );
                            myField.selectionStart = startPos + text.length;
                            myField.selectionEnd = startPos + text.length;
                        } else {
                            // add a space to the end of the pasted text
                            var _textSuffix =
                                typeof this.tribute.replaceTextSuffix ==
                                "string"
                                    ? this.tribute.replaceTextSuffix
                                    : "\xA0";

                            text += _textSuffix;

                            var _endPos =
                                info.mentionPosition + info.mentionText.length;

                            if (!this.tribute.autocompleteMode) {
                                _endPos += info.mentionTriggerChar.length;
                            }

                            this.pasteHtml(text, info.mentionPosition, _endPos);
                        }

                        context.element.dispatchEvent(
                            new CustomEvent("input", {
                                bubbles: true,
                            })
                        );
                        context.element.dispatchEvent(replaceEvent);
                    }
                },
            },
            {
                key: "pasteHtml",
                value: function pasteHtml(html, startPos, endPos) {
                    var range, sel;
                    sel = this.getWindowSelection();
                    range = this.getDocument().createRange();
                    range.setStart(sel.anchorNode, startPos);
                    range.setEnd(sel.anchorNode, endPos);
                    range.deleteContents();
                    var el = this.getDocument().createElement("div");
                    el.innerHTML = html;
                    var frag = this.getDocument().createDocumentFragment(),
                        node,
                        lastNode;

                    while ((node = el.firstChild)) {
                        lastNode = frag.appendChild(node);
                    }

                    range.insertNode(frag); // Preserve the selection

                    if (lastNode) {
                        range = range.cloneRange();
                        range.setStartAfter(lastNode);
                        range.collapse(true);
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }
                },
            },
            {
                key: "getWindowSelection",
                value: function getWindowSelection() {
                    if (this.tribute.collection.iframe) {
                        return this.tribute.collection.iframe.contentWindow.getSelection();
                    }

                    // Nếu dùng TinyMCE, lấy selection từ editor
                    if (typeof tinymce !== "undefined" && tinymce.activeEditor) {
                        let editor = tinymce.activeEditor;
                        let selection = editor.selection.getSel(); // Lấy selection từ TinyMCE
                        
                        return selection;
                    }
                    return document.getSelection();
                }
            },
            {
                key: "getEditorOffset",
                value: function getEditorOffset() {
                    // Nếu dùng TinyMCE, lấy vị trí của iframe
                    if (typeof tinymce !== "undefined" && tinymce.activeEditor) {
                        let editorIframe = tinymce.activeEditor.iframeElement;
                        if (!editorIframe) return { top: 0, left: 0 };
                        
                        let rect = editorIframe.getBoundingClientRect();
                        return { top: rect.top + window.scrollY, left: rect.left + window.scrollX };
                    }
            
                    // Nếu không dùng TinyMCE, lấy vị trí của thẻ contenteditable
                    let editorElement = document.querySelector("[contenteditable='true']");
                    if (!editorElement) return { top: 0, left: 0 };
            
                    let rect = editorElement.getBoundingClientRect();
                    return { top: rect.top + window.scrollY, left: rect.left + window.scrollX };
                }
            },
            {
                key: "getNodePositionInParent",
                value: function getNodePositionInParent(element) {
                    if (element.parentNode === null) {
                        return 0;
                    }

                    for (
                        var i = 0;
                        i < element.parentNode.childNodes.length;
                        i++
                    ) {
                        var node = element.parentNode.childNodes[i];

                        if (node === element) {
                            return i;
                        }
                    }
                },
            },
            {
                key: "getContentEditableSelectedPath",
                value: function getContentEditableSelectedPath(ctx) {
                    var sel = this.getWindowSelection();
                    var selected = sel.anchorNode;
                    var path = [];
                    var offset;

                    if (selected != null) {
                        var i;
                        var ce = selected.contentEditable;

                        while (selected !== null && ce !== "true") {
                            i = this.getNodePositionInParent(selected);
                            path.push(i);
                            selected = selected.parentNode;

                            if (selected !== null) {
                                ce = selected.contentEditable;
                            }
                        }

                        path.reverse(); // getRangeAt may not exist, need alternative

                        offset = sel.getRangeAt(0).startOffset;
                        return {
                            selected: selected,
                            path: path,
                            offset: offset,
                        };
                    }
                },
            },
            {
                key: "getTextPrecedingCurrentSelection",
                value: function getTextPrecedingCurrentSelection() {
                    var context = this.tribute.current,
                        text = "";

                    // 🏗 Nếu là input hoặc textarea thông thường
                    if (!this.isContentEditable(context.element)) {
                        var textComponent = this.tribute.current.element;
                        if (textComponent) {
                            var startPos = textComponent.selectionStart;
                            if (textComponent.value && startPos >= 0) {
                                text = textComponent.value.substring(0, startPos);
                            }
                        }
                    } else {
                        let selection;
                        let node;
                        let offset;

                        // 🏗 Nếu đang dùng TinyMCE, lấy selection từ TinyMCE
                        if (typeof tinymce !== "undefined" && tinymce.activeEditor) {
                            selection = tinymce.activeEditor.selection.getRng();
                            node = selection.startContainer;
                            offset = selection.startOffset;
                        } else {
                            // 🏗 Nếu không dùng TinyMCE, lấy selection từ document
                            selection = this.getWindowSelection();
                            node = selection.anchorNode;
                            offset = selection.getRangeAt(0).startOffset;
                        }

                        if (node && node.textContent) {
                            text = node.textContent.substring(0, offset);
                        }
                    }

                    return text;
                }
                
            },
            {
                key: "getLastWordInText",
                value: function getLastWordInText(text) {
                    text = text.replace(/\u00A0/g, " "); // https://stackoverflow.com/questions/29850407/how-do-i-replace-unicode-character-u00a0-with-a-space-in-javascript

                    var wordsArray;

                    if (this.tribute.autocompleteSeparator) {
                        wordsArray = text.split(
                            this.tribute.autocompleteSeparator
                        );
                    } else {
                        wordsArray = text.split(/\s+/);
                    }

                    var worldsCount = wordsArray.length - 1;
                    return wordsArray[worldsCount].trim();
                },
            },
            {
                key: "getTriggerInfo",
                value: function getTriggerInfo(
                    menuAlreadyActive,
                    hasTrailingSpace,
                    requireLeadingSpace,
                    allowSpaces,
                    isAutocomplete
                ) {
                    var _this = this;
                    var ctx = this.tribute.current;
                    var selected, path, offset;

                    if (!this.isContentEditable(ctx.element)) {
                        selected = this.tribute.current.element;
                    } else {
                        var selectionInfo =
                            this.getContentEditableSelectedPath(ctx);

                        if (selectionInfo) {
                            selected = selectionInfo.selected;
                            path = selectionInfo.path;
                            offset = selectionInfo.offset;
                        }
                    }

                    var effectiveRange =
                        this.getTextPrecedingCurrentSelection();
                    var lastWordOfEffectiveRange =
                        this.getLastWordInText(effectiveRange);

                    if (isAutocomplete) {
                        return {
                            mentionPosition:
                                effectiveRange.length -
                                lastWordOfEffectiveRange.length,
                            mentionText: lastWordOfEffectiveRange,
                            mentionSelectedElement: selected,
                            mentionSelectedPath: path,
                            mentionSelectedOffset: offset,
                        };
                    }

                    if (
                        effectiveRange !== undefined &&
                        effectiveRange !== null
                    ) {
                        var mostRecentTriggerCharPos = -1;
                        var triggerChar;
                        this.tribute.collection.forEach(function (config) {
                            var c = config.trigger;
                            var idx = config.requireLeadingSpace
                                ? _this.lastIndexWithLeadingSpace(
                                      effectiveRange,
                                      c
                                  )
                                : effectiveRange.lastIndexOf(c);

                            if (idx > mostRecentTriggerCharPos) {
                                mostRecentTriggerCharPos = idx;
                                triggerChar = c;
                                requireLeadingSpace =
                                    config.requireLeadingSpace;
                            }
                        });

                        if (
                            mostRecentTriggerCharPos >= 0 &&
                            (mostRecentTriggerCharPos === 0 ||
                                !requireLeadingSpace ||
                                /[\xA0\s]/g.test(
                                    effectiveRange.substring(
                                        mostRecentTriggerCharPos - 1,
                                        mostRecentTriggerCharPos
                                    )
                                ))
                        ) {
                            var currentTriggerSnippet =
                                effectiveRange.substring(
                                    mostRecentTriggerCharPos +
                                        triggerChar.length,
                                    effectiveRange.length
                                );
                            triggerChar = effectiveRange.substring(
                                mostRecentTriggerCharPos,
                                mostRecentTriggerCharPos + triggerChar.length
                            );
                            var firstSnippetChar =
                                currentTriggerSnippet.substring(0, 1);
                            var leadingSpace =
                                currentTriggerSnippet.length > 0 &&
                                (firstSnippetChar === " " ||
                                    firstSnippetChar === "\xA0");

                            if (hasTrailingSpace) {
                                currentTriggerSnippet =
                                    currentTriggerSnippet.trim();
                            }

                            var regex = allowSpaces ? /[^\S ]/g : /[\xA0\s]/g;
                            this.tribute.hasTrailingSpace = regex.test(
                                currentTriggerSnippet
                            );

                            if (
                                !leadingSpace &&
                                (menuAlreadyActive ||
                                    !regex.test(currentTriggerSnippet))
                            ) {
                                return {
                                    mentionPosition: mostRecentTriggerCharPos,
                                    mentionText: currentTriggerSnippet,
                                    mentionSelectedElement: selected,
                                    mentionSelectedPath: path,
                                    mentionSelectedOffset: offset,
                                    mentionTriggerChar: triggerChar,
                                };
                            }
                        }
                    }
                },
            },
            {
                key: "lastIndexWithLeadingSpace",
                value: function lastIndexWithLeadingSpace(str, trigger) {
                    var reversedStr = str.split("").reverse().join("");
                    var index = -1;

                    for (var cidx = 0, len = str.length; cidx < len; cidx++) {
                        var firstChar = cidx === str.length - 1;
                        var leadingSpace = /\s/.test(reversedStr[cidx + 1]);
                        var match = true;

                        for (
                            var triggerIdx = trigger.length - 1;
                            triggerIdx >= 0;
                            triggerIdx--
                        ) {
                            if (
                                trigger[triggerIdx] !==
                                reversedStr[cidx - triggerIdx]
                            ) {
                                match = false;
                                break;
                            }
                        }

                        if (match && (firstChar || leadingSpace)) {
                            index = str.length - 1 - cidx;
                            break;
                        }
                    }

                    return index;
                },
            },
            {
                key: "isContentEditable",
                value: function isContentEditable(element) {
                    return (
                        element.nodeName !== "INPUT" &&
                        element.nodeName !== "TEXTAREA"
                    );
                },
            },
            {
                key: "isMenuOffScreen",
                value: function isMenuOffScreen(coordinates, menuDimensions) {
                    var windowWidth = window.innerWidth;
                    var windowHeight = window.innerHeight;
                    var doc = document.documentElement;
                    var windowLeft =
                        (window.pageXOffset || doc.scrollLeft) -
                        (doc.clientLeft || 0);
                    var windowTop =
                        (window.pageYOffset || doc.scrollTop) -
                        (doc.clientTop || 0);
                    var menuTop =
                        typeof coordinates.top === "number"
                            ? coordinates.top
                            : windowTop +
                              windowHeight -
                              coordinates.bottom -
                              menuDimensions.height;
                    var menuRight =
                        typeof coordinates.right === "number"
                            ? coordinates.right
                            : coordinates.left + menuDimensions.width;
                    var menuBottom =
                        typeof coordinates.bottom === "number"
                            ? coordinates.bottom
                            : coordinates.top + menuDimensions.height;
                    var menuLeft =
                        typeof coordinates.left === "number"
                            ? coordinates.left
                            : windowLeft +
                              windowWidth -
                              coordinates.right -
                              menuDimensions.width;
                    return {
                        top: menuTop < Math.floor(windowTop),
                        right: menuRight > Math.ceil(windowLeft + windowWidth),
                        bottom:
                            menuBottom > Math.ceil(windowTop + windowHeight),
                        left: menuLeft < Math.floor(windowLeft),
                    };
                },
            },
            {
                key: "getMenuDimensions",
                value: function getMenuDimensions() {
                    // Width of the menu depends of its contents and position
                    // We must check what its width would be without any obstruction
                    // This way, we can achieve good positioning for flipping the menu
                    var dimensions = {
                        width: null,
                        height: null,
                    };
                    this.tribute.menu.style.cssText =
                        "top: 0px;\n                                 left: 0px;\n                                 position: fixed;\n                                 display: block;\n                                 visibility; hidden;\n                                 max-height:500px;";
                    dimensions.width = this.tribute.menu.offsetWidth;
                    dimensions.height = this.tribute.menu.offsetHeight;
                    this.tribute.menu.style.cssText = "display: none;";
                    return dimensions;
                },
            },
            {
                key: "getTextAreaOrInputUnderlinePosition",
                value: function getTextAreaOrInputUnderlinePosition(
                    element,
                    position,
                    flipped
                ) {
                    var properties = [
                        "direction",
                        "boxSizing",
                        "width",
                        "height",
                        "overflowX",
                        "overflowY",
                        "borderTopWidth",
                        "borderRightWidth",
                        "borderBottomWidth",
                        "borderLeftWidth",
                        "borderStyle",
                        "paddingTop",
                        "paddingRight",
                        "paddingBottom",
                        "paddingLeft",
                        "fontStyle",
                        "fontVariant",
                        "fontWeight",
                        "fontStretch",
                        "fontSize",
                        "fontSizeAdjust",
                        "lineHeight",
                        "fontFamily",
                        "textAlign",
                        "textTransform",
                        "textIndent",
                        "textDecoration",
                        "letterSpacing",
                        "wordSpacing",
                    ];
                    var div = this.getDocument().createElement("div");
                    div.id = "input-textarea-caret-position-mirror-div";
                    this.getDocument().body.appendChild(div);
                    var style = div.style;
                    var computed = window.getComputedStyle
                        ? getComputedStyle(element)
                        : element.currentStyle;
                    style.whiteSpace = "pre-wrap";

                    if (element.nodeName !== "INPUT") {
                        style.wordWrap = "break-word";
                    }

                    style.position = "absolute";
                    style.visibility = "hidden"; // transfer the element's properties to the div

                    properties.forEach(function (prop) {
                        style[prop] = computed[prop];
                    }); //NOT SURE WHY THIS IS HERE AND IT DOESNT SEEM HELPFUL
                    // if (isFirefox) {
                    //     style.width = `${(parseInt(computed.width) - 2)}px`
                    //     if (element.scrollHeight > parseInt(computed.height))
                    //         style.overflowY = 'scroll'
                    // } else {
                    //     style.overflow = 'hidden'
                    // }

                    var span0 = document.createElement("span");
                    span0.textContent = element.value.substring(0, position);
                    div.appendChild(span0);

                    if (element.nodeName === "INPUT") {
                        div.textContent = div.textContent.replace(/\s/g, " ");
                    } //Create a span in the div that represents where the cursor
                    //should be

                    var span = this.getDocument().createElement("span"); //we give it no content as this represents the cursor

                    span.textContent = "&#x200B;";
                    div.appendChild(span);
                    var span2 = this.getDocument().createElement("span");
                    span2.textContent = element.value.substring(position);
                    div.appendChild(span2);
                    var rect = element.getBoundingClientRect(); //position the div exactly over the element
                    //so we can get the bounding client rect for the span and
                    //it should represent exactly where the cursor is

                    div.style.position = "fixed";
                    div.style.left = rect.left + "px";
                    div.style.top = rect.top + "px";
                    div.style.width = rect.width + "px";
                    div.style.height = rect.height + "px";
                    div.scrollTop = element.scrollTop;
                    var spanRect = span.getBoundingClientRect();
                    this.getDocument().body.removeChild(div);
                    return this.getFixedCoordinatesRelativeToRect(spanRect);
                },
            },
            {
                key: "getContentEditableCaretPosition",
                value: function getContentEditableCaretPosition(selectedNodePosition) {
                    var range;
                    var sel = this.getWindowSelection();
            
                    if (!sel || !sel.anchorNode) {
                        console.warn("Không tìm thấy selection hợp lệ");
                        return { top: 0, left: 0 };
                    }
            
                    range = this.getDocument().createRange();
                    range.setStart(sel.anchorNode, selectedNodePosition);
                    range.setEnd(sel.anchorNode, selectedNodePosition);
                    range.collapse(false);
            
                    var rect = range.getBoundingClientRect();
                    if (typeof tinymce !== "undefined" && tinymce.activeEditor) {
                        var editorOffset = this.getEditorOffset(); // Lấy vị trí editor nếu có
                        var lineHeight = parseInt(window.getComputedStyle(sel.anchorNode.parentElement).lineHeight, 10) || 20; // Lấy line-height hoặc mặc định 20px

                        var spaceBelow = window.innerHeight - (rect.top + editorOffset.top + lineHeight);
                        var spaceAbove = rect.top + editorOffset.top;

                        var dropdown = document.querySelector(".tribute-container");
                        dropdown.style.visibility = "hidden";
                        dropdown.style.display = "block";
                        var dropdownHeight = dropdown.offsetHeight;
                        dropdown.style.visibility = "";
                        dropdown.style.display = "";

                        var position = {
                            top: rect.top + editorOffset.top + lineHeight, // Mặc định hiển thị dưới con trỏ
                            left: rect.left + editorOffset.left
                        };

                        // 🔄 Điều chỉnh top/bottom dựa trên khoảng trống
                        if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
                            position.top = rect.top + editorOffset.top - dropdownHeight - 5; // Hiển thị lên trên
                        }

                        return position;
                    }
                    return this.getFixedCoordinatesRelativeToRect(rect);
                },
            },         
            
            {
                key: "getWindowSelection",
                value: function getWindowSelection() {
                    // Nếu có iframe (ví dụ TributeJS hoặc TinyMCE)
                    if (this.tribute && this.tribute.collection.iframe) {
                        return this.tribute.collection.iframe.contentWindow.getSelection();
                    }
            
                    // Nếu đang dùng TinyMCE, lấy selection từ editor
                    if (typeof tinymce !== "undefined" && tinymce.activeEditor) {
                        let editor = tinymce.activeEditor;
                        return editor.selection.getSel(); // Lấy selection từ TinyMCE
                    }
            
                    // Nếu không có TinyMCE, dùng document.getSelection()
                    return document.getSelection();
                }
            },
            
            {
                key: "getEditorOffset",
                value: function getEditorOffset() {
                    // Nếu dùng TinyMCE, lấy vị trí của iframe
                    if (typeof tinymce !== "undefined" && tinymce.activeEditor) {
                        let editorIframe = tinymce.activeEditor.iframeElement;
                        if (!editorIframe) return { top: 0, left: 0 };
                        
                        let rect = editorIframe.getBoundingClientRect();
                        return { top: rect.top + window.scrollY, left: rect.left + window.scrollX };
                    }
            
                    // Nếu không dùng TinyMCE, lấy vị trí của thẻ contenteditable
                    let editorElement = document.querySelector("[contenteditable='true']");
                    if (!editorElement) return { top: 0, left: 0 };
            
                    let rect = editorElement.getBoundingClientRect();
                    return { top: rect.top + window.scrollY, left: rect.left + window.scrollX };
                }
            },
            
            {
                key: "getFixedCoordinatesRelativeToRect",
                value: function getFixedCoordinatesRelativeToRect(rect) {
                    var coordinates = {
                        position: "fixed",
                        left: rect.left,
                        top: rect.top + rect.height,
                    };
                    var menuDimensions = this.getMenuDimensions();
                    var availableSpaceOnTop = rect.top;
                    var availableSpaceOnBottom =
                        window.innerHeight - (rect.top + rect.height); //check to see where's the right place to put the menu vertically

                    if (availableSpaceOnBottom < menuDimensions.height) {
                        if (
                            availableSpaceOnTop >= menuDimensions.height ||
                            availableSpaceOnTop > availableSpaceOnBottom
                        ) {
                            coordinates.top = "auto";
                            coordinates.bottom = window.innerHeight - rect.top;

                            if (
                                availableSpaceOnBottom < menuDimensions.height
                            ) {
                                coordinates.maxHeight = availableSpaceOnTop;
                            }
                        } else {
                            if (availableSpaceOnTop < menuDimensions.height) {
                                coordinates.maxHeight = availableSpaceOnBottom;
                            }
                        }
                    }

                    var availableSpaceOnLeft = rect.left;
                    var availableSpaceOnRight = window.innerWidth - rect.left; //check to see where's the right place to put the menu horizontally

                    if (availableSpaceOnRight < menuDimensions.width) {
                        if (
                            availableSpaceOnLeft >= menuDimensions.width ||
                            availableSpaceOnLeft > availableSpaceOnRight
                        ) {
                            coordinates.left = "auto";
                            coordinates.right = window.innerWidth - rect.left;

                            if (availableSpaceOnRight < menuDimensions.width) {
                                coordinates.maxWidth = availableSpaceOnLeft;
                            }
                        } else {
                            if (availableSpaceOnLeft < menuDimensions.width) {
                                coordinates.maxWidth = availableSpaceOnRight;
                            }
                        }
                    }

                    return coordinates;
                },
            },
            {
                key: "scrollIntoView",
                value: function scrollIntoView(elem) {
                    var reasonableBuffer = 20,
                        clientRect;
                    var maxScrollDisplacement = 100;
                    var e = this.menu;
                    if (typeof e === "undefined") return;

                    while (
                        clientRect === undefined ||
                        clientRect.height === 0
                    ) {
                        clientRect = e.getBoundingClientRect();

                        if (clientRect.height === 0) {
                            e = e.childNodes[0];

                            if (e === undefined || !e.getBoundingClientRect) {
                                return;
                            }
                        }
                    }

                    var elemTop = clientRect.top;
                    var elemBottom = elemTop + clientRect.height;

                    if (elemTop < 0) {
                        window.scrollTo(
                            0,
                            window.pageYOffset +
                                clientRect.top -
                                reasonableBuffer
                        );
                    } else if (elemBottom > window.innerHeight) {
                        var maxY =
                            window.pageYOffset +
                            clientRect.top -
                            reasonableBuffer;

                        if (maxY - window.pageYOffset > maxScrollDisplacement) {
                            maxY = window.pageYOffset + maxScrollDisplacement;
                        }

                        var targetY =
                            window.pageYOffset -
                            (window.innerHeight - elemBottom);

                        if (targetY > maxY) {
                            targetY = maxY;
                        }

                        window.scrollTo(0, targetY);
                    }
                },
            },
            {
                key: "menuContainerIsBody",
                get: function get() {
                    return (
                        this.tribute.menuContainer === document.body ||
                        !this.tribute.menuContainer
                    );
                },
            },
        ]);

        return TributeRange;
    })();

    // Thanks to https://github.com/mattyork/fuzzy
    var TributeSearch = /*#__PURE__*/ (function () {
        function TributeSearch(tribute) {
            _classCallCheck(this, TributeSearch);

            this.tribute = tribute;
            this.tribute.search = this;
        }

        _createClass(TributeSearch, [
            {
                key: "simpleFilter",
                value: function simpleFilter(pattern, array) {
                    var _this = this;

                    return array.filter(function (string) {
                        return _this.test(pattern, string);
                    });
                },
            },
            {
                key: "test",
                value: function test(pattern, string) {
                    return this.match(pattern, string) !== null;
                },
            },
            {
                key: "match",
                value: function match(pattern, string, opts) {
                    opts = opts || {};
                    var len = string.length,
                        pre = opts.pre || "",
                        post = opts.post || "",
                        compareString =
                            (opts.caseSensitive && string) ||
                            string.toLowerCase();

                    if (opts.skip) {
                        return {
                            rendered: string,
                            score: 0,
                        };
                    }

                    pattern =
                        (opts.caseSensitive && pattern) ||
                        pattern.toLowerCase();
                    var patternCache = this.traverse(
                        compareString,
                        pattern,
                        0,
                        0,
                        []
                    );

                    if (!patternCache) {
                        return null;
                    }

                    return {
                        rendered: this.render(
                            string,
                            patternCache.cache,
                            pre,
                            post
                        ),
                        score: patternCache.score,
                    };
                },
            },
            {
                key: "traverse",
                value: function traverse(
                    string,
                    pattern,
                    stringIndex,
                    patternIndex,
                    patternCache
                ) {
                    if (this.tribute.autocompleteSeparator) {
                        // if the pattern search at end
                        pattern = pattern
                            .split(this.tribute.autocompleteSeparator)
                            .splice(-1)[0];
                    }

                    if (pattern.length === patternIndex) {
                        // calculate score and copy the cache containing the indices where it's found
                        return {
                            score: this.calculateScore(patternCache),
                            cache: patternCache.slice(),
                        };
                    } // if string at end or remaining pattern > remaining string

                    if (
                        string.length === stringIndex ||
                        pattern.length - patternIndex >
                            string.length - stringIndex
                    ) {
                        return undefined;
                    }

                    var c = pattern[patternIndex];
                    var index = string.indexOf(c, stringIndex);
                    var best, temp;

                    while (index > -1) {
                        patternCache.push(index);
                        temp = this.traverse(
                            string,
                            pattern,
                            index + 1,
                            patternIndex + 1,
                            patternCache
                        );
                        patternCache.pop(); // if downstream traversal failed, return best answer so far

                        if (!temp) {
                            return best;
                        }

                        if (!best || best.score < temp.score) {
                            best = temp;
                        }

                        index = string.indexOf(c, index + 1);
                    }

                    return best;
                },
            },
            {
                key: "calculateScore",
                value: function calculateScore(patternCache) {
                    var score = 0;
                    var temp = 1;
                    patternCache.forEach(function (index, i) {
                        if (i > 0) {
                            if (patternCache[i - 1] + 1 === index) {
                                temp += temp + 1;
                            } else {
                                temp = 1;
                            }
                        }

                        score += temp;
                    });
                    return score;
                },
            },
            {
                key: "render",
                value: function render(string, indices, pre, post) {
                    var rendered = string.substring(0, indices[0]);
                    indices.forEach(function (index, i) {
                        rendered +=
                            pre +
                            string[index] +
                            post +
                            string.substring(
                                index + 1,
                                indices[i + 1] ? indices[i + 1] : string.length
                            );
                    });
                    return rendered;
                },
            },
            {
                key: "filter",
                value: function filter(pattern, arr, opts) {
                    var _this2 = this;
                    opts = opts || {};
                    let arrs = arr.reduce(function (prev, element, idx, arr) {
                        var str = element;

                        if (opts.extract) {
                            str = opts.extract(element);

                            if (!str) {
                                // take care of undefineds / nulls / etc.
                                str = "";
                            }
                        }
                        pattern = pattern.replace("_", " ");
                        var rendered = _this2.match(pattern, str, opts);
                        if (rendered != null) {
                            prev[prev.length] = {
                                string: rendered.rendered,
                                score: rendered.score,
                                index: idx,
                                original: element,
                            };
                        }

                        return prev;
                    }, []);
                    // .sort(function (a, b) {
                    //     var compare = b.score - a.score;
                    //     if (compare) return compare;
                    //     return a.index - b.index;
                    // });
                    return arrs;
                },
            },
        ]);

        return TributeSearch;
    })();

    var Tribute = /*#__PURE__*/ (function () {
        function Tribute(_ref) {
            var _this = this;

            var _ref$values = _ref.values,
                values = _ref$values === void 0 ? null : _ref$values,
                _ref$loadingItemTempl = _ref.loadingItemTemplate,
                loadingItemTemplate =
                    _ref$loadingItemTempl === void 0
                        ? null
                        : _ref$loadingItemTempl,
                _ref$iframe = _ref.iframe,
                iframe = _ref$iframe === void 0 ? null : _ref$iframe,
                _ref$selectClass = _ref.selectClass,
                selectClass =
                    _ref$selectClass === void 0
                        ? "highlight"
                        : _ref$selectClass,
                _ref$containerClass = _ref.containerClass,
                containerClass =
                    _ref$containerClass === void 0
                        ? "tribute-container"
                        : _ref$containerClass,
                _ref$itemClass = _ref.itemClass,
                itemClass = _ref$itemClass === void 0 ? "" : _ref$itemClass,
                _ref$trigger = _ref.trigger,
                trigger = _ref$trigger === void 0 ? "@" : _ref$trigger,
                _ref$autocompleteMode = _ref.autocompleteMode,
                autocompleteMode =
                    _ref$autocompleteMode === void 0
                        ? false
                        : _ref$autocompleteMode,
                _ref$autocompleteSepa = _ref.autocompleteSeparator,
                autocompleteSeparator =
                    _ref$autocompleteSepa === void 0
                        ? null
                        : _ref$autocompleteSepa,
                _ref$selectTemplate = _ref.selectTemplate,
                selectTemplate =
                    _ref$selectTemplate === void 0 ? null : _ref$selectTemplate,
                _ref$menuItemTemplate = _ref.menuItemTemplate,
                menuItemTemplate =
                    _ref$menuItemTemplate === void 0
                        ? null
                        : _ref$menuItemTemplate,
                _ref$lookup = _ref.lookup,
                lookup = _ref$lookup === void 0 ? "key" : _ref$lookup,
                _ref$fillAttr = _ref.fillAttr,
                fillAttr = _ref$fillAttr === void 0 ? "value" : _ref$fillAttr,
                _ref$collection = _ref.collection,
                collection =
                    _ref$collection === void 0 ? null : _ref$collection,
                _ref$menuContainer = _ref.menuContainer,
                menuContainer =
                    _ref$menuContainer === void 0 ? null : _ref$menuContainer,
                _ref$noMatchTemplate = _ref.noMatchTemplate,
                noMatchTemplate =
                    _ref$noMatchTemplate === void 0
                        ? null
                        : _ref$noMatchTemplate,
                _ref$requireLeadingSp = _ref.requireLeadingSpace,
                requireLeadingSpace =
                    _ref$requireLeadingSp === void 0
                        ? true
                        : _ref$requireLeadingSp,
                _ref$allowSpaces = _ref.allowSpaces,
                allowSpaces =
                    _ref$allowSpaces === void 0 ? false : _ref$allowSpaces,
                _ref$replaceTextSuffi = _ref.replaceTextSuffix,
                replaceTextSuffix =
                    _ref$replaceTextSuffi === void 0
                        ? null
                        : _ref$replaceTextSuffi,
                _ref$positionMenu = _ref.positionMenu,
                positionMenu =
                    _ref$positionMenu === void 0 ? true : _ref$positionMenu,
                _ref$spaceSelectsMatc = _ref.spaceSelectsMatch,
                spaceSelectsMatch =
                    _ref$spaceSelectsMatc === void 0
                        ? false
                        : _ref$spaceSelectsMatc,
                _ref$searchOpts = _ref.searchOpts,
                searchOpts = _ref$searchOpts === void 0 ? {} : _ref$searchOpts,
                _ref$menuItemLimit = _ref.menuItemLimit,
                menuItemLimit =
                    _ref$menuItemLimit === void 0 ? null : _ref$menuItemLimit,
                _ref$menuShowMinLengt = _ref.menuShowMinLength,
                menuShowMinLength =
                    _ref$menuShowMinLengt === void 0
                        ? 2
                        : _ref$menuShowMinLengt;

            _classCallCheck(this, Tribute);

            this.autocompleteMode = autocompleteMode;
            this.autocompleteSeparator = autocompleteSeparator;
            this.menuSelected = 0;
            this.current = {};
            this.inputEvent = false;
            this.isActive = false;
            this.menuContainer = menuContainer;
            this.allowSpaces = allowSpaces;
            this.replaceTextSuffix = replaceTextSuffix;
            this.positionMenu = positionMenu;
            this.hasTrailingSpace = false;
            this.spaceSelectsMatch = spaceSelectsMatch;

            if (this.autocompleteMode) {
                trigger = "";
                allowSpaces = false;
            }

            if (values) {
                this.collection = [
                    {
                        // symbol that starts the lookup
                        trigger: trigger,
                        // is it wrapped in an iframe
                        iframe: iframe,
                        // class applied to selected item
                        selectClass: selectClass,
                        // class applied to the Container
                        containerClass: containerClass,
                        // class applied to each item
                        itemClass: itemClass,
                        // function called on select that retuns the content to insert
                        selectTemplate: (
                            selectTemplate || Tribute.defaultSelectTemplate
                        ).bind(this),
                        // function called that returns content for an item
                        menuItemTemplate: (
                            menuItemTemplate || Tribute.defaultMenuItemTemplate
                        ).bind(this),
                        // function called when menu is empty, disables hiding of menu.
                        noMatchTemplate: (function (t) {
                            if (typeof t === "string") {
                                if (t.trim() === "") return null;
                                return t;
                            }

                            if (typeof t === "function") {
                                return t.bind(_this);
                            }

                            return (
                                noMatchTemplate ||
                                function () {
                                    return "<li>No Match Found!</li>";
                                }.bind(_this)
                            );
                        })(noMatchTemplate),
                        // column to search against in the object
                        lookup: lookup,
                        // column that contains the content to insert by default
                        fillAttr: fillAttr,
                        // array of objects or a function returning an array of objects
                        values: values,
                        // useful for when values is an async function
                        loadingItemTemplate: loadingItemTemplate,
                        requireLeadingSpace: requireLeadingSpace,
                        searchOpts: searchOpts,
                        menuItemLimit: menuItemLimit,
                        menuShowMinLength: menuShowMinLength,
                    },
                ];
            } else if (collection) {
                if (this.autocompleteMode)
                    console.warn(
                        "Tribute in autocomplete mode does not work for collections"
                    );
                this.collection = collection.map(function (item) {
                    return {
                        trigger: item.trigger || trigger,
                        iframe: item.iframe || iframe,
                        selectClass: item.selectClass || selectClass,
                        containerClass: item.containerClass || containerClass,
                        itemClass: item.itemClass || itemClass,
                        selectTemplate: (
                            item.selectTemplate || Tribute.defaultSelectTemplate
                        ).bind(_this),
                        menuItemTemplate: (
                            item.menuItemTemplate ||
                            Tribute.defaultMenuItemTemplate
                        ).bind(_this),
                        // function called when menu is empty, disables hiding of menu.
                        noMatchTemplate: (function (t) {
                            if (typeof t === "string") {
                                if (t.trim() === "") return null;
                                return t;
                            }

                            if (typeof t === "function") {
                                return t.bind(_this);
                            }

                            return (
                                noMatchTemplate ||
                                function () {
                                    return "<li>No Match Found!</li>";
                                }.bind(_this)
                            );
                        })(noMatchTemplate),
                        lookup: item.lookup || lookup,
                        fillAttr: item.fillAttr || fillAttr,
                        values: item.values,
                        loadingItemTemplate: item.loadingItemTemplate,
                        requireLeadingSpace: item.requireLeadingSpace,
                        searchOpts: item.searchOpts || searchOpts,
                        menuItemLimit: item.menuItemLimit || menuItemLimit,
                        menuShowMinLength:
                            item.menuShowMinLength || menuShowMinLength,
                    };
                });
            } else {
                throw new Error("[Tribute] No collection specified.");
            }

            new TributeRange(this);
            new TributeEvents(this);
            new TributeMenuEvents(this);
            new TributeSearch(this);
        }

        _createClass(
            Tribute,
            [
                {
                    key: "triggers",
                    value: function triggers() {
                        return this.collection.map(function (config) {
                            return config.trigger;
                        });
                    },
                },
                {
                    key: "attach",
                    value: function attach(el) {
                        if (!el) {
                            throw new Error(
                                "[Tribute] Must pass in a DOM node or NodeList."
                            );
                        } // Check if it is a jQuery collection

                        if (
                            typeof jQuery !== "undefined" &&
                            el instanceof jQuery
                        ) {
                            el = el.get();
                        } // Is el an Array/Array-like object?

                        if (
                            el.constructor === NodeList ||
                            el.constructor === HTMLCollection ||
                            el.constructor === Array
                        ) {
                            var length = el.length;

                            for (var i = 0; i < length; ++i) {
                                this._attach(el[i]);
                            }
                        } else {
                            this._attach(el);
                        }
                    },
                },
                {
                    key: "_attach",
                    value: function _attach(el) {
                        if (el.hasAttribute("data-tribute")) {
                            console.warn(
                                "Tribute was already bound to " + el.nodeName
                            );
                        }

                        this.ensureEditable(el);
                        this.events.bind(el);
                        el.setAttribute("data-tribute", true);
                    },
                },
                {
                    key: "ensureEditable",
                    value: function ensureEditable(element) {
                        if (
                            Tribute.inputTypes().indexOf(element.nodeName) ===
                            -1
                        ) {
                            if (element.contentEditable) {
                                element.contentEditable = true;
                            } else {
                                throw new Error(
                                    "[Tribute] Cannot bind to " +
                                        element.nodeName
                                );
                            }
                        }
                    },
                },
                {
                    key: "createMenu",
                    value: function createMenu(containerClass) {
                        var wrapper = this.range
                                .getDocument()
                                .createElement("div"),
                            ul = this.range.getDocument().createElement("ul");
                        wrapper.className = containerClass;
                        wrapper.appendChild(ul);

                        if (this.menuContainer) {
                            return this.menuContainer.appendChild(wrapper);
                        }

                        return this.range
                            .getDocument()
                            .body.appendChild(wrapper);
                    },
                },
                {
                    key: "showMenuFor",
                    value: function showMenuFor(element, scrollTo) {
                        var _this2 = this;

                        // Only proceed if menu isn't already shown for the current element & mentionText
                        if (
                            this.isActive &&
                            this.current.element === element &&
                            this.current.mentionText ===
                                this.currentMentionTextSnapshot
                        ) {
                            return;
                        }

                        this.currentMentionTextSnapshot =
                            this.current.mentionText; // create the menu if it doesn't exist.

                        if (!this.menu) {
                            this.menu = this.createMenu(
                                this.current.collection.containerClass
                            );
                            element.tributeMenu = this.menu;
                            this.menuEvents.bind(this.menu);
                        }

                        this.isActive = true;
                        this.menuSelected = 0;

                        if (!this.current.mentionText) {
                            this.current.mentionText = "";
                        }

                        var processValues = function processValues(values) {
                            // Tribute may not be active any more by the time the value callback returns
                            if (!_this2.isActive) {
                                return;
                            }
                            var items = _this2.search.filter(
                                _this2.current.mentionText,
                                values,
                                {
                                    pre:
                                        _this2.current.collection.searchOpts
                                            .pre || "<span>",
                                    post:
                                        _this2.current.collection.searchOpts
                                            .post || "</span>",
                                    skip: _this2.current.collection.searchOpts
                                        .skip,
                                    extract: function extract(el) {
                                        if (
                                            typeof _this2.current.collection
                                                .lookup === "string"
                                        ) {
                                            return el[
                                                _this2.current.collection.lookup
                                            ];
                                        } else if (
                                            typeof _this2.current.collection
                                                .lookup === "function"
                                        ) {
                                            return _this2.current.collection.lookup(
                                                el,
                                                _this2.current.mentionText
                                            );
                                        } else {
                                            throw new Error(
                                                "Invalid lookup attribute, lookup must be string or function."
                                            );
                                        }
                                    },
                                }
                            );

                            if (_this2.current.collection.menuItemLimit) {
                                items = items.slice(
                                    0,
                                    _this2.current.collection.menuItemLimit
                                );
                            }

                            _this2.current.filteredItems = items;

                            var ul = _this2.menu.querySelector("ul");

                            if (!items.length) {
                                var noMatchEvent = new CustomEvent(
                                    "tribute-no-match",
                                    {
                                        detail: _this2.menu,
                                    }
                                );

                                _this2.current.element.dispatchEvent(
                                    noMatchEvent
                                );

                                if (
                                    (typeof _this2.current.collection
                                        .noMatchTemplate === "function" &&
                                        !_this2.current.collection.noMatchTemplate()) ||
                                    !_this2.current.collection.noMatchTemplate
                                ) {
                                    _this2.hideMenu();
                                } else {
                                    typeof _this2.current.collection
                                        .noMatchTemplate === "function"
                                        ? (ul.innerHTML =
                                              _this2.current.collection.noMatchTemplate())
                                        : (ul.innerHTML =
                                              _this2.current.collection.noMatchTemplate);

                                    _this2.range.positionMenuAtCaret(scrollTo);
                                }

                                return;
                            }

                            ul.innerHTML = "";

                            var fragment = _this2.range
                                .getDocument()
                                .createDocumentFragment();

                            items.forEach(function (item, index) {
                                var li = _this2.range
                                    .getDocument()
                                    .createElement("li");

                                li.setAttribute("data-index", index);
                                li.className =
                                    _this2.current.collection.itemClass;
                                li.addEventListener("mousemove", function (e) {
                                    var _this2$_findLiTarget =
                                            _this2._findLiTarget(e.target),
                                        _this2$_findLiTarget2 = _slicedToArray(
                                            _this2$_findLiTarget,
                                            2
                                        ),
                                        li = _this2$_findLiTarget2[0],
                                        index = _this2$_findLiTarget2[1];

                                    if (e.movementY !== 0) {
                                        _this2.events.setActiveLi(index);
                                    }
                                });

                                if (_this2.menuSelected === index) {
                                    li.classList.add(
                                        _this2.current.collection.selectClass
                                    );
                                }

                                li.innerHTML =
                                    _this2.current.collection.menuItemTemplate(
                                        item
                                    );
                                fragment.appendChild(li);
                            });
                            ul.appendChild(fragment);

                            _this2.range.positionMenuAtCaret(scrollTo);
                        };

                        if (
                            typeof this.current.collection.values === "function"
                        ) {
                            if (this.current.collection.loadingItemTemplate) {
                                this.menu.querySelector("ul").innerHTML =
                                    this.current.collection.loadingItemTemplate;
                                this.range.positionMenuAtCaret(scrollTo);
                            }

                            this.current.collection.values(
                                this.current.mentionText,
                                processValues
                            );
                        } else {
                            processValues(this.current.collection.values);
                        }
                    },
                },
                {
                    key: "_findLiTarget",
                    value: function _findLiTarget(el) {
                        if (!el) return [];
                        var index = el.getAttribute("data-index");
                        return !index
                            ? this._findLiTarget(el.parentNode)
                            : [el, index];
                    },
                },
                {
                    key: "showMenuForCollection",
                    value: function showMenuForCollection(
                        element,
                        collectionIndex
                    ) {
                        if (element !== document.activeElement) {
                            this.placeCaretAtEnd(element);
                        }

                        this.current.collection =
                            this.collection[collectionIndex || 0];
                        this.current.externalTrigger = true;
                        this.current.element = element;
                        if (element.isContentEditable)
                            this.insertTextAtCursor(
                                this.current.collection.trigger
                            );
                        else
                            this.insertAtCaret(
                                element,
                                this.current.collection.trigger
                            );
  
                        this.showMenuFor(element, true);
                    }, // TODO: make sure this works for inputs/textareas
                },
                {
                    key: "placeCaretAtEnd",
                    value: function placeCaretAtEnd(el) {
                        el.focus();

                        if (
                            typeof window.getSelection != "undefined" &&
                            typeof document.createRange != "undefined"
                        ) {
                            var range = document.createRange();
                            range.selectNodeContents(el);
                            range.collapse(false);
                            var sel = window.getSelection();
                            sel.removeAllRanges();
                            sel.addRange(range);
                        } else if (
                            typeof document.body.createTextRange != "undefined"
                        ) {
                            var textRange = document.body.createTextRange();
                            textRange.moveToElementText(el);
                            textRange.collapse(false);
                            textRange.select();
                        }
                    }, // for contenteditable
                },
                {
                    key: "insertTextAtCursor",
                    value: function insertTextAtCursor(text) {
                        let editor = (typeof tinymce !== "undefined" && tinymce.activeEditor) ? tinymce.activeEditor : null;

                        if (editor && editor.hasFocus()) {
                            // 🏗 Nếu dùng TinyMCE, chèn vào trình soạn thảo
                            let selection = editor.selection;
                            let range = selection.getRng();

                            if (!range) {
                                console.error("Lỗi: Không có vùng chọn hợp lệ trong TinyMCE.");
                                return;
                            }

                            let textBeforeCursor = range.startContainer.textContent.substring(0, range.startOffset);
                            if (textBeforeCursor.includes("@")) {
                                return;
                            }

                            let textNode = document.createTextNode(text);
                            range.deleteContents();
                            range.insertNode(textNode);

                            // Di chuyển con trỏ sau văn bản đã chèn
                            range.setStartAfter(textNode);
                            range.setEndAfter(textNode);
                            selection.setRng(range);
                        } else {
                            // 🏗 Nếu không dùng TinyMCE, chèn vào document bình thường
                            var sel = window.getSelection();
                            if (!sel.rangeCount) {
                                console.warn("Không có vùng chọn hợp lệ trong document.");
                                return;
                            }

                            var range = sel.getRangeAt(0);
                            range.deleteContents();
                            var textNode = document.createTextNode(text);
                            range.insertNode(textNode);

                            // Di chuyển con trỏ sau văn bản đã chèn
                            range.setStartAfter(textNode);
                            range.setEndAfter(textNode);
                            sel.removeAllRanges();
                            sel.addRange(range);
                        }
                    }
                    // for regular inputs
                },
                {
                    key: "insertAtCaret",
                    value: function insertAtCaret(textarea, text) {
                        var scrollPos = textarea.scrollTop;
                        var caretPos = textarea.selectionStart;
                        var front = textarea.value.substring(0, caretPos);
                        var back = textarea.value.substring(
                            textarea.selectionEnd,
                            textarea.value.length
                        );
                        textarea.value = front + text + back;
                        caretPos = caretPos + text.length;
                        textarea.selectionStart = caretPos;
                        textarea.selectionEnd = caretPos;
                        textarea.focus();
                        textarea.scrollTop = scrollPos;
                    },
                },
                {
                    key: "hideMenu",
                    value: function hideMenu() {
                        if (this.menu) {
                            this.menu.style.cssText = "display: none;";
                            this.isActive = false;
                            this.menuSelected = 0;
                            this.current = {};
                        }
                    },
                },
                {
                    key: "selectItemAtIndex",
                    value: function selectItemAtIndex(index, originalEvent) {
                        index = parseInt(index);
                        if (typeof index !== "number" || isNaN(index)) return;
                        var item = this.current.filteredItems[index];
                        var content =
                            this.current.collection.selectTemplate(item);
                        if (content !== null)
                            this.replaceText(content, originalEvent, item);
                    },
                },
                {
                    key: "replaceText",
                    value: function replaceText(content, originalEvent, item) {
                        this.range.replaceTriggerText(
                            content,
                            true,
                            true,
                            originalEvent,
                            item
                        );
                    },
                },
                {
                    key: "_append",
                    value: function _append(collection, newValues, replace) {
                        if (typeof collection.values === "function") {
                            throw new Error(
                                "Unable to append to values, as it is a function."
                            );
                        } else if (!replace) {
                            collection.values =
                                collection.values.concat(newValues);
                        } else {
                            collection.values = newValues;
                        }
                    },
                },
                {
                    key: "append",
                    value: function append(
                        collectionIndex,
                        newValues,
                        replace
                    ) {
                        var index = parseInt(collectionIndex);
                        if (typeof index !== "number")
                            throw new Error(
                                "please provide an index for the collection to update."
                            );
                        var collection = this.collection[index];

                        this._append(collection, newValues, replace);
                    },
                },
                {
                    key: "appendCurrent",
                    value: function appendCurrent(newValues, replace) {
                        if (this.isActive) {
                            this._append(
                                this.current.collection,
                                newValues,
                                replace
                            );
                        } else {
                            throw new Error(
                                "No active state. Please use append instead and pass an index."
                            );
                        }
                    },
                },
                {
                    key: "detach",
                    value: function detach(el) {
                        if (!el) {
                            throw new Error(
                                "[Tribute] Must pass in a DOM node or NodeList."
                            );
                        } // Check if it is a jQuery collection

                        if (
                            typeof jQuery !== "undefined" &&
                            el instanceof jQuery
                        ) {
                            el = el.get();
                        } // Is el an Array/Array-like object?

                        if (
                            el.constructor === NodeList ||
                            el.constructor === HTMLCollection ||
                            el.constructor === Array
                        ) {
                            var length = el.length;

                            for (var i = 0; i < length; ++i) {
                                this._detach(el[i]);
                            }
                        } else {
                            this._detach(el);
                        }
                    },
                },
                {
                    key: "_detach",
                    value: function _detach(el) {
                        var _this3 = this;

                        this.events.unbind(el);

                        if (el.tributeMenu) {
                            this.menuEvents.unbind(el.tributeMenu);
                        }

                        setTimeout(function () {
                            el.removeAttribute("data-tribute");
                            _this3.isActive = false;

                            if (el.tributeMenu) {
                                el.tributeMenu.remove();
                            }
                        });
                    },
                },
                {
                    key: "isActive",
                    get: function get() {
                        return this._isActive;
                    },
                    set: function set(val) {
                        if (this._isActive != val) {
                            this._isActive = val;

                            if (this.current.element) {
                                var noMatchEvent = new CustomEvent(
                                    "tribute-active-".concat(val)
                                );
                                this.current.element.dispatchEvent(
                                    noMatchEvent
                                );
                            }
                        }
                    },
                },
            ],
            [
                {
                    key: "defaultSelectTemplate",
                    value: function defaultSelectTemplate(item) {
                        if (typeof item === "undefined")
                            return ""
                                .concat(this.current.collection.trigger)
                                .concat(this.current.mentionText);

                        if (
                            this.range.isContentEditable(this.current.element)
                        ) {
                            return (
                                '<span class="tribute-mention">' +
                                (this.current.collection.trigger +
                                    item.original[
                                        this.current.collection.fillAttr
                                    ]) +
                                "</span>"
                            );
                        }

                        return (
                            this.current.collection.trigger +
                            item.original[this.current.collection.fillAttr]
                        );
                    },
                },
                {
                    key: "defaultMenuItemTemplate",
                    value: function defaultMenuItemTemplate(matchItem) {
                        return matchItem.string;
                    },
                },
                {
                    key: "inputTypes",
                    value: function inputTypes() {
                        return ["TEXTAREA", "INPUT"];
                    },
                },
            ]
        );

        return Tribute;
    })();

    /**
     * Tribute.js
     * Native ES6 JavaScript @mention Plugin
     **/

    return Tribute;
});

// code
(function ($) {
    var tribute = new Tribute({
        trigger: "@",
        allowSpaces: true, // Cho phép nhập dấu cách sau @
        requireLeadingSpace: false,
        fillAttr: "fullname", // Chèn fullname vào nội dung
    
        // ✅ Xử lý lấy danh sách từ API, tự động nhận biết TinyMCE hay không
        values: function (text, cb) {
            let keyword;
            let editor = (typeof tinymce !== "undefined" && tinymce.activeEditor) ? tinymce.activeEditor : null;
    
            if (editor && editor.hasFocus()) {
                // 🏗 Nếu dùng TinyMCE, lấy từ khóa từ vùng chọn của TinyMCE
                let selection = editor.selection.getRng();
                let node = selection.startContainer;
                let offset = selection.startOffset;
    
                if (!node || !node.textContent) {
                    console.warn("Không có nội dung hợp lệ để lấy từ khóa.");
                    return;
                }
    
                let textBeforeCursor = node.textContent.substring(0, offset);
                let lastAtIndex = textBeforeCursor.lastIndexOf("@");
    
                if (lastAtIndex === -1) {
                    console.warn("Không tìm thấy `@`, không gửi request API.");
                    return;
                }
    
                keyword = textBeforeCursor.substring(lastAtIndex + 1).trim();
            } else {
                // 🏗 Nếu không dùng TinyMCE, lấy từ khóa từ input bình thường
                keyword = text.trim();
            }
    
            if (!keyword) return;
    
            // ✅ Gọi API lấy danh sách gợi ý
            if (typeof cookie_name === "undefined" || cookie_name === null) {
                return false;
            }
    
            $.ajax({
                headers: {
                    Authorization: "Bearer " + getCookie(cookie_name),
                    "Content-Type": "application/json",
                },
                url: _url_search.replace("{keyword}", keyword),
                method: "GET",
                dataType: "json",
                success: function (data) {
                    cb(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error("Lỗi khi gọi API:", textStatus, errorThrown);
                },
            });
        },
    
        // ✅ Cách tìm kiếm và hiển thị danh sách gợi ý
        lookup: function (item) {
            return item.fullname + " " + item._id;
        },
    
        menuItemTemplate: function (item) {
            return `${item.original.fullname} (${item.original._id})`;
        },
    
        // ✅ Chọn user & chèn vào nội dung, hoạt động cả TinyMCE & input thường
        selectTemplate: function (item) {
            if (typeof item === "undefined") return null;
            let htmlmen = `<span data-original-id="${item.original._id}" title="${item.original.email}" style="color:#0090bb">${item.original.fullname}</span>`;
    
            if (typeof cookie_name !== "undefined" && cookie_name && cookie_name == "imap_authen_access_token") {
                htmlmen = `<span data-original-id="${item.original._id}">
                                <a href="https://erp.ebomb.edu.vn/hr/employee/profile/${item.original._id}" class="load_not_ajax user-name" data-user-id="${item.original._id}" target="_blank">
                                    ${item.original.fullname}
                                </a>
                            </span>`;
            }
            return htmlmen;
        },
    });
    
    Tribute.prototype.allowInputEvent = true;

    document.addEventListener("click", function (event) {
        let editor = tinymce?.activeEditor;
        
        // 🛑 Chỉ chạy nếu có editor đang hoạt động
        if (!editor) return;

        let tributeMenu = document.querySelector(".tribute-container");
        if (tributeMenu) {
            tribute.hideMenu();
        }
    });
    if (typeof tinymce !== "undefined") {
        tinymce.on("addEditor", function (event) {
            let editor = event.editor;
        
            editor.on("click", function () {
                let tributeMenu = document.querySelector(".tribute-container");
                if (tributeMenu) {
                    tribute.hideMenu();
                }
            });
        });
    }
    let _url_list = "";
    const upload_image = (_dom_reload, _form, file) => {
        console.log(_dom_reload, _form, file);
        
        if (!file) return;
        let formData = new FormData();
        formData.append("files", file);
        // Gửi AJAX upload file lên server
        $.ajax({
            url: window.SERVICE_UPLOAD_URL, // Đổi URL API của bạn
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            headers: {
                "Authorization": "Bearer " + getCookie("imap_authen_access_token"),
                "channel": 'erp',
                "type": "image",
            },
            success: function (res) {
                if (res.path) {
                    let imageUrl = window.SERVICE_MEDIA_URL + res.path;

                    // Tìm đúng upload-image-flame trong form hiện tại
                    _dom_reload.find(".upload-image-flame").append(`
                        <div class="uploaded-image-container" style="position: relative; display: inline-block;">
                            <img src="${imageUrl}" data-file="${res.path}" alt="Uploaded Image" style="max-width: 100px; border-radius: 8px; margin-top: 10px;">
                            <button type="button" class="remove-uploaded-image btn btn-light btn-icon btn-outline-dark border-transparent rounded-pill btn-sm" 
                            style="position: absolute; top: -1px; right: -10px;width: 24px; height: 24px; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                               <i class="icon-cross2"></i>
                            </button>
                        </div>
                    `);
                    let hiddenInput = _dom_reload.find("input[name='attachment']");
                    if (hiddenInput.length === 0) {
                        hiddenInput = $('<input type="hidden" name="attachment">');
                        _dom_reload.append(hiddenInput);
                    }

                    let currentImages = hiddenInput.val() ? hiddenInput.val().split(",") : [];
                    currentImages.push(res.path);
                    hiddenInput.val(currentImages.join(",")); // Lưu danh sách URL ảnh vào input
                }
            },
            error: function (xhr) {
                console.error("Upload failed: " + xhr.responseText);
            }
        });
    };
    $(document).ready( function () {
        if ($(document).find("#comment_employee_html").length > 0) {
            _url_list = $("#comment_employee_html").attr("data-url");
            $.ajax({
                type: "GET",
                headers: {
                    Authorization:
                        "Bearer " + getCookie("imap_authen_access_token"),
                },
                url: _url_list,
                dataType: "JSON",
                success: function (response) {
                    $("#comment_employee_html").html(response.html);
                    $("#comment_employee_html").trigger("add_dom");
                },
            });
        }
        if ($(document).find("#comment_html").length > 0) {
            _url_list = $("#comment_html").attr("data-url");
            $.ajax({
                type: "GET",
                headers: {
                    Authorization:
                        "Bearer " + getCookie("imap_authen_user_access_token"),
                    token: $('meta[name="contact-token"]').attr("content"),
                    "Content-Type": "application/json",
                    "contact-id": $('meta[name="contact-id"]').attr("content"),
                },
                url: _url_list,
                dataType: "JSON",
                success: function (response) {
                    $("#comment_html").html(response.html);
                    $("#comment_html").trigger("add_dom");
                },
            });
        }

        $(document).on("click", "#paginate_comment", function () {
            let _page = $(this).closest("#box-load-page");
            let _box_comment = $(this)
                .closest("#box-comment")
                .find("#list_comment");
            let p = $(_page).attr("data-page");
            let l = $(_page).attr("data-limit");

            if (typeof cookie_name === 'undefined' || cookie_name === null) {
                return false;
            }
            $.ajax({
                type: "GET",
                headers: {
                    Authorization: "Bearer " + getCookie(cookie_name),
                    token: $('meta[name="contact-token"]').attr("content"),
                    "Content-Type": "application/json",
                    "contact-id": $('meta[name="contact-id"]').attr("content"),
                },
                data: {
                    page: p,
                    limit: l,
                },
                url: _url_list,
                dataType: "JSON",
                success: function (response) {
                    if (response.html) {
                        $(_box_comment).append(response.html);
                        $(_page).attr("data-page", Number(p) + 1);
                        $("#list_comment").trigger("add_dom");
                        $('#box-comment').trigger( "MainContentReloaded", [] );
                    }
                },
            });
        });

        $(document).on(
            "add_dom",
            "#comment_html,#list_comment,#comment_employee_html, .box-form-reply",
            function () {
                let _count_comment_parent = $(this).find(
                    ".box-parent-comment"
                ).length;
                let _count_comment = $(this)
                    .find("#box-comment")
                    .attr("data-count");

                if (_count_comment_parent && _count_comment) { 
                    let count = _count_comment - _count_comment_parent;
                    let html = `<div id="paginate_comment" class="btn btn-info btn-sm btn-block text-center pb-1 d-none" style="padding: .115rem .475rem !important;"> More </div>`;
                    if (count > 0) $(this).find("#box-load-page").html(html);
                    else $(this).find("#box-load-page").html('').hide();
                }

                if ($(".input_comment_data").length > 0) {
                    if (input_type == "textarea") {
                        tinymce.baseURL = "https://master-ebomb-cdn.ebomb.edu.vn/theme/backend/js/tinymce";
                        tinymce.init({
                            selector: ".input_comment_data",
                            setup: function (editor) {
                                editor.on("init", function () {
                                    let editorBody = editor.getBody();
                                    if (editorBody) {
                                        tribute.attach(editorBody);
                                        tribute.positionMenu = true;
                                        tribute.menuContainer = document.querySelector(".tox-tinymce");
                                    }
                                });
                                editor.on('paste', function(e) {
                                    const clipboardData = (e.clipboardData || window.clipboardData);
                                    if (!clipboardData) return;
                        
                                    const items = clipboardData.items;
                                    if (!items) return;
                        
                                    for (let i = 0; i < items.length; i++) {
                                        const item = items[i];
                                        if (item.type.indexOf('image') !== -1) {
                                            e.preventDefault();  // Chặn việc paste ảnh vào tinymce
                        
                                            const file = item.getAsFile();
                                            if (file) {
                                                let _parent_dom = $("#" + editor.id).closest(".comment-box"); 
                                                let _this = _parent_dom.find("button.upload-image");
                                                
                                                upload_image(_parent_dom, _this, file); // Gọi hàm upload_image để xử lý ảnh dán vào
                                            }
                                            break; // Dừng lại sau khi xử lý ảnh đầu tiên
                                        }
                                    }
                                });
                        
                                // 🛑 Ngăn Tribute menu bị ẩn khi nhập "@"
                                editor.on("keydown", function (event) {
                                    if (event.key === "@") {
                                        event.preventDefault();
                                
                                        tribute.current.element = editor.getBody();
                                        tribute.current.mentionText = "@"; // 🔥 Gán giá trị mentionText ngay khi nhấn @
                                        tribute.current.collection = tribute.current.collection ? tribute.current.collection : tribute.collection[0];
                                
                                        tribute.showMenuForCollection(editor.getBody(), 0);
                                    }
                                });
                                
                        
                                // 🔥 Hiển thị menu ngay khi có ký tự sau "@"
                                editor.on("keyup", function (event) {
                                    let selection = editor.selection.getRng();
                                    let node = selection.startContainer;
                                    let offset = selection.startOffset;
                                
                                    if (!node || !node.textContent) return;
                                
                                    let textBeforeCursor = node.textContent.substring(0, offset);
                                    let lastAtIndex = textBeforeCursor.lastIndexOf("@");
                                
                                    if (lastAtIndex !== -1) {
                                        
                                        let keyword = textBeforeCursor.substring(lastAtIndex + 1).trim(); // Chỉ lấy phần sau @
                                        tribute.current.mentionText = keyword; // 🔥 Bỏ dấu `@`
                                        
                                        tribute.current.element = editor.getBody();
                                        tribute.showMenuForCollection(editor.getBody(), 0);
                                    }
                                    let content = editor.getContent();
                                    $(editor.getElement())
                                        .closest("form")
                                        .find('input[name="content"]')
                                        .val(content);
                                });
                                editor.on('keyup change', function () {
                                    let content = editor.getContent();
                                    $(editor.getElement())
                                        .closest("form")
                                        .find('input[name="content"]')
                                        .val(content);
                                });
                                
                            },
                        });
                        
                    } else {
                        
                        $(".input_comment_data").each(function (index, item) {
                            let _id = $(item).attr("id");
                            tribute.attach(document.getElementById(_id));
    
                            $(item).on("keyup", function () {
                                $(item)
                                    .closest("form")
                                    .find('input[name="content"]')
                                    .val($(this).html());
                            });
                            $(item).on("tribute-replaced", function () {
                                $(item)
                                    .closest("form")
                                    .find('input[name="content"]')
                                    .val($(this).html());
                            });
                        });
                    }
                }
            }
        );

        $(document).on("paste", ".input_comment_data", function (e) {
            e.preventDefault(); // Ngăn chặn dán nội dung mặc định
        
            // Lấy nội dung từ clipboard và xóa các thẻ không mong muốn hoặc style
            var clipboardData = (e.originalEvent || e).clipboardData || window.clipboardData;
            var text = clipboardData.getData('text/plain'); // Chỉ lấy dữ liệu dạng văn bản thuần
        
            // Đưa nội dung đã làm sạch vào trường contenteditable
            document.execCommand("insertText", false, text);
        });

        Handle.init();
    });

    let Handle = (function () {
        const _dom_lis_comment = $("#list_comment");

        const event = () => {
            $(document)
                .off("click", ".action-reply")
                .on("click", ".action-reply", function (e) {
                    e.preventDefault();

                    
                    let _parent_dom = $(this).closest(".box-parent-comment");
                    let _form = $(_parent_dom).find(".box-form-reply");

                    if (_form.html().trim() !== "") {
                        // Nếu đã có nội dung, xóa nội dung (ẩn đi)
                        _form.html("");
                        return;
                    }
                    $(".box-form-reply").html("");
                    let parent_id = $(_form).attr("data-parent-id");
                    let relate_type = $(_form).attr("data-relate-type");
                    let type = $(_form).attr("data-type");
                    let relate_id = $(_form).attr("data-relate-id");
                    let created_by = $(_form).attr("data-reply-created_by");
                    let fullname = $(_form).attr("data-reply-by-name");
                    let email = $(_form).attr("data-reply-by-email");

                    let _form_html = create_form_add({
                        parent_id,
                        type,
                        relate_id,
                        relate_type,created_by, email, fullname
                    });
                    $(_form).html(_form_html);
                    $(_form).trigger("add_dom");
                });

            $(document).on("submit", "form.create_comment", function (e) {
                e.preventDefault();
                let _this = $(this);
                let _parent_dom = $(this)
                    .closest(".box-replys")
                    .find(".replys-list");
                call_ajax_form(_parent_dom, _this);
            });

            $(document).on("submit", "form#form_comment_parent", function (e) {
                e.preventDefault();
                let _this = $(this);
                let _parent_dom = $(this).closest("body").find("#list_comment");
                call_ajax_form(_parent_dom, _this);
            });

            $(document).on("click", "button.upload-image", function (e) {
                e.stopPropagation();
                let _this = $(this);
                let _parent_dom = $(this).closest(".comment-box");
                if (window.showOpenFilePicker) {
                    window.showOpenFilePicker({
                        types: [{ description: "Images", accept: { "image/*": [".png", ".jpg", ".jpeg", ".gif"] } }],
                        startIn: "downloads", // Đề xuất thư mục Downloads (Chrome)
                    }).then(async (handles) => {
                        if (handles.length > 0) {
                            let file = await handles[0].getFile();
                            upload_image( _parent_dom,_this, file);
                        }
                    }).catch(console.error);
                }
            });

            // edit_comment
            $(document).on("click", ".like-comment", function (e) {
                e.preventDefault();
                let _this = $(this);
                let relate_type = $(this).attr("data-relate-type");
                let type = $(this).attr("data-type");
                let relate_id = $(this).attr("data-relate-id");
                customAjax({
                    url: url_like,
                    type: "POST",
                    data: JSON.stringify({ relate_id, relate_type, type }),
                    contentType: "application/json;charset=utf-8",
                    dataType: "JSON",
                    cache: false,
                    crossDomain: true,
                    async: true,

                    success: function (response) {
                        if (response.type == "like") {
                            $(_this)
                                .closest("li")
                                .find("i")
                                .css("color", "#008bf1");
                        } else {
                            $(_this)
                                .closest("li")
                                .find("i")
                                .css("color", "rgba(0,0,0,.5)");
                        }

                        $(_this)
                            .closest("li")
                            .find("span")
                            .html(response.count || 0);
                    },
                });
            });
            $(document).on("click", ".delete-comment", function (e) {
                e.preventDefault();
                var _dom = $(this).closest(".item-comment");
                // Setup
                var _id = $(this).attr("data-id");
                var url = url_remove_comment.replace(/:id/gi, _id);

                var method = $(this).attr("method") || "POST";

                var notice = new PNotify({
                    title: "Xác nhận thông tin",
                    text: "<p>Bạn có chắc muốn xóa không</p>",
                    hide: false,
                    type: "warning",
                    confirm: {
                        confirm: true,
                        buttons: [
                            {
                                text: "Confirm",
                                addClass: "btn btn-sm btn-primary",
                            },
                            {
                                addClass: "btn btn-sm btn-link",
                            },
                        ],
                    },
                    buttons: {
                        closer: false,
                        sticker: false,
                    },
                });

                // On confirm
                notice.get().on("pnotify.confirm", function () {
                    customAjax({
                        type: method,
                        url: url,
                        //data: dataSerialize, // serializes the form's elements.
                        dataType: "json",
                        success: function (response) {
                            let _dom_reply = $(_dom)
                                .closest(".box-parent-comment")
                                .find(".count_reply");
                            if (_dom_reply) {
                                let count = $(_dom_reply).html();
                                if (!count || parseInt(count) < 1)
                                    $(_dom_reply).html("");
                                else $(_dom_reply).html(parseInt(count) - 1);
                            }
                            $(_dom).remove();
                            let number_comment = $('#number_comment');
                            if (number_comment) {
                                let count = $(number_comment).html();
                                if (!count || parseInt(count) < 1)
                                    $(number_comment).html(1);
                                else $(number_comment).html(parseInt(count) - 1);
                            }
                        },
                        error: function (e) {
                            show_notify_error(e.responseText);
                        },
                    });
                });
            });
            $(document).on("click", ".remove-uploaded-image", function (e) {
                e.preventDefault();
                
                let parent = $(this).closest(".uploaded-image-container");
                let removedImage = parent.find("img").attr("data-file");
                let _parent_dom = $(this).closest(".comment-box");
                let hiddenInput = _parent_dom.find("input[name='attachment']");
                

                // Xóa ảnh khỏi giao diện
                parent.remove();

                // Cập nhật danh sách ảnh trong input ẩn
                let updatedImages = hiddenInput.val().split(",").filter(url => url !== removedImage);
                hiddenInput.val(updatedImages.join(","));
            });
            $(document).on('click', '.img-attachment-comment', function () {
                let imgSrc = $(this).attr('src');
                
                // Xóa popup cũ nếu có
                $('#popup-image-preview').remove();
                
                // Tạo popup mới
                $('body').append(`
                    <div id="popup-image-preview" style="
                        position: fixed;
                        top: 0; left: 0;
                        width: 100%; height: 100%;
                        background: rgba(0,0,0,0.7);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 9999;
                    ">
                        <img src="${imgSrc}" style="max-width: 90%; max-height: 90%; border-radius: 8px; box-shadow: 0 0 20px #000;">
                    </div>
                `);
            });
            
            // Đóng popup khi click vào nền đen
            $(document).on('click', '#popup-image-preview', function () {
                $(this).remove();
            });
        };

        const call_ajax_form = (_dom_reload, _form) => {
            if (_form.data("submitting")) {
                return; // Ngăn chặn submit nhiều lần
            }
            _form.data("submitting", true); // Đánh dấu form đang xử lý
        
            var formArray = $(_form).serializeArray();
            var formJSON = {};
            let editor = tinymce?.activeEditor;
            if (editor) {
                let content = editor.getContent();
                let contentInput = $(_form).find('input[name="content"]');
                if (contentInput.length) {
                    contentInput.val(content);
                }
            }
            $.each(formArray, function () {
                formJSON[this.name] = this.value || "";
            });
            formJSON["data_type"] = "html";
        
            if (!formJSON["content"] || formJSON["content"].trim() === "") {
                alert("Comment không được để trống!");
                _form.data("submitting", false); // Gỡ bỏ trạng thái xử lý
                return;
            }
        
            let submitButton = $(_form).find("button[type=submit]");
            submitButton.prop("disabled", true);
        
            customAjax({
                type: "POST",
                data: JSON.stringify(formJSON),
                dataType: "HTML",
                cache: false,
                async: true,
                url: url_post_comment,
                success: function (response) {
                    $(_dom_reload).append(response);
                    $(_form).find("[name='content']").val("");
                    $(_form).find("[name='attachment']").val("");
                    
                    if (input_type == "textarea") {
                        let editorId = $(_form).find(".input_comment_data").attr("id");
                        tinymce.get(editorId).setContent(""); 
                    } else {
                        $(_form).find(".input_comment_data").html("");
                    }
                    $(_form).find(".upload-image-flame").html("");
        
                    let _dom_reply = $(_form).closest(".box-parent-comment").find(".count_reply");
                    if (_dom_reply.length) {
                        let count = parseInt(_dom_reply.html()) || 0;
                        _dom_reply.html(count + 1);
                    }
        
                    if ($(_dom_reload).is('#list_comment')) {
                        $("#list_comment").scrollTop($("#list_comment")[0].scrollHeight);
                    }
        
                    let number_comment = $('#number_comment');
                    if (number_comment.length) {
                        let count = parseInt(number_comment.html()) || 0;
                        number_comment.html(count + 1);
                    }
        
                    // Xóa trạng thái xử lý
                    _form.data("submitting", false);
                    submitButton.prop("disabled", false);
                },
                error: function () {
                    alert("Có lỗi xảy ra, vui lòng thử lại!");
                    _form.data("submitting", false);
                    submitButton.prop("disabled", false);
                }
            });
        };
        

        const create_form_add = (attr) => {
            var attachment_button = "";
            if (_attachment == true) {
                attachment_button = ` <button type="button" class="btn btn-light btn-icon border-transparent btn-outline-dark rounded-pill btn-sm mr-1 upload-image">
                            <i class="icon-file-picture"></i>
                        </button>`
            }
            var htmlmen = ` <span data-original-id="${attr.created_by}">
                            <a href="https://erp.ebomb.edu.vn/hr/employee/profile/${attr.created_by}" class="load_not_ajax user-name" data-user-id=${attr.created_by} target="_blank">
                            ${attr.fullname}
                            </a></span> `;
            const randomId = "form_comment_id_" + Math.floor(Math.random() * 1000);
            return `<form action="" class="create_comment mt-2">
              <input type="hidden" name="parent_id" value="${
                  attr.parent_id || 0
              }">
              <input type="hidden" name="relate_type" value="${
                  attr.relate_type || 0
              }">
              <input type="hidden" name="relate_id" value="${
                  attr.relate_id || 0
              }">
              <input type="hidden" name="type" value="${attr.type || 0}">
                <div class="comment-box">
                    <div class="mb-2">
                        <p class="input_comment_data" id="${randomId}" contenteditable="true"
                        placeholder="Add a comment...">${htmlmen}</p>
                    </div>
                    <input type="hidden" name="content" value='${htmlmen}'>
                    <div class="d-flex align-items-center justify-content-end">
                        ${attachment_button}
                        <button type="submit" class="btn btn-primary btn-add-comment">
                            <i class="icon-paperplane"></i>
                        </button>
                    </div>
                    <div class="upload-image-flame"></div>
                </div>
          </form>`;
        };

        return {
            init: function () {
                event(document);
            },
        };
    })();
})(jQuery);

$(document).ready(function () {
    let hoverTimer;
    let tooltipTimer;
    let isHoveringTooltip = false;

    // Gắn sự kiện hover cho user-name và AJAX khi hover vào
    $('body').on('mouseenter', '.user-name', function () {
        const userId = $(this).data('user-id');
        const element = $(this);

        // Hủy bỏ timer nếu hover vào nhanh hơn
        clearTimeout(hoverTimer);
        clearTimeout(tooltipTimer);
        if ($('.tooltip').is(':visible')) {
            $('.tooltip').tooltip('hide');
        }
        if (typeof userId === 'undefined' || userId === null) {
            return false;
        }

        // Trì hoãn việc hiển thị tooltip
        hoverTimer = setTimeout(function () {
            
            // Kiểm tra nếu là employee và lấy dữ liệu từ IndexedDB
            if (type_coment == 'employee') {
                const dommm = 'em-profile';
                
                // Lấy dữ liệu từ IndexedDB
                AutoloadDataService.getDataFromIndexedDB(dommm, userId)
                    .then((data) => {
                        if (data) {
                            // Nếu có dữ liệu từ IndexedDB, tiếp tục xử lý tooltip
                            createTooltipContent(data, element);
                        } else {
                            // Nếu không có dữ liệu từ IndexedDB, gọi AJAX
                            fetchUserDataFromAPI(userId, element);
                        }
                    })
                    .catch((error) => {
                        console.error("Lỗi khi lấy dữ liệu từ IndexedDB:", error);
                        // Nếu có lỗi khi truy vấn IndexedDB, gọi AJAX
                        fetchUserDataFromAPI(userId, element);
                    });
            } else {
                // Nếu không phải là 'employee', gọi AJAX ngay lập tức
                fetchUserDataFromAPI(userId, element);
            }

        }, 500); // Chạy sự kiện sau 1 giây
    });

    // Ẩn tooltip khi chuột rời khỏi .user-name
    $('body').on('mouseleave', '.user-name', function () {
        const element = $(this);
        tooltipTimer = setTimeout(function () {
            // Kiểm tra xem tooltip có tồn tại không và ẩn nó
            if (element.data('bs.tooltip') && !isHoveringTooltip) {
                element.tooltip('hide');
            }
        }, 200);
    });
    
    // Hàm để gọi AJAX lấy dữ liệu nếu không có dữ liệu từ IndexedDB
    function fetchUserDataFromAPI(userId, element) {
        if (typeof cookie_name === 'undefined' || cookie_name === null) {
            return false;
        }

        customAjax({
            headers: {
                Authorization: "Bearer " + getCookie(cookie_name),
                "Content-Type": "application/json",
            },
            url: _url_search_full.replace("{keyword}", userId),
            method: "GET",
            dataType: "json",
            success: function (data) {
                if (!data || data.length === 0) {
                    return false;
                }
                const firstElement = data;
                if (!data._id) {
                    return false;
                }

                // Tạo nội dung tooltip khi có dữ liệu từ AJAX
                createTooltipContent(firstElement, element);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("Error fetching users:", textStatus, errorThrown);
            },
        });
    }

    // Hàm tạo nội dung Tooltip với dữ liệu người dùng
    function createTooltipContent(data, element) {
        const imageUrl = 'https://erp-staging.ebomb.edu.vn/support/images/user-profile.png';
        let htmlV = `<div class="our-team">
            <div class="picture">
                <img class="img-fluid" src="${imageUrl}">
            </div>
            <div class="team-content">
                <h3 class="name">${data.fullname}</h3>`;
        if (data.job_title_id && data.job_title_id !== "") {
            htmlV += `<h4 class="title em-job-title" data-id=${data.job_title_id}>${data.job_title_id}</h4>`;
        }
        if (data.position_id && data.position_id !== "") {
            htmlV += `<h4 class="title em-position" data-id=${data.position_id}>${data.position_id}</h4>`;
        }
        htmlV += `</div><ul class="social"><li></li></ul></div>`;

        // Khởi tạo Tooltip với nội dung mới
        element.tooltip({
            template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner custom-tooltip"></div></div>',
            title: data._id,
            html: true, // Cho phép HTML trong tooltip
            placement: 'left',
            trigger: 'manual'
        }).tooltip('show');
        
        const tooltipInstance = element.data('bs.tooltip');
        const $tooltip = tooltipInstance.getTipElement();
        $($tooltip).find('.tooltip-inner').html(htmlV);
        $('.tooltip-inner').trigger("MainContentReloaded", []);
        $('.tooltip').on('mouseenter', function () {
            isHoveringTooltip = true;
        }).on('mouseleave', function () {
            isHoveringTooltip = false;
            element.tooltip('hide'); // Ẩn tooltip khi rời khỏi
        });

    }
    $('body').on("click", '.reply-more',function () {
        const userId = $(this).data('id');
        $('.reply-item-' + userId).removeClass('d-none');
    
        // Thêm lớp d-none đối với các phần tử có class reply-parents-userId
        $('.reply-parents-' + userId).addClass('d-none');
        
    });
});