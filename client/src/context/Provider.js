import { values } from "lodash";
import React, { useState } from "react";
import { LoginContext, ShowPopupContext, VoteContext } from ".";
import { apiError, apiErrorAPi } from "../constant/errors";

export const ShowPopupProvider = (props) => {
    let [messageObj, setMessage] = useState({});
    let [showPopup, setShowPopup] = useState(false);

    const setPopupMessageObjKey = (sKey, errorCodeP, callback) => {
        const val = apiError(sKey, errorCodeP);
        setMessage(val);
        setShowPopup(true);

        if (showPopup) {
            if (callback) {
                callback();
            }
        }
    };

    const setPopupMessageObj = (res, state) => {
        let msg;
        setShowPopup(true);
        switch (state) {
            case "error":
                console.log(res);
                if (res?.meta?.errors) {
                    msg = values(res.meta.errors)[0];
                } else if (typeof res == "string") {
                    msg = res;
                } else {
                    msg = apiErrorAPi(res);
                }

                setMessage({ state, msg });
                break;

            case "success":
                msg = apiErrorAPi(res);
                setMessage({ state, msg });
                break;

            default:
                break;
        }
    };

    return (
        <ShowPopupContext.Provider
            value={{
                data: messageObj,
                showPopup,
                setPopupMessageObjKey,
                setPopupMessageObj,
                setShowPopup,
            }}
        >
            {props.children}
        </ShowPopupContext.Provider>
    );
};

export const LoginProvider = (props) => {
    const [user, setUser] = useState(null);
    const [dataLength, setDataLength] = useState(0);

    function setUserObj(userVal) {
        setUser(userVal);

        return userVal;
    }

    const delUserObj = () => {
        setUser(null);
    };

    return (
        <LoginContext.Provider
            value={{
                data: user,
                setUserObj,
                delUserObj,
                dataLength,
                setDataLength,
            }}
        >
            {props.children}
        </LoginContext.Provider>
    );
};

export const VoteProvider = (props) => {
    const [candidates, setCandidates] = useState();
    const [candidate, setCandidate] = useState();

    function setCandidateObj(candidates) {
        const groupByCandidates = candidates.reduce((group, candidate) => {
            const { level } = candidate;
            group[level] = group[level] ?? [];
            group[level].push(candidate);
            return group;
        }, {});

        setCandidates(groupByCandidates);

        return groupByCandidates;
    }

    return (
        <VoteContext.Provider
            value={{
                data: candidates,
                setCandidateObj,
                candidate,
                setCandidate,
            }}
        >
            {props.children}
        </VoteContext.Provider>
    );
};
