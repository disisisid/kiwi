import httpResponse from "../responses/httpResponses";
import jwt from "jsonwebtoken";

const { SECRET_KEY } = process.env;

const create = async (req, res) => {
  const { email } = req.query;

  try {
    const token = jwt.sign({ userId: email }, SECRET_KEY, { expiresIn: "1h" });

    httpResponse.successResponse(res, { token });
  } catch (e) {
    httpResponse.failureResponse(res, e);
  }
};

export default { create };
