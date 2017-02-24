import React from 'react';
import {Router, Route, IndexRoute} from 'dva/router';
import ESHome from './components/ESHome';
import AppsMgt from './components/App/AppsMgt';
import UsersMgt from './components/User/UsersMgt';
import RolesMgt from './components/Role/RolesMgt';
import FunctionsMgt from './components/Function/FunctionsMgt';
import MenusMgt from './components/Menu/MenusMgt';
import OrgsMgt from './components/Org/OrgsMgt';
import UserGroupsMgt from './components/UserGroup/UserGroupsMgt';
import Settings from './components/Setting/Settings';
import App from "./routes/App.js";

function RouterConfig({history}) {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={ESHome}/>
        <Route path="apps" component={AppsMgt}/>
        <Route path="users" component={UsersMgt}/>
        <Route path="roles" component={RolesMgt}/>
        <Route path="funcs" component={FunctionsMgt}/>
        <Route path="menus" component={MenusMgt}/>
        <Route path="orgs" component={OrgsMgt}/>
        <Route path="userGroups" component={UserGroupsMgt}/>
        <Route path="settings" component={Settings}/>
      </Route>
    </Router>
  );
}

export default RouterConfig;
