function solve() {
    class Post {
        constructor(title,content) {
            this.title = title;
            this.content = content;
        }
        toString() {
            if(this.comments) {
                let string = '';
                if(this.comments.length === 0) {
                    string += `Post: ${this.title}\nContent: ${this.content}\nRating: ${this.likes - this.dislikes}`;
                }else {
                    string += `Post: ${this.title}\nContent: ${this.content}\nRating: ${this.likes - this.dislikes}\nComments:`;
                    this.comments.forEach(comment => {
                        string += `\n * ${comment}`
                    });
                }
                return string;
            }
            if (this.views) {
                return `Post: ${this.title}\nContent: ${this.content}\nViews: ${this.views}`;
            }
            return `Post: ${this.title}\nContent: ${this.content}`;
        }
    }
    class SocialMediaPost extends Post {
        constructor(title,content,likes,dislikes) {
            super(title,content);
            this.comments = [];
            this.likes = likes;
            this.dislikes = dislikes;
        }
        addComment(_comment) {
            let comment = _comment;
            this.comments.push(comment);
        }
    }
    class BlogPost extends Post {
        constructor(title, content,views) {
            super(title,content);
            this.views = views;
        }
        view() {
            this.views += 1;
            return this;
        }
    }
    return {
        Post,
        SocialMediaPost,
        BlogPost
    }
}
solve();