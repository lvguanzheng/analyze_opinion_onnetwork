import { requireAll } from 'common/util'
import { Switch, Route, Redirect, NavLink } from 'react-router-dom'
import SideMenu from 'components/common/SideMenu'
import './styles/global/layout.styl'

const icons = requireAll(require.context('./images/menu-icon', false, /\.png$/))

const roots = [
    {
        path: '/message',
        label: '新闻管理',
        subs: [
            {
                path: '/list',
                label: '新闻列表',
                component: 'message.HotMessageList',
                meta: {
                    group: '热点新闻',
                    icon: 'message_list'
                }
            }, {
                path: '/messageDetail/:id',
                component: 'message.MessageDetail',
                meta: {
                    visible: false
                }
            }
        ]
    }, {
        path: '/system',
        label: '统计分析',
        subs: [
            {
                path: '/role',
                label: '数据统计',
                component: 'message.MsgDataStatistics',
                meta: {
                    group: '数据分析',
                    icon: 'role_list'
                }
            }
        ]
    }
]

// genetate routes and links

const containers = requireAll(require.context('containers', true, /^(.(?!App))+\.js$/))

const getComponent = ({ path, component, subs }) => {
    let comp = null
    if (component) {
        if (typeof component === 'function') {
            comp = component
        } else if (_.get(containers, component)) {
            comp = _.get(containers, component)
        } else {
            comp = containers._.Simple
        }
    } else {
        const parts = path.split('/').slice(1)
        if (subs) {
            comp = _.get(containers, [...parts, 'Index'], containers._.WithRoutes)
        } else {
            const tail = parts.pop()
            comp = _.get(containers, [...parts, _.capitalize(tail)], containers._.Simple)
        }
    }
    return comp
}

const mapViewToRoutesAndLinks = view => {
    const { subs = [], path = '' } = view
    const Links = props => {
        const Menu = props.template || SideMenu
        return (
            <Menu {...props}>
                {
                    subs
                        .filter(sub => _.get(sub, 'meta.visible', true))
                        .map(sub => ({ ...sub, path: path + sub.path }))
                        .map(sub => {
                            const iconKey = _.get(sub, 'meta.icon', false)
                            return (
                                <NavLink key={sub.path} to={sub.path} meta={sub.meta}>
                                    {
                                        iconKey && (
                                            <React.Fragment>
                                                <img className="on" src={icons[iconKey]} alt={sub.label} />
                                                <img className="off" src={icons[`${iconKey}_off`]} alt={sub.label} />
                                            </React.Fragment>
                                        )
                                    }
                                    {sub.label}
                                </NavLink>
                            )
                        })
                }
            </Menu>
        )
    }

    const Routes = props => (
        <div {...{ className: 'routes-container', ...props }}>
            <Switch>
                {
                    subs
                        .map(sub => ({ ...sub, path: path + sub.path }))
                        .map(sub => {
                            const Comp = getComponent(sub)
                            return (<Route
                                key={sub.path}
                                path={sub.path}
                                render={ps => <Comp {...ps} view={mapViewToRoutesAndLinks(sub)} />}
                            />)
                        })
                }
                {
                    !!subs.length && <Redirect from={path} to={path + subs[0].path} />
                }
            </Switch>
        </div>
    )

    return { Routes, Links, raw: view }
}

export default mapViewToRoutesAndLinks({ subs: roots })