parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"MO7r":[function(require,module,exports) {
function t(t){return e(t)||i(t)||n()}function n(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function i(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function e(t){if(Array.isArray(t)){for(var n=0,i=new Array(t.length);n<t.length;n++)i[n]=t[n];return i}}var a=Math.floor(100*Math.random()+1);function s(t,n){var i=new XMLHttpRequest;i.onreadystatechange=function(){if(4==i.readyState&&200==i.status){try{var t=JSON.parse(i.responseText)}catch(e){return}n(t)}},i.open("GET",t,!0),i.send()}function r(t){return t=t.toLowerCase().replace(/\s+/g,"-").replace(/[^a-z0-9 -]/g,"")}function o(){var n=t(document.querySelectorAll(".js-lazyload"));var i=new IntersectionObserver(function(t){t.forEach(function(t){t.isIntersecting&&(i.unobserve(t.target),t.target.classList.add("is-loaded"))})});n.forEach(function(t){return i.observe(t)})}s("data/institutions.json?"+a,function(t){for(var n=[],i="",e=function(i){var e=t.institutions[i].location,a=n.find(function(t){return t.name===e}),s='<a href="'.concat(t.institutions[i].url,'" target="_blank" rel="noopener" class="institution__item">\n\t\t\t\t\t<span class="institution__title">').concat(t.institutions[i].name,'</span>\n\t\t\t\t\t<span class="institution__url">').concat(t.institutions[i].url,'</span>\n\t\t\t\t\t<span class="institution__desc">').concat(t.institutions[i].desc,'</span>\n\t\t\t\t\t<span class="institution__tags">\n\t\t\t\t\t\t<span class="location"></span>\n\t\t\t\t\t</span>\n\t\t\t\t</a>');if(a){var r=n.findIndex(function(t){return t.name===e});n[r].html+=s}else{var o={name:e,html:s};n.push(o)}},a=0;a<t.institutions.length;a++)e(a);for(var s=0;s<n.length;s++){var o=n[s].name,c=n[s].html,l=r(o);i+='<div class="instutitions__section institutions__section--'.concat(l,'">\n\t\t\t\t\t\t<h4 class="institutions__region-title js-lazyload">').concat(o,'</h4>\n\n\t\t\t\t\t\t<div class="institution__region-wrapper">').concat(c,"</div>\n\t\t\t\t\t</div>")}document.getElementById("institutions").innerHTML=i}),s("data/links.json?"+a,function(t){for(var n="",i=0;i<t.links.length;i++)n+='<li><a href="'.concat(t.links[i].url,'" target="_blank" rel="noopener">').concat(t.links[i].title,"</a></li>");document.getElementById("links").innerHTML=n}),setTimeout(o,2e3);
},{}]},{},["MO7r"], null)
//# sourceMappingURL=script.8848c1ce.js.map