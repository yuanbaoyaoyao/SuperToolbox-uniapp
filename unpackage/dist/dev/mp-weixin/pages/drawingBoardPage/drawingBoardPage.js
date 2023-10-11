"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  onShareAppMessage() {
  },
  onShareTimeline() {
  },
  data() {
    return {
      screenHeight: 0,
      screenWidth: 0,
      centerX: 0,
      centerY: 0,
      degree: 0,
      myCanvas1: null,
      myCanvas2: null,
      compassValue: 30
    };
  },
  onReady() {
    this.handleGetSysInfo();
    let that = this;
    common_vendor.index.onCompassChange((res) => {
      that.compassValue = parseInt(res.direction);
      that.drawPointer(res.direction);
    });
  },
  methods: {
    handleSaveToAlbum() {
      let _this = this;
      common_vendor.index.canvasToTempFilePath({
        canvasId: "myCanvas",
        destWidth: _this.screenWidth,
        destHeight: _this.screenHeight,
        quality: 1,
        fileType: "jpg",
        success: (res) => {
          common_vendor.index.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: function() {
              common_vendor.index.showToast({
                icon: "none",
                position: "bottom",
                title: "图片已下载至相册"
                // res.tempFilePath
              });
            }
          });
        }
      }, _this);
    },
    countDigits(num) {
      if (num === 0)
        return 1;
      let digits = 0;
      while (num > 0) {
        digits++;
        num = Math.floor(num / 10);
      }
      return digits;
    },
    handleGetSysInfo() {
      let that = this;
      common_vendor.index.getSystemInfo({
        success: function(res) {
          that.myCanvas2 = common_vendor.index.createCanvasContext("myCanvas2");
          that.myCanvas1 = common_vendor.index.createCanvasContext("myCanvas");
          that.screenHeight = res.screenHeight;
          that.screenWidth = res.screenWidth;
          that.drawRoundImage();
        }
      });
    },
    drawPointer(degree) {
      let angle;
      let ctx = this.myCanvas2;
      ctx.clearRect(0, 0, this.screenHeight, this.screenWidth);
      let height = this.screenHeight;
      if (height / 2 > this.screenWidth) {
        height = this.screenWidth * 2;
      }
      const centerX = this.screenWidth / 2;
      const centerY = height / 2;
      const diamondSide = centerX * 0.9;
      const diamondX = centerX - diamondSide / 2;
      const diamondY = centerY - diamondSide / 2;
      if (degree != void 0) {
        angle = degree * Math.PI / 180;
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle);
        ctx.translate(-centerX, -centerY);
      }
      ctx.beginPath();
      ctx.moveTo(diamondX + diamondSide * 0.43, centerY);
      ctx.lineTo(centerX, diamondY);
      ctx.lineTo(diamondX + diamondSide * 0.57, centerY);
      ctx.lineTo(diamondX + diamondSide * 0.43, centerY);
      ctx.fillStyle = "#ff0000";
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
      ctx.moveTo(diamondX + diamondSide * 0.43, centerY);
      ctx.lineTo(centerX, diamondY + diamondSide);
      ctx.lineTo(diamondX + diamondSide * 0.57, centerY);
      ctx.lineTo(diamondX + diamondSide * 0.43, centerY);
      ctx.fillStyle = "#333333";
      ctx.fill();
      ctx.closePath();
      ctx.draw();
    },
    drawRoundImage(e) {
      let pageX, pageY, angle;
      if (e != null) {
        pageX = e.touches[0].pageX;
        pageY = e.touches[0].pageY;
      }
      let height = this.screenHeight;
      let ctx = this.myCanvas1;
      if (height / 2 > this.screenWidth) {
        height = this.screenWidth * 2;
      }
      const degrees = 360;
      const tickSpacing = degrees / 180;
      const centerX = this.screenWidth / 2;
      const centerY = height / 2;
      const radius = this.screenWidth / 2 - 50;
      const textRadius = this.screenWidth / 2 - 30;
      const directionRadius = this.screenWidth / 2 - 80;
      if (e != null) {
        angle = Math.atan2(pageY - centerY, pageX - centerX);
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle);
        ctx.translate(-centerX, -centerY);
      }
      for (let i = 0; i <= degrees; i += tickSpacing) {
        let tickLength = 10;
        if (i % 30 == 0 || i == 0) {
          tickLength = 15;
        }
        const angle2 = i * Math.PI / 180 - Math.PI / 2;
        const startX = centerX + Math.cos(angle2) * (radius + tickLength);
        const startY = centerY + Math.sin(angle2) * (radius + tickLength);
        const endX = centerX + Math.cos(angle2) * radius;
        const endY = centerY + Math.sin(angle2) * radius;
        if ((i % 30 == 0 || i == 0) && i != 360) {
          const textAngle = i * Math.PI / 180 - Math.PI / 2;
          const textEndX = centerX + Math.cos(textAngle) * textRadius;
          const textEndY = centerY + Math.sin(textAngle) * textRadius;
          ctx.setFontSize(12);
          let extraRotate;
          if (this.countDigits(i) == 1) {
            extraRotate = -1.2 * Math.PI / 180;
          } else if (this.countDigits(i) == 2) {
            extraRotate = -2.5 * Math.PI / 180;
          } else if (this.countDigits(i) == 3) {
            extraRotate = -3.7 * Math.PI / 180;
          }
          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.rotate(extraRotate);
          ctx.translate(-centerX, -centerY);
          ctx.translate(textEndX, textEndY);
          ctx.rotate(i * Math.PI / 180);
          ctx.fillText(i, 0, 0);
          ctx.restore();
        }
        if ((i % 45 == 0 || i == 0) && i != 360) {
          const directionAngle = i * Math.PI / 180 - Math.PI / 2;
          const directionEndX = centerX + Math.cos(directionAngle) * directionRadius;
          const directionEndY = centerY + Math.sin(directionAngle) * directionRadius;
          ctx.setFontSize(20);
          let extraRotate = -5 * Math.PI / 180;
          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.rotate(extraRotate);
          ctx.translate(-centerX, -centerY);
          ctx.translate(directionEndX, directionEndY);
          ctx.rotate(i * Math.PI / 180 + 0.08);
          switch (i) {
            case 0:
              ctx.fillText("北", 0, 0);
              break;
            case 90:
              ctx.fillText("东", 0, 0);
              break;
            case 180:
              ctx.fillText("南", 0, 0);
              break;
            case 270:
              ctx.fillText("西", 0, 0);
              break;
          }
          ctx.restore();
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
  return {
    a: common_vendor.o((...args) => $options.handleSaveToAlbum && $options.handleSaveToAlbum(...args)),
    b: common_vendor.t($data.compassValue),
    c: common_vendor.o((...args) => $options.drawPointer && $options.drawPointer(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Data/Code/Project/mine/frontEnd/uni-app-ruler/ruler/pages/drawingBoardPage/drawingBoardPage.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
