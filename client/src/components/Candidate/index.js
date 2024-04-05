import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function Candidate({ candidate: { id, name, level } }) {
    return (
        <Card sx={{ maxWidth: 345 }} fluid>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image="https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcTS8b7FOAAhCCDZp_OHawNMrrHi5yBQu4jbroMx5nSUiftM-jROP8m1c3KRlw0B0hVURlNl1V33uXhUHZg"
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
