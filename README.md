# nextfire


https://fireship.io/courses/react-next-firebase/

BONUS!
- https://fireship.io/lessons/dropdown-menu-multi-level-react/
- https://fireship.io/courses/firestore-data-modeling/
- https://fireship.io/courses/firebase-security/

## typescript
 TODO: convert to ts
components: `*.tsx`
other: `.ts`

## firebase
`yarn add firebase react-firebase-hooks`
- google auth
- firestore (init allow mode)
- note env vars
- `yarn add firebase react-firebase-hooks` (omg hooks)
- - future, ref yarn `reactFire`
- if not already installed: `yarn global add firebase-tools`
- - emulator optional for this instance



## hot toast!
`yarn add react-hot-toast`
```jsx
// _app
import { Toaster } from 'react-hot-toast';
// 
return // ... 
<Toaster />
//
// index.js root
import toast from 'react-hot-toast';
// ...
<button onClick={() => toast.success('so toasty!')}>
  toasty?
</button>
```

## Auth
google oauth + custom name
1. get user
2. fetch user doc from fstore
... global auth data
> auth is not server rendered!

### google oauth
1. google auth provider in `lib/firebase.js`
```js
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
// firebase.initializeApp(firebaseConfig);

// Auth exports
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
```

2. add logged in button and google auth popup to pages/enter.js
```jsx
function SignInButton() {
  const signInWithGoogle = async () => {
    try {
      await auth.signInWithPopup(googleAuthProvider);
    } catch (e) {
      console.error('auth error: ', e);
    }
  };

  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <img src={'/google.png'} /> Sign in with Google
    </button>
  )
}
```

## Auth context
```jsx
// lib/context
import { createContext } from 'react';
export const UserContext = createContext({ user: null, username: null });
```

wrap components - _app.js:
`<UserContext.Provider>`

# Data Model
users/{uid} Public user profile
usernames/{username} Username uniqueness tracking
users/{uid}/posts/{slug} User can have many posts
users/{uid}/posts/{slug}/hearts/{uid} many-to-many relationship between users and posts via hearts

example post:
```jsx
// users/{uid}/posts/{slug}

{
    title: 'Hello World,
    slug: 'hello-world',
    uid: 'userID',
    username: 'jeffd23',
    published: false,
    content: '# hello world!',
    createdAt: TimeStamp,
    updatedAt: TimeStamp,
    heartCount: 0,
}
```


## ISR Incremental static regeneration

