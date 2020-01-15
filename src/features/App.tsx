import React from "react";
import { Route, Switch } from "react-router-dom";
import PageNotFound from "./shared/components/404";
import TownPage from "./role-play/components/town-page";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import Header from "./shared/components/header";

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

function App() {
  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Switch>
          <Route exact path="/" component={TownPage} />
          <Route exact path="/town" component={TownPage} />
          <Route component={PageNotFound} />
        </Switch>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
