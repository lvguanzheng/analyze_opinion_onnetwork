import { handleActions } from 'redux-actions'
import { APP } from 'constant/actions'

export default handleActions({
    [APP.FETCH_USER.SUCCEED](state, { type, ...mutation }) {
        return { ...state, ...mutation }
    }
}, {})