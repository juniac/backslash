import type { PlasmoMessaging } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  try {
    const { host, keyword, memo } = req.body
    console.log("host", host)
    console.log("keyword", keyword)
    console.log("memo", memo)
    // const storage = new Storage()

    // await storage.set("firebaseToken", token)
    // await storage.set("firebaseUid", uid)
    // await storage.set("firebaseRefreshToken", refreshToken)

    res.send({
      status: "success"
    })
  } catch (err) {
    console.log("There was an error")
    console.error(err)
    res.send({ err })
  }
}

export default handler
