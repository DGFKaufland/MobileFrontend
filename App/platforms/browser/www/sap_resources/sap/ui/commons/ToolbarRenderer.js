/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global'],function(q){"use strict";var T={};T.render=function(r,t){var a=r;var b=sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons");a.write("<div role='toolbar' tabindex='0'");a.writeControlData(t);if(t.getWidth()){a.addStyle("width",t.getWidth());}var s=t.getTooltip_AsString();if(s){a.writeAttributeEscaped("title",s);}a.addClass("sapUiTb");a.addClass("sapUiTbDesign"+t.getDesign());if(t.getStandalone()){a.addClass("sapUiTbStandalone");}a.writeStyles();a.writeClasses();a.write(">");var R=t.getRightItems();var c=R.length;var h=c>0;var I="<div class='sapUiTbInner' id='"+t.getId()+"-inner"+"'>";if(h){a.write("<div class='sapUiTbCont sapUiTbContLeft'>"+I);}else{a.write("<div class='sapUiTbCont'>"+I);}var d=t.getItems();var l=d.length;for(var i=0;i<l;i++){var o=d[i];if(o){if(o instanceof sap.ui.commons.ToolbarSeparator){T.renderSeparator(a,o);}else{a.renderControl(o);}}}a.write("<div id='");a.write(t.getId());a.write("-mn' class='sapUiTbOB' role='button' aria-haspopup='true' title='"+b.getText("TOOLBAR_OVERFLOW")+"' tabindex='-1'></div></div></div>");if(h){a.write("<div class='sapUiTbInnerRight' >");for(var i=0;i<c;i++){var o=R[i];if(o){if(o instanceof sap.ui.commons.ToolbarSeparator){T.renderSeparator(a,o);}else{a.renderControl(o);}}}a.write("</div>");}a.write("</div>");};T.renderSeparator=function(r,t){if(t.getDisplayVisualSeparator()){r.write("<span ");r.writeElementData(t);if(t.getDesign()===sap.ui.commons.ToolbarSeparatorDesign.FullHeight){r.write(" class='sapUiTbSeparator sapUiTbSepFullHeight' role='separator'></span>");}else{r.write(" class='sapUiTbSeparator' role='separator'></span>");}}else{r.write("<span ");r.writeElementData(t);r.write(" class='sapUiTbSpacer' role='separator'></span>");}};T.fillOverflowPopup=function(t){var p=t.getDomRef("pu");if(!p){p=T.initOverflowPopup(t).firstChild;}var $=q(p.parentNode),v=t.getVisibleItemInfo(true).count,o=t.getDomRef().firstChild.firstChild,P=0,c=o.firstChild,O=t.getId()+"-mn",i=$.width(),b=0;while(c){var n=c.nextSibling;if(P>=v){if(c.id===O){break;}b=b<q(c).outerWidth(true)?q(c).outerWidth(true):b;p.appendChild(c);}c=n;P++;}if(b>i){var a=12;$.width(b+a);}};T.initOverflowPopup=function(t){var s=sap.ui.getCore().getStaticAreaRef();var p=document.createElement("div");p.className="sapUiTbDD sapUiTbDesignFlat";p.innerHTML="<div id='"+t.getId()+"-pu' data-sap-ui="+t.getId()+" tabindex='0' role='menu'></div>";s.appendChild(p);return p;};T.emptyOverflowPopup=function(t,m){var p=t.getDomRef("pu"),d=t.getDomRef(),c=null,M='',a=[];if(m===undefined){m=true;}if(p){if(m&&d){c=d.firstChild.firstChild;M='insertBefore';a=[t.getDomRef("mn")];}else if(!m){c=p;M='removeChild';}else{q.sap.log.error("The renderer 'sap.ui.commons.ToolbarRenderer' cannot empty the toolbar overflow popup.");return;}while(p.hasChildNodes()){var A=[p.firstChild].concat(a);c[M].apply(c,A);}if(d&&t.sOriginalStylePropertyWidth){q(d).width(t.sOriginalStylePropertyWidth);t.sOriginalStylePropertyWidth=null;}}};T.getPopupArea=function(t){return t.getDomRef("pu");};T.setActive=function(t){t.$("mn").addClass("sapUiTbOBAct");};T.unsetActive=function(t){t.$("mn").removeClass("sapUiTbOBAct");};return T;},true);
