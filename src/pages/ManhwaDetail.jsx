import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { manwhaService } from "@/services/apiService";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function ManhwaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [manhwa, setManhwa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchManhwaDetails = async () => {
      try {
        setLoading(true);
        const response = await manwhaService.getManhwaDetails(id);
        setManhwa(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch manhwa details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchManhwaDetails();
    }
  }, [id]);

  const handleChapterClick = (chapterId) => {
    navigate(`/manhwa/${id}/chapter/${chapterId}`);
  };

  if (loading) {
    return (
      <div className="w-full px-4 py-8 flex justify-center items-center min-h-[400px]">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full px-4 py-8 flex justify-center items-center min-h-[400px]">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!manhwa) {
    return (
      <div className="w-full px-4 py-8 flex justify-center items-center min-h-[400px]">
        <p>Manhwa not found</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <Button variant="ghost" className="mb-6" onClick={() => navigate("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cover Image - Sticky Container */}
          <div className="md:col-span-1">
            <div className="md:sticky md:top-8">
              <div className="aspect-[3/4] relative overflow-hidden rounded-lg border shadow-lg">
                <img
                  src={manhwa.image}
                  alt={manhwa.title}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="md:col-span-2">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-4">{manhwa.title}</h1>

                {/* Status Badge */}
                {manhwa.status && (
                  <span className="inline-block px-3 py-1 text-sm font-semibold bg-primary text-primary-foreground rounded-full mb-4">
                    {manhwa.status}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="space-y-4">
                {manhwa.info?.[0] && (
                  <>
                    {manhwa.info[0]["Alt Name"] && (
                      <p>
                        <span className="font-semibold">Alternative Name:</span>{" "}
                        {manhwa.info[0]["Alt Name"]}
                      </p>
                    )}
                    {manhwa.info[0].Author && (
                      <p>
                        <span className="font-semibold">Author:</span>{" "}
                        {manhwa.info[0].Author}
                      </p>
                    )}
                    {manhwa.info[0].Artist && (
                      <p>
                        <span className="font-semibold">Artist:</span>{" "}
                        {manhwa.info[0].Artist}
                      </p>
                    )}
                    {manhwa.info[0].Genre && (
                      <div>
                        <span className="font-semibold">Genres:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {manhwa.info[0].Genre.map((genre) => (
                            <span
                              key={genre}
                              className="px-2 py-1 text-sm bg-secondary text-secondary-foreground rounded-full"
                            >
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Summary */}
              {manhwa.summary && (
                <div>
                  <h2 className="text-xl font-semibold mb-2">Summary</h2>
                  <p className="text-muted-foreground">{manhwa.summary}</p>
                </div>
              )}

              {/* Chapters */}
              {manhwa.chapters && manhwa.chapters.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Chapters</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {manhwa.chapters.map((chapter) => (
                      <div
                        key={chapter.chapterId}
                        onClick={() => handleChapterClick(chapter.chapterId)}
                        className="p-3 rounded-lg border hover:bg-accent cursor-pointer transition-colors"
                      >
                        <p className="font-medium">{chapter.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {chapter.releaseDate}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
