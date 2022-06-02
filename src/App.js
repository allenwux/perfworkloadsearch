import React from "react";

import {
  SearchBox,
  SearchBase,
  SearchComponent
} from "@appbaseio/react-searchbox-mongodb";
import ReactPaginate from "react-paginate";

import "./styles.css";

export default () => (
  <SearchBase
    index="perf-workloads-final"
    url="https://webhooks.mongodb-realm.com/api/client/v2.0/app/perfdocuments-wqaiw/service/http_endpoint/incoming_webhook/reactivesearch"
    mongodb={{
      db: "perfdocuments",
      collection: "perf-workloads-final"
    }}
  >
    <div>
      <h2>Performance Workloads Search Demo</h2>

      <SearchBox
        id="search-component"
        dataFields={[
          {
            field: "name",
            weight: 3
          },
          {
            field: "description",
            weight: 3
          },
          {
            field: "keywords",
            weight: 5
          }
        ]}
        title="@server-perf"
        placeholder="Search for workloads"
      />
      <div className="row">
        <div className="col">
          <SearchComponent
            id="keywords-filter"
            type="term"
            dataField="keywords"
            URLParams
            queryFormat="and"
            aggregationSize={10}
            includeFields={["keywords"]}
            react={{
              and: ["search-component", "variant-filter"]
            }}
            // To initialize with default value
            value={[]}
            render={({ aggregationData, loading, value, setValue }) => {
              return (
                <div className="filter-container">
                  <div className="list-title">Keywords</div>
                  {loading ? (
                    <div>Loading Keywords ...</div>
                  ) : (
                    aggregationData.data.map((item) => (
                      <div className="list-item" key={item._key}>
                        <input
                          type="checkbox"
                          checked={value ? value.includes(item._key) : false}
                          value={item._key}
                          onChange={(e) => {
                            const values = value || [];
                            if (values && values.includes(e.target.value)) {
                              values.splice(values.indexOf(e.target.value), 1);
                            } else {
                              values.push(e.target.value);
                            }
                            // Set filter value and trigger custom query
                            setValue(values, {
                              triggerDefaultQuery: false,
                              triggerCustomQuery: true,
                              stateChanges: true
                            });
                          }}
                        />
                        <label className="list-item-label" htmlFor={item._key}>
                          {item._key} ({item._doc_count})
                        </label>
                      </div>
                    ))
                  )}
                </div>
              );
            }}
          />
          <SearchComponent
            id="variant-filter"
            type="term"
            dataField="build_variants"
            URLParams
            queryFormat="and"
            aggregationSize={10}
            includeFields={["build_variants"]}
            // To initialize with default value
            value={[]}
            react={{
              and: ["search-component", "keywords-filter"]
            }}
            render={({ aggregationData, loading, value, setValue }) => {
              return (
                <div className="filter-container">
                  <div className="list-title">Build Variants</div>
                  {loading ? (
                    <div>Loading Variants ...</div>
                  ) : (
                    aggregationData.data.map((item) => (
                      <div className="list-item" key={item._key}>
                        <input
                          type="checkbox"
                          checked={value ? value.includes(item._key) : false}
                          value={item._key}
                          onChange={(e) => {
                            const values = value || [];
                            if (values && values.includes(e.target.value)) {
                              values.splice(values.indexOf(e.target.value), 1);
                            } else {
                              values.push(e.target.value);
                            }
                            // Set filter value and trigger custom query
                            setValue(values, {
                              triggerDefaultQuery: false,
                              triggerCustomQuery: true,
                              stateChanges: true
                            });
                          }}
                        />
                        <label className="list-item-label" htmlFor={item._key}>
                          {item._key} ({item._doc_count})
                        </label>
                      </div>
                    ))
                  )}
                </div>
              );
            }}
          />
        </div>

        <div className="col">
          <SearchComponent
            id="result-component"
            highlight
            dataFields={[
              {
                field: "test_name",
                weight: 3
              },
              {
                field: "workloads.description",
                weight: 3
              },
              {
                field: "workloads.keywords",
                weight: 5
              }
            ]}
            size={5}
            includeFields={["test_name", "workloads", "keywords"]}
            react={{
              and: ["search-component", "keywords-filter", "variant-filter"]
            }}
          >
            {({ results, loading, size, setValue, setFrom }) => {
              return (
                <div className="result-list-container">
                  {loading ? (
                    <div>Loading workloads ...</div>
                  ) : (
                    <div>
                      {!results.data.length ? (
                        <div>No workloads found</div>
                      ) : (
                        <p>
                          {results.numberOfResults} workloads found in{" "}
                          {results.time}ms
                        </p>
                      )}
                      {results.data.map((item) => (
                        <div
                          className="book-content text-left"
                          key={item._id}
                          style={{ padding: 10 }}
                        >
                          <h1>{item.test_name}</h1>
                          {item.workloads[0] ? item.workloads[0].description.substring(
                                  0,
                                  Math.min(260, item.workloads[0].description.length)
                                ) : ""}
                            ...
                          
                          <br />
                          <span
                            style={{
                              background: "#efefef",
                              padding: 3,
                              borderRadius: 3,
                              marginTop: 10,
                              marginBottom: 10,
                              width: "auto"
                            }}
                          >
                            keywords:

                            {item.keywords.map((x, i) => {
                              return x + ";";
                            })}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  <ReactPaginate
                    pageCount={Math.floor(results.numberOfResults / size)}
                    onPageChange={({ selected }) =>
                      setFrom((selected + 1) * size)
                    }
                    previousLabel="previous"
                    nextLabel="next"
                    breakLabel="..."
                    breakClassName="break-me"
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    subContainerClassName="pages pagination"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    activeClassName="active"
                  />
                </div>
              );
            }}
          </SearchComponent>
        </div>
      </div>
    </div>
  </SearchBase>
);
