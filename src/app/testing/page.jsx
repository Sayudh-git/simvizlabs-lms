import FullscreenIframeCarousel from "./FullscreenIframeCarousel";

export default function Page() {
  const sources = [
    { title: "Simviz Live Playground", url: "https://embed.figma.com/slides/3jJ9MDen2IMo4hl75OOEEw/A320-LMS-Presentation?node-id=1-83&embed-host=share" },
    { title: "MDN iframe guide", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe" },
    { title: "Next.js", url: "https://nextjs.org" }
  ];

  return (
    <main className="min-h-screen">
      <FullscreenIframeCarousel sources={sources} />
    </main>
  );
}