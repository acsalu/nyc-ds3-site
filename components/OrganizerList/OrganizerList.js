/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import s from './OrganizerList.css';

class OrganizerList extends React.Component {

  static propTypes = {
    organizers: PropTypes.array.isRequired,
  };

  render() {

    return (
      <ul className={s.organizerList}>
        {this.props.organizers.map((organizer, i) =>
          <li key={i}>
            <a href={organizer.website} target="_blank">
              <div>
                <img src={organizer.profilePic} />
                <p>{organizer.name}</p>
              </div>
            </a>
          </li>
        )}
      </ul>
    )
  }

}

export default OrganizerList;
