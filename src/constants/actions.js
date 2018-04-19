export const APP = {
    FETCH_USER: 'authorityManage/roleAuthorityList'
}

export const MESSAGE = {
    DO_SOMETHING: 'path/to/some',
    GET_MESSAGES: 'message/getMessages',
    GET_MAIN_TYPES: 'message/listAllMainMessageType',
    GET_DETAIL_TYPES: 'message/listAllDetails',
    TO_UPDATE_MESSAGE: 'message/toUpdateMessage',
    CLEAR_EDITOR: 'message/CLEAR_EDITOR'
}

const actions = { APP, MESSAGE }

const rules = [
    [/./, path => `192.168.0.121:7388/dragnet-war/api/${path}`]
]

const isMock = true

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