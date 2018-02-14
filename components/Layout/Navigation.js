/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Link from '../Link';
import s from './Navigation.css';

class Navigation extends React.Component {

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  render() {
    return (
      <nav className="mdl-navigation" ref={node => (this.root = node)}>
        <a className={`mdl-navigation__link ${s.link}`} href="/">Home</a>
        <a className={`mdl-navigation__link ${s.link}`} href="#events">Events</a>
        <a className={`mdl-navigation__link ${s.link}`} href="#organizing-committee">Organizing Committee</a>
      </nav>
    );
  }

}

export default Navigation;
