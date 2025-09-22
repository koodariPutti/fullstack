const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  const likes = blogs.map(blog => blog.likes || 0);
  const total = likes.reduce((sum, current) => sum + current, 0);

  return total;
};

module.exports = {
  dummy,
  totalLikes,
};