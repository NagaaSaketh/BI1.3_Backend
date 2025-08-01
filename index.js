const { initialiseDB } = require("./db/db.connect");
const Restaurant = require("./models/restaurant.models");
const Hotel = require("./models/hotel.models");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

initialiseDB();

// QUESTION 1

// function to find all the restaurants from the db.

async function readAllRestaurants() {
  try {
    const allRestaurants = await Restaurant.find();
    return allRestaurants;
  } catch (err) {
    throw err;
  }
}

// API Route to get all the restaurants.

app.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await readAllRestaurants();
    if (restaurants.length != 0) {
      res.json(restaurants);
    } else {
      res.json(404).json({ error: "No restaurants found." });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
});

// Question 2

// Finding restaurant by its name.

async function readRestaurantsByName(restaurantName) {
  try {
    const restaurantByName = await Restaurant.findOne({ name: restaurantName });
    return restaurantByName;
  } catch (err) {
    throw err;
  }
}

// API route for getting the restaurant by its name.

app.get("/restaurants/:restaurantName", async (req, res) => {
  try {
    const restaurant = await readRestaurantsByName(req.params.restaurantName);
    if (restaurant) {
      res.json(restaurant);
    } else {
      res.json(404).json({ error: "No restaurants found." });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
});

// Question 3

// Find a restaurant by its phoneNumber from db.

async function readRestaurantByPhoneNumber(phNum) {
  try {
    const restaurantByPhoneNumber = await Restaurant.findOne({
      phoneNumber: phNum,
    });
    return restaurantByPhoneNumber;
  } catch (err) {
    throw err;
  }
}

// API route to get the restaurant by its phone number.

app.get("/restaurants/directory/:phoneNumber", async (req, res) => {
  try {
    const restaurants = await readRestaurantByPhoneNumber(
      req.params.phoneNumber
    );
    if (restaurants) {
      res.json(restaurants);
    } else {
      res.json(404).json({ error: "No restaurants found." });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
});

// Question 4

// Finding a restaurant by its cuisine from DB.

async function readRestaurantByCuisine(cuisine) {
  try {
    const restaurantByCuisine = await Restaurant.find({ cuisine: cuisine });
    return restaurantByCuisine;
  } catch (err) {
    throw err;
  }
}

// API route to get all the cuisines of restaurants.

app.get("/restaurants/cuisine/:cuisineName", async (req, res) => {
  try {
    const restaurants = await readRestaurantByCuisine(req.params.cuisineName);
    if (restaurants.length != 0) {
      res.json(restaurants);
    } else {
      res.json(404).json({ error: "No restaurants found." });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
});

// Question 5

// Find a restaurant by its location from db.

async function readRestaurantByLocation(location) {
  try {
    const restaurantByLocations = await Restaurant.find({ location: location });
    return restaurantByLocations;
  } catch (err) {
    throw err;
  }
}

// API route to get the all the restaurants by its location.

app.get("/restaurants/location/:restaurantLocation", async (req, res) => {
  try {
    const restaurants = await readRestaurantByLocation(
      req.params.restaurantLocation
    );
    if (restaurants.length != 0) {
      res.json(restaurants);
    } else {
      res.json(404).json({ error: "No restaurants found." });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
});

// BE4.1_HW2

// Finding all the hotels from the db.

async function readAllHotels() {
  try {
    const hotels = await Hotel.find();
    return hotels;
  } catch (err) {
    throw err;
  }
}

// API route to get all the hotels.

app.get("/hotels", async (req, res) => {
  try {
    const hotels = await readAllHotels();
    if (hotels.length != 0) {
      res.json(hotels);
    } else {
      res.json(404).json({ error: "No Hotel found." });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch hotels." });
  }
});

// Question 2

// Finding a hotel by its name.

async function readHotelByName(hotelName) {
  try {
    const hotelByName = await Hotel.findOne({ name: hotelName });
    return hotelByName;
  } catch (err) {
    throw err;
  }
}

// API Route to get a hotel by its name.

app.get("/hotels/:hotelName", async (req, res) => {
  try {
    const hotel = await readHotelByName(req.params.hotelName);
    if (hotel) {
      res.json(hotel);
    } else {
      res.status(404).json({ error: "No Hotel found." });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch hotels." });
  }
});

// Question 3

// Find a hotel by its phoneNumber;

async function readHotelsByPhoneNumber(phNum) {
  try {
    const hotelsByPhoneNumber = await Hotel.findOne({ phoneNumber: phNum });
    return hotelsByPhoneNumber;
  } catch (err) {
    throw err;
  }
}

// API route to get a hotel by its phone number.

app.get("/hotels/directory/:phoneNumber", async (req, res) => {
  try {
    const hotel = await readHotelsByPhoneNumber(req.params.phoneNumber);
    if (hotel) {
      res.json(hotel);
    } else {
      res.status(404).json({ error: "No Hotel found." });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch hotels." });
  }
});

// Question 4

// Finding a hotel by its rating.

async function readHotelsByRating(hotelRating) {
  try {
    const hotelsByRating = await Hotel.find({ rating: hotelRating });
    return hotelsByRating;
  } catch (err) {
    throw err;
  }
}

// API route to get the hotels by its rating.

app.get("/hotels/rating/:hotelRating", async (req, res) => {
  try {
    const hotels = await readHotelsByRating(req.params.hotelRating);

    if (hotels.length != 0) {
      res.json(hotels);
    } else {
      res.status(404).json({ error: "No Hotel found." });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch hotels." });
  }
});

// Question 5

// Finding hotel by their category

async function readHotelsByCategory(hotelCategory) {
    try{
    const readHotelsByCategory = await Hotel.find({category:hotelCategory});
    return readHotelsByCategory;
    }catch(err){
        throw(err)
    }
}

// API route to get hotels by their category

app.get("/hotels/category/:hotelCategory",async(req,res)=>{
    try{
        const hotels = await readHotelsByCategory(req.params.hotelCategory);
        if(hotels.length!=0){
            res.json(hotels);
        }else{
            req.status(404).json({error:"No hotel found."})
        }
    }catch(err){
        res.status(500).json({message:"Failed to fetch hotels."})
    }
})


// BE4.2_HW1

// Question 1


async function createRestaurant(newRestaurant) {
  try{
    const restaurant = new Restaurant(newRestaurant);
    const saveRestaurant = await restaurant.save();
    return saveRestaurant;
  }catch(err){
    throw(err)
  }
}

app.post("/restaurants",async(req,res)=>{
  try{
    const savedRestaurant = await createRestaurant(req.body);
    res.status(201).json({message:"Restaurant added successfully.",restaurant:savedRestaurant});
  }catch(err){
    res.status(500).json({error:"Failed to add restaurant"})
  }
})

// BE4.2_HW2

async function createHotel(newHotel) {
  try{
    const hotel = new Hotel(newHotel);
    const saveHotel = await hotel.save();
    return saveHotel;
  }catch(err){
    throw(err)
  }
}

app.post("/hotels",async(req,res)=>{
  try{
    const savedHotel = await createHotel(req.body);
    res.status(201).json({message:"Hotel added successfully.",hotel:savedHotel})
  }catch(err){
    res.status(500).json({error:"Failed to add hotel"})
  }
})

// BE4.3_HW1

async function deleteRestaurant(restaurantId) {
  try{
    const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantId);
    return deletedRestaurant;
  }catch(err){
    console.log("Error occurred in deleting restaurant" , err);
  }
}

app.delete("/restaurants/:restaurantId",async(req,res)=>{
  try{
    const deletedRestaurant = await deleteRestaurant(req.params.restaurantId);
    if(deletedRestaurant){
      res.status(201).json({message:"Restaurant deleted successfully"})
    }else{
      res.status(404).json({error:"No restaurant found"})
    }
  }catch(err){
    res.status(500).json({error:"Failed to delete a restaurant"})
  }
})

// BE4.3_HW2

async function deleteHotel(hotelId) {
  try{
    const deletedHotel = await Hotel.findByIdAndDelete(hotelId);
    return deletedHotel
  }catch(err){
    throw(err)
  }
}

app.delete("/hotels/:hotelId",async(req,res)=>{
  try{
    const deletedHotel = await deleteHotel(req.params.hotelId);
    if(deletedHotel){
      res.status(201).json({message:"Hotel deleted successfully."})
    }else{
      res.status(404).json({error:"No hotel found."})
    }
  }catch(err){
    res.status(500).json({error:"Failed to delete a hotel"})
  }
})


// BE4.4_HW1

async function updateRestaurant(restaurantId,dataToUpdate) {
  try{
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(restaurantId,dataToUpdate)
    return updatedRestaurant;
  }catch(err){
    console.log("Error occurred in updating the restaurant",err)
  }
}

app.post("/restaurants/:restaurantId",async(req,res)=>{
  try{
    const updatedRestaurant = await updateRestaurant(req.params.restaurantId,req.body);
    if(updatedRestaurant){
      res.status(200).json({message:"Restaurant updated successfully",restaurant:updatedRestaurant})
    }else{
      res.status(404).json({message:"No Restaurant found."})
    }
  }catch(err){
    res.status(500).json({error:"Failed to update restaurant"})
  }
})


// BE4.4_HW2

async function updateHotel(hotelId,dataToUpdate) {
  try{
    const updatedHotel = await Hotel.findByIdAndUpdate(hotelId,dataToUpdate)
    return updatedHotel;
  }catch(err){
    throw(err);
  }
}

app.post("/hotels/:hotelId",async(req,res)=>{
  try{
    const updatedHotel = await updateHotel(req.params.hotelId,req.body)
    if(updatedHotel){
      res.status(201).json({message:"Hotel updated successfully.",hotel:updatedHotel})
    }else{
      res.status(404).json({error:"No hotel found."})
    }
  }catch(err){
    res.status(500).json({error:"Failed to update Hotel"})
  }
})

const PORT = 4000;
app.listen(PORT, () => console.log("Server is running on", PORT));
