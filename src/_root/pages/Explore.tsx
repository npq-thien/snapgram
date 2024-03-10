import { Input } from "@/components/ui/input";
import { useState } from "react";

const Explore = () => {
  const [searchValue, setSearchvalue] = useState("");

  const posts = [];

  const shouldShowSearchResults = searchValue !== '';
  const shouldShowPosts = !shouldShowSearchResults 
    && posts.pages.every((item) => item.document.length > 0)

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold lg:h2-bold w-full">Search Posts</h2>

        <div className="flex w-full px-2 gap-1 rounded-lg bg-dark-4">
          <img src="/assets/icons/search.svg" alt="search" width={24} height={24} />

          <Input
            type="text"
            className="explore-search"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => setSearchvalue(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-between max-w-5xl w-full mt-16">
        <h2 className="h3-bold lg:h2-bold flex">Popular today</h2>

        <div className="flex gap-2 bg-dark-4 rounded-lg p-1 cursor-pointer">
          <p className="text-light-2 small-medium lg:base-medium">All</p>
          <img src="/assets/icons/filter.svg" alt="filter" width={18} height={18} />
        </div>
      </div>

      <div className="flex">
        {shouldShowSearchResults ? (
          <SearchResults />

        ) : shouldShowPosts ? (
          <p className="text-light-3 items-center w-full">End of posts</p>
        ) : posts.pages.map((item, index) => (
          <GridPostList key={`page-${index}`} posts={item.documents} />
        )
        )}
      </div>
    </div>
  );
};

export default Explore;
