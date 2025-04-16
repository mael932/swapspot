
/**
 * Validates if an email is from a recognized university domain
 */
export const validateUniversityEmail = (email: string): boolean => {
  // Basic email format validation
  const isValidEmailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!isValidEmailFormat) return false;
  
  // Extract domain from email
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return false;
  
  // List of accepted university domains
  // This list would be much more extensive in a real application
  const acceptedDomains = [
    // European universities
    'uva.nl',         // University of Amsterdam
    'sorbonne.fr',    // Sorbonne University
    'uni-heidelberg.de', // Heidelberg University
    'cam.ac.uk',      // Cambridge University
    'ox.ac.uk',       // Oxford University
    'polimi.it',      // Politecnico di Milano
    'tu-berlin.de',   // Technical University of Berlin
    'uu.se',          // Uppsala University
    'ucm.es',         // Complutense University of Madrid
    
    // US universities
    'harvard.edu',    // Harvard University
    'stanford.edu',   // Stanford University
    'mit.edu',        // MIT
    'berkeley.edu',   // UC Berkeley
    'nyu.edu',        // New York University
    
    // Common university domain patterns (these would need to be refined in a real app)
    'edu',            // Common US university domain
    'ac.uk',          // UK universities
    'uni-',           // Many German universities
    'edu.au',         // Australian universities
  ];
  
  // Check if the domain is in the accepted list or matches common patterns
  return acceptedDomains.some(acceptedDomain => 
    domain === acceptedDomain || domain.endsWith('.' + acceptedDomain)
  );
};
