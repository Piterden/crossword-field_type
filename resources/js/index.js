"use strict";

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
}

var Cell = {
  name: "Cell",

  template: "#Cell",

  props: {
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    value: {
      type: String,
      default: function _default() {
        return "";
      }
    },
    number: {
      type: Number,
      default: function _default() {
        return 0;
      }
    },
    isBlank: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    isActive: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    }
  },

  computed: {
    identifier: function identifier() {
      return this.x + ":" + this.y;
    }
  },

  methods: {
    onClick: function onClick(e) {
      this.$emit("cellclick", { id: this.identifier });
    },
    onInput: function onInput() {
      this.$emit("cellinput", { id: this.identifier });
    },
    onFocus: function onFocus(e) {
      if (this.$parent.isEditBlanks) {
        return e.target.blur();
      }
    }
  }
};

var WordForm = {
  name: "WordForm",

  template: "#WordForm",

  props: {
    x: {
      type: Number,
      default: function _default() {
        return 0;
      }
    },
    y: {
      type: Number,
      default: function _default() {
        return 0;
      }
    },
    index: {
      type: Number,
      default: function _default() {
        return 0;
      }
    },
    length: {
      type: Number,
      default: function _default() {
        return 0;
      }
    },
    letters: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    isVertical: {
      type: Boolean,
      default: function _default() {
        return false;
      }
    },
    focusedCell: {
      type: String,
      default: function _default() {
        return "0:0";
      }
    }
  },

  data: function data() {
    return {
      question: "",
      answer: new Array(this.length).fill(""),
      active: null,
      wordsCount: 0,
      loading: false
    };
  },

  computed: {
    wordsQuery () {
      return Object.keys(this.ownLetters).map((key) => this.ownLetters[key] || '_').join('');
    },
    cells: function cells() {
      var _this = this;

      var i = this.isVertical ? this.x : this.y;

      return new Array(this.length).fill(0).map(function(cell) {
        return {
          x: _this.isVertical ? i++ : _this.x, // eslint-disable-line
          y: _this.isVertical ? _this.y : i++, // eslint-disable-line
          value: ""
        };
      });
    },
    ownCells: function ownCells() {
      var cells = [];

      if (this.isVertical) {
        var _i = this.y;
        var _end = this.length + this.y;

        for (_i; _i < _end; _i += 1) {
          cells.push(this.x + ":" + _i);
        }

        return cells;
      }

      var i = this.x;
      var end = this.length + this.x;

      for (i; i < end; i += 1) {
        cells.push(i + ":" + this.y);
      }

      return cells;
    },
    ownLetters: function ownLetters() {
      var _this2 = this;

      var letters = {};

      this.ownCells.forEach(function(cell) {
        letters[cell] = _this2.letters[cell];
      });

      this.$emit('letters-update', { letters: letters })

      return letters;
    }
  },

  watch: {
    ownLetters (letters) {
      this.$nextTick(() => {
        this.answer = Object.values(letters)
        this.countWords()
      });
    },
    wordsQuery (query) {
      this.countWords(query)
    }
  },

  mounted () {
    this.countWords(this.wordsQuery)
  },

  methods: {
    showWordsModal (query) {
      this.$emit('modal', {
        query: query,
        show: true,
        x: this.x,
        y: this.y,
        isVertical: this.isVertical
      })
    },
    async countWords (query) {
      this.loading = true;
      query = query || this.wordsQuery;
      var url = `/crossword/words/count/${query}`;

      var cache = await window.caches.open('crossword');
      var match = await cache.match(url).catch(console.log);

      if (!match) {
        await cache.add(url);
        match = await cache.match(url).catch(console.log);
      }

      this.wordsCount = await match.text();
      this.loading = false;
    },
    onInputLetter: function onInputLetter(e) {
      var _this3 = this;

      this.$emit(
        "input",
        _extends(
          {
            value: e.target.value
          },
          this.getCellPosition(e.target.dataset.idx)
        )
      );

      if (e.target.value !== "") {
        this.$nextTick(function() {
          var nextEl = e.target.parentElement.nextElementSibling;

          if (nextEl) {
            nextEl.children[0].focus();
            document.execCommand("selectAll");
          } else {
            _this3.$refs.question.focus();
          }
        });
      }
    },
    getCellPosition: function getCellPosition(index) {
      return this.isVertical
        ? { x: this.x, y: Number(this.y) + Number(index) }
        : { x: Number(this.x) + Number(index), y: this.y };
    },
    onFocus: function onFocus(e) {
      this.$emit(
        "focus-cell",
        this.isVertical
          ? Number(this.x)
          : Number(this.x) + Number(e.target.dataset.idx),
        this.isVertical
          ? Number(this.y) + Number(e.target.dataset.idx)
          : Number(this.y)
      );
    },
    isActive: function isActive(idx) {
      return this.isVertical
        ? this.x + ":" + (Number(this.y) + Number(idx)) === this.focusedCell
        : Number(this.x) + Number(idx) + ":" + this.y === this.focusedCell;
    }
  }
};

var BuilderGrid = {
  name: "BuilderGrid",

  template: "#BuilderGrid",

  components: { Cell: Cell },

  props: {
    focusedCell: {
      type: String,
      default: function _default() {
        return "0:0";
      }
    },
    gridHeight: {
      type: Number,
      default: function _default() {
        return 1;
      }
    },
    gridWidth: {
      type: Number,
      default: function _default() {
        return 1;
      }
    },
    letters: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    blanks: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    words: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },

  data: function data() {
    return {
      answers: {},
      active: {
        cell: "",
        word: [],
        vertical: false
      }
    };
  },

  methods: {
    isTitleCell: function isTitleCell(x, y) {
      return this.words.find(function(word) {
        return word.x === +x && word.y === +y;
      });
    },
    getNumber: function getNumber(x, y) {
      var titleCell = this.isTitleCell(x, y);

      return titleCell ? titleCell.index : null;
    },
    onKeyUp: function onKeyUp(e) {
      e.target.value.match(/[A-Za-zА-Яа-я]/)
        ? this.goNext(e.target)
        : (e.currentTarget.value = "");
    },
    onCellClick: function onCellClick(_ref3) {
      var id = _ref3.id;

      this.$emit("updateblanks", id);
    },
    onLeftPress: function onLeftPress(e) {
      this.goPrev(e.currentTarget);
    },
    getNextId: function getNextId(id) {
      var match = id.match(/(\d+):(\d+)/);
      var last = this.active.word[this.active.word.length - 1];
      var next = Number(match[Number(this.active.vertical) + 1]) + 1;

      if (next > last.split(":")[Number(this.active.vertical)]) {
        return false;
      }

      return this.active.vertical
        ? match[1] + ":" + next
        : next + ":" + match[2];
    },
    getPrevId: function getPrevId(id) {
      var match = id.match(/(\d+):(\d+)/);
      var first = this.active.word[0];
      var prev = Number(match[Number(this.active.vertical) + 1]) - 1;

      if (prev < first.split(":")[Number(this.active.vertical)]) {
        return false;
      }

      return this.active.vertical
        ? match[1] + ":" + prev
        : prev + ":" + match[2];
    },
    goNextCell: function goNextCell(_ref4) {
      var id = _ref4.id;

      var next = this.getNextId(id);

      this.active.cell = next;
      // next && next.focus() || el.blur()
      document.execCommand("selectAll");
    },
    goPrevCell: function goPrevCell(_ref5) {
      var id = _ref5.id;

      var prev = this.getPrevId(id);

      this.active.cell = prev;
      // prev && prev.focus() || el.blur()
      document.execCommand("selectAll");
    },
    activateWord: function activateWord(key) {
      var dir = void 0;

      if (this.isHorizontal(key)) dir = "horizontal";
      if (this.isVertical(key)) dir = "vertical";

      return this.updateData(key, dir);
    },
    toggleWords: function toggleWords(key) {
      var dir = "horizontal";

      if (!this.active.word.length) {
        return this.updateData(key, dir);
      }

      if (this.typeOfWord(this.active.word) === "horizontal") {
        dir = "vertical";
      }

      return this.updateData(key, dir);
    },
    updateData: function updateData(key, dir) {
      var word = this["get" + dir.capitalize() + "Word"](key);

      if (word === this.active.word) {
        return true;
      }

      if (!word) {
        return false;
      }

      this.active.word = word;
      this.active.cell = word[0];
      this.active.vertical = dir.toLowerCase() === "vertical";

      return true;
    },
    typeOfWord: function typeOfWord(word) {
      var prev = void 0;
      var type = void 0;

      word.forEach(function(cell) {
        if (!prev) {
          prev = cell;
          return true;
        }

        type =
          prev.split(":")[0] === cell.split(":")[0] ? "vertical" : "horizontal";
      });

      return type;
    },
    isVertical: function isVertical(id) {
      return (
        !this.allStartCells("horizontal").includes(
          this.getHorizontalStartCell(id)
        ) &&
        this.allStartCells("vertical").includes(this.getVerticalStartCell(id))
      );
    },
    isHorizontal: function isHorizontal(id) {
      return (
        !this.allStartCells("vertical").includes(
          this.getVerticalStartCell(id)
        ) &&
        this.allStartCells("horizontal").includes(
          this.getHorizontalStartCell(id)
        )
      );
    },
    isBoth: function isBoth(id) {
      return (
        this.allStartCells("vertical").includes(
          this.getVerticalStartCell(id)
        ) &&
        this.allStartCells("horizontal").includes(
          this.getHorizontalStartCell(id)
        )
      );
    },
    isNeither: function isNeither(id) {
      return (
        !this.allStartCells("vertical").includes(
          this.getVerticalStartCell(id)
        ) &&
        !this.allStartCells("horizontal").includes(
          this.getHorizontalStartCell(id)
        )
      );
    },
    getWordStartCells: function getWordStartCells(id) {
      return this.allStartCells().filter(function(cell) {
        return cell === id;
      });
    },
    getHorizontalWord: function getHorizontalWord(id) {
      id = this.allStartCells("horizontal").includes(id)
        ? id
        : this.getHorizontalStartCell(id);

      return this.collectHorizontalWordCells(this.getHorizontalQuestion(id));
    },
    getVerticalWord: function getVerticalWord(id) {
      id = this.allStartCells("vertical").includes(id)
        ? id
        : this.getVerticalStartCell(id);

      return this.collectVerticalWordCells(this.getVerticalQuestion(id));
    },
    getHorizontalStartCell: function getHorizontalStartCell(id) {
      var xy = id.split(":");

      while (!this.allStartCells("horizontal").includes(id) && xy[0] > 0) {
        xy[0] -= 1;
        id = xy.join(":");
      }

      return id;
    },
    getVerticalStartCell: function getVerticalStartCell(id) {
      var xy = id.split(":");

      while (!this.allStartCells("vertical").includes(id) && xy[1] > 0) {
        xy[1] -= 1;
        id = xy.join(":");
      }

      return id;
    },
    collectHorizontalWordCells: function collectHorizontalWordCells(question) {
      if (!question) {
        return [];
      }

      var cells = [];
      var idx = void 0;

      for (idx = question.x; idx < question.x + question.length; idx += 1) {
        cells.push(idx + ":" + question.y);
      }

      return cells === [] ? null : cells;
    },
    collectVerticalWordCells: function collectVerticalWordCells(question) {
      if (!question) {
        return [];
      }

      var cells = [];
      var idx = void 0;

      for (idx = question.y; idx < question.y + question.length; idx += 1) {
        cells.push(question.x + ":" + idx);
      }

      return cells === [] ? null : cells;
    },
    getVerticalQuestion: function getVerticalQuestion(id) {
      var _this4 = this;

      return this.questions.vertical.find(function(question) {
        return _this4.exact(question, id);
      });
    },
    getHorizontalQuestion: function getHorizontalQuestion(id) {
      var _this5 = this;

      return this.questions.horizontal.find(function(question) {
        return _this5.exact(question, id);
      });
    },
    exact: function exact(question, id) {
      var xy = id.split(":");

      return question.x === Number(xy[0]) && question.y === Number(xy[1]);
    },
    getCellClass: function getCellClass(row, col) {
      var classes = [];
      var index = col + 1 + ":" + (row + 1);

      // this.letterCells.includes(index)
      //   ? classes.push('letter')
      //   : classes.push('blank')
      this.blanks.includes(index)
        ? classes.push("blank")
        : classes.push("letter");

      if (index === this.focusedCell) {
        classes.push("focused");
      }
      // this.startCells.includes(index)
      //   ? classes.push('start')
      //   : true

      // this.active.word.includes(index)
      //   ? classes.push('active')
      //   : true

      return classes;
    },
    allStartCells: function allStartCells() {
      var direction =
        arguments.length > 0 && arguments[0] !== undefined
          ? arguments[0]
          : null;

      var cells = [];

      if (!direction || direction === "horizontal") {
        this.questions.horizontal.forEach(function(question) {
          cells.push(question.x + ":" + question.y);
        });
      }

      if (!direction || direction === "vertical") {
        this.questions.vertical.forEach(function(question) {
          cells.push(question.x + ":" + question.y);
        });
      }

      return cells;
    }
  }
};

var BuilderForm = {
  name: "BuilderForm",

  template: "#BuilderForm",

  components: { WordForm: WordForm },

  props: {
    words: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    letters: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    initWidth: {
      type: Number,
      default: function _default() {
        return 1;
      }
    },
    initHeight: {
      type: Number,
      default: function _default() {
        return 1;
      }
    },
    focusedCell: {
      type: String,
      default: function _default() {
        return "0:0";
      }
    }
  },

  data: function data() {
    return {
      width: this.initWidth,
      height: this.initHeight,
      loading: false,
      modal: false,
      suggested: [],
      activeWord: {
        x: null,
        y: null,
        isVertical: null,
      },
    };
  },

  computed: {
    verticalWords: function verticalWords() {
      return this.words.filter(function(_ref) {
        var type = _ref.type;
        return type === "vertical";
      });
    },
    horizontalWords: function horizontalWords() {
      return this.words.filter(function(_ref2) {
        var type = _ref2.type;
        return type === "horizontal";
      });
    }
  },

  watch: {
    width: function width(value) {
      this.$emit("rebuild", {
        width: Number(value),
        height: Number(this.height)
      });
    },
    height: function height(value) {
      this.$emit("rebuild", {
        width: Number(this.width),
        height: Number(value)
      });
    }
  },

  methods: {
    onInputLetter: function onInputLetter(payload) {
      this.$emit("input", payload);
    },
    onFocusCell: function onFocusCell(x, y) {
      this.$emit("focus-cell", x, y);
    },
    async onModal ({ show, query, x, y, isVertical }) {
      if (show) {
        this.activeWord.x = x;
        this.activeWord.y = y;
        this.activeWord.isVertical = isVertical;
        this.loading = true;
        this.modal = true;
        var url = `/crossword/words/find/0/${query}`;
        var cache = await window.caches.open('crossword');
        var match = await cache.match(url);
        if (!match) {
          await cache.add(url);
          match = await cache.match(url);
        }
        this.suggested = await match.json()
        this.loading = false;
        return;
      }

      this.modal = false;
    },
    getWord ({ id, length, ...letters }) {
      return Object.values(letters).join('');
    },
    pasteWord (word) {
      this.$emit('paste-word', {
        word: word,
        x: this.activeWord.x,
        y: this.activeWord.y,
        isVertical: this.activeWord.isVertical,
      });
      this.modal = false;
      this.suggested = [];
      this.activeWord = { x: null, y: null, isVertical: null };
    }
  }
};

var BuilderPage = {
  name: "BuilderPage",

  template: "#BuilderPage",

  components: { BuilderForm: BuilderForm, BuilderGrid: BuilderGrid },

  data: function data() {
    return {
      width: 10,
      height: 10,
      blanks: [],
      letters: {},
      focusedCell: "0:0"
    };
  },

  computed: {
    horizontalWords: function horizontalWords() {
      var _this6 = this;

      var words = [];
      var row = 1;

      for (row; row <= this.height; row += 1) {
        var rowBlankCells = this.blanks
          .filter(function(cell) {
            return Number(cell.split(":")[1]) === row;
          })
          .map(function(cell) {
            return Number(cell.split(":")[0]);
          });

        if (rowBlankCells.length > 0) {
          (function() {
            var i = 1;
            // eslint-disable-next-line
            var cols = new Array(_this6.width).fill(0).map(function(col) {
              return i++;
            });

            if (cols) {
              (":" + cols.join("::") + ":")
                .split(new RegExp(":" + rowBlankCells.join(":|:") + ":"))
                .filter(function(word) {
                  var match = word.match(/:\d+:/g);

                  return match ? match.length > 1 : false;
                })
                .forEach(function(word) {
                  var match = word.match(/:\d+:/g);
                  var length = match ? match.length : 0;

                  words.push({
                    x: Number(word.match(/^:(\d+)/)[1]),
                    y: row,
                    type: "horizontal",
                    length: length,
                    question: ""
                  });
                });
            }
          })();
        } else {
          words.push({
            x: 1,
            y: row,
            type: "horizontal",
            length: this.width,
            question: ""
          });
        }
      }

      return words;
    },
    verticalWords: function verticalWords() {
      var _this7 = this;

      var words = [];
      var col = 1;

      for (col; col <= this.width; col += 1) {
        var colBlankCells = this.blanks
          .filter(function(cell) {
            return Number(cell.split(":")[0]) === col;
          })
          .map(function(cell) {
            return Number(cell.split(":")[1]);
          });

        if (colBlankCells.length > 0) {
          (function() {
            var i = 1;
            // eslint-disable-next-line
            var rows = new Array(_this7.height).fill(0).map(function(row) {
              return i++;
            });

            if (rows) {
              (":" + rows.join("::") + ":")
                .split(new RegExp(":" + colBlankCells.join(":|:") + ":"))
                .filter(function(word) {
                  var match = word.match(/:\d+:/g);

                  return match ? match.length > 1 : false;
                })
                .forEach(function(word) {
                  var match = word.match(/:\d+:/g);
                  var length = match ? match.length : 0;

                  words.push({
                    x: col,
                    y: Number(word.match(/^:(\d+)/)[1]),
                    type: "vertical",
                    length: length,
                    question: ""
                  });
                });
            }
          })();
        } else {
          words.push({
            x: col,
            y: 1,
            type: "vertical",
            length: this.height,
            question: ""
          });
        }
      }

      return words.sort(function(a, b) {
        return a.y - b.y;
      });
    },
    words: function words() {
      return this.addIndexes(
        [].concat(
          _toConsumableArray(this.horizontalWords),
          _toConsumableArray(this.verticalWords)
        )
      );
    },
    startCells: function startCells() {
      return []
        .concat(
          _toConsumableArray(this.horizontalWords),
          _toConsumableArray(this.verticalWords)
        )
        .map(function(word) {
          return {
            x: word.x,
            y: word.y
          };
        })
        .reduce(function(acc, cur) {
          if (
            !acc.find(function(_ref6) {
              var x = _ref6.x,
                y = _ref6.y;
              return x === cur.x && y === cur.y;
            })
          ) {
            acc.push(cur);
          }
          return acc;
        }, [])
        .sort(function(a, b) {
          return a.y === b.y ? a.x - b.x : a.y - b.y;
        })
        .map(function(word, index) {
          return _extends({}, word, { index: index + 1 });
        });
    },
    letterCells: function letterCells() {
      var _this8 = this;

      var cells = [];
      var col = 1;

      for (col; col <= this.width; col += 1) {
        var row = 1;

        var _loop = function _loop() {
          var re = new RegExp(col + ":" + row);

          if (
            !_this8.blanks.find(function(blank) {
              return blank && blank.match(re);
            })
          ) {
            cells.push({ x: col, y: row });
          }
        };

        for (row; row <= this.height; row += 1) {
          _loop();
        }
      }

      return cells.reduce(function(acc, _ref7) {
        var x = _ref7.x,
          y = _ref7.y;

        acc[x + ":" + y] = "";
        return acc;
      }, {});
    }
  },
  watch: {
    letterCells: function letterCells(value) {
      this.letters = _extends({}, value, this.letters);
    }
  },
  mounted: function mounted() {
    this.letters = this.letterCells;
  },
  methods: {
    rebuildGrid: function rebuildGrid(_ref8) {
      var width = _ref8.width,
        height = _ref8.height;

      this.width = width;
      this.height = height;
    },
    onBlanksUpdate: function onBlanksUpdate(id) {
      if (!this.blanks.includes(id)) {
        return this.blanks.push(id);
      }

      this.blanks = this.blanks.filter(function(blank) {
        return blank !== id;
      });
    },
    onInputLetter: function onInputLetter(_ref9) {
      var x = _ref9.x,
        y = _ref9.y,
        value = _ref9.value;

      this.letters[x + ":" + y] = value;
    },
    addIndexes: function addIndexes(words) {
      var _this9 = this;

      return words.map(function(word) {
        var _startCells$find = _this9.startCells.find(function(_ref10) {
            var x = _ref10.x,
              y = _ref10.y;
            return word.x === x && word.y === y;
          }),
          index = _startCells$find.index;

        return _extends({}, word, { index: index });
      });
    },
    onFocusCell: function onFocusCell(x, y) {
      this.focusedCell = x + ":" + y;
    },
    onPasteLetters ({ word, x, y, isVertical }) {
      word.split('').forEach((letter, index) => {
        if (isVertical) {
          this.letters[`${x}:${y + index}`] = letter
        }
        else {
          this.letters[`${x + index}:${y}`] = letter
        }
      })
    },
    onLettersUpdate ({ letters }) {
      Object.assign(this.letters, letters)
    }
  }
};

var App = {
  name: "App",
  template: "#App",
  components: { BuilderPage: BuilderPage }
};

new Vue({
  el: "#crossword",
  components: { App: App },
  template: "<App/>",
  methods: {
    serialize (obj, prefix) {
      let str = [], p
      for(p in obj) {
        if (obj.hasOwnProperty(p)) {
          let k = prefix ? `${prefix}[${p}]` : p
          let v = obj[p]
          str.push((v !== null && typeof v === 'object')
            ? this.serialize(v, k)
            : encodeURIComponent(k) + '=' + encodeURIComponent(v))
        }
      }
      return str.join('&')
    },
  }
});
