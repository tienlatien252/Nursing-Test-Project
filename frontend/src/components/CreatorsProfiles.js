import React from 'react';
import { Grid } from '@material-ui/core';
import creatorsProfiles from '../content/creatorsProfiles.js';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const CreatorProfile = props => {
    const { name, description, imageUrl } = props;
    return (
      <Card>
        <CardHeader
          title={name}
        />
        <CardMedia style={{ height: "150px" }} image={imageUrl} />
        <CardContent>
          <Typography variant="body2" component="p">
            {description}
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
  };

const CreatorsProfiles = () => {
  const getCreatorProfile = creatorProfile => {
    return (
      <Grid item xs={12} sm={4}>
        <CreatorProfile {...creatorProfile} />
      </Grid>
    )
  }

  return (
    <Grid container spacing={2}>
      {creatorsProfiles.map(creatorProfile => getCreatorProfile(creatorProfile))}
    </Grid>
  )
}
  
export default CreatorsProfiles;