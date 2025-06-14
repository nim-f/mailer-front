import { Link, useLocation } from "react-router";
import classes from "./SideNav.module.css";
import { User } from "../User/User";
import TextInput from "../TextInput/TextInput";
import { useEffect, useState } from "react";
import { EmailTemplate } from "../../types/emailTemplate";
import { getAllTemplates } from "../../services/templateService";
import { format } from "date-fns";

// Add CSS classes for new states
const additionalStyles = `
  .${classes.loadingState}, .${classes.errorState}, .${classes.emptyState} {
    padding: 10px;
    font-size: 14px;
    color: #666;
    text-align: center;
  }
  .${classes.errorState} {
    color: #e53935;
  }
  .${classes.sharedBy} {
    font-size: 12px;
    color: #666;
    font-style: italic;
  }
`;
export const SideNav = () => {
    const location = useLocation();
    const [templates, setTemplates] = useState<EmailTemplate[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    
    useEffect(() => {
        fetchTemplates();
    }, []);
    
    const fetchTemplates = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const fetchedTemplates = await getAllTemplates();
            setTemplates(fetchedTemplates.templates);
        } catch (err) {
            console.error('Failed to fetch templates:', err);
            setError('Failed to load templates. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), 'dd MMM yyyy');
        } catch (err) {
            return 'Invalid date';
        }
    };
    
    // Ensure templates is always an array before filtering
    const filteredTemplates = Array.isArray(templates) ? templates.filter(template => 
        template.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];
    
    return (
        <div className={classes.sidenav}>
            <User />

            <div className={classes.sidenav__menu}>
                <ul>
                    <li>
                        <Link to="/">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/emails">Emails</Link>
                    </li>
                    <li>
                        <Link to="/templates">Templates</Link>
                    </li>
                </ul>
            </div>
        
            <div className={classes.lettersSection}>
                <TextInput 
                    value={searchTerm} 
                    onChange={(value) => setSearchTerm(value)} 
                    placeholder="Search templates..." 
                />
                <div className={classes.lettersList}>
                    <div className={classes.lettersTitle}>YOUR TEMPLATES</div>
                    {isLoading ? (
                        <div className={classes.loadingState}>Loading templates...</div>
                    ) : error ? (
                        <div className={classes.errorState}>{error}</div>
                    ) : filteredTemplates.length === 0 ? (
                        <div className={classes.emptyState}>
                            {searchTerm ? 'No templates match your search' : 'No templates found'}
                        </div>
                    ) : (
                        filteredTemplates.map((template) => (
                            <div 
                                key={template.templateId} 
                                className={`${classes.letterItem} ${location.pathname === `/editor/${template.templateId}` ? classes.letterActive : ''}`}
                                onClick={() => {
                                    // Navigate to the template editor
                                    window.location.href = `/editor/${template.templateId}`;
                                }}
                            >
                                <div>{formatDate(template.updatedAt)}</div>
                                <div>{template.name.length > 30 ? `${template.name.substring(0, 30)}...` : template.name}</div>
                            </div>
                        ))
                    )}
                </div>
                
                <div className={classes.sharedTitle}>SHARED WITH YOU</div>
                <div className={classes.lettersList}>
                    {Array.isArray(templates) && templates
                        .filter(template => template.metadata?.isShared && template.metadata?.sharedWith?.includes('currentUser'))
                        .map((template) => (
                            <div 
                                key={template.templateId} 
                                className={`${classes.letterItem} ${location.pathname === `/editor/${template.templateId}` ? classes.letterActive : ''}`}
                                onClick={() => {
                                    window.location.href = `/editor/${template.templateId}`;
                                }}
                            >
                                <div>{formatDate(template.updatedAt)}</div>
                                <div>{template.name.length > 30 ? `${template.name.substring(0, 30)}...` : template.name}</div>
                                <div className={classes.sharedBy}>by {template.metadata?.author || 'Unknown'}</div>
                            </div>
                        ))
                    }
                    {!Array.isArray(templates) || templates.filter(template => template.metadata?.isShared && template.metadata?.sharedWith?.includes('currentUser')).length === 0 && (
                        <div className={classes.emptyState}>No shared templates</div>
                    )}
                </div>
            </div>
        </div>
    );
};
