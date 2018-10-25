import emailService from "../services/email";
import httpResponse from "../responses/httpResponses";

import { logEmail } from "../utils/logger";

const create = async (req, res) => {
  const { hackers, template } = req.body;

  try {
    for (let hacker of hackers) {
      await emailService.send(hacker, template);
      await logEmail({ template, hacker, success: true });
    }

    httpResponse.successResponse(res, { success: true });
  } catch (e) {
    await logEmail({ template, hacker, success: e.message });
    httpResponse.failureResponse(res, { e });
  }
};

export default { create };
