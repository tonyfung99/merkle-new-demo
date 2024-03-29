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
import { MediaNote, NFTMeta, parseLink } from '../utils/schema';
import ReactMarkdown from 'react-markdown'
import NFTCard from './NFTCard';

import { CardActionArea } from '@mui/material';
import { useNavigate } from '@reach/router';

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

function PostCard({ feed }: { feed: MediaNote }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    // const meta = feed?.metadata?.
    const tag = feed?.tags?.[0]

    const network = feed?.metadata?.network
    const assetType = tag

    // const summary = feed?.summary || `I have ${feed?.target?.action?.type}ed a ${assetType} on ${network}`

    const isNFT = tag.includes('NFT')
    const isArticle = tag.includes('Mirror Entry')

    const { identifier: userAddr } = parseLink(feed.authors?.[0]) || {}


    let summary = feed?.summary

    // } else if (isArticle) {
    //     summary = (feed as ArticleNote).summary
    // }

    let title = feed?.title || ''

    if (isNFT) {
        const nftMeta = (feed?.metadata as NFTMeta)
        summary = `I have ${nftMeta.to == userAddr ? 'received' : 'sent'} an NFT from ${nftMeta.from}`
        title = ''
    }

    const { library } = useEthers();
    const navigate = useNavigate();

    const avatar = null
    const [displayName, setDisplayName] = React.useState(userAddr)


    // React.useEffect(() => {
    //     library.lookupAddress(userAddr).then(res => {
    //         if (res) {
    //             setDisplayName(res)
    //         }
    //     }).catch(err => console.log('cannot lookup', err))
    // }, [userAddr])

    // get detail

    return (
        <Card sx={{ flex: 1, margin: 4 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label={feed?.authors?.[0]} src={avatar}>
                        {displayName?.substring(0, 3)}
                    </Avatar>
                }
                title={displayName}
                subheader={feed.date_updated}
            />
            <CardActionArea onClick={() => {
                navigate(feed.related_urls.pop())
            }}>

                <CardContent>

                    <Typography variant='h3'>
                        {title}
                    </Typography>
                    {isArticle ?
                        (<ReactMarkdown>
                            {summary}
                        </ReactMarkdown>) : <Box>

                            <Typography variant='body1'>
                                {summary}

                            </Typography>
                            <NFTCard note={feed} />
                        </Box>
                    }

                </CardContent>
            </CardActionArea>
            <Box margin={2}>
                {assetType && <Chip label={assetType} />}
            </Box>

        </Card>
    );
}


export default PostCard