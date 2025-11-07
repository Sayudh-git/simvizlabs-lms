import Image from "next/image";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { data as moduleData } from "../dashboard/[courses]/[module]/sidebar";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import RichText from "@/components/RichText";
import { useEffect, useRef } from "react";
// import Exercise from "../dashboard/[courses]/[module]/exercise/page";


export default function Article({ article, onArticleCompleted }) {
  console.log(article, "article");
  console.log(article.content, "article content");
  
  const articleRef = useRef(null);
  const completionTriggered = useRef(false);

  // Track scroll progress and mark as completed when user has scrolled through most of the content
  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current || completionTriggered.current || !onArticleCompleted) return;
      
      const element = articleRef.current;
      const scrollTop = element.scrollTop;
      const scrollHeight = element.scrollHeight;
      const clientHeight = element.clientHeight;
      
      // Mark as completed when user has scrolled through 80% of the content
      const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;
      
      if (scrollPercentage >= 0.8) {
        completionTriggered.current = true;
        onArticleCompleted();
      }
    };

    const element = articleRef.current;
    if (element) {
      element.addEventListener('scroll', handleScroll);
      
      // Also check on initial load in case content is short
      handleScroll();
      
      return () => {
        element.removeEventListener('scroll', handleScroll);
      };
    }
  }, [onArticleCompleted]);

  return (
    <div 
      ref={articleRef}
      className="flex flex-1 flex-col px-4 py-8 text-[#344054] pt-0 overflow-hidden w-full overflow-y-auto"
    >
      
      {/* <header className="mb-8">
        <h1 className="text-2xl font-bold mb-1">{article.title}</h1>
        {article.subtitle && (
          <h2 className="text-xl text-gray-600 mb-4">{article.subtitle}</h2>
        )}
      </header> */}
      <main>
        <article>
          {article.content && <RichText className="mx-auto" data={article.content[0].content} enableGutter={false} />}
        </article>
      </main>
      {/* <main>
        {article.content.map((item, index) => {
          switch (item.type) {
            case "paragraph":
              return (
                <p key={index} className="mb-4 text-md leading-relaxed">
                  {item.content}
                </p>
              );
            case "heading":
              return (
                <h2 key={index} className="text-xl font-bold my-4">
                  {item.content}
                </h2>
              );
              case "subheading":
              return (
                <h2 key={index} className="text-base font-bold my-4">
                  {item.content}
                </h2>
              );
            case "image":
              return (
                <figure key={index} className="my-8 flex justify-center">
                  <Image
                    src={item.content}
                    alt="Article image"
                    width={1080}
                    height={1080}
                    objectFit="cover"
                    className="rounded-lg w-[60%] "
                  />
                </figure>
              );
            case "html":
              return (
                <div key={index}>
                  <div dangerouslySetInnerHTML={{ __html: item.content }} />
                </div>
              );
            case "table":
              return (
                <div className="flex flex-row gap-3" key={index}>
                  <div className="text-nowrap">{item.content.left}</div>
                  <div>{item.content.right}</div>
                </div>
              );
              case "list":
                return (
                  <ul 
                    key={index} 
                    className={` ml-6 ${
                      item.cssClass == null || item.cssClass == undefined 
                        ? "list-disc" 
                        : item.cssClass
                    } space-y-2 mb-3 `}
                  >
                    {item.list.map((innerItem) => {
                      return (<li>{innerItem}</li>);
                    })}
                  </ul>
                );
            case "list2":
              return(
                <ul 
                  key={index} 
                  className={` ml-6 ${
                    item.cssClass == null || item.cssClass == undefined 
                      ? "list-disc" 
                      : item.cssClass
                  } space-y-2 mb-3 `}
                >
                  {item.list2.map((innerItem) => {
                    return (<li><strong className={`${innerItem?.cssClass}`}>{innerItem.subheading2}</strong>: { innerItem.content2}</li>); 
                  })}
                </ul>
              )
            default:
              return null;
          }
        })}
      </main> */}
    </div>
  );
}
