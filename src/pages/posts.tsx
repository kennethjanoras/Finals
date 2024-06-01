import React from 'react';
import { Container, Typography, TextField, Button, IconButton, Card, CardContent } from '@material-ui/core';
import { Formik, Form, Field, FieldArray } from 'formik';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import Main from '@/layout/mainLayout';
import CancelIcon from '@material-ui/icons/Cancel';
//import DeleteIcon from '@material-ui/icons/Delete';
import { useRouter } from 'next/router';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

interface Post {
  title: string;
  content: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  bio: string;
  post: Post[];
}

const ProfilePage: React.FC = () => {
  const router = useRouter();

  const { data, error } = useSWR<User>('/api/user', fetcher);

  if (error) return <div>Error loading user data</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Main>
      <Container className='w-full flex justify-end'>
        <Card style={{ width: '90%', maxWidth: '800px', padding: '3rem', marginTop: '2rem', backgroundColor: '#fbe3e8', border: '2px solid red', borderLeftWidth: '15px' }}>
          <CardContent>
            <Typography variant="h4" gutterBottom style={{ color: '#333' }}>Posts</Typography>
            <Formik
              initialValues={{ posts: data.post }}
              onSubmit={(values, actions) => {
                axios.put('/api/user', { ...data, post: values.posts })
                  .then(res => {
                    mutate('/api/user', { ...data, post: values.posts }, false);
                    console.log('Posts updated successfully');
                    router.push('/'); // Redirect to index page after successful form submission
                  })
                  .catch(err => {
                    console.error('Error updating posts:', err);
                  })
                  .finally(() => {
                    actions.setSubmitting(false);
                  });
              }}
            >
              {({ values, isSubmitting }) => (
                <Form>
                  <FieldArray name="posts">
                    {({ push, remove }) => (
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        {values.posts.map((post, index) => (
                          <div key={index} style={{ margin: 'auto',
                          width: '60%',
                          padding: '10px' }}>
                            <Field
                              name={`posts.${index}.title`}
                              as={TextField}
                              label="Title"
                              fullWidth
                              InputProps={{ style: { backgroundColor: '#fff' } }}
                            />
                            <Field
                              name={`posts.${index}.content`}
                              as={TextField}
                              label="Content"
                              fullWidth
                              multiline
                              InputProps={{ style: { backgroundColor: '#fff' } }}
                            />
                            <IconButton style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
                              onClick={() => remove(index)}
                              aria-label="delete"
                              color="secondary"
                            >
                              <CancelIcon />
                            </IconButton>
                          </div>
                        ))}
                        <Button
                          
                          variant="contained"
                          color="primary"
                          onClick={() => push({ title: '', content: '' })}
                        >
                          Add Post
                        </Button>
                      </div>
                    )}
                  </FieldArray>
                  <br />
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                  <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>Save</Button>
                  </div>
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
