import React from 'react';
import PropTypes from 'prop-types';

const StatusBar = ({ status, url }) => {
  return (
    <div className="ie-statusbar">
      <div className="ie-status-left">
        <div className="ie-status-text">{status}</div>
      </div>
      <div className="ie-status-right">
        <div className="ie-status-zone">🌐 Internet zone</div>
      </div>
    </div>
  );
};

StatusBar.propTypes = {
  status: PropTypes.string,
  url: PropTypes.string,
};

StatusBar.defaultProps = {
  status: 'Done',
  url: '',
};

export default StatusBar;
