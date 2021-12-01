// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }

// exec only on the server
// will not add to js bundle size
// can use to query firebase, but not for this project

export default async (req, res) => {
  res.statusCode = 200
  res.json({ })
}