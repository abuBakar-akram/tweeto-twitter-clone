import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signin from './Signin_temp';
import Index from './Index_temp';
import Tweet from './Tweets'
import CreateTweet from './CreateTweet'
import Friends_list from './Friends_list';
import Friend_req from './Friend_req';
import User from './User';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/tweet" element={<Tweet />} />
        <Route path="/createTweet" element={<CreateTweet/>} />
        <Route path="/Friends_list" element={<Friends_list/>} />
        <Route path="/Friend_req" element={<Friend_req/>} />
        <Route path="/User" element={<User/>} />
      </Routes>
    </Router>
  );
}

export default App;
