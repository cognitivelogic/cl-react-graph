(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{265:function(t,e,a){"use strict";a.r(e);a(53);var n=a(0),i=a.n(n),r=a(289),s=a(301),o=a(293),c=a(290),l=a(310),d=Object.assign({},l.c,{counts:[Object.assign({},l.c.counts[0],{data:[7,6,5,4,3,2,1],label:"Data 2"})],title:"Plot 2"});e.default=function(){return i.a.createElement(o.a,null,i.a.createElement(c.a,{title:"Joy Plot",description:""}),i.a.createElement(r.n,{variant:"h2"},"Joy Plot"),i.a.createElement("div",null,i.a.createElement(r.g,{container:!0,spacing:24},i.a.createElement(r.g,{item:!0,xs:6},i.a.createElement(r.c,null,i.a.createElement(r.d,null,i.a.createElement(s.a,{data:[l.c,d],colorScheme:["rgba(0, 0, 0, 0.5)","#666"],width:400,height:400})))))))}},275:function(t,e,a){"use strict";e.a=["#4bbcad","#d54539","#5ab94d","#8a5cd3","#a4b243","#ba5ccd","#54995c","#cf47a1","#d29f3e","#5c6fda","#c36528","#5fa6dc","#d74770","#7d7430","#8a529e","#df9273","#5f74b8","#ac5450","#d192d7","#b26088"]},277:function(t,e,a){"use strict";a(83),a(332),a(128);e.a=function(t,e){return Object.keys(e).forEach(function(a){t.attr(a,e[a])}),t}},278:function(t,e,a){"use strict";a.d(e,"b",function(){return i});var n=a(270);e.a={fx:{in:function(t){t.style("left",n.a.pageX+"px").style("top",n.a.pageY-55+"px"),t.transition().duration(200).style("opacity",.9)},move:function(t){t.style("left",n.a.pageX+"px").style("top",n.a.pageY-55+"px")},out:function(t){t.transition().duration(100).style("opacity",0)}}};var i=function(t,e){return e&&e.remove(),(e=Object(n.d)(t).append("div").attr("class","tooltip top").style("opacity",0)).append("div").attr("class","tooltip-arrow"),{tipContainer:e,tipContent:e.append("div").attr("class","tooltip-inner")}}},281:function(t,e,a){"use strict";a.d(e,"b",function(){return d});var n=a(0),i=a.n(n),r=a(1),s=a.n(r),o=a(54),c=a.n(o);a.d(e,"a",function(){return c.a});a(283);var l=i.a.createContext({}),d=function(t){return i.a.createElement(l.Consumer,null,function(e){return t.data||e[t.query]&&e[t.query].data?(t.render||t.children)(t.data?t.data.data:e[t.query].data):i.a.createElement("div",null,"Loading (StaticQuery)")})};d.propTypes={data:s.a.object,query:s.a.string.isRequired,render:s.a.func,children:s.a.func}},283:function(t,e,a){var n;t.exports=(n=a(295))&&n.default||n},287:function(t,e,a){"use strict";a(315);var n=a(342);e.a=function(t){return t.filter(function(t){try{var e=n(t),a=e.hsl().array();if(a.length>3)return!1;var i=e.luminosity();return i<.8&&i>.1&&a[2]<200&&a[2]>20}catch(r){return!1}}).filter(function(t,e,a){return a.indexOf(t)===e}).sort(function(){return Math.random()-.5})}},290:function(t,e,a){"use strict";var n=a(297),i=a(1),r=a.n(i),s=a(0),o=a.n(s),c=a(325),l=a.n(c);function d(t){var e=t.description,a=t.lang,i=t.meta,r=t.keywords,s=t.title,c=n.data.site,d=e||c.siteMetadata.description;return o.a.createElement(l.a,{htmlAttributes:{lang:a},title:s,titleTemplate:"%s | "+c.siteMetadata.title,meta:[{content:d,name:"description"},{content:s,property:"og:title"},{content:d,property:"og:description"},{content:"website",property:"og:type"},{content:"summary",name:"twitter:card"},{content:c.siteMetadata.author,name:"twitter:creator"},{content:s,name:"twitter:title"},{content:d,name:"twitter:description"}].concat(r.length>0?{content:r.join(", "),name:"keywords"}:[]).concat(i)})}d.defaultProps={keywords:[],lang:"en",meta:[]},d.propTypes={description:r.a.string,keywords:r.a.arrayOf(r.a.string),lang:r.a.string,meta:r.a.array,title:r.a.string.isRequired},e.a=d},293:function(t,e,a){"use strict";var n=a(294),i=(a(324),a(281)),r=a(1),s=a.n(r),o=a(0),c=a.n(o),l=a(289),d=function(t){var e=t.siteTitle;return c.a.createElement(l.a,{position:"static"},c.a.createElement(l.m,null,c.a.createElement(l.n,{variant:"h6",color:"inherit"},c.a.createElement(i.a,{to:"/"},e)),c.a.createElement(l.b,null,c.a.createElement(i.a,{to:"histogram"},"Histogram")),c.a.createElement(l.b,null,c.a.createElement(i.a,{to:"line"},"Line Chart")),c.a.createElement(l.b,null,c.a.createElement(i.a,{to:"pie"},"Pie Chart")),c.a.createElement(l.b,null,c.a.createElement(i.a,{to:"joyplot"},"Joy Plot"))))};d.propTypes={siteTitle:s.a.string},d.defaultProps={siteTitle:""};var u=d,h=function(t){var e=t.children;return c.a.createElement(i.b,{query:"755544856",render:function(t){return c.a.createElement(c.a.Fragment,null,c.a.createElement(u,{siteTitle:t.site.siteMetadata.title}),c.a.createElement("div",{style:{flexGrow:2,margin:"0 auto",padding:"0px 1.0875rem 1.45rem",paddingTop:0,width:"100%"}},c.a.createElement("main",null,e)),c.a.createElement("footer",null,"© ",(new Date).getFullYear(),", Built by"," ",c.a.createElement("a",{href:"https://www.infosum.com"},"InfoSum")))},data:n})};h.propTypes={children:s.a.node.isRequired};e.a=h},294:function(t){t.exports={data:{site:{siteMetadata:{title:"Infosum Charts"}}}}},295:function(t,e,a){"use strict";a.r(e);a(53);var n=a(0),i=a.n(n),r=a(1),s=a.n(r),o=a(85),c=a(4),l=function(t){var e=t.location,a=c.default.getResourcesForPathnameSync(e.pathname);return i.a.createElement(o.a,Object.assign({location:e,pageResources:a},a.json))};l.propTypes={location:s.a.shape({pathname:s.a.string.isRequired}).isRequired},e.default=l},297:function(t){t.exports={data:{site:{siteMetadata:{title:"Infosum Charts",description:"Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.",author:"@gatsbyjs"}}}}},301:function(t,e,a){"use strict";a(291),a(53);var n=a(82),i=a.n(n),r=a(10),s=a.n(r),o=a(284),c=a(0),l=a(55),d=(a(298),a(128),a(83),a(343),a(130),a(344),a(285),a(282)),u=a(279),h=a(276),f=a(270),p=a(274),g=a(288),m=a(275),b=a(277),y=a(278),x=function(){var t,e,a,n,i,r=Object(h.a)(),s=Object(h.b)(),o=Object(h.a)(),c=Object(h.a)();var l={axis:{x:{height:20,label:"",margin:10,style:{fill:"none","shape-rendering":"crispEdges",stroke:"#666","stroke-opacity":1,"stroke-width":1},text:{style:{fill:"#666"}}},y:{label:"",style:{fill:"none","shape-rendering":"crispEdges",stroke:"#666","stroke-opacity":1,"stroke-width":1},text:{style:{fill:"#666"}},ticks:10,width:25}},bar:{groupMargin:0,margin:0,width:50},className:"histogram-d3",colorScheme:m.a,data:[{bins:[],counts:[]}],delay:0,domain:{max:null,min:null},duration:400,grid:{x:{style:{fill:"none",stroke:"#bbb","stroke-opacity":.7,"stroke-width":1},ticks:5,visible:!0},y:{style:{fill:"none",stroke:"#bbb","stroke-opacity":.7,"stroke-width":1},ticks:5,visible:!0}},height:200,margin:{left:5,top:5},stroke:{color:"#005870",dasharray:"",linecap:"butt",width:0},tip:y.a,tipContainer:"body",tipContentFn:function(t,e,a,n){return n+": "+t[e]+"<br />"+a},visible:{},width:200};return{create:function(e,a){void 0===a&&(a={}),this.mergeProps(a),this._makeSvg(e),this.makeGrid(n),this.makeScales(),this.containers=n.data.map(function(e,a){return t.append("g").attr("class","histogram-container-"+a)}),this.update(e,n)},mergeProps:function(t){(n=p(l,t)).data=t.data,t.colorScheme&&(n.colorScheme=t.colorScheme)},_makeSvg:function(i){if(t){t.selectAll("svg > *").remove(),t.remove();var r=i.getElementsByTagName("svg");r.length>0&&i.removeChild(r[0])}var s=n,o=s.margin,c=s.width,l=s.height,d=s.className;t=Object(f.d)(i).append("svg").attr("class",d).attr("width",c).attr("height",l).attr("viewBox","0 0 "+c+" "+l).append("g").attr("transform","translate("+o.left+","+o.top+")");var u=Object(y.b)(n.tipContainer,e);a=u.tipContent,e=u.tipContainer},valuesCount:function(t){return t.reduce(function(t,e){return e.data.length>t?e.data.length:t},0)},appendDomainRange:function(t,e){var a=[],i=n.domain,s=e.reduce(function(t,e){var a=e.reduce(function(t,e){return[].concat(t,e.map(function(t){return t.value}))},[]);return[].concat(t,a)},[0]),o=Object(d.a)(s,function(t){return t});a[1]=i&&i.hasOwnProperty("max")&&null!==i.max?i.max:o[1],a[0]=i&&i.hasOwnProperty("min")&&null!==i.min?i.min:o[0];var c=[r.bandwidth(),0];t.range(c).domain(a)},yAxisWidth:function(){var t=n.axis;return""===t.y.label?t.y.width:t.y.width+30},xAxisHeight:function(){var t=n.axis;return""===t.x.label?t.x.height:t.x.height+30},makeScales:function(){var e=n,a=e.axis,i=e.margin,r=e.height,s=e.width;this.xAxis=t.append("g").attr("class","x-axis"),this.yAxis=t.append("g").attr("class","y-axis"),""!==a.x.label&&t.append("text").attr("class","x-axis-label").attr("transform","translate("+Number(s)/2+" ,"+(r-this.xAxisHeight()-2*i.left+10+a.x.margin)+")").style("text-anchor","middle").text(a.x.label),""!==a.y.label&&t.append("text").attr("class","y-axis-label").attr("transform","translate(0, -"+this.gridHeight()+")rotate(-90)").attr("y",0-i.left).attr("x",0-(r/2-2*i.top)).attr("dy","1em").style("text-anchor","middle").text(a.y.label)},getBins:function(){return n.data.reduce(function(t,e){return Array.from(new Set(t.concat(e.bins)))},[])},_drawScales:function(e){var a,l=this,d=n,h=(d.bar,d.domain,d.margin),f=(d.width,d.height),p=d.axis,m=e.reduce(function(t,e){var a=l.valuesCount(e.counts);return a>t?a:t},0),y=this.gridWidth(),x=e[0].counts.map(function(t){return t.label}),v=this.getBins();o.domain(v).rangeRound([0,y]).paddingInner(this.groupedMargin()),c.domain(x).rangeRound([0,o.bandwidth()]).paddingInner(this.barMargin()),a=Object(u.a)(o);var k=g(p,"x.tickSize",void 0);void 0!==k?a.tickSize(k):y/m<10&&a.tickValues(o.domain().filter(function(t,e){return!(e%10)})),this.xAxis.attr("transform","translate("+(this.yAxisWidth()+p.y.style["stroke-width"])+","+(f-this.xAxisHeight()-2*h.left)+")").call(a);var w=e.map(function(t){return t.title}),E=[f-2*h.top-this.xAxisHeight(),0];r.domain(w).rangeRound(E),this.appendDomainRange(s,i);var A=Object(u.b)(r).ticks(p.y.ticks),O=g(p,"y.tickSize",void 0);void 0!==O&&A.tickSize(O),this.yAxis.attr("transform","translate("+this.yAxisWidth()+", 0)").transition().call(A);Object.assign({},p.x.text.style),Object.assign({},p.y.text.style);Object(b.a)(t.selectAll(".y-axis .domain, .y-axis .tick line"),p.y.style),Object(b.a)(t.selectAll(".y-axis .tick text"),p.y.text.style),Object(b.a)(t.selectAll(".x-axis .domain, .x-axis .tick line"),p.x.style),Object(b.a)(t.selectAll(".x-axis .tick text"),p.x.text.style)},gridWidth:function(){var t=n,e=(t.axis,t.width),a=t.margin;return Number(e)-2*a.left-this.yAxisWidth()},gridHeight:function(){var t=n,e=t.height,a=t.margin;t.axis;return e-2*a.top-this.xAxisHeight()},groupedMargin:function(){var t=g(n.bar,"groupMargin",.1);return t>=0&&t<=1?t:0},barMargin:function(){var t=g(n.bar,"margin",0);return t>=0&&t<=1?t:.1},barWidth:function(){return c.bandwidth()},updateChart:function(t){var i=this,l=this.getBins(),d=n,u=(d.height,d.width,d.margin,d.bar,d.delay),f=d.duration,p=d.axis,g=d.stroke,m=d.tip,b=d.tipContentFn,y=this.barWidth(),x=Object(h.d)(n.colorScheme),v=Object(h.d)(["#FFF"]),k=this.yAxisWidth();this.groupedMargin(),t.reduce(function(t,e){var a=e.reduce(function(t,e){return e.length>t?e.length:t},0);return a>t?a:t},0);t.forEach(function(t,d){var h=n.data[d].title,w=i.containers[d].selectAll("g").data(t),E=w.enter().append("g").merge(w).attr("transform",function(t){return"translate("+(k+p.y.style["stroke-width"]+o(t[0].label))+", "+r(t[0].joyLabel)+")"}).selectAll("rect").data(function(t){return t});E.enter().append("rect").attr("height",0).attr("y",function(t){return r.bandwidth()}).attr("class","bar").attr("x",function(t){return c(t.groupLabel)}).attr("width",function(t){return y}).attr("fill",function(t,e){return x(e)}).on("mouseover",function(t){var n=l.findIndex(function(e){return e===t.label});a.html(function(){return b(l,n,t.value,h)}),m.fx.in(e)}).on("mousemove",function(){return m.fx.move(e)}).on("mouseout",function(){return m.fx.out(e)}).merge(E).transition().duration(f).delay(u).attr("y",function(t){return s(t.value)}).attr("stroke",function(t,e){if(v)return v(e)}).attr("shape-rendering","crispEdges").attr("stroke-width",g.width).attr("stroke-linecap",g.linecap).attr("stroke-dasharray",function(t){var e=r.bandwidth()-s(t.value);return y+" 0 "+e+" "+y}).attr("height",function(t){return r.bandwidth()-s(t.value)}),w.exit().remove()})},makeGrid:function(e){e.grid;this.gridX=t.append("g").attr("class","grid gridX"),this.gridY=t.append("g").attr("class","grid gridY")},_drawGrid:function(){var t=this,e=n,a=e.data,i=e.height,s=e.width,c=e.axis,l=e.grid,d=e.margin,h=(e.bar,a.reduce(function(e,a){var n=t.valuesCount(a.counts);return n>e?e:n},0)),f=c.y.style["stroke-width"],p=this.yAxisWidth()+f,m=this.gridHeight();l.x.visible&&(this.gridX.attr("transform","translate("+p+", "+m+")"),this.gridX.call(function(t){return void 0===t&&(t=5),Object(u.a)(o).ticks(t)}(g(l,"x.ticks",h)).tickSize(-i+this.xAxisHeight()+2*d.top).tickFormat(function(){return""})),Object(b.a)(this.gridX.selectAll(".tick line"),l.x.style),Object(b.a)(this.gridX.selectAll(".domain"),{stroke:"transparent"})),l.y.visible&&(this.gridY.attr("transform","translate("+(this.yAxisWidth()+f)+", 0)").transition().call(function(t){return void 0===t&&(t=5),Object(u.b)(r).ticks(t)}(g(l,"y.ticks",h)).tickSize(-s+2*d.left+this.yAxisWidth()).tickFormat(function(){return""})),Object(b.a)(this.gridY.selectAll(".tick line"),l.y.style),this.gridY.selectAll(".gridY .tick line").filter(function(t,e){return 0===e}).attr("display","none"),Object(b.a)(this.gridY.selectAll(".domain"),{stroke:"transparent"}))},update:function(t,e){if(n.data){this.mergeProps(e);var a=n,r=a.data,s=a.visible;i=r.map(function(t){var e=[];return t.counts.forEach(function(a){a.data.forEach(function(n,i){e[i]||(e[i]=[]),e[i].push({groupLabel:a.label,joyLabel:t.title,label:t.bins[i],value:!1!==s[t.bins[i]]&&!1!==s[a.label]?n:0})})}),e}),this._drawScales(n.data),this._drawGrid(),this.updateChart(i)}},destroy:function(e){t.selectAll("svg > *").remove()}}},v=function(t){function e(e){var a;return(a=t.call(this,e)||this).chart=x(),a.state={parentWidth:300},a}s()(e,t);var a=e.prototype;return a.handleResize=function(){var t=this,e=this.getDOMNode(),a=this.ref&&this.ref.offsetWidth?this.ref.offsetWidth:0;this.setState({parentWidth:a},function(){return t.chart.create(e,t.getChartState())})},a.componentDidMount=function(){var t=this;this.chart.create(this.getDOMNode(),this.getChartState()),"100%"===this.props.width&&(window.addEventListener("resize",function(e){return t.handleResize()}),this.handleResize())},a.componentDidUpdate=function(){this.chart.update(this.getDOMNode(),this.getChartState())},a.getChartState=function(){var t=this.props.width,e=this.props,a=(e.children,i()(e,["children"]));return"100%"===t&&(t=this.state.parentWidth||300),Object.assign({},a,{width:t})},a.componentWillUnmount=function(){"100%"===this.props.width&&window.removeEventListener("resize",this.handleResize),this.chart.destroy(this.getDOMNode())},a.getDOMNode=function(){return l.findDOMNode(this.ref)},a.render=function(){var t=this;return c.createElement("div",{ref:function(e){return t.ref=e},className:"histogram-chart-container"})},e}(c.Component);v.defaultProps={axis:{},bar:{margin:0,width:10},grid:{x:{style:{fill:"none",stroke:"#bbb","stroke-opacity":.7,"stroke-width":1},ticks:5,visible:!0},y:{style:{fill:"none",stroke:"#bbb","stroke-opacity":.7,"stroke-width":1},ticks:5,visible:!0}},height:200,margin:{left:5,top:5},stroke:{color:function(t,e,a){return Object(o.f)(a(e)).darker(1).toString()},width:1},width:"100%"};e.a=v},310:function(t,e,a){"use strict";a.d(e,"d",function(){return i}),a.d(e,"b",function(){return r}),a.d(e,"c",function(){return s}),a.d(e,"a",function(){return o}),a.d(e,"e",function(){return c});var n=a(287),i={x:{style:{stroke:"#eeAA00","stroke-opacity":.4},ticks:5},y:{height:20,style:{"stroke-opacity":.4},ticks:5}},r={bins:["Data 1","Data 6","Data 3","Dat 4"],counts:[{data:[1,2,3,4],label:"DataSet 1"},{data:[13,14,15,16],label:"DataSet 2"}],grid:i},s={bins:["bin 1","bin 2","bin 3 with a long name","bin 4","bin 5","bin 6","bin 7"],counts:[{borderColors:["red"],data:[1,2,3,4,5,6,7],label:"Data 1"}],title:"Plot 1"},o={x:{height:20,label:"X Axis",margin:20,text:{style:{dy:".35em","text-anchor":"start",transform:"rotate(90)",x:0,y:0}},tickSize:0},y:{label:"Y Axis!",style:{fill:"none",stroke:"#eeAA00"},text:{style:{fill:"#eeAA00"}},tickSize:20,ticks:3,width:50}},c=Object(n.a)(["rgba(255, 113, 1, 0.5)","#fff6ef","rgba(0, 169, 123, 0.5)","#f6fffd","#D7263D","rgba(215, 38, 61, 0.05)","#0f2629","#ededed","rgba(86, 180, 191, 0.5)","#f5fbfb","#000000","#0f2629","#D7263D","#FBD7D9","#ffebec","#963540","#22545a","#56b4bf","#56b4bf","#56b4bf","#FF7101","#449098","#77c3cb","#d4eef8","#ff7101","#FF7101","#cc5a00","#ff8d33","#fef9e5","#7d5d2e","#00a97b","#008762","#33ba95","#dbf1d6","#227839","#0f5e7b","#d4eef8","#0f5e7b","#F9C80E","#007656","#c5e5e9","#f9c80e","#a9a9a9","#dbdbdb","#cccccc","#e6e6e6","#56b4bf","#449098","#77c3cb","#22545a","#ff7101","#cdcdcd","#ffffff","#d7263d","#00a97b","#888888","#e6e6e6","#f2f2f2","#f4f4f4"])}}]);
//# sourceMappingURL=component---src-pages-joyplot-tsx-18a0e382b90b755e7ff4.js.map