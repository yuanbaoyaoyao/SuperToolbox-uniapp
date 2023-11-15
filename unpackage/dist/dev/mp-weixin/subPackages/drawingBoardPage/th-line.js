"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      lineShow: false,
      lineData: [4, 8, 12, 16, 18]
    };
  },
  methods: {
    checkModel() {
      this.lineShow = !this.lineShow;
      if (!this.lineShow) {
        this.$emit("closePop");
      }
    },
    checkline(item) {
      this.lineShow = false;
      this.$emit("setLine", item);
      this.$emit("closePop");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.lineShow
  }, $data.lineShow ? {
    b: common_vendor.f($data.lineData, (item, index, i0) => {
      return {
        a: item,
        b: common_vendor.o(($event) => $options.checkline(item), item),
        c: item + "px"
      };
    }),
    c: common_vendor.n($data.lineShow ? "open-line" : "close-line"),
    d: common_vendor.o(() => {
    }),
    e: common_vendor.o((...args) => $options.checkModel && $options.checkModel(...args))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7254d304"], ["__file", "E:/Data/Code/Project/mine/frontEnd/uniapp/uni-app-ruler/ruler/subPackages/drawingBoardPage/th-line.vue"]]);
wx.createComponent(Component);
