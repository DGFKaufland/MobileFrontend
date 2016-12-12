/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','sap/ui/core/LocaleData','sap/ui/core/delegate/ItemNavigation','sap/ui/unified/library'],function(q,C,L,I,l){"use strict";var M=C.extend("sap.ui.unified.calendar.MonthPicker",{metadata:{library:"sap.ui.unified",properties:{month:{type:"int",group:"Misc",defaultValue:0},months:{type:"int",group:"Misc",defaultValue:12},columns:{type:"int",group:"Misc",defaultValue:3}},events:{select:{}}}});(function(){M.prototype.init=function(){};M.prototype.onAfterRendering=function(){var t=this;_(t);g(t);};M.prototype.setMonth=function(m){this.setProperty("month",m,true);m=this.getProperty("month");if(m<0||m>11){throw new Error("Property month must be between 0 and 11; "+this);}if(this.getDomRef()){var t=this;if(this.getMonths()<12){var s=h(t);if(m>=s&&m<=s+this.getMonths()-1){f(t,m,true);this._oItemNavigation.focusItem(m-s);}else{j(t,m);}}else{f(t,m,true);this._oItemNavigation.focusItem(m);}}};M.prototype._getLocale=function(){var p=this.getParent();if(p&&p._getLocale){return p._getLocale();}else if(!this._sLocale){this._sLocale=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale().toString();}return this._sLocale;};M.prototype._getLocaleData=function(){var p=this.getParent();if(p&&p._getLocaleData){return p._getLocaleData();}else if(!this._oLocaleData){var s=this._getLocale();var o=new sap.ui.core.Locale(s);this._oLocaleData=L.getInstance(o);}return this._oLocaleData;};M.prototype.onsapselect=function(E){var t=this;var i=this._oItemNavigation.getFocusedIndex();var m=i+h(t);f(t,m);this.fireSelect();};M.prototype.onmouseup=function(E){if(this._bMousedownChange){this._bMousedownChange=false;this.fireSelect();}};M.prototype.onThemeChanged=function(){if(this._bNoThemeChange){return;}this._bNamesLengthChecked=undefined;var m=this._oItemNavigation.getItemDomRefs();this._bLongMonth=false;var o=this._getLocaleData();var b=o.getMonthsStandAlone("wide");for(var i=0;i<m.length;i++){var $=q(m[i]);$.text(b[i]);}var t=this;g(t);};M.prototype.nextPage=function(){var t=this;var s=h(t);var i=this._oItemNavigation.getFocusedIndex();var m=i+s;var b=this.getMonths();m=m+b;if(m>11){m=11;}j(t,m);return this;};M.prototype.previousPage=function(){var t=this;var s=h(t);var i=this._oItemNavigation.getFocusedIndex();var m=i+s;var b=this.getMonths();m=m-b;if(m<0){m=0;}j(t,m);return this;};function _(t){var r=t.getDomRef();var D=t.$().find(".sapUiCalItem");var i=t.getColumns();var m=t.getMonths();var b=true;if(m<12){b=false;}if(!t._oItemNavigation){t._oItemNavigation=new I();t._oItemNavigation.attachEvent(I.Events.AfterFocus,a,t);t._oItemNavigation.attachEvent(I.Events.FocusAgain,c,t);t._oItemNavigation.attachEvent(I.Events.BorderReached,e,t);t.addDelegate(t._oItemNavigation);t._oItemNavigation.setHomeEndColumnMode(true,true);t._oItemNavigation.setDisabledModifiers({sapnext:["alt"],sapprevious:["alt"],saphome:["alt"],sapend:["alt"]});}t._oItemNavigation.setRootDomRef(r);t._oItemNavigation.setItemDomRefs(D);t._oItemNavigation.setCycling(b);t._oItemNavigation.setColumns(i,!b);var k=t.getMonth()-h(t);t._oItemNavigation.setFocusedIndex(k);t._oItemNavigation.setPageSize(D.length);}function a(o){var i=o.getParameter("index");var E=o.getParameter("event");if(!E){return;}if(E.type=="mousedown"){var t=this;d(t,E,i);}}function c(o){var i=o.getParameter("index");var E=o.getParameter("event");if(!E){return;}if(E.type=="mousedown"){var t=this;d(t,E,i);}}function d(t,E,i){if(E.button){return;}var m=i+h(t);f(t,m);t._bMousedownChange=true;E.preventDefault();E.setMark("cancelAutoClose");}function e(o){var E=o.getParameter("event");if(E.type){var t=this;var s=h(t);var i=this._oItemNavigation.getFocusedIndex();var m=i+s;var b=this.getMonths();switch(E.type){case"sapnext":case"sapnextmodifiers":if(m<11){m++;j(t,m);}break;case"sapprevious":case"sappreviousmodifiers":if(m>0){m--;j(t,m);}break;case"sappagedown":if(m<12-b){m=m+b;j(t,m);}break;case"sappageup":if(m>b){m=m-b;j(t,m);}break;default:break;}}}function f(t,m,n){var D=t._oItemNavigation.getItemDomRefs();var $;var s=t.getId()+"-m"+m;for(var i=0;i<D.length;i++){$=q(D[i]);if($.attr("id")==s){$.addClass("sapUiCalItemSel");}else{$.removeClass("sapUiCalItemSel");}}if(!n){t.setProperty("month",m,true);}}function g(t){if(!t._bNamesLengthChecked){var i=0;var m=t._oItemNavigation.getItemDomRefs();var T=false;var k=t.getMonths();var B=Math.ceil(12/k);var n=k-1;for(var b=0;b<B;b++){if(k<12){j(t,n);n=n+k;if(n>11){n=11;}}for(i=0;i<m.length;i++){var o=m[i];if(Math.abs(o.clientWidth-o.scrollWidth)>1){T=true;break;}}if(T){break;}}if(k<12){n=t.getMonth();j(t,n);}if(T){t._bLongMonth=false;var p=t._getLocaleData();var r=p.getMonthsStandAlone("abbreviated");var s=p.getMonthsStandAlone("wide");for(i=0;i<m.length;i++){var $=q(m[i]);$.text(r[i]);$.attr("aria-label",s[i]);}}else{t._bLongMonth=true;}t._bNamesLengthChecked=true;}}function h(t){if(t.getMonths()<12){var F=t._oItemNavigation.getItemDomRefs()[0];return parseInt(F.id.slice(t.getId().length+2),10);}else{return 0;}}function j(t,m){var b=t._oItemNavigation.getItemDomRefs();if(b.legth>11){return;}var k=b.length;var s=Math.floor(m/k)*k;if(s+k>12){s=12-k;}var o=t._getLocaleData();var n=[];var p=[];if(t._bLongMonth||!t._bNamesLengthChecked){n=o.getMonthsStandAlone("wide");}else{n=o.getMonthsStandAlone("abbreviated");p=o.getMonthsStandAlone("wide");}var S=t.getMonth();for(var i=0;i<b.length;i++){var D=q(b[i]);D.text(n[i+s]);D.attr("id",t.getId()+"-m"+(i+s));if(!t._bLongMonth){D.attr("aria-label",p[i+s]);}if(i+s==S){D.addClass("sapUiCalItemSel");}else{D.removeClass("sapUiCalItemSel");}}t._oItemNavigation.focusItem(m-s);}}());return M;},true);
