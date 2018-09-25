import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'recompose';

import { ProductBar } from 'flight-reactware';

import getItems from '../modules/items';

const Page = ({
  children,
  cluster,
  // comparison,
  graph,
  pageKey,
  title,
  site,
}) => {
  const items = getItems({ site, cluster, graph });
  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <ProductBar
        items={items}
        noaccount
        nosearch
        page={pageKey || title || ''}
        site={process.env.REACT_APP_SITE}
      />
      {children}
    </div>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
  cluster: PropTypes.object,
  // comparison: PropTypes.object,
  graph: PropTypes.object,
  pageKey: PropTypes.string,
  site: PropTypes.object,
  title: PropTypes.string.isRequired,
};

const enhance = compose(
);

export default enhance(Page);
