"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "defaultInput",
  props: {
    placeholder: {
      type: String,
      default: "请输入"
    }
  },
  data() {
    return {
      inputValue: ""
    };
  },
  methods: {
    setInputValue(event) {
      this.inputValue = event.detail.value;
      this.$emit("changeInput", this.inputValue);
    },
    clearInputValue() {
      this.inputValue = "";
      this.$emit("changeInput", this.inputValue);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.placeholder,
    b: $data.inputValue,
    c: common_vendor.o((...args) => $options.setInputValue && $options.setInputValue(...args)),
    d: $data.inputValue != ""
  }, $data.inputValue != "" ? {
    e: common_vendor.o((...args) => $options.clearInputValue && $options.clearInputValue(...args))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Data/Code/Project/mine/frontEnd/uni-app-ruler/ruler/components/defaultInput/defaultInput.vue"]]);
wx.createComponent(Component);
