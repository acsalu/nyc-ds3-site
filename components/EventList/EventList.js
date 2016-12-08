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
      <ul className={s.eventList}>
        {this.props.events.map((event, i) => {
          const eventMonth = event.date.substring(0, 3);
          const eventDay = event.date.substring(4, 5);
          return (
            <li key={i} className={s.eventItem}>
              <a href={event.link} style={styles.eventItemAnchor} target='_blank'>
                <div className={s.eventInnerWraper}>
                  <div className={s.eventDate}>
                    <div className={s.eventMonth}>{eventMonth}</div>
                    <div className={s.eventDay}>{eventDay}</div>
                    <div className={s.eventWeekday}>{event.weekday}</div>
                  </div>
                  <div className={s.eventDetails}>
                    <div className={s.eventTitle}>
                      <div>{event.title}</div>
                      <i className='fa fa-external-link'></i>
                    </div>
                    <div className={s.eventTime}><i className='fa fa-clock-o'></i>{event.time}</div>
                    <div className={s.eventLocation}><i className='fa fa-map-marker'></i>{event.location}</div>
                  </div>
                </div>
              </a>
            </li>
          )}
        )}
      </ul>
    );
  }

}


const styles = {
  noEvent: {
    minHeight: 400
  },
  eventItemAnchor: {
    textDecoration: 'none'
  }
};

export default EventList;
