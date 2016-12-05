/**
 * Created by acsalu on 12/4/16.
 */

import React, { PropTypes } from 'react';
import s from './EventList.css';

class EventList extends React.Component {

  static propTypes = {
    events: PropTypes.array.isRequired,
    noEventText: PropTypes.string.isRequired
  };

  render() {
    if (this.props.events.length === 0) {
      return (
        <div style={styles.noEvent}>{this.props.noEventText}</div>
      );
    }

    return (
      <ul style={styles.eventList}>
        {this.props.events.map((event, i) =>
          <li key={i} className={s.eventItem}>
            <a href={event.link} style={styles.eventItemAnchor}  target='_blank'>
              <p>{event.time}</p>
              <h5>{event.title}</h5>
              <p>{event.location}</p>
            </a>
          </li>
        )}
      </ul>
    );
  }

}


const styles = {
  noEvent: {
    minHeight: 400
  },
  eventList: {
    listStyle: 'none',
    paddingLeft: 0
  },
  eventItemAnchor: {
    textDecoration: 'none'
  }
};

export default EventList;
