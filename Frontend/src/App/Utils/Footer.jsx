import React from 'react';

const Footer = props => {

  return (
    <footer className="footer has-background-light">
      <div className="content has-text-centered">
        <p>
          An Anonymous Message Board made by
          <a
            href="https://twitter.com/yagoestevez"
            target="_blank"
            rel="noopener noreferrer"
            alt="Yago Estévez on Twitter"
            title="Yago Estévez on Twitter"
            className="has-text-danger"
            > Yago Estévez
          </a>.
        </p>
      </div>
    </footer>
  );

}

export default Footer;