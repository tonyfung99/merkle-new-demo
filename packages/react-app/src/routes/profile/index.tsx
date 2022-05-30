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

import Unidata from "unidata.js"
import { addresses, abis } from "@merkle-news/contracts";
import { shortenAddress, useCall, useEthers, useLookupAddress } from "@usedapp/core";
import NFTCard from '../../components/NFTCard';

import { Grid } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

import PermIdentityIcon from '@mui/icons-material/PermIdentity';

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
    <TimeLineNode><PostCard /></TimeLineNode>
    <TimeLineNode><PostCard /></TimeLineNode>
    <TimeLineNode><PostCard /></TimeLineNode>
</Timeline>)


const Profile = (params: any) => {

    const ens = useLookupAddress();
    const { account, activateBrowserWallet, deactivate, error, library } = useEthers();

    const [nfts, setNfts] = React.useState([])

    React.useEffect(() => {
        if (!account) return
        const unidata = new Unidata()

        unidata.assets.get({
            identity: account,
            source: 'Ethereum NFT'
        }).then(res => {
            console.log('nft response:')
            console.log(res)
            setNfts(res?.list)
        }).catch(err => {
            console.log('nft eror', err)
        })


        unidata.notes.get({
            identity: account,
            source: 'Mirror Entry',

        }).then(res => {
            console.log('notes response:')
            console.log(res)
            setNfts(res?.list)
        }).catch(err => {
            console.log('notes eror', err)
        })

        unidata.profiles.get({
            source: 'ENS',
            identity: account
        }).then(res => {
            console.log('profile response:')
            console.log(res)
            setNfts(res?.list)
        }).catch(err => {
            console.log('profile eror', err)
        })



    }, [account])

    const [networks, setNetworks] = React.useState([])

    React.useEffect(() => {
        const _networks = nfts.reduce((pre, cur, _, arr) => {
            if (!pre.includes(cur.metadata.network)) {
                pre.push(cur.metadata.network)
                return pre
            }
            return pre
        }, [])

        setNetworks(_networks)
    }, [nfts])

    return (
        <Box>
            <Container>
                <Paper variant='outlined' sx={{ margin: 6 }}>
                    <Grid container spacing={1} justifyContent='space-between' padding={2}>
                        <Grid sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            padding: 3,
                            alignItems: 'center',
                        }} item xs={12} md={8} spacing={2}>
                            <Avatar
                                alt="Remy Sharp"
                                src="/public/profile-1.jpeg"
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
                                <Stack direction="row" spacing={1} alignItems={'center'}>
                                    <LanguageIcon />

                                    {networks.map(n => <Chip label={n} />)}

                                </Stack>
                            </Stack>

                        </Grid>
                        <Grid item xs={12} md={4} sx={{
                            display: 'flex',
                            flexDirection: 'row'
                        }} >

                            <ContributionCard title='Articles' subTitle={'40'} />
                            <ContributionCard title='NFTs' subTitle={nfts.length} />
                        </Grid>
                    </Grid>

                </Paper>

                <Stack direction={'column'} overflow='auto'>


                    <Typography variant="h6" component="span" color="text.secondary">
                        Articles
                    </Typography>

                    <Grid container spacing={1}>

                        {/* {notes.map((n, idx) => <Grid item xs={6} md={6}>
                            <NFTCard asset={n} key={idx} />
                        </Grid>
                        )} */}
                    </Grid>

                    <Typography variant="h6" component="span" color="text.secondary">
                        NFT Collections
                    </Typography>

                    <Grid container spacing={1}>

                        {nfts.map((n, idx) => <Grid item xs={12} sm={6} md={4}>
                            <NFTCard asset={n} key={idx} />
                        </Grid>
                        )}
                    </Grid>



                </Stack>
            </Container>
        </Box>
    )
}

export default Profile