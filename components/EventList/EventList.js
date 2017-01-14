/**
 * Created by acsalu on 12/4/16.
 */

import React, { PropTypes } from 'react';
import Button from '../Button';
import s from './EventList.css';

class EventList extends React.Component {

  static propTypes = {
    events: PropTypes.array.isRequired,
    noEventText: PropTypes.string.isRequired
  };

  render() {
    if (this.props.events.length === 0) {
      return (
        <div className={s.noEventConatiner}>
          <div className={s.noEventText}>{this.props.noEventText}</div>
          <div className={s.subscribeMailingList}>

            <div id="mc_embed_signup">
              <form action="//cornell.us3.list-manage.com/subscribe/post?u=9ff7319a6ef1ae54ed30d9609&amp;id=03e76bde6a" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" novalidate>
                <div id="mc_embed_signup_scroll">
                <input type="email" name="EMAIL" id="mce-EMAIL" placeholder="email address" required />
                <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className={s.subscribeButton} />
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }

    const eventsByYear = {};
    for (let i = 0; i < this.props.events.length; ++i) {
      const event = this.props.events[i];
      const year = event.year;
      if (eventsByYear[year] === undefined) {
        eventsByYear[year] = [];
      }
      eventsByYear[year].push(event);
    }

    const yearsSortedDescending = Object.keys(eventsByYear).sort().reverse();
    let eventSubLists = [];
    for (let i = 0; i < yearsSortedDescending.length; ++i) {
      const year = yearsSortedDescending[i];
      eventSubLists.push(<EventSubList key={year} events={eventsByYear[year]} subListTitle={String(year)} />);
    }

    return (
      <ul className={s.eventList}>
        {eventSubLists}
      </ul>
    );
  }

}

class EventSubList extends React.Component {

  static propTypes = {
    events: PropTypes.array.isRequired,
    subListTitle: PropTypes.string.isRequired
  };

  render() {

    return (
      <div className={s.eventSubListContainer}>
        <div className={s.eventSubListTitle}>{this.props.subListTitle}</div>
        <ul className={s.eventSubList}>
          {this.props.events.map((event, i) => {
            const eventMonth = event.date.substring(0, 3);
            const eventDay = event.date.substring(4, event.date.length);
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
      </div>
    );
  }
}


const styles = {
  eventItemAnchor: {
    textDecoration: 'none'
  }
};

export default EventList;
