/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','../base/Interface','../base/Object','sap/ui/core/LabelEnablement','jquery.sap.act','jquery.sap.encoder','jquery.sap.dom','jquery.sap.trace'],function(q,I,B,L){"use strict";var c=["renderControl","write","writeEscaped","translate","writeAcceleratorKey","writeControlData","writeInvisiblePlaceholderData","writeElementData","writeAttribute","writeAttributeEscaped","addClass","writeClasses","addStyle","writeStyles","writeAccessibilityState","writeIcon","getConfiguration","getHTML","cleanupControlWithoutRendering"];var N=["render","flush","destroy"];var R=B.extend("sap.ui.core.RenderManager",{constructor:function(){B.apply(this,arguments);this.aBuffer=[];this.aRenderedControls=[];this.aStyleStack=[{}];},metadata:{publicMethods:c.concat(N)}});R.prototype.getRendererInterface=function(){var i=new I(this,c);this.getRendererInterface=q.sap.getter(i);return i;};R.prototype.destroy=function(){this.aBuffer=[];this.aRenderedControls=[];this.aStyleStack=[{}];};R.prototype.getConfiguration=function(){return sap.ui.getCore().getConfiguration();};R.prototype.getRenderer=function(C){return R.getRenderer(C);};R.prototype._setFocusHandler=function(f){this.oFocusHandler=f;};var t=function(r,C){r._bLocked=true;try{var e=q.Event("BeforeRendering");e.srcControl=C;C._handleEvent(e);}finally{r._bLocked=false;}};R.prototype.cleanupControlWithoutRendering=function(C){if(!C||!C.getDomRef()){return;}t(this,C);C.bOutput=false;};R.prototype.renderControl=function(C){if(!C){return;}if(!this.aRenderStack){this.aRenderStack=[];}if(this.aRenderStack&&this.aRenderStack.length>0){q.sap.measure.pause(this.aRenderStack[0]+"---renderControl");}else if(C.getParent()&&C.getParent().getMetadata().getName()=="sap.ui.core.UIArea"){q.sap.measure.pause(C.getParent().getId()+"---rerender");}this.aRenderStack.unshift(C.getId());q.sap.measure.start(C.getId()+"---renderControl","Rendering of "+C.getMetadata().getName(),["rendering","control"]);var b=this.aBuffer.length;var o={};if(C.aCustomStyleClasses&&C.aCustomStyleClasses.length>0){o.aCustomStyleClasses=C.aCustomStyleClasses;}this.aStyleStack.push(o);q.sap.measure.pause(C.getId()+"---renderControl");var r;var m=C.getMetadata();var v=C.getVisible();if(v){r=m.getRenderer();}else{var V=m.getProperty("visible");var u=V&&V._oParent&&V._oParent.getName()=="sap.ui.core.Control";r=u?a:m.getRenderer();}q.sap.measure.resume(C.getId()+"---renderControl");t(this,C);var d=C.aBindParameters;if(d&&d.length>0){var D=q(C.getDomRef());if(D&&D[0]){for(var i=0;i<d.length;i++){var p=d[i];D.unbind(p.sEventType,p.fnProxy);}}}if(r&&typeof r.render==="function"){r.render(this.getRendererInterface(),C);}else{q.sap.log.error("The renderer for class "+m.getName()+" is not defined or does not define a render function! Rendering of "+C.getId()+" will be skipped!");}this.aStyleStack.pop();this.aRenderedControls.push(C);if(C.getUIArea&&C.getUIArea()){C.getUIArea()._onControlRendered(C);}C.bOutput=this.aBuffer.length!=b;if(r===a){C.bOutput="invisible";}q.sap.measure.end(C.getId()+"---renderControl");this.aRenderStack.shift();if(this.aRenderStack&&this.aRenderStack.length>0){q.sap.measure.resume(this.aRenderStack[0]+"---renderControl");}else if(C.getParent()&&C.getParent().getMetadata().getName()=="sap.ui.core.UIArea"){q.sap.measure.resume(C.getParent().getId()+"---rerender");}};R.prototype.getHTML=function(C){var b=this.aBuffer;var r=this.aBuffer=[];this.renderControl(C);this.aBuffer=b;return r.join("");};(function(){var f=function(r,b,s){var i,d=b.length;for(i=0;i<d;i++){b[i]._sapui_bInAfterRenderingPhase=true;}r._bLocked=true;try{for(i=0;i<d;i++){var C=b[i];if(C.bOutput&&C.bOutput!=="invisible"){var E=q.Event("AfterRendering");E.srcControl=C;q.sap.measure.start(C.getId()+"---AfterRendering","AfterRendering of "+C.getMetadata().getName(),["rendering","after"]);C._handleEvent(E);q.sap.measure.end(C.getId()+"---AfterRendering");}}}finally{for(i=0;i<d;i++){delete b[i]._sapui_bInAfterRenderingPhase;}r._bLocked=false;}try{r.oFocusHandler.restoreFocus(s);}catch(e){q.sap.log.warning("Problems while restoring the focus after rendering: "+e,null,r);}for(i=0;i<d;i++){var C=b[i],g=C.aBindParameters;if(g&&g.length>0){var D=q(C.getDomRef());if(D&&D[0]){for(var j=0;j<g.length;j++){var p=g[j];D.bind(p.sEventType,p.fnProxy);}}}}};R.prototype.flush=function(T,d,v){if(this.bRendererMode){q.sap.log.info("Flush must not be called from control renderers. Call ignored.",null,this);return;}if(!d&&(typeof v!=="number")&&!v){R.preserveContent(T);}var s=this.oFocusHandler?this.oFocusHandler.getControlFocusInfo():null;var h=this.aBuffer.join("");if(this._fPutIntoDom){this._fPutIntoDom(T,h);}else{for(var i=0;i<this.aRenderedControls.length;i++){var o=this.aRenderedControls[i].getDomRef();if(o&&!R.isPreservedContent(o)){if(R.isInlineTemplate(o)){q(o).empty();}else{q(o).remove();}}}if(typeof v==="number"){if(v<=0){q(T).prepend(h);}else{var $=q(T).children().eq(v-1);if($.length===1){$.after(h);}else{q(T).append(h);}}}else if(!v){q(T).html(h);}else{q(T).append(h);}}f(this,this.aRenderedControls,s);this.aRenderedControls=[];this.aBuffer=[];this.aStyleStack=[{}];q.sap.act.refresh();q.sap.interaction.notifyStepEnd();};R.prototype.render=function(C,T){if(this.bRendererMode){q.sap.log.info("Render must not be called from control renderers. Call ignored.",null,this);return;}if(this._bLocked){q.sap.log.error("Render must not be called within Before or After Rendering Phase. Call ignored.",null,this);return;}this.aRenderedControls=[];this.aBuffer=[];this.aStyleStack=[{}];this.renderControl(C);this._fPutIntoDom=function(o,h){if(C&&T){var b=C.getDomRef();if(R.isPreservedContent(b)){b=q.sap.byId(sap.ui.core.RenderPrefixes.Dummy+C.getId())[0]||b;}if(!b){b=q.sap.domById(sap.ui.core.RenderPrefixes.Invisible+C.getId());}var n=b&&b.parentNode!=T;var A=function(){var j=q(T);if(T.innerHTML==""){j.html(h);}else{j.append(h);}};if(n){if(!R.isPreservedContent(b)){if(R.isInlineTemplate(b)){q(b).empty();}else{q(b).remove();}}if(h){A();}}else{if(h){if(b){if(R.isInlineTemplate(b)){q(b).html(h);}else if(this._isDomPathingEnabled()){q.sap.replaceDOM(b,h,true);}else{q(b).replaceWith(h);}}else{A();}}else{if(R.isInlineTemplate(b)){q(b).empty();}else{if(!C.getParent()||!C.getParent()._onChildRerenderedEmpty||!C.getParent()._onChildRerenderedEmpty(C,b)){q(b).remove();}}}}}};this.flush(T,true);this._fPutIntoDom=null;};}());R.getRenderer=function(C){return C.getMetadata().getRenderer();};R.forceRepaint=function(d){var D=typeof d=="string"?q.sap.domById(d):d;if(D){q.sap.log.debug("forcing a repaint for "+(D.id||String(D)));var o=D.style.display;var A=document.activeElement;D.style.display="none";D.offsetHeight;D.style.display=o;if(document.activeElement!==A){q.sap.focus(A);}}};R.createInvisiblePlaceholderId=function(e){return sap.ui.core.RenderPrefixes.Invisible+e.getId();};(function(){var b="sap-ui-preserve",d="sap-ui-static",A="data-sap-ui-preserve",e="data-sap-ui-area";function g(){var $=q.sap.byId(b);if($.length===0){$=q("<DIV/>",{"aria-hidden":"true",id:b}).addClass("sapUiHidden").addClass("sapUiForcedHidden").css("width","0").css("height","0").css("overflow","hidden").appendTo(document.body);}return $;}function m(n){q("<DIV/>",{id:sap.ui.core.RenderPrefixes.Dummy+n.id}).addClass("sapUiHidden").insertBefore(n);}R.preserveContent=function(r,p,P){sap.ui.getCore().getEventBus().publish("sap.ui","__preserveContent",{domNode:r});var $=g();function h(i){if(i.id===b||i.id===d){return;}if(i.hasAttribute(A)){if(i===r){m(i);}$.append(i);}else if(P&&i.id){R.markPreservableContent(q(i),i.id);$.append(i);return;}if(!i.hasAttribute(e)){var n=i.firstChild;while(n){i=n;n=n.nextSibling;if(i.nodeType===1){h(i);}}}}q.sap.measure.start(r.id+"---preserveContent","preserveContent for "+r.id,["rendering","preserve"]);if(p){h(r);}else{q(r).children().each(function(i,n){h(n);});}q.sap.measure.end(r.id+"---preserveContent");};R.findPreservedContent=function(i){var $=g(),h=$.children("["+A+"='"+i.replace(/(:|\.)/g,'\\$1')+"']");return h;};R.markPreservableContent=function($,i){$.attr(A,i);};R.isPreservedContent=function(D){return(D&&D.getAttribute(A)&&D.parentNode&&D.parentNode.id==b);};R.getPreserveAreaRef=function(){return g()[0];};var f="data-sap-ui-template";R.markInlineTemplate=function($){$.attr(f,"");};R.isInlineTemplate=function(D){return(D&&D.hasAttribute(f));};}());R.prototype.write=function(T){this.aBuffer.push.apply(this.aBuffer,arguments);return this;};R.prototype.writeEscaped=function(T,l){T=q.sap.encodeHTML(T);if(l){T=T.replace(/&#xa;/g,"<br>");}this.aBuffer.push(T);return this;};R.prototype.translate=function(k){};R.prototype.writeAcceleratorKey=function(){return this;};R.prototype.addStyle=function(n,v){if(v!==undefined&&v!==null){var s=this.aStyleStack[this.aStyleStack.length-1];if(!s.aStyle){s.aStyle=[];}s.aStyle.push(n+":"+v);}return this;};R.prototype.writeStyles=function(){var s=this.aStyleStack[this.aStyleStack.length-1];if(s.aStyle){this.write(" style=\""+s.aStyle.join(";")+"\" ");}s.aStyle=null;return this;};R.prototype.addClass=function(n){if(n){var s=this.aStyleStack[this.aStyleStack.length-1];if(!s.aClasses){s.aClasses=[];}s.aClasses.push(n);}return this;};R.prototype.writeClasses=function(e){var s=this.aStyleStack[this.aStyleStack.length-1];var C;if(e){C=e.aCustomStyleClasses;}else if(e===false){C=[];}else{C=s.aCustomStyleClasses;}if(s.aClasses||C){var b=[].concat(s.aClasses||[],C||[]);b.sort();b=q.map(b,function(n,i){return(i==0||n!=b[i-1])?n:null;});this.write(" class=\"",b.join(" "),"\" ");}if(!e){s.aCustomStyleClasses=null;}s.aClasses=null;return this;};R.prototype.writeControlData=function(C){this.writeElementData(C);return this;};R.prototype.writeInvisiblePlaceholderData=function(e){var p=R.createInvisiblePlaceholderId(e),P=' '+'id="'+p+'" '+'class="sapUiHiddenPlaceholder" '+'data-sap-ui="'+p+'" '+'style="display: none;"'+'aria-hidden="true" ';this.write(P);return this;};R.prototype.writeElementData=function(e){var s=e.getId();if(s){this.writeAttribute("id",s).writeAttribute("data-sap-ui",s);}var d=e.getCustomData();var l=d.length;for(var i=0;i<l;i++){var C=d[i]._checkWriteToDom(e);if(C){this.writeAttributeEscaped(C.key,C.value);}}return this;};R.prototype.writeAttribute=function(n,v){this.write(" ",n,"=\"",v,"\"");return this;};R.prototype.writeAttributeEscaped=function(n,v){this.writeAttribute(n,q.sap.encodeHTML(String(v)));return this;};R.prototype.writeAccessibilityState=function(e,P){if(!sap.ui.getCore().getConfiguration().getAccessibility()){return this;}if(arguments.length==1&&!(e instanceof sap.ui.core.Element)){P=e;e=null;}var A={};if(e!=null){var m=e.getMetadata();var b=function(E,s,v){var o=m.getProperty(E);if(o&&e[o._sGetter]()===v){A[s]="true";}};var d=function(E,s){var o=m.getAssociation(E);if(o&&o.multiple){var k=e[o._sGetter]();if(E=="ariaLabelledBy"){var l=sap.ui.core.LabelEnablement.getReferencingLabels(e);var n=l.length;if(n){var F=[];for(var i=0;i<n;i++){if(q.inArray(l[i],k)<0){F.push(l[i]);}}k=F.concat(k);}}if(k.length>0){A[s]=k.join(" ");}}};b("editable","readonly",false);b("enabled","disabled",false);b("visible","hidden",false);if(sap.ui.core.LabelEnablement.isRequired(e)){A["required"]="true";}b("selected","selected",true);b("checked","checked",true);d("ariaDescribedBy","describedby");d("ariaLabelledBy","labelledby");}if(P){var f=function(v){var i=typeof(v);return v===null||v===""||i==="number"||i==="string"||i==="boolean";};var g={};var x,h,j;for(x in P){h=P[x];if(f(h)){g[x]=h;}else if(typeof(h)==="object"&&f(h.value)){j="";if(h.append&&(x==="describedby"||x==="labelledby")){j=A[x]?A[x]+" ":"";}g[x]=j+h.value;}}q.extend(A,g);}if(e instanceof sap.ui.core.Element&&e.getParent()&&e.getParent().enhanceAccessibilityState){e.getParent().enhanceAccessibilityState(e,A);}for(var p in A){if(A[p]!=null&&A[p]!==""){this.writeAttributeEscaped(p==="role"?p:"aria-"+p,A[p]);}}return this;};R.prototype.writeIcon=function(u,C,A){q.sap.require("sap.ui.core.IconPool");var i=sap.ui.core.IconPool.isIconURI(u),s=i?"<span ":"<img ",b,p,o,d;if(typeof C==="string"){C=[C];}if(i){o=sap.ui.core.IconPool.getIconInfo(u);if(!o){q.sap.log.error("An unregistered icon: "+u+" is used in sap.ui.core.RenderManager's writeIcon method.");return this;}if(!C){C=[];}C.push("sapUiIcon");if(!o.suppressMirroring){C.push("sapUiIconMirrorInRTL");}}this.write(s);if(q.isArray(C)&&C.length){b=C.join(" ");this.write("class=\""+b+"\" ");}if(i){d={"data-sap-ui-icon-content":o.content,"role":"presentation","aria-label":o.text||o.name,"title":o.text||o.name};this.write("style=\"font-family: "+o.fontFamily+";\" ");}else{d={role:"presentation",alt:"",src:u};}A=q.extend(d,A);if(typeof A==="object"){for(p in A){if(A.hasOwnProperty(p)&&A[p]!==null){this.writeAttributeEscaped(p,A[p]);}}}this.write(i?"></span>":"/>");return this;};R.prototype._isDomPathingEnabled=function(){if(this._bDomPathing===undefined){this._bDomPathing=this.getConfiguration().getDomPatching();if(this._bDomPathing){q.sap.log.warning("DOM Patching is enabled: This feature should be used only for the testing purposes!");}}return this._bDomPathing;};var a={render:function(r,C){r.write("<span");r.writeInvisiblePlaceholderData(C);r.write("></span>");}};return R;});
