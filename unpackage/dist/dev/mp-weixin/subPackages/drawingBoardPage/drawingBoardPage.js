"use strict";
const common_vendor = require("../../common/vendor.js");
const thColor = () => "./th-color.js";
const thLine = () => "./th-line.js";
const _sfc_main = {
  props: {
    //canvasId
    canvasId: {
      type: String,
      default: `th-${Date.now()}`
    },
    //配置栏
    actionBar: {
      type: Array,
      default: () => {
        return [
          "pencli",
          "color",
          "back",
          "clear"
        ];
      }
    },
    //是否下载签名
    isDownload: {
      type: Boolean,
      default: true
    },
    //是否横屏
    horizontalScreen: {
      type: Boolean,
      default: false
    },
    //文件名称
    fileName: {
      type: String,
      default: "签名"
    },
    //线颜色
    delineColor: {
      type: String,
      default: "#000"
    },
    //线宽度
    delineWidth: {
      type: Number,
      default: 4
    }
  },
  data() {
    return {
      context: "",
      actionShow: true,
      history: [],
      lineColor: "#000",
      lineWidth: 4,
      canvasShow: true,
      bottomHeight: 0
    };
  },
  components: {
    thColor,
    thLine
  },
  mounted() {
    this.getIphoneBottom();
    this.lineColor = this.delineColor;
    this.lineWidth = this.delineWidth;
    const ctx = common_vendor.index.createCanvasContext(this.canvasId, this);
    this.context = ctx;
  },
  methods: {
    getIphoneBottom() {
      common_vendor.index.getSystemInfo({
        success: (res) => {
          const bottom = res.screenHeight - res.safeArea.bottom;
          this.bottomHeight = bottom > 0 ? bottom - 10 : bottom;
        }
      });
    },
    //操作栏显示控制
    judge(key) {
      if (this.actionBar.includes(key)) {
        return true;
      } else {
        return false;
      }
    },
    //打开选择器
    openAction(ref) {
      this.canvasShow = false;
      this.$refs[ref].checkModel();
    },
    //设置颜色
    setColor(color) {
      this.lineColor = color;
    },
    //设置线条
    setLine(width) {
      this.lineWidth = width;
    },
    //切换控制栏
    checkAction() {
      this.actionShow = !this.actionShow;
    },
    //保存
    async saveCanvas() {
      const tempFilePath = await this.canvasToFilPath();
      if (!this.isDownload) {
        return false;
      }
      return new Promise((resolve, reject) => {
        common_vendor.index.saveImageToPhotosAlbum({
          filePath: tempFilePath,
          success(resObj) {
            common_vendor.index.showToast({
              title: "成功保存画板到相册",
              icon: "success",
              success: function(res) {
              },
              fail: function(res) {
              }
            });
            resolve(resObj);
          },
          fail(err) {
            console.log("err:", err);
            reject(err);
          }
        });
      });
    },
    // 保存临时路径
    canvasToFilPath(conf = {}) {
      return new Promise((resolve, reject) => {
        common_vendor.index.canvasToTempFilePath({
          canvasId: this.canvasId,
          success: (res) => {
            resolve(res.tempFilePath);
          },
          fail: (err) => {
            reject(err);
          }
        }, this);
      });
    },
    //撤回
    goBack() {
      this.context.draw();
      this.history.pop();
      this.history.forEach((item, index) => {
        let {
          color,
          width
        } = item.style;
        this.context.beginPath();
        this.context.setLineCap("round");
        this.context.setStrokeStyle(color);
        this.context.setLineWidth(width);
        if (item.coordinates.length >= 2) {
          item.coordinates.forEach((it) => {
            if (it.type == "touchstart") {
              this.context.moveTo(it.x, it.y);
            } else {
              this.context.lineTo(it.x, it.y);
            }
          });
        } else {
          const point = item.coordinates[0];
          this.context.moveTo(point.x, point.y);
          this.context.lineTo(point.x + 1, point.y);
        }
        this.context.stroke();
      });
      this.context.draw(true);
    },
    //清空画布
    clear() {
      this.history = [];
      this.context.draw();
    },
    canvasStart(event) {
      let {
        x,
        y
      } = event.touches[0];
      this.history.push({
        style: {
          color: this.lineColor,
          width: this.lineWidth
        },
        coordinates: [{
          type: event.type,
          x,
          y
        }]
      });
      this.drawGraphics();
    },
    canvasMove(e) {
      let {
        x,
        y
      } = e.touches[0];
      this.history[this.history.length - 1].coordinates.push({
        type: e.type,
        x,
        y
      });
      this.drawGraphics();
    },
    //绘制
    drawGraphics() {
      let historyLen = this.history.length;
      if (!historyLen)
        return;
      let currentData = this.history[historyLen - 1];
      let coordinates = currentData.coordinates;
      if (!coordinates.length)
        return;
      let startPoint, endPoint;
      if (coordinates.length < 2) {
        startPoint = coordinates[coordinates.length - 1];
        endPoint = {
          x: startPoint.x + 1,
          y: startPoint.y
        };
      } else {
        startPoint = coordinates[coordinates.length - 2];
        endPoint = coordinates[coordinates.length - 1];
      }
      let style = currentData.style;
      this.context.beginPath();
      this.context.setLineCap("round");
      this.context.setStrokeStyle(style.color);
      this.context.setLineWidth(style.width);
      this.context.moveTo(startPoint.x, startPoint.y);
      this.context.lineTo(endPoint.x, endPoint.y);
      this.context.stroke();
      this.context.draw(true);
    }
  }
};
if (!Array) {
  const _component_th_color = common_vendor.resolveComponent("th-color");
  const _component_th_line = common_vendor.resolveComponent("th-line");
  (_component_th_color + _component_th_line)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.history.length == 0
  }, $data.history.length == 0 ? {
    b: common_vendor.n($props.horizontalScreen ? "rote-text" : "")
  } : {}, {
    c: $data.canvasShow,
    d: !$data.canvasShow ? 1 : "",
    e: $props.canvasId,
    f: $props.canvasId,
    g: common_vendor.o(($event) => $options.canvasStart($event)),
    h: common_vendor.o(($event) => $options.canvasMove($event)),
    i: !$data.canvasShow,
    j: $data.canvasShow ? 1 : "",
    k: $props.horizontalScreen ? 1 : "",
    l: $options.judge("pencli")
  }, $options.judge("pencli") ? {
    m: common_vendor.o(($event) => $options.openAction("thLine"))
  } : {}, {
    n: $options.judge("color")
  }, $options.judge("color") ? {
    o: common_vendor.o(($event) => $options.openAction("thColor"))
  } : {}, {
    p: $options.judge("back")
  }, $options.judge("back") ? {
    q: common_vendor.o((...args) => $options.goBack && $options.goBack(...args))
  } : {}, {
    r: $options.judge("clear")
  }, $options.judge("clear") ? {
    s: common_vendor.o((...args) => $options.clear && $options.clear(...args))
  } : {}, {
    t: common_vendor.o((...args) => $options.saveCanvas && $options.saveCanvas(...args)),
    v: common_vendor.n($props.horizontalScreen ? "rote-action" : ""),
    w: common_vendor.sr("thColor", "01d25940-0"),
    x: common_vendor.o($options.setColor),
    y: common_vendor.o(($event) => $data.canvasShow = true),
    z: common_vendor.sr("thLine", "01d25940-1"),
    A: common_vendor.o($options.setLine),
    B: common_vendor.o(($event) => $data.canvasShow = true),
    C: $data.bottomHeight + "px"
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-01d25940"], ["__file", "E:/Data/Code/Project/mine/frontEnd/uni-app-ruler/ruler/subPackages/drawingBoardPage/drawingBoardPage.vue"]]);
wx.createPage(MiniProgramPage);
