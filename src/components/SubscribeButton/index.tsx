import { useSession, signIn } from 'next-auth/client';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
        priceId: string;
    };


export function SubscribeButton({ priceId }: SubscribeButtonProps) {
    const [session] = useSession();

   async function handleSubscribe() {
        if (!session){
            signIn('github');
            return;
        }
        try {
            const response = await api.post('/subscribe')

            const {sessionId } = response.data;

            const stripe = await getStripeJs()

            stripe.redirectToCheckout({ sessionId });

        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <button
            className={styles.subscribeButton}
            type="button"
            onClick={handleSubscribe}    
        >
            Subscribe now
        </button>
    );
}