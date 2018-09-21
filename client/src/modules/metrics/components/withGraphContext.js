import { compose, lifecycle, withProps } from 'recompose';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';

import * as actions from '../actions';

const GraphContext = ({ route }) => {
  return renderRoutes(route.routes);
};

export default function withGraphContext() {
  const enhance = compose(
    withProps(props => ({
      graphId: props.match.params.graph,
    })),

    connect(),

    lifecycle({
      componentWillMount: function componentDidMount() {
        const { dispatch, graphId } = this.props;
        dispatch(actions.graphSelected(graphId));
      },

      componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        const { thisGraphId  } = this.props;
        const { nextGraphId } = nextProps;
        if (thisGraphId === nextGraphId) {
          // Nothing relevant has changed; nothing to do.
          return;
        }
        this.props.dispatch(actions.graphSelected(nextGraphId));
      },

      componentWillUnmount: function componentWillUnmount() {
        const { dispatch, graphId } = this.props;
        dispatch(actions.graphDeselected(graphId));
      },
    }),
  );

  return enhance(GraphContext);
}
