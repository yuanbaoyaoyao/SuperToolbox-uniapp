"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      nowCopy: "",
      nowMessage: "",
      newMessage1: "",
      newMessage2: "",
      newMessage3: "",
      newMessage4: "",
      newMessage5: "",
      newMessage6: "",
      newMessage7: "",
      newMessage8: "",
      newMessage9: "",
      newMessage10: "",
      newMessage11: "",
      newMessage12: "",
      newMessage13: ""
      // newMessage14: '',
      // newMessage15: '',
      // newMessage16: '',
      // newMessage17: '',
      // newMessage18: '',
      // newMessage19: '',
    };
  },
  computed: {
    getMessage(n) {
      return (n2) => this[`newMessage${n2}`];
    }
  },
  methods: {
    handleCopy(n) {
      this.nowCopy = n;
      setTimeout(() => {
        this.nowCopy = "";
      }, 600);
      let that = this;
      common_vendor.index.setClipboardData({
        data: that[`newMessage${n}`],
        // 必须字符串
        success: function() {
          common_vendor.index.showToast({
            title: "复制成功"
          });
        }
      });
    },
    handleChangeTextValue(e) {
      this.nowMessage = e;
      this.handleChangeNewMessage1(e);
      this.handleChangeNewMessage2(e);
      this.handleChangeNewMessage3(e);
      this.handleChangeNewMessage4(e);
      this.handleChangeNewMessage5(e);
      this.handleChangeNewMessage6(e);
      this.handleChangeNewMessage7(e);
      this.handleChangeNewMessage8(e);
      this.handleChangeNewMessage9(e);
      this.handleChangeNewMessage10(e);
      this.handleChangeNewMessage11(e);
      this.handleChangeNewMessage12(e);
      this.handleChangeNewMessage13(e);
    },
    handleChangeNewMessage1(e) {
      var newMessage = "";
      for (var codePoint of e) {
        codePoint = codePoint.charCodeAt(0);
        if (codePoint >= 65 && codePoint <= 90) {
          codePoint += 119743;
          newMessage += String.fromCodePoint(codePoint);
        } else if (codePoint >= 97 && codePoint <= 122) {
          codePoint += 119737;
          newMessage += String.fromCodePoint(codePoint);
        } else {
          newMessage += String.fromCodePoint(codePoint);
        }
      }
      this.newMessage1 = newMessage;
    },
    handleChangeNewMessage2(e) {
      var newMessage = "";
      for (var codePoint of e) {
        codePoint = codePoint.charCodeAt(0);
        if (codePoint >= 65 && codePoint <= 90) {
          codePoint += 120315;
          newMessage += String.fromCodePoint(codePoint);
        } else if (codePoint >= 97 && codePoint <= 122) {
          codePoint += 120309;
          newMessage += String.fromCodePoint(codePoint);
        } else {
          newMessage += String.fromCodePoint(codePoint);
        }
      }
      this.newMessage2 = newMessage;
    },
    handleChangeNewMessage3(e) {
      var newMessage = "";
      for (var codePoint of e) {
        codePoint = codePoint.charCodeAt(0);
        if (codePoint >= 65 && codePoint <= 90) {
          codePoint += 119795;
          newMessage += String.fromCodePoint(codePoint);
        } else if (codePoint >= 97 && codePoint <= 122) {
          if (codePoint == 104) {
            codePoint = 8462;
          } else {
            codePoint += 119789;
          }
          newMessage += String.fromCodePoint(codePoint);
        } else {
          newMessage += String.fromCodePoint(codePoint);
        }
      }
      this.newMessage3 = newMessage;
    },
    handleChangeNewMessage4(e) {
      var newMessage = "";
      for (var codePoint of e) {
        codePoint = codePoint.charCodeAt(0);
        if (codePoint >= 65 && codePoint <= 90) {
          codePoint += 119847;
          newMessage += String.fromCodePoint(codePoint);
        } else if (codePoint >= 97 && codePoint <= 122) {
          codePoint += 119841;
          newMessage += String.fromCodePoint(codePoint);
        } else {
          newMessage += String.fromCodePoint(codePoint);
        }
      }
      this.newMessage4 = newMessage;
    },
    handleChangeNewMessage5(e) {
      var newMessage = "";
      for (var codePoint of e) {
        codePoint = codePoint.charCodeAt(0);
        if (codePoint >= 65 && codePoint <= 90) {
          if (codePoint == 66) {
            codePoint = 8492;
          } else if (codePoint == 69) {
            codePoint = 8496;
          } else if (codePoint == 70) {
            codePoint = 8497;
          } else if (codePoint == 72) {
            codePoint = 8459;
          } else if (codePoint == 73) {
            codePoint = 8464;
          } else if (codePoint == 76) {
            codePoint = 8466;
          } else if (codePoint == 77) {
            codePoint = 8499;
          } else if (codePoint == 82) {
            codePoint = 8475;
          } else {
            codePoint += 119899;
          }
          newMessage += String.fromCodePoint(codePoint);
        } else if (codePoint >= 97 && codePoint <= 122) {
          if (codePoint == 101) {
            codePoint = 8495;
          } else if (codePoint == 103) {
            codePoint = 8458;
          } else if (codePoint == 111) {
            codePoint = 8500;
          } else {
            codePoint += 119893;
          }
          newMessage += String.fromCodePoint(codePoint);
        } else {
          newMessage += String.fromCodePoint(codePoint);
        }
      }
      this.newMessage5 = newMessage;
    },
    handleChangeNewMessage6(e) {
      var newMessage = "";
      for (var codePoint of e) {
        codePoint = codePoint.charCodeAt(0);
        if (codePoint >= 65 && codePoint <= 90) {
          codePoint += 119951;
          newMessage += String.fromCodePoint(codePoint);
        } else if (codePoint >= 97 && codePoint <= 122) {
          codePoint += 119945;
          newMessage += String.fromCodePoint(codePoint);
        } else {
          newMessage += String.fromCodePoint(codePoint);
        }
      }
      this.newMessage6 = newMessage;
    },
    handleChangeNewMessage7(e) {
      var newMessage = "";
      for (var codePoint of e) {
        codePoint = codePoint.charCodeAt(0);
        if (codePoint >= 65 && codePoint <= 90) {
          if (codePoint == 67) {
            codePoint = 8493;
          } else if (codePoint == 72) {
            codePoint = 8460;
          } else if (codePoint == 73) {
            codePoint = 8465;
          } else if (codePoint == 82) {
            codePoint = 8476;
          } else if (codePoint == 90) {
            codePoint = 8488;
          } else {
            codePoint += 120003;
          }
          newMessage += String.fromCodePoint(codePoint);
        } else if (codePoint >= 97 && codePoint <= 122) {
          codePoint += 119997;
          newMessage += String.fromCodePoint(codePoint);
        } else {
          newMessage += String.fromCodePoint(codePoint);
        }
      }
      this.newMessage7 = newMessage;
    },
    handleChangeNewMessage8(e) {
      var newMessage = "";
      for (var codePoint of e) {
        codePoint = codePoint.charCodeAt(0);
        if (codePoint >= 65 && codePoint <= 90) {
          if (codePoint == 67) {
            codePoint = 8450;
          } else if (codePoint == 72) {
            codePoint = 8461;
          } else if (codePoint == 78) {
            codePoint = 8469;
          } else if (codePoint == 80) {
            codePoint = 8473;
          } else if (codePoint == 81) {
            codePoint = 8474;
          } else if (codePoint == 82) {
            codePoint = 8477;
          } else if (codePoint == 90) {
            codePoint = 8484;
          } else {
            codePoint += 120055;
          }
          newMessage += String.fromCodePoint(codePoint);
        } else if (codePoint >= 97 && codePoint <= 122) {
          codePoint += 120049;
          newMessage += String.fromCodePoint(codePoint);
        } else {
          newMessage += String.fromCodePoint(codePoint);
        }
      }
      this.newMessage8 = newMessage;
    },
    handleChangeNewMessage9(e) {
      var newMessage = "";
      for (var codePoint of e) {
        codePoint = codePoint.charCodeAt(0);
        if (codePoint >= 65 && codePoint <= 90) {
          codePoint += 120107;
          newMessage += String.fromCodePoint(codePoint);
        } else if (codePoint >= 97 && codePoint <= 122) {
          codePoint += 120101;
          newMessage += String.fromCodePoint(codePoint);
        } else {
          newMessage += String.fromCodePoint(codePoint);
        }
      }
      this.newMessage9 = newMessage;
    },
    handleChangeNewMessage10(e) {
      var newMessage = "";
      for (var codePoint of e) {
        codePoint = codePoint.charCodeAt(0);
        if (codePoint >= 65 && codePoint <= 90) {
          codePoint += 120159;
          newMessage += String.fromCodePoint(codePoint);
        } else if (codePoint >= 97 && codePoint <= 122) {
          codePoint += 120153;
          newMessage += String.fromCodePoint(codePoint);
        } else {
          newMessage += String.fromCodePoint(codePoint);
        }
      }
      this.newMessage10 = newMessage;
    },
    handleChangeNewMessage11(e) {
      var newMessage = "";
      for (var codePoint of e) {
        codePoint = codePoint.charCodeAt(0);
        if (codePoint >= 65 && codePoint <= 90) {
          codePoint += 120263;
          newMessage += String.fromCodePoint(codePoint);
        } else if (codePoint >= 97 && codePoint <= 122) {
          codePoint += 120257;
          newMessage += String.fromCodePoint(codePoint);
        } else {
          newMessage += String.fromCodePoint(codePoint);
        }
      }
      this.newMessage11 = newMessage;
    },
    handleChangeNewMessage12(e) {
      var newMessage = "";
      for (var codePoint of e) {
        codePoint = codePoint.charCodeAt(0);
        if (codePoint >= 65 && codePoint <= 90) {
          codePoint += 120315;
          newMessage += String.fromCodePoint(codePoint);
        } else if (codePoint >= 97 && codePoint <= 122) {
          codePoint += 120309;
          newMessage += String.fromCodePoint(codePoint);
        } else {
          newMessage += String.fromCodePoint(codePoint);
        }
      }
      this.newMessage12 = newMessage;
    },
    handleChangeNewMessage13(e) {
      var newMessage = "";
      for (var codePoint of e) {
        codePoint = codePoint.charCodeAt(0);
        if (codePoint >= 65 && codePoint <= 90) {
          codePoint += 120367;
          newMessage += String.fromCodePoint(codePoint);
        } else if (codePoint >= 97 && codePoint <= 122) {
          codePoint += 120361;
          newMessage += String.fromCodePoint(codePoint);
        } else {
          newMessage += String.fromCodePoint(codePoint);
        }
      }
      this.newMessage13 = newMessage;
    },
    handleChangeNewMessage14(e) {
      var newMessage = "";
      for (var codePoint of e) {
        codePoint = codePoint.charCodeAt(0);
        if (codePoint >= 65 && codePoint <= 90) {
          codePoint += 120423;
          newMessage += String.fromCodePoint(codePoint);
        } else if (codePoint >= 97 && codePoint <= 122) {
          codePoint += 120417;
          newMessage += String.fromCodePoint(codePoint);
        } else {
          newMessage += String.fromCodePoint(codePoint);
        }
      }
      this.newMessage14 = newMessage;
    },
    handleChangeNewMessage15(e) {
      var newMessage = "";
      for (var codePoint of e) {
        codePoint = codePoint.charCodeAt(0);
        if (codePoint >= 65 && codePoint <= 90) {
          codePoint += 120481;
          newMessage += String.fromCodePoint(codePoint);
        } else if (codePoint >= 97 && codePoint <= 122) {
          codePoint += 120475;
          newMessage += String.fromCodePoint(codePoint);
        } else {
          newMessage += String.fromCodePoint(codePoint);
        }
      }
      this.newMessage15 = newMessage;
    },
    handleChangeNewMessage16(e) {
      var newMessage = "";
      for (var codePoint of e) {
        codePoint = codePoint.charCodeAt(0);
        if (codePoint >= 65 && codePoint <= 90) {
          codePoint += 120539;
          newMessage += String.fromCodePoint(codePoint);
        } else if (codePoint >= 97 && codePoint <= 122) {
          codePoint += 120533;
          newMessage += String.fromCodePoint(codePoint);
        } else {
          newMessage += String.fromCodePoint(codePoint);
        }
      }
      this.newMessage16 = newMessage;
    },
    handleChangeNewMessage17(e) {
      var newMessage = "";
      for (var codePoint of e) {
        codePoint = codePoint.charCodeAt(0);
        if (codePoint >= 65 && codePoint <= 90) {
          codePoint += 120597;
          newMessage += String.fromCodePoint(codePoint);
        } else if (codePoint >= 97 && codePoint <= 122) {
          codePoint += 120591;
          newMessage += String.fromCodePoint(codePoint);
        } else {
          newMessage += String.fromCodePoint(codePoint);
        }
      }
      this.newMessage17 = newMessage;
    },
    handleChangeNewMessage18(e) {
      var newMessage = "";
      for (var codePoint of e) {
        codePoint = codePoint.charCodeAt(0);
        if (codePoint >= 65 && codePoint <= 90) {
          codePoint += 120655;
          newMessage += String.fromCodePoint(codePoint);
        } else if (codePoint >= 97 && codePoint <= 122) {
          codePoint += 120649;
          newMessage += String.fromCodePoint(codePoint);
        } else {
          newMessage += String.fromCodePoint(codePoint);
        }
      }
      this.newMessage18 = newMessage;
    },
    handleChangeNewMessage19(e) {
      var newMessage = "";
      for (var codePoint of e) {
        codePoint = codePoint.charCodeAt(0);
        if (codePoint >= 65 && codePoint <= 90) {
          codePoint += 120655;
          newMessage += String.fromCodePoint(codePoint);
        } else if (codePoint >= 97 && codePoint <= 122) {
          codePoint += 120649;
          newMessage += String.fromCodePoint(codePoint);
        } else {
          newMessage += String.fromCodePoint(codePoint);
        }
      }
      this.newMessage19 = newMessage;
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
      placeholder: "请输入"
    }),
    c: $data.nowMessage != ""
  }, $data.nowMessage != "" ? {
    d: common_vendor.f(13, (n, k0, i0) => {
      return {
        a: common_vendor.t($options.getMessage(n)),
        b: n,
        c: common_vendor.o(($event) => $options.handleCopy(n), n),
        d: $data.nowCopy === n ? 1 : ""
      };
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Data/Code/Project/mine/frontEnd/uni-app-ruler/ruler/pages/wonderfulFonts/wonderfulFonts.vue"]]);
wx.createPage(MiniProgramPage);
