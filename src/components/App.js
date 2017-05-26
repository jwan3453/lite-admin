import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Breadcrumb, Icon, Menu, Modal, Tooltip } from 'antd';
import trimStart from 'lodash/trimStart';

import auth from '../common/auth';
import appRoutes from '../app/routes';
import './App.less';

class App extends React.PureComponent {
  static menuItems = null;
  static buildMenuTree(routes, basePath = []) {
    return routes.map((route) => {
      const routePath = trimStart(route.path, '/');
      const newBasePath = basePath.concat([routePath]);
      const finalPath = newBasePath.join('/');

      const menuItem = {
        name: route.navigatorName,
        icon: route.navigatorIcon,
        path: finalPath,
        children: [],
      };

      if (route.childRoutes && route.childRoutes.length > 0) {
        menuItem.children = App.buildMenuTree(route.childRoutes, newBasePath);
      }

      return menuItem;
    });
  }

  constructor(...args) {
    super(...args);
    this.handleOpenChange = this.handleOpenChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  state = {
    menuSmall: true,
    openKeys: [],
    selectedKeys: [],
  };
  componentWillMount() {
    if (App.menuItems === null) {
      App.menuItems = App.buildMenuTree(appRoutes[0].childRoutes);
    }
  }

  handleLogout = () => {
    Modal.confirm({
      title: 'Are you sure to logout?',
      iconType: 'logout',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => {
        auth.logout();
        this.props.router.replace('/login');
      },
    });
  }

  handleOpenChange(openKeys) {
    this.setState({
      openKeys: openKeys.filter(key => this.state.openKeys.indexOf(key) === -1),
    });
  }

  renderTopMenuItem(item) {
    return (
      <Menu.Item key={item.path}>
        <Tooltip
          overlay={item.name}
          overlayClassName="nav-menu-tooltip"
          placement="right"
        >
          <Link to={item.path}>
            <Icon type={item.icon} />
          </Link>
        </Tooltip>
      </Menu.Item>
    );
  }

  renderMenuItem(item) {
    return (
      <Menu.Item key={item.path}>
        <Link to={item.path}>
          <Icon type={item.icon} />
          <span>{item.name}</span>
        </Link>
      </Menu.Item>
    );
  }

  renderMenu(items, isTop = true) {
    return (
      <Menu
        theme="dark"
        // openKeys={this.state.openKeys}
        // selectedKeys={this.state.selectedKeys}
        // onOpenChange={this.handleOpenChange}
        mode="vertical"
      >
        {items.map((item) => {
          if (item.children.length) {
            return (
              <Menu.SubMenu
                title={
                  <span>
                    <Icon type={item.icon} />
                    {(!this.state.menuSmall || !isTop) &&
                      <span>{item.name}</span>}
                  </span>
                }
                key={item.path}
              >
                {this.renderMenu(item.children, false)}
              </Menu.SubMenu>
            );
          }

          return isTop
            ? this.renderTopMenuItem(item)
            : this.renderMenuItem(item);
        })}
      </Menu>
    );
  }

  render() {
    return (
      <div>
        <div className="sidebar">
          <div id="nav-menu">
            {App.menuItems && this.renderMenu(App.menuItems)}
          </div>
          <Tooltip overlay="退出登录" placement="right">
            <a role="button" tabIndex="0" className="logout" onClick={this.handleLogout}>
              <Icon type="poweroff" />
            </a>
          </Tooltip>
        </div>
        <div className="content-wrapper">
          <Breadcrumb routes={this.props.routes} params={this.props.params} />
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element.isRequired,
  router: React.PropTypes.object.isRequired,
  routes: React.PropTypes.array.isRequired,
  params: React.PropTypes.object.isRequired,
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(App);
