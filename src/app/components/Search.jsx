import React, { useState } from 'react';
import { Input, Button, useToast } from '@chakra-ui/react';

const Search = ({ setUserData, setLoading }) => {
  const [query, setQuery] = useState('');
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query) {
      toast({
        title: 'Error',
        description: 'Please enter a username.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Start loading state
    setLoading(true);

    try {
      // Fetch user data from GitHub API
      const res = await fetch(`https://api.github.com/users/${query}`);
      const data = await res.json();

      // Check if user data contains an error message
      if (res.status === 404) {
        throw new Error('User not found');
      }

      // Update user data state
      setUserData(data);

      // Save user data to localStorage
      addUserToLocalStorage(data, query);
    } catch (error) {
      // Display error message
      toast({
        title: 'Error',
        description: error.message || 'An error occurred while fetching user data.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      // Stop loading state
      setLoading(false);
    }
  };

  const addUserToLocalStorage = (data, username) => {
    const users = JSON.parse(localStorage.getItem('github-users')) || [];
    const userIndex = users.findIndex(user => user.id === username);
    if (userIndex !== -1) {
      // User already exists, remove it
      users.splice(userIndex, 1);
    }
    // Add the new user to the beginning of the array
    users.unshift({
      id: username,
      avatar_url: data.avatar_url,
      name: data.name,
      url: data.html_url
    });

    // Update localStorage with the updated user list
    localStorage.setItem('github-users', JSON.stringify(users));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        variant="outline"
        placeholder="Type a username (i.e. Arunvasuacchu)"
        focusBorderColor="green.500"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button
        size="md"
        type="submit"
        colorScheme="whatsapp"
        mt={4}
        disabled={!query}
        opacity={!query ? 0.5 : 1}
      >
        Search
      </Button>
    </form>
  );
};

export default Search;
