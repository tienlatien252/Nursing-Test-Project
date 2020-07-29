import React from 'react';

import useStyles from '../theme.js';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

export default function Creators() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        title="Name"
      />
      <CardMedia
        className={classes.media}
        image="https://www.cowgirlcontractcleaning.com/wp-content/uploads/sites/360/2018/05/placeholder-img.jpg"
        title="Image Placeholder"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Description.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="GitHub">
          <GitHubIcon />
        </IconButton>
        <IconButton aria-label="LinkedIn">
          <LinkedInIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
