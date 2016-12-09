![logo](https://avatars2.githubusercontent.com/u/20493267?v=3&s=200)

# Edgemesh: Change Log

All notable changes will be documented here.

<a name="1.3.4"></a>
## [1.3.4](https://github.com/edgemesh/edgemesh/release/1.3.4) (12-07-2016)

> Fixed a bug with recording the size of svg assets from origin that caused our stats to
be inaccurate.

### Bugfixes
- Fixed a bug recording the size of svg assets from origin

<a name="1.3.3"></a>
## [1.3.3](https://github.com/edgemesh/edgemesh/release/1.3.3) (12-07-2016)

> Debug tooling enhancement.

### Bugfixes
- Fixed an error in the debug command

<a name="1.3.2"></a>
## [1.3.2](https://github.com/edgemesh/edgemesh/release/1.3.2) (12-07-2016)

> Hotfix

### Hotfixes
- Fixed an uncaught undefined constant

<a name="1.3.1"></a>
## [1.3.1](https://github.com/edgemesh/edgemesh/release/1.3.1) (12-07-2016)

> Version bump.

### Hotfixes
- Serve hub from unpkg
- Bump config versions

<a name="1.3.0"></a>
## [1.3.0](https://github.com/edgemesh/edgemesh/release/1.3.0) (12-07-2016)

> In preparation for the release of our portal, we have added origin accounting and authentication.

### Features
- Added origin accounting on asset register and transfer records
- Added origin authentication on client register

### Enhancements
- Enhanced debugging
- Improved error logging

<a name="1.2.3"></a>
## [1.2.3](https://github.com/edgemesh/edgemesh/release/1.2.3) (11-30-2016)

> ⚠️ Hotfix: service worker was patched.  You should update your local copy for
> optimal cache hit rate.

### Bugfixes
- Fixed a non critical issue causing the service worker to become unresponsive after closing the browser and returning to the site

<a name="1.2.2"></a>
## [1.2.2](https://github.com/edgemesh/edgemesh/release/1.2.2) (11-24-2016)

> Non critical bugfixes.

### Bugfixes
- Fixed an undefined in service worker

<a name="1.2.1"></a>
## [1.2.1](https://github.com/edgemesh/edgemesh/release/1.2.1) (11-23-2016)

> Chrome 57 supported!

### Bugfixes
- Fixed an edge case with deregistering the service worker (check for subscription first)

### Chores
- Added support for chrome 57

<a name="1.2.0"></a>
## [1.2.0](https://github.com/edgemesh/edgemesh/release/1.2.0) (11-22-2016)

> Background Images now supported!

### Features
- Added support for css background images
- Added time syncing for more accurate statistics
- Hubs can now be active or inactive
- Added support for `a`, `button`, `blockquote` and `nav` tags
- Added local session cache to prevent unnecessary calls to the backend

### Performance
> Seeing a 20% speed increase as a result of these fixes

- Removed 15% of unused backend source code
- Improve handling of `objectURL` resources
- Use colocated edge *mesh* stun servers

### Bugfixes
- Quota api now returns default values based on device type instead of failing
- Service worker returns responses to the requesting client only
- Check for destroyed peers before signaling or sending
- Fixed reconnection of disconnected socket

### Chores
- Added flow to source to prevent unintended type errors
- Checked all error logging to make sure it's using the latest error api

<a name="1.1.3"></a>
## [1.1.3](https://github.com/edgemesh/edgemesh/release/1.1.3) (11-8-2016)

> Patch

### Bugfixes
- Fixed bug getting the latest edgemesh files (auto updates)

<a name="1.1.2"></a>
## [1.1.2](https://github.com/edgemesh/edgemesh/release/1.1.2) (11-8-2016)

> Performance tuning and various bug fixes.

### Bugfixes
- Fixed bug where handshake time was not being recorded correctly
- Fixed bug in build chain that made hub scripts unavailable via cdn (auto update)
- Registering clients and hubs now includes the correct version of edgemesh being used

### Performance
- Eliminated unnecessary calls when syncing hub and locating assets

<a name="1.1.1"></a>
## [1.1.1](https://github.com/edgemesh/edgemesh/release/1.1.1) (11-5-2016)

> After running on our own site and pushing updates, we realized it's a real pain to have to update the `edgemesh.client.min.js` script every time it's updated (could be often).
> If you start edgemesh with no `client` option, you will always get the latest version of edgemesh.  The only time you will have to manually (via cli) update a file is when the service worker changes.
> The service worker will rarely need updating, but when it does it will be denoted by a major patch bump.  

### Bugfixes
- Added a deadman's switch to the initial webrtc connection
- Set up graceful handling of `SIGTERM`, `SIGINT`, `SIGHUP` and `unexpectedError`
- Fixed some type errors and missing inputs
- Update indexedDB error codes
- Fixed a bug that allowed more than one hub to register

### Chores
- Enable automatic updates of edgemesh source
- Expand configuration options
- Update `README.md`
- Cleaned up the output from debug mode

<a name="1.1.0"></a>
# [1.1.0](https://github.com/edgemesh/edgemesh/release/1.1.0) (10-31-2016)

> 👻🎃 Happy Halloween!

### Features
- Replaced Peer.js with a custom WebRTC implementation. Perhaps an open source project on the horizon 😉
- Added CLI to make version management more painless.

### Chores
- Refactored code structure for maximum extendability

<a name="1.0.0"></a>
# [1.0.0](https://github.com/edgemesh/edgemesh/release/1.0.0) (10-19-2016)

> 🚀 Our intial stable release.

### Features
- added `debug` mode
- added installation via `npm`
- added `client` and `host` configuration options
- added support for `<img>` tag
- added support for `<source>` tag
- added support for `.jpg` and `.jpeg`
- added support for `.png`
- added support for `.bmp`
- added support for `.svg`
- added support for `.gif`
- added support for `.webp`

### Chores
- first stable version
