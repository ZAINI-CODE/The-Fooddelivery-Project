// Very simple fake login for demo
// In a real app you'd check a database and hash passwords.

const DEMO_USER = {
  id: 1,
  name: 'Demo User',
  email: 'demo@foodapp.com',
  password: '123456' // demo password
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: 'Email and password are required.' });
  }

  if (email === DEMO_USER.email && password === DEMO_USER.password) {
    // Return user info without password
    const { password: _, ...safeUser } = DEMO_USER;
    return res.json({
      success: true,
      message: 'Login successful',
      user: safeUser
    });
  }

  return res
    .status(401)
    .json({ success: false, message: 'Invalid email or password.' });
};