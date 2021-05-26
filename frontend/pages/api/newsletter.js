import Cors from 'cors'
import Klaviyo from 'node-klaviyo'

// Initialize Klaviyo client
const KlaviyoClient = new Klaviyo({
  publicToken: process.env.KLAVIYO_PUBLIC_TOKEN,
  privateToken: process.env.KLAVIYO_PRIVATE_TOKEN,
})

// Initialize Cors
const cors = Cors({
  methods: ['GET', 'POST', 'HEAD'],
})

// Run middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

// Sign user up with email address
async function handler(req, res) {
  try {
    await runMiddleware(req, res, cors)

    KlaviyoClient.lists.addMembersToList({
      listId: 'HmiTYw',
      profiles: [
        {
          email: req.body.email,
        },
      ],
    })

    res.status(200).json({ success: true })
  } catch (error) {
    res.status(200).json({ success: false })
  }
}

export default handler
