import emailjs from '@emailjs/browser';
import { isFirebaseConfigured } from './firebase';
import { saveContactMessage } from './firebaseDataService';

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const isEmailDeliveryConfigured = Boolean(serviceId && templateId && publicKey);

export const sendContactMessage = async (form) => {
  if (!isEmailDeliveryConfigured && !isFirebaseConfigured) {
    await new Promise((resolve) => setTimeout(resolve, 650));
    return { mode: 'local' };
  }

  if (isEmailDeliveryConfigured) {
    await emailjs.send(serviceId, templateId, {
      from_name: form.name,
      from_email: form.email,
      phone: form.phone || 'Not provided',
      subject: form.subject,
      message: form.message
    }, publicKey);
  }

  if (isFirebaseConfigured) {
    await saveContactMessage(form);
  }

  return { mode: isEmailDeliveryConfigured && isFirebaseConfigured ? 'emailjs-and-firestore' : isEmailDeliveryConfigured ? 'emailjs' : 'firestore' };
};
