import { URLS } from "../constant/apiUrls";
import ApiService from "./api.service";

export const VoteService = {
    getCandidates(formData) {
        let axiosOptions = { data: formData };
        return ApiService.get(`${URLS.voting}/candidates`, axiosOptions);
    },

    addCandidates(formData) {
        let axiosOptions = { data: formData };
        return ApiService.post(`${URLS.voting}/candidate`, axiosOptions);
    },

    getVoteCount(formData) {
        let axiosOptions = { data: formData };
        return ApiService.get(
            `${URLS.voting}/vote-count/:voteId`,
            axiosOptions,
        );
    },

    addVote(formData) {
        let axiosOptions = { data: formData };
        return ApiService.post(`${URLS.voting}/vote`, axiosOptions);
    },
};
