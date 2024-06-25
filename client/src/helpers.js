/**
 * Converts a string to lowercase and hyphenates it.
 * @param {string} str - The input string.
 * @return {string} - The processed string.
 */
function hyphenateAndLowercase(str) {
  return str
    .toLowerCase()            // Convert the string to lowercase
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/[^\w-]+/g, '') // Remove all non-word characters
    .replace(/--+/g, '-');  // Replace multiple hyphens with a single hyphen
}

function timeAgo(date) {
  const now = new Date();
  const secondsPast = (now.getTime() - new Date(date).getTime()) / 1000;

  if (secondsPast < 60) {
    const seconds = Math.floor(secondsPast);
    return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
  }
  if (secondsPast < 3600) {
    const minutes = Math.floor(secondsPast / 60);
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  }
  if (secondsPast <= 86400) {
    const hours = Math.floor(secondsPast / 3600);
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  }
  if (secondsPast <= 2592000) {
    const days = Math.floor(secondsPast / 86400);
    return `${days} day${days === 1 ? '' : 's'} ago`;
  }
  if (secondsPast <= 31536000) {
    const months = Math.floor(secondsPast / 2592000);
    return `${months} month${months === 1 ? '' : 's'} ago`;
  }
  const years = Math.floor(secondsPast / 31536000);
  return `${years} year${years === 1 ? '' : 's'} ago`;
}

function formatDate(isoDate) {
  const date = new Date(isoDate)
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
   
  const formattedDate = date.toLocaleString('en-US', options)
  return formattedDate
}

export { hyphenateAndLowercase, timeAgo, formatDate };
