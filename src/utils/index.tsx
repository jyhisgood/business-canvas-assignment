export const convertYoutubeURL = (url: string): string | undefined => {
  const regex =
    /(?:https:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
  const match = url.match(regex);

  if (match) {
    const videoID = match[1];
    const embedURL = `https://www.youtube.com/embed/${videoID}`;
    return embedURL;
  } else {
    return undefined;
  }
};

export const checkURL = (url: string): string | undefined => {
  const youtubeURLRegex =
    /(?:https:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
  const isYoutube = url.match(youtubeURLRegex);

  if (isYoutube) return convertYoutubeURL(url);
  else return url;
};
