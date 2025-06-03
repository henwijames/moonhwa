import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { manwhaService } from "@/services/apiService";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

export default function ManhwaChapter() {
  const { id, chapter } = useParams();
  const navigate = useNavigate();
  const [chapterData, setChapterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChapterData = async () => {
      try {
        setLoading(true);
        const response = await manwhaService.getManhwaChapter(id, chapter);
        setChapterData(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch chapter data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id && chapter) {
      fetchChapterData();
    }
  }, [id, chapter]);

  const handlePreviousChapter = () => {
    const prevChapter = parseInt(chapter) - 1;
    if (prevChapter >= 1) {
      navigate(`/manhwa/${id}/chapter/${prevChapter}`);
    }
  };

  const handleNextChapter = () => {
    const nextChapter = parseInt(chapter) + 1;
    navigate(`/manhwa/${id}/chapter/${nextChapter}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === "ArrowLeft") {
      handlePreviousChapter();
    } else if (e.key === "ArrowRight") {
      handleNextChapter();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [chapter]);

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

  if (!chapterData) {
    return (
      <div className="w-full px-4 py-8 flex justify-center items-center min-h-[400px]">
        <p>Chapter not found</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-background">
      {/* Navigation Bar */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate(`/manhwa/${id}`)}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Details
          </Button>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={handlePreviousChapter}
              disabled={parseInt(chapter) <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <span className="font-medium">Chapter {chapter}</span>
            <Button variant="outline" onClick={handleNextChapter}>
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Chapter Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div>
          {chapterData.images?.map((image, index) => (
            <div key={index} className="relative  w-full overflow-hidden">
              <img
                src={image}
                alt={`Page ${index + 1}`}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
