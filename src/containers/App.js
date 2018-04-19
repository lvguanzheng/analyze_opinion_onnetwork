import view from 'view'
import 'style/cms-antd-theme.less'
import HeaderMenu from 'component/common/HeaderMenu'
import style from './App.styl'

export default props => (
    <div className={style.container}>
        <div className={style.header}>
            <div className={style.logo}>尚德CMS系统</div>
            <view.Links template={HeaderMenu} />
            <div className={style.user}>你好，小明</div>
        </div>
        <view.Routes className={style.x} />
    </div>
)