import type { PlasmoMessaging } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"

// import { fetchUserData } from "~firebase/user"
import { saveKeywords } from "~firebase/keyword"

// import { Storage } from "@plasmohq/storage"

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  // const storage = new Storage()

  // const token = await storage.get("firebaseToken")
  // const uid = await storage.get("firebaseUid")
  // const refreshToken = await storage.get("firebaseRefreshToken")

  // console.log("user uid", uid)
  // console.log("user storage token data", token)

  // const userData = await fetchUserData(token, uid, refreshToken, storage)

  // console.log("userData", userData)

  try {
    const { host, keyword, memo } = req.body
    console.log("host", host)
    console.log("keyword", keyword)
    console.log("memo", memo)
    // const storage = new Storage()

    // await storage.set("firebaseToken", token)
    // await storage.set("firebaseUid", uid)
    // await storage.set("firebaseRefreshToken", refreshToken)

    const payload = {
      host,
      keyword,
      memo
    }
    const result = saveKeywords({ data: payload })

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
