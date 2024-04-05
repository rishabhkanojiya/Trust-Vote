import React from "react";
import { Box } from "@mui/system";
import CandidateBox from "../Candidate/CandidateBox";
import { VoteContext } from "../../context";
import { Consume } from "../../context/Consumer";

const renderCandidateBox = (candidates) => {
    return Object.values(candidates || {})?.map((candidate) => {
        return <CandidateBox candidate={candidate} />;
    });
};

const CanInfo = ({ VoteData }) => {
    return (
        <Box
            sx={{
                padding: "20px",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                flexWrap: "wrap",
            }}
        >
            {renderCandidateBox(VoteData.data)}
        </Box>
    );
};

export default Consume(CanInfo, [VoteContext]);
