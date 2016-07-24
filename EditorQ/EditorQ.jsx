import {zipObject} from 'lodash'
import React from 'react'
import EditorTask from './EditorTask.jsx'
import EditorTemplates from './EditorTemplates.jsx'
import EditorDecision from './EditorDecision.jsx'
import EditorNav from './EditorNav.jsx'
//
// EditorTask.propTypes = {
//   type: React.PropTypes.string,
//   view: React.PropTypes.string,
//   // question: {
//   title: React.PropTypes.string,
//   image: React.PropTypes.string,
//   text: React.PropTypes.string,
//   audio: React.PropTypes.string,
//   video: React.PropTypes.string,
//   // }
// }
//
// EditorTask.defaultProps = {
//   type: "default",
//   view: "default",
//   // question: {
//   title: "uestion title",
//   image: "a picture",
//   text: "question text",
//   audio: "soundcloud link",
//   video: "youtube link",
//   // }
// }

export default class EditorQ extends React.Component {
  render() {
    return (
      <div>

        <EditorNav/>
        <div className="container">

          <hr/>

            <EditorTask task={this.props.task}/>
          <hr/>

          <EditorDecision task={this.props.task}/>

        </div>
      </div>
    )
  }
}
