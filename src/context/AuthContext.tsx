import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  signInWithPopup, 
  signOut as fbSignOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  auth, 
  googleProvider, 
  getMemberProfile, 
  saveMemberProfile, 
  savePrivateContactInfo,
  MemberProfile 
} from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  profile: MemberProfile | null;
  loading: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'signin' | 'register' | 'profile';
  openAuthModal: (mode?: 'signin' | 'register' | 'profile') => void;
  closeAuthModal: () => void;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  registerMemberDetails: (
    profileData: Partial<MemberProfile>,
    privateData?: { phone?: string; residentialAddress?: string; emergencyContact?: string }
  ) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<MemberProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'register' | 'profile'>('signin');

  // Monitor Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          let memberData = await getMemberProfile(currentUser.uid);
          if (!memberData) {
            // First time login: create initial default profile
            memberData = {
              id: currentUser.uid,
              email: currentUser.email || '',
              displayName: currentUser.displayName || 'Beloved Member',
              photoURL: currentUser.photoURL || '',
              membershipStatus: 'member',
              department: 'General Assembly',
              homeCell: 'Victory Center',
              baptismStatus: 'Yes'
            };
            await saveMemberProfile(memberData);
          }
          setProfile(memberData);
        } catch (err) {
          console.warn('Error syncing member profile on auth change:', err);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const openAuthModal = (mode: 'signin' | 'register' | 'profile' = 'signin') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const cred = await signInWithPopup(auth, googleProvider);
      if (cred.user) {
        let existingProfile = await getMemberProfile(cred.user.uid);
        if (!existingProfile) {
          // If first time sign-in, prompt registration completion
          const newProfile: MemberProfile = {
            id: cred.user.uid,
            email: cred.user.email || '',
            displayName: cred.user.displayName || 'Beloved Member',
            photoURL: cred.user.photoURL || '',
            membershipStatus: 'member',
            department: 'General Assembly',
            homeCell: 'Victory Center',
            baptismStatus: 'Yes'
          };
          await saveMemberProfile(newProfile);
          setProfile(newProfile);
          setAuthModalMode('register');
        } else {
          setProfile(existingProfile);
          closeAuthModal();
        }
      }
    } catch (err) {
      console.error('Sign-in error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOutUser = async () => {
    try {
      await fbSignOut(auth);
      setUser(null);
      setProfile(null);
      closeAuthModal();
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  const registerMemberDetails = async (
    profileData: Partial<MemberProfile>,
    privateData?: { phone?: string; residentialAddress?: string; emergencyContact?: string }
  ) => {
    if (!user) throw new Error('Must be signed in to update member details');

    const updatedProfile: MemberProfile = {
      id: user.uid,
      email: user.email || '',
      displayName: profileData.displayName || user.displayName || 'Beloved Member',
      photoURL: user.photoURL || '',
      membershipStatus: profileData.membershipStatus || profile?.membershipStatus || 'member',
      phone: profileData.phone || profile?.phone || '',
      homeCell: profileData.homeCell || profile?.homeCell || '',
      department: profileData.department || profile?.department || '',
      baptismStatus: profileData.baptismStatus || profile?.baptismStatus || 'Yes',
      updatedAt: new Date().toISOString()
    };

    await saveMemberProfile(updatedProfile);
    setProfile(updatedProfile);

    if (privateData) {
      await savePrivateContactInfo(user.uid, {
        email: user.email || '',
        ...privateData
      });
    }

    closeAuthModal();
  };

  const refreshProfile = async () => {
    if (user) {
      const data = await getMemberProfile(user.uid);
      if (data) setProfile(data);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        signInWithGoogle,
        signOutUser,
        registerMemberDetails,
        refreshProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
