import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Label, Col, Row } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

const notEmptyValid = val => val.trim() !== '';

const intRange = val => {
    if (isNaN(val))
        return false;
    val = +val;
    const res = (1 <= val && val <= 10);
    return res;
}

class TransformerEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transformer: null
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.transformer !== prevProps.transformer) {
            if (this.props.transformer !== this.state.transformer) {
                this.setState({ transformer: this.props.transformer });
            }
        }
    }

    handleSubmit(values) {
        this.props.close();
        this.props.save(values);
    }

    render() {
        return (
            <Modal isOpen={this.state.transformer !== null}>
                <ModalHeader toggle={() => this.props.close()}>Transformer Editor</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)} initialState={this.state.transformer}>
                        <Row className='form-group'>
                            <Col>
                                <Label htmlFor='type'>Type</Label>
                                <Control.select model=".type" name="type" className='form-control'>
                                    <option>Autobot</option>
                                    <option>Decepticon</option>
                                </Control.select>
                            </Col>
                            <Col>
                                <Label htmlFor='name'>Name</Label>
                                <Control.text model='.name' id='name' name='name' placeholder='Name' className='form-control' validators={{ name: notEmptyValid }} />
                                <Errors className='text-danger' model='.name' show='touched' messages={{
                                    name: "Name can't be empty"
                                }} />
                            </Col>
                        </Row>
                        <Row className='form-group'>
                            <Col>
                                <Label htmlFor='strength'>Strength</Label>
                                <Control.text model='.strength' id='strength' name='strength' placeholder='Strength' className='form-control' validators={{ range: intRange }} />
                                <Errors className='text-danger' model='.strength' show='touched' messages={{
                                    range: 'Must be greater than 1 <= value <= 10'
                                }} />
                            </Col>
                            <Col>
                                <Label htmlFor='intelligence'>Intelligence</Label>
                                <Control.text model='.intelligence' id='intelligence' name='intelligence' placeholder='Intelligence' className='form-control' validators={{ range: intRange }} />
                                <Errors className='text-danger' model='.intelligence' show='touched' messages={{
                                    range: 'Must be greater than 1 <= value <= 10'
                                }} />
                            </Col>
                        </Row>
                        <Row className='form-group'>
                            <Col>
                                <Label htmlFor='speed'>Speed</Label>
                                <Control.text model='.speed' id='speed' name='speed' placeholder='Speed' className='form-control' validators={{ range: intRange }} />
                                <Errors className='text-danger' model='.speed' show='touched' messages={{
                                    range: 'Must be greater than 1 <= value <= 10'
                                }} />
                            </Col>
                            <Col>
                                <Label htmlFor='endurance'>Endurance</Label>
                                <Control.text model='.endurance' id='endurance' name='endurance' placeholder='Endurance' className='form-control' validators={{ range: intRange }} />
                                <Errors className='text-danger' model='.endurance' show='touched' messages={{
                                    range: 'Must be greater than 1 <= value <= 10'
                                }} />
                            </Col>
                        </Row>
                        <Row className='form-group'>
                            <Col>
                                <Label htmlFor='rank'>Rank</Label>
                                <Control.text model='.rank' id='rank' name='rank' placeholder='Rank' className='form-control' validators={{ range: intRange }} />
                                <Errors className='text-danger' model='.rank' show='touched' messages={{
                                    range: 'Must be greater than 1 <= value <= 10'
                                }} />
                            </Col>
                            <Col>
                                <Label htmlFor='courage'>Courage</Label>
                                <Control.text model='.courage' id='courage' name='courage' placeholder='Courage' className='form-control' validators={{ range: intRange }} />
                                <Errors className='text-danger' model='.courage' show='touched' messages={{
                                    range: 'Must be greater than 1 <= value <= 10'
                                }} />
                            </Col>
                        </Row>
                        <Row className='form-group'>
                            <Col>
                                <Label htmlFor='firepower'>Firepower</Label>
                                <Control.text model='.firepower' id='firepower' name='firepower' placeholder='Firepower' className='form-control' validators={{ range: intRange }} />
                                <Errors className='text-danger' model='.firepower' show='touched' messages={{
                                    range: 'Must be greater than 1 <= value <= 10'
                                }} />
                            </Col>
                            <Col>
                                <Label htmlFor='skill'>Skill</Label>
                                <Control.text model='.skill' id='skill' name='skill' placeholder='Skill' className='form-control' validators={{ range: intRange }} />
                                <Errors className='text-danger' model='.skill' show='touched' messages={{
                                    range: 'Must be greater than 1 <= value <= 10'
                                }} />
                            </Col>
                        </Row>
                        <Row className='form-group'>
                            <Col>
                                <Button type='submit' color='primary'>Submit</Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
        );
    }
}

export default TransformerEdit;