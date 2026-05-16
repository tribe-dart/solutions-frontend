type PageHeroProps = {
  title: string;
  imageUrl?: string;
};

const defaultHeroImage = "/pages/hero-team.png";

export default function PageHero({ title, imageUrl }: PageHeroProps) {
  return (
    <section
      className="relative flex min-h-[280px] items-center justify-center bg-cover bg-center sm:min-h-[340px]"
      style={{ backgroundImage: `url(${imageUrl ?? defaultHeroImage})` }}
    >
      <div className="absolute inset-0 bg-black/65" />
      <h1 className="relative z-10 px-4 text-center text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
        {title}
      </h1>
    </section>
  );
}
