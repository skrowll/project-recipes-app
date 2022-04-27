import React from 'react';
import propTypes from 'prop-types';

export default function Recipe({ match: { params: { id } } }) {
  return (
    <div>{ id }</div>
  );
}

Recipe.propTypes = {
  match: propTypes.objectOf(propTypes.any).isRequired,
};
