import PostForm from "@/components/forms/PostForm";

const CreatePost = () => {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex-start gap-2">
          <img 
            src="public/assets/icons/add-post.svg" 
            alt="add" 
            width={36}
            height={36} 
          />
          <p className="h3-bold md:h2-bold text-left">Create Post</p>
        </div>
      <PostForm action='Create' />
      </div>
    </div>
  );
};

export default CreatePost;
