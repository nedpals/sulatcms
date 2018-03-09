/*! Licensed under MIT, https://github.com/sofish/pen */
let Pen;
let debugMode;
let selection;
let utils = {};
const toString = Object.prototype.toString;
const slice = Array.prototype.slice;

// allow command list
const commandsReg = {
    block: /^(?:p|h[1-6]|blockquote|pre)$/,
    inline: /^(?:bold|italic|underline|insertorderedlist|insertunorderedlist|indent|outdent)$/,
    source: /^(?:createlink|unlink)$/,
    insert: /^(?:inserthorizontalrule|insertimage|insert)$/,
    wrap: /^(?:code)$/
};

const lineBreakReg = /^(?:blockquote|pre|div)$/i;

const effectNodeReg = /(?:[pubia]|h[1-6]|blockquote|[uo]l|li)/i;

const strReg = {
    whiteSpace: /(^\s+)|(\s+$)/g,
    mailTo: /^(?!mailto:|.+\/|.+#|.+\?)(.*@.*\..+)$/,
    http: /^(?!\w+?:\/\/|mailto:|\/|\.\/|\?|#)(.*)$/
};

const autoLinkReg = {
    url: /((https?|ftp):\/\/|www\.)[^\s<]{3,}/gi,
    prefix: /^(?:https?|ftp):\/\//i,
    notLink: /^(?:img|a|input|audio|video|source|code|pre|script|head|title|style)$/i,
    maxLength: 100
};

// type detect
utils.is = (obj, type) => toString.call(obj).slice(8, -1) === type;

utils.forEach = (obj, iterator, arrayLike) => {
    if (!obj) return;
    if (arrayLike == null) arrayLike = utils.is(obj, 'Array');
    if (arrayLike) {
        for (let i = 0, l = obj.length; i < l; i++) iterator(obj[i], i, obj);
    } else {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) iterator(obj[key], key, obj);
        }
    }
};

// copy props from a obj
utils.copy = (defaults, source) => {
    utils.forEach(source, (value, key) => {
        defaults[key] = utils.is(value, 'Object') ? utils.copy({}, value) :
            utils.is(value, 'Array') ? utils.copy([], value) : value;
    });
    return defaults;
};

// log
utils.log = (message, force) => {
    if (debugMode || force)
        console.log(`%cPEN DEBUGGER: %c${message}`, 'font-family:arial,sans-serif;color:#1abf89;line-height:2em;', 'font-family:cursor,monospace;color:#333;');
};

utils.delayExec = fn => {
    let timer = null;
    return delay => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn();
        }, delay || 1);
    };
};

// merge: make it easy to have a fallback
utils.merge = config => {

    // default settings
    let defaults = {
        class: 'pen',
        debug: false,
        toolbar: null, // custom toolbar
        stay: config.stay || !config.debug,
        stayMsg: 'Are you going to leave here?',
        textarea: '<textarea name="content"></textarea>',
        list: [
            'blockquote', 'h2', 'h3', 'p', 'code', 'insertorderedlist', 'insertunorderedlist', 'inserthorizontalrule',
            'indent', 'outdent', 'bold', 'italic', 'underline', 'createlink', 'insertimage'
        ],
        titles: {},
        cleanAttrs: ['id', 'class', 'style', 'name'],
        cleanTags: ['script'],
        linksInNewWindow: false
    };

    // user-friendly config
    if (config.nodeType === 1) {
        defaults.editor = config;
    } else if (config.match && config.match(/^#[\S]+$/)) {
        defaults.editor = document.getElementById(config.slice(1));
    } else {
        defaults = utils.copy(defaults, config);
    }

    return defaults;
};

// make it accessible
if (document.getSelection) {
    selection = document.getSelection();
    window.Pen = Pen;
}

function commandOverall(ctx, cmd, val) {
    const message = ` to exec 「${cmd}」 command${val ? (' with value: ' + val) : ''}`;

    try {
        document.execCommand(cmd, false, val);
    } catch (err) {
        // TODO: there's an error when insert a image to document, but not a bug
        return utils.log(`fail${message}`, true);
    }

    utils.log(`success${message}`);
}

function commandInsert(ctx, name, val) {
    const node = getNode(ctx);
    if (!node) return;
    ctx._range.selectNode(node);
    ctx._range.collapse(false);

    // hide menu when a image was inserted
    if (name === 'insertimage' && ctx._menu) toggleNode(ctx._menu, true);

    return commandOverall(ctx, name, val);
}

function commandBlock(ctx, name) {
    const list = effectNode(ctx, getNode(ctx), true);
    if (list.includes(name)) name = 'p';
    return commandOverall(ctx, 'formatblock', name);
}

function commandWrap(ctx, tag, value) {
    value = `<${tag}>${value || selection.toString()}</${tag}>`;
    return commandOverall(ctx, 'insertHTML', value);
}

function commandLink(ctx, tag, value) {
    if (ctx.config.linksInNewWindow) {
        value = `< a href="${value}" target="_blank">${selection.toString()}</a>`;
        return commandOverall(ctx, 'insertHTML', value);
    } else {
        return commandOverall(ctx, tag, value);
    }
}

function initToolbar(ctx) {
    let icons = '';
    const inputStr = '<input class="pen-input" placeholder="http://" />';

    ctx._toolbar = ctx.config.toolbar;
    if (!ctx._toolbar) {
        const toolList = ctx.config.list;
        utils.forEach(toolList, name => {
            const klass = `pen-icon icon-${name}`;
            const title = ctx.config.titles[name] || '';
            icons += `<i class="${klass}" data-action="${name}" title="${title}"></i>`;
        }, true);
        if (toolList.includes('createlink') || toolList.includes('insertimage'))
            icons += inputStr;
    } else if (ctx._toolbar.querySelectorAll('[data-action=createlink]').length ||
        ctx._toolbar.querySelectorAll('[data-action=insertimage]').length) {
        icons += inputStr;
    }

    if (icons) {
        ctx._menu = document.createElement('div');
        ctx._menu.setAttribute('class', `${ctx.config.class}-menu pen-menu`);
        ctx._menu.innerHTML = icons;
        ctx._inputBar = ctx._menu.querySelector('input');
        toggleNode(ctx._menu, true);
        document.body.appendChild(ctx._menu);
    }
    if (ctx._toolbar && ctx._inputBar) toggleNode(ctx._inputBar);
}

function initEvents(ctx) {
    const toolbar = ctx._toolbar || ctx._menu;
    const editor = ctx.config.editor;

    const toggleMenu = utils.delayExec(() => {
        ctx.highlight().menu();
    });
    let outsideClick = () => { };

    function updateStatus(delay) {
        ctx._range = ctx.getRange();
        toggleMenu(delay);
    }

    if (ctx._menu) {
        const setpos = () => {
            if (ctx._menu.style.display === 'block') ctx.menu();
        };

        // change menu offset when window resize / scroll
        addListener(ctx, window, 'resize', setpos);
        addListener(ctx, window, 'scroll', setpos);

        // toggle toolbar on mouse select
        let selecting = false;
        addListener(ctx, editor, 'mousedown', () => {
            selecting = true;
        });
        addListener(ctx, editor, 'mouseleave', () => {
            if (selecting) updateStatus(800);
            selecting = false;
        });
        addListener(ctx, editor, 'mouseup', () => {
            if (selecting) updateStatus(100);
            selecting = false;
        });
        // Hide menu when focusing outside of editor
        outsideClick = e => {
            if (ctx._menu && !containsNode(editor, e.target) && !containsNode(ctx._menu, e.target)) {
                removeListener(ctx, document, 'click', outsideClick);
                toggleMenu(100);
            }
        };
    } else {
        addListener(ctx, editor, 'click', () => {
            updateStatus(0);
        });
    }

    addListener(ctx, editor, 'keyup', e => {
        if (e.which === 8 && ctx.isEmpty()) return lineBreak(ctx, true);
        // toggle toolbar on key select
        if (e.which !== 13 || e.shiftKey) return updateStatus(400);
        const node = getNode(ctx, true);
        if (!node || !node.nextSibling || !lineBreakReg.test(node.nodeName)) return;
        if (node.nodeName !== node.nextSibling.nodeName) return;
        // hack for webkit, make 'enter' behavior like as firefox.
        if (node.lastChild.nodeName !== 'BR') node.appendChild(document.createElement('br'));
        utils.forEach(node.nextSibling.childNodes, child => {
            if (child) node.appendChild(child);
        }, true);
        node.parentNode.removeChild(node.nextSibling);
        focusNode(ctx, node.lastChild, ctx.getRange());
    });

    // check line break
    addListener(ctx, editor, 'keydown', e => {
        editor.classList.remove('pen-placeholder');
        if (e.which !== 13 || e.shiftKey) return;
        const node = getNode(ctx, true);
        if (!node || !lineBreakReg.test(node.nodeName)) return;
        const lastChild = node.lastChild;
        if (!lastChild || !lastChild.previousSibling) return;
        if (lastChild.previousSibling.textContent || lastChild.textContent) return;
        // quit block mode for 2 'enter'
        e.preventDefault();
        const p = document.createElement('p');
        p.innerHTML = '<br>';
        node.removeChild(lastChild);
        if (!node.nextSibling) node.parentNode.appendChild(p);
        else node.parentNode.insertBefore(p, node.nextSibling);
        focusNode(ctx, p, ctx.getRange());
    });

    const menuApply = (action, value) => {
        ctx.execCommand(action, value);
        ctx._range = ctx.getRange();
        ctx.highlight().menu();
    };

    // toggle toolbar on key select
    addListener(ctx, toolbar, 'click', e => {
        let node = e.target;
        let action;

        while (node !== toolbar && !(action = node.getAttribute('data-action'))) {
            node = node.parentNode;
        }

        if (!action) return;
        if (!/(?:createlink)|(?:insertimage)/.test(action)) return menuApply(action);
        if (!ctx._inputBar) return;

        // create link
        const input = ctx._inputBar;
        if (toolbar === ctx._menu) toggleNode(input);
        else {
            ctx._inputActive = true;
            ctx.menu();
        }
        if (ctx._menu.style.display === 'none') return;

        setTimeout(() => { input.focus(); }, 400);
        const createlink = () => {
            let inputValue = input.value;

            if (!inputValue) action = 'unlink';
            else {
                inputValue = input.value
                    .replace(strReg.whiteSpace, '')
                    .replace(strReg.mailTo, 'mailto:$1')
                    .replace(strReg.http, 'http://$1');
            }
            menuApply(action, inputValue);
            if (toolbar === ctx._menu) toggleNode(input, false);
            else toggleNode(ctx._menu, true);
        };

        input.onkeypress = e => {
            if (e.which === 13) return createlink();
        };
    });

    // listen for placeholder
    addListener(ctx, editor, 'focus', () => {
        if (ctx.isEmpty()) lineBreak(ctx, true);
        addListener(ctx, document, 'click', outsideClick);
    });

    addListener(ctx, editor, 'blur', () => {
        checkPlaceholder(ctx);
        ctx.checkContentChange();
    });

    // listen for paste and clear style
    addListener(ctx, editor, 'paste', () => {
        setTimeout(() => {
            ctx.cleanContent();
        });
    });
}

function addListener(ctx, target, type, listener) {
    if (ctx._events.hasOwnProperty(type)) {
        ctx._events[type].push(listener);
    } else {
        ctx._eventTargets = ctx._eventTargets || [];
        ctx._eventsCache = ctx._eventsCache || [];
        let index = ctx._eventTargets.indexOf(target);
        if (index < 0) index = ctx._eventTargets.push(target) - 1;
        ctx._eventsCache[index] = ctx._eventsCache[index] || {};
        ctx._eventsCache[index][type] = ctx._eventsCache[index][type] || [];
        ctx._eventsCache[index][type].push(listener);

        target.addEventListener(type, listener, false);
    }
    return ctx;
}

// trigger local events
function triggerListener(ctx, type) {
    if (!ctx._events.hasOwnProperty(type)) return;
    const args = slice.call(arguments, 2);
    utils.forEach(ctx._events[type], listener => {
        listener.apply(ctx, args);
    });
}

function removeListener(ctx, target, type, listener) {
    let events = ctx._events[type];
    if (!events) {
        const _index = ctx._eventTargets.indexOf(target);
        if (_index >= 0) events = ctx._eventsCache[_index][type];
    }
    if (!events) return ctx;
    const index = events.indexOf(listener);
    if (index >= 0) events.splice(index, 1);
    target.removeEventListener(type, listener, false);
    return ctx;
}

function removeAllListeners(ctx) {
    utils.forEach(this._events, events => {
        events.length = 0;
    }, false);
    if (!ctx._eventsCache) return ctx;
    utils.forEach(ctx._eventsCache, (events, index) => {
        const target = ctx._eventTargets[index];
        utils.forEach(events, (listeners, type) => {
            utils.forEach(listeners, listener => {
                target.removeEventListener(type, listener, false);
            }, true);
        }, false);
    }, true);
    ctx._eventTargets = [];
    ctx._eventsCache = [];
    return ctx;
}

function checkPlaceholder(ctx) {
    ctx.config.editor.classList[ctx.isEmpty() ? 'add' : 'remove']('pen-placeholder');
}

function trim(str) {
    return (str || '').replace(/^\s+|\s+$/g, '');
}

// node.contains is not implemented in IE10/IE11
function containsNode(parent, child) {
    if (parent === child) return true;
    child = child.parentNode;
    while (child) {
        if (child === parent) return true;
        child = child.parentNode;
    }
    return false;
}

function getNode(ctx, bywindow) {
    let node;
    const window = ctx.config.editor;
    ctx._range = ctx._range || ctx.getRange();
    node = ctx._range.commonAncestorContainer;
    if (!node || node === window) return null;
    while (node && (node.nodeType !== 1) && (node.parentNode !== window)) node = node.parentNode;
    while (node && bywindow && (node.parentNode !== window)) node = node.parentNode;
    return containsNode(window, node) ? node : null;
}

// node effects
function effectNode(ctx, el, returnAsNodeName) {
    const nodes = [];
    el = el || ctx.config.editor;
    while (el && el !== ctx.config.editor) {
        if (el.nodeName.match(effectNodeReg)) {
            nodes.push(returnAsNodeName ? el.nodeName.toLowerCase() : el);
        }
        el = el.parentNode;
    }
    return nodes;
}

// breakout from node
function lineBreak(ctx, empty) {
    const range = ctx._range = ctx.getRange();
    const node = document.createElement('p');
    if (empty) ctx.config.editor.innerHTML = '';
    node.innerHTML = '<br>';
    range.insertNode(node);
    focusNode(ctx, node.childNodes[0], range);
}

function focusNode(ctx, node, range) {
    range.setStartAfter(node);
    range.setEndBefore(node);
    range.collapse(false);
    ctx.setRange(range);
}

function autoLink(node) {
    if (node.nodeType === 1) {
        if (autoLinkReg.notLink.test(node.tagName)) return;
        utils.forEach(node.childNodes, child => {
            autoLink(child);
        }, true);
    } else if (node.nodeType === 3) {
        const result = urlToLink(node.nodeValue || '');
        if (!result.links) return;
        const frag = document.createDocumentFragment();
        const div = document.createElement('div');
        div.innerHTML = result.text;
        while (div.childNodes.length) frag.appendChild(div.childNodes[0]);
        node.parentNode.replaceChild(frag, node);
    }
}

function urlToLink(str) {
    let count = 0;
    str = str.replace(autoLinkReg.url, url => {
        let realUrl = url;
        let displayUrl = url;
        count++;
        if (url.length > autoLinkReg.maxLength) displayUrl = `${url.slice(0, autoLinkReg.maxLength)}...`;
        // Add http prefix if necessary
        if (!autoLinkReg.prefix.test(realUrl)) realUrl = `http://${realUrl}`;
        return `<a href="${realUrl}">${displayUrl}</a>`;
    });
    return { links: count, text: str };
}

function toggleNode(node, hide) {
    node.style.display = hide ? 'none' : 'block';
}

Pen = function (config) {

    if (!config) throw new Error('Can\'t find config');

    debugMode = config.debug;

    // merge user config
    const defaults = utils.merge(config);

    const editor = defaults.editor;

    if (!editor || editor.nodeType !== 1) throw new Error('Can\'t find editor');

    // set default class
    editor.classList.add(defaults.class);

    // set contenteditable
    editor.setAttribute('contenteditable', 'true');

    // assign config
    this.config = defaults;

    // set placeholder
    if (defaults.placeholder) editor.setAttribute('data-placeholder', defaults.placeholder);
    checkPlaceholder(this);

    // save the selection obj
    this.selection = selection;

    // define local events
    this._events = { change: [] };

    // enable toolbar
    initToolbar(this);

    // init events
    initEvents(this);

    // to check content change
    this._prevContent = this.getContent();

    // enable markdown covert
    if (this.markdown) this.markdown.init(this);

    // stay on the page
    if (this.config.stay) this.stay(this.config);

    if (this.config.input) {
        this.addOnSubmitListener(this.config.input);
    }
};

Pen.prototype.on = function (type, listener) {
    addListener(this, this.config.editor, type, listener);
    return this;
};

Pen.prototype.addOnSubmitListener = function (inputElement) {
    const form = inputElement.form;
    const me = this;
    form.addEventListener("submit", () => {
        inputElement.value = me.config.saveAsMarkdown ? me.toMd(me.config.editor.innerHTML) : me.config.editor.innerHTML;
    });
};

Pen.prototype.isEmpty = function (node = this.config.editor) {
    return !(node.querySelector('img')) && !(node.querySelector('blockquote')) &&
        !(node.querySelector('li')) && !trim(node.textContent);
};

Pen.prototype.getContent = function () {
    return this.isEmpty() ? '' : trim(this.config.editor.innerHTML);
};

Pen.prototype.setContent = function (html) {
    this.config.editor.innerHTML = html;
    this.cleanContent();
    return this;
};

Pen.prototype.checkContentChange = function () {
    const prevContent = this._prevContent;
    const currentContent = this.getContent();
    if (prevContent === currentContent) return;
    this._prevContent = currentContent;
    triggerListener(this, 'change', currentContent, prevContent);
};

Pen.prototype.getRange = function () {
    const editor = this.config.editor;
    let range = selection.rangeCount && selection.getRangeAt(0);
    if (!range) range = document.createRange();
    if (!containsNode(editor, range.commonAncestorContainer)) {
        range.selectNodeContents(editor);
        range.collapse(false);
    }
    return range;
};

Pen.prototype.setRange = function (range = this._range) {
    if (!range) {
        range = this.getRange();
        range.collapse(false); // set to end
    }
    try {
        selection.removeAllRanges();
        selection.addRange(range);
    } catch (e) {/* IE throws error sometimes*/ }
    return this;
};

Pen.prototype.focus = function (focusStart) {
    if (!focusStart) this.setRange();
    this.config.editor.focus();
    return this;
};

Pen.prototype.execCommand = function (name, value) {
    name = name.toLowerCase();
    this.setRange();

    if (commandsReg.block.test(name)) {
        commandBlock(this, name);
    } else if (commandsReg.inline.test(name)) {
        commandOverall(this, name, value);
    } else if (commandsReg.source.test(name)) {
        commandLink(this, name, value);
    } else if (commandsReg.insert.test(name)) {
        commandInsert(this, name, value);
    } else if (commandsReg.wrap.test(name)) {
        commandWrap(this, name, value);
    } else {
        utils.log(`can not find command function for name: ${name}${value ? (', value: ' + value) : ''}`, true);
    }
    if (name === 'indent') this.checkContentChange();
    else this.cleanContent({ cleanAttrs: ['style'] });
};

// remove attrs and tags
// pen.cleanContent({cleanAttrs: ['style'], cleanTags: ['id']})
Pen.prototype.cleanContent = function (options) {
    const editor = this.config.editor;

    if (!options) options = this.config;
    utils.forEach(options.cleanAttrs, attr => {
        utils.forEach(editor.querySelectorAll(`[${attr}]`), item => {
            item.removeAttribute(attr);
        }, true);
    }, true);
    utils.forEach(options.cleanTags, tag => {
        utils.forEach(editor.querySelectorAll(tag), item => {
            item.parentNode.removeChild(item);
        }, true);
    }, true);

    checkPlaceholder(this);
    this.checkContentChange();
    return this;
};

// auto link content, return content
Pen.prototype.autoLink = function () {
    autoLink(this.config.editor);
    return this.getContent();
};

// highlight menu
Pen.prototype.highlight = function () {
    const toolbar = this._toolbar || this._menu;
    const node = getNode(this);
    // remove all highlights
    utils.forEach(toolbar.querySelectorAll('.active'), el => {
        el.classList.remove('active');
    }, true);

    if (!node) return this;

    const effects = effectNode(this, node);
    const inputBar = this._inputBar;
    let highlight;

    if (inputBar && toolbar === this._menu) {
        // display link input if createlink enabled
        inputBar.style.display = 'none';
        // reset link input value
        inputBar.value = '';
    }

    highlight = str => {
        if (!str) return;
        const el = toolbar.querySelector(`[data-action=${str}]`);
        return el && el.classList.add('active');
    };
    utils.forEach(effects, item => {
        let tag = item.nodeName.toLowerCase();
        switch (tag) {
            case 'a':
                if (inputBar) inputBar.value = item.getAttribute('href');
                tag = 'createlink';
                break;
            case 'img':
                if (inputBar) inputBar.value = item.getAttribute('src');
                tag = 'insertimage';
                break;
            case 'i':
                tag = 'italic';
                break;
            case 'u':
                tag = 'underline';
                break;
            case 'b':
                tag = 'bold';
                break;
            case 'pre':
            case 'code':
                tag = 'code';
                break;
            case 'ul':
                tag = 'insertunorderedlist';
                break;
            case 'ol':
                tag = 'insertorderedlist';
                break;
            case 'li':
                tag = 'indent';
                break;
        }
        highlight(tag);
    }, true);

    return this;
};

// show menu
Pen.prototype.menu = function () {
    if (!this._menu) return this;
    if (selection.isCollapsed) {
        this._menu.style.display = 'none'; //hide menu
        this._inputActive = false;
        return this;
    }
    if (this._toolbar) {
        if (!this._inputBar || !this._inputActive) return this;
    }
    const offset = this._range.getBoundingClientRect();
    const menuPadding = 10;
    const top = offset.top - menuPadding;
    const left = offset.left + (offset.width / 2);
    const menu = this._menu;
    const menuOffset = { x: 0, y: 0 };
    let stylesheet = this._stylesheet;

    // fixes some browser double click visual discontinuity
    // if the offset has no width or height it should not be used
    if (offset.width === 0 && offset.height === 0) return this;

    // store the stylesheet used for positioning the menu horizontally
    if (this._stylesheet === undefined) {
        const style = document.createElement("style");
        document.head.appendChild(style);
        this._stylesheet = stylesheet = style.sheet;
    }
    // display block to caculate its width & height
    menu.style.display = 'block';

    menuOffset.x = left - (menu.clientWidth / 2);
    menuOffset.y = top - menu.clientHeight;

    // check to see if menu has over-extended its bounding box. if it has,
    // 1) apply a new class if overflowed on top;
    // 2) apply a new rule if overflowed on the left
    if (stylesheet.cssRules.length > 0) {
        stylesheet.deleteRule(0);
    }
    if (menuOffset.x < 0) {
        menuOffset.x = 0;
        stylesheet.insertRule(`.pen-menu:after {left: ${left}px;}`, 0);
    } else {
        stylesheet.insertRule('.pen-menu:after {left: 50%; }', 0);
    }
    if (menuOffset.y < 0) {
        menu.classList.add('pen-menu-below');
        menuOffset.y = offset.top + offset.height + menuPadding;
    } else {
        menu.classList.remove('pen-menu-below');
    }

    menu.style.top = `${menuOffset.y}px`;
    menu.style.left = `${menuOffset.x}px`;
    return this;
};

Pen.prototype.stay = function (config) {
    const ctx = this;
    if (!window.onbeforeunload) {
        window.onbeforeunload = () => {
            if (!ctx._isDestroyed) return config.stayMsg;
        };
    }
};

Pen.prototype.destroy = function (isAJoke) {
    const destroy = isAJoke ? false : true;
    const attr = isAJoke ? 'setAttribute' : 'removeAttribute';

    if (!isAJoke) {
        removeAllListeners(this);
        try {
            selection.removeAllRanges();
            if (this._menu) this._menu.parentNode.removeChild(this._menu);
        } catch (e) {/* IE throws error sometimes*/ }
    } else {
        initToolbar(this);
        initEvents(this);
    }
    this._isDestroyed = destroy;
    this.config.editor[attr]('contenteditable', '');

    return this;
};

Pen.prototype.rebuild = function () {
    return this.destroy('it\'s a joke');
};

// a fallback for old browers
window.Pen = config => {
    if (!config) return utils.log('can\'t find config', true);

    const defaults = utils.merge(config);
    let klass = defaults.editor.getAttribute('class');

    klass = klass ? `${klass.replace(/\bpen\b/g, '')} pen-textarea ${defaults.class}` : 'pen pen-textarea';
    defaults.editor.setAttribute('class', klass);
    defaults.editor.innerHTML = defaults.textarea;
    return defaults.editor;
};

// export content as markdown
let regs = {
    a: [/<a\b[^>]*href=["']([^"]+|[^']+)\b[^>]*>(.*?)<\/a>/ig, '[$2]($1)'],
    img: [/<img\b[^>]*src=["']([^\"+|[^']+)[^>]*>/ig, '![]($1)'],
    b: [/<b\b[^>]*>(.*?)<\/b>/ig, '**$1**'],
    i: [/<i\b[^>]*>(.*?)<\/i>/ig, '***$1***'],
    h: [/<h([1-6])\b[^>]*>(.*?)<\/h\1>/ig, (a, b, c) => `\n${'######'.slice(0, b)} ${c}\n`],
    li: [/<(li)\b[^>]*>(.*?)<\/\1>/ig, '* $2\n'],
    blockquote: [/<(blockquote)\b[^>]*>(.*?)<\/\1>/ig, '\n> $2\n'],
    pre: [/<pre\b[^>]*>(.*?)<\/pre>/ig, '\n```\n$1\n```\n'],
    code: [/<code\b[^>]*>(.*?)<\/code>/ig, '\n`\n$1\n`\n'],
    p: [/<p\b[^>]*>(.*?)<\/p>/ig, '\n$1\n'],
    hr: [/<hr\b[^>]*>/ig, '\n---\n']
};

Pen.prototype.toMd = function () {
    let html = this.getContent()
        .replace(/\n+/g, '') // remove line break
        .replace(/<([uo])l\b[^>]*>(.*?)<\/\1l>/ig, '$2'); // remove ul/ol

    for (const p in regs) {
        if (regs.hasOwnProperty(p))
            html = html.replace(...regs[p]);
    }
    return html.replace(/\*{5}/g, '**');
};

Pen.prototype.markdown = {
    keymap: { '96': '`', '62': '>', '49': '1', '46': '.', '45': '-', '42': '*', '35': '#' },
    stack: [],
    // return valid markdown syntax
    valid: function (str) {
        var len = str.length;

        if (str.match(/[#]{1,6}/)) {
            return ['h' + len, len];
        } else if (str === '```') {
            return ['pre', len];
        } else if (str === '>') {
            return ['blockquote', len];
        } else if (str === '1.') {
            return ['insertorderedlist', len];
        } else if (str === '-' || str === '*') {
            return ['insertunorderedlist', len];
        } else if (str.match(/(?:\.|\*|\-){3,}/)) {
            return ['inserthorizontalrule', len];
        }
    },
    // parse command
    parse: function (e) {
        var code = e.keyCode || e.which;

        // when `space` is pressed
        if (code === 32) {
            var markdownSyntax = this.stack.join('');
            // reset stack
            this.stack = [];

            var cmd = this.valid(markdownSyntax);
            if (cmd) {
                // prevents leading space after executing command
                e.preventDefault();
                return cmd;
            }
        }

        // make cmd
        if (this.keymap[code]) this.stack.push(this.keymap[code]);

        return false;
    },
    // exec command
    action: function (pen, cmd) {

        // only apply effect at line start
        if (pen.selection.focusOffset > cmd[1]) return;

        var node = pen.selection.focusNode;
        node.textContent = node.textContent.slice(cmd[1]);
        pen.execCommand(cmd[0]);
    },
    // init Pen.prototype.markdown
    init: function (pen) {
        pen.on('keypress', function (e) {
            var cmd = Pen.prototype.markdown.parse(e);
            if (cmd) return Pen.prototype.markdown.action(pen, cmd);
        });
    }
};

module.exports = Pen
