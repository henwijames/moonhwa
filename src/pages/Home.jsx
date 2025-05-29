import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="w-full px-4 py-8">
      <div className="max-w-6xl mx-auto flex justify-center items-center flex-col text-center">
        <h1 className="mb-2 text-4xl font-bold">Welcome to Moonhwa</h1>
        <p className="mb-4 text-lg text-muted-foreground">
          Your favorite manhwa, beautifully delivered.
        </p>
        <Button>Explore Now</Button>
      </div>
    </section>
  );
}
