import { Box, Link, Paper, Stack, TextareaAutosize, Button } from '@mui/material';
import * as React from 'react';
import PostCard from '../../components/PostCard';

// import { makeStyles } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Unidata from "unidata.js"
import { createPost, useFeeds } from '../../utils/hooks';

const useStyles: () => any = makeStyles({
    textAreaWithStyle: {
        background: 'linear-gradient(45deg, #FDED8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '2px 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'black',
        padding: '20px 30px',
        fontSize: '20px',
        minHeight: 100,
        resize: 'none',
        flex: 1
    },
    textAreaWithoutStyle: {
        resize: 'none',
    },
});

function MaxHeightTextarea({ value, onChange }) {
    const classes = useStyles();

    const returnStyleBasedOnInput = () => {
        return classes.textAreaWithStyle;
    };



    return (
        <TextareaAutosize
            placeholder='Write your article here.'
            maxRows={4}
            className={returnStyleBasedOnInput()}
            value={value}
            onChange={onChange}
        />
    );
}

const Feeds = (params: any) => {

    const [userPostInfos, setUserPostInfos] = React.useState([]);
    {/* <Image src={logo} alt="ethereum-logo" /> */ }
    const feeds = useFeeds(['0xd8da6bf26964af9d7eed9e03e53415d37aa96045'], ['NFT', 'Mirror Entry']) || []

    const [valueOfInput, setValueOfInput] = React.useState('');

    const onInputChange = (e) => {
        setValueOfInput(e.target.value);
    };

    const onPost = async () => {
        await createPost(valueOfInput)
        setValueOfInput('')
    }

    return (
        <Box overflow={'hidden'}>

            <Paper sx={{ margin: 4, display: 'flex' }}>
                <MaxHeightTextarea value={valueOfInput} onChange={onInputChange} />

                <Button title='Post' onClick={() => onPost()}>Post</Button>
            </Paper>

            <Stack overflow={'auto'}>
                {feeds?.map((f, idx) => <PostCard feed={f} key={idx} />)}
            </Stack>


        </Box>
    )

}


export default Feeds