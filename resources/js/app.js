webpackJsonp([1],{"0SvV":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("Dd8w"),i=n.n(r),s=n("+6Bu"),o=n.n(s),u=n("gRE1"),l=n.n(u),a=n("fZjL"),c=n.n(a);e.default={name:"WordForm",props:{x:{type:Number,default:function(){return 0}},y:{type:Number,default:function(){return 0}},index:{type:Number,default:function(){return 0}},clues:{type:Array,default:function(){return[]}},length:{type:Number,default:function(){return 0}},letters:{type:Object,default:function(){return{}}},loading:{type:Boolean,default:function(){return!1}},isVertical:{type:Boolean,default:function(){return!1}},filledWords:{type:Array,default:function(){return[]}},suggestions:{type:Array,default:function(){return[]}},focusedCell:{type:String,default:function(){return"0:0"}},suggestionCounts:{type:Array,default:function(){return[]}}},data:function(){return{page:0,active:null,answer:new Array(this.length).fill(""),timeout:null,question:"",cluesVisible:!1,suggestionsVisible:!1}},computed:{suggestionsText:function(){return this.word&&this.ownClues?"Found "+this.ownClues.length+" clues":"Found "+this.suggestionsCount+" words"},noClue:function(){return this.question&&this.word&&!this.ownClues.map(function(t){return t.name}).includes(this.question)},word:function(){return this.answer.every(Boolean)?this.answer.join(""):""},query:function(){var t=this;return c()(this.ownLetters).map(function(e){return t.ownLetters[e]||"_"}).join("")},ownClues:function(){var t=this,e=this.clues.find(function(e){return e.word===t.word});return e?e.data:[]},cells:function(){var t=this,e=this.isVertical?this.x:this.y;return new Array(this.length).fill(0).map(function(n){return{x:t.isVertical?e++:t.x,y:t.isVertical?t.y:e++,value:""}})},ownCells:function(){var t=[];if(this.isVertical){var e=this.y,n=this.length+this.y;for(e;e<n;e+=1)t.push(this.x+":"+e);return t}var r=this.x,i=this.length+this.x;for(r;r<i;r+=1)t.push(r+":"+this.y);return t},ownLetters:function(){var t=this,e={};return this.ownCells.forEach(function(n){e[n]=t.letters[n]}),e},suggested:function(){var t=this,e=this.suggestions.find(function(e){return e.query===t.query});return e?e.data.slice(50*this.page,50*(this.page+1)):[]},suggestionsCount:function(){var t=this,e=this.suggestionCounts.find(function(e){return e.query===t.query});return e?e.data:0},cols:function(){return 28},rows:function(){return this.question?parseInt(this.question.length/this.cols*1.2):1}},watch:{query:function(t){this.answer=l()(this.ownLetters)}},methods:{showModal:function(t){this.word?this.showClues():this.showSuggestionsModal(t)},showClues:function(){this.cluesVisible=!!this.word},hideClues:function(){this.cluesVisible=!1},prevPage:function(){this.page=this.page?this.page-1:0},nextPage:function(){this.page+=1},getWordText:function(t){var e=(t.id,t.length,o()(t,["id","length"]));return l()(e).map(function(t){return t.replace(/<.+?>/g,"")}).join("")},getWordHtml:function(t){var e=(t.id,t.length,o()(t,["id","length"]));return l()(e).join("")},pasteWord:function(t){this.$emit("paste-word",{word:t,x:this.x,y:this.y,isVertical:this.isVertical}),this.hideSuggestionsModal()},hideSuggestionsModal:function(){this.suggestionsVisible=!1},getClueHtml:function(t){return t.name},pasteClue:function(t){this.question=t.name,this.hideClues()},showSuggestionsModal:function(){this.suggestionsVisible=!0},onInputLetter:function(t){var e=this;this.$emit("input",i()({value:t.target.value.toUpperCase()},this.getCellPosition(t.target.dataset.idx))),""!==t.target.value&&this.$nextTick(function(){var n=t.target.parentElement.nextElementSibling;n?(n.children[0].focus(),document.execCommand("selectAll")):e.$refs.question.focus(),e.showSuggestionsModal(e.query)})},getCellPosition:function(t){return this.isVertical?{x:this.x,y:Number(this.y)+Number(t)}:{x:Number(this.x)+Number(t),y:this.y}},onFocus:function(t){this.$emit("focus-cell",this.isVertical?Number(this.x):Number(this.x)+Number(t.target.dataset.idx),this.isVertical?Number(this.y)+Number(t.target.dataset.idx):Number(this.y))},onBlur:function(){this.$emit("focus-cell",0,0)},isActive:function(t){return this.isVertical?this.x+":"+(Number(this.y)+Number(t))===this.focusedCell:Number(this.x)+Number(t)+":"+this.y===this.focusedCell},isFilled:function(t){return this.isVertical?this.$root.getAllWordCells(this.filledWords).includes(this.x+":"+(Number(this.y)+Number(t))):this.$root.getAllWordCells(this.filledWords).includes(Number(this.x)+Number(t)+":"+this.y)},onPaste:function(t){var e=t.clipboardData.getData("text");"string"==typeof e&&e&&e.length===this.length&&(this.answer=e.split(""))}}}},"1Um3":function(t,e,n){var r=n("VU/8")(n("5/Ot"),n("7yCN"),null,null,null);t.exports=r.exports},"1Z3s":function(t,e,n){var r=n("VU/8")(n("0SvV"),n("TiH/"),null,null,null);t.exports=r.exports},"5/Ot":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("B1Az"),i=n.n(r);e.default={name:"BuilderGrid",components:{Cell:i.a},props:{focusedCell:{type:String,default:function(){return"0:0"}},filledWords:{type:Array,default:function(){return[]}},gridHeight:{type:Number,default:function(){return 1}},gridWidth:{type:Number,default:function(){return 1}},letters:{type:Object,default:function(){return{}}},blanks:{type:Array,default:function(){return[]}},words:{type:Array,default:function(){return[]}}},data:function(){return{answers:{},active:{cell:"",word:[],vertical:!1}}},methods:{isTitleCell:function(t,e){return this.words.find(function(n){return n.x===+t&&n.y===+e})},getNumber:function(t,e){var n=this.isTitleCell(t,e);return n?n.index:null},onKeyUp:function(t){t.target.value.match(/[A-Za-zА-Яа-я]/)?this.goNext(t.target):t.currentTarget.value=""},onCellClick:function(t){var e=t.id;this.$emit("updateblanks",e)},onLeftPress:function(t){this.goPrev(t.currentTarget)},getNextId:function(t){var e=t.match(/(\d+):(\d+)/),n=this.active.word[this.active.word.length-1],r=Number(e[Number(this.active.vertical)+1])+1;return!(r>n.split(":")[Number(this.active.vertical)])&&(this.active.vertical?e[1]+":"+r:r+":"+e[2])},getPrevId:function(t){var e=t.match(/(\d+):(\d+)/),n=this.active.word[0],r=Number(e[Number(this.active.vertical)+1])-1;return!(r<n.split(":")[Number(this.active.vertical)])&&(this.active.vertical?e[1]+":"+r:r+":"+e[2])},goNextCell:function(t){var e=t.id,n=this.getNextId(e);this.active.cell=n,document.execCommand("selectAll")},goPrevCell:function(t){var e=t.id,n=this.getPrevId(e);this.active.cell=n,document.execCommand("selectAll")},activateWord:function(t){var e=void 0;return this.isHorizontal(t)&&(e="horizontal"),this.isVertical(t)&&(e="vertical"),this.updateData(t,e)},toggleWords:function(t){var e="horizontal";return this.active.word.length?("horizontal"===this.typeOfWord(this.active.word)&&(e="vertical"),this.updateData(t,e)):this.updateData(t,e)},updateData:function(t,e){var n=this["get"+e.capitalize()+"Word"](t);return n===this.active.word||!!n&&(this.active.word=n,this.active.cell=n[0],this.active.vertical="vertical"===e.toLowerCase(),!0)},typeOfWord:function(t){var e=void 0,n=void 0;return t.forEach(function(t){if(!e)return e=t,!0;n=e.split(":")[0]===t.split(":")[0]?"vertical":"horizontal"}),n},isVertical:function(t){return!this.allStartCells("horizontal").includes(this.getHorizontalStartCell(t))&&this.allStartCells("vertical").includes(this.getVerticalStartCell(t))},isHorizontal:function(t){return!this.allStartCells("vertical").includes(this.getVerticalStartCell(t))&&this.allStartCells("horizontal").includes(this.getHorizontalStartCell(t))},isBoth:function(t){return this.allStartCells("vertical").includes(this.getVerticalStartCell(t))&&this.allStartCells("horizontal").includes(this.getHorizontalStartCell(t))},isNeither:function(t){return!this.allStartCells("vertical").includes(this.getVerticalStartCell(t))&&!this.allStartCells("horizontal").includes(this.getHorizontalStartCell(t))},getWordStartCells:function(t){return this.allStartCells().filter(function(e){return e===t})},getHorizontalWord:function(t){return t=this.allStartCells("horizontal").includes(t)?t:this.getHorizontalStartCell(t),this.collectHorizontalWordCells(this.getHorizontalQuestion(t))},getVerticalWord:function(t){return t=this.allStartCells("vertical").includes(t)?t:this.getVerticalStartCell(t),this.collectVerticalWordCells(this.getVerticalQuestion(t))},getHorizontalStartCell:function(t){for(var e=t.split(":");!this.allStartCells("horizontal").includes(t)&&e[0]>0;)e[0]-=1,t=e.join(":");return t},getVerticalStartCell:function(t){for(var e=t.split(":");!this.allStartCells("vertical").includes(t)&&e[1]>0;)e[1]-=1,t=e.join(":");return t},collectHorizontalWordCells:function(t){if(!t)return[];var e=[],n=void 0;for(n=t.x;n<t.x+t.length;n+=1)e.push(n+":"+t.y);return e===[]?null:e},collectVerticalWordCells:function(t){if(!t)return[];var e=[],n=void 0;for(n=t.y;n<t.y+t.length;n+=1)e.push(t.x+":"+n);return e===[]?null:e},getVerticalQuestion:function(t){var e=this;return this.questions.vertical.find(function(n){return e.exact(n,t)})},getHorizontalQuestion:function(t){var e=this;return this.questions.horizontal.find(function(n){return e.exact(n,t)})},exact:function(t,e){var n=e.split(":");return t.x===Number(n[0])&&t.y===Number(n[1])},getCellClass:function(t,e){var n=[],r=e+1+":"+(t+1);return this.blanks.includes(r)?n.push("blank"):n.push("letter"),this.$root.getAllWordCells(this.filledWords).includes(r)&&n.push("filled"),r===this.focusedCell&&n.push("focused"),n},allStartCells:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e=[];return t&&"horizontal"!==t||this.questions.horizontal.forEach(function(t){e.push(t.x+":"+t.y)}),t&&"vertical"!==t||this.questions.vertical.forEach(function(t){e.push(t.x+":"+t.y)}),e}}}},"7K8a":function(t,e,n){"use strict";function r(t){Object.defineProperty(t.prototype,"$http",{get:function(){return o}})}e.a=r;var i=n("mtWM"),s=n.n(i),o=s.a.create()},"7yCN":function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"builder-grid page-inner"},[n("div",{staticClass:"inner"},t._l(t.gridHeight,function(e,r){return n("div",{key:r,staticClass:"row"},[n("div",{staticClass:"inner"},t._l(t.gridWidth,function(e,i){return n("div",{key:i+1+":"+(r+1),class:["cell"].concat(t.getCellClass(r,i))},[n("cell",{attrs:{value:t.letters[i+1+":"+(r+1)],x:i+1,y:r+1,number:t.getNumber(i+1,r+1),"is-blank":t.blanks.includes(i+1+":"+(r+1)),"is-active":t.active.cell===i+1+":"+(r+1)},on:{keyup:[function(e){return e.ctrlKey||e.shiftKey||e.altKey||e.metaKey?null:t.onKeyUp(e)},function(e){return"button"in e||!t._k(e.keyCode,"left",37,e.key,["Left","ArrowLeft"])||!t._k(e.keyCode,"up",38,e.key,["Up","ArrowUp"])?"button"in e&&0!==e.button?null:t.onLeftPress(e):null}],cellclick:t.onCellClick,cellinput:t.goNextCell}})],1)}),0)])}),0)])},staticRenderFns:[]}},"8Wsr":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"Cell",props:{x:{type:Number,required:!0},y:{type:Number,required:!0},value:{type:String,default:function(){return""}},number:{type:Number,default:function(){return 0}},isBlank:{type:Boolean,default:function(){return!1}},isActive:{type:Boolean,default:function(){return!1}}},computed:{identifier:function(){return this.x+":"+this.y}},methods:{onClick:function(t){this.$emit("cellclick",{id:this.identifier})},onInput:function(){this.$emit("cellinput",{id:this.identifier})},onFocus:function(t){if(this.$parent.isEditBlanks)return t.target.blur()}}}},AmHV:function(t,e,n){"use strict";var r=n("7K8a");n.d(e,"a",function(){return r.a})},B1Az:function(t,e,n){var r=n("VU/8")(n("8Wsr"),n("bP0l"),null,null,null);t.exports=r.exports},CVNL:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("1Z3s"),i=n.n(r);e.default={name:"BuilderForm",components:{WordForm:i.a},props:{words:{type:Array,default:function(){return[]}},clues:{type:Array,default:function(){return[]}},letters:{type:Object,default:function(){return{}}},loading:{type:Boolean,default:function(){return!1}},initWidth:{type:Number,default:function(){return 1}},initHeight:{type:Number,default:function(){return 1}},filledWords:{type:Array,default:function(){return[]}},suggestions:{type:Array,default:function(){return[]}},focusedCell:{type:String,default:function(){return"0:0"}},suggestionCounts:{type:Array,default:function(){return[]}}},data:function(){return{width:this.initWidth,height:this.initHeight}},computed:{verticalWords:function(){return this.words.filter(function(t){return"vertical"===t.type})},horizontalWords:function(){return this.words.filter(function(t){return"horizontal"===t.type})}},watch:{width:function(t){this.$emit("rebuild",{width:Number(t),height:Number(this.height)})},height:function(t){this.$emit("rebuild",{width:Number(this.width),height:Number(t)})}}}},Fw4z:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"builder-form page-inner"},[n("div",{staticClass:"controls"},[n("span",[t._v("Grid Width: "+t._s(t.width))]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.width,expression:"width"}],ref:"sizeWidth",attrs:{type:"range",size:"4",min:"1",max:"40"},domProps:{value:t.width},on:{__r:function(e){t.width=e.target.value}}}),t._v(" "),n("span",[t._v("Grid Height: "+t._s(t.height))]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.height,expression:"height"}],ref:"sizeHeight",attrs:{type:"range",size:"4",min:"1",max:"40"},domProps:{value:t.height},on:{__r:function(e){t.height=e.target.value}}})]),t._v(" "),n("div",{staticClass:"forms-list-wrapper horizontal"},[n("label",[t._v("Horizontal questions:")]),t._v(" "),n("div",{staticClass:"forms-list"},t._l(t.horizontalWords,function(e,r){return n("word-form",{key:"h"+r,attrs:{x:e.x,y:e.y,clues:t.clues,letters:t.letters,loading:t.loading,index:e.index,length:e.length,"is-vertical":!1,suggestions:t.suggestions,"filled-words":t.filledWords,"focused-cell":t.focusedCell,"suggestion-counts":t.suggestionCounts},on:{input:function(e){return t.$emit("input",e)},"focus-cell":function(e,n){return t.$emit("focus-cell",e,n)},"paste-word":function(e){return t.$emit("paste-word",e)},"remove-word":function(e){return t.$emit("remove-word",e)},"letters-update":function(e){return t.$emit("letters-update",e)}}})}),1)]),t._v(" "),n("div",{staticClass:"forms-list-wrapper vertical"},[n("label",[t._v("Vertical questions:")]),t._v(" "),n("div",{staticClass:"forms-list"},t._l(t.verticalWords,function(e,r){return n("word-form",{key:"v"+r,attrs:{x:e.x,y:e.y,clues:t.clues,letters:t.letters,loading:t.loading,length:e.length,index:e.index,"is-vertical":!0,suggestions:t.suggestions,"filled-words":t.filledWords,"focused-cell":t.focusedCell,"suggestion-counts":t.suggestionCounts},on:{input:function(e){return t.$emit("input",e)},"focus-cell":function(e,n){return t.$emit("focus-cell",e,n)},"paste-word":function(e){return t.$emit("paste-word",e)},"remove-word":function(e){return t.$emit("remove-word",e)},"letters-update":function(e){return t.$emit("letters-update",e)}}})}),1)])])},staticRenderFns:[]}},H7DE:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("//Fk"),i=n.n(r),s=n("woOf"),o=n.n(s),u=n("fZjL"),l=n.n(u),a=n("Xxa5"),c=n.n(a),d=n("exGp"),h=n.n(d),f=n("Dd8w"),g=n.n(f),p=n("Gu7T"),v=n.n(p),m=n("1Um3"),y=n.n(m),w=n("qEH6"),C=n.n(w);e.default={name:"BuilderPage",components:{BuilderForm:C.a,BuilderGrid:y.a},data:function(){return{log:[],clues:[],width:10,height:10,blanks:[],letters:{},loading:!1,filledWords:[],suggestions:[],focusedCell:"0:0",suggestionCounts:[]}},computed:{horizontalWords:function(){var t=this,e=[],n=1;for(n;n<=this.height;n+=1){var r=this.blanks.filter(function(t){return Number(t.split(":")[1])===n}).map(function(t){return Number(t.split(":")[0])});r.length>0?function(){var i=1,s=new Array(t.width).fill(0).map(function(t){return i++});s&&(":"+s.join("::")+":").split(new RegExp(":"+r.join(":|:")+":")).filter(function(t){var e=t.match(/:\d+:/g);return!!e&&e.length>1}).forEach(function(t){var r=t.match(/:\d+:/g),i=r?r.length:0;e.push({x:Number(t.match(/^:(\d+)/)[1]),y:n,type:"horizontal",length:i,question:""})})}():e.push({x:1,y:n,type:"horizontal",length:this.width,question:""})}return e},verticalWords:function(){var t=this,e=[],n=1;for(n;n<=this.width;n+=1){var r=this.blanks.filter(function(t){return Number(t.split(":")[0])===n}).map(function(t){return Number(t.split(":")[1])});r.length>0?function(){var i=1,s=new Array(t.height).fill(0).map(function(t){return i++});s&&(":"+s.join("::")+":").split(new RegExp(":"+r.join(":|:")+":")).filter(function(t){var e=t.match(/:\d+:/g);return!!e&&e.length>1}).forEach(function(t){var r=t.match(/:\d+:/g),i=r?r.length:0;e.push({x:n,y:Number(t.match(/^:(\d+)/)[1]),type:"vertical",length:i,question:""})})}():e.push({x:n,y:1,type:"vertical",length:this.height,question:""})}return e.sort(function(t,e){return t.y-e.y})},words:function(){return this.addIndexes([].concat(v()(this.horizontalWords),v()(this.verticalWords)))},queries:function(){var t=this;return this.words.map(function(e){return t.$root.getWordCells(g()({},e,{word:{length:e.length},isVertical:"vertical"===e.type})).map(function(e){return t.letters[e]||"_"}).join("")}).unique()},startCells:function(){return[].concat(v()(this.horizontalWords),v()(this.verticalWords)).map(function(t){return{x:t.x,y:t.y}}).reduce(function(t,e){return t.find(function(t){var n=t.x,r=t.y;return n===e.x&&r===e.y})||t.push(e),t},[]).sort(function(t,e){return t.y===e.y?t.x-e.x:t.y-e.y}).map(function(t,e){return g()({},t,{index:e+1})})},letterCells:function(){var t=this,e=[],n=1;for(n;n<=this.width;n+=1){var r=1;for(r;r<=this.height;r+=1)!function(){var i=new RegExp(n+":"+r);t.blanks.find(function(t){return t&&t.match(i)})||e.push({x:n,y:r})}()}return e.reduce(function(t,e){return t[e.x+":"+e.y]="",t},{})}},watch:{letterCells:function(t){this.letters=g()({},t,this.letters)},blanks:function(){this.updateSuggestions()},queries:function(){this.updateSuggestions()}},mounted:function(){this.letters=this.letterCells},methods:{onRemoveWord:function(t){var e=this,n=t.x,r=t.y,i=t.isVertical,s=t.word,o=this.filledWords.findIndex(function(t){return t.x===n&&t.y===r&&t.isVertical===i});this.filledWords.splice(o,1);var u=this.$root.getAllWordCells(this.filledWords);this.$root.getWordCells({x:n,y:r,isVertical:i,word:s}).forEach(function(t){u.includes(t)||(e.letters[t]="")})},onRefreshSuggestions:function(){this.suggestions=[],this.suggestionCounts=[],this.updateSuggestions(!0)},updateSuggestions:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return h()(c.a.mark(function n(){return c.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return t.loading=!0,n.next=3,t.getSuggestionCounts(t.queries,!e);case 3:return t.suggestionCounts=n.sent,n.next=6,t.getSuggestions(t.queries,!e);case 6:t.suggestions=n.sent,t.loading=!1;case 8:case"end":return n.stop()}},n,t)}))()},onGenerateGrid:function(){this.blanks=[];for(var t=this.width%2?parseInt(this.width/2)+1:parseInt(this.width/2),e=this.height%2?parseInt(this.height/2)+1:parseInt(this.height/2),n=1;n<=t;n+=1)for(var r=1;r<=e;r+=1)parseInt(1.5*Math.random())&&(this.blanks.push(n+":"+r),this.blanks.push(this.width-n+1+":"+r),this.blanks.push(n+":"+(this.height-r+1)),this.blanks.push(this.width-n+1+":"+(this.height-r+1)))},onClearLetters:function(){for(var t=l()(this.letters),e=t.length-1;e>=0;e-=1)this.letters[t[e]]="";this.filledWords=[]},onClearGrid:function(){this.blanks=[]},rebuildGrid:function(t){var e=t.width,n=t.height;this.width=e,this.height=n},onBlanksUpdate:function(t){if(!this.blanks.includes(t))return this.blanks.push(t);this.blanks=this.blanks.filter(function(e){return e!==t})},onInputLetter:function(t){var e=t.x,n=t.y,r=t.value;this.letters[e+":"+n]=r},addIndexes:function(t){var e=this;return t.map(function(t){var n=e.startCells.find(function(e){var n=e.x,r=e.y;return t.x===n&&t.y===r}),r=n.index;return g()({},t,{index:r})})},onFocusCell:function(t,e){this.focusedCell=t+":"+e},onPasteWord:function(t){var e=this,n=t.word,r=t.x,i=t.y,s=t.isVertical;n.split("").forEach(function(t,n){s?e.letters[r+":"+(i+n)]=t:e.letters[r+n+":"+i]=t}),this.filledWords.push({word:n,x:r,y:i,isVertical:s}),this.$http.get("https://crossword.stagelab.pro/crossword/clues/find/"+n).then(function(t){e.clues.push({word:n,data:t.data})})},onLettersUpdate:function(t){var e=t.letters;o()(this.letters,e)},getSuggestionsUrl:function(t){return"https://crossword.stagelab.pro/crossword/words/find/"+(arguments.length>1&&void 0!==arguments[1]?arguments[1]:0)+"/"+t},getSuggestions:function(t){var e=this,n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return h()(c.a.mark(function r(){return c.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",i.a.all(t.map(function(){var t=h()(c.a.mark(function t(r){var i,s,o;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(r.includes("_")){t.next=2;break}return t.abrupt("return",{query:r,data:[]});case 2:if(!n){t.next=6;break}if(!(i=e.suggestions.find(function(t){return t.query===r}))){t.next=6;break}return t.abrupt("return",i);case 6:return s=e.getSuggestionsUrl(r),e.log.push(s),t.next=10,e.$http.get(s);case 10:return o=t.sent,e.log.splice(e.log.findIndex(function(t){return t===s}),1),t.abrupt("return",{query:r,data:o.data});case 13:case"end":return t.stop()}},t,e)}));return function(e){return t.apply(this,arguments)}}())));case 1:case"end":return r.stop()}},r,e)}))()},getSuggestionCounts:function(t){var e=this,n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return h()(c.a.mark(function r(){return c.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",i.a.all(t.map(function(){var t=h()(c.a.mark(function t(r){var i,s,o;return c.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(r.includes("_")){t.next=2;break}return t.abrupt("return",{query:r,data:1});case 2:if(!n){t.next=6;break}if(!(i=e.suggestionCounts.find(function(t){return t.query===r}))){t.next=6;break}return t.abrupt("return",i);case 6:return s="https://crossword.stagelab.pro/crossword/words/count/"+r,t.next=9,e.$http.get(s);case 9:return o=t.sent,t.abrupt("return",{query:r,data:o.data});case 11:case"end":return t.stop()}},t,e)}));return function(e){return t.apply(this,arguments)}}())));case 1:case"end":return r.stop()}},r,e)}))()}}}},IBkK:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"crossword"}},[n("builder-page")],1)},staticRenderFns:[]}},M93x:function(t,e,n){function r(t){n("gl2p")}var i=n("VU/8")(n("xJD8"),n("IBkK"),r,null,null);t.exports=i.exports},"TiH/":function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"word-form"},[t.loading&&!t.suggested.length?n("div",{staticClass:"word-form-overlay"},[t._v("\n    Loading...\n  ")]):t._e(),t._v(" "),t.suggestionsVisible?n("div",{staticClass:"modal-area suggestions"},[n("div",{staticClass:"inner"},[n("a",{staticClass:"close",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.hideSuggestionsModal(e)}}},[t._v("\n        X\n      ")]),t._v(" "),n("ul",{staticClass:"suggested-list"},t._l(t.suggested,function(e){return n("li",{key:e.id},[n("a",{attrs:{href:"#"},domProps:{innerHTML:t._s(t.getWordHtml(e))},on:{click:function(n){n.preventDefault(),t.pasteWord(t.getWordText(e))}}})])}),0),t._v(" "),n("div",{staticClass:"controls"},[n("div",{staticClass:"prev go-to-page"},[n("a",{attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.prevPage(e)}}},[t._v("\n            Prev.\n          ")])]),t._v(" "),n("div",{staticClass:"index go-to-page"},[t._v("\n          Page "+t._s(t.page+1)+"\n        ")]),t._v(" "),n("div",{staticClass:"next go-to-page"},[n("a",{attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.nextPage(e)}}},[t._v("\n            Next.\n          ")])])])])]):t._e(),t._v(" "),t.cluesVisible?n("div",{staticClass:"modal-area clues"},[n("div",{staticClass:"inner"},[n("a",{staticClass:"close",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.hideClues(e)}}},[t._v("\n        X\n      ")]),t._v(" "),n("ol",{staticClass:"clues-list"},t._l(t.ownClues,function(e){return n("li",{key:e.id},[n("a",{attrs:{href:"#"},domProps:{innerHTML:t._s(t.getClueHtml(e))},on:{click:function(n){n.preventDefault(),t.pasteClue(e)}}}),t._v(" "),n("br")])}),0)])]):t._e(),t._v(" "),n("div",[t._v(t._s(t.index))]),t._v(" "),n("div",{staticClass:"question"},[n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.question,expression:"question"}],ref:"question",staticClass:"textarea",attrs:{type:"text",cols:t.cols,rows:t.rows},domProps:{value:t.question},on:{focus:t.showClues,input:function(e){e.target.composing||(t.question=e.target.value)}}}),t._v(" "),t.noClue?n("div",{staticClass:"green-plus"},[t._v("\n      +\n    ")]):t._e()]),t._v(" "),n("div",{staticClass:"words-count"},[n("a",{attrs:{href:"#",title:"Show variants"},domProps:{textContent:t._s(t.suggestionsText)},on:{click:function(e){e.preventDefault(),t.showModal(t.query)}}}),t._v(" "),t.word?n("a",{staticClass:"danger",attrs:{href:"#",title:"Remove word"},on:{click:function(e){e.preventDefault(),t.$emit("remove-word",{x:t.x,y:t.y,isVertical:t.isVertical,word:{length:t.length}})}}},[t._v("\n      Remove word\n    ")]):t._e()]),t._v(" "),n("div",{staticClass:"answer-letters"},t._l(t.cells,function(e,r){return n("div",{key:r,staticClass:"letter",class:{focused:t.isActive(r),filled:t.isFilled(r)}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.answer[r],expression:"answer[idx]"}],attrs:{type:"text",size:"1",minlength:"1",maxlength:"1","data-idx":r},domProps:{value:t.answer[r]},on:{blur:t.onBlur,focus:t.onFocus,input:[function(e){e.target.composing||t.$set(t.answer,r,e.target.value)},t.onInputLetter],paste:function(e){return e.preventDefault(),e.stopPropagation(),t.onPaste(e)}}})])}),0),t._v(" "),n("br"),t._v(" "),n("hr")])},staticRenderFns:[]}},bP0l:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"cell-item"},[n("sup",{staticClass:"word-start"},[t._v("\n    "+t._s(t.number)+"\n  ")]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.value,expression:"value"}],attrs:{type:"text",size:"1",minlength:"1",maxlength:"1",readonly:""},domProps:{value:t.value},on:{click:t.onClick,focus:t.onFocus,input:[function(e){e.target.composing||(t.value=e.target.value)},t.onInput]}})])},staticRenderFns:[]}},cb4u:function(t,e,n){var r=n("VU/8")(n("H7DE"),n("hBCW"),null,null,null);t.exports=r.exports},gl2p:function(t,e){},hBCW:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page builder-page"},[n("div",{staticClass:"toolbox"},[n("button",{staticClass:"btn",on:{click:function(e){return e.preventDefault(),t.onGenerateGrid(e)}}},[t._v("\n      Generate Grid\n    ")]),t._v(" "),n("br"),t._v(" "),n("button",{staticClass:"btn",on:{click:function(e){return e.preventDefault(),t.onClearGrid(e)}}},[t._v("\n      Clear Grid\n    ")]),t._v(" "),n("br"),t._v(" "),n("button",{staticClass:"btn",on:{click:function(e){return e.preventDefault(),t.onClearLetters(e)}}},[t._v("\n      Clear Letters\n    ")]),t._v(" "),n("br"),t._v(" "),n("button",{staticClass:"btn",on:{click:function(e){return e.preventDefault(),t.onRefreshSuggestions(e)}}},[t._v("\n      Refresh Suggestions\n    ")])]),t._v(" "),n("builder-form",{attrs:{clues:t.clues,words:t.words,letters:t.letters,loading:t.loading,"init-width":t.width,"init-height":t.height,suggestions:t.suggestions,"filled-words":t.filledWords,"focused-cell":t.focusedCell,"suggestion-counts":t.suggestionCounts},on:{input:t.onInputLetter,rebuild:t.rebuildGrid,"focus-cell":t.onFocusCell,"paste-word":t.onPasteWord,"remove-word":t.onRemoveWord,"letters-update":t.onLettersUpdate}}),t._v(" "),n("builder-grid",{attrs:{words:t.words,blanks:t.blanks,letters:t.letters,"grid-width":t.width,"grid-height":t.height,"filled-words":t.filledWords,"focused-cell":t.focusedCell},on:{updateblanks:t.onBlanksUpdate}}),t._v(" "),n("div",{staticClass:"log"},[n("pre",[t._v("      "+t._s(t.log)+"\n    ")])])],1)},staticRenderFns:[]}},lVK7:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("Xxa5"),i=n.n(r),s=n("exGp"),o=n.n(s),u=n("pFYg"),l=n.n(u),a=n("7+uW"),c=n("sjtc"),d=(n.n(c),n("M93x")),h=n.n(d),f=n("AmHV");a.a.config.devTools=!0,a.a.config.productionTip=!1,a.a.use(f.a),new a.a({el:"#crossword",components:{App:h.a},methods:{serialize:function(t,e){var n=[],r=void 0;for(r in t)if(t.hasOwnProperty(r)){var i=e?e+"["+r+"]":r,s=t[r];n.push(null!==s&&"object"===(void 0===s?"undefined":l()(s))?this.serialize(s,i):encodeURIComponent(i)+"="+encodeURIComponent(s))}return n.join("&")},fetch:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(t){var e=this;return o()(i.a.mark(function n(){var r;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t,{mode:"no-cors"});case 2:return r=e.sent,e.abrupt("return",r);case 4:case"end":return e.stop()}},n,e)}))()}),getAllWordCells:function(t){return t.flatMap(this.getWordCells)},getWordCells:function(t){var e=t.word,n=t.x,r=t.y,i=t.isVertical;return new Array(e.length).fill(null).map(function(t,e){return i?n+":"+(r+e):n+e+":"+r})},getWordLetters:function(t){var e=t.word;return new Array(e.length).fill(null).map(function(t,n){return e[n]})}},template:"<App/>"})},qEH6:function(t,e,n){var r=n("VU/8")(n("CVNL"),n("Fw4z"),null,null,null);t.exports=r.exports},sjtc:function(t,e){Array.prototype.unique=function(){var t=this.length,e={},n=[],r=void 0;for(r=0;r<t;r++)e.hasOwnProperty(this[r])||(n.push(this[r]),e[this[r]]=1);return n},String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1).toLowerCase()}},xJD8:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("cb4u"),i=n.n(r);e.default={name:"App",components:{BuilderPage:i.a}}}},["lVK7"]);