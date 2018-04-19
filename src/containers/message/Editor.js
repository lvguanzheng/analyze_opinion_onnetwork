import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { EditorState } from 'draft-js'
import { Form, Select, Radio, Button, Input } from 'antd'
import DraftEditor from '../../components/common/DraftEditor'
import Transfer from '../../components/message/Transfer'
import PushTime from '../../components/message/PushTime'
import { MESSAGE } from '../../constants/actions'
import {
    showTypes,
    deptTypes,
    pushTypes,
    messageStatus
} from '../../common/config'
import EditorStyle from './Editor.styl'

const FormItem = Form.Item
const SelectOption = Select.Option
const RadioGroup = Radio.Group
const { TextArea } = Input

// 表单项布局
const formItemLayout = {
    labelCol: {
        span: 4,
        style: {
            width: 80,
            textAlign: 'left'
        }
    },
    wrapperCol: {
        span: 16
    }
}

// 按钮通用属性
const buttonProps = {
    type: 'primary',
    style: {
        width: 120,
        height: 36,
        margin: 20
    }
}

class FormEditor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editorState: EditorState.createEmpty()
        }
    }

    componentDidMount() {
        console.log('componentDidMount')
        const {
            getMessageDetail, getInitData, match, getDetailTypesByMainId
        } = this.props
        const { params } = match
        getInitData({}, val => {
            if (params && params.id) {
                getMessageDetail({ id: params.id }, detail => {
                    getDetailTypesByMainId({ id: detail.mainTypeId })
                })
            } else {
                getDetailTypesByMainId({ id: val[0].mainId })
            }
        })
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')
    }

    /**
     * 富文本编辑器内容改变事件
     * @param editorState
     */
    onEditorStateChange = editorState => {
        this.setState({ editorState })
    }

    /**
     * 表单提交事件
     * @param e
     */
    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
            }
        })
    }

    /**
     * 主类别变更事件
     * @param mainId
     */
    mainTypeChange = mainId => {
        console.log(`mainTypeChange:${mainId}`)
        this.props.getDetailTypesByMainId({ mainId })
    }

    /**
     * 推送事件变化事件
     * @param time
     */
    pushTimeChange = time => {
        console.log(time)
    }

    /**
     * 渲染表单项内容
     * @param item
     * @returns {XML}
     */
    renderItem = item => {
        const {
            type,
            options = [],
            placeholder,
            onChange,
            pushType,
            style
        } = item

        // 通用属性
        const optionProps = {
            placeholder,
            onChange
        }
        const { editorState } = this.state

        // 编辑器组件属性
        const editorProps = {
            initialEditorState: editorState,
            onEditorStateChange: this.onEditorStateChange,
            editorState
        }

        // 推送事件组件属性
        const pushTimeProps = {
            ...optionProps,
            pushType,
            renderItem: this.renderItem
        }

        switch (type) {
        case 'select':
            return (
                <Select
                    {...optionProps}
                    style={{ width: 180, ...style }}
                >
                    {options.map(({ value, label }) => (
                        <SelectOption key={value} value={value}>
                            {(label || value)}
                        </SelectOption>
                    ))}
                </Select>
            )
        case 'radio':
            return (
                <RadioGroup {...optionProps}>
                    {options.map(({ value, label }) => (
                        <Radio key={value} value={value}>
                            {(label || value)}
                        </Radio>
                    ))}
                </RadioGroup>
            )
        case 'editor':
            return (
                <DraftEditor {...editorProps} />
            )
        case 'transfer':
            return <Transfer {...this.props} />
        case 'pushTime':
            return <PushTime {...pushTimeProps} />
        case 'textarea':
            return <TextArea rows={4} />
        default:
            return <div>default</div>
        }
    }

    /**
     * 根据配置信息渲染表单项
     * @param config
     */
    renderFormItem = config => {
        const {
            id,
            rules,
            content,
            initialValue
        } = config
        const { getFieldDecorator } = this.props.form
        return getFieldDecorator(id, { rules, initialValue })(
            this.renderItem(content))
    }

    render() {
        const { editor, form = {} } = this.props
        const {
            mainTypes = { pending: false },
            detailTypes = { pending: false },
            messageDetail = { pending: false }
        } = editor

        // 主类别下拉选项
        const mainOptions = mainTypes.pending
            ? mainTypes.data.map(type => ({
                ...type,
                value: type.mainId,
                label: type.mainName
            }))
            : []
        // 子类别下拉选项
        const detailOptions = detailTypes.pending
            ? detailTypes.data.map(type => ({
                ...type,
                value: type.detailId,
                label: type.detailName
            }))
            : []
        // 设置表单默认数据
        const {
            mainTypeId = mainOptions[0] && mainOptions[0].value,
            detailTypeId = detailOptions[0] && detailOptions[0].value,
            showType = showTypes[0] && showTypes[0].value,
            content = '',
            pushType = pushTypes[0] && pushTypes[0].value,
            status = messageStatus[0] && messageStatus[0].value,
            remark = ''
        } = (messageDetail.pending ? messageDetail.data : {})

        // 当前推送类型
        const curPushType = form.getFieldValue('pushType')

        // 表单配置信息
        const formItems = [
            {
                id: 'mainType',
                label: '主类别',
                rules: [
                    { message: '请选择主类别!' }
                ],
                initialValue: mainTypeId,
                content: {
                    type: 'select',
                    placeholder: '请选择主类别',
                    options: mainOptions,
                    onChange: this.mainTypeChange
                }
            },
            {
                id: 'detailType',
                label: '子类别',
                rules: [
                    { message: '请选择子类别!' }
                ],
                initialValue: detailTypeId,
                content: {
                    type: 'select',
                    placeholder: '请选择子类别',
                    options: detailOptions
                }
            },
            {
                id: 'showType',
                label: '消息位',
                rules: [
                    { message: '请选择消息位!' }
                ],
                initialValue: showType,
                content: {
                    type: 'radio',
                    options: showTypes
                }
            },
            {
                id: 'editor',
                label: '消息内容',
                rules: [
                    { message: '请输入消息内容!' }
                ],
                initialValue: content,
                content: {
                    type: 'editor'
                }
            },
            {
                id: 'deptType',
                label: '接收范围',
                rules: [
                    { message: '请选择接收范围!' }
                ],
                content: {
                    type: 'radio',
                    options: deptTypes
                }
            },
            {
                id: 'transfer',
                label: ' ',
                rules: [
                    { message: '请选择接收对象!' }
                ],
                content: {
                    type: 'transfer'
                }
            },
            {
                id: 'pushType',
                label: '推送类型',
                rules: [
                    { message: '请输入推送类型!' }
                ],
                initialValue: pushType,
                content: {
                    type: 'radio',
                    options: pushTypes
                }
            },
            {
                id: 'pushTime',
                label: '推送时间',
                rules: [
                    { message: '请输入推送类型!' }
                ],
                hidden: pushTypes.findIndex(type =>
                    type.value === curPushType) < 1,
                content: {
                    type: 'pushTime',
                    pushType: curPushType,
                    onChange: this.pushTimeChange
                }
            },
            {
                id: 'status',
                label: '当前状态',
                rules: [
                    { message: '请选择当前状态!' }
                ],
                initialValue: status,
                content: {
                    type: 'radio',
                    options: messageStatus
                }
            },
            {
                id: 'remark',
                label: '备注说明',
                initialValue: remark,
                rules: [
                    { required: false }
                ],
                content: {
                    type: 'textarea'
                }
            }
        ]

        return (
            <div className={EditorStyle.main}>
                <Form onSubmit={this.handleSubmit}>
                    {formItems.map(item => (
                        item.hidden ? '' : (
                            <FormItem
                                key={item.id}
                                label={item.label}
                                colon={item.label !== ' '}
                                {...formItemLayout}
                            >
                                {this.renderFormItem(item)}
                            </FormItem>
                        )
                    ))}
                    <div className={EditorStyle.buttons}>
                        <Button
                            {...buttonProps}
                            onClick={this.handleSubmit}
                        >
                            保存
                        </Button>
                        <Button
                            {...buttonProps}
                            onClick={this.handleSubmit}
                        >
                            保存并提审
                        </Button>
                    </div>
                </Form>
            </div>
        )
    }
}

FormEditor.propTypes = {
    editor: PropTypes.object.isRequired,
    getInitData: PropTypes.func.isRequired
}

const Editor = Form.create()(FormEditor)

export default connect(
    state => state.message,
    dispatch => ({
        getInitData: (payload, callback) =>
            dispatch({ type: MESSAGE.GET_MAIN_TYPES, ...payload, callback }),
        getMessageDetail: (payload, callback) =>
            dispatch({ type: MESSAGE.TO_UPDATE_MESSAGE, ...payload, callback }),
        getDetailTypesByMainId: payload =>
            dispatch({ type: MESSAGE.GET_DETAIL_TYPES, ...payload }),
        clearEditorData: () =>
            dispatch({ type: MESSAGE.CLEAR_EDITOR })
    })
)(Editor)