> **ATTENTION**: This is currently in development. Please wait for the stable release.

> **NOTE**: Unless this isn't yet fully complete, the version will remain as `0.1.0`

<h1>
    SulatCMS
    <small><b>Version 0.1.0-alpha</b></small>
</h1>
<p style="text-align:center;">
Super simple platform-agnostic headless CMS made for you.
<br/>
<br/>
Sulat was built to adapt to the demands of the user and to any kind of SSG's (Static Site Generator) with it's extensibility built in mind.
<br/>
It's name was originated from the Filipino word meaning "to write".
</p>

## Features
1. **Extensible** - Want to use Gitlab as gateway? Add a custom shortcode/widget? You can make a plugin for it. Sulat uses [pluggable.js](https://github.com/conversejs/pluggablejs) to make Sulat your own CMS.
2. **Dead simple** - The interface doesn't have any additional steps to do what's supposed to do. Pick an article or create a new one with a click and start writing.
3. **Powered by [Mithril](https://mithril.js.org)** - A tiny, complete out-of-the box Javascript library makes Sulat slim and fast.

## Development Notes
- Plugin system now implemented. I'm gonna think first what set of APIs will be implemented.
<!-- - As much as possible, we will be avoiding jQuery or any library that might bloat the app to stay true about it's "lightweight" size. -->

## Library Size
The file size of this library for the build`9f4ed9` reports about **597kb**. Feel free to submit tips on how to decrease it ([Click here!](https://github.com/nedpals/sulatcms/issues/3)).

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
