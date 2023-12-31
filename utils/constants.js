const OK_STATUS = 200;
const CREATED_SUCCESS_STATUS = 201;
const BAD_REQUEST_ERROR = 400;
const UNAUTHORIZED_ERROR = 401;
const FORBIDDEN_STATUS = 403;
const NOT_FOUND_ERROR = 404;
const CONFLICT_ERROR = 409;
const INTERNAL_SERVER_ERROR = 500;
const REG_EXP_LINK = /(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com)))(:\d{2,5})?((\/.+)+)?\/?#?/;

module.exports = {
  OK_STATUS,
  CREATED_SUCCESS_STATUS,
  UNAUTHORIZED_ERROR,
  FORBIDDEN_STATUS,
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  CONFLICT_ERROR,
  INTERNAL_SERVER_ERROR,
  REG_EXP_LINK,
};
