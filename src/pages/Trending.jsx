import { Button } from "@/components/ui/button";

export default function Trending() {
  const trendingItems = [
    {
      title: "Latest K-Drama",
      description: "The most popular drama this week",
      image: "https://via.placeholder.com/300x200",
    },
    {
      title: "Top K-Pop Song",
      description: "Chart-topping music hits",
      image: "https://via.placeholder.com/300x200",
    },
    {
      title: "Popular Movie",
      description: "Blockbuster Korean films",
      image: "https://via.placeholder.com/300x200",
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-4xl font-bold">Trending Now</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {trendingItems.map((item) => (
          <div
            key={item.title}
            className="overflow-hidden rounded-lg border shadow-sm"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="mb-2 text-xl font-semibold">{item.title}</h2>
              <p className="mb-4 text-muted-foreground">{item.description}</p>
              <Button>Learn More</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
