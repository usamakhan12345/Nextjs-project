import { connectDatabase } from "../../../../db/dbConnection";
interface CreateRequest {
  name: string;
  lastName: string;
  email: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    connectDatabase();
    const { name, lastName, email, password }: CreateRequest =
      await request.json();

    console.log("TEST", name, lastName, password);

    return Response.json({
      status: "200",
      message: "user create successfuly",
      data: email,
    });
  } catch (error) {
    return Response.json({
      status: "500",
      message: error,
    });
  }
}
