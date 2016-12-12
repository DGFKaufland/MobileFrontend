/*
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/ManagedObject','./ComponentMetadata','./Core','sap/ui/thirdparty/URI'],function(q,M,C,a,U){"use strict";function b(u,o){['sap-client','sap-server'].forEach(function(n){var v=u.get(n);if(v&&!o.hasSearch(n)){o.addSearch(n,v);}});}function m(d,D,s,S){if(s){for(var n in d){if(!D[n]&&s[n]&&s[n].uri){D[n]=S;}}}}var c=M.extend("sap.ui.core.Component",{constructor:function(i,s){M.apply(this,arguments);},metadata:{stereotype:"component","abstract":true,specialSettings:{componentData:true},version:"0.0",includes:[],dependencies:{libs:[],components:[],ui5version:""},config:{},customizing:{},library:"sap.ui.core"}},C);c.activateCustomizing=function(s){};c.deactivateCustomizing=function(s){};c.getOwnerIdFor=function(o){var O=(o instanceof M)&&o._sOwnerId;return O||undefined;};c.getOwnerComponentFor=function(o){var O=c.getOwnerIdFor(o);return O&&sap.ui.component(O);};c.prototype.runAsOwner=function(f){var o=M._sOwnerId;try{M._sOwnerId=this.getId();return f.call();}finally{M._sOwnerId=o;}};c.prototype.getInterface=function(){return this;};c.prototype._initCompositeSupport=function(s){this._mManifestModels={};this.getMetadata().onInitComponent();this.oComponentData=s&&s.componentData;this.getMetadata().init();this.initComponentModels();if(this.onWindowError){this._fnWindowErrorHandler=q.proxy(function(e){var E=e.originalEvent;this.onWindowError(E.message,E.filename,E.lineno);},this);q(window).bind("error",this._fnWindowErrorHandler);}if(this.onWindowBeforeUnload){this._fnWindowBeforeUnloadHandler=q.proxy(this.onWindowBeforeUnload,this);q(window).bind("beforeunload",this._fnWindowBeforeUnloadHandler);}if(this.onWindowUnload){this._fnWindowUnloadHandler=q.proxy(this.onWindowUnload,this);q(window).bind("unload",this._fnWindowUnloadHandler);}};c.prototype.destroy=function(){if(typeof this._mManifestModels==='object'){for(var s in this._mManifestModels){this._mManifestModels[s].destroy();}this._mManifestModels=null;}if(this._fnWindowErrorHandler){q(window).unbind("error",this._fnWindowErrorHandler);delete this._fnWindowErrorHandler;}if(this._fnWindowBeforeUnloadHandler){q(window).unbind("beforeunload",this._fnWindowBeforeUnloadHandler);delete this._fnWindowBeforeUnloadHandler;}if(this._fnWindowUnloadHandler){q(window).unbind("unload",this._fnWindowUnloadHandler);delete this._fnWindowUnloadHandler;}if(this._oEventBus){this._oEventBus.destroy();delete this._oEventBus;}M.prototype.destroy.apply(this,arguments);sap.ui.getCore().getMessageManager().unregisterObject(this);this.getMetadata().onExitComponent();};c.prototype.getComponentData=function(){return this.oComponentData;};c.prototype.getEventBus=function(){if(!this._oEventBus){q.sap.require("sap.ui.core.EventBus");this._oEventBus=new sap.ui.core.EventBus();}return this._oEventBus;};c.prototype.initComponentModels=function(){var o=this.getMetadata();var A=o.getManifestEntry("sap.app",true);var u=o.getManifestEntry("sap.ui5",true);var d={models:u["models"],dataSources:A["dataSources"]||{},origin:{dataSources:{},models:{}}};if(!d.models){return;}var e=o;while(e&&e instanceof C){var f=e.getManifestEntry("sap.app")["dataSources"];m(d.dataSources,d.origin.dataSources,f,e);var g=e.getManifestEntry("sap.ui5")["models"];m(d.models,d.origin.models,g,e);e=e.getParent();}var h=q.sap.getUriParameters();for(var s in d.models){var j=d.models[s];var I=false;if(typeof j==='string'){j={dataSource:j};}if(j.dataSource){var D=d.dataSources&&d.dataSources[j.dataSource];if(typeof D==='object'){if(D.type===undefined){D.type='OData';}if(!j.type){switch(D.type){case'OData':j.type='sap.ui.model.odata.v2.ODataModel';break;case'JSON':j.type='sap.ui.model.json.JSONModel';break;case'XML':j.type='sap.ui.model.xml.XMLModel';break;default:}}if(!j.uri){j.uri=D.uri;I=true;}if(D.type==='OData'&&D.settings&&D.settings.annotations){var k=D.settings.annotations;for(var i=0;i<k.length;i++){var l=d.dataSources[k[i]];if(!l){q.sap.log.error("Component Manifest: ODataAnnotation \""+k[i]+"\" for dataSource \""+j.dataSource+"\" could not be found in manifest","[\"sap.app\"][\"dataSources\"][\""+k[i]+"\"]",this);continue;}if(l.type!=='ODataAnnotation'){q.sap.log.error("Component Manifest: dataSource \""+k[i]+"\" was expected to have type \"ODataAnnotation\" but was \""+l.type+"\"","[\"sap.app\"][\"dataSources\"][\""+k[i]+"\"]",this);continue;}if(!l.uri){q.sap.log.error("Component Manifest: Missing \"uri\" for ODataAnnotation \""+k[i]+"\"","[\"sap.app\"][\"dataSources\"][\""+k[i]+"\"]",this);continue;}var n=d.origin.dataSources[k[i]]._resolveUri(new U(l.uri)).toString();j.settings=j.settings||{};j.settings.annotationURI=j.settings.annotationURI||[];j.settings.annotationURI.push(n);}}}else{q.sap.log.error("Component Manifest: dataSource \""+j.dataSource+"\" for model \""+s+"\" not found or invalid","[\"sap.app\"][\"dataSources\"][\""+j.dataSource+"\"]",this);}}if(!j.type){q.sap.log.error("Component Manifest: Missing \"type\" for model \""+s+"\"","[\"sap.ui5\"][\"models\"][\""+s+"\"]",this);continue;}try{q.sap.require(j.type);}catch(E){q.sap.log.error("Component Manifest: Class \""+j.type+"\" for model \""+s+"\" could not be loaded. "+E,"[\"sap.ui5\"][\"models\"][\""+s+"\"]",this);continue;}var p=q.sap.getObject(j.type);if(!p){q.sap.log.error("Component Manifest: Class \""+j.type+"\" for model \""+s+"\" could not be found","[\"sap.ui5\"][\"models\"][\""+s+"\"]",this);continue;}if(j.type==='sap.ui.model.odata.ODataModel'&&(!j.settings||j.settings.json===undefined)){j.settings=j.settings||{};j.settings.json=true;}if(j.uri){var r=new U(j.uri);var t=(I)?d.origin.dataSources[j.dataSource]:d.origin.models[s];r=t._resolveUri(r);if(j.dataSource){b(h,r);}j.uri=r.toString();}if(j.uriSettingName===undefined){switch(j.type){case'sap.ui.model.odata.ODataModel':case'sap.ui.model.odata.v2.ODataModel':j.uriSettingName='serviceUrl';break;case'sap.ui.model.resource.ResourceModel':j.uriSettingName='bundleUrl';break;default:}}var v=this.getComponentData();var S=v&&v.startupParameters&&v.startupParameters["sap-system"];if(!S){S=h.get("sap-system");}var w=false;var O;if(S&&q.inArray(j.type,["sap.ui.model.odata.ODataModel","sap.ui.model.odata.v2.ODataModel"])!=-1){w=true;q.sap.require("sap.ui.model.odata.ODataUtils");O=sap.ui.require("sap/ui/model/odata/ODataUtils");}if(j.uri){if(w){j.preOriginBaseUri=j.uri.split("?")[0];j.uri=O.setOrigin(j.uri,{alias:S});j.postOriginBaseUri=j.uri.split("?")[0];}if(j.uriSettingName!==undefined){j.settings=j.settings||{};if(!j.settings[j.uriSettingName]){j.settings[j.uriSettingName]=j.uri;}}else if(j.settings){j.settings=[j.uri,j.settings];}else{j.settings=[j.uri];}}else{if(w&&j.uriSettingName!==undefined&&j.settings&&j.settings[j.uriSettingName]){j.preOriginBaseUri=j.settings[j.uriSettingName].split("?")[0];j.settings[j.uriSettingName]=O.setOrigin(j.settings[j.uriSettingName],{alias:S});j.postOriginUri=j.settings[j.uriSettingName].split("?")[0];}}if(w&&j.settings&&j.settings.annotationURI){var x=[].concat(j.settings.annotationURI);var y=[];for(var i=0;i<x.length;i++){y.push(x[i].replace(j.preOriginBaseUri,j.postOriginBaseUri.split("?")[0]));}j.settings.annotationURI=y;}if(j.settings&&!q.isArray(j.settings)){j.settings=[j.settings];}var z=[null].concat(j.settings||[]);var F=p.bind.apply(p,z);var B=new F();this._mManifestModels[s]=B;this.setModel(B,s||undefined);}};sap.ui.component=function(v){if(!v){throw new Error("sap.ui.component cannot be called without parameter!");}if(typeof v==='string'){return sap.ui.getCore().getComponent(v);}function d(o){var n=v.name,i=v.id,f=v.componentData,s=n+'.Component',S=v.settings;var I=new o(q.extend({},S,{id:i,componentData:f}));q.sap.log.info("Component instance Id = "+I.getId());var h=I.getMetadata().handleValidation()!==undefined||v.handleValidation;if(h){if(I.getMetadata().handleValidation()!==undefined){h=I.getMetadata().handleValidation();}else{h=v.handleValidation;}sap.ui.getCore().getMessageManager().registerObject(I,h);}return I;}var e=sap.ui.component.load(v,true);if(v.async){return e.then(d);}else{return d(e);}};sap.ui.component.load=function(o,f){var n=o.name,u=o.url,d=/^(sync|async)$/.test(sap.ui.getCore().getConfiguration().getComponentPreload());if(!n){throw new Error("The name of the component is undefined.");}if(u){q.sap.registerModulePath(n,u);}function g(){var s=n+'.Component';q.sap.require(s);var e=q.sap.getObject(s);if(!e){var i="The specified component controller '"+s+"' could not be found!";if(f){throw new Error(i);}else{q.sap.log.warning(i);}}return e;}function r(O){if(typeof O==='object'){if(O.url){q.sap.registerModulePath(O.name,O.url);}return O.name;}return O;}function p(s,A){var i=s+'.Component',P;if(d&&!q.sap.isDeclared(i,true)){if(A){P=q.sap.getResourceName(i,'-preload.js');return q.sap._loadJSResourceAsync(P,true);}try{P=i+'-preload';q.sap.require(P);}catch(e){q.sap.log.warning("couldn't preload component from "+P+": "+((e&&e.message)||e));}}}if(o.async){var h=o.asyncHints||{},j=[],k=function(P){if(P){j.push(P);}};if(h.preloadBundles){q.each(h.preloadBundles,function(i,B){k(q.sap._loadJSResourceAsync(r(B),true));});}if(h.libs){k(sap.ui.getCore().loadLibraries(h.libs.map(r)));}k(p(n,true));if(h.components){q.each(h.components,function(i,v){k(p(r(v),true));});}return Promise.all(j).then(function(v){q.sap.log.debug("Component.load: all promises fulfilled, then "+v);return h.preloadOnly?true:g();});}p(n);return g();};return c;});
