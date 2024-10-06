import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, Box, Grid } from '@mui/material';
import { createVerifierAPI } from '../../api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone number is not valid').required('Phone number is required'),
  address: Yup.string().required('Address is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const CreateVerifier: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const response = await createVerifierAPI(values);
        console.log(response.data);
        toast.success('Verifier registered successfully!');
        resetForm();
      } catch (error) {
        console.error(error);
        toast.error('Error registering verifier');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box
      className="max-w-md bg-white rounded shadow-md x-auto"
      component="form"
      onSubmit={formik.handleSubmit}
    >

      {/* Name Field */}
      <TextField
        fullWidth
        id="name"
        name="name"
        label="Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        margin="normal"
        className="mb-4"
      />

      {/* Email and Phone Fields in a Single Line */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            id="phone"
            name="phone"
            label="Phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            margin="normal"
          />
        </Grid>
      </Grid>

      {/* Address Field as a TextArea */}
      <TextField
        fullWidth
        id="address"
        name="address"
        label="Address"
        value={formik.values.address}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.address && Boolean(formik.errors.address)}
        helperText={formik.touched.address && formik.errors.address}
        margin="normal"
        className="mb-4"
        multiline
        rows={4} // Makes it a TextArea with 4 rows
      />

      {/* Password Field */}
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        margin="normal"
        className="mb-4"
      />

      {/* Submit Button */}
      <Button
        color="primary"
        variant="contained"
        type="submit"
        fullWidth
        disabled={formik.isSubmitting}
        sx={{background:"#ADCF1A"}}
        className=" hover:bg-green-800"
      >
        Register Verifier
      </Button>
      <ToastContainer />
    </Box>
  );
};

export default CreateVerifier;
