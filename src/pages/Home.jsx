import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { manwhaService } from "@/services/apiService";
import { Pagination } from "@/components/ui/pagination";
import { SearchInput } from "@/components/ui/search-input";
import { useDebounce } from "@/hooks/use-debounce";

export default function Home() {
  const navigate = useNavigate();
  const [manwhaList, setManwhaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when search changes
  }, [debouncedSearch]);

  useEffect(() => {
    fetchManwha(currentPage, debouncedSearch);
  }, [currentPage, debouncedSearch]);

  const fetchManwha = async (page, search = "") => {
    try {
      setLoading(true);
      let response;

      if (search) {
        response = await manwhaService.searchManhwa(search);
        setManwhaList(response.data || []);
        setTotalPages(1); // Search results are not paginated
      } else {
        response = await manwhaService.getHomePage(page);
        setManwhaList(response.data);
        setTotalPages(Math.max(...response.pagination));
      }

      setError(null);
    } catch (err) {
      setError("Failed to fetch manhwa data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleManhwaClick = (manhwaId) => {
    navigate(`/manhwa/${manhwaId}`);
  };

  if (error) {
    return (
      <div className="w-full px-4 py-8 flex justify-center items-center min-h-[400px]">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="mb-2 text-4xl font-bold">Welcome to Moonhwa</h1>
          <p className="mb-4 text-lg text-muted-foreground">
            Your favorite manhwa, beautifully delivered.
          </p>
          <div className="max-w-md mx-auto">
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
              placeholder={searchQuery ? "Searching..." : "Search manhwa..."}
            />
          </div>
        </div>
        {loading ? (
          <div className="w-full px-4 py-8 flex justify-center items-center min-h-[400px]">
            <p>Loading...</p>
          </div>
        ) : manwhaList.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              {searchQuery
                ? "No manhwa found matching your search."
                : "No manhwa available at the moment."}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {manwhaList.map((manwha) => (
                <div
                  key={manwha.index}
                  onClick={() => handleManhwaClick(manwha.manwhaId)}
                  className="group relative overflow-hidden rounded-lg border bg-background p-2 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="aspect-[3/4] relative overflow-hidden rounded-md">
                    <img
                      src={manwha.image}
                      alt={manwha.title}
                      className="object-cover w-full h-full transition-transform group-hover:scale-105"
                    />
                    {manwha.status && (
                      <span className="absolute top-2 right-2 px-2 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded">
                        {manwha.status}
                      </span>
                    )}
                  </div>
                  <div className="mt-2">
                    <h3 className="font-semibold line-clamp-1">
                      {manwha.title}
                    </h3>
                    {manwha.latestEp?.[0] && (
                      <p className="text-sm text-muted-foreground">
                        {manwha.latestEp[0].title}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {!searchQuery && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
