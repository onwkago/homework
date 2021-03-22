import React from 'react';
import PropTypes from 'prop-types';

const DropDownItem = ({
    item,
    handleClick,
}) => {
    const handleItemClick = () => (
        handleClick(item.name)
    );

    return(
        <React.Fragment>
            <li
                className={'drop-down-item'}
                onClick={ handleItemClick }
            >
                      <span>{item.name}
                          <br/>
                          <small className={
                              'smaller'
                          }>
                              {`${item.rating} Rating, ${item.release.split('-')[0]}`}
                          </small>
                      </span>
            </li>
        </React.Fragment>
    );
};

DropDownItem.propTypes = {
    item: PropTypes.object,
    onClick: PropTypes.func,
}

export default DropDownItem;