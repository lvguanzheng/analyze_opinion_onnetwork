import { handleActions } from 'redux-actions'
import { MESSAGE } from 'constant/actions'

export default handleActions({
    [MESSAGE.GET_MESSAGES.SUCCEED](state, { type, ...mutation }) {
        return {
            messages: {
                ...state,
                ...mutation
            }
        }
    }
}, {
    messages: {
        pending: false // 加载状态
    }
})