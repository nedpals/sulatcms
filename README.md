> **ATTENTION**: This is currently in development. Please wait for the stable release.

> **NOTE**: Unless this isn't yet fully complete, the version will remain as `0.1.0`

# SulatCMS [![Maintainability](https://api.codeclimate.com/v1/badges/c2985411330f1b918966/maintainability)](https://codeclimate.com/github/nedpals/sulatcms/maintainability)
Simple plugin-driven Headless CMS for JAMstack sites.

## Features
1. **Extensible** - Want to use Gitlab as gateway? Add a custom shortcode/widget? You can make a plugin for it. Sulat has a simple plugin system to make it your own CMS.
2. **Dead simple** - The interface doesn't have any additional steps to do what's supposed to do. Pick an article or create a new one with a click and start writing.
3. **Powered by [Mithril](https://mithril.js.org)** - A tiny, complete out-of-the box Javascript library makes Sulat slim and fast.

## Install
To start, install Sulat via NPM/Yarn or

```bash
npm install sulat
```
or you can embed it directly

```html
<!-- Place the CSS file before the <head> closing tag -->
<link rel="stylesheet" href="https://unpkg.com/sulat@0.1.0-alpha/dist/sulatcms.css">
<!-- Place the javascript file before the <body> closing tag -->
<script type="text/javascript" src="https://unpkg.com/sulat@0.1.0-alpha/dist/sulatcms.js">
```

### Initialization
```javascript
// To start using it, you can initialize it 
sulatcms.initialize(config, mount)
//or
window.sulatcms.initialize(config, mount)
// or if you are using it on Node or in a bundler like Webpack, you can import the module;
const sulatcms = require("sulat");
const initCMS = sulatcms.initialize;
initCMS(config, mount)
```

There are two arguments in the `initialize()` function:
1. `config : Object` - CMS configuration
2. `mount: Element` - This is where you mount the CMS by using traditional selectors like `document.getElementById()` and others.

### Config Options
- `auth : Object`
  Auth object.
- `repo: String`
  Path for the selected Git repo.
- `plugins: Array(Object | Function)`
  Plugins array. This is where you will put your plugins.
- `keys['posts_path'] : String`
  Specific key for setting file path this is if you are targeting specific directory in your repo.

## Plugins
Plugins are just plain objects that follows a structure:

```javascript
const plugin = {
    name: "Hello world",
    activated: true,
    initialize(state) {
        state.name = "Ned"
        console.log("Hello! " + state.name)
    }
}
```
It has a `name`, `activated` state, and a list of functions.

### Creating a plugin
You can create a simple plugin by creating a simple Javascript object (like the example above) or by calling the `registerPlugin` function and assigning it in a variable.

```javascript
var myFirstPlugin = window.sulatcms.registerPlugin("Hello world", {
    initialize: function(state) {
        state.name = "Ned";
        console.log("Hello! " + state.name);
    }
});
```

### Using the plugin
You can simply add the plugin to the CMS's config:
```javascript
initialize({
    // ...
    plugins: [myFirstPlugin]
    //...
})
```
As soon as the as the CMS is loaded, the plugins are automatically loaded. In this case, our plugin executes after the CMS has been fully loaded.

## Using it on Netlify-hosted sites
For now, the Git plugin that SulatCMS uses the `[netlify-auth-providers](https://npmjs.com/package/netlify-auth-providers)` for the authentication of Gitlab/Github accounts.

### Before proceeding with the step...
- Create first a Github/Gitlab app. Full instructions can be found [here](https://www.netlify.com/docs/authentication-providers).

1. Navigate to your Netlify dashboard and select the site you want to integrate with.
2. Go to `Settings > General` then look for the `API ID`. Copy it for later use.
3. For the initialization, initalize first the CMS then add the `API ID` into the `netlify_id` field and the platform of your choice through the `provider` key into the `auth` property. Like this:
    ```javascript
        sulatcms.initialize({
            auth: {
                netlify_id: "<API_ID>",
                provider: "gitlab"
            },
        })
    ```
    In this example, it uses Gitlab as the default platform for this CMS.
4. Below the `auth` key, specify a repository you want to work with by adding the `repo` property into the config.
    ```javascript
    ///... auth: {...}
    repo: "hello/world",
    ///...
    ```
5. **Optional:** If you have a specific directory in your repo that contains the text files you only want to edit with, you can specify it by adding a `posts_path` to the `keys` property.
    ```javascript
        // auth: {...},
        // repo: "hello/world",
        keys: {
            posts_path: "entries/"
        }
        // ...
    ```
    **Note:** Add an additional slash at the end of the path. Otherwise, it won't work.

6. Deploy it and voila!

## Development Notes
- Plugin system now implemented. I'm gonna think first what set of APIs will be implemented.
<!-- - As much as possible, we will be avoiding jQuery or any library that might bloat the app to stay true about it's "lightweight" size. -->

## Library Size
The file size of this library for the build `18ef17` reports about **200kb** (compressed). Feel free to submit tips on how to decrease it ([Click here!](https://github.com/nedpals/sulatcms/issues/3)).

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
