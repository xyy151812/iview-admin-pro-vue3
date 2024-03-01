<template>
    <div>
        <ContHead>
            <template #title>工作台</template>
        </ContHead>
        <Card class="ivu-mt" dis-hover :bordered="false">
        </Card>
    </div>
</template>
<script setup>
import ContHead from "@/components/ContHead"
import { ref, reactive } from 'vue'
const tableColumns = reactive([
    {
        type: 'selection',
        width: 60,
        align: 'center'
    },
    {
        title: 'Name',
        key: 'name'
    },
    {
        title: 'Age',
        key: 'age'
    },
    {
        title: 'Address',
        key: 'address'
    }
])
const tableData = reactive([
    {
        name: 'John Brown',
        age: 18,
        address: 'New York No. 1 Lake Park',
        date: '2016-10-03'
    },
    {
        name: 'Jim Green',
        age: 24,
        address: 'London No. 1 Lake Park',
        date: '2016-10-01'
    },
    {
        name: 'Joe Black',
        age: 30,
        address: 'Sydney No. 1 Lake Park',
        date: '2016-10-02'
    },
    {
        name: 'Jon Snow',
        age: 26,
        address: 'Ottawa No. 2 Lake Park',
        date: '2016-10-04'
    }
])
</script>