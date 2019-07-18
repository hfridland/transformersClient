import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardText } from 'reactstrap';


import * as actions from '../store/actions/transformers';
import { Loading } from './UI/LoadingComponent';
import TransformerView from './TransformerView';
import TransformerEdit from './TransformerEdit';

class MainPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditorOpen: false,
            edTransformer: null,
            selected: []
        }
    }


    componentDidMount() {
        this.props.loadTransformers();
    }

    editTransformer = (transformer) => {
        this.setState({ edTransformer: transformer });
    };

    saveTransformer = (transformer) => {
        if (transformer.id >= 0)
            this.props.saveTransformer(transformer);
        else
            this.props.saveNewTransformer(transformer);
    }

    closeEditor = () => {
        this.setState({ edTransformer: null });
    }

    deleteTransformer = (transformer) => {
        //console.log(transformer);
        this.props.deleteTransformer(transformer);
    };

    newClick = (event) => {
        const transformer = {
            id: -1,
            name: '',
            type: 'Autobot',
            strength: '',
            intelligence: '',
            speed: '',
            endurance: '',
            rank: '',
            courage: '',
            firepower: '',
            skill: ''
        };
        this.setState({ edTransformer: transformer });
    }

    selItem = (id, sel) => {
        let selected = this.state.selected;
        if (sel) {
            selected = selected.concat([id]);
        } else {
            selected = selected.filter(n => n !== id);
        }
        this.setState({ selected: selected });
    }

    battleClick = (event) => {
        this.props.battle(this.state.selected);
    }

    render() {
        const error = this.props.error === '' ? null : <h3>{'' + this.props.error.toString()}</h3>;
        const loading = this.props.loading ? <Loading /> : null;
        const transformers = this.props.transformers === null ? null : this.props.transformers.map(transformer => {
            return <TransformerView key={transformer.id} transformer={transformer}
                edit={transformer => this.editTransformer(transformer)}
                delete={transformer => this.deleteTransformer(transformer)}
                select={(id, sel) => this.selItem(id, sel)} />;
        });

        return (
            <>
                <TransformerEdit transformer={this.state.edTransformer} close={() => this.closeEditor()} save={(transformer) => this.saveTransformer(transformer)} />
                <div className="container">
                    <Card>
                        <CardBody>
                            <button type="button" className="btn btn-success mr-1" onClick={(event) => this.newClick(event)} >New Transformer</button>
                            <button type="button" className="btn btn-success ml-1" onClick={(event) => this.battleClick(event)} >Battle</button>
                            <CardText>
                                <pre>{this.props.battleResult}</pre>
                            </CardText>
                        </CardBody>
                    </Card>
                    {error}
                    {loading}
                    {transformers}
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        transformers: state.transformers.transformers,
        loading: state.transformers.loading,
        error: state.transformers.error,
        battleResult: state.transformers.battleResult
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadTransformers: () => dispatch(actions.loadTransformers()),
        saveTransformer: (transformer) => dispatch(actions.saveTransformer(transformer)),
        saveNewTransformer: (transformer) => dispatch(actions.saveNewTransformer(transformer)),
        deleteTransformer: (transformer) => dispatch(actions.deleteTransformer(transformer)),
        battle: (transformers) => dispatch(actions.battle(transformers))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainPanel);