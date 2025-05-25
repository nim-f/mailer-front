import { EmailTemplate } from '../types/emailTemplate';
import Cookies from 'js-cookie';

const API_URL = 'https://o1muw8cjaa.execute-api.us-east-1.amazonaws.com/dev';

/**
 * Get the ID token from cookies using js-cookie library
 * @returns The ID token or undefined if not found
 */
const getIdTokenFromCookie = (): string | undefined => {
  return Cookies.get('idToken');
};

/**
 * Save an email template to the database
 * @param template The template to save
 * @returns The saved template with updated fields from the server
 */
export const saveTemplate = async (template: EmailTemplate): Promise<EmailTemplate> => {
  console.log({template})
  try {
    const response = await fetch(`${API_URL}/templates${template.templateId ? `/${template.templateId}` : ''}`, {
      method: template.templateId ? 'PUT' : 'POST', // POST for new templates, PUT for updates
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getIdTokenFromCookie()}` // Using ID token from cookies for authentication
      },
      body: JSON.stringify(template)
    });

    if (!response.ok) {
      throw new Error(`Error saving template: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to save template:', error);
    // For now, just return the original template since we don't have a real backend
    // In a real app, you would handle this error appropriately
    return template;
  }
};

/**
 * Get a template by ID
 * @param templateId The template ID
 * @returns The template
 */
export const getTemplateById = async (templateId: string): Promise<EmailTemplate> => {
  try {
    const response = await fetch(`${API_URL}/templates/${templateId}`, {
      headers: {
        'Authorization': `Bearer ${getIdTokenFromCookie()}`
      }
    });

    if (!response.ok) {
      throw new Error(`Error fetching template: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch template:', error);
    throw error;
  }
};

/**
 * Get all templates
 * @returns Array of templates
 */
export const getAllTemplates = async (): Promise<{ templates: EmailTemplate[] }> => {
  try {
    const response = await fetch(`${API_URL}/templates`, {
      headers: {
        'Authorization': `Bearer ${getIdTokenFromCookie()}`
      }
    });

    if (!response.ok) {
      throw new Error(`Error fetching templates: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch templates:', error);
    throw error;
  }
};

/**
 * Delete a template
 * @param templateId The template ID
 * @returns Success status
 */
export const deleteTemplate = async (templateId: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/templates/${templateId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getIdTokenFromCookie()}`
      }
    });

    if (!response.ok) {
      throw new Error(`Error deleting template: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error('Failed to delete template:', error);
    throw error;
  }
};
