import React from "react";
import PropTypes from "prop-types";
import {observer} from 'mobx-react';

const Details = ({store}) => {
  return (
    <div className='project-details'>
      <p>Project Details (being built)</p>
    </div>
  );
};

Details.propTypes = {
  store: PropTypes.object.isRequired
}

export default observer(Details);