import { NextApiRequest, NextApiResponse } from "next";
import { pusherServer } from "@/lib/pusher";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Socket is initializing");
  if (req.method === "POST") {
    const { message } = req.body;
    console.log("body ", req.body);
    pusherServer.trigger("notifications", "push-data", message);
    res.status(200).send("successfull");
  }
}
