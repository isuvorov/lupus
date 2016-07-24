const AddText = React.createClass({

  getInitialState() {
    return {showModal: false};
  },
  close() {
    this.setState({showModal: false});
  },
  open() {
    this.setState({showModal: true});
  },

  render() {

    var task = this.props.task;
    var btnClass = task.text
      ? "primary"
      : "default";

      // console.log(this.props.task);

    return (
      <div>

        <Button bsStyle={btnClass} bsSize="large" onClick={this.open}>
          <Icon name="font"/>
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Добавить Текст к вопрсосу:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="form">
              <div className="form-group">
                <label >Добавить текст к вопросу:
                </label>
                <textarea className="form-control" rows="3">
                  {task.text}
                </textarea>
              </div>
            </form>

            <hr/>

            <h4>Настройки wysiwyg</h4>

            <div className="row">
              <div className="col-sm-1">
                <Button bsStyle="primary">
                  <Icon name="bold"/>
                </Button>
              </div>
              <div className="col-sm-1">
                <Button bsStyle="primary">
                  <Icon name="italic"/>
                </Button>
              </div>
              <div className="col-sm-1">
                <Button bsStyle="primary">
                  <Icon name="list"/>
                </Button>
              </div>
              <div className="col-sm-1">
                <Button bsStyle="primary">
                  <Icon name="font"/>
                </Button>
              </div>
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Закрыть</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});
