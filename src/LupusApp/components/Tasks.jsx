import React, { Component } from 'react';
import Table from 'react-bootstrap/lib/Table';
import Button from 'react-bootstrap/lib/Button';

export default class Tasks extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='well'>
        <Table striped bordered condensed hover responsive>
          <thead>
            <tr>
              <th>Task</th>
              <th>Webhook URL</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                syncFs
              </th>
              <td>
                <pre>{this.props.getWebhook(`syncFs`)}</pre>
              </td>
              <td>
                <Button bsStyle='primary' href={this.props.getWebhook(`syncFs`)} target='_blank'>
                  Выполнить
                </Button>
              </td>
            </tr>
            <For each='item' index='i' of={this.props.tasks}>
              <tr key={i}>
                <th>
                  {item.name}
                </th>
                <td>
                  <pre>{this.props.getWebhook(`runTask/${item.name}`)}</pre>
                </td>
                <td>
                  <Button
                    bsStyle='primary'
                    href={this.props.getWebhook(`runTask/${item.name}`)}
                    target='_blank'
                  >
                    Выполнить
                  </Button>
                </td>
              </tr>
            </For>
          </tbody>
        </Table>
      </div>
    );
  }
}
