import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

/**
 * Custom hook that refreshes the application when the user changes their account.
 * 
 * @param {string} [userId] - Optional user ID to compare with the current session's user ID.
 * 
 * @remarks
 * This hook uses the `useSession` hook to get the current session data and compares the provided
 * `userId` with the session's user ID. If they do not match, it logs a message and reloads the window.
 * This ensures that the application refreshes after the user changes their account, addressing the issue
 * where the client session lags behind by one render.
 * 
 * This check is specifically necessary on the `/app` route, which is the default redirect after logging in.
 * Dynamic redirects after login are disabled to ensure that users must go through this check.
 * 
 */
const useRefreshOnUserChange = (userId?: string) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (userId !== session?.user.id) {
      console.log('user id changed');
      window.location.reload();
    }
  }, [userId, session?.user.id]);
};

export default useRefreshOnUserChange;