import { render } from "preact";
import {
  Menu,
  MenuItem,
  Segment
} from "semantic-ui-react";

import "@fontsource-variable/inconsolata";
import "semantic-ui-css/semantic.min.css";
import { DataLoad } from "./components/data-load";
import { DataView } from "./components/data-view";
import { RegexList } from "./components/regex-list";
import { RegexNew } from "./components/regex-new";
import { ModalProvider } from "./context/modal-context";
import { WorkspacesProvider } from "./context/workspaces-context";
import "./index.css";

export function App() {
  return (
    <WorkspacesProvider>
      <ModalProvider>
        <Menu attached="top">
          <MenuItem header>Multi-Regex Vizualizer</MenuItem>
          {/* <Dropdown item={true} text="File">
            <DropdownMenu>
              <DropdownItem text="New" />
              <DropdownItem text="Save As" />
              <DropdownItem text="Delete" />
            </DropdownMenu>
          </Dropdown> */}
        </Menu>
        <Segment attached>
          <div class="data-grid">
            <div className="data-container">
              <Menu attached="top">
                <MenuItem header>Data</MenuItem>
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
          </div>
        </Segment>
        <Menu attached="bottom" borderless={true} stackable={true}>
          <MenuItem>
            A little utility to visualize multiple regex patterns across a given
            text
          </MenuItem>
          <MenuItem position="right">
            <span>Created by</span>
            <a style={{ marginLeft: 3 }} href="https://halfmatthalfcat.com">
              halfmatthalfcat
            </a>
          </MenuItem>
        </Menu>
      </ModalProvider>
    </WorkspacesProvider>
  );
}

render(<App />, document.getElementById("app")!);
