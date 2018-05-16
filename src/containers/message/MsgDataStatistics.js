import React from 'react'
import { connect } from 'react-redux'
import echarts from 'echarts/lib/echarts'
import  'echarts/lib/chart/pie'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legendScroll'

import styles from './Index.styl'

class MsgDataStatistics extends React.Component {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
		this.initPie()
		this.initBar()
	}
	initPie = () => {
		const pieChart = echarts.init(document.getElementById('pie'))
		const pieOption = {
		    title : {
		        text: '热点话题分类统计图',
		        x:'center'
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        x : 'center',
		        y : 'bottom',
		        data:['rose1','rose2','rose3','rose4','rose5','rose6','rose7','rose8']
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
		            name:'面积模式',
		            type:'pie',
		            radius : [30, 110],
		            center : ['50%', '50%'],
		            roseType : 'area',
		            data:[
		                {value:10, name:'rose1'},
		                {value:5, name:'rose2'},
		                {value:15, name:'rose3'},
		                {value:25, name:'rose4'},
		                {value:20, name:'rose5'},
		                {value:35, name:'rose6'},
		                {value:30, name:'rose7'},
		                {value:40, name:'rose8'}
		            ]
		        }
		    ]
		}
		pieChart.setOption(pieOption)
	}
	initBar = () => {
		const barChart = echarts.init(document.getElementById('bar'))
		const barOption = {
            title: {
                text: '热点话题数量统计图',
                x: 'center'
            },
            tooltip: {},
            legend: {
                data:['销量'],
                x: 'center',
                y: 'bottom'
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        }
        barChart.setOption(barOption)
	}
	render() {
		return(
			<div className={styles['chart-block']}>
			    <div id="pie" className={styles['pie-chart-block']}></div>
			    <div id="bar" className={styles['bar-chart-block']}></div>
			</div>
		)
	}
}

export default connect(state => state.message.message)(MsgDataStatistics)