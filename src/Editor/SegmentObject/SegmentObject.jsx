import _ from 'lodash'
import { Button, ButtonGroup, Panel } from 'react-bootstrap'
import IconCode from 'react-icons/lib/fa/code'
import IconClose from 'react-icons/lib/fa/close'
import IconDown from 'react-icons/lib/fa/arrow-down'
import IconPlus from 'react-icons/lib/fa/plus'

import EditorBemjsonSegment from '../EditorBemjsonSegment'
import EditorBemjsonModal from '../EditorBemjsonModal'
import SegmentPrototype from '../SegmentPrototype'
import ObjectPropCreator from './ObjectPropCreator'

import cssm from '~/utils/CSSModules'
const style = require('./style.scss')

@cssm(style)
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
			const header = (
				<div styleName="panel-heading">
					{key}
					<ButtonGroup bsSize='small'>
						<EditorBemjsonModal bsStyle="default" changeName={true} onChange={onChange} value={value} path={path}>
							<IconCode />
						</EditorBemjsonModal>
						<Button onClick={remove} bsStyle="danger" bsSize="small">
							<IconClose />
						</Button>
					</ButtonGroup>
    		</div>
			)
			const ifArray = schema.type === 'array'
			const panelStyle = ifArray ? "info" : "default"
      return (
        <Panel key={key} bsStyle={panelStyle} header={header}>
          <EditorBemjsonSegment
						styleName="panel-body"
            value={value}
            path={path}
            dispatch={this.props.dispatch}
            schema={schema}
          />
        </Panel>
      );
    })

    const push = (state) => {
      this.props.dispatch({
        type: 'editorSet',
        path: this.getPath(state.key),
        value: state.value,
      });
    }

    return <div styleName="obj-content">
      <h3>
        Object
				<ButtonGroup bsSize='small'>
					<Button bsStyle='default'>
						<IconDown />
					</Button>
					<Button bsSize='small' bsStyle='default'>
						<IconPlus />
					</Button>
					<EditorBemjsonModal bsStyle='default' onChange={onChange} value={value} path={path}>
	          <IconCode />
	        </EditorBemjsonModal>
			  </ButtonGroup>
      </h3>
      {childs}
			<hr/>
			<div className="obj-creator">
				<ObjectPropCreator onSubmit={push} />
			</div>
    </div>
  }
}
