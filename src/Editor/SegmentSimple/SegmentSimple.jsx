import SegmentPrototype from '../SegmentPrototype'
import InputDebounce from '../InputDebounce'
import { Label } from 'react-bootstrap'

export default class SegmentSimple extends SegmentPrototype {
  render() {
    const handleChange = value => {
      this.props.dispatch({
        type: 'editorSet',
        path: this.props.path,
        value,
      });
    }
    const type = typeof this.props.value === 'Number' ? 'number' : 'text'
    return <div style={{position:'relative'}}>
      <Label bsStyle='warning' style={{position: 'absolute', right: 5, top: 5,}}>
        {typeof this.props.value}
      </Label>
      <InputDebounce
        type={type}
        className="form-control"
        ref="input"
        value={this.props.value}
        onChange={handleChange}
      />
    </div>
  }
}
