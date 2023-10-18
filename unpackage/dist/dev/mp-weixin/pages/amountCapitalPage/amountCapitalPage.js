"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      capital: null,
      showClearIcon: false,
      inputClearValue: ""
    };
  },
  methods: {
    clearInput: function(event) {
      this.inputClearValue = event.detail.value;
      this.capital = this.transform(this.inputClearValue);
      if (event.detail.value.length > 0) {
        this.showClearIcon = true;
      } else {
        this.showClearIcon = false;
      }
    },
    clearIcon: function() {
      this.inputClearValue = "";
      this.showClearIcon = false;
      this.capital = null;
    },
    transform(tranvalue) {
      try {
        var i = 1;
        var dw2 = new Array("", "万", "亿");
        var dw1 = new Array("拾", "佰", "仟");
        var dw = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖");
        var source = new Array("", "");
        temp = tranvalue.split(".");
        for (var i = 0; i < temp.length; i++) {
          source[i] = temp[i];
        }
        var num = source[0];
        var dig = source[1];
        var k1 = 0;
        var k2 = 0;
        var sum = 0;
        var str = "";
        var len = source[0].length;
        for (i = 1; i <= len; i++) {
          var n = source[0].charAt(len - i);
          var bn = 0;
          if (len - i - 1 >= 0) {
            bn = source[0].charAt(len - i - 1);
          }
          sum = sum + Number(n);
          if (sum != 0) {
            str = dw[Number(n)].concat(str);
            if (n == "0")
              sum = 0;
          }
          if (len - i - 1 >= 0) {
            if (k1 != 3) {
              if (bn != 0) {
                str = dw1[k1].concat(str);
              }
              k1++;
            } else {
              k1 = 0;
              var temp = str.charAt(0);
              if (temp == "万" || temp == "亿")
                str = str.substr(1, str.length - 1);
              str = dw2[k2].concat(str);
              sum = 0;
            }
          }
          if (k1 == 3) {
            k2++;
          }
        }
        var strdig = "";
        if (dig != "") {
          var n = dig.charAt(0);
          if (n != 0) {
            strdig += dw[Number(n)] + "角";
          }
          var n = dig.charAt(1);
          if (n != 0) {
            strdig += dw[Number(n)] + "分";
          }
        }
        str += "元" + strdig;
      } catch (e) {
        return "超过限制";
      }
      return str;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.inputClearValue,
    b: common_vendor.o((...args) => $options.clearInput && $options.clearInput(...args)),
    c: $data.showClearIcon
  }, $data.showClearIcon ? {
    d: common_vendor.o((...args) => $options.clearIcon && $options.clearIcon(...args))
  } : {}, {
    e: common_vendor.t($data.capital),
    f: $data.capital != null && $data.capital != "元"
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Data/Code/Project/mine/frontEnd/uni-app-ruler/ruler/pages/amountCapitalPage/amountCapitalPage.vue"]]);
wx.createPage(MiniProgramPage);
