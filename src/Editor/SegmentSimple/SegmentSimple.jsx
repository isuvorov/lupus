import SegmentPrototype from '../SegmentPrototype'
import InputDebounce from '../InputDebounce'

export default class SegmentSimple extends SegmentPrototype {
  render() {
    const handleChange = value => {
      this.props.dispatch({
        type: 'editorSet',
        path: this.props.path,
        value,
      });
    }
    return <div>
      <InputDebounce
        type="text"
        className="form-control"
        ref="input"
        defaultValue={this.props.value}
        onChange={handleChange}
      />
    </div>
  }
}
