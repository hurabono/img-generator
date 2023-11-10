import React, { useState, useEffect, Fragment } from "react";
import { Loader, Card, FormField } from "../components";

const Home = () => {

  const RenderCard = ({ data, title }) => {
    if (data?.length > 0) {
      return data.map((post) => <Card key={post._id} {...post} />);
    }

    return (
      <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">
        {title}
      </h2>
    );
  };

  const [isLoading, setIsLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://ai-img-generator-9r2s.onrender.com/api/v1/post",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const result = await response.json();
          setAllPosts(result.data.reverse());
        }
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div className="bg-[url('./assets/section.png')] bg-contain bg-no-repeat bg-center w-full h-[22rem]"></div>
      <div>
        <h1 className="font-extrabold text-[#fafafa] text-[2rem] lg:text-[5rem] text-center max-w-[1000px] mx-auto">
          The Community Showcase
        </h1>
        <p className="mt-2 text-[#fafafa] text-[1rem] max-w-[500px] mx-auto text-center tracking-wider">
          Browse through a collection of imaginative and visually stunning
          images generaated by DALL-E AI
        </p>
      </div>
      <div className="mt-16">
        <FormField
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>
      <div className="mt-10">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <Fragment>
            {searchText && (
              <h2 className="font-medium text-[#fafafa] text-xl mb-3">
                Showing results for:
                <span className="text-[#fafafa] ml-1">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCard
                  data={searchedResults}
                  title="No search results found"
                />
              ) : (
                <RenderCard data={allPosts} title="No posts found" />
              )}
            </div>
          </Fragment>
        )}
      </div>
    </section>
  );
};

export default Home;