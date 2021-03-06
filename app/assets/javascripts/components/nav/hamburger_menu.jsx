import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import CustomLink from './CustomLink.jsx';
import LanguagePicker from './language_picker.jsx';

const HamburgerMenu = createReactClass({
  displayName: 'HamburgerMenu',

  propTypes: {
    rootUrl: PropTypes.string,
    logoPath: PropTypes.string,
    exploreUrl: PropTypes.string,
    exploreName: PropTypes.string,
    userSignedIn: PropTypes.bool,
    ifAdmin: PropTypes.bool,
    trainingUrl: PropTypes.string,
    helpDisabled: PropTypes.bool,
    wikiEd: PropTypes.bool,
    userPermissions: PropTypes.bool,
    languageSwitcherEnabled: PropTypes.bool,
    currentUser: PropTypes.string,
    destroyUrl: PropTypes.string,
    omniauthUrl: PropTypes.string
  },

  getInitialState() {
    return this.getState();
  },

  getState() {
    return {
      isActive: false
    };
  },

  toggleClass() {
    this.setState({ isActive: !this.state.isActive });
  },

  render() {
    const { rootUrl, logoPath, exploreUrl, exploreName, userSignedIn, ifAdmin, trainingUrl, helpDisabled, wikiEd, userPermissions, languageSwitcherEnabled, currentUser, destroyUrl, omniauthUrl } = this.props;
    let myDashboard;
    let forAdmin;
    let help;
    let sandbox;
    let programsDashboard;
    let languageSwitcher;
    let loggingLinks;
    let helpEnabled;
    if (languageSwitcherEnabled) {
      languageSwitcher = (
        <LanguagePicker />
      );
    }
    if (userSignedIn) {
      loggingLinks = (
        <span>
          <li>
            <b><a href={rootUrl} className="current-user">{currentUser}</a></b>
          </li>
          <li>
            <a href={destroyUrl} className="current-user">{I18n.t('application.log_out')}</a>
          </li>
        </span>
      );
      if (!helpDisabled) {
        helpEnabled = (
          <li>
            <form className="top-nav__faq-search" target="_blank" action="/faq" acceptCharset="UTF-8" method="get">
              <input name="utf8" type="hidden" defaultValue="✓" />
              <input type="text" name="search" id="search" defaultValue="" placeholder={I18n.t('application.search')} />
              <input name="source" type="hidden" defaultValue="nav_ask_form" />
              <button type="submit">
                <i className="icon icon-search" />
              </button>
            </form>
          </li>
      );
      }
    } else {
      loggingLinks = (
        <li>
          <a href={omniauthUrl}>
            <i className="icon icon-wiki-logo" />
            {I18n.t('application.log_in')}
            <span className="expand">
              &nbsp;{I18n.t('application.sign_up_log_in_extended')}
            </span>
          </a>
        </li>
      );
    }
    if (userSignedIn === true) {
      myDashboard = (
        <li>
          <CustomLink to={rootUrl} name={I18n.t('application.my_dashboard')} clickedElement="" />
        </li>
      );
    }
    if (ifAdmin === true) {
      forAdmin = (
        <li>
          <CustomLink to="/admin" name="Admin" />
        </li>
      );
    }
    if ((userSignedIn || helpDisabled) === false) {
      help = (
        <li>
          <CustomLink to="/faq" name={I18n.t('application.help')} />
        </li>
      );
    }
    if (userPermissions) {
      sandbox = (
        <li>
          <CustomLink to="/redirect/sandbox/sandbox" name="My Sandbox" />
        </li>
      );
    }
    if (!wikiEd) {
      programsDashboard = (
        <span id="span_wikied">
          <li>
            <CustomLink to="https://meta.wikimedia.org/wiki/Programs_%26_Events_Dashboard" name={I18n.t('application.documentation')} target="_blank" />
          </li>
          <li>
            <CustomLink to="/feedback" name={I18n.t('application.report_problem')} target="_blank" />
          </li>
        </span>
      );
    }
    return (
      <div>
        <nav className="ham-nav">
          <div className="container">
            <div className="ham-nav__site-logo">
              <a className="logo__link" href= {rootUrl}>
                <img src ={logoPath} alt = "wiki logo" />
              </a>
            </div>
            {languageSwitcher}
            <div className="hamburger_menu_wrapper">
              <div className ="bm-burger-button" onClick={this.toggleClass}>
                <div className ={(this.state.isActive) ? 'bm-menu-active' : ''}>
                  <div className = "bar1" />
                  <div className = "bar2" />
                  <div className = "bar3" />
                </div>
              </div>
              <div className = {`bm-menu-wrap ${(this.state.isActive) ? 'bm-menu-visible' : ''}`}>
                <div className= "bm-menu">
                  <li>
                    <CustomLink to={exploreUrl} name={exploreName} clickedElement="explore" />
                  </li>
                  {myDashboard}
                  {forAdmin}
                  <li>
                    <CustomLink to={trainingUrl} name={I18n.t('application.training')} clickedElement="training" />
                  </li>
                  {sandbox}
                  {help}
                  {programsDashboard}
                  {helpEnabled}
                  {loggingLinks}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
});

export default HamburgerMenu;
