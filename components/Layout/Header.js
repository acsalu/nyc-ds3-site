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
import Navigation from './Navigation';
import MetaTags from 'react-meta-tags'
import Link from '../Link';
import s from './Header.css';

class Header extends React.Component {

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  render() {
    return (
      <header className={`mdl-layout__header ${s.header}`} ref={node => (this.root = node)}>
        <MetaTags>
          <title>NYC Data Science Seminar Series (DS3)</title>
          <meta name="description" content="This seminar series is bringing data science researchers from Columbia University, NYU, Cornell Tech and Microsoft Research together. Our goal is to increase interactions within the broader New York data science community, and to provide a new forum for discussions on data science research." />
          <meta property="og:title" content="MyApp" />
          <meta property="og:image" content="path/to/image.jpg" />
        </MetaTags>
        <div className={`mdl-layout__header-row ${s.row}`}>
          <Link className={`mdl-layout-title ${s.title}`} to="/">
            NYC DS3
          </Link>
          <div className="mdl-layout-spacer"></div>
          <Navigation />
        </div>
      </header>
    );
  }

}

export default Header;
