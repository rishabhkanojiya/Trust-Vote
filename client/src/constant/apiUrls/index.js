import environment from "../../environment";

export const URLS = {
    registerUser: `${environment.USER_API_URL}/v1.0/user/register`,
    loginUser: `${environment.USER_API_URL}/v1.0/user/login`,
    logoutUser: `${environment.USER_API_URL}/v1.0/user/logout`,
    forgotPassword: `${environment.USER_API_URL}/v1.0/user/forgot-password`,
    resetPassword: `${environment.USER_API_URL}/v1.0/user/reset-password`,
    me: `${environment.USER_API_URL}/v1.0/user/me`,

    voting: `${environment.VOTE_API_URL}`,
};
