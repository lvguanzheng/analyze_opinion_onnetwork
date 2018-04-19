// import PropTypes from 'prop-types'
import { InputNumber, DatePicker } from 'antd'
import { pushRateUnits } from '../../common/config'

const { RangePicker } = DatePicker

class PushTime extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    onNumberChange = number => {
        console.log(number)
    }

    render() {
        const { renderItem } = this.props
        const InputNumProps = {
            min: 1,
            defaultValue: 1,
            style: { width: 60 },
            onChange: this.onNumberChange()
        }

        const PushRateUnitProps = {
            type: 'select',
            placeholder: '时间单位',
            options: pushRateUnits,
            onChange: this.onNumberChange,
            style: { width: 100 }
        }

        const RangPickerProps = {
            showTime: true
        }
        return (
            <div>
                <span>每</span>
                <InputNumber {...InputNumProps} />
                {renderItem(PushRateUnitProps)}
                <RangePicker {...RangPickerProps} />
            </div>
        )
    }
}

PushTime.propTypes = {}

export default PushTime