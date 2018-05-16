import React from 'react'
import { connect } from 'react-redux'
import { Progress } from 'antd'

import { MESSAGE } from '../../constants/actions'
import styles from './Index.styl'
import LIKE_IMG from '../../images/like.png'

class MessageDetail extends React.Component {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
		this.fetchMsgDetailData()
		this.fetchCommentUser()
		this.fetchMsgCommentList()
		this.fetchMsgCommentSensibility()
	}
	fetchMsgDetailData = () => {
		const { match: { params: { msgId } }, dispatch } = this.props
		dispatch({type: MESSAGE.FETCH_MSG_DETAIL_DATA, msgId: msgId})
	}
	fetchCommentUser = () => {
		const { match: { params: { msgId } }, dispatch } = this.props
		dispatch({type: MESSAGE.FETCH_COMMENT_USER, msgId: msgId})
	}
	fetchMsgCommentList = () => {
		const { match: { params: { msgId } }, dispatch } = this.props
		dispatch({type: MESSAGE.FETCH_COMMENT_LIST, msgId: msgId})
	}
	fetchMsgCommentSensibility = () => {
		const { match: { params: { msgId } }, dispatch } = this.props
		dispatch({type: MESSAGE.FETCH_MSG_COMMENT_SENSIBILITY, msgId: msgId})
	}
	render() {
		console.log(this.props)
		const { msgDetailData: { content, titleType, author, authorHead, repostsCount, commentCount, attitudesCount, commentList = [] }, commentUserData: { commentUser = [] }, commentListData: { comment = [] }, sensibilityData: { sensibility } } = this.props
		return(
			<div>
			    <div className={styles['msg-detail-block']}>
			        <img src={authorHead} className={styles['head-img']}/>
			        <div className={styles['info-block']}>
			            <div className={styles['author-info']}>{author}</div>
			            <div>{content}</div>
			        </div>
			        <span className={styles['msg-detail-info']}>转发<span className={styles['info-text']}>({repostsCount})</span> | 评论<span className={styles['info-text']}>({commentCount})</span> | 赞<span className={styles['info-text']}>({attitudesCount})</span></span>
			    </div>
			    <div className={styles['msg-influence-rank-block']}>
			        <div className={styles['msg-title-block']}>评论用户影响力榜单</div>
			        <div className={styles['user-list-block']}>
			            <div className={styles['user-text-block']}>
			                <span>用户</span>
			            </div>
			            <div className={styles['comment-user-block']}>
			                {commentUser.map((user, index) => {
			                	return (
			                		<div style={{marginRight: 30}} key={index}>
			                		    <img src={user.userHead} className={styles['comment-head-img']}/>
			                		    <div className={styles['user-name']} title={user.userName}>{user.userName}</div>
			                		</div>
			                	)
			                })}
			            </div>
			        </div>
			    </div>
			    <div className={styles['msg-comment-list-block']}>
			        <div className={styles['msg-title-block']}>热门评论列表</div>
			        <div className={styles['comment-list']}>
			            {comment.map((item, index) => {
			            	return (
			            		<div key={index} className={styles['comment-item']}>
			            		    <img src={item.commentUserHead} className={styles['head-img']}/>
							        <div className={styles['info-block']}>
							            <div className={styles['author-info']}>{item.commentUser}</div>
							            <div>{item.commentText}</div>
							        </div>
							        <span className={styles['msg-like']}>
							            <img src={LIKE_IMG} className={styles['like-img']}/>
							            <span>赞<span className={styles['info-text']}>({item.likeCount})</span></span>
							        </span>
			            		</div>
			            	)
			            })}
			        </div>
			    </div>
			    <div className={styles['msg-comment-analyze-block']}>
			        <div className={styles['msg-title-block']}>转评内容敏感度分析</div>
			        <Progress percent={sensibility} status="active" showInfo={false} />
			        <div className={styles['sensibility-display-block']}>
			            <div>
			                <div className={styles['sensibility-text']}>{sensibility}%</div>
			                <div>敏感</div>
			            </div>
			            <div>
			                <div className={styles['not-sensibility-text']}>{100-sensibility}%</div>
			                <div>非敏感</div>
			            </div>
			        </div>
			    </div>
			    <div className={styles['hot-word-analyze-block']}>
			        <div className={styles['msg-title-block']}>热词分析</div>
			    </div>
			    <div className={styles['user-opinion-analyze-block']}>
			        <div className={styles['msg-title-block']}>网友观点分析</div>
			    </div>
			</div>
		)
	}
}

export default connect(state => state.message.message)(MessageDetail)