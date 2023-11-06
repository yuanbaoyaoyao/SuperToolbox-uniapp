"use strict";
const common_vendor = require("../../common/vendor.js");
require("./xlsx.full.min.js");
var XLSX = require("./xlsx.full.min.js");
const _sfc_main = {
  data() {
    return {
      names: [],
      nameText: "",
      isStarting: false,
      timer: null,
      isAllowsDuplicates: false,
      excelData: [],
      textValue: "",
      isShowDialog: false,
      isReturn: true
    };
  },
  methods: {
    handleClearInfo() {
      this.names = [];
      this.isShowDialog = false;
      common_vendor.index.showToast({
        icon: "none",
        title: `清空信息成功`
      });
    },
    handleHideDialog() {
      this.isShowDialog = false;
    },
    openDialog() {
      if (this.names.length > 0) {
        this.isShowDialog = true;
      }
    },
    handelDeleteItem(index) {
      this.names.splice(index, 1);
    },
    addStringToArray(str, arr) {
      var splitArr = str.split(/[,，]/);
      arr = arr.concat(splitArr);
      return arr;
    },
    handleChangeTextValue(e) {
      this.textValue = e;
    },
    handleImportText() {
      this.names = this.addStringToArray(this.textValue, this.names);
    },
    chooseFile(e) {
      let that = this;
      common_vendor.wx$1.chooseMessageFile({
        count: 1,
        type: "file",
        extension: [".xls", ".xlsx"],
        success: (res) => {
          try {
            const path = res.tempFiles[0].path;
            const fs = common_vendor.wx$1.getFileSystemManager();
            const data = fs.readFileSync(path, "binary");
            that.process(data);
          } catch (e2) {
            console.error(e2);
            common_vendor.index.showModal({
              title: "提示",
              content: "文件读取失败",
              showCancel: false
            });
            return;
          }
        }
      });
    },
    process(data) {
      let workbook = XLSX.read(data, {
        type: "binary"
      });
      const sheetName = workbook.SheetNames[0];
      let sheet = workbook.Sheets[sheetName];
      const options = {
        // header:false,
        raw: false
        // 如果不加raw:true的话日期会被读成数字，根据开发需求决定
      };
      const rawData = XLSX.utils.sheet_to_json(sheet, options);
      for (let item of rawData) {
        const valuesArray = Object.values(item);
        for (let value of valuesArray) {
          this.names.push(value);
        }
      }
    },
    start() {
      if (this.names.length > 0) {
        this.isStarting = true;
        this.isReturn = false;
        this.timer = setInterval(() => {
          let index = Math.floor(Math.random() * this.names.length);
          this.nameText = this.names[index];
        }, 50);
      } else {
        common_vendor.index.showToast({
          icon: "none",
          title: `请先输入信息`
        });
      }
    },
    stop() {
      this.isStarting = false;
      clearInterval(this.timer);
      this.timer = null;
    },
    handleReturn() {
      this.isReturn = true;
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
    a: $data.names.length > 0
  }, $data.names.length > 0 ? common_vendor.e({
    b: $data.isStarting || !$data.isReturn
  }, $data.isStarting || !$data.isReturn ? {
    c: common_vendor.t($data.nameText)
  } : {
    d: common_vendor.f($data.names, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index,
        c: common_vendor.o(($event) => $options.handelDeleteItem(index), index)
      };
    })
  }) : {}, {
    e: common_vendor.o((...args) => $options.openDialog && $options.openDialog(...args)),
    f: common_vendor.o($options.handleChangeTextValue),
    g: common_vendor.p({
      placeholder: "请输入文本,根据逗号分割"
    }),
    h: common_vendor.o((...args) => $options.chooseFile && $options.chooseFile(...args)),
    i: common_vendor.o((...args) => $options.handleImportText && $options.handleImportText(...args)),
    j: !$data.isReturn && !$data.isStarting
  }, !$data.isReturn && !$data.isStarting ? {
    k: common_vendor.o((...args) => $options.handleReturn && $options.handleReturn(...args))
  } : {}, {
    l: !$data.isStarting
  }, !$data.isStarting ? {
    m: common_vendor.t($data.isReturn ? "开始" : "继续"),
    n: common_vendor.o((...args) => $options.start && $options.start(...args))
  } : {
    o: common_vendor.o((...args) => $options.stop && $options.stop(...args))
  }, {
    p: $data.isShowDialog
  }, $data.isShowDialog ? {} : {}, {
    q: $data.isShowDialog
  }, $data.isShowDialog ? {
    r: common_vendor.o((...args) => $options.handleHideDialog && $options.handleHideDialog(...args)),
    s: common_vendor.o((...args) => $options.handleClearInfo && $options.handleClearInfo(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Data/Code/Project/mine/frontEnd/uni-app-ruler/ruler/subPackages/randomShakerPage/randomShakerPage.vue"]]);
wx.createPage(MiniProgramPage);
