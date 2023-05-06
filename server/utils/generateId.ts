import crypto from "crypto";

const generateId: () => string = (): string => {
  return crypto.randomUUID().toString();
};

export default generateId;
