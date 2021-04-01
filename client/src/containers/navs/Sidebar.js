import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Nav, NavItem, Collapse } from 'reactstrap';
import { NavLink, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Language from '../../components/custom/language';

import {
  setContainerClassnames,
  addContainerClassname,
  changeDefaultClassnames,
  changeSelectedMenuHasSubItems,
  clickOnMobileMenu,
} from '../../redux/actions';

import menuItems from '../../constants/menu';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedParentMenu: '',
      viewingParentMenu: '',
      collapsedMenus: [],
      selectedSubMenu: '',
      selectedMenu: 'started_0'
    };
  }

  handleWindowResize = (event) => {
    if (event && !event.isTrusted) {
      return;
    }
    const { containerClassnames } = this.props;
    const nextClasses = this.getMenuClassesForResize(containerClassnames);
    this.props.setContainerClassnames(
      0,
      nextClasses.join(' '),
      this.props.selectedMenuHasSubItems
    );
  };

  handleDocumentClick = (e) => {
    const container = this.getContainer();
    let isMenuClick = false;
    if (
      e.target &&
      e.target.classList &&
      (e.target.classList.contains('menu-button') ||
        e.target.classList.contains('menu-button-mobile'))
    ) {
      isMenuClick = true;
    } else if (
      e.target.parentElement &&
      e.target.parentElement.classList &&
      (e.target.parentElement.classList.contains('menu-button') ||
        e.target.parentElement.classList.contains('menu-button-mobile'))
    ) {
      isMenuClick = true;
    } else if (
      e.target.parentElement &&
      e.target.parentElement.parentElement &&
      e.target.parentElement.parentElement.classList &&
      (e.target.parentElement.parentElement.classList.contains('menu-button') ||
        e.target.parentElement.parentElement.classList.contains(
          'menu-button-mobile'
        ))
    ) {
      isMenuClick = true;
    }
    if (container.contains(e.target) || container === e.target || isMenuClick) {
      return;
    }
    this.setState({
      viewingParentMenu: '',
    });
    this.toggle();
  };

  getMenuClassesForResize = (classes) => {
    const { menuHiddenBreakpoint, subHiddenBreakpoint } = this.props;
    let nextClasses = classes.split(' ').filter((x) => x !== '');
    const windowWidth = window.innerWidth;
    if (windowWidth < menuHiddenBreakpoint) {
      nextClasses.push('menu-mobile');
    } else if (windowWidth < subHiddenBreakpoint) {
      nextClasses = nextClasses.filter((x) => x !== 'menu-mobile');
      if (
        nextClasses.includes('menu-default') &&
        !nextClasses.includes('menu-sub-hidden')
      ) {
        nextClasses.push('menu-sub-hidden');
      }
    } else {
      nextClasses = nextClasses.filter((x) => x !== 'menu-mobile');
      if (
        nextClasses.includes('menu-default') &&
        nextClasses.includes('menu-sub-hidden')
      ) {
        nextClasses = nextClasses.filter((x) => x !== 'menu-sub-hidden');
      }
    }
    return nextClasses;
  };

  getContainer = () => {
    return ReactDOM.findDOMNode(this);
  };

  toggle = () => {
    const hasSubItems = this.getIsHasSubItem();
    this.props.changeSelectedMenuHasSubItems(hasSubItems);
    const { containerClassnames, menuClickCount } = this.props;
    const currentClasses = containerClassnames
      ? containerClassnames.split(' ').filter((x) => x !== '')
      : '';
    let clickIndex = -1;

    if (!hasSubItems) {
      if (
        currentClasses.includes('menu-default') &&
        (menuClickCount % 4 === 0 || menuClickCount % 4 === 3)
      ) {
        clickIndex = 1;
      } else if (
        currentClasses.includes('menu-sub-hidden') &&
        (menuClickCount === 2 || menuClickCount === 3)
      ) {
        clickIndex = 0;
      } else if (
        currentClasses.includes('menu-hidden') ||
        currentClasses.includes('menu-mobile')
      ) {
        clickIndex = 0;
      }
    } else if (
      currentClasses.includes('menu-sub-hidden') &&
      menuClickCount === 3
    ) {
      clickIndex = 2;
    } else if (
      currentClasses.includes('menu-hidden') ||
      currentClasses.includes('menu-mobile')
    ) {
      clickIndex = 0;
    }
    if (clickIndex >= 0) {
      this.props.setContainerClassnames(
        clickIndex,
        containerClassnames,
        hasSubItems
      );
    }
  };

  handleProps = () => {
    this.addEvents();
  };

  addEvents = () => {
    ['click', 'touchstart', 'touchend'].forEach((event) =>
      document.addEventListener(event, this.handleDocumentClick, true)
    );
  };

  removeEvents = () => {
    ['click', 'touchstart', 'touchend'].forEach((event) =>
      document.removeEventListener(event, this.handleDocumentClick, true)
    );
  };

  setSelectedLiActive = (callback) => {
    // const oldli = document.querySelector('.main-menu li.active');
    // if (oldli != null) {
    //   oldli.classList.remove('active');
    //   const oldliSubLink = oldli.querySelector('a.active');
    //   if (oldliSubLink != null) {
    //     oldliSubLink.classList.remove('active');
    //   }
    // }

    // const oldliSub = document.querySelector('.third-level-menu li.active');
    // if (oldliSub != null) {
    //   oldliSub.classList.remove('active');
    //   const oldliThirdSubLink = oldliSub.querySelector('a.active');
    //   if (oldliThirdSubLink != null) {
    //     oldliThirdSubLink.classList.remove('active');
    //   }
    //   if (this.state.selectedSubMenu !== '') {
    //     const selectedSubMenu = document.querySelector(`#${this.state.selectedSubMenu}`);
    //     selectedSubMenu.classList.add('active');
    //     this.setState({ selectedSubMenu: '' });
    //     this.setState({
    //       collapsedMenus: [selectedSubMenu.parentElement.parentElement.parentElement.parentElement.querySelector('.rotate-arrow-icon').getAttribute('id')]
    //     });
    //   } else {
    //     this.setState({
    //       collapsedMenus: []
    //     });
    //   }
    // } else {
    //   if (this.state.selectedSubMenu === '' && document.querySelector('.third-level-menu a.active')) {
    //     let tempSubElement = document.querySelector('.third-level-menu a.active');
    //     tempSubElement.classList.remove('active');
    //     tempSubElement.parentElement.parentElement.parentElement.parentElement.classList.remove('active');
    //   }
    // }

    // /* set selected parent menu */
    // const selectedSublink = document.querySelector(
    //   '.third-level-menu a.active'
    // );
    // if (selectedSublink != null) {
    //   selectedSublink.parentElement.classList.add('active');
    //   selectedSublink.parentElement.parentElement.parentElement.parentElement.classList.add('active');
    // }

    // const tempSelectedlink = document.querySelector('.main-menu a.active');
    // if (tempSelectedlink) {
    //   tempSelectedlink.classList.remove('active');
    //   tempSelectedlink.parentElement.classList.remove('active');
    // }
    // const selectedlink = this.state.selectedMenu ? document.querySelector(`#${this.state.selectedMenu}`) : null;
    // if (selectedlink != null) {
    //   selectedlink.classList.add('active');
    //   selectedlink.parentElement.classList.add('active');
    //   this.setState(
    //     {
    //       selectedParentMenu: selectedlink.parentElement.parentElement.getAttribute(
    //         'data-parent'
    //       ),
    //     },
    //     callback
    //   );
    // }
    // //  else {
    // //   const selectedParentNoSubItem = document.querySelector(
    // //     '.main-menu li a.active'
    // //   );
    // //   if (selectedParentNoSubItem != null) {
    // //     this.setState(
    // //       {
    // //         selectedParentMenu: selectedParentNoSubItem.getAttribute(
    // //           'data-flag'
    // //         ),
    // //       },
    // //       callback
    // //     );
    // //   } else if (this.state.selectedParentMenu === '') {
    // //     this.setState(
    // //       {
    // //         selectedParentMenu: menuItems[0].id,
    // //       },
    // //       callback
    // //     );
    // //   }
    // // }
    // if (this.state.selectedMenu === '' && this.state.selectedSubMenu === '') {
    //   document.querySelector('#started_0').classList.add('active');
    //   document.querySelector('#started_0').parentElement.classList.add('active');
    //   // document.querySelector('.main-menu .scrollbar-container > ul >:first-child > a').classList.add('active');
    // }
  };

  setHasSubItemStatus = () => {
    const hasSubmenu = this.getIsHasSubItem();
    this.props.changeSelectedMenuHasSubItems(hasSubmenu);
    this.toggle();
  };

  getIsHasSubItem = () => {
    const { selectedParentMenu } = this.state;
    const menuItem = menuItems.find((x) => x.id === selectedParentMenu);
    if (menuItem)
      return !!(menuItem && menuItem.subs && menuItem.subs.length > 0);
    return false;
  };

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setSelectedLiActive(this.setHasSubItemStatus);

      window.scrollTo(0, 0);
    }
    this.handleProps();
  }

  mobileMenuButtonClick(e, _containerClassnames) {
    e.preventDefault();
    this.props.clickOnMobileMenuAction(_containerClassnames);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize);
    this.handleWindowResize();
    this.handleProps();
    this.setSelectedLiActive(this.setHasSubItemStatus);
  }

  componentWillUnmount() {
    this.removeEvents();
    window.removeEventListener('resize', this.handleWindowResize);
  }

  toggleMenuCollapse = (e, menuKey) => {
    e.preventDefault();
    if (this.state.selectedMenu === 'started_0' && this.props.allMenu === false) {
      return false;
    }

    const { collapsedMenus } = this.state;
    if (collapsedMenus.indexOf(menuKey) > -1) {
      this.setState({
        collapsedMenus: collapsedMenus.filter((x) => x !== menuKey),
      });
    } else {
      collapsedMenus.push(menuKey);
      this.setState({
        collapsedMenus,
      });
    }
    return false;
  };

  toggleMenu = (e, menuKey) => {
    if (this.state.selectedMenu === 'started_0' && this.props.allMenu === false) {
      e.preventDefault();
      return false;
    }
    this.setState({ selectedMenu: menuKey });
    return false;
  };

  toggleSubMenuCollapse = (e, menuKey) => {
    this.setState({ selectedSubMenu: menuKey });
    this.setSelectedLiActive(this.setHasSubItemStatus);
    return true;
  };

  render() {
    const {
      selectedParentMenu,
      viewingParentMenu,
      collapsedMenus,
    } = this.state;
    return (
      <div className="sidebar">
        <NavLink
          to="#"
          location={{}}
          className="menu-button-mobile"
          onClick={(e) => this.mobileMenuButtonClick(e, this.props.containerClassnames)}
        >
          <i className="simple-icon-arrow-right"></i>
        </NavLink>

        <div className="main-menu default-transition">
          <div className="site-logo">
            <img src="/assets/img/site-logo.svg" alt="Site Logo"></img>
          </div>
          <div className="scroll">
            <PerfectScrollbar
              options={{ suppressScrollX: true, wheelPropagation: false }}
            >
              <Nav vertical className="list-unstyled">
                {menuItems &&
                  menuItems.map((item, index) => {
                    return (
                      <NavItem
                        key={item.id}
                        className={classnames({
                          active:
                            (selectedParentMenu === item.id &&
                              viewingParentMenu === '') ||
                            viewingParentMenu === item.id || this.props.location.pathname.indexOf(item.to) > -1,
                          hide: this.props.allMenu === true && item.id === "started"
                        })}
                      >
                        {
                          item.subs && item.subs.length > 0 ? (
                            <>
                              <NavLink
                                className={`rotate-arrow-icon ${collapsedMenus.indexOf(
                                  `${item.id}_${index}`
                                ) !== -1
                                  ? 'collapsed'
                                  : ''
                                  }${this.state.selectedMenu === 'started_0' && this.props.allMenu === false ? 'disable' : ''}${this.props.location.pathname === item.to ? 'active' : ''}`}
                                to={item.to}
                                data-flag={item.id}
                                id={`${item.id}_${index}`}
                                onClick={(e) =>
                                  this.toggleMenuCollapse(
                                    e,
                                    `${item.id}_${index}`
                                  )
                                }
                              >
                                <i className={item.icon} />{' '}
                                <span>{item.label}</span>
                                <i className="simple-icon-arrow-down" />
                              </NavLink>
                              <Collapse
                                isOpen={
                                  collapsedMenus.indexOf(
                                    `${item.id}_${index}`
                                  ) !== -1 || this.props.location.pathname.indexOf(item.to) > -1
                                }
                              >
                                <Nav className="third-level-menu">
                                  {item.subs.map((thirdSub, thirdIndex) => {
                                    return (
                                      <NavItem
                                        key={`${item.id}_${index}_${thirdIndex}`}
                                        className={this.props.location.pathname === thirdSub.to ? 'active' : ''}
                                      >
                                        <NavLink
                                          id={thirdSub.id}
                                          to={thirdSub.to}
                                          className={this.props.location.pathname === thirdSub.to ? 'active' : ''} 
                                          onClick={(e) =>
                                            this.toggleSubMenuCollapse(
                                              e,
                                              `${thirdSub.id}`
                                            )
                                          }
                                        >
                                          <span>{thirdSub.label}</span>
                                        </NavLink>
                                      </NavItem>
                                    );
                                  })}
                                </Nav>
                              </Collapse>
                            </>
                          ) : (
                              <NavLink
                                id={`${item.id}_${index}`}
                                to={item.to}
                                className={`${this.state.selectedMenu === "started_0" && item.id !== 'started' && this.props.allMenu === false ? "disable" : ""}${this.props.location.pathname.indexOf(item.to) > -1 ? "active" : ""}`}
                                data-flag={item.id}
                                onClick={(e) =>
                                  this.toggleMenu(
                                    e,
                                    `${item.id}_${index}`
                                  )
                                }
                              >
                                <i className={item.icon} />{' '}
                                <span>{item.label}</span>
                              </NavLink>
                            )
                        }

                      </NavItem>
                    );
                  })}
                <NavItem>
                  <Language name="language" defaultLanguage="gb" />
                </NavItem>
              </Nav>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ menu }) => {
  const {
    containerClassnames,
    subHiddenBreakpoint,
    menuHiddenBreakpoint,
    menuClickCount,
    selectedMenuHasSubItems,
  } = menu;
  return {
    containerClassnames,
    subHiddenBreakpoint,
    menuHiddenBreakpoint,
    menuClickCount,
    selectedMenuHasSubItems,
  };
};
export default withRouter(
  connect(mapStateToProps, {
    setContainerClassnames,
    addContainerClassname,
    changeDefaultClassnames,
    changeSelectedMenuHasSubItems,
    clickOnMobileMenuAction: clickOnMobileMenu
  })(Sidebar)
);
