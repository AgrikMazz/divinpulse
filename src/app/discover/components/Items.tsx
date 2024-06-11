import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import ArtifactMC from "./ArtifactMC";
  

const Items = () => {
    return (
        <div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                    <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                    <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                    <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
            <div className="grid w-lg mb-6 mx-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                <ArtifactMC /><ArtifactMC /><ArtifactMC /><ArtifactMC /><ArtifactMC /><ArtifactMC />
            </div>
        </div>
    );
}
 
export default Items;