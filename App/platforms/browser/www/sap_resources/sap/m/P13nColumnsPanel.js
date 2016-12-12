/*
 * ! UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./ColumnListItem','./P13nPanel','./P13nColumnsItem','./SearchField','./Table','./library','sap/ui/core/Control'],function(q,C,P,c,S,T,l,d){"use strict";var e=P.extend("sap.m.P13nColumnsPanel",{metadata:{library:"sap.m",properties:{visibleItemsThreshold:{type:"int",group:"Behavior",defaultValue:-1}},aggregations:{columnsItems:{type:"sap.m.P13nColumnsItem",multiple:true,singularName:"columnsItem",bindable:"bindable"},content:{type:"sap.ui.core.Control",multiple:true,singularName:"content",visibility:"hidden"}},events:{addColumnsItem:{parameters:{newItem:{type:"sap.m.P13nColumnsItem"}}},changeColumnsItems:{parameters:{newItems:{type:"sap.m.P13nColumnsItem[]"},existingItems:{type:"sap.m.P13nColumnsItem[]"}}},setData:{}}}});e.prototype._ItemMoveToTop=function(){var o=-1,n=-1,i=null,t=null;if(this._oSelectedItem){t=this._oTable.getItems();i=this._oSelectedItem.data('P13nColumnKey');o=this._getArrayIndexByItemKey(i,t);n=o;if(o>0){n=0;}if(n!=-1&&o!=-1&&o!=n){this._handleItemIndexChanged(this._oSelectedItem,n);this._changeColumnsItemsIndexes(o,n);this._afterMoveItem();}}};e.prototype._ItemMoveUp=function(){var o=-1,n=-1,i=null,t=null;if(this._oSelectedItem){t=this._oTable.getItems();i=this._oSelectedItem.data('P13nColumnKey');o=this._getArrayIndexByItemKey(i,t);n=o;if(o>0){n=this._getPreviousItemIndex(o);}if(n!=-1&&o!=-1&&o!=n){this._handleItemIndexChanged(this._oSelectedItem,n);this._changeColumnsItemsIndexes(o,n);this._afterMoveItem();}}};e.prototype._ItemMoveDown=function(){var o=-1,n=-1,i=null,t=null;var a=null;if(this._oSelectedItem){t=this._oTable.getItems();a=t.length;i=this._oSelectedItem.data('P13nColumnKey');o=this._getArrayIndexByItemKey(i,t);n=o;if(o<a-1){n=this._getNextItemIndex(o);}if(n!=-1&&o!=-1&&o!=n){this._handleItemIndexChanged(this._oSelectedItem,n);this._changeColumnsItemsIndexes(o,n);this._afterMoveItem();}}};e.prototype._ItemMoveToBottom=function(){var o=-1,n=-1,i=null,t=null;var a=null;if(this._oSelectedItem){t=this._oTable.getItems();a=t.length;i=this._oSelectedItem.data('P13nColumnKey');o=this._getArrayIndexByItemKey(i,t);n=o;if(o<a-1){n=a-1;}if(n!=-1&&o!=-1&&o!=n){this._handleItemIndexChanged(this._oSelectedItem,n);this._changeColumnsItemsIndexes(o,n);this._afterMoveItem();}}};e.prototype._changeColumnsItemsIndexes=function(o,n){var m=null,M=null,s=null,i=null;var a=null,b=null,f=null;if(o!==null&&o!==undefined&&o>-1&&n!==null&&n!==undefined&&n>-1&&o!==n){m=Math.min(o,n);M=Math.max(o,n);i=this._oTable.getItems().length-1;a=this.getColumnsItems();s=this._oSelectedItem.data('P13nColumnKey');a.forEach(function(g){f=g.getColumnKey();if(f!==undefined&&f===s){return;}b=g.getIndex();if(b===undefined||b<0||b<m||b>M){return;}if(o>n){if(b<i){b+=1;}}else{if(b>0){b-=1;}}g.setIndex(b);});}};e.prototype._afterMoveItem=function(){this._scrollToSelectedItem(this._oSelectedItem);this._calculateMoveButtonAppearance();};e.prototype._swopShowSelectedButton=function(){var n;this._bShowSelected=!this._bShowSelected;if(this._bShowSelected){n=this._oRb.getText('COLUMNSPANEL_SHOW_ALL');}else{n=this._oRb.getText('COLUMNSPANEL_SHOW_SELECTED');}this._oShowSelectedButton.setText(n);this._changeEnableProperty4SelectAll();this._filterItems();if(this._oSelectedItem&&this._oSelectedItem.getVisible()!==true){this._deactivateSelectedItem();}this._scrollToSelectedItem(this._oSelectedItem);this._calculateMoveButtonAppearance();this._fnHandleResize();};e.prototype._escapeRegExp=function(t){if(t){return t.replace(/[-\/\\^$*+?.()|[\]{}]/g,'\\$&');}};e.prototype._filterItems=function(){var s=null,t=null;var L=0,a=0,i=0,j=0;var I=null,o=null;var b,f;var g=null,h=null,r=null;if(this._bShowSelected){s=this._oTable.getSelectedItems();}else{s=this._oTable.getItems();}if(this._bSearchFilterActive){h=this._oSearchField.getValue();if(h){h=h.replace(/(^\s+)|(\s+$)/g,'');}if(h!==null&&h!==undefined){h=this._escapeRegExp(h);h=r=new RegExp(h,'igm');}}t=this._oTable.getItems();L=t.length;for(i=0;i<L;i++){I=t[i];b=true;f=false;if(this._bSearchFilterActive){b=false;g=I.getCells()[0].getText();if(g&&r!==null&&g.match(r)!==null){b=true;}if(b!==true&&I.getTooltip_Text){g=(I.getTooltip()instanceof sap.ui.core.TooltipBase?I.getTooltip().getTooltip_Text():I.getTooltip_Text());if(g&&r!==null&&g.match(r)!==null){b=true;}}}a=s.length;for(j=0;j<a;j++){o=s[j];if(o){if(o.getId()==I.getId()){f=true;break;}}}I.setVisible(f&&b);}};e.prototype._changeEnableProperty4SelectAll=function(s){var t=sap.ui.getCore().byId(this._oTable.getId()+'-sa');if(t){t.setEnabled(!this._bSearchFilterActive&&!this._bShowSelected);}};e.prototype._executeSearch=function(){var v=this._oSearchField.getValue();var L=v.length||0;if(L>0){this._bSearchFilterActive=true;}else{this._bSearchFilterActive=false;}this._changeEnableProperty4SelectAll();this._filterItems();if(this._oSelectedItem&&this._oSelectedItem.getVisible()!==true){this._deactivateSelectedItem();}this._calculateMoveButtonAppearance();this._scrollToSelectedItem(this._oSelectedItem);};e.prototype._getPreviousItemIndex=function(s){var r=-1,i=0;var t=null,o=null;if(s!==null&&s!==undefined&&s>0){if(this._bShowSelected===true){t=this._oTable.getItems();if(t&&t.length>0){for(i=s-1;i>=0;i--){o=t[i];if(o&&o.getSelected()===true){r=i;break;}}}}else{r=s-1;}}return r;};e.prototype._getNextItemIndex=function(s){var r=-1,i=0,L=null;var t=null,o=null;if(s!==null&&s!==undefined&&s>-1){t=this._oTable.getItems();if(t&&t.length>0){L=t.length;}if(s>=0&&s<L-1){if(this._bShowSelected===true){for(i=s+1;i<L;i++){o=t[i];if(o&&o.getSelected()===true){r=i;break;}}}else{r=s+1;}}}return r;};e.prototype._updateSelectAllDescription=function(E){var t=this._oTable.getItems().length;var s=this._oTable.getSelectedItems().length;var a=null;var o=this._oTable.getColumns()[0];if(o){a=this._oRb.getText('COLUMNSPANEL_SELECT_ALL');if(s!==null&&s!==undefined&&s>=0){a=this._oRb.getText('COLUMNSPANEL_SELECT_ALL_WITH_COUNTER',[s,t]);}o.getHeader().setText(a);}if(this._bShowSelected){this._filterItems();}};e.prototype._changeSelectedItem=function(i){var n=null;if(this._oSelectedItem!==null&&this._oSelectedItem!==undefined){this._removeHighLightingFromItem(this._oSelectedItem);}n=i;if(n!=this._oSelectedItem){this._oSelectedItem=n;this._setHighLightingToItem(this._oSelectedItem);}else{this._oSelectedItem=null;}this._calculateMoveButtonAppearance();};e.prototype._itemPressed=function(E){var n=null;n=E.getParameter('listItem');this._changeSelectedItem(n);};e.prototype._calculateMoveButtonAppearance=function(){var i=null,t=null;var L=-1,I=-1;var m=false,M=false;if(this._bSearchFilterActive===true){m=M=false;}else if(this._oSelectedItem!==null&&this._oSelectedItem!==undefined){i=this._oSelectedItem.data('P13nColumnKey');if(this._bShowSelected===true){t=this._oTable.getSelectedItems();}else{t=this._oTable.getItems();}I=this._getArrayIndexByItemKey(i,t);if(I!==-1){if(t&&t.length){L=t.length;}if(I===0){M=true;}else if(I===L-1){m=true;}else if(I>0&&I<L-1){M=true;m=true;}}}else{m=M=false;}if(this._oMoveToTopButton.getEnabled()!==m){this._oMoveToTopButton.setEnabled(m);}if(this._oMoveUpButton.getEnabled()!==m){this._oMoveUpButton.setEnabled(m);}if(this._oMoveDownButton.getEnabled()!==M){this._oMoveDownButton.setEnabled(M);}if(this._oMoveToBottomButton.getEnabled()!==M){this._oMoveToBottomButton.setEnabled(M);}};e.prototype._setHighLightingToItem=function(i){if(i!==null&&i!==undefined&&i.addStyleClass){i.addStyleClass("sapMP13nColumnsPanelItemSelected");}};e.prototype._removeHighLightingFromItem=function(i){if(i!==null&&i!==undefined&&i.removeStyleClass){i.removeStyleClass("sapMP13nColumnsPanelItemSelected");}};e.prototype._deactivateSelectedItem=function(){if(this._oSelectedItem){this._removeHighLightingFromItem(this._oSelectedItem);this._oSelectedItem=null;this._calculateMoveButtonAppearance();}};e.prototype._getArrayIndexByItemKey=function(I,a){var r=-1;var L=0,i=0;var o=null,s=null;if(I!==null&&I!==undefined&&I!==""){if(a&&a.length>0){L=a.length;for(i=0;i<L;i++){s=null;o=a[i];if(o){if(o.getColumnKey){s=o.getColumnKey();}else if(o.columnKey){s=o.columnKey;}else{s=o.data('P13nColumnKey');}if(s!==null&&s!==undefined&&s!==""){if(s===I){r=i;break;}}}}}}return r;};e.prototype._scrollToSelectedItem=function(i){var f=null;if(i){sap.ui.getCore().applyChanges();if(!!i.getDomRef()){f=document.activeElement;i.focus();if(f&&f.focus){f.focus();}}}};e.prototype._extractExistingColumnsItems=function(a){var E=null,o=null;if(a&&a.length>0){E=[];a.forEach(function(b){o={columnKey:b.getColumnKey(),index:b.getIndex(),visible:b.getVisible(),width:b.getWidth()};E.push(o);});}return E;};e.prototype._extractExistingTableItems=function(){var E=null,o=null;var t=this._oTable.getItems();if(t&&t.length>0){E=[];t.forEach(function(a,i){o={columnKey:a.data('P13nColumnKey'),index:i,visible:a.getSelected(),width:a.data('P13nColumnWidth')};E.push(o);});}return E;};e.prototype._handleItemIndexChanged=function(i,n){var I=null,a=null;var E=[],o=null;var N=[],b=null;var t=this;if(i&&n!==null&&n!==undefined&&n>-1){I=i.data('P13nColumnKey');b=this.getColumnsItems();this._aExistingColumnsItems=this._extractExistingColumnsItems(b);a=this._getArrayIndexByItemKey(I,b);if(a!==null&&a!==undefined&&a!==-1){o=b[a];}if(o===null){o=this._createNewColumnsItem(I);o.setIndex(n);N.push(o);this.fireAddColumnsItem({newItem:o});}else{o.setIndex(n);E.push(o);}if(N.length>0||E.length>0){this.aOwnHandledColumnsItems=N;this.fireChangeColumnsItems({newItems:N,existingItems:E});}this.fireSetData();if(E&&E.length>0){E.forEach(function(i){t._updateTableItems(i);});this._oTableItemsOrdering.fCheckReOrdering();}}};e.prototype._handleItemVisibilityChanged=function(i){var t=this;var I=null,a=null;var E=[],o=null;var n=[],b=null;if(i&&i.length>0){b=this.getColumnsItems();this._aExistingColumnsItems=this._extractExistingColumnsItems(b);i.forEach(function(f){o=a=null;I=f.columnKey;a=t._getArrayIndexByItemKey(I,b);if(a!==null&&a!==undefined&&a!==-1){o=b[a];}if(o===null){o=t._createNewColumnsItem(I);o.setVisible(f.visible);n.push(o);t.fireAddColumnsItem({newItem:o});}else{o.setVisible(f.visible);if(o.getVisible()===false){o.setIndex(undefined);}E.push(o);}});if(n.length>0||E.length>0){this.aOwnHandledColumnsItems=n;this.fireChangeColumnsItems({newItems:n,existingItems:E});}this.fireSetData();if(E&&E.length>0){E.forEach(function(f){t._updateTableItems(f);});this._oTableItemsOrdering.fCheckReOrdering();}}};e.prototype._createNewColumnsItem=function(i){var n=new sap.m.P13nColumnsItem({"columnKey":i});return n;};e.prototype._getColumnsItemByKey=function(i){var a=null;var b=-1,o=null;if(i!==null&&i!==undefined&&i!==""){a=this.getColumnsItems();b=this._getArrayIndexByItemKey(i,a);if(b!==null&&b>-1){o=a[b];}}return o;};e.prototype._updateTableItems=function(o){var t=null,i,a=null;var b=null,s=null;if(o){b=[];b.push(o);}else{b=this.getColumnsItems();}t=this._oTable.getItems();if(t&&t.length>0){b.forEach(function(o){s=o.getColumnKey();i=this._getArrayIndexByItemKey(s,t);if(i!==-1){a=t[i];this._applyColumnsItem2TableItem(o,a);}},this);}};e.prototype._reOrderExistingTableItems=function(){var E=null,f=null;var i=-1,L=null;var t=this;E=this._oTable.getItems();f=this._oTable.getSelectedItems();if(f&&f.length>0){f.forEach(function(o){i=E.indexOf(o);if(i>-1){E.splice(i,1);}});}if(E&&E.length>0){try{L=sap.ui.getCore().getConfiguration().getLocale().toString();}catch(g){q.sap.log.error("sap.m.P13nColumnsPanel : no available Language/Locale to sort table items");L=null;}if(L){E.sort(function(a,b){var s=a.getCells()[0].getText();var h=b.getCells()[0].getText();return s.localeCompare(h,L,{numeric:true});});}}this._oTable.removeAllItems();f.forEach(function(I){t._oTable.addItem(I);});E.forEach(function(I){t._oTable.addItem(I);});};e.prototype._addTableItem=function(i){var o=null;var n=null,s=null;if(i){s=i.getColumnKey();o=this._getColumnsItemByKey(s);n=this._createNewTableItemBasedOnP13nItem(i);if(o){if(o.getVisible()!==undefined){n.setSelected(o.getVisible());}if(o.getWidth()!==undefined){n.data('P13nColumnWidth',o.getWidth());}}if(o&&o.getIndex()!==undefined){this._oTable.insertItem(n,o.getIndex());}else{this._oTable.addItem(n);}}};e.prototype._insertTableItem=function(i,I){var o=null,n=null,s=null;if(I){s=I.getColumnKey();o=this._getColumnsItemByKey(s);n=this._createNewTableItemBasedOnP13nItem(I);if(o){if(o.getVisible()!==undefined){n.setSelected(o.getVisible());}if(o.getWidth()!==undefined){n.data('P13nColumnWidth',o.getWidth());}}if(o&&o.getIndex()!==undefined){this._oTable.insertItem(n,o.getIndex());}else{this._oTable.insertItem(n,i);}}};e.prototype._createNewTableItemBasedOnP13nItem=function(i){if(!i){return null;}var s=i.getColumnKey();var n=new sap.m.ColumnListItem({cells:[new sap.m.Text({text:i.getText()?i.getText():q.extend(true,{},i.getBindingInfo("text"))})],visible:true,selected:i.getVisible(),tooltip:i.getTooltip(),type:sap.m.ListType.Active});n.data('P13nColumnKey',s);n.data('P13nColumnWidth',i.getWidth());return n;};e.prototype._applyColumnsItem2TableItem=function(o,t){var a=this._oTable.getItems();var m=0,r=null,i;var s=null,b=null,E=null,I=false;if(o&&t&&a&&a.length>0){s=o.getColumnKey();if(this._aExistingColumnsItems&&this._aExistingColumnsItems.length>0){b=this._getArrayIndexByItemKey(s,this._aExistingColumnsItems);if(b!==-1){E=this._aExistingColumnsItems[b];if(E&&E.index!==undefined&&E.index===o.getIndex()){I=true;}}}if(o.getIndex()!==undefined&&!I){m=a.length;i=a.indexOf(t);if(i!==o.getIndex()&&o.getIndex()<=m){r=this._oTable.removeItem(t);this._oTable.insertItem(r,o.getIndex());}}if(o.getVisible()!==undefined&&t.getSelected()!==o.getVisible()){t.setSelected(o.getVisible());}if(o.getWidth()!==undefined&&t.data('P13nColumnWidth')!==o.getWidth()){t.data('P13nColumnWidth',o.getWidth());}}};e.prototype._getTableItemsChangeStatus=function(){var t=false,o=null;var a=this._extractExistingTableItems();if(this._aExistingTableItems&&!a){t=true;}else if(a&&!this._aExistingTableItems){t=true;}else if(this._aExistingTableItems&&a){this._aExistingTableItems.forEach(function(E,i){o=null;if(i<a.length){o=a[i];}if(o){if(E.columnKey!==o.columnKey){t=true;}if(E.index!==o.index){t=true;}if(E.visible!==o.visible){t=true;}if(E.width!==o.width){t=true;}}else{t=true;}if(t){return;}});}return t;};e.prototype.init=function(){var L=0;var t=this;this._bOnBeforeRenderingFirstTimeExecuted=false;this._bOnAfterRenderingFirstTimeExecuted=false;this._aExistingColumnsItems=null;this._aExistingTableItems=null;this._oTableItemsOrdering={"_bShallBeOrdered":true,"_bShallBeOrderedOnlyFirstTime":true,"_bAreOrdered":false,"fIsOrderingToBeDoneOnlyFirstTime":function(){return this._bShallBeOrderedOnlyFirstTime;},"fOrderOnlyFirstTime":function(){this._bShallBeOrdered=true;},"fIsOrderingToBeDone":function(s){if(s!==undefined&&s!==null){this._bShallBeOrdered=s;}return this._bShallBeOrdered;},"fIsOrderingDone":function(a){if(a!==undefined&&a!==null){this._bAreOrdered=a;}return this._bAreOrdered;},"fCheckReOrdering":function(){if(this.fIsOrderingToBeDone()){this._bAreOrdered=false;}}};this.setVerticalScrolling(false);this._fnHandleResize=function(){var b=false,s,i;if(t.getParent){var p=null,$=null,a,h;p=t.getParent();if(p){$=q("#"+p.getId()+"-cont");if($.children().length>0&&t._oToolbar.$().length>0){s=t._oScrollContainer.$()[0].clientHeight;a=$.children()[0].clientHeight;h=t._oToolbar?t._oToolbar.$()[0].clientHeight:0;i=a-h;if(s!==i){t._oScrollContainer.setHeight(i+'px');b=true;}}}}return b;};sap.ui.Device.resize.attachHandler(this._fnHandleResize,this);this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._oMoveToTopButton=new sap.m.OverflowToolbarButton({icon:sap.ui.core.IconPool.getIconURI("collapse-group"),text:this._oRb.getText('COLUMNSPANEL_MOVE_TO_TOP'),tooltip:this._oRb.getText('COLUMNSPANEL_MOVE_TO_TOP'),press:function(){t._ItemMoveToTop();},layoutData:new sap.m.OverflowToolbarLayoutData({"moveToOverflow":true})});this._oMoveUpButton=new sap.m.OverflowToolbarButton({icon:sap.ui.core.IconPool.getIconURI("slim-arrow-up"),text:this._oRb.getText('COLUMNSPANEL_MOVE_UP'),tooltip:this._oRb.getText('COLUMNSPANEL_MOVE_UP'),press:function(){t._ItemMoveUp();},layoutData:new sap.m.OverflowToolbarLayoutData({"moveToOverflow":true})});this._oMoveDownButton=new sap.m.OverflowToolbarButton({icon:sap.ui.core.IconPool.getIconURI("slim-arrow-down"),text:this._oRb.getText('COLUMNSPANEL_MOVE_DOWN'),tooltip:this._oRb.getText('COLUMNSPANEL_MOVE_DOWN'),press:function(){t._ItemMoveDown();},layoutData:new sap.m.OverflowToolbarLayoutData({"moveToOverflow":true})});this._oMoveToBottomButton=new sap.m.OverflowToolbarButton({icon:sap.ui.core.IconPool.getIconURI("expand-group"),text:this._oRb.getText('COLUMNSPANEL_MOVE_TO_BOTTOM'),tooltip:this._oRb.getText('COLUMNSPANEL_MOVE_TO_BOTTOM'),press:function(){t._ItemMoveToBottom();},layoutData:new sap.m.OverflowToolbarLayoutData({"moveToOverflow":true})});this._oShowSelectedButton=new sap.m.Button({text:this._oRb.getText('COLUMNSPANEL_SHOW_SELECTED'),press:function(){t._swopShowSelectedButton();},layoutData:new sap.m.OverflowToolbarLayoutData({"moveToOverflow":true})});this._bShowSelected=false;this._bSearchFilterActive=false;this._oSearchField=new S(this.getId()+"-searchField",{liveChange:function(E){var v=E.getSource().getValue(),D=(v?300:0);window.clearTimeout(L);if(D){L=window.setTimeout(function(){t._executeSearch();},D);}else{t._executeSearch();}},search:function(E){t._executeSearch();},layoutData:new sap.m.OverflowToolbarLayoutData({"minWidth":"12.5rem","maxWidth":"23.077rem","shrinkable":true,"moveToOverflow":false,"stayInOverflow":false})});this._oToolbarSpacer=new sap.m.ToolbarSpacer();this._oToolbar=new sap.m.OverflowToolbar({active:true,design:sap.m.ToolbarDesign.Solid,content:[this._oToolbarSpacer,this._oSearchField,this._oShowSelectedButton,this._oMoveToTopButton,this._oMoveUpButton,this._oMoveDownButton,this._oMoveToBottomButton]});this.addAggregation("content",this._oToolbar);this._oTable=new T({mode:sap.m.ListMode.MultiSelect,rememberSelections:false,itemPress:function(E){t._itemPressed(E);},selectionChange:function(E){t._updateSelectAllDescription(E);var s=E.getParameter('selected');var a=E.getParameter('listItems');var b=[],o=null;a.forEach(function(f){f.setSelected(s);o={"columnKey":f.data('P13nColumnKey'),"visible":f.getSelected()};b.push(o);});t._handleItemVisibilityChanged(b);var v=t.getValidationExecutor();if(v){v();}if(a.length===1&&s===true){if(a[0]!==t._oSelectedItem){t._changeSelectedItem(a[0]);}}},columns:[new sap.m.Column({header:new sap.m.Text({text:this._oRb.getText('COLUMNSPANEL_SELECT_ALL')})})]});this._oScrollContainer=new sap.m.ScrollContainer({horizontal:false,vertical:true,content:[this._oTable],width:'100%',height:'100%'});this.addAggregation("content",this._oScrollContainer);};e.prototype.reInitialize=function(){this._oTableItemsOrdering.fOrderOnlyFirstTime();this._oTableItemsOrdering.fCheckReOrdering();};e.prototype.onBeforeRendering=function(){if(!this._bOnBeforeRenderingFirstTimeExecuted){this._bOnBeforeRenderingFirstTimeExecuted=true;if(this._oTableItemsOrdering.fIsOrderingToBeDoneOnlyFirstTime()){this._oTableItemsOrdering.fOrderOnlyFirstTime();}}if(!this._oTableItemsOrdering.fIsOrderingDone()&&this._oTableItemsOrdering.fIsOrderingToBeDone()){this._updateTableItems();this._reOrderExistingTableItems();this._oTableItemsOrdering.fIsOrderingDone(true);if(this._oTableItemsOrdering.fIsOrderingToBeDoneOnlyFirstTime()){this._oTableItemsOrdering.fIsOrderingToBeDone(false);}}if(this._aExistingTableItems===null||this._aExistingTableItems===undefined){this._aExistingTableItems=this._extractExistingTableItems();}this._updateSelectAllDescription();this._calculateMoveButtonAppearance();};e.prototype.onAfterRendering=function(){var t=this,L=0;if(!this._bOnAfterRenderingFirstTimeExecuted){this._bOnAfterRenderingFirstTimeExecuted=true;window.clearTimeout(L);L=window.setTimeout(function(){t._fnHandleResize();t._oToolbar._resetAndInvalidateToolbar();},0);}};e.prototype.getOkPayload=function(){var p=null,s=[],o=null;var t=this._extractExistingTableItems();if(t&&t.length>0){p={"tableItems":t,"tableItemsChanged":false,"selectedItems":s};t.forEach(function(a){if(a&&a.visible&&a.visible===true){o={"columnKey":a.columnKey};s.push(o);}});p.tableItemsChanged=this._getTableItemsChangeStatus();}return p;};e.prototype.getResetPayload=function(){var p=null;p={"oPanel":this};return p;};e.prototype.exit=function(){sap.ui.Device.resize.detachHandler(this._fnHandleResize);this._oMoveToTopButton.destroy();this._oMoveToTopButton=null;this._oMoveDownButton.destroy();this._oMoveDownButton=null;this._oMoveUpButton.destroy();this._oMoveUpButton=null;this._oMoveToBottomButton.destroy();this._oMoveToBottomButton=null;this._oSearchField.destroy();this._oSearchField=null;this._oToolbar.destroy();this._oToolbar=null;this._oTable.destroy();this._oTable=null;};e.prototype.addItem=function(i){P.prototype.addItem.apply(this,arguments);this._addTableItem(i);return this;};e.prototype.insertItem=function(i,I){P.prototype.insertItem.apply(this,arguments);this._insertTableItem(i,I);return this;};e.prototype.removeItem=function(i){var t=null,I=null,a=null,s=null;i=P.prototype.removeItem.apply(this,arguments);if(i){s=i.getColumnKey();a=this._oTable.getItems();if(a&&a.length>0&&s!==null&&s!==""){I=this._getArrayIndexByItemKey(s,a);if(I!==null&&I!==-1){t=a[I];if(t){this._oTable.removeItem(t);}}}}return i;};e.prototype.removeAllItems=function(){var i=P.prototype.removeAllItems.apply(this,arguments);if(this._oTable){this._oTable.removeAllItems();}return i;};e.prototype.destroyItems=function(){P.prototype.destroyItems.apply(this,arguments);if(this._oTable){this._oTable.destroyItems();}return this;};e.prototype.addColumnsItem=function(o){this.addAggregation("columnsItems",o);this._updateTableItems(o);this._oTableItemsOrdering.fCheckReOrdering();return this;};e.prototype.insertColumnsItem=function(i,o){this.insertAggregation("columnsItems",o,i);this._updateTableItems(o);this._oTableItemsOrdering.fCheckReOrdering();return this;};e.prototype.removeColumnsItem=function(o){o=this.removeAggregation("columnsItems",o);this._updateTableItems(o);this._oTableItemsOrdering.fCheckReOrdering();return o;};e.prototype.removeAllColumnsItems=function(){var a=this.removeAllAggregation("columnsItems");this._oTableItemsOrdering.fCheckReOrdering();return a;};e.prototype.destroyColumnsItems=function(){this.destroyAggregation("columnsItems");this._oTableItemsOrdering.fCheckReOrdering();return this;};e.prototype.onBeforeNavigationFrom=function(){var r=true;var s=this._oTable.getSelectedItems();var v=this.getVisibleItemsThreshold();if(s&&v!==-1&&s.length>v){r=false;}return r;};return e;},true);