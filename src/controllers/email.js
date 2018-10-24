import emailService from "../services/email";
import httpResponse from "../responses/httpResponses";

const create = async (req, res) => {
  const { hackers, template } = req.body;

  try {
    for (let hacker of hackers) {
      await emailService.send(hacker, template);
    }

    httpResponse.successResponse(res, { success: true });
  } catch (e) {
    httpResponse.failureResponse(res, { e });
  }
};

export default { create };
