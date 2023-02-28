import PropTypes from 'prop-types';

import css from './Filter.module.css';

export const Filter = ({ handleChange, value }) => {
  return (
    <div className={css.block}>
      <label className={css.textFind}>Find contacts by name</label>
      <input
        value={value}
        name="filter"
        onChange={handleChange}
        pleceholder="Find by name"
      />
    </div>
  );
};

Filter.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
