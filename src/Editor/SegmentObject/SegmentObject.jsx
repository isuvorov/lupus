import _ from 'lodash'
import { Button } from 'react-bootstrap'
import IconCode from 'react-icons/lib/fa/code'
import IconClose from 'react-icons/lib/fa/close'

import EditorBemjsonSegment from '../EditorBemjsonSegment'
import EditorBemjsonModal from '../EditorBemjsonModal'
import SegmentPrototype from '../SegmentPrototype'
import ObjectPropCreator from './ObjectPropCreator'

export default class SegmentObject extends SegmentPrototype {
  render() {

    const path = this.getPath();
    const value = this.props.value;
    const onChange = (value) => {
      this.props.dispatch({
        type: 'editorSet',
        path,
        value,
      });
    }

    // return (
    //   <div key={key}>
    //     <label className=" control-label">
    //       {key}
    //       &nbsp;



    const childs = _.map(this.props.value, (value, key) => {
      const path = this.getPath(key);
      const schema = this.getSchema(key);

      const remove = () => {
        this.props.dispatch({
          type: 'editorRemove',
          path,
        });
      }

      // change in modal
      const onChange = (value) => {
        // console.log('onChange', value);
        this.props.dispatch({
          type: 'editorSet',
          path,
          value,
        });
      }

      return (
        <div key={key}>
          <label className=" control-label">
            {key}
            &nbsp;
            <EditorBemjsonModal changeName={true} onChange={onChange} value={value} path={path}>
              <IconCode />
            </EditorBemjsonModal>
            &nbsp;
            <Button onClick={remove} bsStyle="danger" bsSize="small">
              <IconClose />
            </Button>
          </label>
          <br />
          <EditorBemjsonSegment
            value={value}
            path={path}
            dispatch={this.props.dispatch}
            schema={schema}
          />
        </div>
      );
    })

    const push = (state) => {
      this.props.dispatch({
        type: 'editorSet',
        path: this.getPath(state.key),
        value: state.value,
      });
    }

    return <div className="well">
      <h3>
        Object &nbsp;
        <Button bsSize='small' bsStyle='primary'>
          v
        </Button>
        &nbsp;
        <Button bsSize='small' bsStyle='primary'>
          +
        </Button>
        &nbsp;
        <EditorBemjsonModal onChange={onChange} value={value} path={path}>
          <IconCode />
        </EditorBemjsonModal>
      </h3>
      {childs}
      <hr />
      <ObjectPropCreator onSubmit={push} />
    </div>
  }
}
