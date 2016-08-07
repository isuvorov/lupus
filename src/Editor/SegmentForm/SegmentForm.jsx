import _ from 'lodash'
import {
    Button,
  FormGroup,
  ControlLabel,
} from 'react-bootstrap'


import EditorBemjsonSegment from '../EditorBemjsonSegment'
import SegmentPrototype from '../SegmentPrototype'
import ControlEdit from '../SegmentForm/ControlEdit'
import ControlPush from '../SegmentForm/ControlPush'

import CSSModules from '~/utils/CSSModules'
@CSSModules(require('./SegmentForm.css')) //
export default class SegmentForm extends SegmentPrototype {

  render() {
    return <div styleName="root">
      {
        _.map(this.props.value, (value, key) => {
          const child = this.getChildProps(key)
          const type = this.getValueType(key)
          if (this.isComplexType(key)) {
            return <div
              className={"panel " + (type === 'array' ? 'panel-warning' : 'panel-default')}
              styleName={`panel panel_type_${type}`}
            >
              <h3 className="panel-heading" styleName="heading">
                {/* <h3 className="panel-title"> */}
                  <span styleName="title">
                    {child.title}
                  </span>
                  {/* <Button
                    bsStyle="link"
                    // onClick={this.changeCollapse(key)}
                  >
                    {child.title}
                  </Button> */}
                  <span styleName="controlEdit">
                    <ControlEdit {...child} bsSize='small' />
                  </span>
                {/* </h3> */}
              </h3>
              <div
                key={key}
                className="panel-body"
                styleName="body"
                style={{
                  display: false ? 'none' : 'block',
                }}
              >
                <EditorBemjsonSegment
                  {...child}
                />
              </div>
            </div>
          }


          return <FormGroup
            controlId="formBasicText"
            // validationState='error'
          >
            <ControlLabel style={{width:'100%'}}>
              <div>
                <span>
                  {child.title}
                </span>
                <span style={{float:'right'}}>
                  <ControlEdit {...child} />
                </span>
              </div>
            </ControlLabel>
            <EditorBemjsonSegment
              {...child}
            />
            {/* <FormControl.Feedback />
            <HelpBlock>Validation is based on string length.</HelpBlock> */}
          </FormGroup>
        })
      }
      <ControlPush {...this.props} />
    </div>
  }
}
