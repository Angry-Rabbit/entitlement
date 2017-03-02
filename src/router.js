import React from 'react'
import {Router} from 'dva/router'
import App from './routes/App'

export default function ({history, app}) {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute (nextState, cb) {
        require.ensure([], require => {
          cb(null, {component: require('./components/ESHome')})
        })
      },
      childRoutes: [
        {
          path: 'eshome',
          name: 'eshome',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./components/ESHome'))
            })
          }
        }, {
          path: 'apps',
          name: 'apps',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./components/App/AppsMgt'))
            })
          }
        }, {
          path: 'users',
          name: 'users',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./components/User/UsersMgt'))
            })
          }
        }, {
          path: 'roles',
          name: 'roles',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./components/Role/RolesMgt'))
            })
          }
        }, {
          path: 'funcs',
          name: 'funcs',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./components/Function/FunctionsMgt'))
            })
          }
        }, {
          path: 'menus',
          name: 'menus',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./components/Menu/MenusMgt'))
            })
          }
        }, {
          path: 'orgs',
          name: 'orgs',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./components/Org/OrgsMgt'))
            })
          }
        }, {
          path: 'userGroups',
          name: 'userGroups',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./components/UserGroup/UserGroupsMgt'))
            })
          }
        }, {
          path: 'settings',
          name: 'settings',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./components/Setting/Settings'))
            })
          }
        }, {
          path: '*',
          name: 'error',
          getComponent (nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/Error'))
            })
          }
        }
      ]
    }
  ]

  return <Router history={history} routes={routes}/>
}
