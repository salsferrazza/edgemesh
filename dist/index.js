"use strict";function createCommonjsModule(t,e){return e={exports:{}},t(e,e.exports),e.exports}var index=createCommonjsModule(function(t){function e(t){if(t)return n(t)}function n(t){for(var n in e.prototype)t[n]=e.prototype[n];return t}t.exports=e,e.prototype.on=e.prototype.addEventListener=function(t,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+t]=this._callbacks["$"+t]||[]).push(e),this},e.prototype.once=function(t,e){function n(){this.off(t,n),e.apply(this,arguments)}return n.fn=e,this.on(t,n),this},e.prototype.off=e.prototype.removeListener=e.prototype.removeAllListeners=e.prototype.removeEventListener=function(t,e){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var n=this._callbacks["$"+t];if(!n)return this;if(1==arguments.length)return delete this._callbacks["$"+t],this;for(var o,r=0;r<n.length;r++)if((o=n[r])===e||o.fn===e){n.splice(r,1);break}return this},e.prototype.emit=function(t){this._callbacks=this._callbacks||{};var e=[].slice.call(arguments,1),n=this._callbacks["$"+t];if(n)for(var o=0,r=(n=n.slice(0)).length;o<r;++o)n[o].apply(this,e);return this},e.prototype.listeners=function(t){return this._callbacks=this._callbacks||{},this._callbacks["$"+t]||[]},e.prototype.hasListeners=function(t){return!!this.listeners(t).length}}),classCallCheck=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},inherits=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},possibleConstructorReturn=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},HOST="sig.edgeno.de",Edgemesh=function(t){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};classCallCheck(this,e);var n=possibleConstructorReturn(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));n.element=null,n.opts=Object.assign({client:HOST,host:HOST,swPath:"/",externalMount:!1},t);var o=document.getElementsByTagName("body")[0],r=document.createElement("script");return r.type="text/javascript",r.onload=function(){window.edgemesh=new window.Edgemesh(n.opts),n.emit("ready",window.edgemesh)},r.src="https://"+n.opts.client+"/edgemesh.client.min.js",o.appendChild(r),n.element=r,n}return inherits(e,t),e}(index);module.exports=Edgemesh;
