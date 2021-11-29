import Link from "next/link"

export default function AdminPostsPage({}) {
  return (
    <main>
      <Link href={{
        pathname: `/[username]`,
        query: { username: `julesrsilver@gmail.com` },
      }}>
        <a>Jules Profile</a>
      </Link>
    </main>
  )
}