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

import liveEvents from './liveEvents.json';
import events from './events.json';
import organizers from '../../data/organizing-committee.json';

class HomePage extends React.Component {

  static propTypes = {
    articles: PropTypes.array.isRequired,
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
        <section style={styles.hero}>
          <div className={`${s.container} ${s.heroInnerWrapper}`}>
            <div className={s.acronymWrapper}>
              <div className={s.acronym}>
                NYC<br/>DS3
              </div>
            </div>
            <h1 className={s.siteTitle}>NYC Data Science<br/>Seminar Series</h1>
          </div>
        </section>

        <section className={s.container}>

          <a name="sponsors" className={s.subsectionBeginning}>
            <h4 className={s.sectionTitle}><span className={s.sectionTitleText}>Sponsors</span></h4>
          </a>
          <ul className={s.sponsorList}>
            <li><a href=""><img src="./sponsor-fb-logo.png" alt="Facebook" /></a></li>
            <li><a href=""><img src="./sponsor-msr-logo.jpg" alt="Microsoft Research" /></a></li>
          </ul>

          <a name="events" className={s.subsectionBeginning}>
            <h4 className={s.sectionTitle}><span className={s.sectionTitleText}>Events</span></h4>
          </a>

          <Tabs
            onSelect={this.handleSelect}
            selectedIndex={0}
          >
            <TabList className={s.tabList}>
              <Tab className={s.tab}>{"LIVE EVENTS " + liveEvents.length}</Tab>
              <Tab className={s.tab}>{"PAST EVENTS " + pastEvents.length}</Tab>
            </TabList>

            <TabPanel>
              <EventList
                events={liveEvents}
                noEventText="Sorry, there are no upcoming events."
              />
            </TabPanel>
            <TabPanel>
              <EventList
                events={pastEvents}
                noEventText="Sorry, there were no past events."
              />
            </TabPanel>
          </Tabs>

          <a name="organizers" className={s.subsectionBeginning}>
            <h4 className={s.sectionTitle}><span className={s.sectionTitleText}>Organizing Committee</span></h4>
          </a>
          <OrganizerList organizers={organizers}/>
        </section>

        <section className={s.footer}>
          <div className={s.container}>
            <p>Join our mailing list</p>
            <input type="text" placeholder="email address"/> <br/>
            <Button className={s.footerButton}>Subscribe</Button>
          </div>
        </section>
      </Layout>
    );
  }

}

const styles = {
  hero: {
    padding: 350,
    backgroundColor: '#5b5f68',
    color: 'white',
    textAlign: 'center',
    background: 'url(\'./imgs/bg.jpg\')',
    backgroundSize: '100% auto',
    backgroundRepeat: 'no-repeat',
  }
};

export default HomePage;
