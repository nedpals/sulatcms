> **ATTENTION**: This is currently in development. Please wait for the stable release.
> You are looking for the next version of SulatCMS currently developed right now.

# SulatCMS [![Maintainability](https://api.codeclimate.com/v1/badges/c2985411330f1b918966/maintainability)](https://codeclimate.com/github/nedpals/sulatcms/maintainability)
Simple plugin-driven Headless CMS for JAMstack sites.

## Features
1. **Platform-agnostic** - Edit your markdown posts from your local filesystem, git, WordPress, and etc.
2. **Plugin-driven** - From content manipulation to publishing your content, they are all handled by plugins.
3. **Barebones** - A Sulat installation with no plugins only weighs about `60kb` compared to previous version.
4. **Powered by [Mithril](https://mithril.js.org)** - A tiny, complete out-of-the box Javascript library makes Sulat slim and fast.

## Install
To start, install Sulat via NPM/Yarn or

```bash
yarn add https://github.com/nedpals/sulatcms#next
```
or you can embed it directly

```html
<!-- Place the javascript file before the <body> closing tag -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/nedpals/sulatcms@next/dist/sulat.js">
```

### Usage

To get started, initialize first the CMS by invoking the `initialize` function. If you are setting up in the browser without any build tools, you can access it through `window.sulat`.

```javascript
sulatcms.initialize({
    el: document.getElementById("sulat"),
    auth: "netlify", // if you are using authentication, you need to set the default provider.
    plugins: [
        //... plugins goes here.
        netlifyIdentityPlugin(),
        gitlabPlugin()
    ]
})
```
Once you set up and install all the plugins, you're good to go!

## Plugins
What makes SulatCMS unique is the first-class support of plugins. Plugins what makes the CMS functionable from content management to authentication.

### Creating a plugin
SulatCMS plugins are just regular functions returning a single plugin object. The plugin object contains metadata for the plugin (name and etc.) as well as it's event functions both for the CMS and authentication management.

```javascript
function myFirstPlugin(options) {
    return {
        name: "my-first-plugin",
        events: {
            onInit() {
                console.log("Hello " + options.name);
            }
        }
    };
}
```

### Using the plugin
You can simply add the plugin to the CMS's config:
```javascript
initialize({
    // ...
    plugins: [myFirstPlugin({
        name: "Bob"
    })]
    //...
})
```
As soon as the as the CMS is loaded, the plugins are automatically loaded. In this case, our plugin executes after the CMS has been fully loaded.

## Development Notes
- Plugin system now implemented. I'm gonna think first what set of APIs will be implemented.

## Pre-launch plans
- [x] ~~Make Github and Gitlab as default platforms~~
   - **Note:** Login only works on Netlify sites. Still working on making it usable for non-Netlify sites.
- [x] ~~Implement few API's for plugins~
- [ ] Cleanup the UI
- [x] Target file size should be atleast between *100-300kb*

## Contribute
To start:

```bash
$ npm install
```


To develop:

```bash
$ npm run dev
```

To build for production:

```bash
$ npm run build
```

---

&copy; 2018 [nedpals](https://github.com/nedpals).
