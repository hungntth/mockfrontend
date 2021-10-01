import React, { useState, useEffect } from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Form,
    FormGroup,
    Input,
    Label,
  } from "reactstrap";
import CandidateApi from "./../../api/CandidateApi";
import { useHistory } from "react-router";

function UpdateCandidate({ match }) {
    const { id } = match.params;
    const history = useHistory()
    const [user, setUser] = useState({ fullName: '', phoneNumber: '' });

    const { fullName, phoneNumber } = user;
    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadUser();
    }, []);

    const onSubmit = async e => {
        e.preventDefault();
        await CandidateApi.updateCandidate(id, user)
        history.goBack()
    };

    const loadUser = async () => {
        const result = await CandidateApi.getByID(id)
        setUser(result);
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle tag="h2" >Create Candidate</CardTitle>
            </CardHeader>
            <CardBody>
                <Form onSubmit={e => onSubmit(e)}>
                    <FormGroup>
                        <Label>Full Name</Label>
                        <Input
                            id="fullName"
                            name="fullName"
                            type="text"
                            placeholder="Enter Full Name ..."
                            value={fullName}
                            onChange={e => onInputChange(e)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Phone Number</Label>
                        <Input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="text"
                            placeholder="Enter Phone Number ..."
                            value={phoneNumber}
                            onChange={e => onInputChange(e)}
                        />
                    </FormGroup>
                    <Button color="primary">Submit</Button>
                    <Button color="warning" className="mx-2">Cancel</Button>
                </Form>
            </CardBody>
        </Card>
    );
};

export default UpdateCandidate;