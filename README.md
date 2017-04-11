![logo](https://avatars2.githubusercontent.com/u/20493267?v=3&s=200)

# Edgemesh: Dynamic Web Acceleration Platform
[![npm version](https://img.shields.io/npm/v/edgemesh.svg?maxAge=2592000)](https://github.com/edgemesh/edgemesh)
[![npm license](https://img.shields.io/npm/l/edgemesh.svg?maxAge=2592000)](https://www.npmjs.com/package/edgemesh)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

[![Build Status](https://travis-ci.org/edgemesh/edgemesh.svg?branch=master)](https://travis-ci.org/edgemesh/edgemesh)
[![Test Coverage](https://codeclimate.com/github/edgemesh/edgemesh/badges/coverage.svg)](https://codeclimate.com/github/edgemesh/edgemesh/coverage)
[![Code Climate](https://codeclimate.com/github/edgemesh/edgemesh/badges/gpa.svg)](https://codeclimate.com/github/edgemesh/edgemesh)
[![Issue Count](https://codeclimate.com/github/edgemesh/edgemesh/badges/issue_count.svg)](https://codeclimate.com/github/edgemesh/edgemesh)
[![npm](https://img.shields.io/npm/dm/edgemesh.svg?maxAge=2592000)](https://www.npmjs.com/package/edgemesh)
[![npm](https://img.shields.io/npm/dt/edgemesh.svg?maxAge=2592000)](https://www.npmjs.com/package/edgemesh)


## Requirements

- edge**mesh** requires that your site be secured with SSL.
- you will need to create a free account on our [portal](https://portal.edgemesh.com) in order to enable your site.

## Documentation

All of our documentation can be found at [https://edgemesh.com/docs](https://edgemesh.com/docs).

## CLI

The edge**mesh** CLI provides an easy way to install and update the edge**mesh** service worker.
If you have [node.js](https://nodejs.org) installed on your destination machine you are ready to go.

Install edge**mesh** globally
```bash
npm i -g edgemesh
```

Install edge**mesh** files to your static root
```bash
edgemesh install /path/to/public/root
```

This will install `edgemesh.sw.min.js` at the supplied path.
It also stores a config file at `/usr/local/etc/edgemesh/edgemesh.conf` so you can run:

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

The edge**mesh** client will install on any browser.  If the browser doesn't support edge**mesh**, it will resume normal operation.
On edge**mesh** compatible browsers our service will self-bootstrap and start working automatically.  No need to worry about compatibility!
As browsers add support for the latest web features that edge**mesh** utilizes, your edge**mesh** installation will be automatically updated to add support.

| Browser                                                                                                  | Market Share | Supported Versions | Blocked by                 |
|----------------------------------------------------------------------------------------------------------|--------------|--------------------|----------------------------|
| <img src="https://sig.edgeno.de/assets/browser-icons/chrome.png" alt="Chrome" width="40" height="40" />  | 58%          | >49            | ✅ Implemented              |
| <img src="https://sig.edgeno.de/assets/browser-icons/firefox.png" alt="Firefox" width="40" height="40" /> | 12%          | >58     | ✅ Implemented |
| <img src="https://sig.edgeno.de/assets/browser-icons/edge.png" alt="Edge" width="40" height="40" />    | 5%           | Not supported      | ❌ No webrtc support        |
| <img src="https://sig.edgeno.de/assets/browser-icons/safari.png" alt="Safari" width="40" height="40" />  | 3%           | Not supported      | ❌ No webrtc support        |

## Troubleshooting

If you come across any bugs please don't hesitate to drop an [issue](https://github.com/edgemesh/edgemesh/issues) or hop on [gitter](https://gitter.im/edgemesh/help).
