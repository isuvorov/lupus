import {zipObject} from 'lodash'
import React from 'react'
import Icon from 'react-fa'
import {
  Modal,
  Popover,
  Tooltip,
  Button,
  OverlayTrigger,
  Grid,
  Col,
  Row,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from 'react-bootstrap'
import Select from 'react-select'
import styles from "./EditorQ.css"
// import EditorTask from './EditorTask.jsx'
// import EditorDecision from './EditorDecision.jsx'
// import EditorTemplates from './EditorTemplates.jsx'

// import { SideNav, Nav } from 'react-sidenav';

// //render it
// var navi = [
//     { id: 'dashboard', icon: 'fa fa-dashboard' , text: 'Dashboard'},
//     { id: 'products', icon: 'fa fa-cube', text: 'Products' ,
//         navlist: [
//           { icon: 'fa fa-desktop', id: 'manage' ,text: 'Manage Product' },
//           { icon: 'fa fa-cog', id: 'suppliers' ,text: 'Suppliers' }
//         ]
//     },
//     { id: 'inventory', icon: 'fa fa-database' ,text: 'Inventory'},
//     { id: 'deliveries', icon: 'fa fa-truck' ,text: 'Deliveries'},
//     { id: 'reports', icon: 'fa fa-bar-chart' ,text: 'Reports' }
// ];
//
//
// const SideNavComponent = React.createClass({
//
//         getInitialState() {
//             return { selected: 'dashboard' };
//             // this.setState({selected: 'dashboard'});
//         },
//         onSelection(selection) {
//             this.setState({selected: selection.id});
//         },
//         render() {
//             return <SideNav selected={this.state.selected} navs={navi} onSelection={this.onSelection} />
//         }
//
//     });
//


var SideBarStyle = {

  display: 'flex',
  'flexDirection': 'row',
  'alignItems': 'stretch',

  NavBar: {
    'borderBottom': 0,
    display: 'flex',
    'flexDirection': 'column',
    'flexGrow': '1',
    color: 'white',
    float: 'left',
    'minHeight': '100%',
    width: '50px',
    'justifyContent': 'stretch',
    'alignItems': 'stretch',
    'alignContent': 'stretch',
    // /* min-height: 100vh, */
    position: 'fixed',
    // 'z-index': '1',
    // float: 'left',

  },

  NavItemDivider: {
    backgroundColor: '#333',
    display: 'flex',
    'minHeight': '100px',
    'minHeight': '100%',
    'flexGrow': '1'
  },

  NavItem: {
    backgroundColor: '#333',
    color: 'white',
  },
  TabContent: {
    'marginLeft': '55px',
    float: 'right'
  }

};

export default class EditorNav extends React.Component {

  render() {
    return (
      <div className="">
        <div className="tabs-left" style={SideBarStyle}>
          <ul className="nav nav-tabs " style={SideBarStyle.NavBar}>
            <li className="active">
              <a href="#a" data-toggle="tab">
                <span className="glyphicon glyphicon-heart"></span>
              </a>
            </li>
            <li className={styles.hovered}>
              <a href="#b" data-toggle="tab" style={SideBarStyle.NavItem}>
                <span className="glyphicon glyphicon-star"></span>
              </a>
            </li>
            <li>
              <a href="#c" data-toggle="tab" style={SideBarStyle.NavItem}>
                <span className="glyphicon glyphicon-headphones"></span>
              </a>
            </li>
            <li>
              <a href="#d" data-toggle="tab" style={SideBarStyle.NavItem}>
                <span className="glyphicon glyphicon-time"></span>
              </a>
            </li>

            <li >
              <a href="#d" style={SideBarStyle.NavItemDivider}></a>
            </li>

            <li>
              <a href="#e" data-toggle="tab" style={SideBarStyle.NavItem}>
                <span className="glyphicon glyphicon-floppy-disk"></span>
              </a>
            </li>
            <li>
              <a href="#f" data-toggle="tab" style={SideBarStyle.NavItem}>
                <span className="glyphicon glyphicon-remove"></span>
              </a>
            </li>
          </ul>

          <div className="tab-content " style={SideBarStyle.TabContent}>
            <div className="tab-pane active" id="a">

          {/*   <EditorTemplates/>*/}

              {/* <EditorTask/>*/}
              {/* <EditorDecision/>*/}

            </div>
            <div className="tab-pane" id="b">
              <h3>What's your Favorite?</h3>

            {/*  <EditorDecision/>*/}
            </div>
            <div className="tab-pane" id="c">CCCCThirdamuno, ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra varius quam sit amet vulputate. Quisque mauris augue, molestie tincidunt condimentum vitae.</div>
            <div className="tab-pane" id="d">DDDDDSecondo sed ac orci quis tortor imperdiet venenatis. Duis elementum auctor accumsan. Aliquam in felis sit amet augue.</div>
            <div className="tab-pane" id="e">EEEEEThirdamuno, ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra varius quam sit amet vulputate. Quisque mauris augue, molestie tincidunt condimentum vitae.</div>
            <div className="tab-pane" id="f">FFFFFFThirdamuno, ipsum dolor sit amet, consectetur adipiscing elit. Duis pharetra varius quam sit amet vulputate. Quisque mauris augue, molestie tincidunt condimentum vitae.</div>
          </div>
        </div>
      </div>

    );
  }
}
