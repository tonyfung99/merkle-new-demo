import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function FeedFilterButton({ filterOption, handleChange }) {


    return (
        <ToggleButtonGroup
            color="primary"
            value={filterOption}
            exclusive
            onChange={handleChange}
        >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="Mirror Entry">Article</ToggleButton>
            <ToggleButton value="NFT">NFT</ToggleButton>
        </ToggleButtonGroup>
    );
}
