import React, { useEffect, useRef, useState } from "react";
import Book from "./Book";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Display = () => {
  const queryClient = useQueryClient(); // this useQuery is going to hold your data
  // const [books, setBooks] = useState([]); // hence this is no longer necessary
  const titleRef = useRef();
  const authorRef = useRef();
  const yearRef = useRef();

  const getData = async () => {
    // try { // this is also not necessary
    const res = await fetch(import.meta.env.VITE_SERVER + "/lesson/books");

    if (!res.ok) {
      throw new Error("fetching error");
    }
    return await res.json();
    // const data = await res.json();
    // setBooks(data);
    // } ;
  };

  // if you want to do destructuring, const {queryIsError: isError}
  const query = useQuery({ queryKey: ["books"], queryFn: getData });

  const addBook = async () => {
    const res = await fetch(import.meta.env.VITE_SERVER + "/lesson/books", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: titleRef.current.value,
        author: authorRef.current.value,
        year: yearRef.current.value,
      }),
    });

    if (!res.ok) {
      throw new Error("fetch error");
    }
    // this is handled elsewhere at the mutation
    // if (res.ok) {
    //   // need to initialize data before refletch again
    // titleRef.current.value = "";
    // authorRef.current.value = "";
    // yearRef.current.value = "";
    //   // then refresh your page with your newly added data
    //   getData();
    // } else {
    //   throw new Error("fetch error");
    // }
  };

  const mutation = useMutation({
    mutationFn: addBook,
    onSuccess: () => {
      titleRef.current.value = "";
      authorRef.current.value = "";
      yearRef.current.value = "";
      queryClient.invalidateQueries({ queryKey: ["books"] }); // this would refletch your data
    },
  });

  // this is also no longer necessary as it is handled by useQuery
  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <div className="container">
      <h1>BooK List</h1>
      <div className="row">
        <input
          type="text"
          ref={titleRef}
          placeholder="title"
          className="col-md-3"
        />
        <input
          type="text"
          ref={authorRef}
          placeholder="author"
          className="col-md-3"
        />
        <input
          type="text"
          ref={yearRef}
          placeholder="year published"
          className="col-md-3"
        />
        <button className="col-md-3" onClick={mutation.mutate}>
          ADD
        </button>
      </div>
      <br />
      <div className="row">
        <div className="col-md-3">Title</div>
        <div className="col-md-3">Author</div>
        <div className="col-md-2">Year</div>
        <div className="col-md-2"></div>
        <div className="col-md-2"></div>
      </div>
      {mutation.isLoading && <h3>Loading...</h3>}
      {mutation.isError && <h3>{mutation.error.message}</h3>}
      {query.isPending && <h1>Loading...</h1>}
      {query.isError && <div>{query.error.message}</div>}

      {query.isSuccess &&
        query.data.map((item) => (
          <Book
            key={item.id}
            id={item.id}
            title={item.title}
            author={item.author}
            yearPublished={item.year_published}
            getData={getData}
          />
        ))}
    </div>
  );
};

export default Display;
