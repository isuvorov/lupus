import {
  Button,
  ButtonGroup,
  DropdownButton,
  MenuItem,
} from 'react-bootstrap'
import IconCode from 'react-icons/lib/fa/code'
import IconDown from 'react-icons/lib/fa/arrow-down'
import IconUp from 'react-icons/lib/fa/arrow-up'
import IconPlus from 'react-icons/lib/fa/plus'
import IconClose from 'react-icons/lib/fa/close'

import EditorBemjsonModal from '../EditorBemjsonModal'
import SegmentPrototype from '../SegmentPrototype'

import CSSModules from '~/utils/CSSModules'
@CSSModules(require('./ControlEdit.css')) //
export default class ControlEdit extends SegmentPrototype {
  render() {
    const parent = this.props.parent
    const child = this.props
    // const actions = this.props.actions
    // const specialActions = this.props.specialActions
    const actions = this.props
    const specialActions = this.props
    const bsSize = this.props.bsSize || 'xsmall'
    const key = child.path[child.path.length - 1]

    return <ButtonGroup bsSize={bsSize}>
      <If condition={actions.actionSet && this.isComplexType()}>
        <EditorBemjsonModal
          bsStyle="info"
          bsSize={bsSize}
          bsSize="xsmall"
          {...child}
          onChange={actions.actionSet}
        >
          <IconCode />
        </EditorBemjsonModal>
      </If>

      <If condition={specialActions.actionUp}>
        <Button
          bsStyle="default"
          bsSize={bsSize}
          onClick={specialActions.actionUp}
          disabled={key === 0}
        >
          {child.key}
          <IconUp />
        </Button>
      </If>
      <If condition={specialActions.actionDown}>
        <Button
          bsStyle="default"
          bsSize={bsSize}
          onClick={specialActions.actionDown}
          disabled={key=== parent.value.length - 1}
        >
          <IconDown />
        </Button>
      </If>
      {/* <If condition={actions.actionAddProp}>
        <Button bsStyle="default" bsSize={bsSize} bsSize="xsmall" onClick={actions.actionAddProp}>
          <IconPlus />
        </Button>
      </If>
      <If condition={actions.actionPush}>
        <Button bsStyle="default" bsSize={bsSize} bsSize="xsmall" onClick={actions.actionPush}>
          <IconPlus />
        </Button>
      </If> */}
      {/* <If condition={specialActions.actionRemove}>
        <Button bsStyle="danger" bsSize={bsSize} onClick={specialActions.actionRemove}>
          <IconClose />
        </Button>
      </If> */}
      <DropdownButton
        bsSize={bsSize}
        bsStyle="warning"
        id="TypeChanger"
      >
        {/* <MenuItem eventKey="1">String</MenuItem>
        <MenuItem eventKey="2">Number</MenuItem>
        <MenuItem eventKey="3">Date</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey="4">Object</MenuItem>
        <MenuItem eventKey="5">Array</MenuItem> */}

        <If condition={actions.actionAddProp}>
          <MenuItem bsStyle="default" bsSize={bsSize} bsSize="xsmall" onClick={actions.actionAddProp}>
            <IconPlus /> Добавить свойство
          </MenuItem>
        </If>
        <If condition={actions.actionPush}>
          <MenuItem bsStyle="default" bsSize={bsSize} bsSize="xsmall" onClick={actions.actionPush}>
            <IconPlus />Добавить элемент
          </MenuItem>
        </If>
        <If condition={actions.actionSet}>
          <EditorBemjsonModal
            bsStyle="info"
            bsSize={bsSize}
            bsSize="xsmall"
            {...child}
            onChange={actions.actionSet}
          >
            <IconCode /> Изменить
          </EditorBemjsonModal>
        </If>
        <MenuItem divider />
        <If condition={specialActions.actionUp}>
          <MenuItem
            bsStyle="default"
            bsSize={bsSize}
            onClick={specialActions.actionUp}
            disabled={key === 0}
          >
            {child.key}
            <IconUp /> Передвинуть выше
          </MenuItem>
        </If>
        <If condition={specialActions.actionDown}>
          <MenuItem
            bsStyle="default"
            bsSize={bsSize}
            onClick={specialActions.actionDown}
            disabled={key=== parent.value.length - 1}
          >
            <IconDown /> Передвинуть ниже
          </MenuItem>
        </If>
        <MenuItem divider />
        <If condition={specialActions.actionRemove}>
          <MenuItem bsStyle="danger" bsSize={bsSize} onClick={specialActions.actionRemove}>
            <IconClose /> Удалить
          </MenuItem>
        </If>
      </DropdownButton>
    </ButtonGroup>
  }
}
