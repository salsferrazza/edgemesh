var Edgemesh=function(){"use strict";var e=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=document.getElementsByTagName("head")[0],n=document.createElement("script"),d=e.client||"unpkg.com/edgemesh";n.type="text/javascript",n.onload=function(){window.edgemesh=new window.Edgemesh({debug:e.debug||!1,host:e.host||"sig.edgeno.de",client:d,path:e.swPath||"/"})},n.src="https://"+d+"/edgemesh.client.min.js",t.appendChild(n)};return e}();