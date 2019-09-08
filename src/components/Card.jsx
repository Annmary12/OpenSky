import React from 'react';

import { Card, CardActionArea, CardMedia } from '@material-ui/core';

// images
import img from '../assets/images/login2.jpg'

const CardComponent = ({ name, image}) => (
  <Card className='card'>
      <CardActionArea>
        <CardMedia
          className=""
          image={image}
          title={name}
        />
      </CardActionArea>
      <h2 className="card__name">
        { name }
      </h2>
    </Card>
)

export default CardComponent;
