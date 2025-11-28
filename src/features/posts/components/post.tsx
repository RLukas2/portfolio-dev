import PostContent from './post-content';
import PostFooter from './post-footer';
import PostHeader from './post-header';
import PostThumbnail from './post-thumbnail';
import RelatedPosts from './related-posts';

const Post = () => {
  return (
    <>
      {/* Hero Image */}
      <PostThumbnail />

      {/* Post Details */}
      <PostHeader />

      {/* Reading Section */}
      <PostContent />
      <PostFooter />

      {/* Related Posts */}
      <RelatedPosts />
    </>
  );
};

export default Post;
