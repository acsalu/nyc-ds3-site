/**
 * Created by acsalu on 12/4/16.
 */

import React, { PropTypes } from 'react';
import Button from '../Button';
import s from './PrevEventList.css';

class PrevEventList extends React.Component {

  static propTypes = {
    events: PropTypes.array.isRequired,
    noEventText: PropTypes.string.isRequired,
    chronological: PropTypes.bool.isRequired
  };

  constructor() {
    super();
    this.state = {
      value: 1,
      text: 'Show more historical events',
      button: './button.svg',
    };
  }

  render() {
    if (this.props.events.length === 0) {
      return (
        <div className={s.noEventConatiner}>
          <div className={s.noEventText}>{this.props.noEventText}</div>
          <div className={s.subscribeMailingList}>

            <div id="mc_embed_signup">
              <form action="//cornell.us3.list-manage.com/subscribe/post?u=9ff7319a6ef1ae54ed30d9609&amp;id=03e76bde6a" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className={s.form} target="_blank" novalidate>
                <div id="mc_embed_signup_scroll" className={s.signUp}>
                <input className={s.form} type="email" name="EMAIL" id="mce-EMAIL" placeholder="Email Address" required />
                <input type="submit" value="SIGN UP" name="subscribe" id="mc-embedded-subscribe" className={s.subscribeButton} />
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

    for (const year in eventsByYear) {
      if (year >= '2016') {
        eventsByYear[year] = eventsByYear[year].sort((e1, e2) => {
          const token1 = e1.month * 31 + e1.day;
          const token2 = e2.month * 31 + e2.day;
          if (token1 === token2) { return 0; }
          return token1 > token2 ? -1 : 1;
        });
      }
    }

    const yearsSortedDescending = Object.keys(eventsByYear).sort().reverse();
    let eventSubLists = [];
    for (let i = 0; i < this.state.value; ++i) {
      const year = yearsSortedDescending[i];
      eventSubLists.push(<EventSubList key={year} events={eventsByYear[year]} subListTitle={String(year)} />);
    }

    return (
      <ul className={s.eventList}>
        {eventSubLists}
        <div className={s.expandText} onClick={() => this.setState({value: yearsSortedDescending.length, text: 'All events shown'})}>
          {this.state.text}
        </div>
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
                      <div className={s.eventInfo}>
                        <span className={s.eventTime}><i className='fa fa-clock-o'></i>{event.time}</span>
                        <span className={s.eventLocation}><i className='fa fa-map-marker'></i>{event.location}</span>
                      </div>
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

export default PrevEventList;
