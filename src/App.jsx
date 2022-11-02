import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import Searcher from './components/Searcher';
import { getGitHubUser } from './services/users';
import UserCard from './containers/UserCard';

const App = () => {
  const [inputUser, setInputUser] = useState('octocat');
  const [userState, setUserState] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const gettingUser = async (user) => {
    const userResponse = await getGitHubUser(user);
    console.log('====================================');
    console.log(userResponse);
    console.log('====================================');
    if (userState === 'octocat') {
      localStorage.setItem('octocat', Json.stringify(userResponse));
      setUserState(inputUser);
    }

    if (userResponse.message === 'Not Found') {
      setNotFound(true);
      const { octocat } = JSON.parse((localStorage.getItem('octocat')));
      setInputUser(octocat);
    } else {
      setUserState(userResponse);
      setNotFound(false);
    }
  };

  console.log(userState);

  useEffect(() => {
    gettingUser(inputUser);
  }, [inputUser]);

  return (
    <Container
      sx={{
        background: 'whitesmoke',
        width: '80vw',
        height: '500px',
        borderRadius: '16px',
        marginTop: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Searcher setInputUser={setInputUser} />
      {notFound ? (
        <Typography sx={{ marginTop: '40px', color: 'red' }}>
          User Not Found
        </Typography>
      ) : (
        <UserCard userState={userState} />
      )}
    </Container>
  );
};

export default App;
