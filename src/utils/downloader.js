import { getSessionToken } from './localStorage';
import { formatShortDateTimeOutput } from './dates';
import { API_ENDPOINT } from '../core/constants/api';

const ENDPOINT = `${API_ENDPOINT}/csv/`;

const getAuthorizationHeaders = () => {
  const token = getSessionToken();
  const headers = { Authorization: `Bearer ${token}` };
  return headers;
};

const createDownloadLink = (url, filename) => {
  const link = document.createElement('a');
  link.href = url;

  link.setAttribute('download', filename);
  document.body.appendChild(link);

  return link;
};

export const DownloadCSV = () => {
  const headers = getAuthorizationHeaders();

  fetch(ENDPOINT, { headers })
    .then((response) => response.blob())
    .then((response) => {
      const date = formatShortDateTimeOutput(new Date());
      const filename = `profly_transactions_${date}.csv`;
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = createDownloadLink(url, filename);

      link.click();
      link.remove();
    });
};
