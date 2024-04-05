import { Button, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ShowPopupContext } from "../../context";
import { Consume } from "../../context/Consumer";
import { VoteService } from "../../services/vote.services";
import CandidateBox from "../Candidate/CandidateBox";

const Vote = ({ ShowPopupData }) => {
    const { voteId } = useParams();

    const history = useHistory();
    const { control, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try {
            await VoteService.addVote(data);
            history.push("/");
        } catch (err) {
            ShowPopupData.setPopupMessageObj(err.response.data.error, "error");
        }
    };

    const renderOptions = () => {
        const candidate = JSON.parse(localStorage.getItem(voteId));
        return candidate.map((candidate) => {
            return (
                <FormControlLabel
                    value={candidate.id}
                    control={<Radio />}
                    label={candidate.name}
                />
            );
        });
    };

    return (
        <>
            <Box
                sx={{
                    padding: "20px",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <CandidateBox voteId={voteId} />

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="candidate_id"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <RadioGroup {...field} row>
                                {renderOptions()}
                            </RadioGroup>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Box>
        </>
    );
};

export default Consume(Vote, [ShowPopupContext]);
