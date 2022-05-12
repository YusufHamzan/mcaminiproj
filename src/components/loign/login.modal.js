import { useState } from "react"
import Modal from '@mui/material/Modal';
import { Button, TextField, Box, Grid, FormLabel, FormGroup, FormHelperText, FormControl } from "@mui/material"
// import http from '../../api-services/utility/http';
import { useFormik } from 'formik';
import { setLoginData } from '../../api-services/utility/userSlice';
import { useDispatch } from 'react-redux';
import useHttp from './../../api-services/utility/use-http';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function LoginModal(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(props.openModal);
  const [isLoading, error, https] = useHttp();

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false)
    }
  }
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: values => {
      const payload = {...values};
      submitForm(payload);

    },
  });

  const submitForm = async  (payload) => {
    const res = await https.post('https://98e1-49-37-39-41.in.ngrok.io/login', payload);
    console.log('res: ', res);
    if (res) {
      localStorage.setItem('user_information', JSON.stringify(res));
      const payloadDispatch = {
        loginState: res.state,
        userName: res.username,
        uuid: res.uuid,
        jwt: res.jwt.access_token
      }
      dispatch(setLoginData(payloadDispatch));
      // navigate('/');
      handleClose();
    }
    
  }


  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        hideBackdrop={false}
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container direction='column' justifyContent='space-between'>
              <Grid item>
                {isLoading && <h1>Loading...</h1>}
                <FormControl
                  required
                  error={error?.status}
                  component="fieldset"
                  sx={{ m: 3 }}
                  variant="standard"
                >
                  <FormLabel>Login</FormLabel>
                  <FormGroup>
                    <TextField
                      id="standard-basic"
                      value={formik.values.username}
                      name='username'
                      onChange={formik.handleChange}
                      label="Username"
                      variant="standard"
                    />
                    <TextField
                      id="standard-basic"
                      value={formik.values.password}
                      name='password'
                      onChange={formik.handleChange}
                      label="Password"
                      variant="standard"
                    />
                    <Button variant='contained' type='submit' >Submit</Button>
                  </FormGroup>
                  <FormHelperText>{error? error.message:''}</FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
          </form>

        </Box>
      </Modal>
    </div>
  );
}