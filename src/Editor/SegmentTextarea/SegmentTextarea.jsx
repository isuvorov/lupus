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
    const schema = this.props.schema || {}
    const rows = schema.options && schema.options.rows || 7
    return <div>
      <InputDebounce
        type="textarea"
        className="form-control"
        ref="input"
        rows={rows}
        value={this.props.value}
        onChange={handleChange}
      />
    </div>
  }
}
