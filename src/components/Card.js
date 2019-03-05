import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import no_image from '../asset/no_image.png';

const styles = {
  card: {
  },
  media: {
    objectFit: 'cover',
  },
};

function ImgMediaCard(props) {
  const { classes, title, img, gameId } = props;
  const handleClick = (e) => {
    e.stopPropagation();
    props.handleClick(gameId);
  }
  return (
    <Card className={classes.card} onClick={handleClick}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Game Image"
          className={classes.media}
          height="140"
          image={img?img:no_image}
          title="Game Image"
        />
        <CardContent>
          <Typography gutterBottom variant="subtitle1" component="h5" noWrap={true}>
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgMediaCard);