import { Button } from "@/components/ui/button";

export default function Categories() {
  const categories = [
    { title: "K-Dramas", description: "Latest Korean dramas and series" },
    { title: "K-Pop", description: "Music, concerts, and artist news" },
    { title: "Movies", description: "Korean cinema and films" },
    { title: "Culture", description: "Traditions, food, and lifestyle" },
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-4xl font-bold">Categories</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <div
            key={category.title}
            className="rounded-lg border p-6 shadow-sm transition-all hover:shadow-md"
          >
            <h2 className="mb-2 text-xl font-semibold">{category.title}</h2>
            <p className="mb-4 text-muted-foreground">{category.description}</p>
            <Button variant="outline">Explore</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
