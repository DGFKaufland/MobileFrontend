/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/EventProvider','sap/ui/thirdparty/hasher'],function(q,E,h){"use strict";var H=E.extend("sap.ui.core.routing.HashChanger",{constructor:function(){E.apply(this);}});H.prototype.init=function(){if(this._initialized){q.sap.log.info("this HashChanger instance has already been initialized.");return false;}this._initialized=true;h.changed.add(this.fireHashChanged,this);if(!h.isActive()){h.initialized.addOnce(this.fireHashChanged,this);h.init();}else{this.fireHashChanged(h.getHash());}return this._initialized;};H.prototype.fireHashChanged=function(n,o){this.fireEvent("hashChanged",{newHash:n,oldHash:o});};H.prototype.setHash=function(s){this.fireEvent("hashSet",{sHash:s});h.setHash(s);};H.prototype.replaceHash=function(s){this.fireEvent("hashReplaced",{sHash:s});h.replaceHash(s);};H.prototype.getHash=function(){return h.getHash();};H.prototype.destroy=function(){h.changed.remove(this.fireHashChanged,this);E.prototype.destroy.apply(this,arguments);};(function(){var _=null;H.getInstance=function(){if(!_){_=new H();}return _;};function e(o){var s,a,n;for(s in _.mEventRegistry){if(_.mEventRegistry.hasOwnProperty(s)){a=_.mEventRegistry[s];n=o.mEventRegistry[s];if(n){o.mEventRegistry[s]=a.concat(n);}else{o.mEventRegistry[s]=a;}}}}H.replaceHashChanger=function(o){if(_&&o){var g=q.sap.getObject("sap.ui.core.routing.History.getInstance"),a;if(g){a=g();a._unRegisterHashChanger();}e(o);_.destroy();if(a){a._setHashChanger(o);}}_=o;};}());return H;});
