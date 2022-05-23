import * as React from 'react';
import { Box } from "@mui/material";


const Image = ({ src, sx }) => <Box
    component="img"
    sx={sx}
    alt="Image."
    src={src}
/>

export default Image