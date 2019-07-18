import React, { Component } from 'react';
import { Popover, PopoverHeader, PopoverBody, Tooltip, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEraser, faList } from '@fortawesome/free-solid-svg-icons';


class TransformerView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            popoverOpen: false,
            delTooltipOpen: false,
            editTooltipOpen: false,
            viewTooltipOpen: false,
            isSel: false
        };
    }

    toggle = () => {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }

    toggleDelTooltip = () => {
        this.setState({
            delTooltipOpen: !this.state.delTooltipOpen
        });
    }

    toggleEditTooltip = () => {
        this.setState({
            editTooltipOpen: !this.state.editTooltipOpen
        });
    }

    toggleViewTooltip = () => {
        this.setState({
            viewTooltipOpen: !this.state.viewTooltipOpen
        });
    }

    popupClick = (event) => {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
        event.preventDefault();
    }

    editClick = (event) => {
        this.props.edit(this.props.transformer);
        event.preventDefault();
    }

    deleteClick = (event) => {
        this.props.delete(this.props.transformer);
        event.preventDefault();
    }

    handleSelChange = (event) => {
        this.setState({isSel: event.target.checked });
        this.props.select(this.props.transformer.id, event.target.checked);
    }

    render() {
        return (
            <div className='row'>
                <div className='col-6'>
                    {this.props.transformer.presentation}
                </div>
                <div className='col-2'>
                    <FontAwesomeIcon icon={faEdit} onClick={(event) => this.editClick(event)} className='ml-2 mr-1' id={'btnEdit' + this.props.transformer.id} />
                    <Tooltip placement="top" isOpen={this.state.editTooltipOpen}
                        target={'btnEdit' + this.props.transformer.id} toggle={() => this.toggleEditTooltip()}
                        style={{ backgroundColor: 'Yellow', color: 'blue' }} >
                        Edit Transformer
                    </Tooltip>

                    <FontAwesomeIcon icon={faEraser} onClick={(event) => this.deleteClick(event)} className='ml-1 mr-1' id={'btnDelete' + this.props.transformer.id} />
                    <Tooltip placement="top" isOpen={this.state.delTooltipOpen}
                        target={'btnDelete' + this.props.transformer.id} toggle={() => this.toggleDelTooltip()}
                        style={{ backgroundColor: 'Yellow', color: 'blue' }} >
                        Delete Transformer
                    </Tooltip>

                    <FontAwesomeIcon icon={faList} onClick={(event) => this.popupClick(event)} className='ml-1 mr-1' id={'btnPopover' + this.props.transformer.id} />
                    <Tooltip placement="top" isOpen={this.state.viewTooltipOpen}
                        target={'btnPopover' + this.props.transformer.id} toggle={() => this.toggleViewTooltip()}
                        style={{ backgroundColor: 'Yellow', color: 'blue' }} >
                        View Transformer
                    </Tooltip>
                    <Popover placement="top" isOpen={this.state.popoverOpen} target={'btnPopover' + this.props.transformer.id} >
                        <PopoverHeader as="h3">Transformer</PopoverHeader>
                        <PopoverBody>
                            <ul className="list-unstyled">
                                <li><strong>Id:</strong>  {this.props.transformer.id} </li>
                                <li><strong>Type:</strong> {this.props.transformer.type}</li>
                                <li><strong>Strength:</strong> {this.props.transformer.strength}</li>
                                <li><strong>Intelligence:</strong> {this.props.transformer.intelligence}</li>
                                <li><strong>Speed:</strong> {this.props.transformer.speed}</li>
                                <li><strong>Endurance:</strong> {this.props.transformer.endurance}</li>
                                <li><strong>Rank:</strong> {this.props.transformer.rank}</li>
                                <li><strong>Courage:</strong> {this.props.transformer.courage}</li>
                                <li><strong>Firepower:</strong> {this.props.transformer.firepower}</li>
                                <li><strong>Skill:</strong> {this.props.transformer.skill}</li>
                                <li><strong>Overall Rating:</strong> {this.props.transformer.overallRating}</li>
                                <li><strong>Presentation:</strong> {this.props.transformer.presentation}</li>
                            </ul>
                        </PopoverBody>
                    </Popover>
                </div>
                <div className='col-2'>
                    <Input type="checkbox" value={this.state.isSel} onChange={(event) => this.handleSelChange(event)} />{' '}For battle
                </div>
            </div>
        );
    }
}

export default TransformerView;