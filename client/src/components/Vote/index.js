import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Radio, RadioGroup, FormControlLabel, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { Box } from "@mui/system";
import CandidateBox from "../Candidate/CandidateBox";
import { Consume } from "../../context/Consumer";
import { ShowPopupContext, VoteContext } from "../../context";
import { VoteService } from "../../services/vote.services";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

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
