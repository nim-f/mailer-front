// Before
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function Button() {
  const theme = useContext(ThemeContext);

  return (
    <button
      style={{
        backgroundColor: theme === 'dark' ? '#333' : '#fff',
        color: theme === 'dark' ? '#fff' : '#000',
        border: '1px solid',
        padding: '10px 20px',
        borderRadius: '5px',
      }}
    >
      Current theme: {theme}
    </button>
  );
}

export default Button;