"use strict";
const common_vendor = require("../../common/vendor.js");
const store_index = require("../../store/index.js");
const _sfc_main = {
  data() {
    return {
      isShowPhoto: false,
      isSection: false,
      imageWidth: 0,
      imageHeight: 0,
      itemWidth: 0,
      itemHeight: 0
    };
  },
  methods: {
    getPhoto() {
      let that = this;
      that.isShowPhoto = false;
      that.isSection = false;
      common_vendor.index.chooseImage({
        sourceType: ["album", "camera"],
        count: 1,
        success: function(res) {
          common_vendor.index.getImageInfo({
            src: res.tempFilePaths[0],
            success: function(image) {
              let screenWidth = store_index.store.getters.screenWidth;
              let screenHeight = store_index.store.getters.screenHeight;
              that.imageWidth = image.width;
              that.imageHeight = image.height;
              if (that.imageWidth > screenWidth) {
                const ratio = screenWidth / that.imageWidth;
                that.imageWidth = screenWidth;
                that.imageHeight *= ratio;
              }
              if (that.imageHeight > screenHeight) {
                const ratio = screenHeight / that.imageHeight;
                that.imageHeight = screenHeight;
                that.imageWidth *= ratio;
              }
              that.imageHeight = Number(that.imageHeight.toFixed(0));
              that.imageWidth = Number(that.imageWidth.toFixed(0));
              that.itemWidth = Number((that.imageWidth / 3).toFixed(0));
              that.itemHeight = Number((that.imageHeight / 3).toFixed(0));
              that.isShowPhoto = true;
              setTimeout(() => {
                const ctx = common_vendor.index.createCanvasContext("mycnavas");
                ctx.drawImage(res.tempFilePaths[0], 0, 0, that.imageWidth, that.imageHeight);
                ctx.draw();
              }, 300);
            }
          });
        },
        fail: (err) => {
        }
      });
    },
    //有可能不用async/await，可能是因为我使用了v-if，导致找不到canvas
    async newphoto() {
      const ctx = common_vendor.index.createCanvasContext("mycnavas");
      this.isSection = true;
      let promises = [];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          let q = i * 3 + j;
          promises.push(this.getImageData(ctx, j, i, q));
        }
      }
      await Promise.all(promises);
    },
    async getImageData(ctx, x, y, q) {
      let that = this;
      return new Promise((resolve, reject) => {
        common_vendor.index.canvasGetImageData({
          canvasId: "mycnavas",
          x: x * that.itemWidth,
          y: y * that.itemHeight,
          width: that.itemWidth,
          height: that.itemHeight,
          success: async (res) => {
            await this.putImageData(ctx, res.data, q);
            await this.canvasToTempFilePath(ctx, q);
            resolve();
          },
          fail(res) {
            console.log("fail:", res);
          }
        });
      });
    },
    async putImageData(ctx, data, q) {
      let that = this;
      return new Promise((resolve, reject) => {
        common_vendor.index.canvasPutImageData({
          data,
          canvasId: "img" + q,
          x: 0,
          y: 0,
          width: that.itemWidth,
          height: that.itemHeight,
          success: () => {
            resolve();
          }
        });
      });
    },
    async canvasToTempFilePath(ctx, q) {
      let that = this;
      return new Promise((resolve, reject) => {
        common_vendor.index.canvasToTempFilePath({
          canvasId: "img" + q,
          destWidth: that.itemWidth,
          destHeight: that.itemHeight,
          success: (res) => {
            resolve();
          }
        });
      });
    },
    //保存
    async saveCanvas() {
      for (let i = 0; i < 9; i++) {
        let canvasId = "img" + i;
        const tempFilePath = await this.canvasToFilPath(canvasId);
        await new Promise((resolve, reject) => {
          common_vendor.index.saveImageToPhotosAlbum({
            filePath: tempFilePath,
            success(resObj) {
              if (i == 9) {
                common_vendor.index.showToast({
                  title: "成功保存切图到相册",
                  icon: "success",
                  success: function(res) {
                  },
                  fail: function(res) {
                  }
                });
              }
              resolve(resObj);
            },
            fail(err) {
              reject(err);
            }
          });
        });
      }
    },
    // 保存临时路径
    async canvasToFilPath(canvasId) {
      return new Promise((resolve, reject) => {
        common_vendor.index.canvasToTempFilePath({
          canvasId,
          success: (res) => {
            resolve(res.tempFilePath);
          },
          fail: (err) => {
            reject(err);
          }
        }, this);
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => _ctx.cancas && _ctx.cancas(...args)),
    b: $data.imageWidth + "px",
    c: $data.imageHeight + "px",
    d: $data.isShowPhoto && !$data.isSection ? "0" : "-900px",
    e: $data.isShowPhoto && !$data.isSection ? "" : "fixed",
    f: common_vendor.f(9, (item, index, i0) => {
      return {
        a: index,
        b: "img" + index
      };
    }),
    g: $data.itemWidth + "px",
    h: $data.itemHeight + "px",
    i: $data.isSection,
    j: common_vendor.o((...args) => $options.getPhoto && $options.getPhoto(...args)),
    k: $data.isShowPhoto && !$data.isSection
  }, $data.isShowPhoto && !$data.isSection ? {
    l: common_vendor.o((...args) => $options.newphoto && $options.newphoto(...args))
  } : {}, {
    m: $data.isSection
  }, $data.isSection ? {
    n: common_vendor.o((...args) => $options.saveCanvas && $options.saveCanvas(...args))
  } : {}, {
    o: !$data.isShowPhoto && !$data.isSection ? "center" : "",
    p: !$data.isShowPhoto && !$data.isSection ? "100vh" : ""
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Data/Code/Project/mine/frontEnd/uni-app-ruler/ruler/pages/gridDiagram/gridDiagram.vue"]]);
wx.createPage(MiniProgramPage);
