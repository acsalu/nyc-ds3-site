/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import EventList from '../../components/EventList';
import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import s from './styles.css';
import { title, html } from './index.md';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import OrganizerList from '../../components/OrganizerList';

import MSREvents from '../../data/msr-events.json';
import organizers from '../../data/organizing-committee.json';
import axios from 'axios';

const MONTH_ABBREV = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
];

const WEEKDAY_ABBREV = [
  "SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"
];

class HomePage extends React.Component {

  static propTypes = {

  };

  state = {
    upcomingEvents: [],
    pastEvents: MSREvents
  };

  componentDidMount() {
    document.title = title;

    const that = this;

    axios
      .get("https://www.eventbriteapi.com/v3/organizers/8465318311/events/?token=VIRH6LUQJKI37TDV52UR&expand=venue")
      .then(function(result) {
        if (result.status === 200) {
          let ebPastEvents = [];
          let ebUpcomingEvents = [];


          for (let i in result.data.events) {

            const event = result.data.events[i];
            const date = new Date(event.start.utc);
            let hour = date.getHours();
            const minute = date.getMinutes();
            const timeSuffix = (hour < 12 ? "AM" : "PM");
            hour = (hour > 12 ? hour - 12 : hour);

            let eventTitle = event.name.text;

            const eventTitlePrefices = [
              'NYC Data Science Seminar Series -- ',
              'New York Data Science Seminar Series -- ',
              'NYC Data Science Seminar Series: '
            ];

            for (const prefix of eventTitlePrefices) {
              if (eventTitle.startsWith(prefix)) {
                eventTitle = eventTitle.substring(prefix.length);
                break;
              }
            }

            const eventData = {
              "title": eventTitle,
              "link": event.url,
              "location": event.venue.name,
              "year": date.getFullYear(),
              "date": MONTH_ABBREV[date.getMonth()] + " " + date.getDate(),
              "weekday": WEEKDAY_ABBREV[date.getDay()],
              "time": hour + ":" + ("0" + minute).slice(-2) + " " + timeSuffix
            };

            if (event.status === "completed") {
              ebPastEvents.push(eventData);
            } else {
              ebUpcomingEvents.push(eventData);
            }
          }

          that.setState({
            pastEvents: ebPastEvents.concat(that.state.pastEvents),
            upcomingEvents: ebUpcomingEvents
          });
        }
      });
  }

  handleSelect(index, last) {

  }

  render() {
    console.log(this.state);

    Tabs.setUseDefaultStyles(false);

    return (
      <Layout className={s.content}>
        <section style={styles.hero} className={s.hero}>
          <ul className={`${s.sponsorList} ${s.participatings}`}>
            <li><a target="_blank" href="http://www.nyu.edu/"><img src="./imgs/logos/nyu_short_white.png" alt="New York University" /></a></li>
            <li><a target="_blank" href="https://tech.cornell.edu"><img src="./imgs/logos/cornell-tech-logo.png" alt="Microsoft Research" /></a></li>
            <li><a target="_blank" href="http://newsroom.fb.com/company-info/"><img src="./imgs/logos/Facebook-06-2015-White-on-Blue.png" alt="Facebook" /></a></li>
            <br/>
            <li><a target="_blank" href="http://www.columbia.edu/"><img src="./imgs/logos/CU-logo.png" alt="Columbia University" /></a></li>
            <li><a target="_blank" href="http://www.microsoft.com/"><img src="./imgs/logos/Microsoft-logo_rgb_wht.png" alt="Microsoft Research" /></a></li>
          </ul>
          <div className={`${s.container} ${s.heroInnerWrapper}`}>
            <div className={s.acronymWrapper}>
              <div className={s.acronym}>
                NYC<br/>DS3
              </div>
            </div>

            <h1 className={s.siteTitle}>NYC Data Science<br/>Seminar Series</h1>


            <div className={s.sponsors}>
              <div className={s.sponsorsInnerWrapper}>
                <h4><span className={s.sectionTitleText}>Sponsored by</span></h4>
                <ul className={s.sponsorList}>
                  <li><a target="_blank" href="http://newsroom.fb.com/company-info/">Facebook</a></li>
                  <li><a target="_blank" href="http://www.microsoft.com/">Microsoft</a></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={`${s.container} ${s.contentSection}`}>

          <a name="events"></a>
          <div className={s.subsectionBeginning}>
            <h4 className={s.sectionTitle}><span className={s.sectionTitleText}>Events</span></h4>
          </div>

          <Tabs
            onSelect={this.handleSelect}
            selectedIndex={0}
          >
            <TabList className={s.tabList}>
              <Tab className={s.tab}>{"UPCOMING EVENTS (" + this.state.upcomingEvents.length + ")"}</Tab>
              <Tab className={s.tab}>{"PAST EVENTS (" + this.state.pastEvents.length + ")"}</Tab>
            </TabList>

            <TabPanel>
              <EventList
                events={this.state.upcomingEvents}
                noEventText="More events to be scheduled soon — sign up to our mailing list to be notified."
              />
            </TabPanel>
            <TabPanel>
              <EventList
                events={this.state.pastEvents}
                noEventText="Sorry, there were no past events."
              />
            </TabPanel>
          </Tabs>

          <a name="organizing-committee"></a>
          <div className={s.subsectionBeginning}>
            <h4 className={s.sectionTitle}><span className={s.sectionTitleText}>Organizing Committee</span></h4>
          </div>
          <OrganizerList organizers={organizers}/>
        </section>

        <section className={s.footer}>
          <div className={s.container}>
            <div className={s.subscribeMailingList}>
              <p><i className="fa fa-envelope-o"></i>Subscribe to our mailing list</p>
              <div id="mc_embed_signup">
                <form action="//cornell.us3.list-manage.com/subscribe/post?u=9ff7319a6ef1ae54ed30d9609&amp;id=03e76bde6a" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" novalidate>
                  <div id="mc_embed_signup_scroll">
                    <input type="email" name="EMAIL" id="mce-EMAIL" placeholder="email address" required />
                    <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className={s.subscribeButton} />
                  </div>
                </form>
              </div>
            </div>

            <div className={s.photoCredit}>
              Photo by <a href="https://www.flickr.com/photos/despedidairene/7951082654/in/photolist-d7BnRY-EcAw4w-aw6R4P-aw6PcP-9hdoxT-dLz9u6-jc2wNL-fjJ173-jQw1Mn-Byd9kC-eaMk8z-doAsiq-8Tykoh-csLSW1-ehiQm4-s5iLQ5-fnoQiZ-oaRfzh-9tLGz6-ehiJd2-arQ519-arMqEe-arMnZc-arMp9v-arQ5PN-cbWiTh-arMkND-ao462B-EwLuLu-jJTYRT-qXCdSW-bw33eZ-qQTSr4-Nfj5nT-Mzsd4R-Mhyky9-b4576K-MGLto4-cLRAF5-dXS3xT-jJRHWW-xr5W1G-Mhykk3-MyfQUq-MDMqm9-MEvzK5-MHuv1i-MyfQDf-MAVPUZ-cX4AGJ">
                Diego David Garcia
              </a>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

}

const styles = {
  hero: {
    paddingTop: 60,
    paddingBottom: 100,
    backgroundColor: '#5b5f68',
    color: 'white',
    textAlign: 'center',
    background: 'url(\'./imgs/bg.jpg\')',
    backgroundSize: '100% auto',
    backgroundRepeat: 'no-repeat',
  }
};

export default HomePage;
