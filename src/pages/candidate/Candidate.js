import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Button
} from "reactstrap";
import { getListCandidateAction } from '../../redux/actions/candidateActions';
import { connect } from "react-redux";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from 'react-bootstrap-table2-paginator';
import { selectCandidates, selectPage, selectSize, selectTotalSize } from '../../redux/selectors/candidateSelector';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import CustomSearch from "./CustomSearch";
import * as Icon from "react-feather";
import Filter from "./CandidateFilter";
import { Link } from "react-router-dom";
import CandidateApi from "./../../api/CandidateApi"
import { toastr } from "react-redux-toastr";



const Candidate = (props) => {

  const showSuccessNotification = (title, message) => {
    const options = {
      timeOut: 2500,
      showCloseButton: false,
      progressBar: false,
      position: "top-right"
    };

    // show notification
    toastr.success(title, message, options);
  }

  
  const getListCandidate = props.getListCandidateAction;
  const size = props.size;
  const [isVisibleFilter, setVisibleFilter] = useState(false);

  const tableColumns = [
    {
      dataField: "fullName",
      text: "FullName",
      sort: true
    },
    {
      dataField: "phoneNumber",
      text: "Phone number",
      sort: true,
    },
    {
      dataField: "examSetID",
      text: "Exam",
      sort: true,
      formatter: (Exam) => {
        switch (Exam) {
          case 1: return 'Mã Đề 01'
          case 2: return 'Mã Đề 02'
          case 3: return 'Mã Đề 03'
          case 4: return 'Mã Đề 04'
          case 5: return 'Mã Đề 05'

        }
      }
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      formatter: (textStatus) => {
        switch (textStatus) {
          case 0: return <button type="button" className="btn btn-success" disabled>Chưa Thi</button>
          default: return 'Đã thi'
        }


      }
    },

    {
      dataField: "creator",
      text: "Creator",
      sort: true,
      formatter: (creator) => {
        switch (creator) {
          case 1: return 'Thái Hưng'
          case 2: return 'Nhung Nguyễn'
          default: return 'Trọng Thắng'
        }
      }
    },
    {
      dataField: "createDate",
      text: "Create date",
      sort: true
    },
    {
      dataField: "candidateID",
      text: "Action",
      sort: false,
      headerAlign: 'center',
      formatter: (action) => {
        return (
          <div>
            <Link
              className="btn btn-warning mx-2"
              to={`/candidates/${action}/editcandidate`}
            >
              Edit
            </Link>
            <button type="button" className="btn btn-danger" onClick={() => deleteCandidate(action)}>Delete</button>
          </div>
        )
      }
    }
  ];

  useEffect(() => {
    getListCandidate(1, size);
  }, [getListCandidate, size]);

  const handleTableChange = (type, { page, sizePerPage, sortField, sortOrder, searchText }) => {
    getListCandidate(page, sizePerPage, sortField, sortOrder, searchText);
  }

  const deleteCandidate = async (id) => {
    if (confirm('You Sure ?')) { //eslint-disable-line
      await CandidateApi.deletetByID(id)
        getListCandidate(1, size);
        showSuccessNotification(
          "Delete Candidate Successfully!");
    }
  }


  return (
    <Container fluid className="p-0">
      <h1 className="h3 mb-3">Candidate</h1>

      <Row>
        <Col>
          <Card>
            <CardBody>
              <ToolkitProvider
                keyField="candidateID"
                data={props.candidates}
                columns={tableColumns}
                search
              >
                {
                  toolkitprops => (
                    <>
                      <Row>
                        <Col>
                          {isVisibleFilter && <Filter />}
                        </Col>
                      </Row>
                      <Row style={{ alignItems: "center" }}>
                        <Col lg="3">
                          <CustomSearch {...toolkitprops.searchProps} />
                        </Col>
                        <Col lg="9">
                          <div className="float-right pull-right">
                            {/* filter button */}
                            <Icon.Filter size="24" className="align-middle mr-2" onClick={() => setVisibleFilter(!isVisibleFilter)} />
                            <Link
                              className="btn btn-primary mx-2"
                              to="/candidates/CandidateAction"
                            >
                              <Icon.PlusCircle size="24" className="align-middle" />
                            </Link>
                          </div>
                        </Col>
                      </Row>

                      <BootstrapTable
                        {...toolkitprops.baseProps}
                        bootstrap4
                        striped
                        hover
                        remote
                        bordered={true}
                        pagination={paginationFactory({
                          page: props.page,
                          sizePerPage: props.size,
                          totalSize: props.totalSize,

                          withFirstAndLast: false,
                          alwaysShowAllBtns: true,

                          hideSizePerPage: true,
                        })}
                        onTableChange={handleTableChange}
                      />
                    </>
                  )
                }
              </ToolkitProvider>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
};


const mapGlobalStateToProps = state => {
  return {
    candidates: selectCandidates(state),
    page: selectPage(state),
    size: selectSize(state),
    totalSize: selectTotalSize(state)
  };
};

export default connect(mapGlobalStateToProps, { getListCandidateAction })(Candidate);