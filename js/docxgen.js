(function(){var n,o,l;l="undefined"!=typeof global&&null!==global?global:window,o="undefined"!=typeof global&&null!==global?"node":"browser",n=n=function(){function n(){}return n.prototype.initialize=function(){return this.inForLoop=!1},n}(),l.TemplaterState=n}).call(this);
(function(){var t,e,i,l=[].indexOf||function(t){for(var e=0,i=this.length;i>e;e++)if(e in this&&this[e]===t)return e;return-1};i="undefined"!=typeof global&&null!==global?global:window,e="undefined"!=typeof global&&null!==global?"node":"browser",i.DocxGen=t=function(){function t(t,e,i,l,n,s){this.templateVars=null!=e?e:{},this.intelligentTagging=null!=i?i:!0,this.qrCode=null!=l?l:!1,this.localImageCreator=n,this.finishedCallback=s,null==this.finishedCallback&&(this.finishedCallback=function(){return console.log("document ready!")}),null==this.localImageCreator&&(this.localImageCreator=function(t,e){var i;return i=JSZipBase64.decode("iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAIAAABvSEP3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACXSURBVDhPtY7BDYAwDAMZhCf7b8YMxeCoatOQJhWc/KGxT2zlCyaWcz8Y+X7Bs1TFVJSwIHIYyFkQufWIRVX9cNJyW1QpEo4rixaEe7JuQagAUctb7ZFYFh5MVJPBe84CVBnB42//YsZRgKjFDBVg3cI9WbRwXLktQJX8cNIiFhM1ZuTWk7PIYSBhkVcLzwIiCjCxhCjlAkBqYnqFoQQ2AAAAAElFTkSuQmCC"),e(i)}),this.templatedFiles=["word/document.xml","word/footer1.xml","word/footer2.xml","word/footer3.xml","word/header1.xml","word/header2.xml","word/header3.xml"],this.filesProcessed=0,this.qrCodeNumCallBack=0,this.qrCodeWaitingFor=[],null!=t&&this.load(t)}var i;return i=["gif","jpeg","jpg","emf","png"],t.prototype.qrCodeCallBack=function(t,e){var i;return null==e&&(e=!0),e===!0?this.qrCodeWaitingFor.push(t):e===!1&&(i=this.qrCodeWaitingFor.indexOf(t),this.qrCodeWaitingFor.splice(i,1)),this.testReady()},t.prototype.testReady=function(){return 0===this.qrCodeWaitingFor.length&&this.filesProcessed===this.templatedFiles.length?(this.ready=!0,this.finishedCallback()):void 0},t.prototype.logUndefined=function(t){return console.log("undefinedTag:"+t)},t.prototype.load=function(t){return this.zip=new JSZip(t),this.loadImageRels()},t.prototype.loadImageRels=function(){var t,e,i;return e=DocUtils.decode_utf8(this.zip.files["word/_rels/document.xml.rels"].data),this.xmlDoc=DocUtils.Str2xml(e),t=function(){var t,e,l,n;for(l=this.xmlDoc.getElementsByTagName("Relationship"),n=[],t=0,e=l.length;e>t;t++)i=l[t],n.push(parseInt(i.getAttribute("Id").substr(3)));return n}.call(this),this.maxRid=t.max(),this.imageRels=[],this},t.prototype.addExtensionRels=function(t,e){var i,l,n,s,a,o,r,h,p;for(l=DocUtils.decode_utf8(this.zip.files["[Content_Types].xml"].data),r=DocUtils.Str2xml(l),i=!0,n=r.getElementsByTagName("Default"),h=0,p=n.length;p>h;h++)a=n[h],a.getAttribute("Extension")===e&&(i=!1);return i?(o=r.getElementsByTagName("Types")[0],s=r.createElement("Default"),s.namespaceURI=null,s.setAttribute("ContentType",t),s.setAttribute("Extension",e),o.appendChild(s),this.zip.files["[Content_Types].xml"].data=DocUtils.encode_utf8(DocUtils.xml2Str(r))):void 0},t.prototype.addImageRels=function(t,e){var i,l,n,s;if(null!=this.zip.files["word/media/"+t])throw"file already exists";return this.maxRid++,l={name:"word/media/"+t,data:e,options:{base64:!1,binary:!0,compression:null,date:new Date,dir:!1}},this.zip.file(l.name,l.data,l.options),i=t.replace(/[^.]+\.([^.]+)/,"$1"),this.addExtensionRels("image/"+i,i),s=this.xmlDoc.getElementsByTagName("Relationships")[0],n=this.xmlDoc.createElement("Relationship"),n.namespaceURI=null,n.setAttribute("Id","rId"+this.maxRid),n.setAttribute("Type","http://schemas.openxmlformats.org/officeDocument/2006/relationships/image"),n.setAttribute("Target","media/"+t),s.appendChild(n),this.zip.files["word/_rels/document.xml.rels"].data=DocUtils.encode_utf8(DocUtils.xml2Str(this.xmlDoc)),this.maxRid},t.prototype.getImageByRid=function(t){var e,i,l,n,s,a;for(n=this.xmlDoc.getElementsByTagName("Relationship"),s=0,a=n.length;a>s;s++)if(l=n[s],e=l.getAttribute("Id"),t===e&&(i=l.getAttribute("Target"),"media/"===i.substr(0,6)))return this.zip.files["word/"+i];return null},t.prototype.getImageList=function(){var t,e,n,s;s=/[^.]+\.([^.]+)/,e=[];for(n in this.zip.files)t=n.replace(s,"$1"),l.call(i,t)>=0&&e.push({path:n,files:this.zip.files[n]});return e},t.prototype.setImage=function(t,e){return this.zip.files[t].data=e},t.prototype.applyTemplateVars=function(t,e){var i,l,n,s,a,o,r,h;for(this.templateVars=null!=t?t:this.templateVars,null==e&&(e=null),r=this.templatedFiles,n=0,a=r.length;a>n;n++)l=r[n],null==this.zip.files[l]&&this.filesProcessed++;for(h=this.templatedFiles,s=0,o=h.length;o>s;s++)l=h[s],null!=this.zip.files[l]&&(i=new DocXTemplater(this.zip.files[l].data,this,this.templateVars,this.intelligentTagging,[],{},0,e,this.localImageCreator),this.zip.files[l].data=i.applyTemplateVars().content,this.filesProcessed++);return this.testReady()},t.prototype.getTemplateVars=function(){var t,e,i,l,n,s,a;for(l=[],a=this.templatedFiles,n=0,s=a.length;s>n;n++)e=a[n],null!=this.zip.files[e]&&(t=new DocXTemplater(this.zip.files[e].data,this,this.templateVars,this.intelligentTagging),i=t.applyTemplateVars().usedTemplateVars,DocUtils.sizeOfObject(i)&&l.push({fileName:e,vars:i}));return l},t.prototype.setTemplateVars=function(t){return this.templateVars=t,this},t.prototype.output=function(t,i){var l;return null==t&&(t=!0),null==i&&(i="output.docx"),this.calcZip(),l=this.zip.generate(),t&&("node"===e?fs.writeFile(process.cwd()+"/"+i,l,"base64",function(t){if(t)throw t;return console.log("file Saved")}):document.location.href="data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,"+l),l},t.prototype.calcZip=function(){var t,e,i;i=new JSZip;for(e in this.zip.files)t=this.zip.files[e],i.file(t.name,t.data,t.options);return this.zip=i},t.prototype.getFullText=function(t,e){var i;return null==t&&(t="word/document.xml"),null==e&&(e=""),i=""===e?new DocXTemplater(this.zip.files[t].data,this,this.templateVars,this.intelligentTagging):new DocXTemplater(e,this,this.templateVars,this.intelligentTagging),i.getFullText()},t.prototype.download=function(t,e,i){var l;return null==i&&(i="default.docx"),this.calcZip(),l=this.zip.generate(),Downloadify.create("downloadify",{filename:function(){return i},data:function(){return l},onCancel:function(){return alert("You have cancelled the saving of this file.")},onError:function(){return alert("You must put something in the File Contents or there will be nothing to save!")},swf:t,downloadImage:e,width:100,height:30,transparent:!0,append:!1,dataType:"base64"})},t}()}).call(this);
(function(){var e,n,t=[].slice;n="undefined"!=typeof global&&null!==global?global:window,e="undefined"!=typeof global&&null!==global?"node":"browser",n.DocUtils={},n.docX=[],n.docXData=[],DocUtils.nl2br=function(e){return(e+"").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,"$1<br>$2")},DocUtils.config={baseNodePath:"../../examples/",baseClientPath:"../examples/"},DocUtils.loadDoc=function(t,o,r,l,i,s){var a,c,u,f,d,g,p,h,m,b,y,D;if(null==o&&(o=!1),null==r&&(r=!1),null==l&&(l=!1),null==i&&(i=null),null==s&&(s=null),console.log("loading Doc:"+t),null==t)throw"path not defined";if(-1!==t.indexOf("/")?(b=t,f=b):(f=t,null===s&&(s="browser"===e?DocUtils.config.baseClientPath:DocUtils.config.baseNodePath),b=s+t),g=function(e){return n.docXData[f]=e,o===!1&&(n.docX[f]=new DocxGen(e,{},r)),null!=i&&i(!1),l===!1?n.docXData[f]:void 0},"browser"===e)D=new XMLHttpRequest,D.open("GET",b,l),D.overrideMimeType&&D.overrideMimeType("text/plain; charset=x-user-defined"),D.onreadystatechange=function(){if(4===this.readyState){if(200===this.status)return g(this.response);if(console.log("error loading doc"),null!=i)return i(!0)}},D.send();else if(d=new RegExp("(https?)","i"),d.test(t)){switch(console.log("http(s) url matched:"+t),y=url.parse(t),p={hostname:y.hostname,path:y.path,method:"GET",rejectUnauthorized:!1},u=function(e){return console.log("Error: \n"+e.message),console.log(e.stack)},m=function(e){var n;return e.setEncoding("binary"),n="",e.on("data",function(t){return console.log("Status Code "+e.statusCode),console.log("received"),n+=t}),e.on("end",function(){return console.log("receivedTotally"),g(n)}),e.on("error",function(e){return console.log("Error during HTTP request"),console.log(e.message),console.log(e.stack)})},y.protocol){case"https:":h=https.request(p,m).on("error",u);break;case"http:":h=http.request(p,m).on("error",u)}h.end()}else if(l===!0)fs.readFile(b,"binary",function(e,n){if(e){if(null!=i)return i(!0)}else if(g(n),null!=i)return i(!1)});else{console.log("loading async:"+b);try{a=fs.readFileSync(b,"binary"),g(a),null!=i&&i(!1)}catch(x){c=x,null!=i&&i(!0)}}return f},DocUtils.clone=function(e){var n,t,o;if(null==e||"object"!=typeof e)return e;if(e instanceof Date)return new Date(e.getTime());if(e instanceof RegExp)return n="",null!=e.global&&(n+="g"),null!=e.ignoreCase&&(n+="i"),null!=e.multiline&&(n+="m"),null!=e.sticky&&(n+="y"),new RegExp(e.source,n);o=new e.constructor;for(t in e)o[t]=DocUtils.clone(e[t]);return o},DocUtils.xml2Str=function(e){var n,t,o;if(void 0===e)throw"xmlNode undefined!";try{"undefined"!=typeof global&&null!==global?(n=new XMLSerializer,t=n.serializeToString(e)):t=(new XMLSerializer).serializeToString(e)}catch(r){o=r;try{t=e.xml}catch(r){o=r,console.log("Xmlserializer not supported")}}return t=t.replace(/\x20xmlns=""/g,"")},DocUtils.Str2xml=function(e){var t,o;return n.DOMParser?(t=new DOMParser,o=t.parseFromString(e,"text/xml")):(o=new ActiveXObject("Microsoft.XMLDOM"),o.async=!1,o.loadXML(e)),o},DocUtils.replaceFirstFrom=function(e,n,t,o){return e.substr(0,o)+e.substr(o).replace(n,t)},DocUtils.encode_utf8=function(e){return unescape(encodeURIComponent(e))},DocUtils.decode_utf8=function(e){return decodeURIComponent(escape(e)).replace(new RegExp(String.fromCharCode(160),"g")," ")},DocUtils.base64encode=function(e){return btoa(unescape(encodeURIComponent(e)))},DocUtils.preg_match_all=function(e,n){var o,r;return"object"!=typeof e&&(e=new RegExp(e,"g")),o=[],r=function(){var e,n,r,l,i;return e=arguments[0],r=4<=arguments.length?t.call(arguments,1,i=arguments.length-2):(i=1,[]),n=arguments[i++],l=arguments[i++],r.unshift(e),r.offset=n,o.push(r)},n.replace(e,r),o},DocUtils.sizeOfObject=function(e){var n,t,o;o=0,t=0;for(n in e)o++;return o},Array.prototype.max=function(){return Math.max.apply(null,this)},Array.prototype.min=function(){return Math.min.apply(null,this)}}).call(this);
(function(){var e,t,o;o="undefined"!=typeof global&&null!==global?global:window,t="undefined"!=typeof global&&null!==global?"node":"browser",e=e=function(){function e(e){this.xmlTemplater=e,this.imgMatches=[]}return e.prototype.findImages=function(){return this.imgMatches=DocUtils.preg_match_all(/<w:drawing[^>]*>.*?<\/w:drawing>/g,this.xmlTemplater.content)},e.prototype.replaceImages=function(){var e,o,m,l,a,r,n,s,i,c,d,g,p,h,x,f,u,w;for(console.log("replacing Images ..."),s=[],e=function(e){return console.log("removing qrcode"),console.log("setting image:word/media/"+e.imgName),e.xmlTemplater.numQrCode--,e.xmlTemplater.DocxGen.setImage("word/media/"+e.imgName,e.data),e.xmlTemplater.DocxGen.qrCodeCallBack(e.num,!1)},u=this.imgMatches,w=[],p=x=0,f=u.length;f>x;p=++x)if(a=u[p],h=DocUtils.Str2xml('<?xml version="1.0" ?><w:document mc:Ignorable="w14 wp14" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas" xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk" xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape">'+a[0]+"</w:document>"),this.xmlTemplater.DocxGen.qrCode)g=h.getElementsByTagNameNS("*","blip")[0],void 0===g&&(console.log("tagRid not defined, trying alternate method"),g=h.getElementsByTagName("a:blip")[0]),void 0!==g?(i=g.getAttribute("r:embed"),n=this.xmlTemplater.DocxGen.getImageByRid(i),null!==n?(d=h.getElementsByTagNameNS("*","docPr")[0],void 0===d&&(console.log("tag not defined, trying alternate method"),d=h.getElementsByTagName("wp:docPr")[0]),void 0!==d?"Copie_"!==d.getAttribute("name").substr(0,6)?(l=("Copie_"+this.xmlTemplater.imageId+".png").replace(/\x20/,""),this.xmlTemplater.DocxGen.qrCodeNumCallBack++,this.xmlTemplater.DocxGen.qrCodeCallBack(this.xmlTemplater.DocxGen.qrCodeNumCallBack,!0),r=this.xmlTemplater.DocxGen.addImageRels(l,""),this.xmlTemplater.imageId++,this.xmlTemplater.DocxGen.setImage("word/media/"+l,n.data),"browser"===t&&(s[p]=new DocxQrCode(n.data,this.xmlTemplater,l,this.xmlTemplater.DocxGen.qrCodeNumCallBack)),d.setAttribute("name",""+l),g.setAttribute("r:embed","rId"+r),console.log("tagrId:"+g.getAttribute("r:embed")),o=h.getElementsByTagNameNS("*","drawing")[0],void 0===o&&(console.log("imagetag not defined, trying alternate method"),o=h.getElementsByTagName("w:drawing")[0]),c=DocUtils.xml2Str(o),this.xmlTemplater.content=this.xmlTemplater.content.replace(a[0],c),this.xmlTemplater.numQrCode++,w.push("browser"===t?s[p].decode(e):/\.png$/.test(n.name)?function(t){return function(o){var m,l,a,r,i;return console.log(n.name),m=JSZipBase64.encode(n.data),l=new Buffer(m,"base64"),i=new PNG(l),r=function(m){var l;try{return i.decoded=m,s[p]=new DocxQrCode(i,t.xmlTemplater,o,t.xmlTemplater.DocxGen.qrCodeNumCallBack),s[p].decode(e)}catch(a){return l=a,console.log(l),t.xmlTemplater.DocxGen.qrCodeCallBack(t.xmlTemplater.DocxGen.qrCodeNumCallBack,!1)}},a=i.decode(r)}}(this)(l):this.xmlTemplater.DocxGen.qrCodeCallBack(this.xmlTemplater.DocxGen.qrCodeNumCallBack,!1))):w.push(void 0):w.push(void 0)):w.push(void 0)):w.push(void 0);else if(null!=this.xmlTemplater.currentScope.img)if(null!=this.xmlTemplater.currentScope.img[p]){if(l=this.xmlTemplater.currentScope.img[p].name,m=this.xmlTemplater.currentScope.img[p].data,null==this.xmlTemplater.DocxGen)throw"DocxGen not defined";r=this.xmlTemplater.DocxGen.addImageRels(l,m),d=h.getElementsByTagNameNS("*","docPr")[0],void 0===d&&(console.log("tag not defined, trying alternate method"),d=h.getElementsByTagName("wp:docPr")[0]),void 0!==d?(this.xmlTemplater.imageId++,d.setAttribute("id",this.xmlTemplater.imageId),d.setAttribute("name",""+l),g=h.getElementsByTagNameNS("*","blip")[0],void 0===g&&(console.log("tagRid not defined, trying alternate method"),g=h.getElementsByTagName("a:blip")[0]),void 0!==g?(g.setAttribute("r:embed","rId"+r),o=h.getElementsByTagNameNS("*","drawing")[0],void 0===o&&(console.log("imagetag not defined, trying alternate method"),o=h.getElementsByTagName("w:drawing")[0]),w.push(this.xmlTemplater.content=this.xmlTemplater.content.replace(a[0],DocUtils.xml2Str(o)))):w.push(void 0)):w.push(void 0)}else w.push(void 0);else w.push(void 0);return w},e}(),o.ImgReplacer=e}).call(this);
(function(){var t,e,l;l="undefined"!=typeof global&&null!==global?global:window,e="undefined"!=typeof global&&null!==global?"node":"browser",t=t=function(){function t(t,e,l,a,r){this.xmlTemplater=e,this.imgName=null!=l?l:"",this.num=a,this.callback=r,this.data=t,this.base64Data=JSZipBase64.encode(this.data),this.ready=!1,this.result=null}return t.prototype.decode=function(t){var l;return this.callback=t,l=this,console.log("qrcode"),this.qr=new QrCode,this.qr.callback=function(){var t;return l.ready=!0,l.result=this.result,console.log("result:"+l.result),t=new l.xmlTemplater.currentClass(this.result,l.xmlTemplater.toJson()),t.applyTemplateVars(),l.result=t.content,l.searchImage()},"browser"===e?this.qr.decode("data:image/png;base64,"+this.base64Data):this.qr.decode(this.data,this.data.decoded)},t.prototype.searchImage=function(){var t,e,l;if("gen:"===this.result.substr(0,4))return t=function(e){return function(l){return e.data=l,e.callback(e,e.imgName,e.num),e.xmlTemplater.DocxGen.localImageCreator(e.result,t)}}(this);if(null===this.result||void 0===this.result||"error decoding QR Code"===this.result.substr(0,22))return this.callback(this,this.imgName,this.num);l=function(t){return function(e){return null==e&&(e=!1),e?(console.log("file image loading failed!"),t.callback(t,t.imgName,t.num)):(t.data=docXData[t.result],t.callback(t,t.imgName,t.num))}}(this);try{return DocUtils.loadDoc(this.result,!0,!1,!1,l)}catch(a){return e=a,console.log(e)}},t}(),l.DocxQrCode=t}).call(this);
(function(){var t,e,s,a=[].slice;s="undefined"!=typeof global&&null!==global?global:window,e="undefined"!=typeof global&&null!==global?"node":"browser",t=t=function(){function t(e,s,a,i,n,r,h,c,o){var l;if(null==e&&(e=""),this.templateVars=null!=a?a:{},this.intelligentTagging=null!=i?i:!1,this.scopePath=null!=n?n:[],this.usedTemplateVars=null!=r?r:{},this.imageId=null!=h?h:0,this.qrcodeCallback=null!=c?c:null,this.localImageCreator=o,null===this.qrcodeCallback&&(this.qrcodeCallback=function(){return this.DocxGen.ready=!0}),this.tagX="",this.currentClass=t,s instanceof DocxGen||null==s?this.DocxGen=s:(l=s,this.templateVars=l.templateVars,this.DocxGen=l.DocxGen,this.intelligentTagging=l.intelligentTagging,this.scopePath=l.scopePath,this.usedTemplateVars=l.usedTemplateVars,this.imageId=l.imageId),"string"!=typeof e)throw"content must be string!";this.load(e),this.numQrCode=0,this.currentScope=this.templateVars,this.templaterState=new TemplaterState}return t.prototype.load=function(t){var e,s,i,n;return this.content=t,this.matches=this._getFullTextMatchesFromData(),this.charactersAdded=function(){var t,s,a;for(a=[],e=t=0,s=this.matches.length;s>=0?s>t:t>s;e=s>=0?++t:--t)a.push(0);return a}.call(this),n=function(t){return function(){var e,s,i,n,r;return e=arguments[0],i=4<=arguments.length?a.call(arguments,1,r=arguments.length-2):(r=1,[]),s=arguments[r++],n=arguments[r++],i.unshift(e),i.offset=s,i.first=!0,t.matches.unshift(i),t.charactersAdded.unshift(0)}}(this),this.content.replace(/^()([^<]+)/,n),i=function(t){return function(){var e,s,i,n,r;return e=arguments[0],i=4<=arguments.length?a.call(arguments,1,r=arguments.length-2):(r=1,[]),s=arguments[r++],n=arguments[r++],i.unshift(e),i.offset=s,i.last=!0,t.matches.push(i),t.charactersAdded.push(0)}}(this),s="(<"+this.tagX+"[^>]*>)([^>]+)$",this.content.replace(new RegExp(s),i)},t.prototype.setUsedTemplateVars=function(t){var e,s,a,i,n,r;for(a=this.usedTemplateVars,r=this.scopePath,e=i=0,n=r.length;n>i;e=++i)s=r[e],null==a[s]&&(a[s]={}),a=a[s];return""!==t?a[t]=!0:void 0},t.prototype.getValueFromTag=function(t,e){var s;if(this.setUsedTemplateVars(t),s="",null!=e[t]?s=DocUtils.encode_utf8(e[t]):(s="undefined",this.DocxGen.logUndefined(t,e)),-1!==s.indexOf("{")||-1!==s.indexOf("}"))throw alert("On ne peut mettre de { ou de } dans le contenu d'une variable"),"On ne peut mettre de { ou de } dans le contenu d'une variable";return s},t.prototype.calcScopeText=function(t,e,s){var a,i,n,r,h,c,o,l,p,d;for(null==e&&(e=0),null==s&&(s=t.length-1),l=DocUtils.preg_match_all("<(/?[^/> ]+)([^>]*)>",t.substr(e,s)),c=[],a=p=0,d=l.length;d>p;a=++p)o=l[a],"/"===o[1][0]?(r=!1,c.length>0&&(h=c[c.length-1],n=h.tag.substr(1,h.tag.length-2),i=o[1].substr(1),n===i&&(r=!0)),r?c.pop():c.push({tag:"<"+o[1]+">",offset:o.offset})):"/"===o[2][o[2].length-1]||c.push({tag:"<"+o[1]+">",offset:o.offset});return c},t.prototype.calcScopeDifference=function(t,e,s){var a;for(null==e&&(e=0),null==s&&(s=t.length-1),a=this.calcScopeText(t,e,s);;){if(a.length<=1)break;if(a[0].tag.substr(2)!==a[a.length-1].tag.substr(1))break;a.pop(),a.shift()}return a},t.prototype.getFullText=function(){var t,e;return this.matches=this._getFullTextMatchesFromData(),e=function(){var e,s,a,i;for(a=this.matches,i=[],e=0,s=a.length;s>e;e++)t=a[e],i.push(t[2]);return i}.call(this),DocUtils.decode_utf8(e.join(""))},t.prototype._getFullTextMatchesFromData=function(){return this.matches=DocUtils.preg_match_all("(<"+this.tagX+"[^>]*>)([^<>]*)?</"+this.tagX+">",this.content)},t.prototype.calcInnerTextScope=function(t,e,s,a){var i,n;if(i=t.indexOf("</"+a+">",s),-1===i)throw"can't find endTag "+i;if(i+=("</"+a+">").length,n=Math.max(t.lastIndexOf("<"+a+">",e),t.lastIndexOf("<"+a+" ",e)),-1===n)throw"can't find startTag";return{text:t.substr(n,i-n),startTag:n,endTag:i}},t.prototype.calcB=function(){var t,e;return e=this.calcStartBracket(this.loopOpen),t=this.calcEndBracket(this.loopClose),{B:this.content.substr(e,t-e),startB:e,endB:t}},t.prototype.calcA=function(){var t,e;return e=this.calcEndBracket(this.loopOpen),t=this.calcStartBracket(this.loopClose),{A:this.content.substr(e,t-e),startA:e,endA:t}},t.prototype.calcStartBracket=function(t){return this.matches[t.start.i].offset+this.matches[t.start.i][1].length+this.charactersAdded[t.start.i]+t.start.j},t.prototype.calcEndBracket=function(t){return this.matches[t.end.i].offset+this.matches[t.end.i][1].length+this.charactersAdded[t.end.i]+t.end.j+1},t.prototype.toJson=function(){return{templateVars:DocUtils.clone(this.templateVars),DocxGen:this.DocxGen,intelligentTagging:DocUtils.clone(this.intelligentTagging),scopePath:DocUtils.clone(this.scopePath),usedTemplateVars:this.usedTemplateVars,localImageCreator:this.localImageCreator,imageId:this.imageId}},t.prototype.forLoop=function(t,e){var s,a,i,n,r,h,c,o,l,p;if(null==t&&(t=""),null==e&&(e=""),""===t&&""===e&&(e=this.calcB().B,t=this.calcA().A,"{"!==e[0]||-1===e.indexOf("{")||-1===e.indexOf("/")||-1===e.indexOf("}")||-1===e.indexOf("#")))throw"no {,#,/ or } found in B: "+e;if(null!=this.currentScope[this.loopOpen.tag]){if("object"==typeof this.currentScope[this.loopOpen.tag]&&(h=this.currentScope[this.loopOpen.tag]),"true"===this.currentScope[this.loopOpen.tag]&&(h=!0),"false"===this.currentScope[this.loopOpen.tag]&&(h=!1),a="","object"==typeof h)for(p=this.currentScope[this.loopOpen.tag],s=o=0,l=p.length;l>o;s=++o)if(r=p[s],n=this.toJson(),n.templateVars=r,n.scopePath=n.scopePath.concat(this.loopOpen.tag),c=new this.currentClass(t,n),c.applyTemplateVars(),this.imageId=c.imageId,a+=c.content,-1!==c.getFullText().indexOf("{"))throw"they shouln't be a { in replaced file: "+c.getFullText()+" (1)";if(h===!0&&(n=this.toJson(),n.templateVars=this.currentScope,n.scopePath=n.scopePath.concat(this.loopOpen.tag),c=new this.currentClass(t,n),c.applyTemplateVars(),this.imageId=c.imageId,a+=c.content,-1!==c.getFullText().indexOf("{")))throw"they shouln't be a { in replaced file: "+c.getFullText()+" (1)";this.content=this.content.replace(e,a)}else n=this.toJson(),n.templateVars={},n.scopePath=n.scopePath.concat(this.loopOpen.tag),c=new this.currentClass(t,n),c.applyTemplateVars(),this.imageId=c.imageId,this.content=this.content.replace(e,"");if(n=this.toJson(),i=new this.currentClass(this.content,n),i.applyTemplateVars(),this.imageId=i.imageId,-1!==i.getFullText().indexOf("{"))throw"they shouln't be a { in replaced file: "+i.getFullText()+" (3)";return this.content=i.content,this},t.prototype.dashLoop=function(t,e){var s,a,i,n,r,h,c,o,l,p;for(null==e&&(e=!1),l=this.calcB(),a=l.B,h=l.startB,n=l.endB,r=this.calcInnerTextScope(this.content,h,n,t),c=o=0,p=this.matches.length;p>=0?p>=o:o>=p;c=p>=0?++o:--o)this.charactersAdded[c]-=r.startTag;if(a=r.text,-1===this.content.indexOf(a))throw"couln't find B in @content";if(s=a,i=s,this.bracketEnd={i:this.loopOpen.end.i,j:this.loopOpen.end.j},this.bracketStart={i:this.loopOpen.start.i,j:this.loopOpen.start.j},e===!1&&(this.textInsideBracket="-"+this.loopOpen.element+" "+this.loopOpen.tag),e===!0&&(this.textInsideBracket="#"+this.loopOpen.tag),s=this.replaceCurly("",s),i===s)throw"A should have changed after deleting the opening tag";if(i=s,this.textInsideBracket="/"+this.loopOpen.tag,this.bracketEnd={i:this.loopClose.end.i,j:this.loopClose.end.j},this.bracketStart={i:this.loopClose.start.i,j:this.loopClose.start.j},s=this.replaceCurly("",s),i===s)throw"A should have changed after deleting the opening tag";return this.forLoop(s,a)},t.prototype.replaceXmlTag=function(t,e,s,a,i){var n,r,h;if(null==a&&(a=!1),null==i&&(i=!1),this.matches[e][2]=s,h=this.matches[e].offset+this.charactersAdded[e],r=i===!0?s:a===!0?"<"+this.tagX+' xml:space="preserve">'+s+"</"+this.tagX+">":this.matches[e][1]+s+("</"+this.tagX+">"),this.charactersAdded[e+1]+=r.length-this.matches[e][0].length,-1===t.indexOf(this.matches[e][0]))throw"content "+this.matches[e][0]+" not found in content";if(n=t,t=DocUtils.replaceFirstFrom(t,this.matches[e][0],r,h),this.matches[e][0]=r,n===t)throw"offset problem0: didnt changed the value (should have changed from "+this.matches[this.bracketStart.i][0]+" to "+r;return t},t.prototype.replaceCurly=function(t,e){var s,a,i,n,r,h,c,o,l,p,d,u,g,f;if(null==e&&(e=this.content),-1===this.matches[this.bracketEnd.i][2].indexOf("}"))throw"no closing bracket at @bracketEnd.i "+this.matches[this.bracketEnd.i][2];if(-1===this.matches[this.bracketStart.i][2].indexOf("{"))throw"no opening bracket at @bracketStart.i "+this.matches[this.bracketStart.i][2];if(s=e,this.bracketEnd.i===this.bracketStart.i)null!=this.matches[this.bracketStart.i].first?(a=this.matches[this.bracketStart.i][2].replace("{"+this.textInsideBracket+"}",t),e=this.replaceXmlTag(e,this.bracketStart.i,a,!0,!0)):null!=this.matches[this.bracketStart.i].last?(a=this.matches[this.bracketStart.i][0].replace("{"+this.textInsideBracket+"}",t),e=this.replaceXmlTag(e,this.bracketStart.i,a,!0,!0)):(a=this.matches[this.bracketStart.i][2].replace("{"+this.textInsideBracket+"}",t),e=this.replaceXmlTag(e,this.bracketStart.i,a,!0));else if(this.bracketEnd.i>this.bracketStart.i){for(c=/^([^{]*){.*$/,o=this.matches[this.bracketStart.i][2].match(c),null!=this.matches[this.bracketStart.i].first?e=this.replaceXmlTag(e,this.bracketStart.i,t,!0,!0):null!=this.matches[this.bracketStart.i].last?e=this.replaceXmlTag(e,this.bracketStart.i,t,!0,!0):(a=o[1]+t,e=this.replaceXmlTag(e,this.bracketStart.i,a,!0)),n=l=u=this.bracketStart.i+1,g=this.bracketEnd.i;g>=u?g>l:l>g;n=g>=u?++l:--l)this.charactersAdded[n+1]=this.charactersAdded[n],e=this.replaceXmlTag(e,n,"");h=/^[^}]*}(.*)$/,a=this.matches[this.bracketEnd.i][2].replace(h,"$1"),this.charactersAdded[this.bracketEnd.i+1]=this.charactersAdded[this.bracketEnd.i],e=this.replaceXmlTag(e,n,a,!0)}for(f=this.matches,i=p=0,d=f.length;d>p;i=++p)r=f[i],i>this.bracketEnd.i&&(this.charactersAdded[i+1]=this.charactersAdded[i]);if(s===e)throw"copycontent=content !!";return e},t.prototype.applyTemplateVars=function(){var t,e,s,a,i,n,r,h,c,o,l,p,d,u,g,f,m,k,b,x,S,T,B,I,O,y,w,v;for(this.setUsedTemplateVars(""),this.templaterState.initialize(),this.inBracket=!1,this.inDashLoop=!1,this.textInsideBracket="",O=this.matches,n=f=0,x=O.length;x>f;n=++f){for(l=O[n],h=l[2]||"",g=m=n,y=this.matches.length;y>=n?y>m:m>y;g=y>=n?++m:--m)this.charactersAdded[g+1]=this.charactersAdded[g];for(c=k=0,S=h.length;S>k;c=++k){for(e=h[c],w=this.matches,g=b=0,T=w.length;T>b;g=++b)if(o=w[g],n>=g&&this.content[o.offset+this.charactersAdded[g]]!==o[0][0])throw"no < at the beginning of "+o[0][0]+" (2)";if("{"===e){if(this.inBracket===!0)throw"Bracket already open with text: "+this.textInsideBracket;this.inBracket=!0,this.textInsideBracket="",this.bracketStart={i:n,j:c}}else if("}"===e){if(this.bracketEnd={i:n,j:c},"#"===this.textInsideBracket[0]&&this.templaterState.inForLoop===!1&&this.inDashLoop===!1&&(this.templaterState.inForLoop=!0,this.loopOpen={start:this.bracketStart,end:this.bracketEnd,tag:this.textInsideBracket.substr(1)}),"-"===this.textInsideBracket[0]&&this.templaterState.inForLoop===!1&&this.inDashLoop===!1&&(this.inDashLoop=!0,p=/^-([a-zA-Z_:]+) ([a-zA-Z_:]+)$/,this.loopOpen={start:this.bracketStart,end:this.bracketEnd,tag:this.textInsideBracket.replace(p,"$2"),element:this.textInsideBracket.replace(p,"$1")}),this.inBracket===!1)throw"Bracket already closed "+this.content;if(this.inBracket=!1,this.templaterState.inForLoop===!1&&this.inDashLoop===!1&&(this.content=this.replaceCurly(this.getValueFromTag(this.textInsideBracket,this.currentScope))),"/"===this.textInsideBracket[0]&&(this.loopClose={start:this.bracketStart,end:this.bracketEnd}),"/"===this.textInsideBracket[0]&&"/"+this.loopOpen.tag===this.textInsideBracket&&this.inDashLoop===!0)return this.dashLoop(this.loopOpen.element);if("/"===this.textInsideBracket[0]&&"/"+this.loopOpen.tag===this.textInsideBracket&&this.templaterState.inForLoop===!0){if(s=!1,this.intelligentTagging===!0)for(v=this.calcB(),t=v.B,u=v.startB,i=v.endB,d=this.calcScopeText(this.content,u,i-u),I=0,B=d.length;B>I;I++)g=d[I],"<w:tc>"===g.tag&&(s=!0,a="w:tr");return s===!1?this.forLoop():this.dashLoop(a,!0)}}else this.inBracket===!0&&(this.textInsideBracket+=e)}}return r=new ImgReplacer(this),r.findImages(),r.replaceImages(),this},t}(),s.XmlTemplater=t}).call(this);
(function(){var t,l,e,n={}.hasOwnProperty,i=function(t,l){function e(){this.constructor=t}for(var i in l)n.call(l,i)&&(t[i]=l[i]);return e.prototype=l.prototype,t.prototype=new e,t.__super__=l.prototype,t};e="undefined"!=typeof global&&null!==global?global:window,l="undefined"!=typeof global&&null!==global?"node":"browser",t=t=function(t){function l(t,e,n,i,o,s,r){if(null==t&&(t=""),this.templateVars=null!=n?n:{},this.intelligentTagging=null!=i?i:!1,this.scopePath=null!=o?o:[],this.usedTemplateVars=null!=s?s:{},this.imageId=null!=r?r:0,l.__super__.constructor.call(this,null,e,this.templateVars,this.intelligentTagging,this.scopePath,this.usedTemplateVars,this.imageId),this.currentClass=l,this.tagX="w:t","string"!=typeof t)throw"content must be string!";this.load(t)}return i(l,t),l}(XmlTemplater),e.DocXTemplater=t}).call(this);