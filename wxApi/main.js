// 小程序开发api接口工具包，https://github.com/gooking/wxapi
const CONFIG = require('./config.js')
const API_BASE_URL = 'https://api.it120.cc'


const request = (url, needSubDomain, method, data) => {
  let _url = API_BASE_URL + (needSubDomain ? '/' + CONFIG.subDomain : '') + url
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: method,
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(request) {
        resolve(request.data)
      },
      fail(error) {
        reject(error)
      },
      complete(aaa) {
        // 加载完成
      }
    })
  })
}

/**
 * 小程序的promise没有finally方法，自己扩展下
 */
Promise.prototype.finally = function (callback) {
  var Promise = this.constructor;
  return this.then(
    function (value) {
      Promise.resolve(callback()).then(
        function () {
          return value;
        }
      );
    },
    function (reason) {
      Promise.resolve(callback()).then(
        function () {
          throw reason;
        }
      );
    }
  );
}

module.exports = {
  request,
  queryMobileLocation: (data) => {
    return request('/common/mobile-segment/location', false, 'get', data)
  },
  queryConfig: (data) => {
    return request('/config/get-value', true, 'get', data)
  },
  queryConfigBatch: (keys) => {
    return request('/config/values', true, 'get', { keys })
  },
  scoreRules: (data) => {
    return request('/score/send/rule', true, 'post', data)
  },
  scoreSign: (token) => {
    return request('/score/sign', true, 'post', {
      token
    })
  },
  scoreSignLogs: (data) => {
    return request('/score/sign/logs', true, 'post', data)
  },
  scoreTodaySignedInfo: (token) => {
    return request('/score/today-signed', true, 'get', {
      token
    })
  },
  scoreExchange: (number, token) => {
    return request('/score/exchange', true, 'post', {
      number,
      token
    })
  },
  scoreLogs: (data) => {
    return request('/score/logs', true, 'post', data)
  },
  shareGroupGetScore: (referrer, encryptedData, iv) => {
    return request('/score/share/wxa/group', true, 'post', {
      referrer,
      encryptedData,
      iv
    })
  },
  kanjiaList: (data) => {
    return request('/shop/goods/kanjia/list', true, 'post', data)
  },
  kanjiaSet: (goodsId) => {
    return request('/shop/goods/kanjia/set', true, 'get', { goodsId })
  },
  kanjiaJoin: (kjid, token) => {
    return request('/shop/goods/kanjia/join', true, 'post', {
      kjid,
      token
    })
  },
  kanjiaDetail: (kjid, joiner) => {
    return request('/shop/goods/kanjia/info', true, 'get', {
      kjid,
      joiner
    })
  },
  kanjiaHelp: (kjid, joiner, token, remark) => {
    return request('/shop/goods/kanjia/help', true, 'post', {
      kjid,
      joinerUser: joiner,
      token,
      remark
    })
  },
  kanjiaHelpDetail: (kjid, joiner, token) => {
    return request('/shop/goods/kanjia/myHelp', true, 'get', {
      kjid,
      joinerUser: joiner,
      token
    })
  },
  // 检测登录 token 是否有效
  checkToken: (token) => {
    return request('/user/check-token', true, 'get', {
      token
    })
  },
  addTempleMsgFormid: (data) => {
    return request('/template-msg/wxa/formId', true, 'post', data)
  },
  sendTempleMsg: (data) => {
    return request('/template-msg/put', true, 'post', data)
  },
  wxpay: (data) => {
    return request('/pay/wx/wxapp', true, 'post', data)
  },
  alipay: (data) => {
    return request('/pay/alipay/semiAutomatic/payurl', true, 'post', data)
  },
  // 用户登录
  login: (code) => {
    return request('/user/wxapp/login', true, 'post', {
      code,
      type: 2
    })
  },
  // 用户注册
  register: (data) => {
    return request('/user/wxapp/register/complex', true, 'post', data)
  },
  banners: (data) => {
    return request('/banner/list', true, 'get', data)
  },
  goodsCategory: () => {
    return request('/shop/goods/category/all', true, 'get')
  },
  // 获取商品列表
  goods: (data) => {
    return request('/shop/goods/list', true, 'post', data)
  },
  goodsDetail: (id) => {
    return request('/shop/goods/detail', true, 'get', {
      id
    })
  },
  goodsPrice: (data) => {
    return request('/shop/goods/price', true, 'post', data)
  },
  goodsReputation: (data) => {
    return request('/shop/goods/reputation', true, 'post', data)
  },
  coupons: (data) => {
    return request('/discounts/coupons', true, 'get', data)
  },
  couponDetail: (id) => {
    return request('/discounts/detail', true, 'get', {
      id
    })
  },
  myCoupons: (data) => {
    return request('/discounts/my', true, 'get', data)
  },
  fetchCoupons: (data) => {
    return request('/discounts/fetch', true, 'post', data)
  },
  noticeList: (data) => {
    return request('/notice/list', true, 'post', data)
  },
  noticeDetail: (id) => {
    return request('/notice/detail', true, 'get', {
      id
    })
  },
  addAddress: (data) => {
    return request('/user/shipping-address/add', true, 'post', data)
  },
  updateAddress: (data) => {
    return request('/user/shipping-address/update', true, 'post', data)
  },
  deleteAddress: (id, token) => {
    return request('/user/shipping-address/delete', true, 'post', {
      id,
      token
    })
  },
  queryAddress: (token) => {
    return request('/user/shipping-address/list', true, 'get', {
      token
    })
  },
  defaultAddress: (token) => {
    return request('/user/shipping-address/default', true, 'get', {
      token
    })
  },
  addressDetail: (id, token) => {
    return request('/user/shipping-address/detail', true, 'get', {
      id,
      token
    })
  },
  pingtuanSet: (goodsId) => {
    return request('/shop/goods/pingtuan/set', true, 'get', {
      goodsId
    })
  },
  pingtuanOpen: (goodsId, token) => {
    return request('/shop/goods/pingtuan/open', true, 'post', {
      goodsId,
      token
    })
  },
  pingtuanList: (goodsId) => {
    return request('/shop/goods/pingtuan/list', true, 'get', {
      goodsId
    })
  },
  videoDetail: (videoId) => {
    return request('/media/video/detail', true, 'get', {
      videoId
    })
  },
  // 用户信息
  // 绑定手机号码
  bindMobile: (data) => {
    return request('/user/wxapp/bindMobile', true, 'post', data)
  },
  // 获取用户信息
  userDetail: (token) => {
    return request('/user/detail', true, 'get', {
      token
    })
  },
  userAmount: (token) => {
    return request('/user/amount', true, 'get', {
      token
    })
  },
  orderCreate: (data) => {
    return request('/order/create', true, 'post', data)
  },
  orderList: (data) => {
    return request('/order/list', true, 'post', data)
  },
  orderDetail: (id, token) => {
    return request('/order/detail', true, 'get', {
      id,
      token
    })
  },
  orderDelivery: (orderId, token) => {
    return request('/order/delivery', true, 'post', {
      orderId,
      token
    })
  },
  orderReputation: (data) => {
    return request('/order/reputation', true, 'post', data)
  },
  orderClose: (orderId, token) => {
    return request('/order/close', true, 'post', {
      orderId,
      token
    })
  },
  orderPay: (orderId, token) => {
    return request('/order/pay', true, 'post', {
      orderId,
      token
    })
  },
  orderStatistics: (token) => {
    return request('/order/statistics', true, 'get', {
      token
    })
  },
  withDrawApply: (money, token) => {
    return request('/user/withDraw/apply', true, 'post', {
      money,
      token
    })
  },
  // 基础数据检索
// 读取所有省份
  province: () => {
    return request('/common/region/v2/province', false, 'get')
  },
  // 读取下级省市区数据
  nextRegion: (pid) => {
    return request('/common/region/v2/child', false, 'get', {
      pid
    })
  },
  cashLogs: (data) => {
    return request('/user/cashLog', true, 'post', data)
  },
  rechargeSendRules: () => {
    return request('/user/recharge/send/rule', true, 'get')
  },
  payBillDiscounts: () => {
    return request('/payBill/discounts', true, 'get')
  },
  payBill: (data) => {
    return request('/payBill/pay', true, 'post', data)
  },
  vipLevel: () => {
    return request('/config/vipLevel', true, 'get')
  },
  fxApply: (token, name, mobile) => {
    return request('/saleDistribution/apply', true, 'post', { token, name, mobile })
  },
  fxApplyProgress: (token) => {
    return request('/saleDistribution/apply/progress', true, 'get', { token })
  },
  fxMembers: (data) => {
    return request('/saleDistribution/members', true, 'post', data)
  },
  fxCommisionLog: (data) => {
    return request('/saleDistribution/commision/log', true, 'post', data)
  },
  wxaQrcode: (data) => {
    return request('/qrcode/wxa/unlimit', true, 'post', data)
  },
  virtualTraderList: (data) => {
    return request('/virtualTrader/list', true, 'post', data)
  },
  virtualTraderInfo: (token, id) => {
    return request('/virtualTrader/info', true, 'get', { token, id })
  },
  virtualTraderBuy: (token, id) => {
    return request('/virtualTrader/buy', true, 'post', { token, id })
  },
  virtualTraderBuyLogs: (data) => {
    return request('/virtualTrader/buy/logs', true, 'post', data)
  }
}




// 查询手机号码归属地
// WXAPI.queryMobileLocation(Object object)

// 读取 Banner 列表
// WXAPI.banners(Object object)

// 商品管理
// 获取所有的商品分类
// WXAPI.goodsCategory()

// 获取商品列表
// WXAPI.goods(Object object)

// 获取商品详情信息
// WXAPI.goodsDetail(id)

// 获取商品价格（以便用户选择了不同规格尺寸后读取新价格）
// WXAPI.goodsPrice(Object object)

// 获取商品的评价
// WXAPI.goodsReputation(Object object)

// 站点信息
// 读取后台vip等级（用于判断是免费后台还是专业后台）
// WXAPI.vipLevel()

// 读取系统参数
// WXAPI.queryConfig(Object object)

// 批量读取系统参数
// WXAPI.queryConfigBatch(keys)

// 根据视频编号读取视频详情
// WXAPI.videoDetail(videoId)

// 优惠券管理
// 获取可领取优惠券
// WXAPI.coupons(Object object)

// 领取优惠券
// WXAPI.fetchCoupons(Object object)

// 获取我的优惠券
// WXAPI.myCoupons(Object object)

// 公告管理
// 获取公告列表
// WXAPI.noticeList(Object object)

// 获取公告详情
// WXAPI.noticeDetail(id)

// 订单管理
// 我的订单统计
// WXAPI.orderStatistics(token)

// 创建订单
// WXAPI.orderCreate(Object object)

// 查询订单列表
// WXAPI.orderList(Object object)

// 查询订单详情
// WXAPI.orderDetail(id, token)

// 确认收货接口
// WXAPI.orderDelivery(orderId, token)

// 评价接口
// WXAPI.orderReputation(Object object)

// 关闭订单
// WXAPI.orderClose(orderId, token)

// 使用余额支付订单
// WXAPI.orderPay(orderId, token)

// 积分管理
// 读取积分赠送规则
// WXAPI.scoreRules(Object object)

// 签到
// WXAPI.scoreSign(token)

// 签到记录
// WXAPI.scoreSignLogs(Object object)

// 读取今日签到信息
// WXAPI.scoreTodaySignedInfo(token)

// 使用积分券兑换积分
// WXAPI.scoreExchange(number, token)

// 小程序转发微信群赠送分享人积分
// WXAPI.shareGroupGetScore(referrer, encryptedData, iv)

// 积分明细记录
// WXAPI.scoreLogs(Object object)

// 模板消息
// 记录 formid / 预支付 id 用以后期发送消息
// WXAPI.addTempleMsgFormid(Object object)

// 给用户发送模板消息
// WXAPI.sendTempleMsg(Object object)

// 收货地址管理
// 获取收货地址列表
// WXAPI.queryAddress(token)

// 添加收货地址
// WXAPI.addAddress(Object object)

// 更新收货地址
// WXAPI.updateAddress(Object object)

// 获取默认地址
// WXAPI.defaultAddress(token)

// 读取地址详细信息
// WXAPI.addressDetail(id, token)

// 删除
// WXAPI.deleteAddress(id, token)

// 在线支付
// 微信支付
// WXAPI.wxpay(Object object)

// 支付宝支付(半自动)
// WXAPI.alipay(Object object)

// 商品砍价
// 获取可砍价的商品列表
// WXAPI.kanjiaList(Object object)

// 获取商品砍价设置
// WXAPI.kanjiaSet(goodsId)

// 发起一个砍价
// WXAPI.kanjiaJoin(kjid, token)

// 砍价详情
// WXAPI.kanjiaDetail(kjid, joiner)

// 砍价助力
// WXAPI.kanjiaHelp(kjid, joiner, token, remark)

// 我的助力信息
// WXAPI.kanjiaHelpDetail(kjid, joiner, token)

// 拼团功能
// 获取拼团配置
// WXAPI.pingtuanSet(goodsId)

// 开团接口
// WXAPI.pingtuanOpen(goodsId, token)

// 获取某个商品当前进行中的所有拼团
// WXAPI.pingtuanList(goodsId)

// 三级分销
// 申请成为分销商
// WXAPI.fxApply(token, name, mobile)

// 查看申请审核状态
// WXAPI.fxApplyProgress(token)

// 查看我的分销团队成员
// WXAPI.fxMembers(Object object)

// 查看我的返佣记录
// WXAPI.fxCommisionLog(Object object)

// 资金相关
// 获取充值满多少送多少规则
// WXAPI.rechargeSendRules()

// 获取用户资产（余额、可用积分）信息
// WXAPI.userAmount(token)

// 用户资金流水
// WXAPI.cashLogs(Object object)

// 申请提现
// WXAPI.withDrawApply(money, token)

// 优惠买单
// 获取买单优惠信息
// WXAPI.payBillDiscounts()

// 买单接口
// WXAPI.payBill(Object object)

// 微信小程序
// 无限获取二维码
// WXAPI.wxaQrcode(Object object)

// 知识付费【虚拟交易】
// 获取产品列表
// WXAPI.virtualTraderList(Object object)

// 获取产品详情
// WXAPI.virtualTraderInfo(token, id)

// 购买产品
// WXAPI.virtualTraderBuy(token, id)

// 读取成交记录
// WXAPI.virtualTraderBuyLogs(Object object)