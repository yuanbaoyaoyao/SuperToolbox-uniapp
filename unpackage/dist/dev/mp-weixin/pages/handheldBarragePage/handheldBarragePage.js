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
    clearInput: function(event) {
      this.inputClearValue = event.detail.value;
      this.barrage = this.inputClearValue;
      if (event.detail.value.length > 0) {
        this.showClearIcon = true;
      } else {
        this.showClearIcon = false;
      }
    },
    clearIcon: function() {
      this.inputClearValue = "";
      this.showClearIcon = false;
      this.barrage = null;
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
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.isShowBarrage
  }, !$data.isShowBarrage ? common_vendor.e({
    b: $data.inputClearValue,
    c: common_vendor.o((...args) => $options.clearInput && $options.clearInput(...args)),
    d: $data.showClearIcon
  }, $data.showClearIcon ? {
    e: common_vendor.o((...args) => $options.clearIcon && $options.clearIcon(...args))
  } : {}, {
    f: common_vendor.o((...args) => $options.handleReturn && $options.handleReturn(...args)),
    g: common_vendor.o((...args) => $options.handleShowBarrage && $options.handleShowBarrage(...args))
  }) : {
    h: common_vendor.t($data.barrage),
    i: common_vendor.o((...args) => $options.handleQuiteBarrage && $options.handleQuiteBarrage(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Data/Code/Project/mine/frontEnd/uni-app-ruler/ruler/pages/handheldBarragePage/handheldBarragePage.vue"]]);
wx.createPage(MiniProgramPage);
