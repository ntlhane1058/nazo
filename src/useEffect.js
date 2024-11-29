useEffect(() => {
    // Check if users exist in localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (storedUsers.length === 0) {
      // Add initial admin user if no users are found
      const initialUsers = [
        { name: "Admin User", email: "admin@example.com", password: "admin123", isAdmin: true },
      ];
      localStorage.setItem("users", JSON.stringify(initialUsers));
      setUsers(initialUsers); // Update state
    } else {
      setUsers(storedUsers);
    }
  
    // Load the logged-in user if present
    const loggedUser = JSON.parse(localStorage.getItem('loggedInUser')) || null;
    setLoggedInUser(loggedUser);
  }, []);
  