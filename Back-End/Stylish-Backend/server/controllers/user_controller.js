require('dotenv').config();
const validator = require('validator');
const User = require('../models/user_model');

const signUp = async (req, res) => {
  let { name } = req.body;
  const { email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ error: 'Request Error: name, email and password are required.' });
    return;
  }

  if (!validator.isEmail(email)) {
    res.status(400).json({ error: 'Request Error: Invalid email format' });
    return;
  }

  if (password.length < 8 || password.length > 20) {
    res.status(400).json({ error: 'Request Error: Invalid password' });
    return;
  }

  name = validator.escape(name);

  const result = await User.signUp(name, User.USER_ROLE.USER, email, password);
  if (result.error) {
    res.status(403).json({ error: result.error });
    return;
  }

  const user = result.user;
  if (!user) {
    res.status(500).json({ error: 'Database Query Error' });
    return;
  }

  res.status(200).json({
    data: {
      access_token: user.access_token,
      access_expired: user.access_expired,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    },
  });
};

const nativeSignIn = async (email, password) => {
  if (!email || !password) {
    return { error: 'Request Error: email and password are required.', status: 401 };
  }

  try {
    return await User.nativeSignIn(email, password);
  } catch (error) {
    return { error };
  }
};

const facebookSignIn = async (accessToken) => {
  if (!accessToken) {
    return { error: 'Request Error: access token is required.', status: 400 };
  }

  try {
    const profile = await User.getFacebookProfile(accessToken);
    const { id, name, email } = profile;

    if (!id || !name || !email) {
      return {
        error: 'Permissions Error: facebook access token can not get user id, name or email',
      };
    }

    return await User.facebookSignIn(id, User.USER_ROLE.USER, name, email);
  } catch (error) {
    return { error: error };
  }
};

const signIn = async (req, res) => {
  const data = req.body;

  let result;
  switch (data.provider) {
    case 'native':
      result = await nativeSignIn(data.email, data.password);
      break;
    case 'facebook':
      result = await facebookSignIn(data.access_token);
      break;
    default:
      result = { error: 'Wrong Request' };
  }

  if (result.error) {
    const status_code = result.status ? result.status : 401;
    res.status(status_code).json({ error: result.error });
    return;
  }

  const user = result.user;
  if (!user) {
    res.status(500).json({ error: 'Database Query Error' });
    return;
  }

  res.status(200).json({
    data: {
      access_token: user.access_token,
      access_expired: user.access_expired,
      user: {
        id: user.id,
        provider: "native",
        name: user.name,
        email: user.email
      },
    },
  });
};

const getUserProfile = async (req, res) => {
  res.status(200).send({
    data: {
      provider: req.user.provider,
      name: req.user.name,
      email: req.user.email,
      picture: req.user.picture,
    },
  });
  return;
};

module.exports = {
  signUp,
  signIn,
  getUserProfile,
};
