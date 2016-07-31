import { Table, Button, ButtonGroup, PanelGroup, Panel } from 'react-bootstrap'
import _ from 'lodash'

import IconClose from 'react-icons/lib/fa/close'
import IconPlus from 'react-icons/lib/fa/plus'
import IconArrowUp from 'react-icons/lib/fa/arrow-up'
import IconArrowDown from 'react-icons/lib/fa/arrow-down'

import EditorBemjsonSegment from '../EditorBemjsonSegment'
import SegmentPrototype from '../SegmentPrototype'

import cssm from '~/utils/CSSModules'
const style = require('../SegmentObject/style.scss')

@cssm(style)
export default class SegmentArray extends SegmentPrototype {
  render() {
    const last = this.props.value.length - 1;
    const childs = _.map(this.props.value, (value, key) => {
      const path = this.getPath(key);
      const schema = this.getSchema(key);

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

			const header = (
				<div>
					{`Object ${key}`}
					<ButtonGroup styleName="btn-group" bsSize='small'>
						<Button bsStyle="default" onClick={up} disabled={key === 0}>
							<IconArrowUp />
						</Button>
						<Button bsStyle="default" onClick={down} disabled={key === last}>
							<IconArrowDown />
						</Button>
						<Button bsStyle="danger" onClick={remove}>
							<IconClose />
						</Button>
					</ButtonGroup>
				</div>
			)
      // ЛЮБОЕ СЛОВО, ТЕЛО СЕГМЕНТА
      return <PanelGroup styleName="panel-group" defaultActiveKey={0} accordion>
	    <Panel header={header} eventKey={key}>
				<EditorBemjsonSegment
					value={value}
					path={path}
					dispatch={this.props.dispatch}
					schema={schema}
				/>
			</Panel>
	  </PanelGroup>
    });

    const schema = this.getSchema(0)
    const push = () => {
      const value = {}
      this.props.dispatch({
        type: 'editorSet',
        path: this.getPath(this.props.value.length),
        value: this.getSample(schema),
        // value: this.getSample(this.props.value.length),
      });
    }

    return <div>
        {childs}
				<Button bsStyle="success" onClick={push} block>
					<IconPlus /> Добавить элемент
				</Button>
    </div>
  }
}
