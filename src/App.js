import React, { useState } from "react";

import {
  SearchBox,
  SearchBase,
  SearchComponent
} from "@appbaseio/react-searchbox-mongodb";
import ReactPaginate from "react-paginate";

import "./styles.css";

import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

const SearchPage = () => {

  const sampleWorkload = {
    "test_name": "test",
    "workloads": [
      {
        "owning_team": "",
        "description": "lala",
        "github_repo": "",
        "source_code": ""
      }
    ]
  }

  const [detailsVisible, setDetailsVisible] = useState(false);
  const [selectedWorkload, setSelectedWorkload] = useState(sampleWorkload);
    
  const showWorkloadDetails = (workload) => {
    setSelectedWorkload(workload);
    setDetailsVisible(true);
  };

  const hideWorkloadDetails = () => {
    setDetailsVisible(false);
  };

  return (
  <SearchBase
    index="perf-workloads-final"
    url="https://webhooks.mongodb-realm.com/api/client/v2.0/app/perfdocuments-wqaiw/service/http_endpoint/incoming_webhook/reactivesearch"
    mongodb={{
      db: "perfdocuments",
      collection: "perf-workloads-final"
    }}
  >
    <div>


      <h1>Performance Workloads Search</h1>

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
        title="@product-perf"
        placeholder="Search for workloads"
      />
      <div className="row">
        <div className="col">
          <SearchComponent
            id="project-filter"
            type="term"
            dataField="test_type"
            URLParams
            queryFormat="and"
            aggregationSize={10}
            includeFields={["test_type"]}
            react={{
              and: ["search-component", "variant-filter", "keywords-filter"]
            }}
            // To initialize with default value
            value={[]}
            render={({ aggregationData, loading, value, setValue }) => {
              return (
                <div className="filter-container">
                  <div className="list-title">Performence Projects</div>
                  {loading ? (
                    <div>Loading Performence Projects ...</div>
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
            id="keywords-filter"
            type="term"
            dataField="keywords"
            URLParams
            queryFormat="and"
            aggregationSize={10}
            includeFields={["keywords"]}
            react={{
              and: ["search-component", "variant-filter", "project-filter"]
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
              and: ["search-component", "keywords-filter", "project-filter"]
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

                          <br />
                          <br />
                          <Button variant="outlined" color="primary" 
                                  onClick={() => showWorkloadDetails({
                                    "test_name": item.test_name,
                                    "workloads": item.workloads
                                    })}>
                            Details
                          </Button>
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

          <Dialog maxWidth={true} open={detailsVisible} onClose={hideWorkloadDetails}>
            <DialogTitle><h2>{selectedWorkload.test_name}</h2></DialogTitle>
            <DialogContent>
              <DialogContentText align="left">
                
                <h3>Number of workloads: {selectedWorkload.workloads.length}</h3>
                
                {selectedWorkload.workloads.map((workload, i) => (
                <div>
                  <br/>
                  <h3>Workload #{i+1}</h3>
                  <b>Owning team:</b>{workload.owning_team}
                  <br/>
                  <b>Description:</b>{workload.description}
                  <br/>
                  <a href={workload.github_repo + workload.source_code} target="_blank">Source Code</a> 
                </div>
                
                

                ))}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={hideWorkloadDetails} 
                      color="primary" autoFocus>
                Close
              </Button>
            </DialogActions>
          </Dialog>

        </div>
      </div>
      <br/>
      <h5>© 2022 MongoDB, Inc.</h5>
      <br/>
    </div>
  </SearchBase>
);}

export default SearchPage;