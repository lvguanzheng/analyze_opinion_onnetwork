import React from 'react'
import { connect } from 'react-redux'
import echarts from 'echarts/lib/echarts'
import  'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legendScroll'

import styles from './Index.styl'
import { MESSAGE } from '../../constants/actions'

class MsgDataStatistics extends React.Component {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
		this.getChartData()
		this.getHotTopic()
	}
	initPie = data => {
		const { types = [] } = data
		let typeName = []
		let typeObjArr = []
		types.map(type => {
			typeName.push(type.name)
			let typeObj = {}
			typeObj.name = type.name
			typeObj.value = type.value
			typeObjArr.push(typeObj)
		})
		const pieChart = echarts.init(document.getElementById('pie'))
		const pieOption = {
		    title : {
		        text: '热点话题分类比例统计图',
		        x:'center'
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        x : 'center',
		        y : 'bottom',
		        data:typeName
		    },
		    toolbox: {
		        show : true,
		        feature : {
		            mark : {show: true},
		            dataView : {show: true, readOnly: false},
		            magicType : {
		                show: true,
		                type: ['pie', 'funnel']
		            },
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    calculable : true,
		    series : [
		        {
		            name:'比例',
		            type:'pie',
		            radius : [30, 110],
		            center : ['50%', '50%'],
		            roseType : 'area',
		            data: typeObjArr
		        }
		    ]
		}
		pieChart.setOption(pieOption)
	}
	initBar = data => {
		const { types = [] } = data
		let typeName = []
		let typeValue = []
		types.map(type => {
			typeName.push(type.name)
			typeValue.push(type.value)
		})
		const barChart = echarts.init(document.getElementById('bar'))
		const barOption = {
            title: {
                text: '热点话题分类数量统计图',
                x: 'center'
            },
            tooltip: {},
            legend: {
                data:['种类'],
                x: 'center',
                y: 'bottom'
            },
            xAxis: {
                data: typeName
            },
            yAxis: {},
            series: [{
                name: '种类',
                type: 'bar',
                data: typeValue
            }]
        }
        barChart.setOption(barOption)
	}
	getChartData = () => {
		const { dispatch } = this.props
		dispatch({type: MESSAGE.FETCH_MSG_TYPE, callback: data => {
			this.initPie(data)
		    this.initBar(data)
		}})
	}
	getHotTopic =() => {
		const { dispatch } = this.props
		dispatch({type: MESSAGE.FETCH_HOT_TOPIC})
	}
	render() {
		const { topicData: { topic } } = this.props
		return(
			<div>
				<div className={styles['chart-block']}>
				    <div id="pie" className={styles['pie-chart-block']}></div>
				    <div id="bar" className={styles['bar-chart-block']}></div>
				</div>
				<div className={styles['top-topic-block']}>
				    <div className={styles['msg-title-block']}>Top Topic</div>
				    <div style={{fontWeight: "bold"}}>当前最受网民关注的话题类型<span className={styles['topic-text']}>{topic}</span></div>
				</div>
			</div>
		)
	}
}

export default connect(state => state.message.message)(MsgDataStatistics)