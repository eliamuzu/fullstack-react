const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    return blogs.length > 0 
        ? (blogs.reduce((sum, blog) => sum + blog.likes, 0)) : 0;
}

const favoriteBlog = (blogs) => {
    if (blogs.length == 0) return 0;
    return blogs.reduce((fav, blog) => blog.likes > fav.likes ? blog : fav, blogs[0])
}

const mostBlogs = (blogs) => {
   const counts = {};
    blogs.forEach(blog => {
        counts[blog.author] = (counts[blog.author] || 0) + 1;
    });
    
    let maxxAuthor = null;
    let maxBlogs = 0;
    for(const author in counts){
        if(counts[author] > maxBlogs){
            maxAuthor = author;
            maxBlogs = counts[author];
        }
    }

    return {author: maxAuthor, blogs: maxBlogs}
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}