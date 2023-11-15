"use strict";
const common_vendor = require("../../common/vendor.js");
const store_index = require("../../store/index.js");
const _sfc_main = {
  data() {
    return {
      latitude: void 0,
      longitude: void 0,
      speed: void 0,
      altitude: void 0,
      platform: "",
      isWatachedAD: false,
      accuratePosition: ""
    };
  },
  onReady() {
    this.platform = store_index.store.state.platform;
  },
  onShow: function() {
    let that = this;
    common_vendor.index.startLocationUpdate({
      success: (res) => {
        common_vendor.index.onLocationChange(function(res2) {
          that.latitude = res2.latitude.toFixed(2);
          that.longitude = res2.longitude.toFixed(2);
          that.altitude = res2.altitude.toFixed(2);
          that.speed = res2.speed.toFixed(2);
        });
      },
      fail: (err) => console.error("开启小程序接收位置消息失败：", err),
      complete: (msg) => console.log("调用开启小程序接收位置消息 API 完成")
    });
  },
  onHide: function() {
    common_vendor.index.stopLocationUpdate();
  },
  methods: {
    async handleGetAccurateInfo() {
      const location = await this.getLocationInfo();
      this.accuratePosition = location.address;
    }
    //获取位置信息
    // async getLocationInfo() {
    // 	return new Promise((resolve) => {
    // 		//位置信息默认数据
    // 		let location = {
    // 			longitude: 0,
    // 			latitude: 0,
    // 			province: "",
    // 			city: "",
    // 			area: "",
    // 			street: "",
    // 			address: "",
    // 		};
    // 		uni.getLocation({
    // 			type: "gcj02",
    // 			success(res) {
    // 				location.longitude = res.longitude;
    // 				location.latitude = res.latitude;
    // 				// 腾讯地图Api
    // 				const qqmapsdk = new QQMapWX({
    // 					key: '4QRBZ-ZCL6I-UKAG4-UNBE3-6YDKT-GTFBU' //这里填写自己申请的key
    // 				});
    // 				qqmapsdk.reverseGeocoder({
    // 					location,
    // 					success(response) {
    // 						let info = response.result;
    // 						console.log(info);
    // 						location.province = info.address_component.province;
    // 						location.city = info.address_component.city;
    // 						location.area = info.address_component.district;
    // 						location.street = info.address_component.street;
    // 						location.address = info.address;
    // 						resolve(location);
    // 					},
    // 					fail: function(error) {
    // 						console.error(error, '解析fail');
    // 					},
    // 					complete: function(res) {
    // 						console.log(res, 'complete');
    // 					}
    // 				});
    // 			},
    // 			fail(err) {
    // 				console.log(err)
    // 				resolve(location);
    // 			},
    // 		});
    // 	});
    // }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.longitude),
    b: common_vendor.t($data.latitude),
    c: $data.platform == "ios"
  }, $data.platform == "ios" ? {
    d: common_vendor.t($data.altitude)
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Data/Code/Project/mine/frontEnd/uniapp/uni-app-ruler/ruler/subPackages/altitudePage/altitudePage.vue"]]);
wx.createPage(MiniProgramPage);
