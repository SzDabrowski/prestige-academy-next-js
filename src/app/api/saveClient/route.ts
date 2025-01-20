// pages/api/save-client.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const clientData = req.body;

    try {
      const existingClient = await prisma.courseClient.findFirst({
        where: {
          name: clientData.name,
          courseName: clientData.courseName,
        },
      });

      if (existingClient) {
        return res
          .status(400)
          .json({ error: "Client already registered for this course." });
      }

      // Create new client
      const newClient = await prisma.courseClient.create({
        data: clientData,
      });

      res.status(201).json(newClient);
    } catch (error) {
      console.error("Error saving client:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
