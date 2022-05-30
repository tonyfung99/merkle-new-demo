import { Box, Link, Paper, Stack, TextareaAutosize } from '@mui/material';
import * as React from 'react';
import PostCard from '../../components/PostCard';

// import { makeStyles } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Unidata from "unidata.js"

const useStyles: () => any = makeStyles({
    textAreaWithStyle: {
        background: 'linear-gradient(45deg, #FDED8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '2px 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
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

function MaxHeightTextarea() {
    const classes = useStyles();
    const [valueOfInput, setValueOfInput] = React.useState('');

    const returnStyleBasedOnInput = () => {
        return classes.textAreaWithStyle;
    };

    const onInputChange = (e) => {
        setValueOfInput(e.target.value);
    };

    return (
        <TextareaAutosize
            placeholder='Write your article here.'
            maxRows={4}
            className={returnStyleBasedOnInput()}
            value={valueOfInput}
            onChange={onInputChange}
        />
    );
}

const Feeds = (params: any) => {

    const [userPostInfos, setUserPostInfos] = React.useState([]);
    {/* <Image src={logo} alt="ethereum-logo" /> */ }

    const unidata = new Unidata()

    unidata.assets.get({
        identity: '0x7b47640ed97Cc08Aa188Ae091eFAb2CF3eF48469',
        source: 'Ethereum NFT',
        limit: 10
    }).then(res => {
        console.log('unidata response:')
        console.log(res)
    }).catch(err => {
        console.log('unidata eror', err)
    })

    return (
        <Box overflow={'hidden'}>

            <Paper sx={{ margin: 4, display: 'flex' }}>
                <MaxHeightTextarea />
                {/* <TextareaAutosize

                    maxRows={4}
                    aria-label="maximum height"
                    placeholder="Maximum 4 rows"
                    defaultValue="Enter your article here"
                    style={{
                        width: '100%', flex: 1,
                        backfaceVisibility: 'hidden',
                        backgroundColor: 'transparent',
                        color: 'white',
                        border: '0px'
                    }}
                /> */}
            </Paper>

            <Stack overflow={'auto'}>

                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
            </Stack>


        </Box>
    )

}


export default Feeds