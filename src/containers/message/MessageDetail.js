import React from 'react'
import { connect } from 'react-redux'
import { Progress } from 'antd'

import { MESSAGE } from '../../constants/actions'
import styles from './Index.styl'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legendScroll'
import LIKE_IMG from '../../images/like.png'
import GOOD_IMG from '../../images/good.png'
import BAD_IMG from '../../images/bad.png'

class MessageDetail extends React.Component {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
		this.fetchMsgDetailData()
		this.fetchCommentUser()
		this.fetchMsgCommentSensibility()
		this.fetchViewPointStatistics()
	}
	fetchMsgDetailData = () => {
		const { match: { params: { id } }, dispatch } = this.props
		dispatch({type: MESSAGE.FETCH_MSG_DETAIL_DATA, id: id})
	}
	fetchCommentUser = () => {
		const { match: { params: { id } }, dispatch } = this.props
		dispatch({type: MESSAGE.FETCH_COMMENT_USER, id: id})
	}
	fetchMsgCommentSensibility = () => {
		const { match: { params: { id } }, dispatch } = this.props
		dispatch({type: MESSAGE.FETCH_MSG_COMMENT_SENSIBILITY, id: id})
	}
	fetchViewPointStatistics =() => {
		const { match: { params: { id } }, dispatch } = this.props
		dispatch({type: MESSAGE.FETCH_VIEW_POINT, id: id, callback: data => {
			this.initBar(data)
		}})
	}
	initBar = data => {
		const { viewPoint = [] } = data
		const viewPointArr = []
		const rateArr = []
		viewPoint.map(item => {
			let content = ''
			if(item.emotionType === 'good') {
				content = item.viewContent + '\n' + '情感标签:positive'
			} else {
				content = item.viewContent + '\n' + '情感标签:negative'
			}
			viewPointArr.push(content)
			rateArr.push(item.rate)
		})
		const barChart = echarts.init(document.getElementById('viewPoint'))
		const option = {
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {
		            type : 'shadow'
		        }
		    },
		    legend: {
		        data: ['比例']
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis:  {
		        type: 'value'
		    },
		    yAxis: {
		        type: 'category',
		        data: viewPointArr
		    },
		    axisLabel: {
                color: "#000",
                interval: 0,
			    formatter: function(value) {
				    if (value.length > 5) {
				        return value.substring(0, 5) + "..."
				    } else {
				        return value
				    }
			  }
			},
		    series: [
		        {
		            name: '比例',
		            type: 'bar',
		            stack: '总量',
		            label: {
		                normal: {
		                    show: true,
		                    position: 'insideRight'
		                }
		            },
		            data: rateArr
		        }
		    ]
		}
		barChart.setOption(option)
	}
	render() {
		console.log(this.props)
		const { msgDetailData: { content, titleType, author, authorHead, readCount, commentCount, attitudesCount, commentList = [] }, commentUserData: { commentUser = [] }, sensibilityData: { sensibility } } = this.props
		return(
			<div>
			    <div className={styles['msg-detail-block']}>
			        <img src={authorHead} className={styles['head-img']}/>
			        <div className={styles['info-block']}>
			            <div className={styles['author-info']}>{author}</div>
			            <div>{content}</div>
			        </div>
			        <span className={styles['msg-detail-info']}>阅读<span className={styles['info-text']}>({readCount})</span> | 讨论<span className={styles['info-text']}>({commentCount})</span> | 粉丝<span className={styles['info-text']}>({attitudesCount})</span></span>
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
			        <div className={styles['msg-title-block']}>热门评论及其情感分析</div>
			        <div className={styles['comment-list']}>
			            {commentList.map((item, index) => {
			            	return (
			            		<div key={index} className={styles['comment-item']}>
			            		    <img src={item.commentUserHead} className={styles['head-img']}/>
							        <div className={styles['info-block']}>
							            <div className={styles['author-info']}>{item.commentUser}</div>
							            <div>{item.commentText}</div>
							        </div>
							        <span className={styles['emotion-type']}>
							        {item.emotionType === 'good'? <span>积极向上，干下这碗鸡汤</span> : <span>态度消极，这碗毒药我就不奉陪啦</span>}
							        </span>
							        <span className={styles['emotion-analyze']}>
							            <span style={{marginRight: 15}}>
							            	<img src={GOOD_IMG} className={styles['emoj-img']}/>
							            	<span>积极<span className={styles['info-text']}>({item.goodProbability})</span></span>
							            </span>
							            <span>
							            	<img src={BAD_IMG} className={styles['emoj-img']}/>
							            	<span>消极<span className={styles['info-text']}>({item.badProbability})</span></span>
							            </span>
							        </span>
							        <span className={styles['msg-like']}>
							            <img src={LIKE_IMG} className={styles['like-img']}/>
							            <span>赞<span className={styles['info-text']}>({item.likeCount})</span></span>
							        </span>
			            		</div>
			            	)
			            })}
			        </div>
			    </div>
			    <div className={styles['user-opinion-analyze-block']}>
			        <div className={styles['msg-title-block']}>网民观点统计</div>
			        <div id="viewPoint" className={styles['viewpoint-chart']}></div>
			    </div>
			    <div className={styles['msg-comment-analyze-block']}>
			        <div className={styles['msg-title-block']}>网民对该热门话题情感倾向</div>
			        <Progress percent={sensibility} status="active" showInfo={false} />
			        <div className={styles['sensibility-display-block']}>
			            <div>
			                <div className={styles['sensibility-text']}>{sensibility}%</div>
			                <div>负面</div>
			            </div>
			            <div>
			                <div className={styles['not-sensibility-text']}>{100-sensibility}%</div>
			                <div>正面</div>
			            </div>
			        </div>
			        <div style={{marginTop: 10}}>
			            <span className={styles['emotion-danger-text']}>舆情风险</span>
			            {sensibility <= 10 && <span className={styles['low-info']}>低</span>}
			            {sensibility > 10 && sensibility < 50 && <span className={styles['middle-info']}>中</span>}
			            {sensibility >= 50 && <span className={styles['high-info']}>高</span>}
			        </div>
			    </div>
			</div>
		)
	}
}

export default connect(state => state.message.message)(MessageDetail)