import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { getActorFilmography } from "../../api/tmdb-api";
import FilmographyCard from "../filmographyCard";
import { useQuery } from "react-query";
import { Grid } from "@mui/material";
import Drawer from "@mui/material/Drawer";

const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};

const ActorDetails = ({ actors }) => {

    const [drawerOpen, setDrawerOpen] = useState(false);

    const { data: filmography, isLoading, isError, error } = useQuery(
        ["filmography", { id: actors.id }],
        getActorFilmography
    );

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <>
            <Typography variant="h5" component="h3">
                {actors.name}
            </Typography>

            <Typography variant="h6" component="p">
                {actors.biography}
            </Typography>

            <Paper
                component="ul"
                sx={root}
            >
                <Chip
                    label={`Popularity rating: ${actors.popularity}`}
                />

                <Chip
                    label={`Date of birth: ${actors.birthday}`}
                />

                <Chip
                    label={`Birthplace: ${actors.place_of_birth}`}
                />

                <Chip
                    label={`Best known for: ${actors.known_for_department}`}
                />
            </Paper>
            <Link to={`https://www.themoviedb.org/person/${actors.id}`} style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
                <Button variant="contained" color="primary" style={{ marginTop: '16px' }}>
                    Learn More
                </Button>
                <br />
            </Link>
            <br />
            <Typography variant="h5" component="h3">
                Movies {actors.name} has starred in.
            </Typography>
            <br />
            <Grid container spacing={2}>
                {filmography && filmography.cast.map((movie) => (
                    <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                        <FilmographyCard movie={movie} />
                    </Grid>
                ))}
            </Grid>

            <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
            </Drawer>
        </>
    );
};
export default ActorDetails;