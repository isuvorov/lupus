import SegmentPrototype from '../SegmentPrototype'
import SegmentArray from '../SegmentArray'
import SegmentObject from '../SegmentObject'
import SegmentSimple from '../SegmentSimple'
import SegmentTextarea from '../SegmentTextarea'

export default class EditorBemjsonSegment extends SegmentPrototype {

  getRenderComponent() {
    switch (this.getFormat()) {
      case 'textarea':
        return SegmentTextarea
      default:
        break
    }

    switch (this.getSuperType()) {
      case 'array':
        return SegmentArray
      case 'object':
        return SegmentObject
      case 'simple':
      default:
        return SegmentSimple
    }
  }

  render() {
    const Class = this.getRenderComponent()
    return <Class {...this.props} />
    // return <div className="EditorBemjsonSegment">{content}</div>
  }
}
