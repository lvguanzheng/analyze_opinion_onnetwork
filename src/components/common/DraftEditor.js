// import PropTypes from 'prop-types'
import { convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import { Input } from 'antd'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
// import ReactHtmlParser from 'react-html-parser'
import draftStyle from './DraftEditor.styl'

const InputProps = {
    readOnly: true
}

class DraftEditor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    uploadImageCallBack = file =>
        new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.open('POST', 'https://api.imgur.com/3/image')
            xhr.setRequestHeader('Authorization', 'Client-ID XXXXX')
            const data = new FormData()
            data.append('image', file)
            xhr.send(data)
            xhr.addEventListener('load', () => {
                const response = JSON.parse(xhr.responseText)
                resolve(response)
            })
            xhr.addEventListener('error', () => {
                const error = JSON.parse(xhr.responseText)
                reject(error)
            })
        })

    render() {
        const { editorState } = this.props
        const currentContent = editorState.getCurrentContent()
        const draftHtmlStr = draftToHtml(convertToRaw(currentContent))

        const editorProps = {
            wrapperClassName: draftStyle.draftWrapper,
            toolbarClassName: draftStyle.draftTool,
            editorClassName: draftStyle.draftEditor,
            initialEditorState: editorState,
            localization: { locale: 'zh' },
            toolbar: {
                options: ['textAlign', 'link', 'image', 'history'],
                image: {
                    uploadCallback: this.uploadImageCallBack,
                    alt: { present: true, mandatory: true }
                }
            }
        }

        return (
            <div>
                <Input {...InputProps} value={draftHtmlStr} />
                <Editor {...this.props} {...editorProps} />
            </div>
        )
    }
}

DraftEditor.propTypes = {}

export default DraftEditor