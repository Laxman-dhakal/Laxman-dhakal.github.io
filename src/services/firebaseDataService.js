import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore';
import { firestore, isFirebaseConfigured } from './firebase';

export const saveContactMessage = async (message) => {
  if (!isFirebaseConfigured || !firestore) {
    throw new Error('Firebase is not configured. Add the Firebase environment variables first.');
  }

  return addDoc(collection(firestore, 'contactMessages'), {
    ...message,
    status: 'unread',
    createdAt: serverTimestamp()
  });
};

export const saveClassMessage = async (message) => {
  if (!isFirebaseConfigured || !firestore) {
    throw new Error('Firebase is not configured. Add the Firebase environment variables first.');
  }

  return addDoc(collection(firestore, 'classMessages'), {
    ...message,
    createdAt: serverTimestamp()
  });
};

export const getAdminCollection = async (collectionName) => {
  if (!isFirebaseConfigured || !firestore) return null;
  const snapshot = await getDocs(collection(firestore, collectionName));
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
};

export const saveAdminCollectionItem = async (collectionName, item) => {
  if (!isFirebaseConfigured || !firestore) return null;
  const id = String(item.id || Date.now());
  await setDoc(doc(firestore, collectionName, id), { ...item, id });
  return id;
};

export const deleteAdminCollectionItem = async (collectionName, itemId) => {
  if (!isFirebaseConfigured || !firestore) return false;
  await deleteDoc(doc(firestore, collectionName, String(itemId)));
  return true;
};
