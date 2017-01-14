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
import Button from '../../components/Button';
import OrganizerList from '../../components/OrganizerList';

import liveEvents from './live-events.json';
import events from './past-events.json';
import organizers from '../../data/organizing-committee.json';

class HomePage extends React.Component {

  static propTypes = {

  };

  componentDidMount() {
    document.title = title;
  }

  handleSelect(index, last) {
    console.log('Selected tab: ' + index + ', Last tab: ' + last);
  }

  render() {
    const pastEvents = events;

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
              <Tab className={s.tab}>{"LIVE EVENTS (" + liveEvents.length + ")"}</Tab>
              <Tab className={s.tab}>{"PAST EVENTS (" + pastEvents.length + ")"}</Tab>
            </TabList>

            <TabPanel>
              <EventList
                events={liveEvents}
                noEventText="More events to be scheduled soon — sign up to our mailing list to be notified."
              />
            </TabPanel>
            <TabPanel>
              <EventList
                events={pastEvents}
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
