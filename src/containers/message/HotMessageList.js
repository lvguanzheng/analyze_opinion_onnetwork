import React from 'react'
import { connect } from 'react-redux'
import { Table, Button, Pagination, Modal } from 'antd'

import { MESSAGE } from '../../constants/actions'
import styles from './Index.styl'
import NO_DATA from '../../images/no_data.png'

const columns = [{
	title: '序号',
	key: '',
    dataIndex: '',
	render: (val, record, index) => <span>{index}</span>
},{
	title: '热搜新闻',
	dataIndex: 'msgDesc',
	key: 'msgDesc',
	render: (val, record, index) => (
		<div>
		<span>{record.msgDesc}</span>
		{!record.isHaveData && <img className={styles['no-data-img']} src={NO_DATA}/>}
		</div>
	)
}]
class HotMessageList extends React.Component {
	constructor(props) {
		super(props)
		this.queryParams = {}
	}
	componentDidMount() {
		this.search()
	}
	reFetchMsgList = () => {
		console.log("重新获取数据")
	}
	handelClick = record => {
		const { msgId } = record
		const { history } = this.props
		if(!record.isHaveData) {
			Modal.warning({
				title: '数据缺失',
				content: '该条热点新闻未获取到详细数据！',
				okText: '知道了'
			})
		} else {
			history.push('/message/messageDetail/'+msgId)
		}
	}
	search = () => {
        const { dispatch } = this.props
        const queryParams = {}
        queryParams.pageNumber = 1
        queryParams.pageSize = 10
        this.queryParams = queryParams
        dispatch({
            type: MESSAGE.FETCH_HOT_MESSAGE_LIST,
            ...queryParams
        })
    }
	changePage = current => {
        const queryParams = { ...this.queryParams, pageNumber: current }
        const { dispatch } = this.props
        dispatch({ type: MESSAGE.FETCH_HOT_MESSAGE_LIST, ...queryParams })
        this.queryParams = queryParams
    }
	render() {
		const { hotMsg: { records, pageNumber, maxRecord, pageSize} } = this.props
		console.log(this.props)
		return (
			<div>
			    <div className={styles['title-block']}>
			        <span className={styles['title-text']}>当前热搜榜</span>
			        <Button type="primary" onClick={this.reFetchMsgList}>刷新</Button>
			    </div>
			    <Table
			    columns={columns}
			    dataSource={records}
			    rowKey={(record, index) => index}
			    onRow={record => {
                    return {
                        onClick: () => this.handelClick(record)
                    }
                }}
			    pagination={false}
			    className={styles['msg-list']}
			    />
			    {maxRecord > 0 && (
                    <div className={styles['pagination']}>
                        <Pagination
                            current={pageNumber}
                            total={maxRecord}
                            pageSize={pageSize}
                            onChange={this.changePage}
                        />
                    </div>
                )}
			</div>
		)
	}
}

export default connect(state => state.message.message)(HotMessageList)