import logoutAPi from "./logout";
import createVerifierAPI from "./adminApis/createVerifier";
import getVerifiersAPI from "./adminApis/getVerifier";
import createLoanAPI from "./userApis/createLoan";
import getLoanAPI from "./userApis/getLoan";
import getVerifierLoanAPI from "./verifierApis/getLoans";
import getadminLoansAPI from './adminApis/getLoans';
import getUsersAPI from "./adminApis/getUsers";
import updateLoanAPI from "./verifierApis/updateLoans";
export {
    getVerifiersAPI,
    createVerifierAPI,
    createLoanAPI,
    getLoanAPI,
    getadminLoansAPI,
    getVerifierLoanAPI,
    getUsersAPI,
    updateLoanAPI,
    logoutAPi
}
