/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/Device'],function(q,D){"use strict";var T={};T.render=function(r,c){if(c.getParent()&&(c.getParent()instanceof sap.m.MultiInput||c.getParent()instanceof sap.m.MultiComboBox)){r.write("<div tabindex=\"-1\"");}else{r.write("<div tabindex=\"0\"");}r.writeControlData(c);r.addClass("sapMTokenizer");var t=c.getTokens();if(!t.length){r.addClass("sapMTokenizerEmpty");}r.writeClasses();r.writeAttribute("role","list");var a={};a.labelledby={value:c._sAriaTokenizerLabelId,append:true};r.writeAccessibilityState(c,a);r.write(">");c._bCopyToClipboardSupport=false;if((D.system.desktop||D.system.combi)&&t.length){r.write("<div id='"+c.getId()+"-clip' class='sapMTokenizerClip'");if(window.clipboardData){r.writeAttribute("contenteditable","true");r.writeAttribute("tabindex","-1");}r.write(">&nbsp;</div>");c._bCopyToClipboardSupport=true;}var C="class=\"sapMTokenizerScrollContainer\">";var s=" ";var i="id="+c.getId()+"-scrollContainer";r.write("<div"+s+i+s+C);T._renderTokens(r,c);r.write("</div>");r.write("</div>");};T._renderTokens=function(r,c){var i,l,t;t=c.getTokens();l=t.length;for(i=0;i<l;i++){r.renderControl(t[i]);}};return T;},true);
