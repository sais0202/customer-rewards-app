import React from 'react';
import styles from './Composer.module.css';
import axios from 'axios';

import { ProfileCard } from '../ProfileCard/ProfileCard';
import { Label } from '../Label/Label';
import { Profile } from '../Profile/Profile';

export class Composer extends React.Component {
  constructor(props) {
    super(props)
    this.state = { rewardInfo: [], emptyResponse: false };
  }

  componentDidMount() {
    axios.get('http://localhost:8080/unified-interface?scenario=REWARD&id=' + this.props.data[0].id)
      .then(
        (resp) => {
          // console.log(resp.data);
          if (resp.data.rewardResponse) {
            this.setState({ ...this.state, rewardInfo: resp.data.rewardResponse });
          } else {
            this.setState({ ...this.state, emptyResponse: true });
          }
        }
      ).catch( error => {
        console.log('Error' + error)
      })
  }

  render() {
    return (
      <div >
        <hr /> <Label data={{ text: 'Profile' }}> </Label> <hr />
        {this.renderProfileCard()}
        <hr /> <Label data={{ text: 'Rewards' }}> </Label> <hr />
        {this.renderTransaction()}
      </div>
    )
  }
  renderProfileCard() {
    return (
      <div className={styles.flexContainer}>
        <ProfileCard
          data={{ customerInfo: this.props.data[0] }}
          option={{ profile: true }}
        />
      </div>
    );
  }
  renderTransaction() {
    return (
      this.state.rewardInfo.length > 0 &&
      <React.Fragment>
        <Profile
          data={{ reward: this.state.rewardInfo, id: this.props.data[0].id }}
        />
      </React.Fragment>
    );
  }
}
