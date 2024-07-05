import { useSearchRestaurants } from "@/api/RestaurantApi";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SearchBar, { SearchForm } from "@/SearchBar";
import { useState } from "react";
import { useParams } from "react-router-dom";
export type SearchState={
  searchQuery:string;
  //user serching at searchabar mate 
}
const SearchPage = () => {
  const { city } = useParams();
  const [searchState,setSearchState] = useState<SearchState>({
    searchQuery:"",
    //this is the search query that user is searching for mate
  })
  const { results ,isLoading} = useSearchRestaurants(searchState,city);
  const setSearchQuery = (searchFormData:SearchForm)=>{
setSearchState((prevState)=>({
...prevState,
searchQuery:searchFormData.searchQuery,
}));
  };
  const resetSearch = ()=>{
    setSearchState((prevState)=>({
      ...prevState,
      searchQuery:"",
      }));
  }
  if(isLoading) {

    //like ur resut been loading then u will get the page 
    <span>Loading...</span>
  }
  if(!results?.data || !city){
    return <span>No results found </span>
  }//like if there are no dat ano result swill be displayed mate 

  return (
<div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
    <div id="cuisines-left">insert cuisines here  </div>
    <div id="main-content" className="flex flex-col gap-5">
      <SearchBar searchQuery={searchState.searchQuery} onSubmit={setSearchQuery} placeHolder="Search by Cuisisne or Restaurant Name" onReset={resetSearch}/>
        <SearchResultInfo total={results.pagination.total} city={city}/>
        {results.data.map((restaurant)=>(
            <SearchResultCard restaurant={restaurant}/>
        ))}
    </div>
</div>
  );
};

export default SearchPage;
