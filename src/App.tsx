import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { RouteComponentProps } from "react-router-dom";
import * as QueryString from "query-string";

import { setParams } from "./store";
import { Menu, BookList } from "./features";
import { validateUrlParams, Params } from "./utils";

const mapDispatch = {
  setParamsAction: (params: Params) => setParams(params),
};

const connector = connect(null, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

type AppProps = RouteComponentProps & PropsFromRedux;

class App extends Component<AppProps> {
  componentDidMount() {
    const params = QueryString.parse(this.props.location.search);
    const validParams = validateUrlParams(params);
    this.props.setParamsAction(validParams);
  }

  render() {
    return (
      <>
        <CssBaseline />
        <Container maxWidth="md" disableGutters>
          <Menu></Menu>
          <BookList />
        </Container>
      </>
    );
  }
}

export default connector(App);
