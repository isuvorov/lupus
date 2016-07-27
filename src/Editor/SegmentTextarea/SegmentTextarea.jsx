import SegmentPrototype from '../SegmentPrototype'
import InputDebounce from '../InputDebounce'

export default class SegmentTextarea extends SegmentPrototype {
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
        type="textarea"
        className="form-control"
        ref="input"
        defaultValue={this.props.value}
        onChange={handleChange}
      />
    </div>
  }
}
