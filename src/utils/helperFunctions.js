import moment from 'moment';

export function formatNumber(number) {
    const formatter = Intl.NumberFormat("en", { notation: "compact" });
    return formatter.format(number);
  }


export function formatTime(time) {
  if(!time) { 
    return;
  }
  const redditTimestamp = time;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  
  const redditMoment = moment.unix(redditTimestamp);
  const currentMoment = moment.unix(currentTimestamp);

  const duration = moment.duration(currentMoment.diff(redditMoment));
  const years = duration.years();
  const months = duration.months();
  const weeks = duration.weeks();
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();
  
  if(years >= 1) {
    return `${years} years ago`
  }
  else if(months >= 1) {
    return `${months} months ago`
  }
  else if(weeks >= 1) {
    return `${weeks} weeks ago`
  }
  else if(days >= 1) {
    return `${days} days ago`
  }
  else if(hours >= 1) {
    return `${hours} hours ago`
  }
  else if(minutes >= 1) {
    return `${minutes} minutes ago`
  }
  else if(seconds >= 1) {
    return `${seconds} seconds ago`
  }
  else {
    throw new Error('Error: Cant format time. Time = ' + time)
  }
}
/* ReactMarkdown npm package uses the traditional markdown syntax
   and doesn't recognize headers written like this #Header this 
   function adds a space after every # that is followed by a string
   before using ReactMarkdown to parse the comment body */
   export const fixRedditMarkdown = string => {
    const modifiedInput = string
      .replace(/(#+)([^#\n ])/g, (match, p1, p2) => p1 + ' ' + p2)
      .replace(/&amp;#x200B;/g, '/'); 
    return modifiedInput;
  }
  
export const capitalizeFirstLetter = str => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const shortenLink = (link, charLimit) =>  {
  if(!link) {
    return;
  }
  const newStringArr = [];
  if(link.length > charLimit) {
    for(let i = 0; i < charLimit; i++) {
      newStringArr.push(link[i]);
    }
    const newString = newStringArr.join('') + '...';
    return newString;
  }
  return link;
}

/*For some reason when you fetch data from subreddits half of the
  time the links are broken and have &amp; in random places*/
export const fixRedditLink = inputString => {
  if(!inputString) {
    return
  }
  return inputString.replace(/amp;/g, '');
}

export const formatSearchTerm = term => {
  return term.replace(/\s+/g, '_');
}


/*For some reason people like to use &amp in reddit 
  or atleast the json data includes alot of them */
export const removeAmp = inputString => {
  return inputString.replace(/&amp;/g, '');
}

export const convertUnixTimpestamp = timestamp => {
  const date = new Date(timestamp * 1000);
  const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  return formattedDate;
}

export function decodeHtmlEntities(input) {
  if(!input || typeof input !== 'string' ) {
    console.log(input);
    console.log(typeof input);
    return;
  }
  return input.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

export const convertToEmbeddedURL = (inputURL) => {
  // Extract the video ID from the input URL
  const videoIdMatch = inputURL.match(/v=([A-Za-z0-9_-]+)/);
  if (videoIdMatch) {
    const videoId = videoIdMatch[1];
    
    // Construct the embedded URL
    const embeddedURL = `https://www.youtube.com/embed/${videoId}`;
    
    return embeddedURL;
  } else {
    // Handle invalid input URL
    return;
  }
}

export const getSearchFilterDisplayName = (filter) => {
  switch(filter) {
    case 'relevance':
      return 'Relevance';
    case 'hot':
      return 'Hot';
    case 'top': 
      return 'Top';
    case 'new':
      return 'New';
    case 'comments':
      return 'Most Comments' 
    case 'all':
      return 'All Time';
    case 'year':
      return 'Past Year';
    case 'month':
      return 'Past Month';
    case 'week': 
      return 'Past Week';
    case 'day':
      return 'Past 24 Hours'
    case 'hour':
      return 'Past Hour'
    default:
      return filter;
  }
}

/* While browsing users comments the permalink has a unique id which only
   returns the comment the user posted and not the other comments on that
   post. This is not the behaviour I want. This function removes the unique
   id so clicking on the users comments opens up the whole comment section*/
export const reformatCommentUrl = (redditURL) => {
const modifiedURL = redditURL.replace(/\/([^/]+)\/[^/]+\/$/, '/$1/');

return modifiedURL;
}