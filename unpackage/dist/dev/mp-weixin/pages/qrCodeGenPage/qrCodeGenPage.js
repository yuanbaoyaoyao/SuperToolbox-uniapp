"use strict";
const common_vendor = require("../../common/vendor.js");
const pages_qrCodeGenPage_uqrcode = require("./uqrcode.js");
const _sfc_main = {
  props: [],
  data() {
    return {
      qrShow: false,
      info: null,
      isDownload: true
    };
  },
  methods: {
    handleChangeTextValue(e) {
      this.info = e;
    },
    inputInfo(e) {
      this.info = String(e.detail.value);
      if (e.detail.value.length == 0) {
        this.qrShow = false;
      }
    },
    handleShowQRCode() {
      if (this.info != null && this.info != "") {
        this.qrFun(this.info);
      } else {
        this.qrShow = false;
        common_vendor.index.showToast({
          title: "请输入信息",
          icon: "error",
          success: function(res) {
          },
          fail: function(res) {
          }
        });
      }
    },
    qrFun: function(text) {
      this.qrShow = true;
      pages_qrCodeGenPage_uqrcode.uQRCode.make({
        canvasId: "qrcode",
        componentInstance: this,
        text,
        size: 150,
        margin: 0,
        backgroundColor: "#ffffff",
        foregroundColor: "#000000",
        fileType: "jpg",
        errorCorrectLevel: pages_qrCodeGenPage_uqrcode.uQRCode.errorCorrectLevel.H,
        success: (res) => {
        }
      });
    },
    //保存
    async saveCanvas() {
      const tempFilePath = await this.canvasToFilPath();
      return new Promise((resolve, reject) => {
        common_vendor.index.saveImageToPhotosAlbum({
          filePath: tempFilePath,
          success(resObj) {
            resolve(resObj);
          },
          fail(err) {
            reject(err);
          }
        });
      });
    },
    // 保存临时路径
    canvasToFilPath(conf = {}) {
      return new Promise((resolve, reject) => {
        common_vendor.index.canvasToTempFilePath({
          canvasId: "qrcode",
          success: (res) => {
            common_vendor.index.showToast({
              title: "成功保存二维码到相册",
              icon: "success",
              success: function(res2) {
              },
              fail: function(res2) {
              }
            });
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
if (!Array) {
  const _easycom_defaultInput2 = common_vendor.resolveComponent("defaultInput");
  _easycom_defaultInput2();
}
const _easycom_defaultInput = () => "../../components/defaultInput/defaultInput.js";
if (!Math) {
  _easycom_defaultInput();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.handleChangeTextValue),
    b: common_vendor.p({
      placeholder: "请输入信息"
    }),
    c: common_vendor.o((...args) => $options.handleShowQRCode && $options.handleShowQRCode(...args)),
    d: $data.info != null
  }, $data.info != null ? {
    e: $data.qrShow,
    f: $data.qrShow,
    g: common_vendor.o((...args) => $options.saveCanvas && $options.saveCanvas(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Data/Code/Project/mine/frontEnd/uni-app-ruler/ruler/pages/qrCodeGenPage/qrCodeGenPage.vue"]]);
wx.createPage(MiniProgramPage);
