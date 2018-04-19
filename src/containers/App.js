import view from 'view'
import 'style/cms-antd-theme.less'
import HeaderMenu from 'components/common/HeaderMenu'
import style from './App.styl'

export default props => (
    <div className={style.container}>
        <div className={style.header}>
            <div className={style.logo}>新媒体下热点事件舆情分析</div>
            <view.Links template={HeaderMenu} />
            <div className={style.user}>你好，小明</div>
        </div>
        <view.Routes className={style.x} />
    </div>
)