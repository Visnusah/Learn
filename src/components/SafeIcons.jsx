import React from 'react';
import { 
  Fingerprint as LucideFingerprint,
  Shield,
  Lock,
  Key
} from 'lucide-react';

// Workaround for ad-blocker issues with specific icon names
export const SafeFingerprint = (props) => {
  try {
    return <LucideFingerprint {...props} />;
  } catch (error) {
    // Fallback to Shield icon if Fingerprint is blocked
    console.warn('Fingerprint icon blocked, using Shield as fallback');
    return <Shield {...props} />;
  }
};

// Alternative icons that can be used instead of commonly blocked ones
export const SecurityIcon = Shield;
export const AuthIcon = Lock;
export const AccessIcon = Key;

// Re-export all other lucide icons normally
export * from 'lucide-react';
