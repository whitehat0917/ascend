import { SET_USER_ID, SET_DETAILS, SET_QUESTION_DETAILS } from '../actions';

const emptyBody = {
  firstName: null,
  lastName: null,
  country: null,
  email: null,
  mobile: null,
  accountType: null,
  currency: null,
  platform: null,
  birthDate: null,
  nationality: null,
  usTaxCode: null,
  pep: null,
  address: null,
  zipCode: null,
  city: null,
  clientIp: null,
  additionalAddress: null,
}

const emptyQuestionBody = {
  employmentStatus: null,
  employmentIndustry: null,
  employmentEducation: null,
  statusExplain: "",
  industryExplain: "",
  tradingExperience: null,
  tradingLots: null,
  knowledgeMarket: null,
  knowledgeRate: null,
  knowledgeProfit: null,
  fundsSource: null,
  fundsIncome: null,
  fundsInvest: null,
  fundsExplain: ""
}

const userId = localStorage.getItem("userId");
const requestBody = localStorage.getItem("requestBody");
const questionBody = localStorage.getItem("questionBody");
const INIT_STATE = {
  step: 0,
  requestBody: requestBody ? { ...emptyBody, ...JSON.parse(requestBody) } : emptyBody,
  questionBody: questionBody ? { ...emptyQuestionBody, ...JSON.parse(questionBody) } : emptyQuestionBody,
  userId: userId ? userId : 0,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_USER_ID:
      localStorage.setItem("userId", action.payload);
      return { ...state, userId: action.payload };
    case SET_DETAILS:
      localStorage.setItem("requestBody", JSON.stringify({ ...state.requestBody, ...action.payload }));
      return { ...state, requestBody: { ...state.requestBody, ...action.payload } };
    case SET_QUESTION_DETAILS:
      localStorage.setItem("questionBody", JSON.stringify({ ...state.questionBody, ...action.payload }));
      return { ...state, questionBody: { ...state.questionBody, ...action.payload } };
    default:
      return { ...state };
  }
};
