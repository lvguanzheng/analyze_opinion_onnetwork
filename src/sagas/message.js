import { call, put, takeLatest } from 'redux-saga/effects'
import { post } from 'common/api'

import { MESSAGE } from 'constants/actions'

function* base(action, { type, callback = _.noop, ...params }) {
    try {
        const data = yield call(post, action.API, params)
        yield put({ type: action.SUCCEED, data })
        callback(data)
    } catch (e) {
        yield put({ type: action.FAILED, message: e })
        if(action.FAILED == 'REGET_HOT_TOPIC_DATA_FAILED') {
            callback()
        }
    }
}

const sagaify = (action, handler = base, effect = takeLatest) => effect(action, function* (...args) {
    yield* handler.apply(null, [action, ...args])
})

// customize saga
// APP.FETCH_USER.saga = sagaify()

const sagas = [];
(function mapActionToSaga(actions) {
    Object.entries(actions)
        .forEach(([k, v]) => {
            if (typeof v === 'function') {
                v.saga = v.saga || sagaify(v)
                sagas.push(v.saga)
            } else {
                mapActionToSaga(v)
            }
        })
}(MESSAGE))

export default sagas