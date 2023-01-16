<script lang="ts" setup>
import { shoppingCart } from '@/api'
import CeDepth from '@c/components/Depth/CeDepth.vue'
import { onMounted, reactive, ref } from 'vue'

const data = reactive({
  list: [],
  selected: false,
})

const list = ref([])

const selectAll = ref(false)

onMounted(async () => {
  const res = await shoppingCart({
    page: 1,
    size: 1,
  })
  list.value = res.data.data
})

</script>
<template>
  <!--   头部导航 -->
  <div class="shopping-cart">
    <!-- 商品板块 -->
    <main id="main">
      <div class="c-container">
        <div class="w">
          <div class="cart-filter-bar">
            <em>全部商品</em><span class="cart-all"></span>
          </div>
          <!-- 购物车主要核心区域 -->
          <div class="cart-warp">
            <!-- 头部全选模块 -->
            <div class="cart-thead">
              <div class="t-checkbox">
                <input
                    v-model="selectAll"
                    type="checkbox"
                />
                全选
              </div>
              <div class="t-goods">商品</div>
              <div class="t-price">单价</div>
              <div class="t-num">数量</div>
              <div class="t-sum">小计</div>
              <div class="t-action">操作</div>
            </div>

            <!-- 商品详细模块 -->
            <div class="cart-list-box">
              <CeDepth v-model="list" v-model:all="selectAll" keyName="id" selectName="selectAll">
                <template v-slot="{item: shop}">
                  <div class="cart-tbody">
                    <div class="shop">
                      <div class="p-checkbox">
                        <input
                            v-model="shop.selectAll"
                            class="tbody-checkall"
                            type="checkbox"
                        />
                      </div>
                      <div class="shop-name">
                        <a class="name" href="">{{ shop.name }}</a
                        ><i class="icon"></i>
                      </div>
                    </div>
                    <div class="cart-item-list">
                      <CeDepth v-model="shop.commoditys" v-model:all="shop.selectAll" keyName="id"
                               selectName="selected">
                        <template v-slot="{item: option}">
                          <div :class="{ 'check-cart-item': option.selected }" class="cart-item">
                            <div class="p-checkbox">
                              <input
                                  v-model="option.selected"
                                  class="j-checkbox"
                                  t-ype="checkbox"
                                  type="checkbox"
                              />
                            </div>
                            <template v-if="option.commodity">
                              <div class="p-goods">
                                <a class="p-img">
                                  <img
                                      :src="'http://jds.flycran.xyz/image/' + option.commodity.cover"
                                      alt=""/>
                                </a>
                                <a class="p-msg" href="">{{ option.commodity.name }}</a>
                                <span class="p-text">{{ option.specification }}</span>
                              </div>
                              <div class="p-price">
                                ￥
                                {{ option.commodity.price }}
                              </div>
                              <div class="p-num">
                                <div class="quantity-form">
                                  <!-- 减 -->
                                  <span
                                      :class="{ disable: option.number <= 1 }"
                                      class="decrement"
                                      href="javascript:;"
                                  ></span>
                                  <input
                                      v-model="option.number"
                                      class="itxt ellipsis"
                                      type="text"
                                  />
                                  <!-- 加 -->
                                  <span
                                      :class="{
                              disable: option.number >= option.commodity.stock,
                            }"
                                      class="increment decrement"
                                      href="javascript:;"
                                  ></span>
                                </div>
                              </div>
                              <div class="p-sum ellipsis">
                                ￥{{ (option.number * option.commodity.price).toFixed(2) }}
                              </div>
                            </template>
                            <template v-else>
                              <h2>该商品已被商家移除</h2>
                            </template>

                            <div class="p-action">
                              <a href="javascript:;">删除</a>
                            </div>
                          </div>
                        </template>
                      </CeDepth>
                    </div>
                  </div>
                </template>
              </CeDepth>
              <h2 v-if="!list.length" class="pol">暂时没有商品请去添加商品</h2>
            </div>
            <!-- 结算模块 -->
            <div ref="fixedBox" class="fixed-box">
              <div class="cart-floatbar">
                <div class="w">
                  <div class="select-all">
                    <input
                        v-model="selectAll"
                        class="checkall"
                        type="checkbox"
                    />全选
                  </div>
                  <div class="operation">
                    <a class="remove-batch" href="javascript:;">
                      删除选中的商品
                    </a>
                    <a class="clear-all" href="javascript:;">清理购物车</a>
                  </div>
                  <div class="toolbar-right">
                    <div class="amount-sum">
                      已经选<em>000</em
                    >件商品
                    </div>
                    <div class="price-sum">
                      总价：<em>￥ 000</em>
                    </div>
                    <div class="btn-area">去结算</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;
}

.w {
  width: 990px;
}

#main a[href]:hover {
  color: #e2231a;
}

.shopping-cart {
  font-size: 12px;
  color: #333;
  background-color: #fff;
}

.disable {
  color: #999 !important;
}

.car-header {
  padding: 20px 0;
}

.car-logo img {
  vertical-align: middle;
}

.car-logo b {
  font-size: 20px;
  margin-top: 20px;
  margin-left: 10px;
}

.cart-filter-bar {
  font-size: 16px;
  color: #e2231a;
  font-weight: 700;
  height: 32px;
}

.cart-filter-bar em {
  padding: 5px;
}

.cart-tbody {
  margin-bottom: 20px;
}

.cart-item-list {
  border-top: 1px solid #aaa;
}

.shop {
  width: 100%;
  height: 30px;
  padding: 1px;
}

.shop > div {
  float: left;
}

.shop-name {
  line-height: 26px;
  color: #666;
  font-weight: bold;
}

.shop .icon {
  display: inline-block;
  width: 26px;
  height: 16px;
  vertical-align: middle;
  margin-left: 8px;
}

.cart-thead {
  height: 32px;
  line-height: 32px;
  margin-bottom: 10px;
  padding: 5px 0;
  background: #f3f3f3;
  border: 1px solid #e9e9e9;
  border-top: 0;
  position: relative;
}

.cart-thead > div,
.cart-item > div {
  float: left;
}

.t-checkbox,
.p-checkbox {
  height: 18px;
  line-height: 18px;
  padding-top: 7px;
  width: 122px;
  margin-left: 10px;
}

.t-price {
  margin-left: 450px;
  text-align: right;
}

.t-num {
  margin-left: 75px;
  text-align: center;
}

.t-sum {
  margin-left: 100px;
  text-align: right;
}

.t-action {
  margin-left: 40px;
  text-align: right;
}

.cart-item {
  height: 119px;
  border-style: solid;
  border-width: 1px 1px 1px;
  border-color: #aaa #f1f1f1 #f1f1f1;
  background: #fff;
  padding-top: 14px;
}

.check-cart-item {
  background: #fff4e8;
}

.p-checkbox {
  width: 30px;
}

.p-goods {
  margin-top: 8px;
  width: 556px;
}

.p-img {
  display: block;
  width: 80px;
  height: 80px;
  float: left;
  border: 1px solid #eee;
}

.p-msg {
  float: left;
  width: 210px;
  margin: 0 10px;
}

.p-price {
  width: 85px;
  height: 16px;
}

.quantity-form {
  width: 80px;
  height: 22px;
}

.p-num {
  width: 140px;
}

.decrement,
.increment {
  user-select: none;
  cursor: pointer;
  float: left;
  border: 1px solid #cacbcb;
  height: 18px;
  line-height: 18px;
  padding: 1px 0;
  width: 16px;
  text-align: center;
  color: #333;
  margin: 0;
  background: #f1f1f1;
  margin-left: -1px;
  border-radius: 2px;
}

.decrement::after {
  content: '-';
}

.increment::after {
  content: '+';
  position: relative;
  top: -1px;
}

.itxt {
  float: left;
  border: 1px solid #cacbcb;
  width: 42px;
  height: 18px;
  line-height: 18px;
  text-align: center;
  padding: 1px;
  margin: 0;
  margin-left: -1px;
  font-size: 12px;
  font-family: verdana;
  color: #333;
  -webkit-appearance: none;
}

.p-text {
  display: inline-block;
  width: 210px;
  padding: 0 10px;
}

.p-sum {
  font-weight: 700;
  width: 72px;
}

/* 结算模块 */

.cart-floatbar {
  height: 50px;
  border: 1px solid #f0f0f0;
  background: #fff;
  position: relative;
  margin-bottom: 50px;
  line-height: 50px;
}

.select-all {
  float: left;
  height: 18px;
  line-height: 18px;
  padding: 16px 0 16px 9px;
  white-space: nowrap;
}

.select-all input {
  vertical-align: middle;
  display: inline-block;
  margin-right: 5px;
}

.operation {
  float: left;
  width: 200px;
  margin-left: 40px;
  color: #666;
}

.clear-all {
  font-weight: 700;
  margin: 0 20px;
}

.toolbar-right {
  float: right;
}

.amount-sum {
  float: left;
}

.amount-sum em {
  font-weight: 700;
  color: #e2231a;
  padding: 0 3px;
}

.price-sum {
  float: left;
  margin: 0 15px;
}

.price-sum em {
  font-size: 16px;
  color: #e2231a;
  font-weight: 700;
}

.btn-area {
  font-weight: 700;
  width: 94px;
  height: 52px;
  line-height: 52px;
  color: #fff;
  text-align: center;
  font-size: 18px;
  font-family: 'Microsoft YaHei';
  background: #e54346;
  overflow: hidden;
  cursor: pointer;
}

/*公共样式*/

.fl {
  float: left;
}

.fr {
  float: right;
}

/* @font-face {
    font-family: 'icomoon';
    src: url('../fonts/icomoon.eot?7kkyc2');
    src: url('../fonts/icomoon.eot?7kkyc2#iefix') format('embedded-opentype'), url('../fonts/icomoon.ttf?7kkyc2') format('truetype'), url('../fonts/icomoon.woff?7kkyc2') format('woff'), url('../fonts/icomoon.svg?7kkyc2#icomoon') format('svg');
    font-weight: normal;
    font-style: normal;
} */

.fr .icomoon {
  font-family: 'icomoon';
  font-size: 16px;
  line-height: 26px;
}

/*版心*/

.style-red {
  color: #c81623;
}

.spacer {
  width: 1px;
  height: 12px;
  background-color: #666;
  margin: 9px 12px 0;
}

/*顶部快捷导航*/

.shortcut {
  height: 31px;
  background-color: #f1f1f1;
  line-height: 31px;
}

.shortcut li {
  float: left;
}

/*header区域*/

.header {
  position: relative;
  height: 105px;
}

.logo {
  position: absolute;
  top: 25px;
  left: 0;
  width: 175px;
  height: 56px;
}

.logo a {
  display: block;
  /*overflow: hidden;*/
  width: 175px;
  height: 56px;
  /*text-indent: -999px;*/
  font-size: 0;
}

.search {
  position: absolute;
  top: 25px;
  left: 348px;
}

.text {
  float: left;
  width: 445px;
  height: 32px;
  border: 2px solid #b1191a;
  padding-left: 10px;
  color: #ccc;
}

.btn {
  float: left;
  width: 82px;
  height: 36px;
  background-color: #b1191a;
  border: 0;
  font-size: 16px;
  color: #fff;
}

.hotwrods {
  position: absolute;
  top: 65px;
  left: 348px;
}

.hotwrods a {
  margin: 0 10px;
}

.shopcar {
  position: absolute;
  top: 25px;
  right: 64px;
  width: 138px;
  height: 34px;
  border: 1px solid #dfdfdf;
  background-color: #f7f7f7;
  line-height: 34px;
  text-align: center;
}

.car {
  font-family: 'icomoon';
  color: #da5555;
}

.arrow {
  font-family: 'icomoon';
  margin-left: 5px;
}

.count {
  position: absolute;
  top: -5px;
  /*应该是左侧对齐 文字才能往右走显示*/
  left: 100px;
  background-color: #e60012;
  height: 14px;
  padding: 0 3px;
  line-height: 14px;
  color: #fff;
  /*border-radius: 左上角 右上角  右下角  左下角;*/
  border-radius: 7px 7px 7px 0;
}

/*nav start*/

.nav {
  height: 45px;
  border-bottom: 2px solid #b1191a;
}

.dropdown {
  width: 209px;
  height: 45px;
}

.dropdown .dt {
  height: 100%;
  background-color: #b1191a;
  font-size: 16px;
  color: #fff;
  text-align: center;
  line-height: 45px;
}

.dropdown .dd {
  height: 465px;
  background-color: #c81623;
  margin-top: 2px;
}

.menu_item:hover {
  background-color: #fff;
}

/*鼠标经过li 里面的 a变颜色*/

.menu_item:hover a {
  color: #c81623;
}

.menu_item {
  height: 31px;
  line-height: 31px;
  margin-left: 1px;
  padding: 0 10px;
}

.menu_item:hover {
  padding-left: 20px;
}

.menu_item a {
  font-size: 14px;
  color: #fff;
}

.menu_item i {
  float: right;
  font-family: 'icomoon';
  font-size: 18px;
  color: #fff;
}

.navitems {
  margin-left: 10px;
}

.navitems li {
  float: left;
}

.navitems li a {
  display: block;
  height: 45px;
  padding: 0 25px;
  line-height: 45px;
  font-size: 16px;
}

.fixed-b {
  position: fixed;
  bottom: 0;
  z-index: 2;
  margin: 0;
  left: 0;
  width: 100%;
  box-shadow: 0 -1px 8px rgba(0, 1, 1, 0.08);
  border: 0;
}

.fixed-box {
  height: 52px;
}

nav {
  position: fixed;
  z-index: 3;
  right: -270px;
  width: 270px;
  height: 100%;
  border-left: 6px solid #7a6e6e;
}

.tag-box-1 {
  position: absolute;
  left: -40px;
  width: 40px;
  top: 50%;
  transform: translate(0, -50%);
}

.tag-box-1 .tag {
  position: relative;
  width: 40px;
  height: 35px;
  margin-bottom: 2px;
  color: #fff;
}

.tag-box-1 .tag:nth-child(2) .icon {
  height: 17px;
}

.tag-box-1 .tag:nth-child(3) .icon {
  height: 14px;
}

.tag-box-1 .tag .icon-box {
  position: relative;
  display: inline-block;
  word-break: break-all;
  width: 35px;
  height: 35px;
  padding-right: 5px;
  background-color: #7a6e6e;
  text-align: center;
  z-index: 3;
}

.tag-box-1 .tag .icon {
  position: relative;
  display: inline-block;
  width: 17px;
  top: 8px;
  border-radius: 2px;
}

.tag-w {
  display: block;
  width: 105px;
  height: 100%;
  line-height: 35px;
  position: absolute;
  background: #7a6e6e;
  border-radius: 2px;
}

.tag-box-1 .tag:hover .tag-w {
  transform: translate(-70px, 0);
}

.pol {
  width: 23%;
  margin: 0 auto;
  color: #666;
}
</style>