import { Box, Link, Paper, TextareaAutosize } from '@mui/material';
import * as React from 'react';
import PostCard from '../../components/PostCard';

const Feeds = (params: any) => {

    const [userPostInfos, setUserPostInfos] = React.useState([]);
    {/* <Image src={logo} alt="ethereum-logo" /> */ }

    return (
        <Box>

            {/* <Paper>

                <TextareaAutosize

                    maxRows={4}
                    aria-label="maximum height"
                    placeholder="Maximum 4 rows"
                    defaultValue="Enter your article here"
                    style={{ width: '100%', margin: 20, backgroundColor: 'clear' }}
                />
            </Paper> */}


            <PostCard />
            <PostCard />
            <PostCard />

        </Box>
    )

}


export default Feeds