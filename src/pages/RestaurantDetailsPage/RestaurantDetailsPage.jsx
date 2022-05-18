import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import RestaurantCard from './RestaurantCard'
import { useState } from 'react'
import { Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography, Modal } from '@material-ui/core'
// import {UnprotectedPage} from './UnprotectedPage'
// import { useParams } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    // maxWidth: 400,
  },
  media: {
    height: 140,
  },
});

const RestaurantDetailsPage = () => {
  const [restaurants, setRestaurants] = useState([])
  const [restaurantDetail, setRestaurantDetail] = useState([])
  const [pedido, setPedido] = useState([])
  const [open, setOpen] = React.useState(false);



  const classes = useStyles();
  // const navigate = useNavigate()
  // useUnprotectedPage()

  // const params = useParams()

  //pegar endpoint Get Restaurant 
  useEffect(() => {
    // const token = localStorage.getItem('token')
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlpqZXJMOXA3UXJoUEw1VWlSS0F4IiwibmFtZSI6IkF0cm9kZXYiLCJlbWFpbCI6ImFzdHJvZGV2QGZ1dHVyZTQuY29tIiwiY3BmIjoiMTExMTMyMTU0NjU0NjUiLCJoYXNBZGRyZXNzIjp0cnVlLCJhZGRyZXNzIjoiYXNkYXNkLCBhc2Rhc2QsIGFzZGFzZCAtIGFzZGFzZCIsImlhdCI6MTY1Mjg3NzM3Nn0.RfMX0FV19RyGfvcbIuMI_CkIz8kBzMCaNiG6UAEIri0'
    axios
      .get(
        `https://us-central1-missao-newton.cloudfunctions.net/fourFoodA/restaurants`,
        {
          headers: {
            auth: token
          }
        }
      )
      .then((response) => {
        console.log('Restaurantes', response.data.restaurants)
        setRestaurants(response.data.restaurants)
      })
      .catch((error) => {
        console.log('Deu Erro!!', error.response)
      });
  }, []);

  //pegar endpoint Get Restaurant Detail 
  useEffect(() => {
    // const token = localStorage.getItem('token')
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlpqZXJMOXA3UXJoUEw1VWlSS0F4IiwibmFtZSI6IkF0cm9kZXYiLCJlbWFpbCI6ImFzdHJvZGV2QGZ1dHVyZTQuY29tIiwiY3BmIjoiMTExMTMyMTU0NjU0NjUiLCJoYXNBZGRyZXNzIjp0cnVlLCJhZGRyZXNzIjoiYXNkYXNkLCBhc2Rhc2QsIGFzZGFzZCAtIGFzZGFzZCIsImlhdCI6MTY1Mjg3NzM3Nn0.RfMX0FV19RyGfvcbIuMI_CkIz8kBzMCaNiG6UAEIri0'
    axios
      .get(
        `https://us-central1-missao-newton.cloudfunctions.net/fourFoodA/restaurants/1`,
        {
          headers: {
            auth: token
          }
        })
      .then((response) => {
        console.log('Restaurante', response.data.restaurant.products)
        setRestaurantDetail(response.data.restaurant.products)
      })
      .catch((error) => {
        console.log('erro!!', error.response.data.message)
      });
  }, []);

  //fazer map  para popular com os cards das comidas
  const cardFood = restaurantDetail && restaurantDetail.map((foods) => {

    return (
      <RestaurantCard
        key={foods.id}
        photoUrl={foods.photoUrl}
        name={foods.name}
        description={foods.description}
        price={foods.price}
        
      // remover={() => onClickRemover(foods.id)}
      >
    
      </RestaurantCard>
    )
  })



  // const onClickAdicionar = ((id) => {
  //   setPedido()
  //   console.log('adicionou')
  // })

  // const onClickRemover = ((id) => {
  //   console.log('removeu')
  // })

  return (
    <div>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            // image={restaurants[0].logoUrl}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="body2" component="p">
              {/* {restaurants[0].name} */}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {/* {restaurants[0].category} */}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {/* {restaurants[0].deliveryTime}min - Frete R${restaurants[0].shipping},00 */}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {/* {restaurants[0].address} */}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <div>

      </div>


      {cardFood}

    </div>
  )
}

export default RestaurantDetailsPage