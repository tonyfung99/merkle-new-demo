import { Box, Link, Paper, Stack, TextareaAutosize, Button } from '@mui/material';
import * as React from 'react';
import PostCard from '../../components/PostCard';

// import { makeStyles } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Unidata from "unidata.js"
import { createPost } from '../../utils/hooks';
import { buildLink, MediaNote } from '../../utils/schema';
import FeedFilterButton from '../../components/FeedFilterButton'
import axios from 'axios'

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

const HARDCODED = ['0x7b47640ed97Cc08Aa188Ae091eFAb2CF3eF48469',
    '0x5AcABC3222A7b74884bEC8efe28A7A69A7920818',
    '0xF1650d925DFfC086aC720ca976DD01542A7f528d',
    '0xE43a21Ee76b591fe6E479da8a8a388FCfea6F77F']

const Feeds = (params: any) => {

    const [userPostInfos, setUserPostInfos] = React.useState([]);
    {/* <Image src={logo} alt="ethereum-logo" /> */ }

    const [valueOfInput, setValueOfInput] = React.useState('');

    const onInputChange = (e) => {
        setValueOfInput(e.target.value);
    };

    const onPost = async () => {
        await createPost(valueOfInput)
        setValueOfInput('')
    }

    console.warn('Feed Rerendering')

    const [filterOption, setFilterOption] = React.useState<'all' | 'Mirror Entry' | 'NFT'>('all');

    const [feeds, setFeeds] = React.useState<MediaNote[]>([])
    const [addresses, setAddresses] = React.useState(HARDCODED)

    React.useEffect(() => {
        const tags = filterOption === 'all' ? ['Mirror Entry', 'NFT'] : [filterOption]

        if (!addresses) {
            return
        }

        const body = {
            addresses: addresses.map(addr => buildLink(addr)),
            tags: tags
        }

        const route = `https://pregod.rss3.dev/v0.4.0/notes`
        axios.post(route, body).then(res => {
            console.log(res.data)
            setFeeds(res.data.list)
        })
    }, [addresses, filterOption])



    const filterChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: 'all' | 'Mirror Entry' | 'NFT',
    ) => {
        setFilterOption(newAlignment);
    };

    return (
        <Box overflow={'hidden'}>

            {/* <Paper sx={{ margin: 4, display: 'flex' }}>
                <MaxHeightTextarea value={valueOfInput} onChange={onInputChange} />

                <Button title='Post' onClick={() => onPost()}>Post</Button>
            </Paper> */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'end',
                paddingRight: 6
            }}>
                <FeedFilterButton filterOption={filterOption} handleChange={filterChange} />
            </Box>
            <Stack overflow={'auto'}>
                {feeds?.map((f, idx) => <PostCard feed={f} key={idx} />)}
            </Stack>


        </Box>
    )

}


export default Feeds