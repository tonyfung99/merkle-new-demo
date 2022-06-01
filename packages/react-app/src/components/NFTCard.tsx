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
import { MediaNote, NFTMeta, MIMEContent } from '../utils/schema';

import { useNavigate } from '@reach/router';

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


function NFTCard({ note }: { note: MediaNote }) {
    const [expanded, setExpanded] = React.useState(false);
    const navigate = useNavigate();
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const nftMeta: NFTMeta = (note?.metadata as NFTMeta)
    const media_url = note?.attachments?.find(att => att.type === 'preview')?.address

    const isImage = ['jpg', 'png', 'gif', 'svg'].includes(media_url?.split('.')?.pop());

    console.log('media', note?.attachments?.find(att => att.type === 'preview'), media_url)

    return (
        <Card sx={{ maxWidth: 345, height: 400, margin: 4 }} >
            <CardActionArea sx={{
                height: '100%', display: 'flex',
                flexDirection: 'column',
                alignContent: 'flex-start',
                alignItems: 'start'
            }} onClick={() => {
                navigate(note.related_urls.pop())
            }}>
                {media_url ?
                    <CardMedia
                        autoPlay={true}
                        muted={true}
                        loop={true}
                        component={isImage ? "img" : "video"}
                        height="240"
                        image={media_url}
                        alt={note.title}
                    /> : <Box height={240} width={345} bgcolor='#6F7E8C' ></Box>}
                <CardContent sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',

                    flex: 1,
                    overflow: 'hidden'
                }}>
                    <Typography gutterBottom variant="body2" color="text.secondary" sx={{ flex: 1, overflow: 'hidden' }}>
                        {note.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ height: 60, overflow: 'hidden' }}>
                        {note.summary}
                    </Typography>
                    <Box >
                        <Chip label={note?.metadata?.network} />
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}


export default NFTCard