(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"/e6I":function(e,a,t){"use strict";t.r(a);t("E5k/");var n=t("q1tI"),o=t.n(n),r=t("ofer"),l=t("tRbT"),i=t("30+C"),c=t("oa/T"),d=t("ZGBi"),s=t("UhlP"),p=t("bzer"),u=t("Ruab"),b=t("ExZL"),m=t("9Dj+"),h=t("H8eV"),g={data:{bins:["16-18","18-25","25-35","35-50","50-65","65-∞"],counts:[{label:"Background",data:[[0,2600,5100,9700,8400,6700],[0,2100,4700,8700,4900,1400]]},{label:"Foreground",data:[[0,2600,5100,9700,8400,6700],[0,2100,4700,8700,4900,1400]]}]},axis:{x:{numberFormat:".2s",scale:"LINEAR",ticks:4},y:{ticks:3,tickSize:0}},splitBins:["Male","Female"],bar:{grouped:{paddingInner:.1,paddingOuter:0},paddingInner:.1,paddingOuter:0,overlayMargin:10,hover:{lighten:.1}},center:!0,delay:0,duration:400,grid:t("5++N").e,groupLayout:p.a.OVERLAID};function f(e,a){switch(a.type){case"SET_SHOW_PERCENTAGES":return Object.assign({},e,{showBinPercentages:a.show})}return e}a.default=function(){var e=Object(n.useReducer)(f,g),a=e[0],t=e[1],p=o.a.createElement(u.a,Object.assign({},a,{width:"600"}));return o.a.createElement(m.a,null,o.a.createElement(h.a,{title:"Line Chart",description:""}),o.a.createElement(r.a,{variant:"h2"},"Tornado Chart"),o.a.createElement("div",null,o.a.createElement(l.a,{container:!0,spacing:10},o.a.createElement(l.a,{item:!0,xs:6},o.a.createElement(i.a,null,o.a.createElement(c.a,null,p)),o.a.createElement("br",null),o.a.createElement(i.a,null,o.a.createElement(c.a,null,o.a.createElement(b.a,{component:p})))),o.a.createElement(l.a,{item:!0,xs:6},o.a.createElement(d.a,{control:o.a.createElement(s.a,{checked:a.showBinPercentages,color:"primary",onChange:function(e,a){t({type:"SET_SHOW_PERCENTAGES",show:a})}}),label:"Show points"})),o.a.createElement(l.a,{item:!0,xs:6}))))}},UhlP:function(e,a,t){"use strict";var n=t("k1TG"),o=t("aXB2"),r=t("q1tI"),l=t.n(r),i=(t("17x9"),t("iuhU")),c=t("H2TA"),d=t("ye/S"),s=t("NqtD"),p=(t("pJf4"),t("EHdT")),u=(t("wZFJ"),t("VD++")),b=l.a.forwardRef((function(e,a){var t=e.edge,r=void 0!==t&&t,c=e.children,d=e.classes,p=e.className,b=e.color,m=void 0===b?"default":b,h=e.disabled,g=void 0!==h&&h,f=e.disableFocusRipple,k=void 0!==f&&f,y=e.size,v=void 0===y?"medium":y,E=Object(o.a)(e,["edge","children","classes","className","color","disabled","disableFocusRipple","size"]);return l.a.createElement(u.a,Object(n.a)({className:Object(i.a)(d.root,p,"default"!==m&&d["color".concat(Object(s.a)(m))],g&&d.disabled,{small:d["size".concat(Object(s.a)(v))]}[v],{start:d.edgeStart,end:d.edgeEnd}[r]),centerRipple:!0,focusRipple:!k,disabled:g,ref:a},E),l.a.createElement("span",{className:d.label},c))})),m=Object(c.a)((function(e){return{root:{textAlign:"center",flex:"0 0 auto",fontSize:e.typography.pxToRem(24),padding:12,borderRadius:"50%",overflow:"visible",color:e.palette.action.active,transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),"&:hover":{backgroundColor:Object(d.b)(e.palette.action.active,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},"&$disabled":{backgroundColor:"transparent",color:e.palette.action.disabled}},edgeStart:{marginLeft:-12,"$sizeSmall&":{marginLeft:-3}},edgeEnd:{marginRight:-12,"$sizeSmall&":{marginRight:-3}},colorInherit:{color:"inherit"},colorPrimary:{color:e.palette.primary.main,"&:hover":{backgroundColor:Object(d.b)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},colorSecondary:{color:e.palette.secondary.main,"&:hover":{backgroundColor:Object(d.b)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},disabled:{},sizeSmall:{padding:3,fontSize:e.typography.pxToRem(18)},label:{width:"100%",display:"flex",alignItems:"inherit",justifyContent:"inherit"}}}),{name:"MuiIconButton"})(b),h=l.a.forwardRef((function(e,a){var t=e.autoFocus,r=e.checked,c=e.checkedIcon,d=e.classes,s=e.className,u=e.defaultChecked,b=e.disabled,h=e.icon,g=e.id,f=e.inputProps,k=e.inputRef,y=e.name,v=e.onBlur,E=e.onChange,O=e.onFocus,w=e.readOnly,j=e.required,C=e.tabIndex,x=e.type,R=e.value,S=Object(o.a)(e,["autoFocus","checked","checkedIcon","classes","className","defaultChecked","disabled","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"]),$=l.a.useRef(null!=r).current,I=l.a.useState(Boolean(u)),N=I[0],B=I[1],z=$?r:N,P=Object(p.a)(),T=b;P&&void 0===T&&(T=P.disabled);var F="checkbox"===x||"radio"===x;return l.a.createElement(m,Object(n.a)({component:"span",className:Object(i.a)(d.root,s,z&&d.checked,T&&d.disabled),disabled:T,tabIndex:null,role:void 0,onFocus:function(e){O&&O(e),P&&P.onFocus&&P.onFocus(e)},onBlur:function(e){v&&v(e),P&&P.onBlur&&P.onBlur(e)},ref:a},S),l.a.createElement("input",Object(n.a)({autoFocus:t,checked:r,defaultChecked:u,className:d.input,disabled:T,id:F&&g,name:y,onChange:function(e){var a=e.target.checked;$||B(a),E&&E(e,a)},readOnly:w,ref:k,required:j,tabIndex:C,type:x,value:R},f)),z?c:h)})),g=Object(c.a)({root:{padding:9},checked:{},disabled:{},input:{cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}},{name:"PrivateSwitchBase"})(h),f=l.a.forwardRef((function(e,a){var t=e.classes,r=e.className,c=e.color,d=void 0===c?"secondary":c,p=e.disabled,u=void 0!==p&&p,b=e.edge,m=void 0!==b&&b,h=e.size,f=void 0===h?"medium":h,k=Object(o.a)(e,["classes","className","color","disabled","edge","size"]),y=l.a.createElement("span",{className:t.thumb});return l.a.createElement("span",{className:Object(i.a)(t.root,r,{start:t.edgeStart,end:t.edgeEnd}[m],{small:t["size".concat(Object(s.a)(f))]}[f])},l.a.createElement(g,Object(n.a)({type:"checkbox",icon:y,checkedIcon:y,classes:{root:Object(i.a)(t.switchBase,t["color".concat(Object(s.a)(d))]),input:t.input,checked:t.checked,disabled:t.disabled},ref:a,disabled:u},k)),l.a.createElement("span",{className:t.track}))}));a.a=Object(c.a)((function(e){return{root:{display:"inline-flex",width:58,height:38,overflow:"hidden",padding:12,boxSizing:"border-box",position:"relative",flexShrink:0,zIndex:0,verticalAlign:"middle"},edgeStart:{marginLeft:-8},edgeEnd:{marginRight:-8},switchBase:{position:"absolute",top:0,left:0,zIndex:1,color:"light"===e.palette.type?e.palette.grey[50]:e.palette.grey[400],transition:e.transitions.create(["left","transform"],{duration:e.transitions.duration.shortest}),"&$checked":{transform:"translateX(20px)"},"&$disabled":{color:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[800]},"&$checked + $track":{opacity:.5},"&$disabled + $track":{opacity:"light"===e.palette.type?.12:.1}},colorPrimary:{"&$checked":{color:e.palette.primary.main,"&:hover":{backgroundColor:Object(d.b)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[800]},"&$checked + $track":{backgroundColor:e.palette.primary.main},"&$disabled + $track":{backgroundColor:"light"===e.palette.type?e.palette.common.black:e.palette.common.white}},colorSecondary:{"&$checked":{color:e.palette.secondary.main,"&:hover":{backgroundColor:Object(d.b)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:"light"===e.palette.type?e.palette.grey[400]:e.palette.grey[800]},"&$checked + $track":{backgroundColor:e.palette.secondary.main},"&$disabled + $track":{backgroundColor:"light"===e.palette.type?e.palette.common.black:e.palette.common.white}},sizeSmall:{width:40,height:24,padding:7,"& $thumb":{width:16,height:16},"& $switchBase":{padding:4,"&$checked":{transform:"translateX(16px)"}}},checked:{},disabled:{},input:{left:"-100%",width:"300%"},thumb:{boxShadow:e.shadows[1],backgroundColor:"currentColor",width:20,height:20,borderRadius:"50%"},track:{height:"100%",width:"100%",borderRadius:7,zIndex:-1,transition:e.transitions.create(["opacity","background-color"],{duration:e.transitions.duration.shortest}),backgroundColor:"light"===e.palette.type?e.palette.common.black:e.palette.common.white,opacity:"light"===e.palette.type?.38:.3}}}),{name:"MuiSwitch"})(f)},ZGBi:function(e,a,t){"use strict";t("JHok"),t("pJf4");var n=t("k1TG"),o=t("aXB2"),r=t("q1tI"),l=t.n(r),i=(t("17x9"),t("iuhU")),c=t("EHdT"),d=t("H2TA"),s=t("ofer"),p=t("NqtD"),u=l.a.forwardRef((function(e,a){e.checked;var t=e.classes,r=e.className,d=e.control,u=e.disabled,b=(e.inputRef,e.label),m=e.labelPlacement,h=void 0===m?"end":m,g=(e.name,e.onChange,e.value,Object(o.a)(e,["checked","classes","className","control","disabled","inputRef","label","labelPlacement","name","onChange","value"])),f=Object(c.a)(),k=u;void 0===k&&void 0!==d.props.disabled&&(k=d.props.disabled),void 0===k&&f&&(k=f.disabled);var y={disabled:k};return["checked","name","onChange","value","inputRef"].forEach((function(a){void 0===d.props[a]&&void 0!==e[a]&&(y[a]=e[a])})),l.a.createElement("label",Object(n.a)({className:Object(i.a)(t.root,r,"end"!==h&&t["labelPlacement".concat(Object(p.a)(h))],k&&t.disabled),ref:a},g),l.a.cloneElement(d,y),l.a.createElement(s.a,{component:"span",className:Object(i.a)(t.label,k&&t.disabled)},b))}));a.a=Object(d.a)((function(e){return{root:{display:"inline-flex",alignItems:"center",cursor:"pointer",verticalAlign:"middle",WebkitTapHighlightColor:"transparent",marginLeft:-11,marginRight:16,"&$disabled":{cursor:"default"}},labelPlacementStart:{flexDirection:"row-reverse",marginLeft:16,marginRight:-11},labelPlacementTop:{flexDirection:"column-reverse",marginLeft:16},labelPlacementBottom:{flexDirection:"column",marginLeft:16},disabled:{},label:{"&$disabled":{color:e.palette.text.disabled}}}}),{name:"MuiFormControlLabel"})(u)}}]);
//# sourceMappingURL=component---src-pages-tornado-tsx-5e04e6c7d0046a157f27.js.map