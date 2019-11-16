window.addEventListener('load',()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            console.log(long + " "+ lat);

            $.ajax({  
                url: "https://developers.zomato.com/api/v2.1/search?lat={lat}&lon={lon}",
                dataType: 'json',
                async: true,
                beforeSend: function(xhr){xhr.setRequestHeader('user-key', 
                'fc2b013aa490ad13d6567fb3778bc59c');},  // This inserts the api key into the HTTP header
                success: function(response) { 
                    // console.log(response) 
                    const data = response.restaurants;
                    //document.body.innerHTML = response.restaurants[0].restaurant.name;
                    console.log(data);
                    
                    data.forEach(obj => {
                        Object.entries(obj).forEach(([key, value]) => {
                            var restaurant_name = `${value.name}`;
                            var restaurant_id = `${value.id}`
                            var restaurant_address = `${value.location.address}`
                            var restaurant_zipcode = `${value.location.zipcode}`
                            var restaurant_phone = `${value.phone_numbers}`
                            var restaurant_cuisines = `${value.cuisines}`
                            var restaurant_rating = `${value.user_rating.aggregate_rating}`
                            var restaurant_photo = `${value.photos[0].photo.url}`
                            console.log(
                                restaurant_photo +"\n"+ `${value.id} \n  ${value.location.address} \n ${value.location.zipcode} \n ${value.phone_numbers} \n ${value.cuisines} \n ${value.user_rating.aggregate_rating}`);
                            
                        });
                        console.log('-------------------');
                    });

                } 
            });

        })
    }
})

