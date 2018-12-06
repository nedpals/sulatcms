> **ATTENTION**: This is currently in development. Please wait for the stable release.

> **NOTE**: Unless this isn't yet fully complete, the version will remain as `1.0.0`

# SulatCMS [![Maintainability](https://api.codeclimate.com/v1/badges/c2985411330f1b918966/maintainability)](https://codeclimate.com/github/nedpals/sulatcms/maintainability)
Super simple platform-agnostic headless CMS made for you.


Sulat was built to adapt to the demands of the user and to any kind of SSG's (Static Site Generator) with it's extensibility built in mind.


**It's name was originated from the Filipino word meaning "to write".**


## Features
1. **Extensible** - Want to use Gitlab as gateway? Add a custom shortcode/widget? You can make a plugin for it. Sulat has a simple plugin system to make Sulat your own CMS.
2. **Dead simple** - The interface doesn't have any additional steps to do what's supposed to do. Pick an article or create a new one with a click and start writing.
3. **Powered by [Mithril](https://mithril.js.org)** - A tiny, complete out-of-the box Javascript library makes Sulat slim and fast.

## Development Notes
- Plugin system now implemented. I'm gonna think first what set of APIs will be implemented.
<!-- - As much as possible, we will be avoiding jQuery or any library that might bloat the app to stay true about it's "lightweight" size. -->

## Library Size
The file size of this library for the build`d6b291` reports about **600kb**. Feel free to submit tips on how to decrease it ([Click here!](https://github.com/nedpals/sulatcms/issues/3)).

## Pre-launch plans
- [ ] Make Github and Gitlab as default platforms
  - [x] Gitlab support
  - [x] Github support (Partial support for now, only supports loading of files)
- [x] Implement few API's for plugins
- [ ] Cleanup the UI
- [ ] Target file size should be atleast between *100-300kb*

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
