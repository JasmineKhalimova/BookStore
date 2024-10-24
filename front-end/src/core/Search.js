import React, { useState, useEffect } from "react";
import { getCategories, list } from "./apiCore";
import Card from "./Card";

const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: "",
        search: "",
        results: [],
        searched: false
    });

    const { categories, category, search, results, searched } = data;

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setData(prevState => ({ ...prevState, categories: data }));
            }
        });
    };

    useEffect(() => {
        loadCategories();
    }, []);

    // Function to fetch search results based on current input
    const searchData = () => {
        if (search) {
            list({ search: search || undefined, category: category }).then(
                response => {
                    if (response.error) {
                        console.log(response.error);
                    } else {
                        setData(prevState => ({
                            ...prevState,
                            results: response,
                            searched: true
                        }));
                    }
                }
            );
        } else {
            // Clear search results when input is empty
            setData(prevState => ({ ...prevState, results: [], searched: false }));
        }
    };

    // Trigger search when the user types in the search box
    useEffect(() => {
        if (search.length > 0) {
            searchData();
        } else {
            setData(prevState => ({ ...prevState, results: [], searched: false }));
        }
    }, [search]);

    const handleChange = name => event => {
        setData(prevState => ({ ...prevState, [name]: event.target.value }));
    };

    const searchMessage = (searched, results) => {
        if (searched && results.length > 0) {
            return `Found ${results.length} products`;
        }
        if (searched && results.length < 1) {
            return `No products found`;
        }
    };

    const searchedProducts = (results = []) => {
        return (
            <div>
                <h2 className="mt-4 mb-4">
                    {searchMessage(searched, results)}
                </h2>

                <div className="row">
                    {results.map((product, i) => (
                        <div className="col-4 mb-3" key={i}>
                            <Card product={product} />
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const searchForm = () => (
        <form>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select
                            className="btn mr-2"
                            onChange={handleChange("category")}
                        >
                            <option value="All">All</option>
                            {categories.map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <input
                        type="search"
                        className="form-control"
                        onChange={handleChange("search")}
                        placeholder="Search by name"
                        value={search}
                    />
                </div>
            </span>
        </form>
    );

    return (
        <div className="row position-relative">
            <div className="container mb-3">{searchForm()}</div>
            <div className="container-fluid mb-3 position-absolute">
                {searchedProducts(results)}
            </div>
        </div>
    );
};

export default Search;
