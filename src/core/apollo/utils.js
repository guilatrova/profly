import { getSessionToken } from '../authentication';

const getAuthorizationHeader = async () => ({ Authorization: `Bearer ${await getSessionToken()}` });

export const getHeaders = async () => {
  const headers = await getAuthorizationHeader();

  return { headers };
};
