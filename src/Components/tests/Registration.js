import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios'; // Import axios for mocking
import ClientProfileForm from './ClientProfileForm';

jest.mock('axios'); // Mock axios

describe('ClientProfileForm', () => {
  test('submitting the form with valid data', async () => {
    // Mock axios post method
    axios.post.mockResolvedValueOnce({ data: 'Profile updated successfully' });

    const { getByPlaceholderText, getByText } = render(<ClientProfileForm />);

    // Fill out form fields
    fireEvent.change(getByPlaceholderText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(getByPlaceholderText('Address 1'), { target: { value: '123 Main St' } });
    fireEvent.change(getByPlaceholderText('City'), { target: { value: 'New York' } });
    fireEvent.change(getByPlaceholderText('Zipcode'), { target: { value: '10001' } });

    fireEvent.click(getByText('Submit'));

    // Wait for axios call to resolve
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/api/profile/complete-profile', {
        username: '',
        fullName: 'John Doe',
        address1: '123 Main St',
        address2: '',
        city: 'New York',
        state: '',
        zipcode: '10001'
      });
    });

    // Verify success message
    expect(getByText('Profile updated successfully')).toBeInTheDocument();
  });

  // Add more test cases for other scenarios like input validation, error handling, etc.
});
