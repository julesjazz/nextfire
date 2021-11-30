import UserProfile from "../../components/UserProfile";
import PostFeed from "../../components/PostFeed";
import { getUserWithUsername, postToJSON } from '../../lib/firebase';

export async function getServerSideProps({ query }) {
  const { username } = query;
  // custom helper fn
  const userDoc = await getUserWithUsername(username);
    // if no user, then 404
    if (!userDoc) {
      return{
        notFound: true,
      }
    }
  // serializable data
  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
    const postsQuery = userDoc.ref
      .collection('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(5);
    posts = (await postsQuery.get()).docs.map(postToJSON);
  }

  return {
    props: { user, posts }, 
    // passed to the page component as props
  };
}

export default function UserProfilePage({ user, posts }) {
  return (
    <main>
      <UserProfile user={user} />
      <PostFeed user={posts} />
    </main>
  );
}