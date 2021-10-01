import React from "react";
import {
    Button,
    FormGroup,
    Row,
    Col,
    InputGroupAddon,
    Input
} from "reactstrap";
import { Formik, FastField, Form } from 'formik';
import * as Yup from 'yup';
import { ReactstrapInput } from "reactstrap-formik";
// import { selectMaxTotalMember, selectMinTotalMember } from "../../redux/selectors/groupSelector";
import { connect } from "react-redux";


const CustomFilter = (props) => {

    return (
        <Formik
            initialValues={
                {
                    minTotalMember: props.minTotalMember ? props.minTotalMember : "",
                    maxTotalMember: props.maxTotalMember ? props.maxTotalMember : ""
                }
            }
            validationSchema={
                Yup.object({
                    minTotalMember: Yup.number()
                        .min(0, "Must be a positive integer")
                        .integer("Must be a positive integer"),

                    maxTotalMember: Yup.number()
                        .min(0, "Must be a positive integer")
                        .integer("Must be a positive integer"),
                })
            }
            onSubmit={
                values => {
                    props.onFilterChange(values.minTotalMember, values.maxTotalMember);
                }
            }
        >
            <Form>

                <fieldset className="filter-border">
                    <legend className="filter-border">Filter</legend>
                    {/* min total member */}
                    <FormGroup>
                        <Row style={{ alignItems: "center" }}>
                            <Col xs="auto">
                                Status:
                            </Col>
                            <Col lg="2">
                                <Input type="select" name="select" id="exampleSelect">
                                    <option>Chưa thi</option>
                                    <option>Đã thi</option>
                                </Input>
                            </Col>
                            {"Creator:"}
                            <Col lg="2">
                            <Input type="select" name="select" id="exampleSelect">
                                    <option>Thái Hưng</option>
                                    <option>Nhung Nguyễn</option>
                                    <option>Trọng Thắng</option>
                                </Input>
                            </Col>
                            {/* filter */}
                            <Col xs="auto">
                                <InputGroupAddon addonType="append" color="primary">
                                    <Button type="submit">Filter!</Button>
                                </InputGroupAddon>
                            </Col>
                        </Row>
                    </FormGroup>
                </fieldset>
            </Form>
        </Formik>
    );
};

// const mapGlobalStateToProps = state => {
//     return {
//         minTotalMember: selectMinTotalMember(state),
//         maxTotalMember: selectMaxTotalMember(state),
//     };
// };

// export default connect(mapGlobalStateToProps)(CustomFilter);
export default CustomFilter;