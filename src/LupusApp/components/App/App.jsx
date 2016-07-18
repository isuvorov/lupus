import {Component} from 'react'
import {
  Navbar, Nav, NavItem, NavDropdown, MenuItem,
  Grid, Row, Col,
  ListGroup, ListGroupItem,
  Tabs, Tab,
  Panel,
  Button,
} from 'react-bootstrap'
import CloseIcon from 'react-icons/lib/fa/close'
import SaveIcon from 'react-icons/lib/fa/check'

import CSSModules from '~/utils/CSSModules'

@CSSModules(require('./App.styl'))
export default class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      active: 0
    }
    // this.setActive = this.setActive.bind(this)
  }
  setActive(active){
    return () => {
      this.setState({active})
    }
  }
  getProject(){
    return this.props.projects[this.state.active] || {}
  }
  render() {
    return <div styleName='root'>
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">React-Bootstrap</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#">Link</NavItem>
            <NavItem eventKey={2} href="#">Link</NavItem>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">Link Right</NavItem>
            <NavItem eventKey={2} href="#">Link Right</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Grid>
        <Row>
          <Col md={4}>
            <ListGroup>
              <For each="project" index="index" of={ this.props.projects }>
                <ListGroupItem
                  onClick={this.setActive(index)}
                  active={index === this.state.active}
                >
                  {project.name}
                </ListGroupItem>
              </For>
              <Button bsStyle='success'>
                +
              </Button>
           </ListGroup>

          </Col>
          <Col md={8}>

            <Panel header={<h2>{this.getProject().name} <Button bsSize='small' bsStyle='success' style={{float:'right'}}><SaveIcon /></Button> <Button bsSize='small' bsStyle='danger' style={{float:'right'}}><CloseIcon /></Button> </h2>}>

              Git hook: <a href={'http://panel.s3.mgbeta.ru/projects/refresh?name=' + this.getProject().name}>{'http://panel.s3.mgbeta.ru/projects/refresh?name=' + this.getProject().name}</a>


              <Tabs defaultActiveKey={0} id="uncontrolled-tab-example">
              <Tab eventKey={0} title="Общие данные">
                Tab 0 content
               </Tab>
               <Tab eventKey={1} title="Репозитории">
                Tab 1 content
               </Tab>
               <Tab eventKey={2} title="Файлы">
                Tab 2 content
              </Tab>
             </Tabs>
            </Panel>

          </Col>
        </Row>
      </Grid>
    </div>
  }
}
