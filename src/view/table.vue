<script lang="ts" setup>
import { search, test } from '@/api'
import CeCheckbox from '@c/components/Checkbox/CeCheckbox.vue'
import CeTable from '@c/components/Table/CeTable'
import CeTableHead from '@c/components/Table/CeTableHead.vue'
import CeTableRow from '@c/components/Table/CeTableRow.vue'
import { ScrollInfo, TableRows } from '@c/index'
import { computed, onMounted, ref } from 'vue'

type Data = { classify: { parent: number; deleteAt: number; grade: number; name: string; id: number }; read: number; shop: { cover: string; createdAt: null; name: string; id: number; describe: string; userid: number }; deleteAt: number; classifyid: number; specification: string[]; updateAt: string; discount: number; tags: string[]; commentCount: number; cover: string; createdAt: string; price: string; brandid: number; publish: number; name: string; shopid: number; id: number; stock: number; brand: { name: string; logo: string; classifys: string[]; id: number } }

const rows = ref<TableRows<Data>>([
  {
    prop: 'name',
    label: '名字',
    width: 300,
    fixed: 'left',
  },
  {
    label: '折后价',
    prop: 'discount',
    // fixed: 'left',
    getter: (r) => +r.price * r.discount / 100,
  },
  {
    prop: 'price',
    label: '价格',
    // fixed: 'left',
  },
  {
    prop: 'shop',
    getter: r => r.shop.name,
    label: '店铺',
    // fixed: 'right',
    // width: 200
  },
  {
    prop: 'brand',
    getter: (r: any) => r.brand.name,
    label: '品牌',
    // width: 200
  },
  {
    prop: 'commentCount',
    label: '评论数量',
    fixed: 'right',
    // width: 100
  },
])

const list = ref([] as any[])
const clist = computed(() => {
  if(!showData.value) return []
  return list.value
})

const a = async () => {
  const res = await search({
    page: 1,
    size: 12,
  })
  list.value = res.data.data
}

test()

onMounted(async () => {
  a()
})

const show = ref(true)
const showData = ref(true)

// noinspection JSUnusedLocalSymbols
function scroll(info: ScrollInfo) {
  // console.log(info)
}

</script>

<template>
  <!--    <input type="checkbox" v-model="show" />-->
  <!--    <h1>一个霸气的标题</h1>-->
  <!--    <p>-->
  <!--      一段咯嗦的简介<br/>-->
  <!--      巴拉巴拉巴拉巴拉-->
  <!--    </p>-->
  <!--    <CeButton @click="a">刷新</CeButton>-->
  <CeCheckbox v-model="showData" value="渲染数据"/>
  <CeTable :rows="rows" :state="clist.length ? undefined:'empty'"
           border="row" fixedHead
           max-height="400px"
           width="1600px">
    <CeTableHead></CeTableHead>
    <CeTableRow v-for="row in clist" :key="row.id" :row="row">

    </CeTableRow>
  </CeTable>
  <!--  <div style="height: 800px">-->
  <!--  </div>-->
</template>

<style lang="scss" scoped>

table {
  border-collapse: collapse;
  border: 2px solid rgb(100, 100, 100);
}

td,
th {
  border: 1px solid rgb(100, 100, 100);
  padding: 10px 10px;
}

td {
  text-align: center;
}

.fill {
  height: 100%;
  width: 100%;
}

.scroll {
  width: 100%;
  height: 100%;
}

.ce-table {

}
</style>