import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestRobots, setSearchField } from '../actions';

import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
// import { robots } from '../robots';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import Header from '../components/Header';

import './App.css';

const mapStateToProps = (state) => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

class App extends Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         robots: [],
    //         // searchField: ''
    //     }
    //     // console.log('constructor');
    // }

    componentDidMount() {
        this.props.onRequestRobots();
        // fetch('https://jsonplaceholder.typicode.com/users')
        //     .then(response => response.json())
        //     .then(users => this.setState({ robots: users }));
        // console.log(this.props.store.getState());
        // this.setState({robots: robots});
        // console.log('componentDidMount');
    }

    // onSearchChange = (event) => {
    //     this.setState({ searchField: event.target.value })
    //     // console.log('onSearchChange');
    // }

    render() {
        // const { robots } = this.state;
        // const { robots, searchField } = this.state;
        const { robots, searchField, onSearchChange, isPending } = this.props;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });
        // console.log('render');
        return isPending ?
            (
                <div className='tc'>
                    <h1 className='f1'>Loading......</h1>
                </div>
            )
            :
            (
                <div className='tc'>
                    <Header />
                    {/* <SearchBox searchChange={this.onSearchChange} /> */}
                    <SearchBox searchChange={onSearchChange} />
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots} />
                        </ErrorBoundry>
                    </Scroll>
                </div>
            );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);