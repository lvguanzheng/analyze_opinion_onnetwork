export const APP = {
    FETCH_USER: 'authorityManage/roleAuthorityList'
}

export const MESSAGE = {
    REGET_HOT_TOPIC_DATA: 'message/reGet',
    FETCH_HOT_MESSAGE_LIST: 'message/hotMsgList',
    FETCH_MSG_DETAIL_DATA: 'message/msgDetail',
    FETCH_COMMENT_USER: 'message/commentUser',
    FETCH_MSG_COMMENT_SENSIBILITY: 'message/msgCommentSensibility',
    FETCH_MSG_TYPE: 'message/msgTypeStatistics',
    FETCH_HOT_TOPIC: 'message/getHotTopic',
    FETCH_VIEW_POINT: 'message/viewPointStatistics',
    GET_COMMENT_LIST: 'message/getCommentList'
}

const actions = { APP, MESSAGE }

const rules = [
    [/./, path => `localhost:8821/news_recommendation/${path}`]
]

const isMock = false

function mapApi(api) {
    let mapped = api
    if (process.env.NODE_ENV !== 'production') {
        if (isMock) {
            mapped = `mock/${api}.json`
        } else {
            rules.forEach(([regex, transform]) => {
                if (regex.test(api)) {
                    mapped = `http://${window.location.host}/~${transform(api)}`
                }
            })
        }
    }
    return mapped
}

(function mapAction(actionSet, prefix = []) {
    _.mapValues(actionSet, (v, k, obj) => {
        const action = prefix.concat(k)
        if (typeof v === 'object') {
            mapAction(v, action)
        } else {
            const fn = () => {} // walkaround for redux-saga pattern
            fn.toString = () => action.join('/') // TODO: use prototype to save memory ?
            fn.API = mapApi(v)
            fn.SUCCEED = `${k}_SUCCEED`
            fn.FAILED = `${k}_FAILED`
            obj[k] = fn
        }
    })
}(actions))

export default actions