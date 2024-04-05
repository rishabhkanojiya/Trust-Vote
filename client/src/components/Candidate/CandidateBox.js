import React from "react";
import { Box } from "@mui/system";
import Candidate from ".";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Consume } from "../../context/Consumer";
import { VoteContext } from "../../context";

const StyledLink = styled.a`
    cursor: pointer;
    text-decoration: none;
    color: #ce93d8;
    margin: 5px;
`;

const CandidateBox = ({ candidate, voteId }) => {
    const history = useHistory();

    const [c1, c2] = candidate ?? JSON.parse(localStorage.getItem(voteId));
    return (
        <Box sx={{ margin: "20px", display: "flex", alignItems: "center" }}>
            <Candidate candidate={c1} />
            <StyledLink
                onClick={() => {
                    if (!voteId) {
                        history.push(`/vote/${c1.level}`);
                        localStorage.setItem(
                            c1.level,
                            JSON.stringify(candidate),
                        );
                    }
                }}
            >
                Vote
            </StyledLink>
            <Candidate candidate={c2} />
        </Box>
    );
};

export default Consume(CandidateBox, [VoteContext]);
