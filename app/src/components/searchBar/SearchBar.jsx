import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useDebounce} from "use-debounce";
import {
    Form,
    Input,
    InputGroup,
    Label,
} from 'reactstrap';
import SearchIcon from '../.././icons/search.svg';
import MovieIcon from '../.././icons/movie.svg';

import styles from './SearchBarStyles.scss';
import DropDown from "../DropDown/DropDown";


export const MAX_SUGGESTION_COUNT = 8;
export const WAIT_TIME = 500;

const SearchBar = () => {

    const [searchValue, setSearchValue] = useState();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [suggestionItems, setSuggestionItems] = useState([]);
    const debouncedSearchValue = useDebounce(searchValue, WAIT_TIME);
    const [focus, setFocus] = useState(false);
    const [shouldRefetch, setShouldRefetch] = useState(true);

    const toggleFocus = () => (setFocus(!focus));

    const handleSubmit = () => {
        console.log('SUBMIT');
    }

    const fetchSuggestionItems = () => {
        if(shouldRefetch) {
            console.info('fetching items');
            return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=ce6be82a2a8601747553a445f24982d9&language=en-US&query=${debouncedSearchValue[0]}`)
                .then(({data}) => {
                    console.info({data});
                    setSuggestionItems(() => (
                        data?.results.slice(0, MAX_SUGGESTION_COUNT).map((item) => (
                            {
                                name: item.original_title,
                                rating: item.vote_average,
                                release: item.release_date,
                            }
                        ))
                    ));
                });
        }

    }

    useEffect(() => {
        debouncedSearchValue[0] === "" | undefined | null
            ? setSuggestionItems([])
            : fetchSuggestionItems();

        suggestionItems?.length > 0 && shouldRefetch
            ? setDropdownOpen(true)
            : setDropdownOpen(false);

    }, [debouncedSearchValue[0]]);

    const handleChange = (event) => {
        setShouldRefetch(true);
        if (searchValue !== event.target.value) {
            setSearchValue(event.target.value);
        };
    };

    const handleSelectSuggestion = (itemName) => {
        setShouldRefetch(false);
        setSearchValue(itemName);
        setDropdownOpen(false);
    }

    return (
        <React.Fragment>
            <div className={ 'search-bar' }>
                <Form
                    onSubmit={ handleSubmit }
                    className={ 'search-form' }
                >
                    <div className={ 'form' }>
                        <InputGroup>
                            <div className={ 'icon-container' }>
                                <MovieIcon className={ 'icon' } width={ '40px' } height={ '40px' }/>
                            </div>
                            <Input
                                value={ searchValue }
                                id={'search-bar-input'}
                                className={'input'}
                                onChange={ handleChange }
                                onFocus={ toggleFocus }
                                onBlur={ toggleFocus }
                                placeholder='Enter movie name'
                            >
                            </Input>
                            {(
                                  dropdownOpen &&
                                <DropDown
                                    toggle={ dropdownOpen }
                                    suggestItems={ suggestionItems }
                                    loading={ false } //TODO
                                    handleClick={ handleSelectSuggestion }
                                />
                            )}
                            {(
                                focus &&
                                <React.Fragment>
                                    <Label
                                        className={ 'input-label'}
                                        for={ 'search-bar-input' }
                                        text={ 'Enter a movie name' }
                                    >Enter a movie name
                                    </Label>
                                    <MovieIcon className={ 'input-icon' } width={ '20px' } height={ '20px' }/>
                                </React.Fragment>
                            )}

                            {(
                                !focus &&
                                <button className={ 'search-button' }>
                                    <SearchIcon/>
                                </button>
                            )}
                        </InputGroup>
                    </div>
                </Form>
            </div>
        </React.Fragment>
    );
}
export default SearchBar;