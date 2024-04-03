import GridPostList from "@/components/shared/GridPostList";
import SearchResults from "@/components/shared/SearchResults";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { useGetPosts, useSearchPosts } from "@/lib/react-query/queriesAndMutation";
import { Loader } from "lucide-react";
import { useState } from "react";

const Explore = () => {
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts()

  const [searchValue, setSearchvalue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);
  const { data: searchPosts, isFetching: isSearchFetching} = useSearchPosts(searchValue)
  useSearchPosts(debouncedValue)

  console.log(posts)

  if(!posts) {
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    )
  }

  console.log(posts)


  const shouldShowSearchResults = searchValue !== '';
  const shouldShowPosts = !shouldShowSearchResults 
    && posts.pages.every((item) => item.documents.length === 0)

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
        <h3 className="body-bold md:h3-bold">Popular today</h3>

        <div className="flex gap-2 bg-dark-4 rounded-lg p-1 cursor-pointer">
          <p className="text-light-2 small-medium lg:base-medium">All</p>
          <img src="/assets/icons/filter.svg" alt="filter" width={18} height={18} />
        </div>
      </div>

      <div className="flex flex-wrap gap-10 w-full max-w-5xl">
        {shouldShowSearchResults ? (
          <SearchResults />

        ) : shouldShowPosts ? (
          <p className="text-light-3 items-center w-full">End of posts</p>
        ) : posts.pages.map((item, index) => (
          <GridPostList key={`page-${index}`} posts={item?.documents} />
        )
        )}
      </div>
    </div>
  );
};

export default Explore;
