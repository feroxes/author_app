import React, {Component} from 'react';
import './App.css';
import axios from 'axios';

import SearchInput from '../containers/SearchInput';
import Filter from '../containers/Filter';
import AuthorList from './AuthorList';
import Pagination from '../containers/Pagination';

class App extends Component {

    componentWillMount() {
        const {setAuthors} = this.props;
        axios.get('/data.json').then(({data}) => {
            setAuthors(data);
        })
    };

    render() {
        const {authors, isReady, searchQuery, startPagination} = this.props;
        const colors = ['color-67c9de', 'color-ba6fcb', 'color-e39473', 'color-5aa9e6', 'color-ac5061', 'color-9ec07f', 'color-b4507b', 'color-345feb'];
        return (
            <div className='container'>
                <SearchInput {...searchQuery}/>
                <Filter/>
                {!isReady
                    ? 'Loading...'
                    : authors.map((author, i) => {
                            const rang = Math.floor(Math.random() * colors.length);
                            const settings = {
                                grayBckg: i % 2 ? 'grayBckg' : null,
                                count: i + startPagination,
                                classColor: colors[rang],
                            }
                            return (
                                <AuthorList settings={settings} {...author} key={i}/>
                            )
                        }
                    )}
                <Pagination />
            </div>
        );
    };
};

export default App;
