import { useState } from 'react';
import Cookies from 'js-cookie';
import classes from './Preferences.module.css';
import { API_URL } from '../../utils/config';

const Preferences = () => {
  const [apiKey, setApiKey] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      setMessage(null);
      const token = Cookies.get('idToken');
      const res = await fetch(`${API_URL}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ gmailApiKey: apiKey }),
      });
      if (!res.ok) throw new Error('Failed to save preferences');
      setMessage('Preferences saved');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Error saving');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={classes.container}>
      <h2>User Preferences</h2>
      <form onSubmit={handleSubmit}>
        <div className={classes.formGroup}>
          <label className={classes.label} htmlFor="apiKey">
            Gmail API Key
          </label>
          <input
            id="apiKey"
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className={classes.input}
            placeholder="Enter your Gmail API key"
            required
          />
        </div>
        <button type="submit" className={classes.button} disabled={isSaving}>
          {isSaving ? 'Saving…' : 'Save Preferences'}
        </button>
      </form>
      {message && <p className={classes.message}>{message}</p>}
    </div>
  );
};

export default Preferences;
