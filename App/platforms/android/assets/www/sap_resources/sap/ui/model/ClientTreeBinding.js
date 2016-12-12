/*!
  * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./ChangeReason','./Context','./TreeBinding','sap/ui/model/SorterProcessor','sap/ui/model/FilterProcessor'],function(q,C,a,T,S,F){"use strict";var b=T.extend("sap.ui.model.ClientTreeBinding",{constructor:function(m,p,c,f,P,s){T.apply(this,arguments);if(!this.oContext){this.oContext="";}this._mLengthsCache={};this.filterInfo={};this.filterInfo.aFilteredContexts=[];this.filterInfo.oParentContext={};if(this.aFilters){if(this.oModel._getObject(this.sPath,this.oContext)){this.filter(f);}}}});b.prototype.getRootContexts=function(s,l){if(!s){s=0;}if(!l){l=this.oModel.iSizeLimit;}var c=[];var t=this;if(!this.oModel.isList(this.sPath)){var o=this.oModel.getContext(this.sPath);if(this.bDisplayRootNode){c=[o];}else{c=this.getNodeContexts(o,s,l);}}else{var d=this._sanitizePath(this.sPath);q.each(this.oModel._getObject(d),function(i,O){t._saveSubContext(O,c,d,i);});this._applySorter(c);this._setLengthCache(d,c.length);return c.slice(s,s+l);}return c;};b.prototype.getNodeContexts=function(c,s,l){if(!s){s=0;}if(!l){l=this.oModel.iSizeLimit;}var d=this._sanitizePath(c.getPath());var e=[],t=this,n=this.oModel._getObject(d),A=this.mParameters&&this.mParameters.arrayNames,f;if(n){if(A&&q.isArray(A)){q.each(A,function(i,g){f=n[g];if(f){q.each(f,function(h,o){t._saveSubContext(o,e,d,g+"/"+h);});}});}else{q.sap.each(n,function(N,o){if(q.isArray(o)){q.each(o,function(g,h){t._saveSubContext(h,e,d,N+"/"+g);});}else if(typeof o=="object"){t._saveSubContext(o,e,d,N);}});}}this._applySorter(e);this._setLengthCache(d,e.length);return e.slice(s,s+l);};b.prototype.hasChildren=function(c){if(c==undefined){return false;}return this.getChildCount(c)>0;};b.prototype.getChildCount=function(c){var p=c?c.sPath:this.getPath();p=this._sanitizePath(p);if(this._mLengthsCache[p]===undefined){if(c){this.getNodeContexts(c);}else{this.getRootContexts();}}return this._mLengthsCache[p];};b.prototype._sanitizePath=function(c){if(!q.sap.endsWith(c,"/")){c=c+"/";}if(!q.sap.startsWith(c,"/")){c="/"+c;}return c;};b.prototype._saveSubContext=function(n,c,s,N){if(n&&typeof n=="object"){var o=this.oModel.getContext(s+N);if(this.aFilters&&!this.bIsFiltering){if(q.inArray(o,this.filterInfo.aFilteredContexts)!=-1){c.push(o);}}else{c.push(o);}}};b.prototype.filter=function(f){if(f&&!q.isArray(f)){f=[f];}this.filterInfo.aFilteredContexts=[];this.filterInfo.oParentContext={};if(!f||!q.isArray(f)||f.length==0){this.aFilters=null;}else{this.aFilters=f;var c=new a(this.oModel,this.sPath);this.filterRecursive(c);}this._mLengthsCache={};this._fireChange({reason:"filter"});this._fireFilter({filters:f});return this;};b.prototype.filterRecursive=function(p){this.bIsFiltering=true;var c=this.getNodeContexts(p);this.bIsFiltering=false;if(c.length>0){var t=this;q.each(c,function(i,o){t.filterRecursive(o);});this.applyFilter(p);}};b.prototype.applyFilter=function(p){if(!this.aFilters){return;}var t=this,f=[];this.bIsFiltering=true;var u=this.getNodeContexts(p);this.bIsFiltering=false;f=F.apply(u,this.aFilters,function(c,P){return t.oModel.getProperty(P,c);});if(f.length>0){q.merge(this.filterInfo.aFilteredContexts,f);this.filterInfo.aFilteredContexts.push(p);this.filterInfo.oParentContext=p;}if(q.inArray(this.filterInfo.oParentContext,u)!=-1){this.filterInfo.aFilteredContexts.push(p);this.filterInfo.oParentContext=p;}};b.prototype.sort=function(s){s=s||[];this.aSorters=q.isArray(s)?s:[s];this._fireChange({reason:C.Sort});return this;};b.prototype._applySorter=function(c){var t=this;S.apply(c,this.aSorters,function(o,p){return t.oModel.getProperty(p,o);},function(o){return o.getPath();});};b.prototype._setLengthCache=function(k,l){this._mLengthsCache[k]=l;};b.prototype.checkUpdate=function(f){this._mLengthsCache={};this._fireChange();};return b;});
