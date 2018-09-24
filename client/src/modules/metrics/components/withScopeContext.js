import { compose, lifecycle, withProps } from 'recompose';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';

import * as actions from '../actions';

const Context = ({ route }) => {
  return renderRoutes(route.routes);
};

function withContext({
  mountAction,
  paramName,
  unmountAction,
}) {
  const enhance = compose(
    withProps(props => ({
      [paramName]: props.match.params[paramName],
    })),

    connect(),

    lifecycle({
      componentWillMount: function componentDidMount() {
        const param = this.props[paramName];
        this.props.dispatch(mountAction(param));
      },

      componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        const thisParam = this.props[paramName];
        const nextParam = nextProps[paramName];
        if (thisParam === nextParam) {
          // Nothing relevant has changed; nothing to do.
          return;
        }
        this.props.dispatch(mountAction(nextParam));
      },

      componentWillUnmount: function componentWillUnmount() {
        this.props.dispatch(unmountAction());
      },
    }),
  );

  return enhance(Context);
}

export const withClusterContext = withContext({
  mountAction: actions.clusterSelected,
  paramName: 'clusterId',
  unmountAction: actions.clusterDeselected,
});

export const withGraphContext = withContext({
  mountAction: actions.graphSelected,
  paramName: 'graphId',
  unmountAction: actions.graphDeselected,
});
