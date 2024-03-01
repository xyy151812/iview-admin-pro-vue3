<style>
.btn-box {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
</style>
<template>
    <div>
        <Form v-if="formItems.length > 0">
            <Row :gutter="24" justify="end">
                <template v-if="collapse">
                    <Col span="8" v-for="(item, index) in formItems " :key="index" v-show="index <= 2">
                    <FormItem :label="item.label" :label-width="80">
                        <template v-if="item.type == 'input'">
                            <Input :placeholder="item.placeholder" v-model="queryData.formData[item.field]" />
                        </template>
                        <template v-if="item.type == 'select'">
                            <Select v-model="item.value">
                                <Option v-for="(option, index) in item.options" :value="option.value" :key="index">
                                    {{ option }}
                                </Option>
                            </Select>
                        </template>
                    </FormItem>
                    </Col>
                </template>
                <template v-else>
                    <Col span="8" v-for="(item, index) in formItems " :key="index">
                    <FormItem :label="item.label" :label-width="80">
                        <template v-if="item.type == 'input'">
                            <Input :placeholder="item.placeholder" v-model="item.value" />
                        </template>
                        <template v-if="item.type == 'select'">
                            <Select v-model="item.value">
                                <Option v-for="(option, index) in item.options" :value="option.value" :key="index">
                                    {{ option }}
                                </Option>
                            </Select>
                        </template>
                    </FormItem>
                    </Col>
                </template>
                <Col span="8" class="btn-box">
                <Button type="primary" @click="query">查询</Button>
                <Button type="default" class="ivu-ml-8" @click="reset">重置</Button>
                <a class="ivu-ml-8" @click="collapse = !collapse" v-if="formItems.length > 2">
                    {{ collapse ? '展开' : '收起' }}
                    <Icon :type="collapse ? 'ios-arrow-down' : 'ios-arrow-up'" />
                </a>
                </Col>
            </Row>
        </Form>
        <Table :columns="columns" :data="data">

        </Table>
    </div>
</template>
<script setup>
import { queryList } from '@/api/query'
import { ref, reactive, watch, onMounted, useSlots } from 'vue'
const slots = useSlots()
const props = defineProps({
    formItems: {
        type: Array,
        default: () => []
    },
    queryUrl: {
        type: String,
        default: ''
    },
    tableColumns: {
        type: Array,
        default: () => []
    },
    tableData: {
        type: Array,
        default: () => []
    }
})

onMounted(() => {
    initFields()
})
// form start
const initFields = () => {
    const formItems = props.formItems
    formItems.forEach(item => {
        queryData.formData[item.field] = ''
    })
}
const queryData = reactive({
    page: 1,
    limit: 0,
    formData: {}
})
const query = () => {
    queryList(queryData.formData, queryUrl).then(res => {
        const { page, limit, list } = res.data
        data.value = list
        queryData.page = page
        queryData.limit = limit
    })
}
const reset = () => {
    initFields()
}
const collapse = ref(true) //默认折叠
// form end
// table start
const data = ref(props.tableData)
const columns = ref(props.tableColumns)
// table end
</script>
