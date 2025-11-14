import { verifyToken } from "./jwt";

export function getUser(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;

  const token = authHeader.split(" ")[1];
  if (!token) return null;

  const decoded = verifyToken(token) as any;
  return decoded || null;
}
