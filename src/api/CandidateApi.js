import Api from './Api';

const url = "/candidates";

const getAll = (page, size, sortField, sortOrder, search) => {
    if (sortField === null || sortOrder === undefined) {
        sortField = "candidateID";
        sortOrder = "desc";
    }
    const requestParams = {
        page,
        size,
        sort: `${sortField},${sortOrder}`,
        search
    }
    return Api.get(url, { params: requestParams });
};
const existsByPhone = (phoneNumber) => {
    return Api.get(`${url}/phoneNumber/${phoneNumber}`);
};

const createCandidate = (body) => {
    return Api.post(url, body);
};

const updateCandidate = (candidateID, body) => {
    return Api.put(`${url}/${candidateID}`, body);
};

const getByID = (candidateID) => {
    return Api.get(`${url}/${candidateID}`);
};

const deletetByID = (candidateID) => {
    return Api.delete(`${url}/${candidateID}`);
};

// export
const api = { getAll,existsByPhone,createCandidate,updateCandidate,getByID,deletetByID }
export default api;