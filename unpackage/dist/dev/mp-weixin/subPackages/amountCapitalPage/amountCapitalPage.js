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
    handleCopy() {
      if (this.capital != null && this.capital != "超过限制或出现错误") {
        common_vendor.index.setClipboardData({
          data: this.capital,
          // 必须字符串
          success: function() {
            common_vendor.index.showToast({
              title: "复制成功"
            });
          }
        });
      }
    },
    handleChangeTextValue(e) {
      this.capital = this.transform(e);
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
        return "超过限制或出现错误";
      }
      return str;
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
  return {
    a: common_vendor.o($options.handleChangeTextValue),
    b: common_vendor.p({
      placeholder: "请输入数字金额"
    }),
    c: common_vendor.t($data.capital),
    d: $data.capital != null && $data.capital != "元",
    e: common_vendor.o((...args) => $options.handleCopy && $options.handleCopy(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Data/Code/Project/mine/frontEnd/uniapp/uni-app-ruler/ruler/subPackages/amountCapitalPage/amountCapitalPage.vue"]]);
wx.createPage(MiniProgramPage);
