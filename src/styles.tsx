import createTheme from "@mui/material/styles/createTheme";

const theme = createTheme({
    palette: {
        primary: {
            // Color associated with environment green as described here:
            // https://encycolorpedia.com/494c3f#:~:text=Paints-,Australian%20Standard%20AS2700%20G66%20Environment%20Green%20%2F%20%23494c3f%20Hex%20Color%20Code,%25%20green%20and%2024.71%25%20blue.
            main: '#008000'
        }
    }
});

export default theme;