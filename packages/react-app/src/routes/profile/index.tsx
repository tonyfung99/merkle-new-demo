import * as React from 'react';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Box, Chip, Paper } from '@mui/material';
import PostCard from '../../components/PostCard';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

import Typography from '@mui/material/Typography';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import { Container } from '@mui/system';


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';


const TimeLineNode = ({ children }: { children: any }) => {

    return <TimelineItem>
        <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
            variant="body2"
            color="text.secondary"
        >
            10:00 am
        </TimelineOppositeContent>

        <TimelineSeparator>
            <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
            <TimelineDot >
                <LaptopMacIcon />
            </TimelineDot>
            <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span" color="text.secondary">
                Repeat
            </Typography>
            <Typography color="text.secondary">Because this is the life you love!</Typography>
        </TimelineContent>
    </TimelineItem>
}

const ContributionCard = ({ title, subTitle }) => {
    return <Card sx={{ width: 200 }}>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {title}
            </Typography>
            <Typography variant="h5" component="div">

            </Typography>
            <Typography variant="h1" color="text.secondary" align='center'>
                {subTitle}
            </Typography>
        </CardContent>
    </Card>

}

const Profile = (params: any) => {
    return (
        <Box>
            <Container>
                <Paper variant='outlined' sx={{ margin: 6 }}>

                    <Stack direction={'row'} justifyContent='space-between' margin={4}>
                        <Stack direction="row" spacing={4}>

                            <Avatar
                                alt="Remy Sharp"
                                src="/public/profile-1.jpeg"
                                sx={{ width: 120, height: 120 }}
                            />

                            <Stack direction={'column'} spacing={1} alignContent={'start'}>

                                <Typography variant="h3" color="text.secondary" align='center'>
                                    User Name
                                </Typography>
                                <Typography variant="h6" color="text.secondary" align='center'>
                                    0xAddress
                                </Typography>
                                <Stack direction="row" spacing={2}>

                                    <Chip label="web3" variant="outlined" />
                                    <Chip label="data science" variant="outlined" />
                                </Stack>
                            </Stack>

                        </Stack>
                        <Stack direction="row" spacing={4}>

                            <ContributionCard title='Post written' subTitle={'40'} />
                            <ContributionCard title='Vote' subTitle={'20'} />
                        </Stack>

                    </Stack>
                </Paper>

                <Stack direction={'row'} justifyContent='space-between' margin={2} overflow='auto'>
                    <Box>
                        <PostCard />
                        <PostCard />
                        <PostCard />
                        <PostCard />
                    </Box>
                    <Timeline sx={{ width: 500 }}>
                        <TimeLineNode><PostCard /></TimeLineNode>
                        <TimeLineNode><PostCard /></TimeLineNode>
                        <TimeLineNode><PostCard /></TimeLineNode>
                    </Timeline>
                </Stack>
            </Container>
        </Box>
    )
}

export default Profile