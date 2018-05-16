import { handleActions } from 'redux-actions'
import { MESSAGE } from 'constant/actions'

export default handleActions({
	[MESSAGE.FETCH_HOT_MESSAGE_LIST.SUCCEED](state, action) {
		return {...state, hotMsg: action.data}
	},
	[MESSAGE.FETCH_HOT_MESSAGE_LIST.FAILED](state, action) {
		return state
	},
	[MESSAGE.FETCH_MSG_DETAIL_DATA.SUCCEED](state, action) {
		return {...state, msgDetailData: action.data}
	},
	[MESSAGE.FETCH_MSG_DETAIL_DATA.FAILED](state, action) {
		return state
	},
	[MESSAGE.FETCH_COMMENT_USER.SUCCEED](state, action) {
		return {...state, commentUserData: action.data}
	},
	[MESSAGE.FETCH_COMMENT_USER.FAILED](state, action) {
		return state
	},
	[MESSAGE.FETCH_COMMENT_LIST.SUCCEED](state, action) {
		return {...state, commentListData: action.data}
	},
	[MESSAGE.FETCH_COMMENT_LIST.FAILED](state, action) {
		return state
	},
	[MESSAGE.FETCH_MSG_COMMENT_SENSIBILITY.SUCCEED](state, action) {
		return {...state, sensibilityData: action.data}
	},
	[MESSAGE.FETCH_MSG_COMMENT_SENSIBILITY.FAILED](state, action) {
		return state
	}
},{
	hotMsg: {},
	msgDetailData: {},
	commentUserData: {},
	commentListData: {},
	sensibilityData: {}
})