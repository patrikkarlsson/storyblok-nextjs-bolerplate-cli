export default async (req, res) => {

  if (req.query.secret !== process.env.PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  res.setPreviewData({
    maxAge: 60 * 60,
  })

  res.redirect('/')
}