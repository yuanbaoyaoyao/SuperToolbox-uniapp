"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      isShowBarrage: false,
      barrage: null,
      showClearIcon: false,
      inputClearValue: ""
    };
  },
  methods: {
    handleChangeTextValue(e) {
      this.barrage = e;
    },
    handleShowBarrage() {
      this.isShowBarrage = true;
    },
    handleQuiteBarrage() {
      this.isShowBarrage = false;
    },
    handleReturn() {
      common_vendor.index.navigateBack();
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
    a: !$data.isShowBarrage
  }, !$data.isShowBarrage ? {
    b: common_vendor.o($options.handleChangeTextValue),
    c: common_vendor.p({
      placeholder: "请输入弹幕"
    }),
    d: common_vendor.o((...args) => $options.handleReturn && $options.handleReturn(...args)),
    e: common_vendor.o((...args) => $options.handleShowBarrage && $options.handleShowBarrage(...args))
  } : {
    f: common_vendor.t($data.barrage),
    g: common_vendor.o((...args) => $options.handleQuiteBarrage && $options.handleQuiteBarrage(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Data/Code/Project/mine/frontEnd/uni-app-ruler/ruler/pages/handheldBarragePage/handheldBarragePage.vue"]]);
wx.createPage(MiniProgramPage);
