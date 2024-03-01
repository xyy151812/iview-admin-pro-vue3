import request from './request'

export function queryList(data, url) {
    return request({
        url: url,
        method: 'post',
        data
    })
}
