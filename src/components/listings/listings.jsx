import React, { useState, useEffect } from "react";
import "./listings.scss";
import Paginate from "../paginate/paginate";
import { StarSaved, Money, Location, Timer } from "../images";
import { useApi } from "../../hooks/useApi";
import { Fragment } from "react";

const MAX_PER_PAGE = 3;
const MAX_CHAR_LENGTH = 200;

export default function listings() {
  const [jobs, setJobs] = useState([]);
  const [meta, setMeta] = useState({});

  const { get } = useApi();

  const handleSuccess = (res) => {
    const { entries, meta } = res.data;

    // update each job to include isTruncated (is shorter)
    const updatedJobs = entries.map((job) => ({
      ...job,
      isTruncated: true,
    }));

    setJobs(updatedJobs);
    setMeta(meta);
  };

  const fetchJobs = async (page = 1) => {
    await get("jobs", {
      onSuccess: (res) => handleSuccess(res),
      params: {
        "populate[company]": true,
        "populate[job_types]": true,
        start: (page - 1) * MAX_PER_PAGE,
        limit: MAX_PER_PAGE,
      },
    });
  };

  const truncate = (text, jobId) => {
    const job = jobs.find((job) => job.id === jobId);

    const shouldTruncate = text.length > MAX_CHAR_LENGTH && job?.isTruncated;
    if (!shouldTruncate) return text;

    const truncated = text.slice(0, MAX_CHAR_LENGTH);
    // return elipsis if text is truncated
    return truncated + "...";
  };

  const toggleTruncate = () => {};

  useEffect(() => {
    fetchJobs();
  }, []);

  const handlePageChange = (pageNumber) => {
    fetchJobs(pageNumber);
  };

  return (
    <section>
      {jobs.map((job) => (
        <div key={job.id} className="listing__card">
          <header className="listing__header">
            <h1 className="listing__title">{job.title}</h1>
            <img className="listing__saved" src={StarSaved} alt="" />
            <p className="listing__company">
              Posted by <span>{job.company.name}</span>
            </p>
          </header>

          <ul className="listing__items">
            <li>
              <img src={Money} alt="" />
              <b>Salary {job.SalaryType}</b>
            </li>
            <li>
              <img src={Location} alt="" />
              <b>{job.location}</b>
            </li>
            <li>
              <img src={Timer} alt="" />
              {job.job_types.map((type, index, array) => (
                <Fragment key={type.id}>
                  <span>{type.title}</span>
                  {index !== array.length - 1 && <span>,</span>}
                </Fragment>
              ))}
            </li>
          </ul>

          <p className="listing__detail">
            {truncate(job.description, job.id)} <b>Read more</b>
          </p>

          <a href="" className="listing__cta">
            Withdraw application
          </a>
        </div>
      ))}
      <Paginate meta={meta.paginate} onPageChange={handlePageChange} />
    </section>
  );
}
