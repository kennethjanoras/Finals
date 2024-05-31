import { NextApiRequest, NextApiResponse } from 'next';

let userData = {
  id: 1,
  name: 'Maui Azryl Lomuntad',
  email: 'mauiazryl@gmail.com',
  bio: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  post: [
    {
      title: "Post 1",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      title: "Post 2",
      content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }
  ]
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(userData);
  } else if (req.method === 'PUT') {
    const { id, name, email, bio, post } = req.body;
    if (!id || !name || !email || !bio || !post) {
      res.status(400).json({ error: "Missing required fields" });
    } else {
      userData = { id, name, email, bio, post };
      res.status(200).json(userData);
    }
  } else if (req.method === 'POST') {
    const { name, email, bio, post } = req.body;
    if (!name || !email || !bio || !post) {
      res.status(400).json({ error: "Missing required fields" });
    } else {
      const id = userData.id + 1;
      userData = { id, name, email, bio, post };
      res.status(201).json(userData);
    }
  } else if (req.method === 'DELETE') {
    userData = {
      id: 1,
      name: '',
      email: '',
      bio: '',
      post: []
    };
    res.status(200).end('User data deleted successfully');
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
