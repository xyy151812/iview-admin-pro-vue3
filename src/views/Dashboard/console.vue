<template>
    <div>
        <ContHead>
            <template #title>主控台</template>
            <template #desc>dddd</template>
        </ContHead>
        <Card class="ivu-mt" dis-hover :bordered="false">
            <TableList :formItems="formItems" :tableColumns="tableColumns" :tableData="tableData">
                <template #table></template>
            </TableList>
        </Card>
    </div>
</template>
<script setup>
import ContHead from "@/components/ContHead"
import TableList from '@/components/TableList'
import { reactive, ref } from 'vue'
const formItems = ref([{ label: '规则名称', type: 'input', field: 'rolus', value: '' }, { label: '关键词', type: 'input', field: 'key', value: '' }])
const tableColumns = ref([
    { title: '站点名称', key: 'site_id' },
    { title: '栏目名称', key: 'Category_id' },
    { title: '文章名称', key: 'Article_id' },
    { title: '文章标题', key: 'Article_title' },

])
const tableData = ref([])
</script>