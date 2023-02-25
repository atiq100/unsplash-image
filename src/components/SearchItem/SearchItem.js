import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
const SearchItem = () => {
  //     const [images, setImages] = useState([]);
  //     const [text, setText] = useState('');
  //     const [suggestions, setSuggestions] = useState([])

  //     const clientKey = process.env.REACT_APP_apiKey
  //   useEffect(() => {
  //     axios
  //       .get(`https://api.unsplash.com/search/photos?page=1&query=${text}&client_id=${clientKey}`)
  //       .then((response) => {
  //         setImages(response.data.results);
  //         console.log(response.data.results);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }, [text,clientKey]);

  //     const SuggestionHandler = (text) => {
  //         setText(text);
  //         setSuggestions([]);
  //     }

  //     const onChangeHandler = (text) => {
  //         let matches = []
  //         if(text.length > 0){
  //             matches = images.tags?.filter(image => {
  //                 const regex = new RegExp(`${text}`, "gi");
  //                 return image.title?.match(regex)
  //             })
  //         }
  //         console.log(matches);
  //         setSuggestions(matches)
  //         setText(text)
  //     }
  //     return (
  //         <div>
  //             <input type="text" name="" id="" onChange={e => onChangeHandler(e.target.value)}
  //             value={text}
  //             />
  //             {
  //                 suggestions && suggestions.tags?.map((suggestion,i) =>
  //                 <div key={i} onClick={()=>SuggestionHandler(suggestion.title)}>{suggestion.title}</div>)
  //             }
  //         </div>
  //     );
  // const [query, setQuery] = useState('');
  // const [photos, setPhotos] = useState([]);
  // const [suggestions, setSuggestions] = useState([]);
  const clientKey = process.env.REACT_APP_apiKey;
  const [query, setQuery] = useState("");
  const [tags, setTags] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (query.length > 0) {
      fetch(
        `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${clientKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          const newTags = data.results.flatMap((result) =>
            result.tags.map((tag) => tag.title)
          );
          setTags(newTags);
          setPhotos(data.results);
        });
    } else {
      setTags([]);
      setPhotos([]);
    }
  }, [query, clientKey]);

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    if (newQuery.length > 0) {
      fetch(
        `https://api.unsplash.com/search/photos?page=1&query=${newQuery}&client_id=${clientKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          const newSuggestions = data.results.map((result) => result.query);
          setSuggestions(newSuggestions);
        });
    } else {
      setSuggestions([]);
      setTags([]);

      setPhotos([]);
    }
  };
  const handleTagClick = (tag) => {
    setQuery(tag);
    setTags([]);
    setPhotos([]);
    setSuggestions([]);
  };
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
    setPhotos([]);
    if (tags.length > 0) {
      setTags([]);
      setPhotos([]);
    }
  };
  const handleKeyDown = (event) => {
    if (event.keyCode) {
      setTags([]);
    }
  };
  //   const SuggestionHandler = (tags) => {
  //              setTags(tags);
  //              setSuggestions([]);
  //          }

  //const totalResults = tags.length;

  return (
    <div className="my-5 ">
      <div
        className="my-5 bg-cover h-screen flex flex-col justify-center items-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=600')",
        }}
      >
        <h1 className="text-3xl font-bold text-white my-5">Search photos</h1>
        <div className="relative ">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              type="submit"
              title="Search"
              className="p-1 focus:outline-none focus:ring"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 512 512"
                className="w-4 h-4 text-gray-600"
              >
                <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
              </svg>
            </button>
          </span>
          <form onSubmit={(event) => event.preventDefault()} className="">
            <label htmlFor="query" className="sr-only">
              Search
            </label>
            <input
              type="text"
              id="query"
              name="query"
              placeholder="Search..."
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="w-80 py-4 pl-10 text-sm rounded-md sm:w-[600px] focus:outline-none bg-gray-200 text-gray-600 focus:bg-gray-100"
            />
          </form>
        </div>
        <ul className="">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="cursor-pointer hover:text-blue-500"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
        {/* <p className="mb-2">{totalResults} tags for "{query}"</p> */}
        <ul>
          {tags?.slice(0, 4).map((tag, index) => (
            <li
              key={index}
              onClick={() => handleTagClick(tag)}
              className="text-white"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            photo={photo}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={photo.urls.regular}
              alt={photo.alt_description}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-medium mb-2">
                {photo.description || photo.alt_description}
              </h2>
              <p className="text-gray-600 text-sm mb-2">By {photo.user.name}</p>
              <a
                href={photo.links.html}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View on Unsplash
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchItem;
