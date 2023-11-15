"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      colorShow: false,
      colorData: [
        "red",
        "black",
        "blue",
        "yellow",
        "green",
        "#d925ff",
        "#00b4ff",
        "#ff00cc",
        "#35ff81",
        "#ff9c00",
        "#ff7e00",
        "#b4ff00",
        "#28caa6",
        "#490086",
        "#deb7fe",
        "#acacad",
        "#525252",
        "#a5896f",
        "#bb3a30",
        "#0058b2"
      ],
      checkItem: ""
    };
  },
  methods: {
    checkModel() {
      this.colorShow = !this.colorShow;
      if (!this.colorShow) {
        this.$emit("closePop");
      }
    },
    //选择颜色
    checkColor(item) {
      this.checkItem = item;
      this.colorShow = false;
      this.$emit("setColor", item);
      this.$emit("closePop");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.colorShow
  }, $data.colorShow ? {
    b: common_vendor.f($data.colorData, (item, index, i0) => {
      return {
        a: item,
        b: item,
        c: common_vendor.o(($event) => $options.checkColor(item), item),
        d: $data.checkItem == item ? 1 : ""
      };
    }),
    c: common_vendor.n($data.colorShow ? "open-color" : "close-color"),
    d: common_vendor.o(() => {
    }),
    e: common_vendor.o((...args) => $options.checkModel && $options.checkModel(...args))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-10cca304"], ["__file", "E:/Data/Code/Project/mine/frontEnd/uniapp/uni-app-ruler/ruler/subPackages/drawingBoardPage/th-color.vue"]]);
wx.createComponent(Component);
