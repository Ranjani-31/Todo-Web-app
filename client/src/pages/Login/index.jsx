import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Login() {
  return (
    <div className="d-flex d-column justify-content-center align-items-center vh-100">
      <form className="d-flex flex-column ">
        <TextField id="standard-basic" label="Email" variant="standard" />
        <TextField id="standard-basic" label="Password" variant="standard" />
        <Button color="secondary" loadingPosition="start" variant="contained">
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
