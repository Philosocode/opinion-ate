import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import RestaurantList from "./RestaurantList";

const RestaurantScreen = () => (
  <Card> {/* Outline */}
    <CardContent> {/* Padding */}
      <Typography variant="h5">Restaurants</Typography>
      <RestaurantList />
    </CardContent>
  </Card>
);

export default RestaurantScreen;
