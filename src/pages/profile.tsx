import React from 'react';
import { Container, Typography, TextField, Button, Card, CardContent } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import Main from '@/layout/mainLayout';
import { useRouter } from 'next/router'; 

const fetcher = (url: string) => axios.get(url).then(res => res.data);

const ProfilePage: React.FC = () => {
  const router = useRouter();

  const { data, error } = useSWR('/api/user', fetcher);

  if (error) return <div>Error loading user data</div>;
  if (!data) return <div>Loading...</div>;

  const { id, name, email, bio, post } = data; 
  return (
    <Main>
      <Container maxWidth="md" >
        <Card style={{ width: '90%', padding: '6rem', maxWidth: '800px', marginTop: '2rem', backgroundColor: '#fbe3e8', border: '2px solid red', borderLeftWidth: '15px' }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>Profile</Typography>
            <Formik
              initialValues={{ id, name, email, bio, post }}
              onSubmit={(values, actions) => {
                axios.put('/api/user', values)
                  .then(res => {
                    mutate('/api/user', values, false);
                    console.log('Profile updated successfully');
                    router.push('/'); // Redirect to index page after successful form submission
                  })
                  .catch(err => {
                    console.error('Error updating profile:', err);
                  })
                  .finally(() => {
                    actions.setSubmitting(false);
                  });
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field
                    name="name"
                    as={TextField}
                    label="Name"
                    fullWidth
                    margin="normal"
                  />
                  <Field
                    name="email"
                    as={TextField}
                    label="Email"
                    fullWidth
                    margin="normal"
                  />
                  <Field
                    name="bio"
                    as={TextField}
                    rows={3}
                    label="Bio"
                    fullWidth
                    margin="normal"
                  />
                  <Button type="submit" variant="contained" color="primary" disabled={isSubmitting} fullWidth>
                    Save
                  </Button>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Container>
    </Main>
  );
}

export default ProfilePage;
