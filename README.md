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
    src="/edgemesh.client.min.js"
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

 