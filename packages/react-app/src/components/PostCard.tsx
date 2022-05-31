import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/AddComment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Link, Chip, Stack } from '@mui/material';

import { useEthers, shortenAddress, useLookupAddress } from "@usedapp/core";
import { useAvatar } from '../utils/hooks';
import { ArticleNote, EventNote, NFTMeta, parseLink } from '../utils/schema';

interface FeedTargetAction {
    type: 'update' | 'add'
    payload: string
    proof: string
}

interface FeedTarget {
    action: FeedTargetAction,
    field: string
}

interface BasicFeed {
    id: string,
    date_created: string,
    date_updated: string,
    summary?: string,
    target?: FeedTarget
}

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}




const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

function PostCard({ feed }: { feed: EventNote }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    // const meta = feed?.metadata?.
    const tag = feed?.tags?.[0]

    const network = tag.split('.')?.[0]
    const assetType = tag

    // const summary = feed?.summary || `I have ${feed?.target?.action?.type}ed a ${assetType} on ${network}`

    const isNFT = tag.includes('NFT')
    const isArticle = tag.includes('Mirror Entry')

    let summary = ''
    if (isNFT) {
        summary = (feed?.metadata as NFTMeta).collection_name
    } else if (isArticle) {
        summary = (feed as ArticleNote).summary
    }

    let title = (feed as ArticleNote).title || ''
    const { library } = useEthers();


    const { identifier: userAddr } = parseLink(feed.authors?.[0]) || {}

    const avatar = useAvatar(userAddr)
    const [displayName, setDisplayName] = React.useState(userAddr)

    React.useEffect(() => {


        library.lookupAddress(userAddr).then(res => {
            setDisplayName(res)
        })


    }, [userAddr])

    // get detail

    return (
        <Card sx={{ flex: 1, margin: 4 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label={feed?.authors?.[0]} src={avatar}>
                        U
                    </Avatar>
                }
                title={displayName}
                subheader={feed.date_updated}
            />

            <CardContent>

                <Typography variant='h3'>
                    {title}
                </Typography>
                <Typography variant='h5'>
                    {summary}
                </Typography>
            </CardContent>
            <Box margin={2}>
                {assetType && <Chip label={assetType} />}
            </Box>

        </Card>
    );
}


export default PostCard