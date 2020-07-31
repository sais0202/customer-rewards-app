import React from 'react';
import axios from 'axios';

import styles from './Form.module.css';
import { Composer } from '../Composer/Composer';
import { RenderErrorResponse } from './Form.fc';

export class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { customerInfo: [], id: '', displayPage: false };

    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  changeHandler(event) {
    this.setState({ id: event.target.value });
  }

  submitHandler(event) {
    this.setState({ customerInfo: [], emptyResponse: false })
    axios.get('http://localhost:8080/unified-interface?scenario=PROFILE&id=' + this.state.id)
      .then(
        (resp) => {
          // console.log(resp.data);
          if (resp.data.profileResponse) {
            const postsArray = [];
            postsArray.push(resp.data.profileResponse)
            this.setState({ ...this.state, customerInfo: postsArray });
          } else {
            this.setState({ ...this.state, emptyResponse: true });
          }
        },
        (error) => {
          console.log('Error' + error)
        }
      )
    event.preventDefault();
  }

  render() {
    return (
      !this.state.emptyResponse ? this.renderProperResponse() : this.renderErrorResponse()
    )
  }
  renderProperResponse() {
    return (
      <div>
        {this.renderFormData()}
        {this.state.customerInfo.length > 0 && <Composer data={this.state.customerInfo} />
        }
      </div>
    )
  }
  renderErrorResponse() {
    return (
      <div>
        {this.renderFormData()}
        <RenderErrorResponse />
      </div>
    )
  }
  renderFormData() {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <div className={styles.flexContainer} >
            <label> Customer ID: </label>
            <input type="text" value={this.state.value} onChange={this.changeHandler} />
            <input type="submit" value="Submit" />
          </div>
        </form>
        <div> SAMPLE CUSOTMER IDs 1,2,3,4,5</div>
      </div>
    )
  }
}
