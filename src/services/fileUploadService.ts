import Cookies from 'js-cookie';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Get the ID token from cookies using js-cookie library
 * @returns The ID token or throws an error if not found
 */
const getIdTokenFromCookie = (): string => {
  const token = Cookies.get('idToken');
  if (!token) {
    throw new Error('User is not authenticated');
  }
  return token;
};

/**
 * Upload a file to the server
 * @param file The file to upload
 * @returns The URL of the uploaded file
 */
export const uploadFile = async (file: File): Promise<string> => {
  try {
    // Get token first to ensure user is authenticated
    const token = getIdTokenFromCookie();
    
    // Create a FormData object to send the file with additional metadata
    const formData = new FormData();
    formData.append('file', file);
    formData.append('filename', file.name);
    formData.append('contentType', file.type);
    
    // Upload the file
    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Disposition': `attachment; filename="${file.name}"`
      },
      body: formData
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Error uploading file: ${errorData.message || response.statusText}`);
    }
    
    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('Failed to upload file:', error);
    throw error;
  }
};
