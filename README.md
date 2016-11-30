![logo](https://avatars2.githubusercontent.com/u/20493267?v=3&s=200)

# Edgemesh: Peer Enhanced CDN

[![AlwaysGood](https://img.shields.io/badge/build-passing-green.svg)](https://github.com/edgemesh/edgemesh/tags)
[![GitHub release](https://img.shields.io/npm/v/edgemesh.svg?maxAge=2592000)](https://github.com/edgemesh/edgemesh)
[![npm](https://img.shields.io/npm/l/edgemesh.svg?maxAge=2592000)](https://www.npmjs.com/package/edgemesh)
[![Gitter](https://img.shields.io/gitter/room/edgemesh/help.svg?maxAge=2592000)](https://gitter.im/edgemesh/help)

[![Github All Releases](https://img.shields.io/github/downloads/edgemesh/edgemesh/total.svg?maxAge=2592000)]()
[![npm](https://img.shields.io/npm/dm/edgemesh.svg?maxAge=2592000)](https://www.npmjs.com/package/edgemesh)
[![npm](https://img.shields.io/npm/dt/edgemesh.svg?maxAge=2592000)](https://www.npmjs.com/package/edgemesh)


> ### ✋ Edgemesh is in early access.  To sign up for early access, please visit [edgemesh.com](edgemesh.com).

## Requirements

- Edgemesh requires that your website be secured with ssl.  We like [letsencrypt](https://letsencrypt.org/).
- You will need to create an free account on our [portal](https://edgemesh.com) in order to start meshing.

> ### ✋ Edgemesh portal is in development.  Sign up for early access to start meshing.

## Browser Installation

### Step 1

1. Add `edgemesh.sw.js` the root of your webserver.
2. Add `<script>` tag to `<head>` element in `index.html`

```html
<script
    type="application/javascript"
    src="https://unpkg.com/edgemesh/edgemesh.client.min.js"
    onload="window.edgemesh = new EdgeMesh()">
</script>
```

### 🍺 You're done!

## Install with npm

1. `npm i edgemesh --save`.
2. `edgemesh install </path/to/webserver/root>`
3. Start edgemesh as early as possible in your app.

```javascript
// ES6
import edgemesh from 'edgemesh';
edgemesh();

// ES5
require('edgemesh')();
```

### 🍺 You're done!


## Options

The edgemesh constructor has a few options.

### `debug`: (default: `false`)
Turn on debug mode.

> ⚠  This will print all edgemesh activity to the console.  Don't leave it on in production.

### `client`: (default: `unpkg.com/edgemesh/edgemesh.client.min.js`)
The static path where `edgemesh.client.min.js` is accessible.

> ⚠ This option is only available in the npm module.

### `host`: (default: `sig.edgeno.de`)
The hostname to edgemesh signaling servers and apis.

> ⚠  Don't change this unless instructed by edgemesh support.

### `swPath`: (default: `\`)
The path where `edgemesh.sw.js` is accessible. We recommend placing it in your web server root and omitting this option.

> ⚠ Note about service worker path

The path at which you mount your service worker determines which parts of your site will get meshed.

For example:

Given a site `example.com`, placing the service worker at the root `example.com/edgemesh.sw.js` will mesh the entire site. Placing it at a subdirectory `example.com/public/edgemesh.sw.js` will mesh that directory and its children.

### Examples

#### Node.js

```javascript
// ES6
import edgemesh from 'edgemesh';
edgemesh({
    client: 'example.com',
    host: 'sandbox.signo.de',
    swPath: 'mysite.com/public',
    debug: true
});

// ES5
require('edgemesh')({
    client: 'example.com',
    host: 'sandbox.signo.de',
    swPath: 'mysite.com/public',
    debug: true
});
```

#### Browser

```html
<script
    type="application/javascript"
    src="/edgemesh.client.min.js"
    onload="new EdgeMesh({
        client: 'mysite.com/js',
        host: 'sandbox.signo.de',
        swPath: 'mysite.com/public',
        debug: true })">
</script>
```

## CLI

Sometimes your static file server isn't colocated with your application.
If you have [node.js](https://nodejs.org) installed we've got you covered.

Install edgemesh globally
```bash
npm i -g edgemesh
```

Install edgemesh files to your static root
```bash
edgemesh install /path/to/public/root
```

This will install `edgemesh.sw.js` at the supplied path.
It also stores the path at `/usr/local/etc/edgemesh/edgemesh.conf` so you can run:

```bash
npm i -g edgemesh && edgemesh update
```

on subsequent updates.  To check if you have the latest version run:

```bash
edgemesh check-updates
```

### CLI Api

```bash
Usage: edgemesh <command> [options]


Commands:

    install|i <path>  install edgemesh server files at static path
    update|u          update edgemesh server files
    check-updates|v   check for newer version

Options:

    -h, --help     output usage information
    -V, --version  output the version number

Examples:

    $ edgemesh install ./server/static
    $ edgemesh update
    $ edgemesh check-updates
```

## Browser Support

Edgemesh will install on any browser.  If the browser doesn't support edgemesh, it will resume normal operation.
On edgemesh compatible browsers our service will bootstrap and just start working.  No need to worry about compatability!
As browsers add support for the latest web features that edgemesh utilizes, your edgemesh installation will be automatically updated.

Here is a list of currently supported browsers:

| Browser                                                                                                  | Market Share | Supported Versions | Blocked by              |
|----------------------------------------------------------------------------------------------------------|--------------|--------------------|-------------------------|
| <img src="https://sig.edgeno.de/assets/browser-icons/chrome.png" alt="Chrome" width="40" height="40" />  | 55%          | 48 - 57            | Implemented             |
| <img src="https://sig.edgeno.de/assets/browser-icons/firefox.png" alt="Chrome" width="40" height="40" /> | 11%          | Not supported      | Ready to be implemented |
| <img src="https://sig.edgeno.de/assets/browser-icons/edge.png" alt="Chrome" width="40" height="40" />    | 5%           | Not supported      | No webrtc support       |
| <img src="https://sig.edgeno.de/assets/browser-icons/safari.png" alt="Chrome" width="40" height="40" />  | 4%           | Not supported      | No webrtc support       |

## Tag support

Edgemesh supports specific tags in order to keep DOM operations fast.  If you need a tag that we don't currently support,
just create an [issue](https://github.com/edgemesh/edgemesh/issues) and we will add support.

| Tag            | Properties                          | Notes                        |
|----------------|-------------------------------------|------------------------------|
| `<img>`        | `src`                               |                              |
| `<picture>`    | `src` and `srcset`                  |                              |
| `<source>`     | `src` and `srcset`                  | picture tags only (no video) |
| `<div>`        | `background-image` and `background` | css or inline style          |
| `<a>`          | `background-image` and `background` | css or inline style          |
| `<button>`     | `background-image` and `background` | css or inline style          |
| `<nav>`        | `background-image` and `background` | css or inline style          |
| `<blockquote>` | `background-image` and `background` | css or inline style          |

## Extension support

Edgemesh supports most image formats.  We will be adding support for streaming video and other media types such as `.pdf` in the future.  We want to get the implementation right for image assets first. We believe that all images should be `.webp` when possible, but if we have missed an asset type that you require feel free to add a [feature request](https://github.com/edgemesh/edgemesh/issues) and we will address on a case by case basis.

Currently supported extensions:

| Extension | Asset class |
|-----------|-------------|
| `.jpg`    | image       |
| `.jpeg`   | image       |
| `.gif`    | image       |
| `.bmp`    | image       |
| `.svg`    | image       |
| `.webp`   | image       |


## Troubleshooting

If you come across any bugs please don't hesitate to drop an [issue](https://github.com/edgemesh/edgemesh/issues) or hop on [gitter](https://gitter.im/edgemesh/help).
