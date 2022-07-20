import styles from './styles.module.scss'
import { FaGithub} from 'react-icons/fa';
import {FiX} from 'react-icons/fi'
import {signIn, signOut, useSession} from 'next-auth/client'

export function SingInButton() {
    const [session] = useSession();

    console.log(session)

    return session ? (  //retorno condicional 
        <button 
            className={styles.signInButton}
            type="button"
            onClick={() => signOut()}
        >            
            <FaGithub color='#04d361' />
            {session.user.name}
            <FiX color='#717180' className={styles.closeIcon}/>
        </button>
    ): (
        <button 
            className={styles.signInButton}
            type="button"
            onClick={() => signIn('github')}
        >
            <FaGithub color='#eba417' />
            Sing in with Github
        </button>
    );
        
        
    
}