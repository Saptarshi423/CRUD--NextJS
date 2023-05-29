import connectMongo from "@/Database/conn";
import {
  getUser,
  putUser,
  deleteUser,
} from "@/Database/controller"; // IMPORT CONTROLLER FUNCTIONS TO PERFORM CRUD

export default async function handler(req, res) {
  // CONNECT TO MONGODB.
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in connection..." })
  );

  //GET THE type of request
  const { method } = req;

  switch (method) {
    case "GET":
      getUser(req, res);
      break;
    case "PUT":
      putUser(req, res);
      break;
    case "DELETE":
      deleteUser(req, res);
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
