import GridPostList from "@/components/shared/GridPostList";
import SearchResults from "@/components/shared/SearchResults";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { useGetPosts, useSearchPosts } from "@/lib/react-query/queriesAndMutatuions";
import { Loader } from "lucide-react";
import { useState,useEffect } from "react";
import { useInView } from "react-intersection-observer";
export type SearchResultProps = {
  isSearchFetching: boolean;
  searchedPosts: Document[] | undefined;
};
const Explore = () => {
  const {ref, inView} = useInView()
  const {data: posts, fetchNextPage, hasNextPage}=useGetPosts()
  const [searchValue, setSearchValue] = useState("");
  const debounceValue = useDebounce(searchValue, 500)
const {data: searchedPosts, isFetching: isSearchFetching} = useSearchPosts(debounceValue)
useEffect(()=>{
  if(inView && !searchValue) fetchNextPage()
},[inView,searchValue])
  if(!posts){
    return (
      <div className="flex-center w-full  h-full"><Loader/></div>
    )
  }
  const shouldShowSearchResults = searchValue !== ''
  const shouldShowPosts = !shouldShowSearchResults && posts.pages.every((item)=> item?.documents.length === 0) 
  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">search posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-lg bg-dark-4">
          <img
            src="/assets/icons/search.svg"
            alt="search"
            width={28}
            height={28}
          />
          <Input
            type="text"
            placeholder="search"
            className="explore-search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-between w-full max-w-5xl mt-16 mb-7" >
        <h3 className="body-bold md:h3-bold ">Popular today</h3>
        <div className="flex-center gap-3 bg-dark-3 rounded-xl px-4 py-2 cursor-pointer">
          <p className="">All</p>
        <img src="/assets/icons/filter.svg" width={20} height={20}  alt="filter"/></div>

      </div>
      <div>
        {shouldShowSearchResults ? (
          <SearchResults isSearchFetching={isSearchFetching} searchedPosts={searchedPosts }/>
        ) : shouldShowPosts ?(
          <p className="text-light-4 mt-10 text-center w-full">end of feed</p>
        ) : posts.pages.map((item, index)=>(
          <GridPostList key={`page-${index}`} posts={item?.documents || []}/>
        ))}
      </div>
      {
        hasNextPage && !searchValue &&(
          <div ref={ref} className="mt-10">
            <Loader/>
          </div>
        )
      }
    </div>
  );
};

export default Explore;
