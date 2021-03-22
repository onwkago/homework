import React from 'react';
import SearchPage from "../../pages/searchPage/search-page";

import styles from './PageLayoutStyles.scss';


const PageLayout = () => {

    return (
        <React.Fragment>
            <div className={
                'pageLayout'
            }>
                {/* routing goes here*/}
                { <SearchPage /> }
            </div>
        </React.Fragment>
    );

};


export default PageLayout;