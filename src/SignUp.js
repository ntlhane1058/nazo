import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignUpForm = ({ users, setUsers }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!Array.isArray(users)) {
      console.error("Error: users is not an array.");
      return;
    }

    const userExists = users.some((user) => user.email === email);
    if (userExists) {
      alert('User already exists');
      return;
    }

    const newUser = { name, email, password };
    const updatedUsers = [...users, newUser];

    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    navigate('/login');
  };

  // Styles
  const styles = {
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '20px',
    },
    signupRow: {
      display: 'flex',
      justifyContent: 'center',
      gap: '15px',
      marginBottom: '15px',
    },
    input: {
      padding: '10px',
      border: '2px solid #ccc',
      borderRadius: '8px',
      backgroundColor: '#222',
      color: 'white',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#444',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      color: 'white',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#646cff',
    },
  };

  return (
    <div style={styles.formContainer}>
      <h2>Sign Up</h2>
      <form onSubmit={handleRegister}>
        <div style={styles.signupRow}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#646cff'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#444'}
          >
            Sign Up
          </button>
        </div>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default SignUpForm;
