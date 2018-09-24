import { compose, lifecycle, withProps } from 'recompose';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';

import * as actions from '../actions';

const ClusterContext = ({ route }) => {
  return renderRoutes(route.routes);
};

export default function withClusterContext() {
  const enhance = compose(
    withProps(props => ({
      clusterId: props.match.params.clusterId,
    })),

    connect(),

    lifecycle({
      componentWillMount: function componentDidMount() {
        const { dispatch, clusterId } = this.props;
        dispatch(actions.clusterSelected(clusterId));
      },

      componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        const { thisClusterId  } = this.props;
        const { nextClusterId } = nextProps;
        if (thisClusterId === nextClusterId) {
          // Nothing relevant has changed; nothing to do.
          return;
        }
        this.props.dispatch(actions.clusterSelected(nextClusterId));
      },

      componentWillUnmount: function componentWillUnmount() {
        this.props.dispatch(actions.clusterDeselected());
      },
    }),
  );

  return enhance(ClusterContext);
}
