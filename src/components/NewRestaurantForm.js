import {useState} from "react";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {createRestaurant} from "../store/restaurants/actions";

export const NewRestaurantForm = ({createRestaurant}) => {
  const [name, setName] = useState("");

  function submitForm(event) {
    event.preventDefault();
    createRestaurant(name);
  }

  return (
    <form onSubmit={submitForm}>
      <TextField
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Add Restaurant"
        fullWidth
        variant="filled"
      />
      <Button
        variant="contained"
        color="primary"
        data-testid="new-restaurant-submit-button"
        type="submit"
      >
        Add
      </Button>
    </form>
  );
};

const mapStateToProps = null;
const mapDispatchToProps = {createRestaurant};

export default connect(mapStateToProps, mapDispatchToProps)(NewRestaurantForm);
