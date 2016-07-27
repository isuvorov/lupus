import { Table, Button } from 'react-bootstrap'
import _ from 'lodash'

import IconClose from 'react-icons/lib/fa/close'
import IconPlus from 'react-icons/lib/fa/plus'
import IconArrowUp from 'react-icons/lib/fa/arrow-up'
import IconArrowDown from 'react-icons/lib/fa/arrow-down'

import EditorBemjsonSegment from '../EditorBemjsonSegment'
import SegmentPrototype from '../SegmentPrototype'


export default class SegmentArray extends SegmentPrototype {
  render() {
    const last = this.props.value.length - 1;
    const childs = _.map(this.props.value, (value, key) => {
      const path = this.getPath(key);

      const up = () => {
        this.props.dispatch({
          type: 'editorSwap',
          path,
          pathTo: this.getPath(key - 1),
        });
      }

      const down = () => {
        this.props.dispatch({
          type: 'editorSwap',
          path,
          pathTo: this.getPath(key + 1),
        });
      }

      const remove = () => {
        this.props.dispatch({
          type: 'editorRemoveElement',
          path: this.props.path,
          index: key,
        });
      }

      // ЛЮБОЕ СЛОВО, ТЕЛО СЕГМЕНТА
      return <tbody key={key}>
        <tr>
          <td>
            {key}
          </td>
          <td>
            <EditorBemjsonSegment value={value} path={path} dispatch={this.props.dispatch} />
          </td>
          <td>
            <Button bsStyle="primary" bsSize="small" onClick={up} disabled={key === 0}>
              <IconArrowUp />
            </Button>
            <Button bsStyle="primary" bsSize="small" onClick={down} disabled={key === last}>
              <IconArrowDown />
            </Button>
            <Button bsStyle="danger" bsSize="small" onClick={remove}>
              <IconClose />
            </Button>
          </td>
        </tr>
      </tbody>
    });

    const push = () => {
      this.props.dispatch({
        type: 'editorSet',
        path: this.getPath(this.props.value.length),
        value: '',
      });
    }

    return <div>
      <Table striped bordered condensed hover>
        {childs}
      </Table>
      <Button bsStyle="success" bsSize="small" onClick={push} >
        <IconPlus />
      </Button>
    </div>
  }
}
