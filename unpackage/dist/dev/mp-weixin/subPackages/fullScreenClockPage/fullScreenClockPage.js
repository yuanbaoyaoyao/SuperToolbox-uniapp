"use strict";
const common_vendor = require("../../common/vendor.js");
const store_index = require("../../store/index.js");
function getTimeStr() {
  let time = /* @__PURE__ */ new Date();
  let hour = ("00" + time.getHours()).slice(-2);
  let minute = ("00" + time.getMinutes()).slice(-2);
  let second = ("00" + time.getSeconds()).slice(-2);
  let timeStr = hour + minute + second;
  return timeStr;
}
const _sfc_main = {
  data() {
    return {
      canvasWidth: store_index.store.getters.screenWidth,
      timeStr: getTimeStr(),
      timeRunner: "",
      isShowCanvas: false,
      touchNum: 0,
      nowBackgroundColor: "",
      isHideButton: true,
      isHideCanvasTemp: false,
      rgba: {
        r: 100,
        g: 187,
        b: 227,
        a: 1
      },
      color: {
        r: 0,
        g: 0,
        b: 0,
        a: 1
      }
    };
  },
  computed: {
    timeArr() {
      return [...this.timeStr].map((unit, index) => {
        let max;
        if (index & true) {
          max = 9;
        } else if (index == 0) {
          max = 2;
        } else if (index == 2) {
          max = 5;
        } else if (index == 4) {
          max = 5;
        }
        return {
          max,
          current: Number(unit)
        };
      });
    }
  },
  mounted() {
    let nowTime = (/* @__PURE__ */ new Date()).getHours();
    if (nowTime >= 17 || nowTime <= 7) {
      this.nowBackgroundColor = "#000";
    } else {
      this.nowBackgroundColor = "";
    }
    common_vendor.index.showModal({
      title: "提示",
      content: "单击背景显示隐藏按钮，双击界面切换时间形态，长按界面返回主页。",
      showCancel: false,
      success: function(res) {
        if (res.confirm) {
          console.log("用户点击确定");
        } else if (res.cancel) {
          console.log("用户点击取消");
        }
      }
    });
    this.setTimeRunner();
    common_vendor.index.setKeepScreenOn({
      keepScreenOn: true
    });
  },
  beforeDestroy() {
    clearInterval(this.timeRunner);
  },
  methods: {
    handleClosePicker(e) {
      if (e) {
        this.isHideCanvasTemp = false;
      }
    },
    handleHideButton() {
      this.isHideButton = !this.isHideButton;
    },
    rgbaToHex(r, g, b, a) {
      const red = r.toString(16).padStart(2, "0");
      const green = g.toString(16).padStart(2, "0");
      const blue = b.toString(16).padStart(2, "0");
      const alpha = Math.round(a * 255).toString(16).padStart(2, "0").slice(2);
      return `#${alpha}${red}${green}${blue}`;
    },
    open(item) {
      this.$refs.colorPicker.open();
      this.isHideCanvasTemp = true;
    },
    confirm(e) {
      this.rgba = e.rgba;
      this.nowBackgroundColor = this.rgbaToHex(this.rgba.r, this.rgba.g, this.rgba.b, this.rgba.a);
    },
    handleReturn() {
      common_vendor.index.navigateBack();
    },
    handleShowClock() {
      this.isShowCanvas = !this.isShowCanvas;
      if (this.isShowCanvas) {
        this.drawClock();
      } else {
        this.setTimeRunner();
      }
    },
    maskTouchend(e) {
      this.touchNum++;
      let that = this;
      setTimeout(() => {
        if (this.touchNum >= 2) {
          that.handleShowClock();
        }
        this.touchNum = 0;
      }, 250);
    },
    setTimeRunner() {
      this.timeRunner = setInterval(() => {
        this.timeStr = getTimeStr();
      }, 1e3);
    },
    drawClock() {
      const ctx = common_vendor.index.createCanvasContext("clock", this);
      this.timeRunner = setInterval(() => {
        this.drawCanvas(ctx, this.canvasWidth);
        ctx.draw();
      }, 1e3);
    },
    drawCanvas(ctx, canvasWidth) {
      const centerX = canvasWidth / 2;
      const centerY = canvasWidth / 2;
      const radius = canvasWidth / 2 - 5;
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(Math.PI / 2);
      ctx.translate(-centerX, -centerY);
      ctx.setLineWidth(canvasWidth * 0.02);
      ctx.setStrokeStyle("#333333");
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
      ctx.stroke();
      const now = /* @__PURE__ */ new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const second = now.getSeconds();
      const hourAngle = (hour + minute / 60 + second / 3600) * (Math.PI / 6);
      ctx.setLineWidth(canvasWidth * 0.02);
      ctx.setStrokeStyle("#333333");
      ctx.beginPath();
      ctx.moveTo(
        centerX - Math.sin(hourAngle) * (radius * 0.05),
        centerY + Math.cos(hourAngle) * (radius * 0.05)
      );
      ctx.lineTo(
        centerX + Math.sin(hourAngle) * (radius * 0.5),
        centerY - Math.cos(hourAngle) * (radius * 0.5)
      );
      ctx.stroke();
      const minuteAngle = (minute + second / 60) * (Math.PI / 30);
      ctx.setLineWidth(canvasWidth * 0.01);
      ctx.setStrokeStyle("#333333");
      ctx.beginPath();
      ctx.moveTo(
        centerX - Math.sin(minuteAngle) * (radius * 0.08),
        centerY + Math.cos(minuteAngle) * (radius * 0.08)
      );
      ctx.lineTo(
        centerX + Math.sin(minuteAngle) * (radius * 0.8),
        centerY - Math.cos(minuteAngle) * (radius * 0.8)
      );
      ctx.stroke();
      const secondAngle = second * (Math.PI / 30);
      ctx.setLineWidth(canvasWidth * 3e-3 + 1);
      ctx.setStrokeStyle("#F58212");
      ctx.beginPath();
      ctx.moveTo(
        centerX - Math.sin(secondAngle) * (radius * 0.12),
        centerY + Math.cos(secondAngle) * (radius * 0.12)
      );
      ctx.lineTo(
        centerX + Math.sin(secondAngle) * (radius * 0.9),
        centerY - Math.cos(secondAngle) * (radius * 0.9)
      );
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(centerX, centerY, canvasWidth * 0.015, 0, 2 * Math.PI);
      ctx.setFillStyle("#F58212");
      ctx.fill();
      ctx.save();
      ctx.translate(centerX, centerY);
      const degStep = Math.PI / 30;
      ctx.setStrokeStyle("#333333");
      for (let i = 0; i < 60; i++) {
        if (i % 5 === 0) {
          ctx.setLineWidth(canvasWidth * 0.01);
          ctx.beginPath();
          ctx.moveTo(0, -radius * 0.93);
          ctx.lineTo(0, -radius * 0.98);
        } else {
          ctx.setLineWidth(canvasWidth * 5e-3);
          ctx.beginPath();
          ctx.moveTo(0, -radius * 0.96);
          ctx.lineTo(0, -radius * 0.98);
        }
        ctx.stroke();
        ctx.rotate(degStep);
      }
      ctx.restore();
    }
  }
};
if (!Array) {
  const _easycom_t_color_picker2 = common_vendor.resolveComponent("t-color-picker");
  _easycom_t_color_picker2();
}
const _easycom_t_color_picker = () => "../../components/t-color-picker/t-color-picker.js";
if (!Math) {
  _easycom_t_color_picker();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.isShowCanvas
  }, $data.isShowCanvas ? {
    b: !$data.isHideCanvasTemp,
    c: $data.canvasWidth + "px",
    d: $data.canvasWidth + "px",
    e: common_vendor.o((...args) => $options.maskTouchend && $options.maskTouchend(...args)),
    f: common_vendor.o((...args) => $options.handleReturn && $options.handleReturn(...args)),
    g: common_vendor.o((...args) => $options.handleHideButton && $options.handleHideButton(...args))
  } : {
    h: common_vendor.f($options.timeArr, (unit, unitIndex, i0) => {
      return {
        a: common_vendor.f(unit.max + 1, (item, index, i1) => {
          return {
            a: common_vendor.t(index),
            b: common_vendor.t(index),
            c: index,
            d: unit.current == index ? 1 : "",
            e: unit.current - 1 == index || index == unit.max && unit.current == 0 ? 1 : ""
          };
        }),
        b: unitIndex
      };
    }),
    i: common_vendor.o((...args) => $options.maskTouchend && $options.maskTouchend(...args)),
    j: common_vendor.o((...args) => $options.handleReturn && $options.handleReturn(...args)),
    k: common_vendor.o((...args) => $options.handleHideButton && $options.handleHideButton(...args))
  }, {
    l: common_vendor.sr("colorPicker", "debaeacc-0"),
    m: common_vendor.o($options.confirm),
    n: common_vendor.o($options.handleClosePicker),
    o: common_vendor.p({
      color: $data.color
    }),
    p: $data.nowBackgroundColor,
    q: common_vendor.o((...args) => $options.handleHideButton && $options.handleHideButton(...args)),
    r: !$data.isHideButton,
    s: common_vendor.o(($event) => $options.open("背景颜色"))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-debaeacc"], ["__file", "E:/Data/Code/Project/mine/frontEnd/uni-app-ruler/ruler/subPackages/fullScreenClockPage/fullScreenClockPage.vue"]]);
wx.createPage(MiniProgramPage);
