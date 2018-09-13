import React    from 'react';
import { Link } from 'react-router-dom';

class Nav extends React.Component {

  state = {
    showMenu: false
  }

  toggleMenu = ( ) => {
    this.setState( state => {
      return {
        showMenu: !state.showMenu
      }
    } )
  }

  render ( ) {
    return (
      <div className="hero-head">
        <nav className="navbar">
          <div className="container">
            <div className="navbar-brand">
              <span
                className   = {
                  this.state.showMenu
                    ? "navbar-burger burger is-active"
                    : "navbar-burger burger"
                }
                data-target = "navMenu"
                onClick     = { this.toggleMenu }
                >
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
            <div
              id        = "navMenu"
              className = {
                this.state.showMenu
                  ? "navbar-menu is-active"
                  : "navbar-menu"
              }
              >
              <div className="navbar">
                <span className="navbar-item">
                  <Link to="/" className="button is-light is-outlined">
                    <span className="icon">
                      <i className="far fa-list-alt"></i>
                    </span>
                    <span>All Boards</span>
                  </Link>
                </span>
                <span className="navbar-item">
                  <Link to="/publish" className="button is-light is-outlined">
                    <span className="icon">
                      <i className="fas fa-edit"></i>
                    </span>
                    <span>New Thread</span>
                  </Link>
                </span>
              </div>
              <br />
              <div className="navbar-end">
                <span className="navbar-item">
                  <a
                    className = "button is-light is-outlined"
                    href      = "https://github.com/yagoestevez/anonymous-message-board"
                    target    = "_blank"
                    rel       = "noopener noreferrer"
                    >
                    <span className="icon">
                      <i className="fab fa-github"></i>
                    </span>
                    <span>Get the Source Code</span>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }

}

export default Nav;