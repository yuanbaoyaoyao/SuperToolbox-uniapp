"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      src: "",
      isShowCamera: false,
      ctx: null,
      screenHeight: 0,
      screenWidth: 0,
      degree: 0
    };
  },
  onReady() {
    this.handleGetSysInfo();
  },
  methods: {
    handleCamera() {
      this.isShowCamera = !this.isShowCamera;
      this.handleGetSysInfo();
    },
    handleGetSysInfo() {
      let that = this;
      common_vendor.index.getSystemInfo({
        success: function(res) {
          const ctx = common_vendor.index.createCanvasContext("myCanvas");
          const ctx2 = common_vendor.index.createCanvasContext("myCanvas2");
          that.ctx = ctx2;
          that.screenHeight = res.screenHeight;
          that.screenWidth = res.screenWidth;
          that.drawRoundImage(res.screenHeight, ctx);
        }
      });
    },
    // 计算指针角度的函数  
    calculatePointerAngle(e, centerX, centerY) {
      const x = e.touches[0].x - centerX;
      const y = e.touches[0].y - centerY;
      const angle = Math.atan2(y, x);
      this.degree = (angle * 180 / Math.PI + 90).toFixed(2);
    },
    // 绘制指针的函数
    drawPointerLine(ctx, e, centerX, centerY) {
      const dx = e.touches[0].x - centerX;
      const dy = e.touches[0].y - centerY;
      const direction = Math.atan2(dy, dx);
      this.screenWidth;
      const length = this.screenWidth;
      const endX = centerX + Math.cos(direction) * length;
      const endY = centerY + Math.sin(direction) * length;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(endX, endY);
      ctx.setStrokeStyle("#333333");
      ctx.stroke();
      ctx.draw();
    },
    // 在canvas组件的touchstart回调中调用
    touchstart(e) {
      const centerX = 10;
      const centerY = this.screenHeight / 2;
      this.calculatePointerAngle(e, centerX, centerY);
      this.drawPointerLine(this.ctx, e, centerX, centerY);
      this.ctx.translate(centerX + 20, centerY - 20);
      this.ctx.rotate(Math.PI / 2);
      this.ctx.setFontSize(20);
      this.ctx.fillText(this.degree + "°", 0, 0);
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    },
    drawRoundImage(height, ctx) {
      ctx.beginPath();
      ctx.arc(10, height / 2, height / 2 - 50, 90 * Math.PI / 180, 270 * Math.PI / 180, true);
      ctx.lineTo(10, height - 50);
      ctx.setStrokeStyle("#333333");
      ctx.stroke();
      ctx.closePath();
      const degrees = 180;
      const tickSpacing = degrees / 180;
      const centerX = 10;
      const centerY = height / 2;
      const radius = height / 2 - 50;
      const centerTextX = 10;
      const centerTextY = height / 2 - 10;
      const textRadius = height / 2 - 85;
      for (let i = 0; i <= degrees; i += tickSpacing) {
        let tickLength = 10;
        if (i % 5 == 0) {
          tickLength = 15;
        }
        if (i % 10 == 0 || i == 0) {
          tickLength = 20;
        }
        const angle = i * Math.PI / 180 - Math.PI / 2;
        const startX = centerX + Math.cos(angle) * (radius - tickLength);
        const startY = centerY + Math.sin(angle) * (radius - tickLength);
        const endX = centerX + Math.cos(angle) * radius;
        const endY = centerY + Math.sin(angle) * radius;
        const textEndX = centerTextX + Math.cos(angle) * textRadius;
        const textEndY = centerTextY + Math.sin(angle) * textRadius;
        if (i % 10 == 0 || i == 0) {
          ctx.setFontSize(12);
          ctx.translate(textEndX, textEndY);
          ctx.rotate(Math.PI / 2);
          ctx.fillText(i, 0, 0);
          ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.setStrokeStyle("#333333");
        ctx.stroke();
        ctx.closePath();
      }
      ctx.restore();
      ctx.draw();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t(!$data.isShowCamera ? "打开相机" : "关闭相机"),
    b: common_vendor.o((...args) => $options.handleCamera && $options.handleCamera(...args)),
    c: $data.isShowCamera
  }, $data.isShowCamera ? {
    d: common_vendor.o((...args) => _ctx.error && _ctx.error(...args))
  } : {}, {
    e: common_vendor.o((...args) => $options.touchstart && $options.touchstart(...args)),
    f: common_vendor.o((...args) => $options.touchstart && $options.touchstart(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Data/Code/Project/mine/frontEnd/uni-app-ruler/ruler/pages/protractorPage/protractorPage.vue"]]);
wx.createPage(MiniProgramPage);
