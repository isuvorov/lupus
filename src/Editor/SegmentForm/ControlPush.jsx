import {
  Button,
} from 'react-bootstrap'
import IconPlus from 'react-icons/lib/fa/plus'
import SegmentPrototype from '../SegmentPrototype'
import ControlAddProp from './ControlAddProp'

import CSSModules from '~/utils/CSSModules'
@CSSModules(require('./ControlPush.css')) //
export default class ControlPush extends SegmentPrototype {

  render() {
    return <div>
      <If condition={this.props.actionAddProp}>

        <ControlAddProp onSubmit={this.props.actionAddProp} />

      </If>
      <If condition={this.props.actionPush}>
        <Button onClick={this.props.actionPush} block>
          <IconPlus /> Добавить элемент
        </Button>
      </If>
    </div>
  }

}
