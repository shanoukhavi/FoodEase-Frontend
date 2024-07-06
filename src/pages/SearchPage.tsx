import { useSearchRestaurants } from "@/api/RestaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import SearchBar, { SearchForm } from "@/SearchBar";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Restaurant, RestaurantSearchResponse } from "@/types";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};

const SearchPage = () => {
  const { city } = useParams<{ city: string }>();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { results, isLoading } = useSearchRestaurants(searchState, city);

  const setSortOption = (sortOption: string) => {
    setSearchState((prevState) => ({
      ...prevState,
      sortOption,
      page: 1,
    }));
  };

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: searchFormData.searchQuery,
      page: 1,
    }));
  };

  const resetSearch = () => {
    setSearchState((prevState) => ({
      ...prevState,
      searchQuery: "",
      page: 1,
    }));
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (!results?.data || !city) {
    return <span>No results found</span>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-left">
        <CuisineFilter
          selectedCuisines={searchState.selectedCuisines}
          isExpanded={isExpanded}
          onExpandedClick={() => setIsExpanded((prevIsExpanded) => !prevIsExpanded)}
          onChange={setSelectedCuisines}
        />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder="Search by Cuisine or Restaurant Name"
          onReset={resetSearch}
        />
        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultInfo total={results.pagination.total} city={city} />
          <SortOptionDropdown
            sortOption={searchState.sortOption}
            onChange={(value) => setSortOption(value)}
          />
        </div>
        {results.data.map((restaurant: Restaurant) => (
          <SearchResultCard key={restaurant._id} restaurant={restaurant} />
        ))}
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default SearchPage;




















































// import { useSearchRestaurants } from "@/api/RestaurantApi";
// import CuisineFilter from "@/components/CuisineFilter";
// import PaginationSelector from "@/components/PaginationSelector";
// import SearchResultCard from "@/components/SearchResultCard";
// import SearchResultInfo from "@/components/SearchResultInfo";
// import SortOptionDropdown from "@/components/SortOptionDropdown";
// import SearchBar, { SearchForm } from "@/SearchBar";
// import { useState } from "react";
// import { useParams } from "react-router-dom";
// export type SearchState={
//   searchQuery:string;
//   page:number;
//   selectedCuisines:string[];
//   sortOption:string;
//   //user serching at searchabar mate 
// }
// const SearchPage = () => {
//   const { city } = useParams();
//   const [searchState,setSearchState] = useState<SearchState>({
//     searchQuery:"",
//     page:1,
//     selectedCuisines:[],
//     sortOption:"bestMatch",
//     // it will be selected cuisines by user mate
//     //this is the search query that user is searching for mate
//   });
//   const [isExpanded,setIsExpanded]=useState<boolean>(false);
//   const { results ,isLoading} = useSearchRestaurants(searchState,city);
//   const setSortOption=(sortOption:string)=>{
// setSearchState((prevState)=>({
//   ...prevState,
//   sortOption,
//   page:1,
// }))
//   }
//   const setSelectedCuisines=(selectedCuisines:string[])=>{
// setSearchState((prevState)=>({
// ...prevState,
// selectedCuisines,
// page:1,
// }))
//   }
//   const setPage=(page:number)=>{
//     setSearchState((prevState)=>({
//      ...prevState,
//       page,
//     }));
//   }
//   const setSearchQuery = (searchFormData:SearchForm)=>{
// setSearchState((prevState)=>({
// ...prevState,
// searchQuery:searchFormData.searchQuery,
// page:1
// }));
//   };
//   const resetSearch = ()=>{
//     setSearchState((prevState)=>({
//       ...prevState,
//       searchQuery:"",
//       page:1,
//       }));
//       // now see agian if u go to 3rd and go for first oage it is reaseted to 1 
//   }
//   if(isLoading) {

//     //like ur resut been loading then u will get the page 
//     <span>Loading...</span>
//   }
//   if(!results?.data || !city){
//     return <span>No results found </span>
//   }//like if there are no dat ano result swill be displayed mate 

//   return (
// <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
//     <div id="cuisines-left"><CuisineFilter selectedCuisines={searchState.selectedCuisines} isExpanded={isExpanded} onExpandedClick={()=>setIsExpanded((prevIsExpanded)=>!prevIsExpanded)}
//     onChange={setSelectedCuisines}/>  </div>
//     <div id="main-content" className="flex flex-col gap-5">
//       <SearchBar searchQuery={searchState.searchQuery} onSubmit={setSearchQuery} placeHolder="Search by Cuisisne or Restaurant Name" onReset={resetSearch}/>
//       {/* se ehtat both ensure together by liitlle amount of the space  */}
//       <div className="flex justify-between flex-col gap-3 lg:flex-row">
//       <SearchResultInfo total={results.pagination.total} city={city}/>
//       <SortOptionDropdown sortOption={searchState.sortOption} onChange={(value)=>setSortOption(value)}/>
//       </div>
     
//         {results.data.map((restaurant)=>(
//             <SearchResultCard restaurant={restaurant}/>
//         ))}
//         <PaginationSelector page={results.pagination.page} pages={results.pagination.pages}
//         onPageChange={setPage}/>
//     </div>
// </div>
//   );
// };

// export default SearchPage;
// //11:21
