var Edgemesh=function(){"use strict";function t(t,e){return e={exports:{}},t(e,e.exports),e.exports}var e=t(function(t){function e(t){if(t)return n(t)}function n(t){for(var n in e.prototype)t[n]=e.prototype[n];return t}t.exports=e,e.prototype.on=e.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+t]=this._callbacks["$"+t]||[]).push(e),this},e.prototype.once=function(t,e){function n(){this.off(t,n),e.apply(this,arguments)}return n.fn=e,this.on(t,n),this},e.prototype.off=e.prototype.removeListener=e.prototype.removeAllListeners=e.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var n=this._callbacks["$"+t];if(!n)return this;if(1==arguments.length)return delete this._callbacks["$"+t],this;for(var r,o=0;o<n.length;o++)if(r=n[o],r===e||r.fn===e){n.splice(o,1);break}return this},e.prototype.emit=function(t){this._callbacks=this._callbacks||{};var e=[].slice.call(arguments,1),n=this._callbacks["$"+t];if(n){n=n.slice(0);for(var r=0,o=n.length;r<o;++r)n[r].apply(this,e)}return this},e.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks["$"+t]||[]},e.prototype.hasListeners=function(t){return!!this.listeners(t).length}}),n=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},r=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},o=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},s=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};n(this,e);var r=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));r.element=null,r.opts=Object.assign({client:"jsdelivr.com/edgemesh/latest",host:"sig.edgeno.de",swPath:"/"},t);var s=document.getElementsByTagName("head")[0],i=document.createElement("script");return i.type="text/javascript",i.onload=function(){window.edgemesh=new window.Edgemesh(r.opts),r.emit("ready",window.edgemesh)},i.src="https://"+r.opts.client+"/edgemesh.client.min.js",s.appendChild(i),r.element=i,r}return r(e,t),e}(e);return s}();
