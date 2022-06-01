import * as React from 'react';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Box, Chip, Paper, Badge } from '@mui/material';
import PostCard from '../../components/PostCard';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

import Typography from '@mui/material/Typography';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import { Container } from '@mui/system';


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

import Unidata from "unidata.js"

import { shortenAddress, useCall, useEthers, useLookupAddress } from "@usedapp/core";
import NFTCard from '../../components/NFTCard';

import { Grid } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { useAvatar, useProfileFeed } from '../../utils/hooks';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { parseLink } from '../../utils/schema';




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
    return <Card sx={{ width: 200, height: 140, margin: 1 }}>
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

const TimeLinePart = () => (<Timeline sx={{ width: 500 }}>
    <TimeLineNode><Box></Box></TimeLineNode>
    <TimeLineNode><Box></Box></TimeLineNode>
    <TimeLineNode><Box></Box></TimeLineNode>

</Timeline>)

const UserHeader = ({ avatar, ens, account, feeds, nfts }) => {

    return <Paper variant='outlined' sx={{ margin: 6 }}>
        <Grid container spacing={1} justifyContent='space-between' padding={2}>

            <Grid sx={{
                display: 'flex',
                flexDirection: 'row',
                padding: 3,
                alignItems: 'center',
            }} item xs={12} md={8} >
                <Avatar
                    alt={ens || 'User'}
                    src={avatar}
                    sx={{ width: 120, height: 120, marginRight: 4 }}
                />

                <Stack direction={'column'} spacing={1} alignContent={'start'} alignItems='start'>

                    <Typography variant="h3" color="text.secondary" align='center'>
                        {ens}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align='center'>
                        {account}
                    </Typography>

                    <Stack direction="row" spacing={1} alignItems={'center'}>
                        <PermIdentityIcon />
                        <Chip label="Collector" variant="outlined" />
                        <Chip label="Author" variant="outlined" />
                    </Stack>
                    {/* <Stack direction="row" spacing={1} alignItems={'center'}>
                <LanguageIcon />
                {networks.map(n => <Chip label={n} />)}
            </Stack> */}
                </Stack>

            </Grid>
            <Grid item xs={12} md={4} sx={{
                display: 'flex',
                flexDirection: 'row'
            }} >
                <ContributionCard title='Articles' subTitle={feeds.length} />
                <ContributionCard title='NFTs' subTitle={nfts.length} />
            </Grid>

        </Grid>

    </Paper>
}
const Profile = (params: any) => {

    // todo:  remove assuming current use 
    const ens = useLookupAddress()
    const { account, activateBrowserWallet, deactivate, error, library } = useEthers();

    const avatar = useAvatar(account)
    // const feeds = []
    // const nfts = []
    const feeds = useProfileFeed(account, 'Mirror Entry') ?? []
    const nfts = useProfileFeed(account, 'NFT')?.filter(feed => feed.metadata.to === parseLink(feed.authors[0]).identifier) ?? []

    console.warn('Profile Rerendering')



    const [tab, setTab] = React.useState('feed');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue);
    };

    return (
        <Box>
            <Container>
                <UserHeader avatar={avatar} ens={ens} account={account} feeds={feeds} nfts={nfts} />


                <Stack direction={'column'} overflow='auto'>


                    <TabContext value={tab}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="Profile Section" variant='fullWidth'>


                                <Tab label={<Box >Articles<Chip sx={{ marginLeft: 1 }} label={feeds.length} /></Box>} value="feed" />

                                <Tab label={<Box >NFT Collections<Chip sx={{ marginLeft: 1 }} label={nfts.length} /></Box>} value="nft" />

                            </TabList>
                        </Box>
                        <TabPanel value="feed">
                            <Stack overflow={'auto'}>
                                {feeds.map((f, idx) => <PostCard feed={f} key={idx} />)}
                            </Stack>

                        </TabPanel>
                        <TabPanel value="nft">


                            <Grid container spacing={1}>

                                {nfts.map((n, idx) => <Grid item xs={12} sm={6} md={4} key={idx}>
                                    <NFTCard note={n} />
                                </Grid>
                                )}
                            </Grid>

                        </TabPanel>
                    </TabContext>



                </Stack>
            </Container>
        </Box>
    )
}

export default Profile