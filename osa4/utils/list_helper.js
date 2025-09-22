const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  const likes = blogs.map(blog => blog.likes || 0);
  const total = likes.reduce((sum, current) => sum + current, 0);

  return total;
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }
  
  let favorite = blogs[0];
  for (const blog of blogs) {
    if ((blog.likes || 0) > (favorite.likes || 0)) {
      favorite = blog;
    }
  }
  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes || 0,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};