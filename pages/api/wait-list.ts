import { NextApiRequest, NextApiResponse } from "next";
import axios, { AxiosError } from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { data } = req.body;

    const headers = {
      Authorization: `Token ${process.env.NEXT_PUBLIC_BASEROW_DATABASE_TOKEN}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.post(
        "https://api.baserow.io/api/database/rows/table/207965/?user_field_names=true",
        data,
        { headers }
      );

      if (response.status !== 200) throw new Error(response.statusText);

      res.status(200).json({ message: "Success" });
    } catch (error: unknown) {
      const err = error as AxiosError;
      console.error(err);
      res
        .status(err.response?.status || 500)
        .json({ error: "Something went wrong" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
