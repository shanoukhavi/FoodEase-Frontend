import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

type Props={
 page:number;
 pages:number;
 onPageChange:(page:number)=>void;
}
//props ur ading as the number mate 

const PaginationSelector=({page,pages,onPageChange}:Props)=>{
 const pageNumbers=[];
 //pages--3 [1,2,3] pages mate 
for(let i=1;i<=pages;i++){
    pageNumbers.push(i);
}
return(
    <Pagination>
        <PaginationContent>
            {page !==1 &&       <PaginationItem>
                <PaginationPrevious href="#" onClick={()=>onPageChange(page-1)}/>
            </PaginationItem>}
      
            {pageNumbers.map((number)=>(
<PaginationItem>
    <PaginationLink href="#" onClick={()=>onPageChange(number)} isActive={page===number}>
        {number}
    </PaginationLink>
</PaginationItem>

            ))}
            {page!==pageNumbers.length && (
               < PaginationItem>
               <PaginationNext href="#" onClick={()=>onPageChange(page+1)}/>
               </PaginationItem>

            )}
            {/* if only next button is shown if u have other pages to be diaplayed tgherewise it wont be shown  */}
        </PaginationContent>
    </Pagination>
)
}

export default PaginationSelector;