/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectRepos, makeSelectLoading, makeSelectError } from 'containers/App/selectors';

import * as FlexmonsterReact from './flexmonster.react';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {

  }

  render() {

    return (

    <div>
      <FlexmonsterReact.Pivot toolbar={true} componentFolder="https://cdn.flexmonster.com/" width="800px" report="https://cdn.flexmonster.com/reports/report.json"/>
    </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const mapStateToProps = createStructuredSelector({
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
