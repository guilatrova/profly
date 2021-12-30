import { API_ENDPOINT } from '../core/constants/api'
import { formatShortDateTimeOutput } from './dates'
import { getSessionToken } from './localStorage'

const ENDPOINT = `${API_ENDPOINT}/csv/`

const getAuthorizationHeaders = () => {
  const token = getSessionToken()
  const headers = { Authorization: `Bearer ${token}` }
  return headers
}

const createDownloadLink = (url, filename) => {
  const link = document.createElement('a')
  link.href = url

  link.setAttribute('download', filename)
  document.body.appendChild(link)

  return link
}

export const downloadCSV = () => {
  const headers = getAuthorizationHeaders()

  fetch(ENDPOINT, { headers })
    .then((response) => response.blob())
    .then((response) => {
      const date = formatShortDateTimeOutput(new Date())
      const filename = `profly_stocks_transactions_${date}.csv`
      const url = window.URL.createObjectURL(new Blob([response]))
      const link = createDownloadLink(url, filename)

      link.click()
      link.remove()
    })
}

export const exportChart = (chartNode) => {
  const svgURL = new XMLSerializer().serializeToString(chartNode)
  const svgBlob = new Blob([svgURL], { type: 'image/svg+xml;charset=utf-8' })
  const url = window.URL.createObjectURL(svgBlob)

  // Open in a new tab
  // window.open(url, '_blank', 'noopener,noreferrer')

  const link = createDownloadLink(url, 'test.svg')
  link.click()
  link.remove()
}
