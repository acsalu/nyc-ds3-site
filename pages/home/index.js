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

import liveEvents from './liveEvents.json';
import events from './events.json';

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
          <div className={s.container}>
            <h1>NYC Data Science Seminar Series (DS3)</h1>
            <p>The DS3 organizing committee comprises <br />
            Leon Bottou (Facebook), Vasant Dhar (NYU), Mor Naaman (Cornell Tech), Duncan Watts (MSR NYC), Chris Wiggins (Columbia University)</p>
          </div>
        </section>

        <section className={s.container}>
          <a name="events">
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

          <a name="sponsors">
            <h4 className={s.sectionTitle}><span className={s.sectionTitleText}>Sponsors</span></h4>
          </a>
          <ul className={s.sponsorList}>
            <li><a href=""><img src="./sponsor-fb-logo.png" alt="Facebook" /></a></li>
            <li><a href=""><img src="./sponsor-msr-logo.jpg" alt="Microsoft Research" /></a></li>
          </ul>
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
    padding: 100,
    backgroundColor: '#5b5f68',
    color: 'white',
    textAlign: 'center'
  }
};

export default HomePage;
