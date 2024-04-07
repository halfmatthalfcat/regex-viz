import { render } from "preact";
import { Menu, MenuItem, MenuMenu, Segment } from "semantic-ui-react";

import "@fontsource-variable/inconsolata";
import "semantic-ui-css/semantic.min.css";
import { DataLoad } from "./components/data-load";
import { DataView } from "./components/data-view";
import { RegexList } from "./components/regex-list";
import { RegexNew } from "./components/regex-new";
import { DataContextProvider } from "./context/data-context";
import "./index.css";

export function App() {
  return (
    <DataContextProvider>
      <Menu attached="top" borderless>
        <MenuItem header>Multi-Regex Vizualizer</MenuItem>
      </Menu>
      <Segment attached className="content">
        <div className="data-container">
          <Menu attached="top">
            <MenuItem header>Data</MenuItem>
            <MenuMenu position="right">
              <div className="ui right aligned category search item">
                <div className="ui transparent icon input">
                  <input
                    className="prompt"
                    type="text"
                    placeholder="Search data"
                  />
                  <i className="search link icon" />
                </div>
              </div>
            </MenuMenu>
          </Menu>
          <Segment attached className="data-view-container">
            <DataView />
          </Segment>
          <Menu attached="bottom">
            <DataLoad />
          </Menu>
        </div>
        <div className="data-container">
          <Menu attached="top">
            <MenuItem header>Regexes</MenuItem>
          </Menu>
          <Segment attached className="no-padding data-view-container">
            <RegexList />
          </Segment>
          <Menu attached="bottom">
            <RegexNew />
          </Menu>
        </div>
      </Segment>
      <Menu attached="bottom" borderless>
        <MenuItem>
          A little utility to visualize multiple regex patterns across a given
          text
        </MenuItem>
        <MenuItem position="right">Created by halfmatthalfcat</MenuItem>
      </Menu>
    </DataContextProvider>
  );
}

render(<App />, document.getElementById("app"));
