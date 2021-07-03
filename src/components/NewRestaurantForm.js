import {useState} from "react";
import {connect} from "react-redux";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {createRestaurant} from "../store/restaurants/actions";

export const NewRestaurantForm = ({createRestaurant}) => {
  const [name, setName] = useState("");
  const [validationError, setValidationError] = useState(false);

  function submitForm(event) {
    event.preventDefault();

    if (name) {
      setValidationError(false);
      createRestaurant(name).then(() => {
        setName("");
      });
    } else {
      setValidationError(true);
    }
  }

  return (
    <form onSubmit={submitForm}>
      {validationError && <Alert severity="error">Name is required.</Alert>}
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
