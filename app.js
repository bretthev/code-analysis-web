//helper functions
const getPersonList = () => {
    return new Promise((resolve, reject) => {
        fetch('http://api.namegame.willowtreemobile.com/').then(function(response) {
            if (response.status !== 200) {
                reject(new Error("Error!"));
            }
            response.json().then((imageList) => {
                let completeList = imageList.map((person) => Object.assign({}, person, person.lastName = getLastName(person.name)));

                resolve(completeList);
            });
        });
    });
}

const getLastName = (fullName) => {
    return fullName.match(/\w+/g)[1];
}

const getFirstName = (fullName) => {
    return fullName.match(/\w+/g)[0];
};


const shuffleList = (list) => {
    let result = list.slice(1);

    let tmp, j, i = list.length - 1

    for (; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        tmp = list[i];
        list[i] = list[j];
        list[j] = tmp;
    }

    return result;
}

const filterByName = (searchForName, personList) => {
    return personList.filter((person) => {
        return person.name === searchForName;
    });
}

const sortObjListByProp = (prop) => {
    return function(objList) {
        // Make a copy & don't mutate the passed in list
        let result = objList.slice(1);

        result.sort((a, b) => {
            if (a[prop] < b[prop]) {
                return -1;
            }

            if (a[prop] > b[prop]) {
                return 1;
            }

            return 1;
        });

        return result;
    };
}

const sortByFirstName = sortObjListByProp('name');

const sortByLastName = sortObjListByProp('lastName')


const Search = (props) => React.DOM.input({
    type: 'input',
    onChange: props.onChange
});

const Thumbnail = (props) => React.DOM.img({
    className: 'image',
    src: props.src
});

const ListRow = (props) => React.DOM.tr({ key: props.person.name }, [
    React.DOM.td({ key: 'thumb' }, React.createElement(Thumbnail, { src: props.person.url })),
    React.DOM.td({ key: 'first' }, null, getFirstName(props.person.name)),
    React.DOM.td({ key: 'last' }, null, getLastName(props.person.name)),
]);

const ListContainer = (props) => React.DOM.table({ className: 'list-container' }, [
    React.DOM.thead({ key: 'thead' }, React.DOM.tr({}, [
        React.DOM.th({ key: 'thumb-h' }, null, 'Thumbnail'),
        React.DOM.th({ key: 'first-h' }, null, 'First Name'),
        React.DOM.th({ key: 'last-h' }, null, 'Last Name')
    ])),
    React.DOM.tbody({ key: 'tbody' }, props.personList.map((person, i) =>
        React.createElement(ListRow, { key: `person-${i}`, person })))
]);

//react view

const App = React.createClass({
    getInitialState() {
        return {
            personList: [],
            visiblePersonList: []
        };
    },

    componentDidMount() {
        let personListWithLastName;
        getPersonList().then((personList) =>
            this.setState({
                personList,
                visiblePersonList: personList
            }));
    },

    _shuffleList() {
        this.setState({
            visiblePersonList: shuffleList(this.state.personList)
        });
    },

    _sortByFirst() {
        this.setState({
            visiblePersonList: sortByFirstName(this.state.personList)
        });
    },

    _sortByLast() {
        this.setState({
            visiblePersonList: sortByLastName(this.state.personList)
        });
    },

    _onSearch(e) {

        this.setState({
            visiblePersonList: filterByName(e.target.value, this.state.personList)
        });
    },

    render() {
        const { visiblePersonList } = this.state;

        return React.DOM.div({ className: 'app-container' }, [
            React.createElement(Search, { key: 'search', onChange: this._onSearch }),
            React.DOM.button({ key: 'shuffle', onClick: this._shuffleList }, null, 'Shuffle'),
            React.DOM.button({ key: 'sort-first', onClick: this._sortByFirst }, null, 'Sort (First Name)'),
            React.DOM.button({ key: 'sort-last', onClick: this._sortByLast }, null, 'Sort (Last Name)'),
            React.createElement(ListContainer, { key: 'list', personList: visiblePersonList })
        ]);
    }
});

//sends app to html
ReactDOM.render(
    React.createElement(App),
    document.getElementById('app')
);
