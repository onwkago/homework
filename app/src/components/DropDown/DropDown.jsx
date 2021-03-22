import React from 'react';
import PropTypes from 'prop-types';
import styles from './DropDownStyles.scss';
import DropDownItem from "./DropDownItem";

const DropDown = ({
                      toggle,
                      suggestItems,
                      loading,
                      handleClick,
                  }) => {
    console.info({suggestItems, toggle});
    const setShow = toggle
        ? 'drop-down'
        : 'hide drop-down';

    if (loading) {
        return (
            <div>SPINNER</div>
        );
    }

    return (
        <React.Fragment>
            <ul
                className={ setShow }
            >
                {
                    suggestItems.map((item) => {
                        return (
                            <DropDownItem
                                item={ item }
                                handleClick={ handleClick }
                            />
                        );
                    })
                }
            </ul>
        </React.Fragment>
    );
};

DropDown.propTypes = {
    toggle: PropTypes.bool,
    suggestItems: PropTypes.object,
    loading: PropTypes.bool,
    handleClick: PropTypes.func,
};

DropDown.defaultPropTypes = {
    loading: false,
};

export default DropDown;