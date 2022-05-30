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
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Chip, Paper } from '@mui/material';

import { CardActionArea } from '@mui/material';
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

interface Metadata {
    collection_address: string,
    network: string,
}

interface AssetItem {
    address: string,
    mime_type: string
}
interface NFTAsset {
    description: string,
    items?: AssetItem[]
    metadata: Metadata,
    tags: (string | 'NFT')[]
}

function NFTCard({ asset }: { asset: NFTAsset }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    const isImage = ['jpg', 'png', 'gif'].includes(asset?.items?.[0]?.address.split('.').pop());

    return (
        <Card sx={{ maxWidth: 345, height: 400, margin: 4 }} >
            <CardActionArea sx={{
                height: '100%', display: 'flex',
                flexDirection: 'column',
                alignContent: 'flex-start',
                alignItems: 'start'
            }}>
                {asset?.items?.[0]?.address ?
                    <CardMedia
                        autoPlay={true}
                        muted={true}
                        loop={true}
                        component={isImage ? "img" : "video"}
                        height="240"
                        image={asset?.items?.[0]?.address}
                        alt={asset.description}
                    /> : <Box height={240} width={345} bgcolor='#6F7E8C' ></Box>}
                <CardContent sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',

                    flex: 1,
                    overflow: 'hidden'
                }}>
                    <Typography gutterBottom variant="body2" color="text.secondary" sx={{ flex: 1, overflow: 'hidden' }}>
                        {asset.description}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                    </Typography> */}
                    <Box >
                        <Chip label={asset?.metadata?.network} />
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}


export default NFTCard