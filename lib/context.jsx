// users with custom username
// store custom usernames in firestore db
// use react context api... 
// // share data through the component tree

import { createContext } from 'react';
export const UserContext = createContext({ user: null, username: null });

// nest pages within context to display unique user data in... provides user state with next _app.js